---
title: Automated Configuration
description: Automating the configuration and management of Capacitor projects for plugins, whitelabling, CI/CD, and more.
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitorプロジェクトの設定の自動化

多くの大規模アプリは、Capacitorプロジェクトの設定を自動化する必要があります。これは、iOSやAndroidのビルド番号の増加、マニフェストやplistファイルの設定、Gradleファイルでのビルド依存性の追加、リソースの修正などを意味します。

Capacitorには、プロジェクト管理に使える便利なパッケージが2つ付属しています。capacitor には、プロジェクト管理に使える便利なパッケージが2つあります： `@capacitor/project` と `@capacitor/configure` です。 `capacitor/project` は低レベルのプロジェクト管理ライブラリで、 `@capacitor/configure` は自動化されたツールで、ライブラリはそのまま使用できますが、特定のユースケースに対してより便利な設定オプションを提供します。

両方のプロジェクトとそのドキュメントは [Capacitor Configure repo](https://github.com/ionic-team/capacitor-configure) で利用可能です。

## プロジェクトAPI

capacitor/project` ライブラリは Capacitor プロジェクトと、それに含まれる iOS や Android のネイティブプロジェクトに対して型付き JavaScript インターフェイスを提供します。

基本的な使い方は、既存の `CapacitorConfig` を渡して、プロジェクトを初期化することです。

```typescript
import { CapacitorProject } from '@capacitor/project';
import { CapacitorConfig } from '@capacitor/cli';

// This takes a CapacitorConfig, such as the one in capacitor.config.ts, but only needs a few properties
// to know where the ios and android projects are
const config: CapacitorConfig = {
  ios: {
    path: 'ios',
  },
  android: {
    path: 'android',
  },
};

const project = new CapacitorProject(config);
await project.load();
```

プロジェクトを読み込むと、そのプロジェクトに対して操作を行うことができます。例えば、バージョンやビルド番号の管理は以下のようになります。

```typescript
await project.ios?.setVersion('App', 'Debug', '1.4.5');
await project.ios?.incrementBuild('App');
await project.ios?.getBuild('App', 'Debug');
await project.ios?.getBuild('App', 'Release');
await project.android?.setVersionName('1.0.2');
await project.android?.getVersionName();
await project.android?.setVersionCode(11);
await project.android?.getVersionCode();
await project.android?.incrementVersionCode();
```

このAPIは仮想ファイルシステム上で動作し、ファイルシステム上のファイルを変更することなく変更をバッファリングします。終了後、変更がファイルに反映されていることを確認するために、実行します。

```typescript
await project.commit();
```

このライブラリで実行できるオプションは他にもたくさんあります。完全なリストを見るには、[プロジェクトドキュメント](https://github.com/ionic-team/capacitor-configure) を参照してください。

## コンフィギュレーションツール

プロジェクト API と共に、`@capacitor/configure` は、便利な yaml 設定ファイルフォーマットから、 `@capacitor/project` の基本操作を適用するための自動化された設定駆動型のエクスペリエンスを提供します。例えば、最終的な設定値を生成するために変数を要求したり供給したりする機能や、プロジェクトのソースファイルに対して変更を適用する前にテストして確認する方法などがあります。

このツールは、Capacitorプラグインの作者が、プラグインが必要とする設定変更のセットを公開し、ユーザーがプロジェクトを手動で設定する必要がないようにするために、最も有用である可能性が高いです。

このツールは、npmスクリプトとして使用され、[example configuration](https://github.com/ionic-team/capacitor-configure/blob/main/examples/basic.yml) に従ったyamlフォーマットで提供されることを想定しています。


```json
"scripts": {
  "cap-config": "cap-config"
}
```

```bash
npx cap-config run config.yaml
```

このツールの使用方法については、[プロジェクトドキュメント](https://github.com/ionic-team/capacitor-configure) を参照してください。
