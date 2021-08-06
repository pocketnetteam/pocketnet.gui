# ContactsX Cordova Plugin
![Maintenance](https://img.shields.io/maintenance/yes/2021)
[![npm version](https://badge.fury.io/js/cordova-plugin-contacts-x.svg)](https://badge.fury.io/js/cordova-plugin-contacts-x)

This [Cordova](https://cordova.apache.org) Plugin is for managing Contacts. Why use this Plugin and not the ["Official" one](https://github.com/apache/cordova-plugin-contacts).
Well, first: it's deprectated and no more work will be done there. Second (and more important): it uses a deprecated Library in iOS.

**This Plugin is in active development!**

<!-- DONATE -->
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG_global.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LMX5TSQVMNMU6&source=url)

This and other Open-Source Cordova Plugins are developed in my free time.
To help ensure this plugin is kept updated, new features are added and bugfixes are implemented quickly, please donate a couple of dollars (or a little more if you can stretch) as this will help me to afford to dedicate time to its maintenance.
Please consider donating if you're using this plugin in an app that makes you money, if you're being paid to make the app, if you're asking for new features or priority bug fixes.
<!-- END DONATE -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Content**

- [Install](#install)
  - [Requirements](#requirements)
  - [Android](#android)
  - [iOS](#ios)
- [Environment Variables](#environment-variables)
  - [iOS](#ios-1)
- [Usage](#usage)
  - [Failure Callbacks](#failure-callbacks)
  - [Error Codes](#error-codes)
- [Api](#api)
  - [hasPermission](#haspermission)
  - [requestPermission](#requestpermission)
  - [requestWritePermission](#requestwritepermission)
  - [find](#find)
  - [pick](#pick)
  - [save](#save)
  - [delete](#delete)
- [Objects](#objects)
  - [ContactX](#contactx)
  - [ContactXPhoneNumber](#contactxphonenumber)
  - [ContactXEmail](#contactxemail)
- [Changelog](#changelog)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Install

## Requirements

- **cordova** `>= 9.0.0`
- **cordova-android** `>= 9.0.0`
- **ios** `>= 9`
- **android** `>= 22`

## Android

## iOS

This Plugin is developed in Swift and automaticaly adds the Plugin to [Support Swift](https://github.com/akofman/cordova-plugin-add-swift-support).

I developed it, testing with **cordova-ios@6.1.0**.

# Environment Variables

## iOS

The iOS platform defines:
- NSContactsUsageDescription: **This app requires access to the contacts to manage them.**

You can easily change it, by configure your **config.xml** by:
```xml
<edit-config file="*-Info.plist" mode="merge" target="NSContactsUsageDescription">
    <string>your text</string>
</edit-config>
```

# Usage

The plugin is available via a global variable named `window.ContactsX`.
A TypeScript definition is included out of the Box. You can import it like this:
```ts
import ContactsX from 'cordova-plugin-contacts-x';
```

## Failure Callbacks

If an Error appeared this Plugin returns an Object in the failureCallback, that always has the following Structure:

```json
{
  "code": 0,
  "message": "Some additional Info"
}
```

The `code` is one of the [Error Codes](#error-codes) and always present, while the `message` can be empty.
This is mostly something like an Exception Message.

## Error Codes

The following Error Codes can be fired by this Plugin:
- UnsupportedAction
- WrongJsonObject
- PermissionDenied
- UnknownError

They can be accessed over `window.ContactsX.ErrorCodes` and are present in the TypeScript definition too of course. 

# Api

The list of available methods for this plugin is described below.

## hasPermission

### Parameters:

- Success Callback
- Error Callback

```js
window.ContactsX.hasPermission(function(success) {
  console.log(success);
}, function (error) {
  console.error(error);
});
```

### SuccessType:

This Method returns an Object with the following field:

- read (boolean) has read permission
- write (boolean) has write permission

### Quirks

Apple only has one Permission, so in iOS read and write are always the same value.

## requestPermission

Request Contact Permission

### Parameters:

- Success Callback
- Error Callback

```js
window.ContactsX.requestPermission(function(success) {
  console.log(success);
}, function (error) {
  console.error(error);
});
```

### SuccessType:

Same SuccessType as **hasPermission()**

## requestWritePermission

Request Contact Write Permission (android only)

### Parameters:

- Success Callback
- Error Callback

```js
window.ContactsX.requestWritePermission(function(success) {
  console.log(success);
}, function (error) {
  console.error(error);
});
```

### SuccessType:

Same SuccessType as **hasPermission()**

## find

Find Contacts by given options. If you don't set a field to true, it is not included or empty in the result

### Parameters:

- Success Callback
- Error Callback
- Options:
    - fields:
        - displayName (boolean) - *Android only, default: true*
        - firstName (boolean) - *default: true*
        - middleName (boolean) - *default: true*
        - familyName (boolean) - *default: true*
        - phoneNumbers (boolean)
        - emails (boolean)

```js
window.ContactsX.find(function(success) {
  console.log(success);
}, function (error) {
  console.error(error);
}, {
  fields: {
    phoneNumbers: true
  }
});
```

### SuccessType:

This Method returns an Array of [ContactX](#contactx).

## pick

Launches the Contact Picker to select a single contact. Currently, all available fields are returned.

### Parameters:

- Success Callback
- Error Callback

```js
window.ContactsX.pick(function(success) {
  console.log(success);
}, function (error) {
  console.error(error);
});
```

### SuccessType:

This Method returns a single [ContactX](#contactx) object.

## save

Save or update a contact. If you provide the `id` the contact will be updated. (remember to add `rawId` on android also).

### Parameters:

- contact ([ContactX](#contactx))
- Success Callback
- Error Callback

```js
window.ContactsX.save(
  {
    firstName: "Hans",
    familyName: "Test",
    phoneNumebers: [{
      type: "mobile",
      value: "110"
    }]
  },
  function(success) {
    console.log(success);
  },
  function (error) {
  console.error(error);
});
```

### SuccessType:

This Method returns the final [ContactX](#contactx) object.

## delete

Delete a contact by id

### Parameters:

- id (string)
- Success Callback
- Error Callback

```js
window.ContactsX.delete("some_id",
  function(success) {
    console.log(success);
  },
  function (error) {
  console.error(error);
});
```

# Objects

## ContactX
- id (string) - a unique identifier
- displayName (string) - *Android only*
- firstName (string)
- middleName (string)
- familyName (string)
- phoneNumbers ([ContactXPhoneNumber](contactxphonenumber)[])
- emails ([ContactXEmail](#contactxemail)[])

## ContactXPhoneNumber
- id (string)
- type (string)
- value (string)

## ContactXEmail
- id (string)
- type (string)
- value (string)

# Changelog

The full Changelog is available [here](CHANGELOG.md)
