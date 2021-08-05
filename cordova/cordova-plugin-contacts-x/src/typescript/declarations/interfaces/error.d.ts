declare module 'cordova-plugin-contacts-x' {

  /**
   * Used for every Plugin Error Callback
   */
  interface ContactXError {
    /**
     * One of the ContactXErrorCodes
     */
    code: number;

    /**
     * If available some more info (mostly exception message)
     */
    message: string;
  }

}
