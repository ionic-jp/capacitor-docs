---
title: プライバシーマニフェスト
description: iOSアプリにプライバシーマニフェストを追加する
slug: /ios/privacy-manifest
---

Appleは最近、WWDC23で新しい[サードパーティSDKのプライバシープロトコル](https://developer.apple.com/news/?id=3d8a9yyh)を導入し、SDKの作成者がSDK内でのAPI使用の承認された理由を宣言することを要求しました。これにより、透明性とユーザープライバシーが向上します。

2024年3月13日から、App Store Connectは、特定のAPIにアクセスするための承認された理由がない新しいまたは更新されたアプリがアップロードされた場合にユーザーに通知します。

**2024年5月1日から、新しいまたは更新されたアプリをApp Store Connectに提出する際に、承認された理由を含める必要があります。**

## 要件を満たすための手順

すべてのアプリケーションがフラグされるわけではありませんが、`@capacitor/filesystem`や`@capacitor/preferences`などの特定のプラグインにはプライバシーマニフェストファイルが必要になる場合があります。通知を受け取った場合は次の手順を実行してください：

1. Capacitorを更新します：
a. Capacitor 6の場合は`>= 6.0.0`
b. Capacitor 5の場合は`>= 5.7.4`
c. Capacitor 4の場合は`>= 4.8.2`
d. Capacitor 3以下はサポートされていません
2. VS Code拡張機能を使用してアプリのプライバシーマニフェストファイルを作成するか、手動で作成します。

### VS Code拡張機能

[Ionic VS Code拡張機能](https://ionic.link/vscode)がインストールされていることを確認し、プロジェクトを開きます。

推奨事項の下に、アプリケーションが特定のAPIを使用するプラグインを使用している場合は*Add Privacy Manifest*が表示されます。

![No Manifest](/img/v6/docs/ios/no-manifest.png)

最小限のプライバシーマニフェストファイルを作成するには、Yesを選択します。

拡張機能は、*Missing Privacy Manifest Category*というタイトルの推奨事項として必要なすべての変更を一覧表示します。例えば：

![Privacy Change](/img/v6/docs/ios/privacy-change.png)

プラグインの使用方法を説明する理由コードのいずれかを選択する必要があります。わからない場合は、*Docs*をクリックしてAppleの各理由コードの説明に関するドキュメントを参照してください。

VS Code拡張機能には、既知のプラグインに関する一連のルールが含まれており、これを支援します。それでもAppleからプライバシーマニフェストの理由が不足しているために拒否される場合は、拡張機能が知らないプラグインを使用している可能性があります。[VS Code拡張機能の問題トラッカー](https://github.com/ionic-team/vscode-ionic/issues)で問題を報告できます。

### 手動手順

プライバシーマニフェストファイルを手動で作成する手順を実行する場合は、Xcodeを開きます：

*File > New File*を選択します。

*Resource*セクションまでスクロールし、*App Privacy File*タイプを選択します。

*Next*をクリックします。

*Targets*リストでアプリを確認します。

*Create*をクリックします。

`PrivacyInfo.xcprivacy`というファイルが作成されます。このファイルはXcode UIで対話的に作成するのが難しいため、右クリックして*Open with External Editor*を選択して手動で編集する方が簡単です。

以下は、`@capacitor/preferences`プラグインを使用してUserDefaults APIを使用する`PrivacyInfo.xcprivacy`ファイルのサンプルです。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyTracking</key>
    <false/>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <dict>
        <key>NSPrivacyAccessedAPIType</key>
        <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
        <key>NSPrivacyAccessedAPITypeReasons</key>
        <array>
          <string>CA92.1</string>
        </array>
      </dict>
    </array>
    <key>NSPrivacyTrackingDomains</key>
    <array/>
  </dict>
</plist>
```

プライバシーマニフェストの変更が必要なコードやプラグインを見つけるには、[このスクリプト](https://github.com/Wooder/ios_17_required_reason_api_scanner)のようなものを使用して、`sh required_reason_api_text_scanner.sh node_modules`を実行できます。

正しい理由コード（上記の例では`CA92.1`など）を選択するには、[Appleのドキュメント](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)を読む必要があります。

## ストア提出前

App Store提出前に、ユーザートラッキング、トラッキングドメイン、またはアプリケーション固有の他のデータタイプの収集を開示する必要がある場合があります。詳細については、[Appleのドキュメント](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)を参照してください。
