---
title: Using Plugins
description: How to use plugins in Capacitor
slug: /basics/using-plugins
---

# プラグインを使用する

WebViewとCapacitorランタイムは、**Capacitor Plugins**の使用を通じて通信します。プラグインは、カメラ、ジオロケーション、ファイルシステムアクセスなどのネイティブAPIへのアクセスをWebアプリで提供します。

## Capacitorプラグイン

Capacitorチームは、よく使われるAPIのための [Capacitorプラグインのセット](/docs/apis) を管理しています。また、[Capacitor Community](https://github.com/capacitor-community/) から利用可能なCapacitorプラグインの大規模なセットも存在します。Capacitorプラグインの提案がある場合は、[Capacitor Community proposals repo](https://github.com/capacitor-community/proposals/) を利用することができます。

[Capacitorプラグインについての詳細はこちら &#8250;](/docs/plugins)

:::info
Capacitorのプラグインを**作りたいですか？同じ提案レポを見て、[プラグイン作成ガイドに従って] (/docs/plugins/creating-plugin) 作ってみてください!
:::

## Cordova プラグイン

あなたのプロジェクトにぴったりの Web API や Capacitor プラグインが見つからない？もしくは、[CordovaからCapacitorに移行中](/docs/cordova/migration-strategy)でしょうか？CapacitorはCordovaプラグインの機能を模倣しようとするCordova互換性レイヤーを持っています。CapacitorはほとんどのCordovaプラグインと互換性がありますが、インストール時に追加の手順があるかもしれません。

[CapacitorアプリでのCordovaプラグインの使用についての詳細はこちら &#8250;](/docs/plugins/cordova)

:::info
もし適切なCapacitorプラグインが見つからなかったためにCordovaプラグインを使用しているなら、 [Capacitorコミュニティへの提案](https://github.com/capacitor-community/proposals/) を作成していただけませんか?
:::
