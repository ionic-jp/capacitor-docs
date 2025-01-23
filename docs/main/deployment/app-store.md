---
title: iOS App Storeへのデプロイ
sidebar_label: iOS App Store
---

<head>
  <title>Publish to iOS App Store: Apple App Store Deployment for Ionic</title>
  <meta
    name="description"
    content="Review the requirements to publish an Ionic app to the Apple iOS App Store. Learn to generate a release build and other necessary steps for deployment."
  />
</head>

## 要件

iOS App Storeにアプリを提出するには、いくつかの要件があります：

- Xcode
- 有料のAppleデベロッパーアカウント
- 有効なプロビジョニングプロファイル
- アプリ開発および配布証明書

Apple Developer Programに登録するには、[こちらに記載されている](https://developer.apple.com/programs/)手順に従ってください。

## リリースビルドの生成

iOSプラットフォームがまだ追加されていない場合は、必ず追加してください：

```shell
$ ionic cordova platform add ios
```

プラットフォームが追加されたら、`--prod`フラグを使用してビルドコマンドを実行します：

```shell
$ ionic cordova build ios --prod
```

これにより、アプリのウェブ部分の最小化されたコードが生成され、iOSコードベースにコピーされます。

ここから、`./platforms/ios/`の`.xcworkspace`ファイルを開いてXcodeを起動します。

## 署名証明書の生成

iOSの証明書を生成するのは少し手間がかかるプロセスなので、証明書とは何か、そしてそれを生成する方法については[Appleの公式ドキュメント](https://help.apple.com/xcode/mac/current/#/dev3a05256b8)を必ず確認してください。

必要な証明書とプロファイルを作成するには、[Appleのメンバーセンター](https://developer.apple.com/membercenter)にアクセスし、Appleのドキュメントに記載されているリンクに従ってください。

ここで重要なのは、開発用と配布用の2種類の証明書です。開発証明書はその名の通り、開発時に使用されます。アプリに署名し、その証明書がアクセスできるデバイスにデプロイするためのものです。

配布証明書はアプリをストアに配布するためのものです。配布証明書で署名されたアプリは、任意のデバイスにインストールできます。

## Xcodeでのアプリの署名

正しい証明書を生成した後、Xcodeに証明書を自動的に管理させるか、手動で管理するかを選択できます。Xcodeに証明書を自動的に管理させることをお勧めします。これにより、ビルドタイプに基づいて正しい開発および配布証明書が使用されることが保証されます。

このオプションを選択した状態で、`Product > Archive`メニューから`Archive`を選択します。これにより、アプリストアで配布する準備が整ったバージョンのアプリがビルドされます。アーカイブが作成されると、Xcode Organizerが開きます。

Xcode Organizerには、現在のアプリのビルドのリストが表示されます。最後のビルドを選択し、「App Storeにアップロード」ボタンをクリックします。
チームを選択する場所があり、その後アプリに関するいくつかの情報が表示され、「アップロード」ボタンをクリックします。

アップロードが成功すると、アプリは[iTunes Connect](https://itunesconnect.apple.com)にリストされ、「アクティビティ」に表示されます。
そこから、TestFlightを有効にしてベータテストを行うか、Appleに承認を依頼することができます。

## アプリの更新

アプリが成長するにつれて、新機能や修正を加えて更新する必要があります。
アプリは、新しいバージョンをAppleに提出するか、Appflowの<a href="https://ionic.io/docs/appflow/deploy/intro" target="_blank">ライブアップデート機能</a>のようなライブアップデートサービスを使用して更新できます。

<strong>ライブアップデート</strong>を使用すると、Appflowダッシュボードから直接ユーザーにリアルタイムでアプリの変更をプッシュすることができ、App Storeの承認を待つ必要がありません。

:::note
iOS App Storeが更新されたビルドを受け入れるためには、config.xmlファイルを編集してバージョン値をインクリメントし、上記の手順に従ってリリース用にアプリを再ビルドする必要があります。
:::
