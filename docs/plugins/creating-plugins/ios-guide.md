---
title: Capacitor iOS プラグインガイド
description: Capacitor iOS プラグインガイド
contributors:
  - mlynch
  - jcesarmobile
sidebar_label: iOSガイド
slug: /plugins/ios
---

# Capacitor iOS プラグインガイド

iOS 用の Capacitor プラグインを構築するには、Apple の iOS SDK とインターフェイスするために Swift（または Objective-C）を記述する必要があります。

## はじめに

まず、プラグインガイドの [はじめかた](/plugins/creating-plugins/overview.md) にあるように、プラグインを生成します。

次に、Xcodeで`Package.swift`を開きます。次に、プラグインの.swiftファイルに移動します。

例えば、プラグインクラス名 `EchoPlugin` のプラグインの場合、`ios/Sources/EchoPlugin/EchoPlugin.swift` と `ios/Sources/EchoPlugin/Echo.swift` を開きます。

## プラグインの基本

一つは `NSObject` を継承した実装クラスで、ここにプラグインロジックを置く必要がある。もう一つは `CAPPlugin` と `CAPBridgedPlugin` を継承し、JavaScript から呼び出し可能ないくつかのエクスポートメソッドを持ち、実装メソッドをラップします。

### 簡単な例

生成されたばかりのサンプルには、単純な echo プラグインが `echo` 関数を持ち、与えられた値を単純に返します。

この例では、Capacitor プラグインのいくつかのコアコンポーネントを紹介します:
プラグインコールからデータを受け取り、呼び出し元にデータを返します:

`Echo.swift`

```swift
import Foundation

@objc public class Echo: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
```

`EchoPlugin.swift`

```swift
import Foundation
import Capacitor

@objc(EchoPlugin)
public class EchoPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "EchoPlugin"
    public let jsName = "Echo"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = Echo()

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
}
```

### Call Data へのアクセス

各プラグインメソッドは、クライアントからプラグインメソッドの呼び出しに関するすべての情報を含む `CAPPluginCall` のインスタンスを受け取ります。

