---
title: Capacitorプラグインの構築
description: Capacitorプラグインの構築 - iOS のための実装
contributors:
  - eric-horodyski
sidebar_label: iOS のための実装
slug: /plugins/tutorial/ios-implementation
---

# iOS のための実装

Android より先に iOS を実装するというのは恣意的な判断です。正直なところ、最初に Android の実装を書き、次に iOS、そして Web という順番でもよかったのです。正直なところ、Android の実装を先に書いて、次に iOS、そして Web を書くこともできましたし、その 3 つを組み合わせることもできました。このチュートリアルでは、たまたま iOS を Android の前に実装しています。

プラグインの API 定義に近いので、Web を先に実装した方がいいかもしれません。もし API に手を加える必要があるなら、ウェブレイヤーで作業している間にそれを明らかにするのがはるかに簡単です。

## Capacitor にプラグインを登録する

> **前提条件:** 続ける前に、 <a href="https://capacitorjs.com/docs/ios/custom-code" target="_blank">Capacitor Custom Native iOS Code documentation</a> を読んで、慣れ親しんでおいてください。

Xcode で `npx cap open ios` を実行して、Capacitor アプリケーションの iOS プロジェクトを開きます。 **App** グループ ( **App** ターゲットの下) を右クリックし、コンテキストメニューから **New Group** を選択します。この新しいグループに **plugins** という名前を付けます。新しいグループを **plugins** に追加し、**ScreenOrientation** と名付けます。

完了すると、 `/App/App/plugins/ScreenOrientation/` というパスができます。 **ScreenOrientation** グループを右クリックして、コンテキストメニューから **New File...** を選択し、以下のファイルを追加します:

`ScreenOrientation.swift`
`ScreenOrientationPlugin.swift`

次のコードを `ScreenOrientationPlugin.swift` にコピーしてください:

```swift
import Foundation
import Capacitor

@objc(ScreenOrientationPlugin)
public class ScreenOrientationPlugin: CAPPlugin, CAPBridgedPlugin {
  public let identifier = "ScreenOrientationPlugin"
  public let jsName = "ScreenOrientation"
  public let pluginMethods: [CAPPluginMethod] = [
      CAPPluginMethod(name: "orientation", returnType: CAPPluginReturnPromise),
      CAPPluginMethod(name: "lock", returnType: CAPPluginReturnPromise),
      CAPPluginMethod(name: "unlock", returnType: CAPPluginReturnPromise)
  ]

  @objc public func orientation(_ call: CAPPluginCall) {
    call.resolve()
  }

  @objc public func lock(_ call: CAPPluginCall) {
    call.resolve()
  }

  @objc public func unlock(_ call: CAPPluginCall) {
    call.resolve();
  }
}
```

`@objc` デコレーターの利用について: これらは、Capacitor が実行時にクラスとそのメソッドを確認できるようにするために必要なものです。

## 現在の画面の向きを取得する

まず、現在の画面の向きを取得するタスクに取り組みましょう。 `ScreenOrientation.swift` を開いてクラスを設定し、現在の向きを取得するメソッドを記述します:

```swift
import Foundation
import UIKit
import Capacitor

public class ScreenOrientation: NSObject {

  public func getCurrentOrientationType() -> String {
    let currentOrientation: UIDeviceOrientation = UIDevice.current.orientation
    return fromDeviceOrientationToOrientationType(currentOrientation)
  }

  private func fromDeviceOrientationToOrientationType(_ orientation: UIDeviceOrientation) -> String {
    switch orientation {
    case .landscapeLeft:
      return "landscape-primary"
    case .landscapeRight:
      return "landscape-secondary"
    case .portraitUpsideDown:
      return "portrait-secondary"
    default:
      // Case: portrait
      return "portrait-primary"
    }
  }

}
```

次に、`ScreenOrientationPlugin.swift` の `orientation` メソッドを配置し、実装クラスのメソッドを呼び出すようにします:

```Swift
@objc(ScreenOrientationPlugin)
public class ScreenOrientationPlugin: CAPPlugin, CAPBridgedPlugin {
  public let identifier = "ScreenOrientationPlugin"
  public let jsName = "ScreenOrientation"
  public let pluginMethods: [CAPPluginMethod] = [
      CAPPluginMethod(name: "orientation", returnType: CAPPluginReturnPromise),
      CAPPluginMethod(name: "lock", returnType: CAPPluginReturnPromise),
      CAPPluginMethod(name: "unlock", returnType: CAPPluginReturnPromise)
  ]

  private let implementation = ScreenOrientation()

  @objc public func orientation(_ call: CAPPluginCall) {
    let orientationType = implementation.getCurrentOrientationType()
    call.resolve(["type": orientationType])
  }

  /* Remaining code omitted for brevity */
}
```

