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
- iOS 13+
- Android 5.1+
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
- Tauri (alpha)
  - https://github.com/capacitor-community/tauri


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

CapacitorはAndroid 5.1およびWebViewのバージョン60以上を必要とします。例えばAndroid 6や7のエミュレータを作成した場合、最新バージョンのWebViewがインストールされないため、真っ白な画面が表示されます。これを回避するには、アプリケーションのテスト用に、より新しいAndroidエミュレータをインストールすることができます。

## なぜApple Silicon DeviceでCocoaPodsのエラーが発生するのでしょうか？

If you installed CocoaPods with `sudo gem install cocoapods` and you're using an Apple Silicon-powered Mac, you might encounter something like this when running `npx cap update`:

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

This is a CocoaPods bug related to `ffi` not installing on Apple Silicon computers.
We recommend using [Homebrew to installl CocoaPods](/main/getting-started/environment-setup.md#homebrew).
Alternatively, if you have Rosetta installed, you can install `ffi` on a `x86_64` architecture and run `pod install` using the simulated Intel architecture for the first time.

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

After that, running Capacitor should work as expected.
