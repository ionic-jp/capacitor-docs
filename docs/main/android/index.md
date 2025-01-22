---
title: Capacitor Android ドキュメンテーション
sidebar_label: はじめ方
slug: /android
description: Capacitor Android ドキュメンテーション
contributors:
  - mlynch
  - jcesarmobile
---

# Capacitor Android ドキュメンテーション

Capacitor は Native の Android ランタイムを特徴としており、開発者は JavaScript と Native Java for Android コード間で通信することができます。

Capacitor の Android アプリは、Android Studio で設定・管理されています。

## Androidサポート

API 23+ (Android 6以降) がサポートされており、 これは Android 市場の99%以上に相当します。Capacitorには、Chromeバージョン60以降のAndroid WebViewが必要です。Android 6、および10以上では、Capacitorは[Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)を使用します。Android 7-9では、[Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome)がWebViewを提供します。

## Android プラットフォームの追加

まず、`@capacitor/android` パッケージをインストールします。

```bash
npm install @capacitor/android
```

次に、Androidのプラットフォームを追加します。

```bash
npx cap add android
```

## Android プロジェクトのオープン

Android Studio でプロジェクトを開くには、次のように実行します:

```bash
npx cap open android
```

あるいは、Android Studio を開いて、 `android/` ディレクトリを Android Studio プロジェクトとしてインポートすることもできます。

## Running Your App

作成したアプリは、コマンドラインまたは Android Studio で実行することができます。

> Androidエミュレータを使用するには、API 24+のシステムイメージを使用する必要があります。システムウェブビューはエミュレータ上では自動的に更新されません。物理デバイスは、System WebViewが更新されている限り、API 23以下でも動作するはずです。

### コマンドラインでの実行

物理デバイスやエミュレータでプロジェクトを実行するには、次のように実行します:

```bash
npx cap run android
```

コマンドを実行すると、ターゲットを選択するように促されます。詳しくは [`run`](/cli/commands/run.md) をご覧ください。

> `run` コマンドを使用するには、物理的なAndroidデバイスか、ダウンロードしたエミュレータのシステムイメージのどちらかが必要です。Android Studio でのエミュレータデバイスの作成とシステムイメージのダウンロードについては、 [こちらのドキュメント](https://developer.android.com/studio/run/managing-avds) を参照してください。

### Android Studio での実行

Android Studio では、まずデバイスやエミュレータを選択し、実行またはデバッグボタンをクリックしてアプリを実行します。Java や Kotlin のコードをデバッグするのでなければ、実行ボタンが好ましいでしょう。

![Running App](../../../static/img/v6/docs/android/running.png)

## トラブルシューティング

使い始めてすぐに何か問題が発生した場合は、 [Android トラブルシューティングガイド](/main/android/troubleshooting.md) を参考にしてください。お困りの方は、お気軽に [ディスカッションを開いて](https://github.com/ionic-team/capacitor/discussions/) までご連絡ください。

## 次のステップ

アプリが動作すれば、アプリの開発と構築を続ける準備が整いました。様々な API、Capacitor や Cordova のプラグイン、またはカスタムネイティブコードを使用して、アプリの残りの部分を構築してください。

## Further Reading

アプリのパーミッションの設定、依存関係の更新、プラグインの構築などの詳細については、以下の Android 固有のガイドを参照してください。

[Android の設定とパーミッションの設定 &#8250;](/main/android/configuration.md)

[Android 用のネイティブプラグインを作る &#8250;](/plugins/creating-plugins/android-guide.md)
