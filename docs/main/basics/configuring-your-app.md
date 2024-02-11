---
title: アプリの構成
description: ネイティブプロジェクトの構成
slug: /basics/configuring-your-app
---

# アプリの設定

Capacitorのほとんどはプラットフォームごとに設定されています。つまり、ほとんどの設定変更はネイティブツールを使用してネイティブプロジェクトで行うことになります。

## ネイティブ・プロジェクト管理

Capacitorプロジェクトの設定は、iOSやAndroidプロジェクトの設定と何ら変わりません。既存のネイティブ開発者は、Web開発者と一緒に作業することができ、それぞれが得意とするツールやSDKを使用することができます。モバイルアプリケーションはWeb開発とは少し異なりますが、Web開発者は必要なすべてのネイティブ設定を自分で処理できると信じています。Capacitorチームは知識のギャップを埋めるために、[Apple App Stores](/main/ios/deploying-to-app-store.md) や [Google Play Store](/main/android/deploying-to-google-play.md) への配備方法などについてのドキュメントを提供しています。

## Capacitor 設定ファイル

Capacitor固有の設定は [Capacitor Configuration File](/main/reference/config.md) で扱われます。これらは一般的にネイティブの機能を変更するものではなく、Capacitorのツール機能を制御するものです。この設定ファイルには、`npx cap sync`でコピーするWebディレクトリの設定、AndroidまたはiOSのプロジェクトフォルダの指定、ネイティブプロジェクトでのアプリID/名前の設定などが含まれます。

## ネイティブの設定

iOS と Android にはそれぞれ設定ガイドがあり、一般的な動作の変更について説明しています。

[iOS の設定 &#8250;](/main/ios/configuration.md)

[Android の設定 &#8250;](/main/android/configuration.md)
