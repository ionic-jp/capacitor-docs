---
title: 環境設定
description: Capacitorの開発環境の構築
slug: /getting-started/environment-setup
---

# 環境設定

Capacitorは3つのアプリケーションターゲットを公式にサポートしています。Android、iOS、そしてWebです。3つのプラットフォームすべてに対応したアプリケーションを作成するためには、以下の依存関係をすべてインストールする必要があります。ネイティブモバイルターゲットのいずれかをターゲットにしていない場合は、関連するセクションをスキップすることができます。

:::info
デスクトップのサポートが必要ですか？Capacitorを使用して[Windows](https://ionic.io/docs/windows/usage)または[Electron](https://github.com/capacitor-community/electron)アプリをビルドすることも可能です!
:::

## 要件

Capacitorでアプリケーションを開発するには、NodeJS 14以降がインストールされている必要があります。Nodeは[the Node website](https://nodejs.org)のインストーラ、JavaScriptツールマネージャの[Volta](https://volta.sh/)、[homebrew](https://brew.sh/)、[Chocolatey](https://chocolatey.org/)などのパッケージマネージャでインストールすることが可能です。

Nodeをインストールしたら、ターミナルを開いて以下のコマンドを入力し、nodeが正しくインストールされていることを確認します。

```bash
node --version
# v18.3.0
```

Nodeをインストールしたら、CapacitorでProgressive Web Application (PWA)の作成を始めることができます。

## iOSの要件

iOSアプリを構築するには、**macOS**が必要です。Macを持っていない場合、iOSクラウドビルドを実行するために使用する[Ionic Appflow](http://ionicframework.com/appflow) のようなソリューションがありますが、Capacitorアプリケーションを適切にテストするために、ローカルでツールを利用できるようにすることが強く推奨されます。

Capacitorを使用してiOSアプリケーションを開発するには、さらに3つの依存関係が必要です。

- Xcode
- Xcode Command Line Tools
- Homebrew
- Cocoapods

Xcode、Xcode Command Line Tools、Cocoapodsをインストールすると、iOSアプリケーションとPWAの両方を作成することができるようになります。

### Xcode

Xcode は、macOS、iOS、および iPadOS のネイティブアプリケーションを作成するための Apple の IDE です。Xcodeは、Macで[Apple App Storeを使用](https://apps.apple.com/us/app/xcode/id497799835?mt=12)することでインストールできます。Capacitor 4は、最低でもXcode 13が必要です。

### Xcodeのコマンドラインツール

Xcodeのコマンドラインツールは、アプリケーションの構築とテストに必要な、Xcodeのコアに含まれていない追加のツールです。Xcodeがインストールされたら、ターミナルで以下のコマンドを実行することで、Xcode Command Line Toolsをインストールすることができます。

```bash
xcode-select --install
```

パスワードを入力し、パッケージがインストールされるまで数分待った後、以下のコマンドを実行することで、ツールがインストールされたことを確認することができます。

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### Homebrew

HomebrewはmacOSパッケージのパッケージマネージャです。Intel と Apple Silicon Mac の両方に CocoaPods をインストールするには、これをインストールする必要があります。

Homebrewをインストールするには、以下のbashコマンドを実行します。

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
私たちだけを信じないでください! これは [brew.sh](https://brew.sh) が推奨する Homebrew のインストール方法です。
:::

もし、Homebrew をインストールしたくないのであれば、代替の方法がありますが、推奨されませんので、以下を参照してください。

### CocoaPods

Cocoapods は iOS 依存性マネージャで、Capacitor が iOS プロジェクトのネイティブ依存性をインストールおよび管理するために使用します。CocoaPods](https://cocoapods.org/)をインストールするには、ターミナルで次のコマンドを実行します。

```bash
brew install cocoapods
```

以下のコマンドを実行することで、CocoaPodsが正しくインストールされたことを確認できます。

```bash
pod --version
# 1.11.3
```

#### Homebrewを使わないCocoaPodsのインストール

CocoaPodsはRuby Gemで直接インストールすることができます。インストールするには、以下のコマンドを実行します。
```
sudo gem install cocoapods
```

しかし、この方法でCocoaPodsをインストールすると、Apple Silicon Macでは**うまくいきません**。Rosettaを有効にしてCocoaPodsを実行する必要があります。これを行うには、以下のコマンドを実行します。

```bash
sudo arch -x86_64 gem install ffi
```

それから、新しいバージョンのWebコードを使用するためにアプリケーションを更新したいときはいつでも、次のコマンドを実行する必要があります。

```bash
npx cap copy
arch -x86_64 pod install
```

## Androidの要件

Capacitorを使用してAndroidアプリケーションを開発するには、さらに2つの依存関係が必要です。

- Android Studio
- Android SDKのインストール

:::note
Java Development Kit (JDK)を別途インストールする必要はありません。Android Studio
が自動的に適切なJDKをインストールします。
:::

Android StudioでAndroid SDKをインストールし、コア要件を満たせば、AndroidアプリとPWAの両方を作成することができます。

### Android Studio

Android Studioは、Googleが提供するAndroidネイティブアプリケーションを作成するためのIDEです。Android Studioは、[Android Studioダウンロードページ](https://developer.android.com/studio)からインストールすることができます。Capacitor4では、最低でもAndroid Studio 2020.1が必要です。

### Android SDK

Android Studioのインストールが完了したら、Android SDKのパッケージをインストールする必要があります。

Androidアプリを開発するには、いくつかのAndroid SDKパッケージがインストールされている必要があります。Android SDK Toolsと、API 22以上のバージョンのAndroid SDK Platformsを必ずインストールしてください。

Android Studioのメニューから **Tools -> SDK Manager** を開き、**SDK Platforms** タブにテストしたいプラットフォームのバージョンをインストールします。

![SDK Platforms](/img/v4/docs/android/sdk-platforms.png)

まずは、1つのAPIバージョンをインストールするだけです。上の画像では、Android 10 (API 30)とAndroid 11 (API 31)のSDKがインストールされています。最新の安定版は、Android 12（API 32）です。
