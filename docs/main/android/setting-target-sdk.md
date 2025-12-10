---
title: Android Target SDKの設定
sidebar_label: Target SDKの設定
description: Android Target SDKの設定
slug: /android/setting-target-sdk
---

すべてのAndroidアプリケーションは、ターゲットSDKバージョン、つまりアプリケーションが実行されるように設計されたAndroidのバージョンを指定する必要があります。毎年、GoogleはAndroidオペレーティングシステムのアップデートをリリースし、その後アプリケーションがターゲットにする必要があるバージョン番号を引き上げます。通常、[この日付は毎年8月31日](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)です。このため、アプリケーションを最新バージョンのAndroidで最新の状態に保つことが重要です。Capacitorアプリケーションでは、`/android/variables.gradle`ファイルでターゲットSDKを指定することでこれを行います。

```groovy
targetSdkVersion = 35
```

## Capacitor Androidの要件

Capacitorでは、AndroidターゲットSDKバージョンはCapacitorのメジャーバージョンと強く結びついています。これは、ターゲットSDKをより高いバージョンに変更してアプリケーションを再ビルドすることは可能ですが、そうでなければ発生しない問題がアプリケーションで発生する可能性が非常に高いことを意味します。Capacitorチームは、アプリケーションがGoogleの要件に準拠し続けることを保証するために、新しいターゲットSDKバージョンのサポートを含むCapacitorの新しいメジャーバージョンを毎年リリースしています。このため、アプリケーションをCapacitorの最新メジャーバージョンで最新の状態に保つことが重要です。

## Android Target SDKマトリックス

以下の表は、Capacitor Androidでサポートされているターゲットバージョンを示しています。

| Capacitor Android | ターゲットSDKバージョン |
| ----------------- | ------------------ |
| 7.x               | 35                 |
| 6.x               | 34                 |
| 5.x               | 33                 |
| 4.x               | 32                 |
| 3.x               | 30                 |
| 2.x               | 29                 |
| 1.x               | 28                 |

## カスタムTarget SDKバージョン

Capacitor Androidはカスタムターゲットを SDKバージョンをサポートしていません。Capacitor Androidの各バージョンには特定のターゲットSDKバージョンが必要であり、その一致するバージョンのみがサポートされます。
