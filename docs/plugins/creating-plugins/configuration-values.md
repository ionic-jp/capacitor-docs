---
title: 設定値
description: Capacitorプラグインの設定値
contributors:
  - eric-horodyski
sidebar_label: 設定値
slug: /plugins/configuration-values
---

# 設定値

プラグインを開発するとき、開発者が設定できる値を提供して、プラグインの実行時の動作に影響を与えることができます。プラグインの設定値の例としては、 `@capacitor/splash-screen` プラグインで利用できる `launchShowDuration` があります。これは、スプラッシュ画面を表示してから隠すまでの時間を設定します。

Capacitor プラグインの設定値は、Capacitor 設定ファイルの `plugins` プロパティの一部として設定されます。

## 設定値の定義

Capacitor プラグインは、Capacitor 設定ファイルの `plugins` プロパティでプラグイン名で定義された設定値にアクセスすることができます。

```typescript
{
  appId: 'com.company.app',
  ...
  plugins: {
    MyCoolPlugin: {
      style: "dark",
      iconColor: '#FF0000'
    }
  }
}
```

上記の例では、MyCoolPlugin プラグインのネイティブ実装は、`style` と `iconColor` の設定値にアクセスできます。

Capacitorの設定ファイルはTypeScriptをサポートしています。必須ではありませんが、プラグインで利用可能な設定値を定義し、文書化した型付け情報を提供することが推奨されます。

`capacitor/cli` が提供する `PluginsConfig` インターフェースを拡張することで、プラグインの設定値に対するタイピング情報を提供することができます。

```typescript
/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    MyCoolPlugin?: {
      /**
       * Override the cool theme style if your app doesn't support light/dark theme changes.
       *
       * @since 1.0.0
       * @example "light"
       */
      style?: 'dark' | 'light';

      /**
       * Color of the cool icon in hex format, #RRGGBB or #RRGGBBAA.
       *
       * @since 1.0.0
       * @default #ffffff
       * @example "#FF9900"
       */
      iconColor?: string;
    };
  }
}
```

この型付け定義はプラグインの `definitions.ts` ファイル内に置くことを推奨します。プラグイン利用者がこの型付け情報にアクセスするには、Capacitorの設定ファイルにTypeScriptを使用している必要があり、 `capacitor.config.ts` にプラグインの型への参照を追加する必要があります:

```typescript
/// <reference types="@capacitor-community/my-cool-plugin" />
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.company.app",
  ...
  plugins: {
    MyCoolPlugin: {
      style: "dark",
      iconColor: "#034821"
    }
  }
}
export default config;
```

## 設定値へのアクセス

Capacitor API には、プラグインのネイティブ実装からプラグインの設定値にアクセスするための `getConfig()` ユーティリティメソッドがあります。

For iOS:

```swift
if let style = getConfig().getString("style") {
  // Set the style
}
```

For Android:

```Java
String style = getConfig().getString("style");
if(style) {
  // Set the style
}
```

プラグインコンシューマーに設定値を強制することはできません。また、プラグインコンシューマーは無効なデータを渡すことができます (特にJSONベースのCapacitor設定を使用している場合)。

プラグイン開発者としては、プラグインの設定値に関する適切な文書を提供し、 プラグイン利用者が設定値を提供しない場合や無効な入力を提供した場合に 優雅にフォールバックできるようにする必要があります。
