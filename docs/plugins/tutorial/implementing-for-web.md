---
title: Capacitorプラグインの構築
description: Capacitorプラグインの構築 - Web/PWAs のために実装する
contributors:
  - eric-horodyski
sidebar_label: Web/PWAs のために実装する
slug: /plugins/tutorial/web
---

# Web/PWAs のために実装する

プラグインのAPIを設計しているときに、すでにWebでは画面の向き（スクリーンオリエンテーション）機能がサポートされていることが分かりました（もちろん、モバイルデバイスでは完全ではありませんが）。
ここで、こう思うかもしれません：「そもそも、プラグインにWeb実装が必要なんですか？Web上なら <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a> を使えばいいし、それ以外の環境ならプラグインを使えばよいのでは？」

Web Native アプリケーションの背後にある重要な理念は、"write once, run anywhere "です。Capacitor プラグインを使用する開発者は、同じプラグインクラスとメソッドを使用して、すべてのプラットフォームでそれらを実装することができるはずです。

したがって、私たちは良き開発者市民として、Screen Orientation Web API を `ScreenOrientation` プラグインのウェブ実装の中にラップすることにします。

## Capacitor の WebPlugin クラスを拡張する

新しいファイル `src/plugins/screen-orientation/web.ts` を開いてください。このファイルに `ScreenOrientation` プラグインのウェブ実装を記述します。

まず、`ScreenOrientationWeb` クラスを宣言し、 `WebPlugin` を継承させます。

```typescript
import { WebPlugin } from '@capacitor/core';
import type { ScreenOrientationPlugin } from './definitions';

export class ScreenOrientationWeb extends WebPlugin {
  constructor() {
    super();
  }
}
```

Capacitor の `WebPlugin` クラスには、プラグインのリスナーに画面の向きが変わったことを通知するためのロジックが含まれています。Screen Orientation Web API の change イベントが発生したら、リスナーに通知しましょう。コンストラクタを次のように更新します。

```typescript
constructor() {
   super();
   window.screen.orientation.addEventListener("change", () => {
     const type = window.screen.orientation.type;
     this.notifyListeners("screenOrientationChange", { type });
   });
 }
```

`WebPlugin` クラスは `ScreenOrientationPlugin` インターフェースで定義されている `addListener()` と `removeAllListeners()` メソッドの実装を含んでいます。これらのメソッドを利用するために、追加の作業は必要ありません。

## 残りのメソッドを実装する

それでは、`ScreenOrientationPlugin` インターフェースの実装を終了しましょう。まずは、クラスが実際にインターフェイスを実装するように、クラス定義を調整することから始めましょう:

```typescript
export class ScreenOrientationWeb
  extends WebPlugin
  implements ScreenOrientationPlugin
{
```

そして、残りのメソッドを `ScreenOrientationWeb` クラスの一部として実装します:

```typescript
 async orientation(): Promise<ScreenOrientationResult> {
    if (typeof screen === 'undefined' || !screen.orientation) {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
    return { type: screen.orientation.type };
  }

 async lock(options: OrientationLockOptions): Promise<void> {
    // See https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1615
    if (
      typeof screen === 'undefined' ||
      !screen.orientation ||
      !(screen.orientation as any).lock
    ) {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
    try {
      await (screen.orientation as any).lock(options.orientation);
    } catch {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
  }

 async unlock(): Promise<void> {
    if (
      typeof screen === 'undefined' ||
      !screen.orientation ||
      !screen.orientation.unlock
    ) {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
    try {
      screen.orientation.unlock();
    } catch {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
  }
```

## ウェブ実装を登録する

`ScreenOrientationWeb` をプラグインのウェブ実装として登録するには、 `registerPlugin()` の 第 2 引数を使用する必要があります。 `src/plugins/screen-orientation/index.ts` を開いて、変数 `ScreenOrientation` の宣言を以下のように更新してください。

```typescript
const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);
```

## テストドライブをしよう

Web の実装をテストしてみましょう。アプリケーションを `ionic serve` で配信すると、ブラウザの開発ツールでモバイルデバイスを縦長と横長の両方の画面向きでエミュレートすることができます。 「デバイスを回転させる」ボタンが機能しないのは、 `window.screen.orientation.lock()` のウェブサポートが貧弱だからです。 しかし、デベロッパーツールを使って手動で回転させれば、異なるデザインを見ることができるはずです。

1 つのプラットフォームを実装したので、あと 2 つ! iOS と Android のコードに飛び込む前に、それをどのようにパターン化し、抽象化するかを検討する必要があります。次のステップでいくつかのパターンを確認しましょう：コードの抽象化パターン。
