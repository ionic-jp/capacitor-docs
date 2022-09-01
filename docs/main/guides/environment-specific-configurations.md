---
title: 環境に応じた構成
description: 環境に応じた構成を作成する
contributors:
  - eric-horodyski
slug: /guides/environment-specific-configurations
---

# 環境固有の設定の作成

**プラットフォーム:** iOS, Android

多くのソフトウェア開発チームは、ソフトウェア開発のライフサイクルの中で、異なる環境を利用しています。バンドルID、ディープリンクスキーム、アイコンやスプラッシュスクリーンなど、環境間で設定が異なる場合があります。

Capacitorの設定ファイルは、Capacitorツールおよびプラグイン設定のための高レベルのオプションを処理します。iOSスキームとAndroidプロダクトフレーバーにより、開発者は異なる環境に対して異なるアプリの値を提供することができます。この2つを組み合わせることで、開発者はCapacitor CLIを使用して異なる環境用のアプリを構築することができます。

このガイドでは、箱から出してすぐに提供されるデフォルトの環境設定と一緒に、QA環境設定を行う方法を説明します。各環境の違いを示すために、アプリ名とバンドルIDは両者で異なります。

## Capacitorアプリを用意する

iOSとAndroidの両方のプラットフォームが追加されたCapacitorアプリが必要です。両方のプラットフォームが追加された既存のCapacitorアプリをお持ちの場合は、このセクションをスキップしてください。

お好みに応じて、[既存のWebアプリケーションにCapacitorを追加する](/docs/getting-started)か、[Ionic Frameworkで新しいCapacitorアプリケーションを作成する](/docs/getting-started/with-ionic)かのどちらかを選択できます。

Capacitorアプリは、設定にTypeScriptを使用する必要があります。このガイドでは、`capacitor.config.ts`を使用して、さまざまな設定を動的にエクスポートします。

プロジェクトにネイティブ・プラットフォームを追加する前に、少なくとも一度はCapacitorアプリをビルドする必要があります。

```bash
npm run build
```

ビルドが完了したら、プラットフォームを追加することができます。

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

## 新しいiOSスキームをセットアップする

### 新しい Xcode ターゲットを作成する

まず、Xcode でネイティブの iOS プロジェクトを開きます。 `npx cap open ios`.

1. プロジェクトナビゲータパネルで、プロジェクトの設定に移動します。ターゲット(_Targets_)セクションで、"App "ターゲットを右クリックし、**Duplicate**を選択して、既存のターゲットをコピーします。
2. 2. 新しい "App copy "ターゲットをクリックし、`Enter`キーを押して名前を変更します。ターゲットの名前を "App QA "に設定してください。

この処理により、追加の "App copy" スキームが作成され、`App copy-Info.plist` という新しいファイルが追加されます。

iOS のターゲットに関する追加情報は、[このリンク](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/WorkingwithTargets.html) で確認できます。

### 新しいスキームと Plist ファイルをリネームします。

1. Schemeメニューから、**Manage Schemes...**を選択します。
2. "App copy "スキームを見つけ、`Enter`キーを押して名前を変更します。App QA "という名前に設定し、ダイアログを閉じます。
3. プロジェクトナビゲータパネルで "App copy-Info "ファイルを見つけ、`Enter`キーを押してファイル名を変更します。ファイル名を "App QA-Info.plist "に設定します。
4. プロジェクトの設定に戻ります。App QA "ターゲットが選択されていることを確認し、_Build Settings_セクションを開いてください。パッケージングまでスクロールダウンし、**Info.plist File** のエントリを "App QA-Info.plist" に変更します。

iOSプロジェクトは、2つの実行可能なスキーマを持つようになりました。"App "と "App QA "です。Capacitorの設定ファイルでは、`run`コマンドの際にどちらのスキームをビルドするかを指定することができます。

iOSのスキームに関する追加情報は[こちらのリンク](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/ManagingSchemes.html)にあります。

### 環境固有の値を設定する

プロジェクトの設定の _General_ の部分に戻ります。App QA」ターゲットが選択されていることを確認し、**Display Name** と **Bundle Identifier** を変更します。

これらの値が、デフォルトの「App」ターゲットに存在する値とは異なることを確認します。ターゲット固有の値は、ターゲットに関連付けられた `Info.plist` ファイルに保存されます。このガイドに従うと、そのファイルは`App QA-Info.plist`です。

### Podfileを更新してアプリを同期する

Xcodeを終了します。この先、お好みのIDEを使用することができます。

ios/App/Podfile`を開き、"App "ターゲットのコードブロックを複製します。

```ruby
...snip...
target 'App' do
  capacitor_pods
  # Add your Pods here
end

target 'App QA' do
  capacitor_pods
  # Add your Pods here