クライアントは、number、text、booleans、オブジェクト、配列など、JSON でシリアライズ可能な任意のデータを送信することができます。このデータ には、コールインスタンスの `options` フィールド、または `getString` や `getObject` などの便利なメソッドでアクセスすることができます。
これらの値を渡したり、アクセスしたりする際には、 [別途説明するように](/main/reference/core-apis/data-types.md#ios) 注意しなければならない点があります。

例えば、メソッドに渡されるデータを取得する方法は以下の通りだとします:

```swift
@objc func storeContact(_ call: CAPPluginCall) {
  let name = call.getString("yourName") ?? "default name"
  let address = call.getObject("address") ?? [:]
  let isAwesome = call.getBool("isAwesome") ?? false

  guard let id = call.options["id"] as? String else {
    call.reject("Must provide an id")
    return
  }

  // ...

  call.resolve()
}
```

`CAPPluginCall` インスタンスでデータにアクセスするさまざまな方法に注目してください。 オプションは `guard` を使用しています。

### データを返す

プラグインの呼び出しは、成功するか失敗するかのどちらかです。プラグインの呼び出しは JavaScript の Promise からメソッド名を拝借しています。成功を示すには `resolve()` を呼び出し（オプションでデータを返す）、失敗をエラーメッセージとともに示すには `reject()` を使用します。

`CAPPluginCall` の `resolve()` メソッドは辞書を受け取り、JSON シリアライズ可能なデータ型をサポートします。以下は、データをクライアントに返す例です:

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

失敗する、あるいは呼び出しを拒否するには、 `reject()` を呼び出し、エラー文字列と、オプションでエラーコードと `Error` のインスタンスを渡します:

```swift
call.reject(error.localizedDescription, nil, error)
```

### プラグイン読み込み時にコードを実行する

プラグインが最初にロードされるときに、いくつかのコードを実行する必要がある場合があります。例えば、これは通知センターのイベントハンドラを設定するのに良い場所でしょう。

これを行うために、`load()` メソッドの実装を提供しています:

```swift
override public func load() {
}
```

### Capacitor へのエクスポート

Capacitorがあなたのプラグインを見ることができることを確認するために、プラグイン・ジェネレータは2つのことを行います：あなたのSwiftクラスをObjective-Cにエクスポートし、プラグインメソッドを登録します。

Swift のクラスを Objective-C にエクスポートするために、プラグインジェネレータは Swift のクラスの上に `@objc(EchoPlugin)` を追加し、`echo` メソッドの前に `@objc` を追加します。

プラグインメソッドを登録するために、プラグインジェネレータは `CAPPluginMethod` の `pluginMethods` 配列を作成し、`echo` メソッドを登録します。

```swift
public let pluginMethods: [CAPPluginMethod] = [
    CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
]
```

これにより、Capacitor の Web ランタイムで `echo` メソッドを使用できるようになり、Capacitor に対して echo メソッドが Promise を返すことを示すようになります。

プラグインにさらにメソッドを追加するには、`.swift` プラグインクラスで `func` キーワードの前に `@objc` を付けてメソッドを作成し、`pluginMethods` 配列に新しい `CAPPluginMethod` エントリを追加します。

## パーミッション

もしあなたのプラグインが iOS 上でエンドユーザーの許可を必要とする機能を持つなら、permissions パターンを実装する必要があります。

このセクションに進む前に、パーミッションのエイリアスとステータスのインターフェイスが設定されていることを確認してください。もしまだなら、Web ガイドの [permissions のセクション](/plugins/creating-plugins/web-guide.md#permissions) を参照してください。

### Permissions の設定

`checkPermissions()` と `requestPermissions()` メソッドをあなたの Swift のプラグインのクラスに追加します。

```diff
 import Capacitor

 @objc(EchoPlugin)
 public class EchoPlugin: CAPPlugin {
     ...

+    @objc override public func checkPermissions(_ call: CAPPluginCall) {
+        // TODO
+    }

+    @objc override public func requestPermissions(_ call: CAPPluginCall) {
+        // TODO
+    }
 }
```

#### `checkPermissions()`

このメソッドは、あなたのプラグインにおけるパーミッションの現在の状態を返すべきです。それは、あなたが定義した [permission status definition](/plugins/creating-plugins/web-guide.md#permission-status-definitions) の構造に一致する辞書であるべきです。一般的に、この情報はあなたが使っているフレームワーク上で直接利用できます。

以下の例では、ロケーションサービスから ` authorizationStatus`` を  `locationState``にマップし、その状態に`location` というエイリアスを関連付けています。

```swift
@objc override func checkPermissions(_ call: CAPPluginCall) {
    let locationState: String

    switch CLLocationManager.authorizationStatus() {
    case .notDetermined:
        locationState = "prompt"
    case .restricted, .denied:
        locationState = "denied"
    case .authorizedAlways, .authorizedWhenInUse:
        locationState = "granted"
    @unknown default:
        locationState = "prompt"
    }

    call.resolve(["location": locationState])
}
```

#### `requestPermissions()`

**ブロック型の API の場合**

フレームワークがパーミッションを要求するためのブロックベースの API をサポートしている場合、単一のメソッド内で操作を完了させることが可能です。

以下の例では、`AVCaptureDevice` にビデオアクセスを要求してから、独自の `checkPermissions` メソッドを使用してパーミッションの現在の状態を確認し、呼び出しを実行しています。

```swift
@objc override func requestPermissions(_ call: CAPPluginCall) {
    AVCaptureDevice.requestAccess(for: .video) { [weak self] _ in
        self?.checkPermissions(call)
    }
}
```

**Delegate 型の API の場合**

フレームワークが delegate（またはコールバック）API を使用している場合、操作を完了すると、元の呼び出しを保存し、コールバックが呼び出された後に取得する必要があることを意味します。

```swift
var permissionCallID: String?
var locationManager: CLLocationManager?

@objc override func requestPermissions(_ call: CAPPluginCall) {
    if let manager = locationManager, CLLocationManager.locationServicesEnabled() {
        if CLLocationManager.authorizationStatus() == .notDetermined {
            bridge?.saveCall(call)
            permissionCallID = call.callbackId
            manager.requestWhenInUseAuthorization()
        } else {
            checkPermissions(call)
        }
    } else {
        call.reject("Location services are disabled")
    }
}

public func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
    if let callID = permissionCallID, let call = bridge?.getSavedCall(callID) {
        checkPermissions(call)
        bridge?.releaseCall(call)
    }
}
```

**マルチ Permission の場合**

複数の種類のパーミッションが必要な場合、[DispatchGroup](https://developer.apple.com/documentation/dispatch/dispatchgroup) を使用すると、複数の呼び出しを同期させることができて便利です。

```swift
let store = CNContactStore()

@objc override func requestPermissions(_ call: CAPPluginCall) {
    // get the permissions to check or default to all of them
    var permissions = call.getArray("types", String.self) ?? []
    if permissions.isEmpty {
        permissions = ["contacts", "camera"]
    }

    let group = DispatchGroup()
    if permissions.contains("contacts") {
        group.enter()
        store.requestAccess(for: .contacts) { (_, _) in
            group.leave()
        }
    }
    if permissions.contains("camera") {
        group.enter()
        AVCaptureDevice.requestAccess(for: .video) { _ in
            group.leave()
        }
    }
    group.notify(queue: DispatchQueue.main) {
        self.checkPermissions(call)
    }
}
```

### プラグイン呼び出しの永続化

ほとんどの場合、プラグインメソッドはタスクを実行するために呼び出され、すぐに終了することができます。しかし、後でアクセスできるようにプラグインの呼び出しを有効にしておく必要がある場合もあります。例えば、位置情報データのライブストリーミングのようなデータを定期的に返したり、非同期タスクを実行したりする場合です。

プラグイン呼び出しを持続させる方法の詳細については、[プラグイン呼び出しの保存に関するこのガイド](/main/reference/core-apis/saving-calls.md) を参照してください。

## エラーハンドリング

### Unavailable

このエラーは、その機能が今すぐには使用できないことを示すために投げられることがあります。

```swift
@objc override func methodThatUsesNewIOSFramework(_ call: CAPPluginCall) {
    if #available(iOS 14, *) {
        // TODO implementation
    } else {
        call.unavailable("Not available in iOS 13 or earlier.")
    }
}
```

> 古い API のエクスペリエンスを可能な限り適切に低下させることをお勧めします。 `unavailable` は控えめに使いましょう。

### Unimplemented

このエラーは、あるメソッドが iOS 用に実装できないことを示すために使用します。

```swift
@objc override func methodThatRequiresAndroid(_ call: CAPPluginCall) {
    call.unimplemented("Not implemented on iOS.")
}
```

## Plugin Events

プラグインは独自のイベントを発生させることができ、このようなリスナーをプラグインオブジェクトにアタッチすることでリスニングすることができます。

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent was fired');
});
```

Swift のプラグインクラスからイベントを発信する方法:

```swift
self.notifyListeners("myPluginEvent", data: [:])
```

プラグインオブジェクトからリスナーを削除する場合:

```typescript
import { MyPlugin } from 'my-plugin';

const myPluginEventListener = await MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent was fired');
  },
);

myPluginEventListener.remove();
```

> `window` でのグローバルオブジェクトをトリガーにすることもできます。　詳細は [`triggerJSEvent`](/main/reference/core-apis/ios.md#triggerjsevent) をご確認ください。

## ネイティブ画面を表示する

Capacitor の [`UIViewController`](/main/reference/core-apis/ios.md#viewcontroller) を使用すると、アプリ上でネイティブ画面を表示することができます。

## ナビゲーションをオーバーライドする

Capacitor プラグインはウェブビューのナビゲーションをオーバーライドすることができます。そのために、プラグインは `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` メソッドをオーバーライドすることができます。
`true` を返すと、WebView は URL の読み込みを中断します。
`false` を返すと、WebView は URL の読み込みを継続します。
`nil`を返すと、デフォルトのCapacitorーのポリシーに従います。

## 高度な設定

Capacitor iOS プラグインは CocoaPods ライブラリなので、依存関係や必要なフレームワーク、その他の高度な設定を追加するには、プラグインジェネレータによって作成された `.podspec` ファイルを編集する必要があります。可能なすべてのオプションを確認するには、[podspec reference](https://guides.cocoapods.org/syntax/podspec.html) をチェックしてください。
