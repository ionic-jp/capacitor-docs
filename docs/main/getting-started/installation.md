---
title: Capacitorのインストール
description: Capacitorのインストール
slug: /getting-started
---

# Capacitor のインストール

Capacitor アプリケーションを作成するには 2 通りの方法があります。capacitor/create-app` パッケージを使ってゼロから Capacitor アプリケーションを作成する方法と、すでに存在する Web プロジェクトに Capacitor を追加する方法です。

ビルドするプラットフォームの[環境設定](/docs/getting-started/environment-setup)を確認するのを忘れないようにしましょう。

## 新しいCapacitorアプリケーションを作成する

capacitor/create-app` パッケージを使うと、Capacitor アプリケーションを素早く作成することができます。空のディレクトリで以下のコマンドを実行すると、新しい Capacitor アプリケーションの足場ができます。

```bash
npm init @capacitor/app
```

## 既存のウェブアプリケーションにCapacitorを追加する

Capacitorは最新のJavaScriptウェブアプリケーションにドロップできるように設計されています。しかし、既存のアプリケーションでCapacitorを使用するには、プロジェクトに次の3つの要件が必要です。

プロジェクトに必要なもの...

- `package.json` ファイル
- `dist` や `www` などのビルドされたウェブ資産を格納する別のディレクトリ
- ウェブアセットディレクトリのルートにある `index.html` ファイル

:::info
Capacitorを正しくインジェクションするには、`index.html` ファイルに `<head>` タグが含まれている必要があります。もし
がない場合、Capacitorプラグインは動作しません。
:::

### Capacitorのインストール

アプリのルートに、Capacitorの主なnpmディペンデンシーであるコアJavaScriptランタイムとコマンドラインインターフェース(CLI)をインストールします。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### Capacitorの設定を初期化する

次に、CLIアンケートを使ってCapacitorを初期化します。

```bash
npx cap init
```

CLIは、アプリ名やアプリに使用するパッケージIDなどから、いくつかの質問をします。

### AndroidとiOSのプロジェクトを作成する

Capacitorコアランタイムがインストールされたら、AndroidとiOSプラットフォームをインストールします。

```bash
npm i @capacitor/android @capacitor/ios
```

プラットフォームを `package.json` に追加したら、以下のコマンドを実行してネイティブアプリケーション用の Android と iOS プロジェクトを作成します。

```bash
npx cap add android
npx cap add ios
```

### ウェブコードをネイティブプロジェクトに同期させる

ネイティブプロジェクトを作成したら、以下のコマンドを実行して、Webアプリケーションをネイティブプロジェクトに同期させることができます。

```bash
npx cap sync
```

npx cap sync` はビルドしたウェブアプリケーション(デフォルトは `www`) をネイティブプロジェクトにコピーし、ネイティブプロジェクトの依存関係をインストールします。

:::info
どのフォルダをコピーするかは、`npx cap init`で作成される[Capacitor Config](/docs/config) ファイル内の `webDir` 変数を変更することでカスタマイズすることができます。
:::

## 次に進むべき道

環境が整い、プロジェクトの構成が適切に設定されれば、準備は完了です! より具体的なドキュメントが必要な場合は、以下のリンク先を参照してください。

[iOS を使い始める &#8250;](/docs/ios)

[Androidをはじめよう &#8250;](/docs/android)

[開発者ワークフローガイド &#8250;](/docs/basics/workflow)

