---
title: Ionic Frameworkを使う
description: Capacitor と Ionic Framework の使い方
slug: /getting-started/with-ionic
---

# Ionic FrameworkでCapacitorを使う

Capacitorは、アプリを構築するためにIonic Frameworkを必要としません。しかし、開発者は、高品質のアプリを構築するために、Ionic UIコンポーネントの[大規模なコレクション](https://ionicframework.com/docs/components)を参考にすることができます。

Capacitor は、[Ionic CLI](https://ionicframework.com/docs/cli) を使用して、新規または既存の Ionic アプリに直接すばやくインストールすることができます。

## 新しいIonicプロジェクトにCapacitorをインストールする
新しいIonicプロジェクトの場合、Capacitorはデフォルトで新しいIonicアプリにすでにインストールされています！あなたがしなければならないのは、新しいプロジェクトを開始することだけです。新しいIonicプロジェクトを作成するには、次のコマンドを実行します：

```bash
ionic start
```

CapacitorベースのIonicアプリを初めて構築するためのチュートリアルが必要な場合は、Ionic Frameworkチームによる [このチュートリアル](https://ionicframework.com/docs/intro/next) をチェックしてください。

## 既存のIonicプロジェクトへのCapacitorのインストール
Capacitorが有効になっていない既存のIonicプロジェクトがある場合、以下のコマンドを実行することでCapacitorを有効にすることができます。

```bash
ionic integrations enable capacitor
```

### Capacitorプラグインの依存関係のインストール

Ionic Frameworkは、以下のCapacitorプラグインのAPIを利用します。

- [`@capacitor/app`](/apis/app.md)
- [`@capacitor/haptics`](/apis/haptics.md)
- [`@capacitor/keyboard`](/apis/keyboard.md)
- [`@capacitor/status-bar`](/apis/status-bar.md)

最高のユーザーエクスペリエンスを得るために、アプリにインポートしない場合でも、これらのプラグインがインストールされていることを確認する必要があります。これらのプラグインをインストールするには、プロジェクトのルートで以下のコマンドを実行してください。

```bash
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

### プラットフォームの追加

Capacitorのインストールとプラグインのインストールが完了したら、アプリにモバイルプラットフォームを追加します。

```bash
ionic capacitor add android
ionic capacitor add ios
```

これで、プロジェクトのルートにネイティブプラットフォーム用の新しいディレクトリが作成されます。このディレクトリはネイティブプロジェクトであり、ソースアーティファクトとみなされるべきものです。 [ネイティブプロジェクトマネジメント](/main/cordova/index.md#native-project-management) について詳しくはこちら。

:::info
IonicアプリでCordovaを使用している場合、[CordovaからCapacitorへの移行](/main/cordova/migrating-from-cordova-to-capacitor.md) の方法についてもご案内しています。
:::

## Ionic CLI Capacitor Commands

Ionic CLIには、Capacitor CLIをラップして便利に使える様々なハイレベルコマンドがあります。以下のそれぞれのドキュメントを参照してください。また、各コマンドの後に`--help`フラグを使用することで、ヘルプ出力も可能です。

- [`ionic capacitor add`](https://ionicframework.com/docs/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/cli/commands/capacitor-open)

Ionic CLIの詳細、およびCapacitorとの併用方法については、ドキュメント[こちら](https://ionicframework.com/docs/cli)を参照してください。
