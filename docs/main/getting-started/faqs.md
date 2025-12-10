---
title: よくある質問
description: Capacitorのよくある質問
slug: /getting-started/faqs
sidebar_label: よくある質問
---

# よくある質問

以下は、Capacitorに関するよくある質問のリストです。もしここで答えが見つからない場合は、[私たちのフォーラム](https://forum.ionicframework.com) や [私たちのDiscord](https://ionic.link/discord) をチェックしてみてください。よくある質問の一覧はサイドバーをご覧ください👉。

## Capacitorはどのようなプラットフォームをサポートしていますか？

Capacitorは公式プラットフォームとコミュニティプラットフォームで、ほぼすべてのアドバイスをターゲットにすることができます。

### 公式プラットフォーム

Capacitorは以下のプラットフォームを公式にサポートしています。
- iOS 14+
- Android 6+
  - Requires Chrome WebView 60+
- Modern Web Browsers
  - Chrome
  - Firefox
  - Safari
  - Edge

### コミュニティプラットフォーム

Capacitorは、クロスプラットフォームのデスクトップフレームワークをターゲットにしたコミュニティプラットフォームも用意しています。現在、コミュニティで対象としているのは以下の通りです。
- Electron
  - https://github.com/capacitor-community/electron

## CapacitorでIonic Frameworkを使う必要があるのでしょうか？

いいえ、必要ありません。Capacitorは、他のIonicツールで構築されたものだけでなく、**あらゆる**ウェブアプリケーションで動作します。Capacitorアプリに特定のルック＆フィールが必要で、Ionic Frameworkがあなたに適したUIツールキットでない場合、それを使用することを強制されたと感じるべきではありません。両方のアプリストアには、Ionic FrameworkではなくCapacitorを利用したアプリがたくさんあります。

## Capacitorプロジェクト用のプラグインはどこで見つけることができますか？

あなたのプロジェクトのためのプラグインを見つけるには、次の場所をこの順序でチェックする必要があります。

### Capacitor Community GitHub ⚡

[Capacitor Community GitHub organization](https://github.com/capacitor-community) は、私たちの優れた開発者コミュニティが作成したプラグインをリストアップしています。これらは活発に開発されているCapacitor初のプラグインで、Capacitor 3+のどのプロジェクトでも動作するはずです。もしプラグインが必要なら、ここはあなたが最初に見るべき場所の一つです。

### Awesome Capacitor 😎

他の多くの [Awesome lists](https://github.com/sindresorhus/awesome) と同様に、[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) はコミュニティによって作成された素晴らしい Capacitor プラグインのリストです。公式やコミュニティのプラグインが見つからない場合、誰かがすでにここであなたが探しているプラグインを作っている可能性があります。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) は Chromium Team の [tracker](https://fugu-tracker.web.app/#shipped) で、Chromium ブラウザに追加された Web API を公開しています。Android と iOS の両方でサポートされていない機能もありますが、[Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) や [ContactsManager (Android Only)](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) のような機能は、あなたのユースケースで `@capacitor/share` や `@capacitor-community/contacts` を置き換えるかもしれません。

[Can I Use...?](https://caniuse.com) で、AndroidやiOSでこれらの機能がネイティブプラグインなしで使えるかどうか確認することができます。

### Cordova Plugins 🔌

CapacitorがCordovaプラグインをサポートしていることをご存知でしょうか？Cordovaから移行する場合、またはCapacitorに相当するものがないCordovaプラグインを持っている場合、ほとんどのCordovaプラグインをCapacitorで直接使用することができます。CapacitorでCordovaプラグインを使用する方法については [私たちのガイド](https://capacitorjs.com/docs/plugins/cordova) をご覧ください。

## CapacitorでMacを使わずにiOSアプリを作ることはできますか？

短い答えは「いいえ」です。 [Ionic AppFlow](https://ionic.io/appflow) のようなクラウドサービスは利用できますが、デバイスやシミュレータでアプリケーションをテストすることはできません。あなたのCapacitorアプリケーションがApple製品を持つ人々に使用可能であることを確認するために、常に物理的なデバイスでアプリケーションをテストすることを確認する必要があります。

## Androidエミュレータで実行すると、なぜ空白の画面が表示されるのですか？

CapacitorにはAndroid 6とWebViewバージョン60以上が必要です。例えば、Android 6または7のエミュレータを作成した場合、最新バージョンのWebViewがインストールされておらず、空白の白い画面が表示されます。これを回避するには、アプリケーションをテストするために新しいAndroidエミュレータをインストールしてください。

