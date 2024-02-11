---
title: プラグインの使い方
description: プラグインの使い方
slug: /basics/using-plugins
---

# プラグインを使用する

WebViewとCapacitorランタイムは、**Capacitor Plugins**の使用を通じて通信します。プラグインは、カメラ、ジオロケーション、ファイルシステムアクセスなどのネイティブAPIへのアクセスをWebアプリで提供します。

## Capacitorプラグイン

Capacitorチームは、よく使われるAPIのための [Capacitorプラグインのセット](/plugins/official.md) を管理しています。また、[Capacitor Community](https://github.com/capacitor-community/) から利用可能なCapacitorプラグインの大規模なセットも存在します。Capacitorプラグインの提案がある場合は、[Capacitor Community proposals repo](https://github.com/capacitor-community/proposals/) を利用することができます。

[Capacitorプラグインについての詳細はこちら &#8250;](/plugins.md)

:::info
Capacitorのプラグインを**作りたい**ですか？提案レポを見て、[プラグイン作成ガイドに従って](/plugins/creating-plugins/overview.md) 作ってみてください!
:::

## Cordova プラグイン

あなたのプロジェクトにぴったりの Web API や Capacitor プラグインが見つからない？もしくは、[CordovaからCapacitorに移行中](/main/cordova/migration-strategy.md)でしょうか？CapacitorはCordovaプラグインの機能を模倣しようとするCordova互換性レイヤーを持っています。CapacitorはほとんどのCordovaプラグインと互換性がありますが、インストール時に追加の手順があるかもしれません。

[CapacitorアプリでのCordovaプラグインの使用についての詳細はこちら &#8250;](/plugins/cordova.md)

:::info
もし適切なCapacitorプラグインが見つからなかったためにCordovaプラグインを使用しているなら、 [Capacitorコミュニティへの提案](https://github.com/capacitor-community/proposals/) を作成していただけませんか?
:::
