---
title: 開発ワークフロー
description: Capacitorのワークフロー
slug: /basics/workflow
---

# Capacitorのワークフロー

Capacitorでの作業は、従来のWebアプリでの作業とは少し異なります。WebネイティブのCapacitorアプリケーションを作るには、以下のステップを踏む必要があります。

## ウェブコードの構築

モバイルデバイス上でWebアプリをテストする準備ができたら、配布用のWebアプリをビルドする必要があります。 [Create React App](https://create-react-app.dev/) や [Vite](https://vitejs.dev/) のようなツールを使用している場合、コマンドは `npm build` となります。一方 [Angular](https://angular.io/) のようなツールは `ng build` というコマンドを使用します。どのようなコマンドであれ、Capacitorで使用するためには、配布用のウェブコードをビルドする必要があります。

## ウェブコードをCapacitorプロジェクトに同期させる

Web コードを配布用にビルドしたら、Web ネイティブの Capacitor アプリケーションに Web コードをプッシュする必要があります。これを行うには、[Capacitor CLI](/cli/index.md) を使ってウェブコードを「同期」させ、必要なネイティブ依存関係をインストール/更新します。

プロジェクトを同期させるには、以下を実行します。

```bash
npx cap sync
```

npx cap sync`を実行すると、すでにビルドされているWebバンドルがAndroidとiOSの両方のプロジェクトに**コピー**され、Capacitorが使用するネイティブ依存関係も**更新**されます。

`sync` については [ドキュメント](/cli/commands/sync.md) を、その他については [Capacitor CLI reference](/cli/index.md) のドキュメントを参照してください。

:::info
"not being able to find the web assets directory?" というエラーが発生しましたか？ [Capacitorの設定](/main/reference/config.md)ファイルを更新して、適切な `webDir` を使用するようにしてください。
:::


## Capacitorアプリのテスト

Web バンドルとネイティブプロジェクトの同期が完了したら、今度はモバイルデバイス上でアプリケーションをテストしてみましょう。これを行うにはいくつかの方法がありますが、最も簡単な方法はCapacitorに組み込まれたCLIコマンドを使用することです。

iOS デバイスで Capacitor アプリのデバッグビルドを実行するには、次のようにします。
```bash
npx cap run ios
```

同様に、Android デバイスで Capacitor アプリのデバッグビルドを実行するには、以下を実行します。
```bash
npx cap run android
```


アプリケーションを繰り返しテストしたら、今度は他のモバイルデバイスに配布するための最終的なバイナリをコンパイルします。

:::info
また、[iOS上でXcodeを使ってアプリを実行する](/main/ios/index.md#running-in-xcode)、[Android上でAndroid Studioを使ってアプリを実行する](/main/android/index.md#running-with-android-studio) ことも可能です。どちらの方法も開発には有効です。どちらのオプションを選ぶか、試してみてください。
:::

### ネイティブIDEを開く

ネイティブプロジェクトをもっとコントロールしたい場合は、Capacitor CLIを使用してネイティブIDEを素早く開くことができます。

[iOS Capacitor `.xcworkspace` プロジェクトをXcodeで開く](/main/ios/index.md#opening-the-ios-project) ためには、以下のコマンドを実行します。
```bash
npx cap open ios
```

同様に、[Android Capacitor プロジェクトを Android Studio で開く](/main/android/index.md#opening-the-android-project) には、以下のように実行します。
```bash
npx cap open android
```

ネイティブプロジェクトを開くと、アプリケーションのネイティブランタイムを完全に制御することができます。 [プラグインの作成](/plugins.mdx)、 [カスタムネイティブコードの追加](/main/ios/custom-code.md) 、[アプリケーションのコンパイル](#compiling-your-native-binary) でリリースすることが可能です。

## ネイティブバイナリのコンパイル

Capacitorには `build` や `compile` というコマンドはありませんし、今後もないでしょう。 `async` の後、ターゲットプラットフォームのIDEを開くことが推奨されます。iOSの場合はXcode、Androidの場合はAndroid Studioを開いて、ネイティブアプリをコンパイルすることをお勧めします。

ターミナルや CI 環境でアプリをコンパイルするには、`gradle` や `xcodebuild` を直接使用することができます。また、これらのプロセスを自動化するために、 [Fastlane](https://fastlane.tools) やクラウドビルドツール [Appflow](https://useappflow.com) などのツールを使用することをお勧めします。アプリケーションごとに異なりますが、Capacitorプロジェクトの一般的なリリースプロセスの例があります。Apple App StoreやGoogle Play Storeへのデプロイ方法の詳細については、 [iOS](/main/ios/deploying-to-app-store.md) と [Android](/main/android/deploying-to-google-play.md) の公開ガイドを読んでみて下さい。

## Capacitorのアップデート

Capacitorランタイムのアップデートは、`npm install`を実行するのと同じくらい簡単です。

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

Capacitorをアップデートする際、Core、Android、iOSのライブラリがすべて同じバージョンであることを確認したい。CapacitorのCore、Android、iOSのリリースはすべて同時にアップロードされます。つまり、すべてのライブラリを同時にインストールすれば問題ないのです。

:::info
[Capacitor repo](https://github.com/ionic-team/capacitor) を購読することで、新しいリリースのお知らせを受け取ることができます。リポジトリインデックスの上部にある **Watch** -> **Releases only** をクリックしてください。
:::

