---
title: 環境のセットアップ
description: Capacitorの開発環境のセットアップ
slug: /getting-started/environment-setup
---

# 環境のセットアップ

Capacitorには、公式にサポートされている3つのアプリケーションターゲットがあります：Android、iOS、およびWeb。3つのプラットフォームすべてのアプリケーションを作成するには、以下のすべての依存関係をインストールする必要があります。ネイティブモバイルターゲットのいずれかをターゲットにしない場合は、関連するセクションをスキップできます。

## コア要件

Capacitorでアプリケーションを開発するには、NodeJS 20以上がインストールされている必要があります。[Nodeのウェブサイト](https://nodejs.org)にあるインストーラを使用するか、JavaScriptツールマネージャーである[Volta](https://volta.sh/)を使用するか、[homebrew](https://brew.sh/)や[Chocolatey](https://chocolatey.org/)などのパッケージマネージャーを使用してNodeをインストールできます。

Nodeをインストールしたら、お好みのターミナルを開き、以下のコマンドを入力してnodeが正しくインストールされていることを確認してください

```bash
node --version
# v20.9.0
```

Nodeがインストールされたら、CapacitorでProgressive Web Application（PWA）の作成を開始できます。

## iOSの要件

iOSアプリをビルドするには、**macOS**が必要です。Macを持っていない場合にiOSクラウドビルドを実行するために使用できる[Ionic Appflow](http://ionicframework.com/appflow)などのソリューションがありますが、Capacitorアプリケーションを適切にテストするために、ローカルでツールを利用できるようにしておくことを強くお勧めします。

Capacitorを使用してiOSアプリケーションを開発するには、2つの追加の依存関係が必要です：

- Xcode
- Xcode Command Line Tools

コア要件に加えてXcodeとXcode Command Line Toolsをインストールすると、iOSアプリケーションとPWAの両方を作成できるようになります。

### Xcode

Xcodeは、ネイティブのmacOS、iOS、およびiPadOSアプリケーションを作成するためのAppleのIDEです。Macの[Apple App Storeを使用して](https://apps.apple.com/us/app/xcode/id497799835?mt=12)Xcodeをインストールできます。Capacitor 7には、Xcode 16.0以上が必要です。

### Xcode Command Line Tools

Xcode Command Line Toolsは、Xcodeのコアには含まれていない追加のツールで、アプリケーションのビルドとテストに必要です。Xcodeがインストールされたら、ターミナルで以下のコマンドを実行してXcode Command Line Toolsをインストールできます：

```bash
xcode-select --install
```

パスワードを入力し、パッケージのインストールを数分待った後、以下のコマンドを実行してツールがインストールされていることを確認できます：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### オプションの依存関係

以下の依存関係は、iOSでCapacitorを使用する際のオプションです。

ネイティブiOSパッケージの依存関係マネージャーとしてCocoaPodsを使用する必要がある場合は、以下の2つのパッケージマネージャーをインストールする必要があります：

- Homebrew
- CocoaPods

iOSの依存関係マネージャーとして[Swift Package Manager](https://docs.swift.org/swiftpm/documentation/packagemanagerdocs)（SPM）を使用することをお勧めします。CocoaPodsが必要ない場合は、SPMを使用してこれらの2つの依存関係のインストールをスキップできます。

#### Homebrew

HomebrewはmacOSパッケージ用のパッケージマネージャーです。Intel MacとApple Silicon Macの両方でCocoaPodsをインストールするためにインストールする必要があります。

Homebrewをインストールするには、以下のbashコマンドを実行します：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
私たちを信じるだけでなく、これは[brew.sh](https://brew.sh)がHomebrewのインストールを推奨している方法です。
:::

Homebrewをインストールしたくない場合は、以下に代替の（推奨されない）手順があります。

#### CocoaPods

CocoaPodsはCapacitor 7以前のデフォルトのiOS依存関係マネージャーでした。Capacitor 8以降、デフォルトはSPMに置き換えられましたが、プロジェクトで必要な場合は、`npx cap add ios`コマンドに`--packagemanager CocoaPods`を渡すことで、代わりにCocoaPodsを使用できます。

ターミナルで以下のコマンドを実行して[CocoaPods](https://cocoapods.org/)をインストールできます

```bash
brew install cocoapods
```

以下のコマンドを実行して、CocoaPodsが正しくインストールされていることを確認できます。

```bash
pod --version
# 1.12.1
```

##### HomebrewなしでのコcoaPodsのインストール

Ruby Gemで直接CocoaPodsをインストールできます。インストールするには、以下のコマンドを実行します。
```
sudo gem install cocoapods
```

sudoなしで実行する方法については、[CocoaPodsのsudoなしインストールドキュメント](https://guides.cocoapods.org/using/getting-started.html#sudo-less-installation)を参照してください

## Androidの要件

Capacitorを使用してAndroidアプリケーションを開発するには、2つの追加の依存関係が必要です：

- Android Studio
- Android SDKのインストール

:::note
Java Development Kit（JDK）を別途インストールする必要はありません。Android Studio
が適切なJDKを自動的にインストールします。
:::

コア要件に加えてAndroid StudioでAndroid SDKをインストールすると、AndroidアプリケーションとPWAの両方を作成できるようになります。

### Android Studio

Android Studioは、ネイティブAndroidアプリケーションを作成するためのGoogleのIDEです。[Android Studioのダウンロードページ](https://developer.android.com/studio)にアクセスしてAndroid Studioをインストールできます。Capacitor 7には、Android Studio 2024.2.1以上が必要です。

### Android SDK

Android Studioがインストールされたら、Android SDKパッケージをインストールする必要があります。

Androidアプリを開発するには、いくつかのAndroid SDKパッケージをインストールする必要があります。Android SDK Toolsと、API 23以上のAndroid SDKプラットフォームのバージョンをインストールしてください。

Android Studioで、メニューから**Tools -> SDK Manager**を開き、**SDK Platforms**タブでテストしたいプラットフォームバージョンをインストールします：

![SDK Platforms](/img/v6/docs/android/sdk-platforms.png)

始めるには、1つのAPIバージョンのみをインストールする必要があります。上の画像では、Android 9（API 28）とAndroid 10（API 29）のSDKがインストールされています。最新の安定バージョンはAndroid 15（API 35）です。
