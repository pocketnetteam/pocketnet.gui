import Contacts
import ContactsUI

@objc(ContactsX) class ContactsX : CDVPlugin, CNContactPickerDelegate {

    var _callbackId: String?

    @objc(pluginInitialize)
    override func pluginInitialize() {
        super.pluginInitialize();
    }

    @objc(find:)
    func find(command: CDVInvokedUrlCommand) {
        _callbackId = command.callbackId;
        let options = ContactsXOptions(options: command.argument(at: 0) as? NSDictionary);

        self.commandDelegate.run {
            let store = CNContactStore();
            self.hasPermission { (granted) in
                guard granted else {
                    self.returnError(error: ErrorCodes.PermissionDenied);
                    return;
                }
                var contacts = [ContactX]()
                let keysToFetch = self.getKeysToFetch(options: options)
                let request = CNContactFetchRequest(keysToFetch: keysToFetch as [NSString])

                    do {
                        try store.enumerateContacts(with: request) {
                            (contact, stop) in
                            // Array containing all unified contacts from everywhere
                            contacts.append(ContactX(contact: contact, options: options))
                        }
                    }
                    catch let error {
                        self.returnError(error: ErrorCodes.UnknownError, message: error.localizedDescription)
                        return;
                    }

                var resultArray = [] as Array;
                for contact in contacts {
                    resultArray.append(contact.getJson());
                }
                let result:CDVPluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: resultArray);
                self.commandDelegate.send(result, callbackId: self._callbackId)
            }
        }
    }

    private func getKeysToFetch(options: ContactsXOptions) -> [String] {
        var keysToFetch: [String] = [];
        if(options.firstName) {
            keysToFetch.append(CNContactGivenNameKey);
        }
        if(options.middleName) {
            keysToFetch.append(CNContactMiddleNameKey);
        }
        if(options.familyName) {
            keysToFetch.append(CNContactFamilyNameKey);
        }
        if(options.phoneNumbers) {
            keysToFetch.append(CNContactPhoneNumbersKey);
        }
        if(options.emails) {
            keysToFetch.append(CNContactEmailAddressesKey);
        }
        if(options.photo) {
            keysToFetch.append(CNContactThumbnailImageDataKey);
        }
        return keysToFetch;
    }

    @objc(pick:)
    func pick(command: CDVInvokedUrlCommand) {
        _callbackId = command.callbackId;

        self.hasPermission { (granted) in
            guard granted else {
                self.returnError(error: ErrorCodes.PermissionDenied);
                return;
            }
            let contactPicker = CNContactPickerViewController();
            contactPicker.delegate = self;
            self.viewController.present(contactPicker, animated: true, completion: nil)
        }
    }

    func contactPicker(_ picker: CNContactPickerViewController, didSelect contact: CNContact) {
        let fields: NSDictionary = [
            "phoneNumbers": true,
            "emails": true
        ];
        let options = ContactsXOptions(options: ["fields": fields]);
        let contactResult = ContactX(contact: contact, options: options).getJson() as! [String : Any];
        let result: CDVPluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: contactResult);
        self.commandDelegate.send(result, callbackId: self._callbackId);
    }

    @objc(save:)
    func saveOrModify(command: CDVInvokedUrlCommand) {
        _callbackId = command.callbackId;

        self.hasPermission { (granted) in
            guard granted else {
                self.returnError(error: ErrorCodes.PermissionDenied);
                return;
            }

            let tmpContactOptions = command.argument(at: 0) as? NSDictionary;
            if(tmpContactOptions == nil) {
                self.returnError(error: ErrorCodes.WrongJsonObject, message: "You need to pass a contact object");
                return;
            }
            let contactOptions = ContactXOptions.init(options: tmpContactOptions);

            let retId: String?;
            if(contactOptions.id == nil) {
                retId = self.saveNewContact(contact: contactOptions);
            } else {
                retId = self.modifyContact(contact: contactOptions);
            }

            if(retId != nil) {
                let contact = self.findById(id: retId!);
                if(contact != nil) {
                    let result:CDVPluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: contact?.getJson()  as! [String : Any]);
                    self.commandDelegate.send(result, callbackId: self._callbackId)
                }
            }
            self.returnError(error: ErrorCodes.UnknownError);
        }
    }

    func saveNewContact(contact: ContactXOptions) -> String? {
        let newContact = CNMutableContact();
        if(contact.firstName != nil) {
            newContact.givenName = contact.firstName!;
        }
        if(contact.middleName != nil) {
            newContact.middleName = contact.middleName!;
        }
        if(contact.familyName != nil) {
            newContact.familyName = contact.familyName!;
        }
        if(contact.phoneNumbers != nil) {
            newContact.phoneNumbers = contact.phoneNumbers!.map { (ob: ContactXValueTypeOptions) -> CNLabeledValue<CNPhoneNumber> in
                return CNLabeledValue<CNPhoneNumber>(label: ContactsX.mapStringToLabel(string: ob.type), value: CNPhoneNumber(stringValue: ob.value));
            };
        }
        if(contact.emails != nil) {
            newContact.emailAddresses = contact.emails!.map { (ob: ContactXValueTypeOptions) -> CNLabeledValue<NSString> in
                return CNLabeledValue<NSString>(label: ContactsX.mapStringToLabel(string: ob.type), value: ob.value as NSString);
            };
        }

        let store = CNContactStore();
        let saveRequest = CNSaveRequest();
        saveRequest.add(newContact, toContainerWithIdentifier: nil);

        do {
            try store.execute(saveRequest);
            if newContact.isKeyAvailable(CNContactIdentifierKey) {
                return newContact.identifier;
            }
            return nil;
        } catch {
            return nil;
        }
    }

    func modifyContact(contact: ContactXOptions) -> String? {
        let existingContact = self.findById(id: contact.id!);
        let editContact = existingContact!.contact.mutableCopy() as! CNMutableContact;

        if(contact.firstName != nil) {
            editContact.givenName = contact.firstName!;
        }
        if(contact.middleName != nil) {
            editContact.middleName = contact.middleName!;
        }
        if(contact.familyName != nil) {
            editContact.familyName = contact.familyName!;
        }
        if(contact.phoneNumbers != nil) {
            if(contact.phoneNumbers?.count == 0) {
                editContact.phoneNumbers = [];
            } else {
                var newNumbers: [CNLabeledValue<CNPhoneNumber>] = [];
                outer: for newNumber in contact.phoneNumbers! {
                    for number in editContact.phoneNumbers {
                        if(newNumber.id != nil && number.identifier == newNumber.id!) {
                            newNumbers.append(number.settingLabel(ContactsX.mapStringToLabel(string: newNumber.type), value: CNPhoneNumber(stringValue: newNumber.value)));
                            continue outer;
                        }
                    }
                    newNumbers.append(CNLabeledValue(label: ContactsX.mapStringToLabel(string: newNumber.type), value: CNPhoneNumber(stringValue: newNumber.value)));
                }
                editContact.phoneNumbers = newNumbers;
            }
        }
        if(contact.emails != nil) {
            if(contact.emails!.count == 0) {
                editContact.emailAddresses = [];
            } else {
                var newMails: [CNLabeledValue<NSString>] = [];
                outer: for newMail in contact.emails! {
                    for mail in editContact.emailAddresses {
                        if(mail.identifier == newMail.id!) {
                            newMails.append(mail.settingLabel(ContactsX.mapStringToLabel(string: newMail.type), value: newMail.value as NSString));
                            continue outer;
                        }
                    }
                    newMails.append(CNLabeledValue(label: ContactsX.mapStringToLabel(string: newMail.type), value: newMail.value as NSString));
                }
                editContact.emailAddresses = newMails;
            }
        }

        let store = CNContactStore();
        let saveRequest = CNSaveRequest();
        saveRequest.update(editContact);

        do {
            try store.execute(saveRequest);
            if editContact.isKeyAvailable(CNContactIdentifierKey) {
                return editContact.identifier;
            }
            return nil;
        } catch {
            return nil;
        }
    }

    func findById(id: String) -> ContactX? {
        let options = ContactsXOptions.init(options: [
            "fields": [
                "phoneNumbers": true,
                "emails": true
            ]
        ]);
        let keysToFetch = self.getKeysToFetch(options: options);
        let predicate = CNContact.predicateForContacts(withIdentifiers: [id]);
        let store = CNContactStore();
        do {
            let contacts = try store.unifiedContacts(matching: predicate, keysToFetch: keysToFetch as [NSString]);
            if(contacts.count == 1) {
                return ContactX(contact: contacts.first!, options: options);
            }
            return nil;
        } catch {
            return nil;
        }
    }

    @objc(delete:)
    func delete(command: CDVInvokedUrlCommand) {
        _callbackId = command.callbackId;

        self.hasPermission { (granted) in
            guard granted else {
                self.returnError(error: ErrorCodes.PermissionDenied);
                return;
            }

            let id = command.argument(at: 0) as! String?;
            if(id == nil) {
                self.returnError(error: ErrorCodes.WrongJsonObject);
                return;
            }
            let contact = self.findById(id: id!);
            if(contact == nil) {
                self.returnError(error: ErrorCodes.UnknownError);
                return;
            }

            let store = CNContactStore();
            let request = CNSaveRequest();
            request.delete(contact!.contact.mutableCopy() as! CNMutableContact);

            do {
               try store.execute(request);

                let result:CDVPluginResult = CDVPluginResult(status: CDVCommandStatus_OK);
                self.commandDelegate.send(result, callbackId: self._callbackId)
           } catch {
            self.returnError(error: ErrorCodes.UnknownError)
           }
        }
    }

    @objc(hasPermission:)
    func hasPermission(command: CDVInvokedUrlCommand) {
        _callbackId = command.callbackId;

        self.hasPermission { (granted) in
            let dict = [
                "read": granted,
                "write": granted
            ];

            let result:CDVPluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: dict);
            self.commandDelegate.send(result, callbackId: self._callbackId)
        }
    }

    @objc(requestPermission:)
    func requestPermission(command: CDVInvokedUrlCommand) {
        _callbackId = command.callbackId

        self.hasPermission(completionHandler: { (granted) in
            let dict = [
                "read": granted,
                "write": granted
            ];

            let result:CDVPluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: dict);
            self.commandDelegate.send(result, callbackId: self._callbackId)
        }, requestIfNotAvailable: true)
    }

    func hasPermission(completionHandler: @escaping (_ accessGranted: Bool) -> Void, requestIfNotAvailable: Bool = false) {
        let store = CNContactStore();
        switch CNContactStore.authorizationStatus(for: .contacts) {
                case .authorized:
                    completionHandler(true)
                case .denied:
                    completionHandler(false)
                case .restricted, .notDetermined:
                    if(requestIfNotAvailable) {
                        store.requestAccess(for: .contacts) { granted, error in
                            if granted {
                                completionHandler(true)
                            } else {
                                DispatchQueue.main.async {
                                    completionHandler(false)
                                }
                            }
                        }
                    } else {
                        completionHandler(false)
                    }
                }
    }

    func returnError(error: ErrorCodes, message: String = "") {
        if(_callbackId != nil) {
            let result:CDVPluginResult = CDVPluginResult(
                status: CDVCommandStatus_ERROR, messageAs: [
                    "error": error.rawValue,
                    "message": message
            ]);
            self.commandDelegate.send(result, callbackId: _callbackId)
            _callbackId = nil;
        }
    }

    static func mapStringToLabel(string: String) -> String {
        switch string {
        case "home":
            return CNLabelHome;
        case "work":
            return CNLabelWork;
        case "mobile":
            return CNLabelPhoneNumberMobile;
        default:
            return CNLabelOther;
        }
    }

    static func mapLabelToString(label: String) -> String {
        switch label {
        case CNLabelHome:
            return "home";
        case CNLabelWork:
            return "work";
        case CNLabelPhoneNumberMobile:
            return "mobile";
        default:
            return "other";
        }
    }
}

enum ErrorCodes:NSNumber {
    case UnsupportedAction = 1
    case WrongJsonObject = 2
    case PermissionDenied = 3
    case UnknownError = 10
}
