class ContactsXOptions {

    var firstName: Bool = true;
    var middleName: Bool = true;
    var familyName: Bool = true;
    var phoneNumbers: Bool = false;
    var emails: Bool = false;
    var photo: Bool = false;

    init(options: NSDictionary?) {
        if(options != nil) {
            let fields = options?.value(forKey: "fields") as? NSDictionary ?? nil;

            if(fields != nil) {
                self.parseFields(fields: fields!)
            }
        }
    }

    private func parseFields(fields: NSDictionary) {
        firstName = fields.value(forKey: "firstName") as? Bool ?? true;
        middleName = fields.value(forKey: "middleName") as? Bool ?? true;
        familyName = fields.value(forKey: "familyName") as? Bool ?? true;
        phoneNumbers = fields.value(forKey: "phoneNumbers") as? Bool ?? false;
        emails = fields.value(forKey: "emails") as? Bool ?? false;
        photo = fields.value(forKey: "photo") as? Bool ?? false;
    }

}

class ContactXOptions {
    var id: String? = nil;
    var firstName: String? = nil;
    var middleName: String? = nil;
    var familyName: String? = nil;
    var phoneNumbers: [ContactXValueTypeOptions]? = nil;
    var emails: [ContactXValueTypeOptions]? = nil;
    var photo: String? = nil;
    
    init(options: NSDictionary?) {
        if(options != nil) {
            id = options?.value(forKey: "id") as? String;
            firstName = options?.value(forKey: "firstName") as? String;
            middleName = options?.value(forKey: "middleName") as? String;
            familyName = options?.value(forKey: "familyName") as? String;
            photo = options?.value(forKey: "photo") as? String;
            let phonenumberArray = options?.value(forKey: "phoneNumbers") as? [NSDictionary];
            if(phonenumberArray != nil) {
                phoneNumbers = self.parsePhoneNumbers(array: phonenumberArray!);
            }
            let emailsArray = options?.value(forKey: "emails") as? [NSDictionary];
            if(emailsArray != nil) {
                emails = self.parseEmails(array: emailsArray!);
            }
        }
    }
    
    private func parsePhoneNumbers(array: [NSDictionary]) -> [ContactXValueTypeOptions] {
        var numbers: [ContactXValueTypeOptions] = [];
        for numberObject in array {
            let finalNumber = ContactXValueTypeOptions.init(options: numberObject);
            if(finalNumber.type != "" && finalNumber.value != "") {
                numbers.append(finalNumber);
            }
        }
        return numbers;
    }
    
    private func parseEmails(array: [NSDictionary]) -> [ContactXValueTypeOptions] {
        var mails: [ContactXValueTypeOptions] = [];
        for mailObject in array {
            let finalMail = ContactXValueTypeOptions.init(options: mailObject);
            if(finalMail.type != "" && finalMail.value != "") {
                mails.append(finalMail);
            }
        }
        return mails;
    }
}

class ContactXValueTypeOptions {
    var id: String? = nil;
    var type: String;
    var value: String;
    
    init(options: NSDictionary) {
        id = options.value(forKey: "id") as? String;
        type = options.value(forKey: "type") as? String ?? "";
        value = options.value(forKey: "value") as? String ?? "";
    }
}
