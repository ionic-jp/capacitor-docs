---
title: Splash Screen Capacitor Plugin API
description: スプラッシュスクリーンAPIでは、Splash画像の表示/非表示を切り替えることができます。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/src/definitions.ts
sidebar_label: Splash Screen
---

# @capacitor/splash-screen

スプラッシュスクリーンAPIでは、Splash画像の表示/非表示を切り替えることができます。

## Install

```bash
npm install @capacitor/splash-screen
npx cap sync
```

### Android 12 スプラッシュスクリーンAPI

_**これは起動時のスプラッシュスクリーンにのみ影響し、プログラムで`show()`メソッドを使用する場合には使用されません。**_

Capacitor 4は**[Android 12 スプラッシュスクリーンAPI](https://developer.android.com/guide/topics/ui/splash-screen)**と`androidx.core:core-splashscreen`互換性ライブラリを使用して、Android 11以下でも動作するようにしています。

互換性ライブラリは、`android/app/src/main/res/values/styles.xml`で`AppTheme.NoActionBarLaunch`の親を`Theme.SplashScreen`から`AppTheme.NoActionBar`に変更することで無効にできます。
Android 12 スプラッシュスクリーンAPIはAndroid OSの一部であるため、Android 12以降では無効にできません。

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/splash</item>
</style>
```

**注意**: Android 12およびAndroid 12Lデバイスでは、Nova Launcher、MIUI、Realme Launcher、OPPO Launcherなどのサードパーティランチャー、設定アプリのアプリ情報、またはAndroid StudioなどのIDEから起動した場合、スプラッシュスクリーン画像が表示されません。
**[Google Issue Tracker](https://issuetracker.google.com/issues/205021357)**
**[Google Issue Tracker](https://issuetracker.google.com/issues/207386164)**
Googleはこれらの問題をAndroid 13で修正しましたが、Android 12およびAndroid 12Lへの修正のバックポートは行いません。
ランチャー関連の問題はランチャーのアップデートで修正される可能性があります。
Android 13でスプラッシュスクリーンに関連する問題が見つかった場合は、[Google](https://issuetracker.google.com/)に報告してください。

## Example

```typescript
import { SplashScreen } from '@capacitor/splash-screen';

// Hide the splash (you should do this on app launch)
await SplashScreen.hide();

// Show the splash for an indefinite amount of time:
await SplashScreen.show({
  autoHide: false,
});

// Show the splash for two seconds and then automatically hide it:
await SplashScreen.show({
  showDuration: 2000,
  autoHide: true,
});
```

## スプラッシュスクリーンの非表示

デフォルトでは、スプラッシュスクリーンは500ms後に自動的に非表示になるように設定されています。

アプリの準備ができる前にスプラッシュスクリーンが消えないようにしたい場合は、`launchAutoHide`を`false`に設定します。スプラッシュスクリーンは手動で非表示にするまで表示されたままになります。最高のユーザーエクスペリエンスのために、アプリはできるだけ早く`hide()`を呼び出すべきです。

代わりに、スプラッシュスクリーンを一定時間表示したい場合は、[Capacitor設定ファイル](https://capacitorjs.com/docs/config)で`launchShowDuration`を設定します。

## 背景色

特定の条件下、特にスプラッシュスクリーンがデバイス画面を完全にカバーしていない場合、（透明性のため）角の周りにアプリ画面が見えることがあります。透明色を表示する代わりに、`backgroundColor`を設定してそれらの領域をカバーできます。

`backgroundColor`の可能な値は`#RRGGBB`または`#RRGGBBAA`です。

## スピナー

スプラッシュスクリーンの上にスピナーを表示したい場合は、[Capacitor設定ファイル](https://capacitorjs.com/docs/config)で`showSpinner`を`true`に設定します。

以下の設定でスピナーの外観をカスタマイズできます。

Androidの場合、`androidSpinnerStyle`には以下のオプションがあります：

- `horizontal`
- `small`
- `large`（デフォルト）
- `inverse`
- `smallInverse`
- `largeInverse`

iOSの場合、`iosSpinnerStyle`には以下のオプションがあります：

- `large`（デフォルト）
- `small`

スピナーの色を設定するには`spinnerColor`を使用します。値は`#RRGGBB`または`#RRGGBBAA`です。

## 設定

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

以下の設定値が利用可能です：

| Prop                            | Type                                                                                                                          | Description                                                                                                                                                                                                                                             | Default             | Since |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| **`launchShowDuration`**        | <code>number</code>                                                                                                           | How long to show the launch splash screen when autoHide is enabled (in ms)                                                                                                                                                                              | <code>500</code>    | 1.0.0 |
| **`launchAutoHide`**            | <code>boolean</code>                                                                                                          | Whether to auto hide the splash after launchShowDuration.                                                                                                                                                                                               | <code>true</code>   | 1.0.0 |
| **`launchFadeOutDuration`**     | <code>number</code>                                                                                                           | Duration for the fade out animation of the launch splash screen (in ms) Only available for Android, when using the Android 12 Splash Screen API.                                                                                                        | <code>200</code>    | 4.2.0 |
| **`backgroundColor`**           | <code>string</code>                                                                                                           | Color of the background of the Splash Screen in hex format, #RRGGBB or #RRGGBBAA. Doesn't work if `useDialog` is true or on launch when using the Android 12 API.                                                                                       |                     | 1.0.0 |
| **`androidSplashResourceName`** | <code>string</code>                                                                                                           | Name of the resource to be used as Splash Screen. Doesn't work on launch when using the Android 12 API. Only available on Android.                                                                                                                      | <code>splash</code> | 1.0.0 |
| **`androidScaleType`**          | <code>'CENTER' \| 'CENTER_CROP' \| 'CENTER_INSIDE' \| 'FIT_CENTER' \| 'FIT_END' \| 'FIT_START' \| 'FIT_XY' \| 'MATRIX'</code> | The [ImageView.ScaleType](https://developer.android.com/reference/android/widget/ImageView.ScaleType) used to scale the Splash Screen image. Doesn't work if `useDialog` is true or on launch when using the Android 12 API. Only available on Android. | <code>FIT_XY</code> | 1.0.0 |
| **`showSpinner`**               | <code>boolean</code>                                                                                                          | Show a loading spinner on the Splash Screen. Doesn't work if `useDialog` is true or on launch when using the Android 12 API.                                                                                                                            |                     | 1.0.0 |
| **`androidSpinnerStyle`**       | <code>'horizontal' \| 'small' \| 'large' \| 'inverse' \| 'smallInverse' \| 'largeInverse'</code>                              | Style of the Android spinner. Doesn't work if `useDialog` is true or on launch when using the Android 12 API.                                                                                                                                           | <code>large</code>  | 1.0.0 |
| **`iosSpinnerStyle`**           | <code>'small' \| 'large'</code>                                                                                               | Style of the iOS spinner. Doesn't work if `useDialog` is true. Only available on iOS.                                                                                                                                                                   | <code>large</code>  | 1.0.0 |
| **`spinnerColor`**              | <code>string</code>                                                                                                           | Color of the spinner in hex format, #RRGGBB or #RRGGBBAA. Doesn't work if `useDialog` is true or on launch when using the Android 12 API.                                                                                                               |                     | 1.0.0 |
| **`splashFullScreen`**          | <code>boolean</code>                                                                                                          | Hide the status bar on the Splash Screen. Doesn't work on launch when using the Android 12 API. Only available on Android.                                                                                                                              |                     | 1.0.0 |
| **`splashImmersive`**           | <code>boolean</code>                                                                                                          | Hide the status bar and the software navigation buttons on the Splash Screen. Doesn't work on launch when using the Android 12 API. Only available on Android.                                                                                          |                     | 1.0.0 |
| **`layoutName`**                | <code>string</code>                                                                                                           | If `useDialog` is set to true, configure the Dialog layout. If `useDialog` is not set or false, use a layout instead of the ImageView. Doesn't work on launch when using the Android 12 API. Only available on Android.                                 |                     | 1.1.0 |
| **`useDialog`**                 | <code>boolean</code>                                                                                                          | Use a Dialog instead of an ImageView. If `layoutName` is not configured, it will use a layout that uses the splash image as background. Doesn't work on launch when using the Android 12 API. Only available on Android.                                |                     | 1.1.0 |

### 設定例

`capacitor.config.json`での設定：

```json
{
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 3000,
      "launchAutoHide": true,
      "launchFadeOutDuration": 3000,
      "backgroundColor": "#ffffffff",
      "androidSplashResourceName": "splash",
      "androidScaleType": "CENTER_CROP",
      "showSpinner": true,
      "androidSpinnerStyle": "large",
      "iosSpinnerStyle": "small",
      "spinnerColor": "#999999",
      "splashFullScreen": true,
      "splashImmersive": true,
      "layoutName": "launch_screen",
      "useDialog": true
    }
  }
}
```

`capacitor.config.ts`での設定：

```ts
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
};

export default config;
```

</docgen-config>

### Android

`splash.png`以外の名前のスプラッシュスクリーン画像を使用するには、`androidSplashResourceName`を新しいリソース名に設定します。さらに、`android/app/src/main/res/values/styles.xml`で、以下のブロック内のリソース名を変更します：

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/NAME</item>
</style>
```

### Variables

このプラグインは以下のプロジェクト変数（アプリの `variables.gradle` ファイルで定義）を使用します：

- `coreSplashScreenVersion`: `androidx.core:core-splashscreen` のバージョン（デフォルト: `1.2.0`）

## ガイド例

[独自のアイコンとスプラッシュスクリーン画像の追加 &#8250;](https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/)

[Capacitor用の動的/適応可能なスプラッシュスクリーンの作成（Android） &#8250;](https://www.joshmorony.com/creating-a-dynamic-universal-splash-screen-for-capacitor-android/)

## API

<docgen-index>

* [`show(...)`](#show)
* [`hide(...)`](#hide)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### show(...)

```typescript
show(options?: ShowOptions | undefined) => Promise<void>
```

Show the splash screen

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**Since:** 1.0.0

--------------------


### hide(...)

```typescript
hide(options?: HideOptions | undefined) => Promise<void>
```

Hide the splash screen

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#hideoptions">HideOptions</a></code> |

**Since:** 1.0.0

--------------------


### Interfaces


#### ShowOptions

| Prop                  | Type                 | Description                                                         | Default           | Since |
| --------------------- | -------------------- | ------------------------------------------------------------------- | ----------------- | ----- |
| **`autoHide`**        | <code>boolean</code> | Whether to auto hide the splash after showDuration                  |                   | 1.0.0 |
| **`fadeInDuration`**  | <code>number</code>  | How long (in ms) to fade in.                                        | <code>200</code>  | 1.0.0 |
| **`fadeOutDuration`** | <code>number</code>  | How long (in ms) to fade out.                                       | <code>200</code>  | 1.0.0 |
| **`showDuration`**    | <code>number</code>  | How long to show the splash screen when autoHide is enabled (in ms) | <code>3000</code> | 1.0.0 |


#### HideOptions

| Prop                  | Type                | Description                                                                                                                                                       | Default          | Since |
| --------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----- |
| **`fadeOutDuration`** | <code>number</code> | How long (in ms) to fade out. On Android, if using the Android 12 Splash Screen API, it's not being used. Use launchFadeOutDuration configuration option instead. | <code>200</code> | 1.0.0 |

</docgen-api>