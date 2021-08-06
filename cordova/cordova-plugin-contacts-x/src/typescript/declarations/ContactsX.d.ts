/// <reference path="./interfaces/error.d.ts" />
/// <reference path="./interfaces/find-options.d.ts" />
/// <reference path="./interfaces/permission-result.d.ts" />
/// <reference path="./interfaces/ContactX.d.ts" />

declare module 'cordova-plugin-contacts-x' {

  export default class ContactsX {

    static ErrorCodes: {
      UnsupportedAction,
      WrongJsonObject,
      PermissionDenied,
      UnknownError
    }

    /**
     * Get all contacts
     *
     * @param success
     * @param error
     * @param options
     */
    static find(success: (result: ContactX[]) => void, error: (error: ContactXError) => void, options?: FindOptions);

    /**
     * Open a contact picker
     *
     * @param success
     * @param error
     */
    static pick(success: (result: ContactX) => void, error: (error: ContactXError) => void);

    /**
     * Save or modify a contact
     *
     * @param contact
     * @param success
     * @param error
     */
    static save(contact: ContactX, success: (result: ContactX) => void, error: (error: ContactXError) => void);

    /**
     * delete a contact
     *
     * @param id
     * @param success
     * @param error
     */
    static delete(id: string, success: () => void, error: (error: ContactXError) => void);

    /**
     * Check permission is available
     *
     * @param success
     * @param error
     */
    static hasPermission(success: (result: ContactXPermissionResult) => void, error: (error: ContactXError) => void);

    /**
     * Request Permission (if not available and possible)
     *
     * @param success
     * @param error
     */
    static requestPermission(success: (result: ContactXPermissionResult) => void, error: (error: ContactXError) => void);

    /**
     * Request Write Permission (if not available and possible - android only)
     *
     * @param success
     * @param error
     */
    static requestWritePermission(success: (result: ContactXPermissionResult) => void, error: (error: ContactXError) => void);
  }

}