Xcode から、実機または iOS シミュレーターでアプリを実行してみてください。読み込みが完了すると、コンソールに以下のようなログが出力されるはずです。

```bash
⚡️  To Native ->  ScreenOrientation orientation 115962915
⚡️  TO JS {"type":"portrait-primary"}
```

> **注意:** ログの正確な値は、あなたにとって異なるものになります。この例では、`115962915`はプラグインから呼び出されたメソッドに割り当てられた任意の ID です。

これで、iOS のネイティブコードと Web アプリケーションの橋渡しに成功しました! 🎉

## 画面の向きが変わったときの検知

iOS は、ユーザーがデバイスを回転させると、UIDevice が `orientationDidChangeNotification` イベントを発生させ、<a href="https://developer.apple.com/documentation/foundation/notificationcenter" target="_blank">NotificationCenter</a> を通じて知らせてくれます。

`load()` メソッドはこのイベントのオブザーバーを登録するのに適した場所です。同様に、オブザーバを削除するには `deinit()` メソッドが適切な場所となります。

observer の登録では、プラグインの API で定義した `screenOrientationChange` イベントをリスニングしているリスナーに対して、変更後の向きを返すメソッドを提供する必要があります。変更された画面の向きを取得するために、`getCurrentOrientationType()` メソッドを再利用することができます。

以下のメソッドを `ScreenOrientationPlugin` クラスに追加してください:

```swift
override public func load() {
  NotificationCenter.default.addObserver(
    self,
    selector: #selector(self.orientationDidChange),
    name: UIDevice.orientationDidChangeNotification,
    object: nil)
  if let viewController = (self.bridge?.viewController as? CAPBridgeViewController) {
    implementation.setCapacitorViewController(viewController)
  }
}

deinit {
  NotificationCenter.default.removeObserver(self)
}

@objc private func orientationDidChange() {
  // Ignore changes in orientation if unknown, face up, or face down
  if UIDevice.current.orientation.isValidInterfaceOrientation {
    let orientation = implementation.getCurrentOrientationType()
    notifyListeners("screenOrientationChange", data: ["type": orientation])
  }
}
```

iOS は 3 次元の方向の変化を検出します。コードのコメントにあるように、横向きや縦向きを参照しない方向への変更は、リスナーへの通知を無視することにします。

## 画面の向きをロックする、ロックを解除する

画面の向きをロックするのは、Capacitorビューコントローラに対してのみ機能し、他のビューコントローラ（ブラウザプラグインによって提示されるものなど）に対しては機能しません。
提示されたビューコントローラーもロックするには、このコードをアプリの `AppDelegate.swift` ファイルに追加します：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

この関数は `ScreenOrientationPlugin.supportedOrientations` を返すことに注意してください。このプロパティはまだ存在しないので、プライベートな静的クラスメンバーとして `ScreenOrientationPlugin` クラスに追加してあげましょう。

```swift
public static var supportedOrientations = UIInterfaceOrientationMask.all
```

上記のコードを設定することで、iOS に `ScreenOrientationPlugin.supportedOrientations` の値で定義されたオリエンテーションのみをサポートしたいことを伝えています。想像通りだと思いますが、`UIInterfaceOrientationMask.all` の列挙値はすべてのオリエンテーションをサポートします。画面の向きを固定するコードを書くときには、より限定的な列挙値を選択することになります。

OrientationType を対応する UIInterfaceOrientationMask の列挙値にマップする関数が必要になるでしょう。以下のメソッドを `ScreenOrientation` クラスに追加してください:

```swift
private func fromOrientationTypeToMask(_ orientationType: String) -> UIInterfaceOrientationMask {
  switch orientationType {
  case "landscape-primary":
    return UIInterfaceOrientationMask.landscapeLeft
  case "landscape-secondary":
    return UIInterfaceOrientationMask.landscapeRight
  case "portrait-secondary":
    return UIInterfaceOrientationMask.portraitUpsideDown
  default:
    // Case: portrait-primary
    return UIInterfaceOrientationMask.portrait
  }
}
```

将来的には、 OrientationType を `Int` にマップするメソッドも必要になるので、それを `ScreenOrientation` クラスに追加します。

