---
title: Capacitorのインストール
description: Capacitorのインストール
slug: /getting-started
---

# Capacitor のインストール

新しいCapacitorアプリケーションを作成したり、既存のWebプロジェクトにCapacitorを追加することができます。これはCLIまたは[VS Code extension](vscode/getting-started) を使用して行うことができます。

ビルドするプラットフォームの[環境設定](/main/getting-started/environment-setup.md) を確認するのを忘れないようにしましょう。

## 新しいCapacitorアプリケーションを作成する

capacitor/create-app` パッケージを使うと、Capacitor アプリケーションを素早く作成することができます。空のディレクトリで以下のコマンドを実行すると、新しい Capacitor アプリケーションの足場ができます。

```bash
npm init @capacitor/app@latest
```

## 既存のウェブアプリケーションにCapacitorを追加する

Capacitorは、最新のJavaScriptウェブアプリにドロップできるように設計されています。ただし、既存のアプリケーションでCapacitorを使用するためには、プロジェクトに次の3つの要件が必要です：

- `package.json` ファイル
- `dist` や `www` などのビルドされたウェブ資産を格納する別のディレクトリ
- ウェブアセットディレクトリのルートにある `index.html` ファイル

:::info
Capacitorを正しくインジェクションするには、`index.html` ファイルに `<head>` タグが含まれている必要があります。もし
がない場合、Capacitorプラグインは動作しません。
:::

### Capacitorのインストール

アプリのルートに、Capacitorの主なnpm依存関係（コアJavaScriptランタイムとコマンドラインインターフェース（CLI））をインストールします。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### Capacitorの設定を初期化する

次に、CLIアンケートを使ってCapacitorを初期化します。

```bash
npx cap init
```

CLIは、アプリ名とアプリに使用するパッケージIDから始まり、いくつかの質問をします。そして、capacitor-config ファイルを作成します。capacitor-config ファイルには、bundler のビルドプロセスで出力されるディレクトリ（例：Angular の場合は `www`、React の場合は `build`、Vue の場合は `public`など）を指定します。

:::info
Capacitor が使用するフォルダは、`npx cap init` 中に作成される [Capacitor Config](/docs/config) ファイルの `webDir` 変数を変更することでカスタマイズできます。Capacitorは使用しているフレームワークをチェックすることで、Webプロジェクトのデフォルトを検出しようとすることに注意してください。それでも、最初のビルドの同期に問題がある場合は、この設定変数をクロスチェックすることをお勧めします。
:::

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

`npx cap sync` は、 [Capacitor Config](/docs/config) ファイルの `webDir` の値にあなたのWebバンドルをコピーし、ネイティブプロジェクトの依存関係をインストールします。

## 次に進むべき道

環境が整い、プロジェクトの構成が適切に設定されれば、準備は完了です! より具体的なドキュメントが必要な場合は、以下のリンク先を参照してください。

[iOS を使い始める &#8250;](/main/ios/index.md)

[Androidをはじめよう &#8250;](/main/android/index.md)

[開発者ワークフローガイド &#8250;](/main/basics/workflow.md)

