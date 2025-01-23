---
title: CAPBridgeViewController のサブクラス化
sidebar_label: カスタムViewController
description: CAPBridgeViewController のサブクラス化の方法
contributors:
  - ikeith
slug: /ios/viewcontroller
---

# カスタム ViewController

Capacitor 3.0 では、アプリケーション内で `CAPBridgeViewController` をサブクラス化できるようになりました。ほとんどのアプリケーションはこの機能を必要としませんが、いくつかの特殊なユースケースに対応するためのメカニズムがサポートされています。

## サブクラスを作成する場合

サブクラス化が必要になる例としては、実行時にCapacitorの設定値をオーバーライドしたり、[`WKWebViewConfiguration`](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration)のプロパティをしたり、[`WKWebView`](https://developer.apple. com/documentation/webkit/wkwebview))を使用したり、[`viewDidLoad()`](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621495-viewdidload)にコードを追加することを提案するサードパーティSDKを統合する、画面に表示される前にネイティブビューを操作する、または [カスタムプラグインを登録する](../ios/custom-code.md) 場合があります。

カスタムサブクラスを作成する必要がある場合は、いくつかの手順があります。

### `MyViewController.swift` を作成する

まず、[Xcodeを開いて](/main/ios/index.md#opening-the-ios-project)、**App**グループ（**App**ターゲットの下）を右クリックし、コンテキストメニューから**New File...**を選択し、ウィンドウで**Cocoa Touch Class**を選択し、次の画面で**Subclass of:**を`UIViewController`に設定し、ファイルを保存します。

![New ViewController in Xcode](../../../static/img/v6/docs/ios/xcode-create-viewcontroller.png)
![Name ViewController in Xcode](../../../static/img/v6/docs/ios/xcode-name-viewcontroller.png)

### `Main.storyboard` を編集する

次に、プロジェクトナビゲータで`Main.storyboard`ファイルを選択し、**Bridge View Controller**シーンの**Bridge View Controller**を選択し、右側の**Identity Inspector**を選択し、カスタムクラスの名前を`MyViewController`に変更します。

![Editing Storyboard in Xcode](../../../static/img/v6/docs/ios/xcode-edit-storyboard.png)

### `MyViewController.swift` を編集する

最後に、プロジェクトナビゲータで`MyViewController.swift`ファイルを選択し、Capacitorをインポートし、親クラスを変更します。

```swift
import UIKit
import Capacitor

class MyViewController: CAPBridgeViewController {
    // additional code
}
```

これで完了です！

### 次のステップ

Xcodeはファイルを生成したときに`viewDidLoad()`メソッドを既に作成しているはずですが、[`CAPBridgeViewController`](https://github.com/ionic-team/capacitor/blob/main/ios/Capacitor/Capacitor/CAPBridgeViewController.swift)のインラインドキュメントを確認して、必要なCapacitor固有のメソッドを見つけてください。`open`とマークされているものは、サブクラスがオーバーライドするために明示的に公開されています。
