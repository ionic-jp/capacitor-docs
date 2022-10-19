---
title: 構成の自動化
description: プラグイン、whitelabling、CI/CDなど、Capacitorプロジェクトの構成と管理を自動化します。
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitorプロジェクトの構成の自動化

多くの大規模アプリは、Capacitorプロジェクトの構成を自動化する必要があります。これは、iOSやAndroidのビルド番号の増加、マニフェストやplistファイルの設定、Gradleファイルでのビルド依存性の追加、リソースの修正などを意味します。

Capacitor には、プロジェクト管理に使える便利なパッケージが 2 つ付属しています。それは `@trapezedev/project` と `@trapezedev/configure` です。 `trapezedev/project` は低レベルのプロジェクト管理ライブラリで、 `@trapezedev/configure` は自動化ツールです。このライブラリはフードの下で使用しますが、特定のユースケースに対してより便利な設定オプションを提供します。

両方のプロジェクトとそのドキュメントは [Trapeze repo](https://github.com/ionic-team/trapeze) で見ることができます。

## プロジェクトAPI

The `@trapezedev/project` library provides a typed JavaScript interface for Capacitor projects and the native iOS and Android projects that they contain.

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// This takes a MobileProjectConfig
// to know where the ios and android projects are
const config: MobileProjectConfig = {
  ios: {
    path: 'ios/App',
  },
  android: {
    path: 'android',
  },
};

const project = new MobileProject(process.cwd(), config);
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

このライブラリで実行できるオプションは他にもたくさんあります。完全なリストを見るには、[プロジェクトドキュメント](https://github.com/ionic-team/trapeze) を参照してください。

## コンフィギュレーションツール

プロジェクト API と共に、 `@trapezedev/configure` は `@trapezedev/project` の基本操作を、便利な yaml 設定ファイルフォーマットから適用する、自動化された設定駆動型の体験を提供します。例えば、最終的な設定に値を入れるために変数を要求・供給する機能や、プロジェクトのソースファイルに対して変更を適用する前にテストして確認する方法などがあります。

このツールは、Capacitorプラグインの作者が、プラグインが必要とする設定変更のセットを公開し、ユーザーがプロジェクトを手動で設定する必要がないようにするために、最も有用である可能性が高いです。

このツールは、npmスクリプトとして使用され、[example configuration](https://github.com/ionic-team/capacitor-configure/blob/main/examples/basic.yml) に従ったyamlフォーマットで提供されることを想定しています。

このツールは、npmスクリプトとして使用され、その後、 [設定例](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml) に従ったyaml形式で提供されることを想定しています。

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

このツールの使用方法については、 [プロジェクトドキュメント](https://github.com/ionic-team/trapeze) を参照してください。
