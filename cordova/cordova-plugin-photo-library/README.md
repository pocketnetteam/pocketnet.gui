# cordova-plugin-photo-library (Bastyon fork)

Local fork of [terikon/cordova-plugin-photo-library](https://github.com/terikon/cordova-plugin-photo-library), rewritten for the in-app gallery (`components/camerapreview`).

- iOS: Photos framework only (no AssetsLibrary), `PHAuthorizationStatus.limited` and `presentLimitedLibraryPicker`.
- Android: MediaStore content URIs only, `READ_MEDIA_VISUAL_USER_SELECTED` (Android 14+), saving through MediaStore without permissions on Android 10+.

## Authorization statuses

| Status | Meaning |
| --- | --- |
| `full` | Access to all photos |
| `limited` | Access to photos selected by the user (iOS 14+, Android 14+) |
| `notDetermined` | The user has not been asked yet |
| `denied` | Denied, the system dialog can be shown again (Android) |
| `blocked` | Denied permanently, can be changed only in the app settings |

## API (`cordova.plugins.photoLibrary`)

- `requestAuthorization(success(status), error(status))`: success when access is `full` or `limited`.
- `getAuthorizationStatus(success(status))`
- `manageLimitedAccess(success(status), error(status))`: in `limited` mode shows the system screen to change the selected photos.
- `openSettings(success, error)`: opens the app settings.
- `getLibrary(success({ library, isLastChunk }), error, { itemsInChunk, maxItems })`: images only, newest first. Item: `{ id, width, height, creationDate }`. The last chunk is always sent, even when the library is empty.
- `getThumbnail(id, success(blob), error, { thumbnailWidth, thumbnailHeight, quality })`
- `getPhoto(id, success(blob), error, { maxWidth = 2048, maxHeight = 2048, quality = 0.9 })`: rotated by EXIF and scaled down. GIF is returned as is on Android.
- `saveImage(dataURL, success(libraryItem), error)`: saves to the camera roll (iOS) or `Pictures/<app name>` (Android).

On iOS the app must have `NSPhotoLibraryUsageDescription`; `PHPhotoLibraryPreventAutomaticLimitedAccessAlert` is added by the plugin.
