---
title: スプラッシュ画面とアイコン
description: capacitor/assets を使ってネイティブプロジェクトのリソースイメージを生成する
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

[@capacitor/assets](https://github.com/ionic-team/capacitor-assets)ツールを使用して、iOS、Android、またはProgressive Web Applicationのスプラッシュ画面とアイコンを生成できます。

まず、`@capacitor/assets`をインストールします：

```bash
npm install @capacitor/assets --save-dev
```

以下のフォルダ/ファイル名構造を使用してアイコンとスプラッシュ画面のソース画像を用意します：
```
assets/
├── icon-only.png
├── icon-foreground.png
├── icon-background.png
├── splash.png
└── splash-dark.png
```
- アイコンファイルは最低`1024px` x `1024px`にしてください。
- スプラッシュ画面ファイルは最低`2732px` x `2732px`にしてください。
- フォーマットは`jpg`または`png`が使用できます。

その後、生成を実行します（ネイティブプロジェクトに適用するか、PWAマニフェストファイルを生成します）：
```shell
npx capacitor-assets generate
```

または、`--ios`、`--android`、`--pwa`を使用して特定のプラットフォーム向けに生成することもできます。

:::note
コミュニティで管理されている[VS Code拡張機能](../getting-started/vscode-extension.mdx)でもスプラッシュ画面とアイコンのアセットを生成できます。
:::

## Android 12以降
Android 12以降、GoogleはスプラッシュスクリーンのAndroid 11以下で可能だったフルスクリーン画像の代わりに、色付きの背景と小さなアイコンを使用するように表示方法を変更しました。この変更に関する追加ドキュメントは[developer.android.com](https://developer.android.com/develop/ui/views/launch/splash-screen)で確認できます。