end
```

`npx cap sync` を実行して、プラグインを "App QA" ターゲットに同期させます。

### iOS固有のCapacitor設定を追加する

QA環境のターゲットとスキームが作成されたので、それらを使用するためにCapacitorの設定を更新する必要があります。

以下のプロパティを `capacitor.config.ts` の設定オブジェクトに追加してください。

```typescript
ios: {
  scheme: 'App QA',
}
```

`scheme` プロパティは `run` コマンドに使用する iOS スキームを Capacitor に伝えます。試しに `npx cap run ios` を実行してみると、アプリの名前が変わっていることがわかります。

## セットアップ Android 製品フレーバー

### アプリの Gradle ファイルを修正する

Android プロジェクトには複数の `build.gradle` ファイルがありますが、プロダクトフレーバーを設定するために修正するファイルは `/android/app` フォルダに存在します。

Android/app/build.gradle` を開き、`android` ブロック内に以下のコードを追加します。

```groovy
flavorDimensions "environment"
productFlavors {
  dev {
      dimension "environment"
      manifestPlaceholders = [displayName:"My App"]
  }
  qa {
      dimension "environment"
      applicationIdSuffix ".qa"
      manifestPlaceholders = [displayName:"My App - QA"]
  }
}
```

このコードには若干の説明が必要です。

1. Androidには、「デフォルト」のフレーバーがありません。このガイドでは、非QA環境を "dev "と呼びます。
2. `applicationIdSuffix` は、バンドルIDの末尾に `.qa` を追加します。
3. `manifestPlaceholders` は `AndroidManifest.xml` で使用可能な値です。

> **Note:** バンドル ID と表示名の値は、お好みで自由に変更してください。

Android のプロダクトフレーバーに関するその他の情報は、[こちらのリンク](https://developer.android.com/studio/build/build-variants) でご覧いただけます。

### Android マニフェストの更新

前節で、プレースホルダー `displayName` を作成しました。AndroidManifest.xml` を開き、`application` と `activity` ノード内の `android:label` の値を `${displayName}` に変更します。

```xml
<application
  ...snip...
  android:label="${displayName}">

  <activity
    ...snip...
    android:label="${displayName}">
```

### Android固有のCapacitor設定を追加する

iOSと同様に、QAプロダクトのフレーバーを使用するために、Capacitorの設定を更新する必要があります。

以下のプロパティを `capacitor.config.ts` の設定オブジェクトに追加してください。

```typescript
android: {
   flavor: "qa",
 },
```

試しに、`npx cap run android`を実行してみると、アプリ名が変わっていることがわかります。

## 異なる環境に対応した動的ビルド

### 環境固有の Capacitor 設定をエクスポートする

これで、`capacitor.config.ts`は、特定の値に基づいて異なる設定オブジェクトをエクスポートするように書くことができます。

`capacitor.config.ts` を開いて、以下のようにコードを修正してください。

```typescript
import { CapacitorConfig } from '@capacitor/cli';

let config: CapacitorConfig;

const baseConfig: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'My App',
  webDir: 'build',
  bundledWebRuntime: false,
};

switch (process.env.NODE_ENV) {
  case 'qa':
    config = {
      ...baseConfig,
      ios: {
        scheme: 'App QA',
      },
      android: {
        flavor: 'qa',
      },
    };
    break;
  default:
    config = {
      ...baseConfig,
      ios: {
        scheme: 'App',
      },
      android: {
        flavor: 'dev',
      },
    };
    break;
}

export default config;
```

`NODE_ENV` が `qa` と等しい場合、Capacitor は "App QA" スキームと "qa" プロダクトフレーバーを指す設定を使用します。それ以外の場合、Capacitor は "App" スキームと "dev" 製品フレーバーを指し示す設定を使用します。

### 異なる環境でのアプリの実行

`NODE_ENV=qa` を `npx cap copy` と `npx cap run` コマンドの前に付けると、QA環境固有の設定を使用してビルドを実行できます。

```bash
NODE_ENV=qa npx cap copy
NODE_ENV=qa npx cap run ios 	#NODE_ENV=qa npx cap run android
```

「デフォルト」の環境固有の設定を使用してビルドを実行するには、通常と同じようにCapacitorコマンドを使用します。

```bash
npx cap copy
npx cap run ios 	#npx cap run android
```

さあ、テストしてみましょう! ガイドに正しく従えば、両方の環境でビルドを実行し、使用した環境固有の設定によってアプリ名が異なることが確認できます。

## その他の環境と設定オプション

このガイドで提供された情報を基礎として、構築してください。Capacitor CLIは、使用できるスキームや製品フレーバーの数に制限はなく、iOSとAndroidが許す限り、それぞれを深く設定することができます。また、Capacitorプラグインに異なる環境固有の設定値を提供することも可能です! 
