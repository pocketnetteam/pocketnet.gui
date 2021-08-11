declare module 'cordova-plugin-contacts-x' {
  
  type ContactType = 'home' |'work' | 'mobile' | 'other';

  interface ContactXPhoneNumber {
    id?: string;

    /**
     * type of the phoneNumber
     */
    type: ContactType;

    /**
     * the phoneNumber itself
     */
    value: string;
  }

  interface ContactXEmail {
    id?: string;

    /**
     * type of the mail
     */
    type: ContactType;

    /**
     * the mail itself
     */
    value: string;
  }

  interface ContactX {
    id?: string;
    rawId?: string;

    /**
     * android only
     */
    displayName?: string;

    /**
     * first name (given name) of the contact
     */
    firstName?: string;

    /**
     * middle name of the contact
     */
    middleName?: string;

    /**
     * family name of the contact
     */
    familyName?: string;

    /**
     * unformatted phone-numbers of the contact
     */
    phoneNumbers?: ContactXPhoneNumber[];

    /**
     * unformatted emails of the contact
     */
    emails?: ContactXEmail[];
  }
}
