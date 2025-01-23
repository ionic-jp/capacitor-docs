---
title: デスクトップアプリのデプロイ
sidebar_label: Electron Desktop App
---

<head>
  <title>Building a Desktop Application for Windows and macOS App Stores</title>
  <meta
    name="description"
    content="Building an Ionic desktop application for Windows and macOS app stores lets you reuse 100% of your code. Learn more about deploying a desktop app with Ionic."
  />
</head>

Ionicを使用してデスクトップアプリを構築すると、コードを100％再利用しながら、プッシュ通知などのネイティブデバイス機能にアクセスできる従来のデスクトップアプリを提供できます。このガイドはElectronに精通していることを前提としています。Electronアプリの構築方法については、公式の<a href="https://electronjs.org/docs/tutorial/first-app" target="_blank">Electronガイド</a>を参照してください。

## macOSアプリ

### 要件

macOSアプリストアにアプリを公開するには、次の2つの要件があります。

- 最新バージョンの[Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
- アクティブなデベロッパーアカウント（Appleのデベロッパーポータルを通じて100ドル）

### 公開

Electronチームは、macOS用のアプリを公開する方法について詳細なガイドを提供しています。[こちらのドキュメント](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide)を参照してください。

## Windowsアプリ

### 要件

Windowsアプリストアにアプリを公開するには、次の2つの要件があります。

- アニバーサリーアップデート（2016年8月2日リリース）を含むWindows 10
- Windows 10 SDK、[こちらからダウンロード](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
- Node
- electron-windows-store CLI

`electron-windows-store`はnpmを介してインストールできます：

```shell
$ npm install -g electron-windows-store
```

### 公開

macOSと同様に、ElectronにはWindows用のアプリを公開する方法についての詳細なガイドがあります。[こちらのドキュメント](https://electronjs.org/docs/tutorial/windows-store-guide)を参照してください。
