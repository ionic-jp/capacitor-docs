---
title: iOSのカスタムネイティブコード
description: iOSのカスタムネイティブコード
contributors:
  - dotNetkow
  - mlynch
slug: /ios/custom-code
---

# カスタムネイティブiOSコード

Capacitorでは、アプリに必要なネイティブ機能を実装するためにSwiftやObjective-Cのコードを書くことが推奨されています。

[Capacitorプラグイン](/docs/plugins)が全てに対応するわけではありませんが、それでも構いません! アプリの中で WebView にアクセス可能なネイティブコードを書くことができます。

## WebView にアクセス可能なネイティブコード

JavaScript とネイティブ コード間の通信を行う最も簡単な方法は、アプリにローカルなカスタム Capacitor プラグインを構築することです。

### `EchoPlugin.swift`

まず、`EchoPlugin.swift`ファイルを作成します。[Xcode](/docs/ios#opening-the-ios-project) を開き、**App** グループ (**App** ターゲットの下) を右クリックしてコンテキストメニューから **New File...** を選び、ウィンドウで **Swift File** を選択してファイルを作成します。

![New Swift File in Xcode](../../../static/img/v4/docs/ios/xcode-new-swift-file.png)

以下のSwiftコードを`EchoPlugin.swift`にコピーします。

```swift
import Capacitor

@objc(EchoPlugin)
public class EchoPlugin: CAPPlugin {
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve(["value": value])
    }
}
```

> `@objc` デコレーターは、Capacitorのランタイム(動的なプラグインサポートのためにObjective-Cを使用しなければなりません)がそれを見ることができることを確認するために必要です。

### プラグインを登録する

CapacitorがSwiftとJavaScriptの間を橋渡しできるように、iOSとWebの両方でカスタムプラグインを登録する必要があります。

#### `EchoPlugin.m` を作成します。

次に、Xcodeで同じようにEchoPlugin.m`ファイルを作成しますが、ウィンドウで**Objective-C**を選択します。File Type** は **Empty File** のままにしておきます。XcodeからBridging Headerの作成を促されたら、**Create Bridging Header**をクリックします。

> Xcodeを使用してネイティブファイルを作成することは、プロジェクトに適切にリファレンスが追加されるため、推奨されています。
>
> プロジェクトファイルへのこれらの変更は、新しいファイル自体と共にプロジェクトにコミットされるべきです。

以下の Swift コードを `EchoPlugin.m` にコピーしてください。

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
    CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

> これらの Objective-C マクロは、あなたのプラグインを Capacitor に登録し、`EchoPlugin` とその `echo` メソッドを JavaScript から利用できるようにします。EchoPlugin.swift` のメソッドを追加または削除するたびに、このファイルは更新されなければなりません。

#### JavaScript

JavaScript では、`@capacitor/core` の `registerPlugin()` を使って Swift プラグインにリンクされたオブジェクトを作成します。

```typescript
import { registerPlugin } from '@capacitor/core';

const Echo = registerPlugin('Echo');

export default Echo;
```

> `registerPlugin()` の最初のパラメータはプラグイン名で、これは `EchoPlugin.m` の `CAP_PLUGIN` マクロの2番目のパラメータと一致していなければなりません。

**TypeScript**

インターフェースを定義して、それを `registerPlugin()` のコールで使用することで、リンク先のオブジェクトの型を定義することができます。

```diff-typescript
 import { registerPlugin } from '@capacitor/core';

+export interface EchoPlugin {
+  echo(options: { value: string }): Promise<{ value: string }>;
+}

-const Echo = registerPlugin('Echo');
+const Echo = registerPlugin<EchoPlugin>('Echo');

 export default Echo;
```

`registerPlugin()` の generic パラメータは、リンク先のオブジェクトの構造を定義するものです。必要であれば、 `registerPlugin<any>('Echo')` を使って型を無視することができます。判定はしない。❤️

### プラグインを使う

エクスポートされた `Echo` オブジェクトを使用して、プラグインのメソッドを呼び出します。以下のスニペットは、iOS の Swift に呼び出され、結果を表示します。

```typescript
import Echo from '../path/to/echo-plugin';

const { value } = await Echo.echo({ value: 'Hello World!' });
console.log('Response from native:', value);
```

### 次のステップ

[iOS Plugin Guide を読む &#8250;](/docs/plugins/ios)