```swift
private func fromOrientationTypeToInt(_ orientationType: String) -> Int {
  switch orientationType {
  case "landscape-primary":
    return UIInterfaceOrientation.landscapeLeft.rawValue
  case "landscape-secondary":
    return UIInterfaceOrientation.landscapeRight.rawValue
  case "portrait-secondary":
    return UIInterfaceOrientation.portraitUpsideDown.rawValue
  default:
    // Case: portrait-primary
    return UIInterfaceOrientation.portrait.rawValue
  }
}
```

これですべての設定が終わったので、`lock()` メソッドを実装することができます。以下のメソッドを `ScreenOrientation` クラスに追加してください。:

```swift
public func lock(_ orientationType: String, completion: @escaping (Error?) -> Void) {
  DispatchQueue.main.async {
    let orientation = self.fromOrientationTypeToInt(orientationType)
    self.capViewController?.supportedOrientations = [orientation]
    let mask = self.fromOrientationTypeToMask(orientationType)
    if #available(iOS 16.0, *) {
      if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
        windowScene.keyWindow?.rootViewController?.setNeedsUpdateOfSupportedInterfaceOrientations()
        windowScene.requestGeometryUpdate(.iOS(interfaceOrientations: mask)) { error in
          completion(error)
        }
      } else {
        completion(ScreenOrientationError.noWindowScene)
      }
    } else {
      UIDevice.current.setValue(orientation, forKey: "orientation")
      UINavigationController.attemptRotationToDeviceOrientation()
    }
    completion(nil)
  }
}
```

このメソッドは複雑なので、本質的な部分を説明しましょう:

1. `completion: @escaping (Error?) -> Void` このメソッドの呼び出し元に、メソッドの実行が終了したときに呼び出される関数を提供しなければならないことを伝えます。
2.  iOS 16以降では、まず`UIApplication.shared.connectedScenes.first`でウィンドウシーンの取得を試みます。次にルートビューコントローラーで `setNeedsUpdateOfSupportedInterfaceOrientations` を呼び出します。最後に、`requestGeometryUpdate`を呼び出して、希望の方向を指定します。
3. iOS 15以前では、`UIDevice.current.setValue(orientation, forKey: 「orientation」)`はデバイスの画面の向きを設定しますが、画面を回転させません。すると `UINavigationController.attemptRotationToDeviceOrientation()` は前のコードで設定した画面の向きにアプリケーションを回転させようとします。
4. UIスレッドがブロックされるのを防ぐために、このコードを`DispatchQueue.main.async`でラップしています。

This method needs to get called from the `ScreenOrientationPlugin` class:

```swift
@objc public func lock(_ call: CAPPluginCall) {
  guard let lockToOrientation = call.getString("orientation") else {
    call.reject("Input option 'orientation' must be provided.")
    return
  }
  implementation.lock(lockToOrientation) { error in
    if let error = error {
      call.reject(error.localizedDescription)
    }
    call.resolve()
  }
}
```

`lock()` メソッドは、入力パラメータ `orientation` なしで呼び出されることを防ぐためのガードも導入しています。プラグインメソッドに必要な入力パラメータがない場合は、その呼び出しを拒否するのがベストプラクティスです。

画面の向きをロックしないようにするには、ロックしたときの手順を元に戻します。以下のメソッドを `ScreenOrientation` クラスに追加してください。

```swift
public func unlock(completion: @escaping (Error?) -> Void) {
  DispatchQueue.main.async {
    self.capViewController?.supportedOrientations = self.supportedOrientations
    if #available(iOS 16.0, *) {
      if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
        windowScene.keyWindow?.rootViewController?.setNeedsUpdateOfSupportedInterfaceOrientations()
        windowScene.requestGeometryUpdate(.iOS(interfaceOrientations: .all)) { error in
          completion(error)
        }
      } else {
        completion(ScreenOrientationError.noWindowScene)
      }
    } else {
      UINavigationController.attemptRotationToDeviceOrientation()
    }
    completion(nil)
  }
}
```

`ScreenOrientationPlugin`クラスでは、実装の`unlock`メソッドを呼び出して解決します：

```swift
@objc public func unlock(_ call: CAPPluginCall) {
  implementation.unlock { error in
    if let error = error {
      call.reject(error.localizedDescription)
    }
    call.resolve()
  }
}
```

## テストドライブをしよう！

Xcode で、デバイスまたはシミュレータのいずれかでアプリを実行します。プラグインは意図したとおりに機能します! "Rotate My Device" ボタンを押すと、画面の向きが横向きに回転し、さらに回転させると、画面の向きがロックされていることが分かります。 "Confirm Signature "を押すと、画面の向きがロック解除されます。

次のチュートリアルでは、Android の実装を行います。
