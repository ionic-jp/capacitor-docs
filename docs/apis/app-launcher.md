---
title: App Launcher Capacitor Plugin API
description: AppLauncher APIで他のアプリを開くことができます
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/src/definitions.ts
sidebar_label: App Launcher
---

# @capacitor/app-launcher

AppLauncher APIを使うと、アプリが開けるかどうかをチェックして、アプリを開くことができます。

iOSでは、アプリのURLスキームを知っている場合のみ、アプリを開くことができます。

Androidでは、アプリのURLスキームがわかっているか、公開されているパッケージ名を使用すれば、アプリを開くことができます。

**注意:** [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility) 以降では、`AndroidManifest.xml` の `queries` タグ内に、照会したいアプリのパッケージ名を追加する必要があります。

Example:
```xml
<queries>
  <package android:name="com.getcapacitor.myapp" />
</queries>
```

## Install

```bash
npm install @capacitor/app-launcher
npx cap sync
```

## Example

```typescript
import { AppLauncher } from '@capacitor/app-launcher';

const checkCanOpenUrl = async () => {
  const { value } = await AppLauncher.canOpenUrl({ url: 'com.getcapacitor.myapp' });

  console.log('Can open url: ', value);
};

const openPortfolioPage = async () => {
  await AppLauncher.openUrl({ url: 'com.getcapacitor.myapp://page?id=portfolio' });
};
```

## API

<docgen-index>

* [`canOpenUrl(...)`](#canopenurl)
* [`openUrl(...)`](#openurl)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### canOpenUrl(...)

```typescript
canOpenUrl(options: CanOpenURLOptions) => Promise<CanOpenURLResult>
```

Check if an app can be opened with the given URL.

On iOS you must declare the URL schemes you pass to this method by adding
the `LSApplicationQueriesSchemes` key to your app's `Info.plist` file.
Learn more about configuring
[`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist).

This method always returns false for undeclared schemes, whether or not an
appropriate app is installed. To learn more about the key, see
[LSApplicationQueriesSchemes](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/plist/info/LSApplicationQueriesSchemes).

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#canopenurloptions">CanOpenURLOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#canopenurlresult">CanOpenURLResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### openUrl(...)

```typescript
openUrl(options: OpenURLOptions) => Promise<OpenURLResult>
```

Open an app with the given URL.
On iOS the URL should be a known URLScheme.
On Android the URL can be a known URLScheme or an app package name.

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#openurloptions">OpenURLOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#openurlresult">OpenURLResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### Interfaces


#### CanOpenURLResult

| Prop        | Type                 |
| ----------- | -------------------- |
| **`value`** | <code>boolean</code> |


#### CanOpenURLOptions

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


#### OpenURLResult

| Prop            | Type                 |
| --------------- | -------------------- |
| **`completed`** | <code>boolean</code> |


#### OpenURLOptions

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |

</docgen-api>