---
title: Preferences Capacitor Plugin API
description: Preferences APIは、軽量なデータのためのシンプルなキー/バリューの永続ストアを提供します。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/src/definitions.ts
sidebar_label: Preferences
---

# @capacitor/preferences

Preferences APIは、軽量なデータのためのシンプルなキー/バリューの永続ストアを提供します。

モバイル OS は定期的に `window.localStorage` に保存されたデータを消去することがあるので、
代わりにこの API を使用する必要があります。
この API は Progressive Web App として動作している場合、`localStorage` を使用するようにフォールバックします。

このプラグインは、iOS では [`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults) を、
Windows では [`SharedPreferences`](https://developer.apple.com/documentation/foundation/userdefaults) を使用します。
Android では [`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences) を
使用します。
保存されたデータは、アプリがアンインストールされると消去されます。

**注意**: このAPIは、ローカルデータベースとして使用することは想定していません。アプリが多くのデータを
アプリが大量のデータを保存する場合、読み取り/書き込みの負荷が高い場合、または複雑なクエリを必要とする場合。
SQLiteベースのソリューションを検討することをお勧めします。そのようなソリューションの1つが、完全な暗号化をサポートするSQLiteベースのエンジンである[Ionic Secure Storage](https://ionic.io/docs/secure-storage)です。Capacitor Community](https://github.com/capacitor-community/) は、他にも多くのストレージエンジンを構築しています。

## Install

```bash
npm install @capacitor/preferences
npx cap sync
```

## Apple プライバシーマニフェストの要件

Appleは、ユーザーのプライバシーを向上させるために、アプリ開発者がAPI使用の承認された理由を指定することを義務付けています。2024年5月1日までに、App Store Connectにアプリを提出する際にこれらの理由を含める必要があります。

このプラグインをアプリで使用する場合、`/ios/App`に`PrivacyInfo.xcprivacy`ファイルを作成するか、VS Code拡張機能を使用して生成し、使用理由を指定する必要があります。

詳細な手順については、[Capacitorドキュメント](https://capacitorjs.com/docs/ios/privacy-manifest)を参照してください。

**このプラグインで必要な辞書キーは[NSPrivacyAccessedAPICategoryUserDefaults](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401)で、推奨される理由は[CA92.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401)です。**

### PrivacyInfo.xcprivacyの例

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
        <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
        <key>NSPrivacyAccessedAPITypeReasons</key>
        <array>
          <string>CA92.1</string>
        </array>
      </dict>
    </array>
  </dict>
</plist>
```

## プラグインの使用例

```typescript
import { Preferences } from '@capacitor/preferences';

const setName = async () => {
  await Preferences.set({
    key: 'name',
    value: 'Max',
  });
};

const checkName = async () => {
  const { value } = await Preferences.get({ key: 'name' });

  console.log(`Hello ${value}!`);
};

const removeName = async () => {
  await Preferences.remove({ key: 'name' });
};
```

## JSONの使用

Preferences APIは文字列値のみをサポートしています。ただし、`set()`を呼び出す前にオブジェクトを`JSON.stringify`し、`get()`から返された値を`JSON.parse`することでJSONを使用できます。

この方法は、数値やブール値などの文字列以外の値を保存するためにも使用できます。

## API

<docgen-index>

* [`configure(...)`](#configure)
* [`get(...)`](#get)
* [`set(...)`](#set)
* [`remove(...)`](#remove)
* [`clear()`](#clear)
* [`keys()`](#keys)
* [`migrate()`](#migrate)
* [`removeOld()`](#removeold)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### configure(...)

```typescript
configure(options: ConfigureOptions) => Promise<void>
```

Configure the preferences plugin at runtime.

Options that are `undefined` will not be used.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**Since:** 1.0.0

--------------------


### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

Get the value from preferences of a given key.

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#getoptions">GetOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

Set the value in preferences for a given key.

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**Since:** 1.0.0

--------------------


### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

Remove the value from preferences for a given key, if any.

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**Since:** 1.0.0

--------------------


### clear()

```typescript
clear() => Promise<void>
```

Clear keys and values from preferences.

**Since:** 1.0.0

--------------------


### keys()

```typescript
keys() => Promise<KeysResult>
```

Return the list of known keys in preferences.

**Returns:** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

Migrate data from the Capacitor 2 Storage plugin.

This action is non-destructive. It will not remove old data and will only
write new data if they key was not already set.
To remove the old data after being migrated, call removeOld().

**Returns:** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeOld()

```typescript
removeOld() => Promise<void>
```

Removes old data with `_cap_` prefix from the Capacitor 2 Storage plugin.

**Since:** 1.1.0

--------------------


### Interfaces


#### ConfigureOptions

| Prop        | Type                | Description                                                                                                                                                                                                                                                                                                                                              | Default                       | Since |
| ----------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----- |
| **`group`** | <code>string</code> | Set the preferences group. Preferences groups are used to organize key/value pairs. Using the value 'NativeStorage' provides backwards-compatibility with [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage). WARNING: The `clear()` method can delete unintended values when using the 'NativeStorage' group. | <code>CapacitorStorage</code> | 1.0.0 |


#### GetResult

| Prop        | Type                        | Description                                                                                                                       | Since |
| ----------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`** | <code>string \| null</code> | The value from preferences associated with the given key. If a value was not previously set or was removed, value will be `null`. | 1.0.0 |


#### GetOptions

| Prop      | Type                | Description                                       | Since |
| --------- | ------------------- | ------------------------------------------------- | ----- |
| **`key`** | <code>string</code> | The key whose value to retrieve from preferences. | 1.0.0 |


#### SetOptions

| Prop        | Type                | Description                                                   | Since |
| ----------- | ------------------- | ------------------------------------------------------------- | ----- |
| **`key`**   | <code>string</code> | The key to associate with the value being set in preferences. | 1.0.0 |
| **`value`** | <code>string</code> | The value to set in preferences with the associated key.      | 1.0.0 |


#### RemoveOptions

| Prop      | Type                | Description                                     | Since |
| --------- | ------------------- | ----------------------------------------------- | ----- |
| **`key`** | <code>string</code> | The key whose value to remove from preferences. | 1.0.0 |


#### KeysResult

| Prop       | Type                  | Description                    | Since |
| ---------- | --------------------- | ------------------------------ | ----- |
| **`keys`** | <code>string[]</code> | The known keys in preferences. | 1.0.0 |


#### MigrateResult

| Prop           | Type                  | Description                                                                                                                           | Since |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`migrated`** | <code>string[]</code> | An array of keys that were migrated.                                                                                                  | 1.0.0 |
| **`existing`** | <code>string[]</code> | An array of keys that were already migrated or otherwise exist in preferences that had a value in the Capacitor 2 Preferences plugin. | 1.0.0 |

</docgen-api>