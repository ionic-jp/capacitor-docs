---
title: Migrating from Cordova to Capacitor
description: Migrating from Cordova to Capacitor
url: /docs/cordova/migrating-from-cordova-to-capacitor
contributors:
  - dotnetkow
---

# WebアプリのCordovaからCapacitorへのマイグレーション

<p class="intro">Cordovaを使用してWebアプリケーションを完全にCapacitorに移行するには、いくつかの手順が必要です。</p>

<blockquote>
これらの変更を適用する場合は、別のコードブランチで作業することをお勧めします。
</blockquote>

## Capacitorを追加する

まず、プロジェクトをターミナルで開き、[Webアプリ](/docs/getting-started) か [Ionicアプリ](/docs/getting-started/with-ionic) の方法でCapacitorを追加します。

次に、`config.xml`を開いて、widgetエレメントにある`id`を見つけます。例えば、 `io.ionic.myapp` です。

```xml
<widget id="io.ionic.myapp" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
```

またあなたのアプリの `Name` を見つけます:

```xml
<name>MyApp</name>
```

Capacitorのインストールの時に、あなたのアプリの情報を入力します:

```bash
npx cap init [appName] [appId]
```

例えば、これは `npx cap init MyApp io.ionic.myapp` のようになります。これらの値は新しく作成される `capacitor.config.json` に反映されます。

### アプリをビルドする
ネイティブプラットフォームを追加する前に、Webプロジェクトを少なくとも1回構築する必要があります。

これにより、Capacitorが、`capacitor.config.json`の`webDir`において使用するように[自動的に設定された](/docs/basics/configuring-your-app/)wwwフォルダーが実際に存在するようになります。

### Platformsの追加

Capacitorのネイティブプラットフォームは、その最上位フォルダにあります。Cordovaの場合は、`platforms/ios` もしくは `platforms/android` でした。

```bash
npx cap add ios
npx cap add android
```

プロジェクトのルートにあるandroidフォルダとiosフォルダの両方が作成されます。これらは完全に独立したネイティブプロジェクトの成果物であり、アプリの一部と見なす必要があります（つまり、それらをソース管理にチェックインしたり、独自のIDEで編集したりするなど）。さらに、以前に `npm install`（` package.json`の `dependencies`の下にあります）でプロジェクトに追加されたCordovaプラグインは、Capacitorによってそれぞれの新しいネイティブプロジェクトに自動的にインストールされます（[incompatible ones](/docs/cordova/known-incompatible-plugins)は除きます）：

```json
"dependencies": {
    "@ionic-native/camera": "^5.3.0",
    "@ionic-native/core": "^5.3.0",
    "@ionic-native/file": "^5.3.0",
    "cordova-android": "8.0.0",
    "cordova-ios": "5.0.0",
    "cordova-plugin-camera": "4.0.3",
    "cordova-plugin-file": "6.0.1",
}
```

## スプラッシュ画像とアイコン

アイコンとスプラッシュ画像を以前に作成したことがある場合は、プロジェクトの最上位レベルの`resources`フォルダにあります。[このガイドに従って](https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/)に従って、これらを各ネイティブプロジェクトに移動します。

## Pluginsのマイグレート

既存のCordovaプラグインを監査することから始めます。不要になったプラグインを削除できる場合があります。

次に、Capacitorのすべての [core plugins](/docs/apis) と [community plugins](/docs/community/plugins) を確認します。Capacitorに相当するCordovaプラグインに切り替えることができます。また、Cordovaがこれまでサポートしていなかった [PWA](/docs/web) や [Desktop](/docs/electron/) 機能など、一部のCapacitorプラグインはモバイル以外にも拡張されています。たとえば、 [Capacitor Camera](/docs/apis/camera) と [Cordova Camera](https://github.com/apache/cordova-plugin-camera) を比較します。

プラグインによっては機能が完全に一致しない場合がありますが、必要な機能によっては問題にならない場合があります。

[incompatible or cause build issues](/docs/cordova/known-incompatible-plugins) のプラグインは自動的にスキップされることに注意ください。

## Permissionの設定

デフォルトでは、最新バージョンのCapacitorに必要な初期パーミッションは、iOSとAndroidの両方のデフォルトネイティブプロジェクトに設定されます。ただし、`plugin.xml` のマッピングによって、追加のアクセス権を手動で適用しなければならない場合もあります。これは、iOSとAndroidで必要な設定です。各プラットフォームの構成方法については、[iOS](/docs/ios/configuration)および[アンドロイド](/docs/android/設定)の構成ガイドを参照してください。

## Config.xml フィールドの追加

When `npx cap init` is run, Capacitor reads all the preferences in `config.xml` and port them to `capacitor.config.json` file. You can manually add more preferences to the `cordova.preferences` object too.

```json
{
  "cordova": {
    "preferences": {
      "DisableDeploy": "true",
      "CameraUsesGeolocation": "true"
    }
  }
}
```


## Additional Config.xml Fields
>>>>>>> d67d460127fb285810ad4aa7850381caea5e8499

あなたは `config.xml` の他の要素がCapacitorアプリではどのように動作するか気になるかもしれません。

Author要素は`package.json` で設定できます。ただし、Capacitorやアプリケーション内では使用されません:

```xml
<author email="email@test.com" href="http://ionicframework.com/">Ionic Framework Team</author>
```

`allow-intent`値のほとんどは使用されませんが、Capacitorに[構成可能な代替手段](/docs/basics/configuring-your-app/)の設定があります。

```xml
<allow-intent href="http://*/*" />
<allow-intent href="https://*/*" />
<allow-intent href="tel:*" />
<allow-intent href="sms:*" />
<allow-intent href="mailto:*" />
<allow-intent href="geo:*" />
```

iOS の`edit-config` 要素は [configured in Info.plist](/docs/ios/configuration) を必要とします。

```xml
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
    <string>Used to take photos</string>
</edit-config>
```

すべての`config.xml`の要素をカバーするのは不可能です。しかし、"CapacitorでXを設定するにはどうやったらいい？"に関する質問のほとんどは、オンラインで答えを探すときには「[プラットフォーム](iOS/Android)でXを設定するには?」と考えるべきです。

## Setting Scheme

When using Ionic with Cordova, your app uses `cordova-plugin-ionic-webview` by default, which on iOS uses `ionic://` scheme for serving the content. Capacitor apps use `capacitor://` as default scheme on iOS. This means that using a origin-binded Web API like LocalStorage, will result in a loss of data as the origin is different. This can be fixed by changing the scheme that is used for serving the content:

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## Cordova の削除

すべてのマイグレーション変更が適用され、アプリケーションが正常に動作することをテストしたら、Cordovaをプロジェクトから削除できます。`config.xml`を削除します。`platforms` フォルダと `plugins` フォルダも同様です。CordovaはCapacitorと一緒に動作するので、技術的に取り外す必要はないことに注意してください。実際、Cordovaプラグインの使用を継続する予定がある場合、または将来的に使用する可能性がある場合は、Cordovaアセットをそのまま使用できます。

## 次のステップ

これは、Capacitorの旅の始まりにすぎません。より学ぶには、Capacitorプロジェクトでの [using Cordova plugins](/docs/cordova/using-cordova-plugins)か、より詳しくは [development workflow](/docs/basics/workflow) をご覧ください。
