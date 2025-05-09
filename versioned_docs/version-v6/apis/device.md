---
title: Device Capacitor Plugin API
description: The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/device/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/device/src/definitions.ts
sidebar_label: Device
---

# @capacitor/device

The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.

## Install

```bash
npm install @capacitor/device
npx cap sync
```

## Apple Privacy Manifest Requirements

Apple mandates that app developers now specify approved reasons for API usage to enhance user privacy. By May 1st, 2024, it's required to include these reasons when submitting apps to the App Store Connect.

When using this specific plugin in your app, you must create a `PrivacyInfo.xcprivacy` file in `/ios/App` or use the VS Code Extension to generate it, specifying the usage reasons.

For detailed steps on how to do this, please see the [Capacitor Docs](https://capacitorjs.com/docs/ios/privacy-manifest).

**For this plugin, the required dictionary key is [NSPrivacyAccessedAPICategoryDiskSpace](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278397) and the recommended reason is [85F4.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278397).**

### Example PrivacyInfo.xcprivacy

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- Add this dict entry to the array if the PrivacyInfo file already exists -->
      <dict>
        <key>NSPrivacyAccessedAPIType</key>
        <string>NSPrivacyAccessedAPICategoryDiskSpace</string>
        <key>NSPrivacyAccessedAPITypeReasons</key>
        <array>
          <string>85F4.1</string>
        </array>
      </dict>
    </array>
  </dict>
</plist>
```

## Example Plugin Usage

```typescript
import { Device } from '@capacitor/device';

const logDeviceInfo = async () => {
  const info = await Device.getInfo();

  console.log(info);
};

const logBatteryInfo = async () => {
  const info = await Device.getBatteryInfo();

  console.log(info);
};
```

## API

<docgen-index>

* [`getId()`](#getid)
* [`getInfo()`](#getinfo)
* [`getBatteryInfo()`](#getbatteryinfo)
* [`getLanguageCode()`](#getlanguagecode)
* [`getLanguageTag()`](#getlanguagetag)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getId()

```typescript
getId() => Promise<DeviceId>
```

Return an unique identifier for the device.

**Returns:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<DeviceInfo>
```

Return information about the underlying device/os/platform.

**Returns:** <code>Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<BatteryInfo>
```

Return information about the battery.

**Returns:** <code>Promise&lt;<a href="#batteryinfo">BatteryInfo</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getLanguageCode()

```typescript
getLanguageCode() => Promise<GetLanguageCodeResult>
```

Get the device's current language locale code.

**Returns:** <code>Promise&lt;<a href="#getlanguagecoderesult">GetLanguageCodeResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getLanguageTag()

```typescript
getLanguageTag() => Promise<LanguageTag>
```

Get the device's current language locale tag.

**Returns:** <code>Promise&lt;<a href="#languagetag">LanguageTag</a>&gt;</code>

**Since:** 4.0.0

--------------------


### Interfaces


#### DeviceId

| Prop             | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Since |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`identifier`** | <code>string</code> | The identifier of the device as available to the app. This identifier may change on modern mobile platforms that only allow per-app install ids. On iOS, the identifier is a UUID that uniquely identifies a device to the app’s vendor ([read more](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor)). on Android 8+, __the identifier is a 64-bit number (expressed as a hexadecimal string)__, unique to each combination of app-signing key, user, and device ([read more](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID)). On web, a random identifier is generated and stored on localStorage for subsequent calls. If localStorage is not available a new random identifier will be generated on every call. | 1.0.0 |


#### DeviceInfo

| Prop                    | Type                                                        | Description                                                                                                                                                                                                                                                                                                                                      | Since |
| ----------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`name`**              | <code>string</code>                                         | The name of the device. For example, "John's iPhone". This is only supported on iOS and Android 7.1 or above. On iOS 16+ this will return a generic device name without the appropriate [entitlements](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name). | 1.0.0 |
| **`model`**             | <code>string</code>                                         | The device model. For example, "iPhone13,4".                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`platform`**          | <code>'ios' \| 'android' \| 'web'</code>                    | The device platform (lowercase).                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`operatingSystem`**   | <code><a href="#operatingsystem">OperatingSystem</a></code> | The operating system of the device.                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`osVersion`**         | <code>string</code>                                         | The version of the device OS.                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`iOSVersion`**        | <code>number</code>                                         | The iOS version number. Only available on iOS. Multi-part version numbers are crushed down into an integer padded to two-digits, ex: `"16.3.1"` -&gt; `160301`                                                                                                                                                                                   | 5.0.0 |
| **`androidSDKVersion`** | <code>number</code>                                         | The Android SDK version number. Only available on Android.                                                                                                                                                                                                                                                                                       | 5.0.0 |
| **`manufacturer`**      | <code>string</code>                                         | The manufacturer of the device.                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`isVirtual`**         | <code>boolean</code>                                        | Whether the app is running in a simulator/emulator.                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`memUsed`**           | <code>number</code>                                         | Approximate memory used by the current app, in bytes. Divide by 1048576 to get the number of MBs used.                                                                                                                                                                                                                                           | 1.0.0 |
| **`diskFree`**          | <code>number</code>                                         | How much free disk space is available on the normal data storage path for the os, in bytes. On Android it returns the free disk space on the "system" partition holding the core Android OS. On iOS this value is not accurate.                                                                                                                  | 1.0.0 |
| **`diskTotal`**         | <code>number</code>                                         | The total size of the normal data storage path for the OS, in bytes. On Android it returns the disk space on the "system" partition holding the core Android OS.                                                                                                                                                                                 | 1.0.0 |
| **`realDiskFree`**      | <code>number</code>                                         | How much free disk space is available on the normal data storage, in bytes.                                                                                                                                                                                                                                                                      | 1.1.0 |
| **`realDiskTotal`**     | <code>number</code>                                         | The total size of the normal data storage path, in bytes.                                                                                                                                                                                                                                                                                        | 1.1.0 |
| **`webViewVersion`**    | <code>string</code>                                         | The web view browser version                                                                                                                                                                                                                                                                                                                     | 1.0.0 |


#### BatteryInfo

| Prop               | Type                 | Description                                                       | Since |
| ------------------ | -------------------- | ----------------------------------------------------------------- | ----- |
| **`batteryLevel`** | <code>number</code>  | A percentage (0 to 1) indicating how much the battery is charged. | 1.0.0 |
| **`isCharging`**   | <code>boolean</code> | Whether the device is charging.                                   | 1.0.0 |


#### GetLanguageCodeResult

| Prop        | Type                | Description                  | Since |
| ----------- | ------------------- | ---------------------------- | ----- |
| **`value`** | <code>string</code> | Two character language code. | 1.0.0 |


#### LanguageTag

| Prop        | Type                | Description                                     | Since |
| ----------- | ------------------- | ----------------------------------------------- | ----- |
| **`value`** | <code>string</code> | Returns a well-formed IETF BCP 47 language tag. | 4.0.0 |


### Type Aliases


#### OperatingSystem

<code>'ios' | 'android' | 'windows' | 'mac' | 'unknown'</code>

</docgen-api>