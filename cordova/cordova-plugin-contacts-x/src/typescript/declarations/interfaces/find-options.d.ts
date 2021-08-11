declare module 'cordova-plugin-contacts-x' {

  interface FindOptionsFields {
    displayName?: boolean;
    firstName?: boolean;
    middleName?: boolean;
    familyName?: boolean;
    phoneNumbers?: boolean;
    emails?: boolean;
  }

  interface FindOptions {
    fields?: FindOptionsFields;
  }
}
