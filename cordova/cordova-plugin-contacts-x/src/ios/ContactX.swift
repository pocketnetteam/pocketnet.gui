import Contacts

class ContactX {

    var contact: CNContact;
    var options: ContactsXOptions;

    init(contact: CNContact, options: ContactsXOptions) {
        self.contact = contact
        self.options = options;
    }

    func getEmailAddresses() -> [NSDictionary] {
        let labeledValues: [NSDictionary] = self.contact.emailAddresses.map { (ob: CNLabeledValue<NSString>) -> NSDictionary in
            return [
                "id": ob.identifier,
                "type": ContactsX.mapLabelToString(label: ob.label ?? ""),
                "value": ob.value
            ]
        }
        return labeledValues;
    }

    func getPhoneNumbers() -> [NSDictionary] {
        let labeledValues: [NSDictionary] = self.contact.phoneNumbers.map { (ob: CNLabeledValue<CNPhoneNumber>) -> NSDictionary in
            return [
                "id": ob.identifier,
                "type": ContactsX.mapLabelToString(label: ob.label ?? ""),
                "value": ob.value.stringValue
            ]
        }
        return labeledValues;
    }

    func getJson() -> NSDictionary {

        var phoneNumbers: [NSDictionary] = [];
        if(options.phoneNumbers) {
            phoneNumbers = self.getPhoneNumbers();
        }

        var emails: [NSDictionary] = [];
        if(options.emails) {
            emails = self.getEmailAddresses();
        }

        var result: [String : Any] = [
            "id": self.contact.identifier,
            "phoneNumbers": phoneNumbers,
            "emails": emails
        ];

        if(options.firstName) {
            result["firstName"] = self.contact.givenName;
        }
        if(options.middleName) {
            result["middleName"] = self.contact.middleName;
        }
        if(options.familyName) {
            result["familyName"] = self.contact.familyName;
        }
        if(options.photo) {
            result["photo"] = self.contact.thumbnailImageData?.base64EncodedString();
        }

        return result as NSDictionary;
    }
}
