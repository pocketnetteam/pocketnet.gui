import Foundation
import Photos
import UIKit

// Authorization statuses returned to JavaScript:
// "full"          - access to the whole library
// "limited"       - access to photos selected by the user (iOS 14+)
// "notDetermined" - the user has not been asked yet
// "blocked"       - denied or restricted, can be changed only in Settings

@objc(PhotoLibrary) class PhotoLibrary : CDVPlugin {

    static let PERMISSION_ERROR = "Permission Denial: This application is not allowed to access Photo data."

    struct PictureData {
        var data: Data
        var mimeType: String
    }

    let queue: DispatchQueue = DispatchQueue(label: "photo-library.queue.plugin", qos: DispatchQoS.userInitiated, attributes: [.concurrent])

    let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZZZZZ"
        return formatter
    }()

    // MARK: - Authorization

    static func currentStatus() -> PHAuthorizationStatus {
        if #available(iOS 14, *) {
            return PHPhotoLibrary.authorizationStatus(for: .readWrite)
        }
        return PHPhotoLibrary.authorizationStatus()
    }

    static func statusString() -> String {
        let status = currentStatus()

        if status == .authorized {
            return "full"
        }

        if status == .notDetermined {
            return "notDetermined"
        }

        if #available(iOS 14, *) {
            if status == .limited {
                return "limited"
            }
        }

        return "blocked"
    }

    static func canRead() -> Bool {
        let status = statusString()
        return status == "full" || status == "limited"
    }

    @objc func getAuthorizationStatus(_ command: CDVInvokedUrlCommand) {
        sendString(command, PhotoLibrary.statusString())
    }

    @objc func requestAuthorization(_ command: CDVInvokedUrlCommand) {
        if PhotoLibrary.currentStatus() != .notDetermined {
            sendAuthorizationResult(command)
            return
        }

        let handler: (PHAuthorizationStatus) -> Void = { _ in
            self.sendAuthorizationResult(command)
        }

        if #available(iOS 14, *) {
            PHPhotoLibrary.requestAuthorization(for: .readWrite, handler: handler)
            return
        }

        PHPhotoLibrary.requestAuthorization(handler)
    }

    // Lets the user change the set of photos available in limited mode
    @objc func manageLimitedAccess(_ command: CDVInvokedUrlCommand) {
        guard #available(iOS 14, *) else {
            sendAuthorizationResult(command)
            return
        }

        DispatchQueue.main.async {
            guard PhotoLibrary.currentStatus() == .limited, let controller = self.viewController else {
                self.sendAuthorizationResult(command)
                return
            }

            if #available(iOS 15, *) {
                PHPhotoLibrary.shared().presentLimitedLibraryPicker(from: controller) { _ in
                    self.sendAuthorizationResult(command)
                }
                return
            }

            PHPhotoLibrary.shared().presentLimitedLibraryPicker(from: controller)
            self.sendAuthorizationResult(command)
        }
    }

    @objc func openSettings(_ command: CDVInvokedUrlCommand) {
        DispatchQueue.main.async {
            guard let url = URL(string: UIApplication.openSettingsURLString) else {
                self.sendError(command, "Could not open settings")
                return
            }

            UIApplication.shared.open(url, options: [:]) { opened in
                if opened {
                    self.sendString(command, "opened")
                } else {
                    self.sendError(command, "Could not open settings")
                }
            }
        }
    }

    // MARK: - Library

    // Images only, newest first
    @objc func getLibrary(_ command: CDVInvokedUrlCommand) {
        queue.async {
            if !PhotoLibrary.canRead() {
                self.sendError(command, PhotoLibrary.PERMISSION_ERROR)
                return
            }

            let options = command.arguments.first as? NSDictionary
            let itemsInChunk = options?["itemsInChunk"] as? Int ?? 0
            let maxItems = options?["maxItems"] as? Int ?? 0

            let fetchOptions = PHFetchOptions()
            fetchOptions.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]
            fetchOptions.predicate = NSPredicate(format: "mediaType == %d", PHAssetMediaType.image.rawValue)

            let assets = PHAsset.fetchAssets(with: fetchOptions)

            var total = assets.count
            if maxItems > 0 {
                total = min(total, maxItems)
            }

            if total == 0 {
                self.sendChunk(command, [], chunkNum: 0, isLastChunk: true)
                return
            }

            var chunk = [NSDictionary]()
            var chunkNum = 0

            for index in 0..<total {
                chunk.append(self.libraryItem(assets.object(at: index)))

                let isLastChunk = index == total - 1

                if isLastChunk || (itemsInChunk > 0 && chunk.count >= itemsInChunk) {
                    self.sendChunk(command, chunk, chunkNum: chunkNum, isLastChunk: isLastChunk)
                    chunk = [NSDictionary]()
                    chunkNum += 1
                }
            }
        }
    }

    @objc func getThumbnail(_ command: CDVInvokedUrlCommand) {
        queue.async {
            if !PhotoLibrary.canRead() {
                self.sendError(command, PhotoLibrary.PERMISSION_ERROR)
                return
            }

            guard let photoId = command.arguments.first as? String else {
                self.sendError(command, "Photo id is missing")
                return
            }

            let options = command.arguments.count > 1 ? command.arguments[1] as? NSDictionary : nil
            let width = options?["thumbnailWidth"] as? Int ?? 256
            let height = options?["thumbnailHeight"] as? Int ?? 256
            let quality = (options?["quality"] as? NSNumber)?.floatValue ?? 0.7

            let picture = self.requestImage(photoId, maxSize: CGSize(width: width, height: height), contentMode: .aspectFill, quality: quality)

            self.sendPicture(command, picture, "Could not fetch the thumbnail")
        }
    }

    // Returns the photo scaled down to fit maxWidth x maxHeight
    @objc func getPhoto(_ command: CDVInvokedUrlCommand) {
        queue.async {
            if !PhotoLibrary.canRead() {
                self.sendError(command, PhotoLibrary.PERMISSION_ERROR)
                return
            }

            guard let photoId = command.arguments.first as? String else {
                self.sendError(command, "Photo id is missing")
                return
            }

            let options = command.arguments.count > 1 ? command.arguments[1] as? NSDictionary : nil
            let width = options?["maxWidth"] as? Int ?? 2048
            let height = options?["maxHeight"] as? Int ?? 2048
            let quality = (options?["quality"] as? NSNumber)?.floatValue ?? 0.9

            let picture = self.requestImage(photoId, maxSize: CGSize(width: width, height: height), contentMode: .aspectFit, quality: quality)

            self.sendPicture(command, picture, "Could not fetch the image")
        }
    }

    // url is a dataURL or a file url
    @objc func saveImage(_ command: CDVInvokedUrlCommand) {
        queue.async {
            guard let url = command.arguments.first as? String, let data = PhotoLibrary.dataFromURL(url) else {
                self.sendError(command, "Could not read the image")
                return
            }

            var placeholder: PHObjectPlaceholder?

            PHPhotoLibrary.shared().performChanges({
                let request = PHAssetCreationRequest.forAsset()
                request.addResource(with: .photo, data: data, options: nil)
                placeholder = request.placeholderForCreatedAsset
            }, completionHandler: { success, error in
                guard success, let localIdentifier = placeholder?.localIdentifier else {
                    self.sendError(command, "Could not save the image: \(error?.localizedDescription ?? "unknown error")")
                    return
                }

                guard let asset = PHAsset.fetchAssets(withLocalIdentifiers: [localIdentifier], options: nil).firstObject else {
                    self.sendDictionary(command, ["id": localIdentifier])
                    return
                }

                self.sendDictionary(command, self.libraryItem(asset))
            })
        }
    }

    // MARK: - Helpers

    func libraryItem(_ asset: PHAsset) -> NSDictionary {
        let item = NSMutableDictionary()

        item["id"] = asset.localIdentifier
        item["width"] = asset.pixelWidth
        item["height"] = asset.pixelHeight

        if let creationDate = asset.creationDate {
            item["creationDate"] = dateFormatter.string(from: creationDate)
        }

        return item
    }

    // Must be called on a background queue: the request is synchronous and may download from iCloud
    func requestImage(_ photoId: String, maxSize: CGSize, contentMode: PHImageContentMode, quality: Float) -> PictureData? {
        guard let asset = PHAsset.fetchAssets(withLocalIdentifiers: [photoId], options: nil).firstObject else {
            return nil
        }

        let options = PHImageRequestOptions()
        options.isSynchronous = true
        options.deliveryMode = .highQualityFormat
        options.resizeMode = .exact
        options.version = .current
        options.isNetworkAccessAllowed = true

        var targetSize = maxSize

        // Do not upscale photos that already fit
        if contentMode == .aspectFit && CGFloat(asset.pixelWidth) <= maxSize.width && CGFloat(asset.pixelHeight) <= maxSize.height {
            targetSize = PHImageManagerMaximumSize
        }

        var result: UIImage?

        PHImageManager.default().requestImage(for: asset, targetSize: targetSize, contentMode: contentMode, options: options) { image, _ in
            result = image
        }

        guard let image = result else {
            return nil
        }

        return PhotoLibrary.pictureData(image, quality: quality)
    }

    static func pictureData(_ image: UIImage, quality: Float) -> PictureData? {
        if imageHasAlpha(image), let data = image.pngData() {
            return PictureData(data: data, mimeType: "image/png")
        }

        guard let data = image.jpegData(compressionQuality: CGFloat(quality)) else {
            return nil
        }

        return PictureData(data: data, mimeType: "image/jpeg")
    }

    static func imageHasAlpha(_ image: UIImage) -> Bool {
        let alphaInfo = image.cgImage?.alphaInfo
        return alphaInfo == .first || alphaInfo == .last || alphaInfo == .premultipliedFirst || alphaInfo == .premultipliedLast
    }

    static func dataFromURL(_ url: String) -> Data? {
        if url.hasPrefix("data:") {
            guard let range = url.range(of: ";base64,") else {
                return nil
            }

            return Data(base64Encoded: String(url[range.upperBound...]), options: .ignoreUnknownCharacters)
        }

        guard let fileURL = URL(string: url), fileURL.isFileURL else {
            return nil
        }

        return try? Data(contentsOf: fileURL)
    }

    func sendAuthorizationResult(_ command: CDVInvokedUrlCommand) {
        let status = PhotoLibrary.statusString()

        if PhotoLibrary.canRead() {
            sendString(command, status)
        } else {
            sendError(command, status)
        }
    }

    func sendChunk(_ command: CDVInvokedUrlCommand, _ library: [NSDictionary], chunkNum: Int, isLastChunk: Bool) {
        let result: [String: Any] = [
            "chunkNum": chunkNum,
            "isLastChunk": isLastChunk,
            "library": library
        ]

        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: result)
        pluginResult?.setKeepCallbackAs(!isLastChunk)
        commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }

    func sendPicture(_ command: CDVInvokedUrlCommand, _ picture: PictureData?, _ errorMessage: String) {
        guard let picture = picture else {
            sendError(command, errorMessage)
            return
        }

        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsMultipart: [picture.data, picture.mimeType])
        commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }

    func sendDictionary(_ command: CDVInvokedUrlCommand, _ dictionary: NSDictionary) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: dictionary as? [AnyHashable: Any])
        commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }

    func sendString(_ command: CDVInvokedUrlCommand, _ value: String) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: value)
        commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }

    func sendError(_ command: CDVInvokedUrlCommand, _ message: String) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: message)
        commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }
}
