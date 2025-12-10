---
title: Swift Package Manager
description: SPMの基本
contributors:
  - giralte-ionic
  - markemer
slug: /ios/spm
---

# Swift Package Manager

Swift Packagesは、ソフトウェアの依存関係のためのAppleの新しいファーストパーティツールです。従来、Capacitorは内部およびプラグインの依存関係を管理するためにCocoaPodsを使用していましたが、今こそサポートされたソリューションに移行する時です。

Capacitor 6では、CocoapodsまたはSwift Package Manager（SPM）のどちらかを選択できるようになりました。現在のほとんどのcapacitor-teamサポートプラグインはSPMをサポートしており、特に<a href="https://github.com/ionic-team/capacitor-plugins">capacitor-plugins</a>のプラグインが該当します。

SPMを使用するためにCapacitorの作業方法を大きく変更する必要がないように最善を尽くしましたが、いくつか理解しておくべきことがあります。

## 仕組み

CapacitorプロジェクトがSPMを使用している場合、プロジェクトのすべての依存関係を参照する場所として機能する「ベースSPM」パッケージを使用します：

![Base SPM Picture](../../../static/img/v6/docs/ios/spm/base-spm.png)

Capacitor CLIは、新しいプラグインを同期するときにCapApp-SPMパッケージを変更します。ここに含まれる内容には触れないようにすることが重要です。CLIは変更を加える可能性があります。

## 新しいCapacitorプロジェクトでSPMを使用する

まず、通常の`npm init @capacitor/app@latest`から始めます。

![Demo Step 1](../../../static/img/v6/docs/ios/spm/demo-step1.png)

次に、プロジェクトにiOSプラットフォームを追加します：

`npm install @capacitor/ios`

次に、ウェブプロジェクトをビルドします。

`npm run build`

完了したら、iOSプロジェクトを追加します。通常の追加コマンドに`--packagemanager SPM`オプションを追加する必要があります。

`npx cap add ios --packagemanager SPM`

これで、`npx cap open ios`を使用してiOSプロジェクトを開き、そこからアプリを実行できます。

---

### SPMを使用してCapacitorプラグインを追加および使用する

このプロジェクトにプラグインを追加し、そのプラグインを使用してみましょう。

まず、Capacitor Appプラグインをインストールします。

`npm install @capacitor/app`

次に、ウェブアプリを同期します。これにより、AppプラグインSPMがiOSプロジェクトに追加されます。

`npx cap sync`

これでAppプラグインを通常通り使用できます。

## 既存のCapacitorプロジェクトでSPMを使用する

まず、ソース管理または他の場所でプロジェクトの現在の状態のバックアップがあることを確認してください。

### iOSディレクトリの削除

**Xcodeプロジェクトをまったく手動で変更していない**場合、移行するための1つのオプションは`ios`ディレクトリを削除してから`npx cap add ios --packagemanager SPM`を実行することです。これによりCocoaPodsテンプレートプロジェクトが削除され、SPMテンプレートプロジェクトに置き換えられます。

### 移行ツールの使用

Capacitor CLIには、CocoaPodsからSwift Package Managerへの移行を支援するコマンドがあります。ただし、2つの手動ステップがまだ必要です。注意すべき点として：Cordovaプラグインを使用するプロジェクトは動作するはずですが、`Package.swift`ファイルを生成する必要があるため、一部のプラグインは正しく動作しない場合があります。また、SPMバージョンが利用できないCapacitorプラグインを使用するプロジェクトは、正しく動作せず、移行中および`npx cap sync`の実行時に互換性のないプラグインについての警告が表示されます。

開始するには、プロジェクトのルートで`npx cap spm-migration-assistant`を実行します。

このツールは以下を行います：
  - `pod deintegrate`を実行してCocoaPodsを削除
  - `Podfile`、`App.xcworkspace`、`Podfile.lock`を削除
  - 必要なファイルを含む`CapApp-SPM`ディレクトリを作成
  - プラグインから`Package.swift`を生成し、含められないものがあれば警告
  - iOSプロジェクトディレクトリに`debug.xcconfig`を追加

次に`npx cap open ios`を実行すると、以下のような画面が表示されるはずです：

![移行ステップ1](../../../static/img/spm/xcode-step-1.png)

Appをハイライトし、Package Dependenciesタブを選択し、このページで+記号を押して依存関係を追加します：

![移行ステップ2](../../../static/img/spm/xcode-step-2.png)

以下のような画面が表示されるはずです - ダイアログからAdd Local...を選択します：

![移行ステップ3](../../../static/img/spm/xcode-step-3.png)

このダイアログでCapApp-SPMを選択し、Add Packageをクリックします：

![移行ステップ4](../../../static/img/spm/xcode-step-4.png)

この画面が表示されたらAdd Packageを再度クリックします：

![移行ステップ5](../../../static/img/spm/xcode-step-5.png)

完了すると、このような画面が表示されるはずです。次に、`debug.xconfig`の追加に関する次のセクションに進みます

![移行ステップ6](../../../static/img/spm/xcode-step-6.png)

#### debug.xcconfigをプロジェクトに追加

アプリ情報タブから、Add Configuration file...を選択します

![XCConfigステップ1](../../../static/img/spm/xcconfig-step1.png)

次に`debug.xcconfig`というファイルを選択します

![XCConfigステップ2](../../../static/img/spm/xcconfig-step2.png)

最後にxcconfigを選択します

![XCConfigステップ3](../../../static/img/spm/xcconfig-step3.png)

この時点で完了であり、通常通りビルドして作業できます。

### 既存のプラグインをSPMに変換する

プラグインに必要な`[Name]Plugin.m`と`[Name]Plugin.h`以外のSwiftのみが含まれている場合、[capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter)を使用できます。

このツールは以下の変更を行います：

- メインのSwiftプラグインファイル`[Name]Plugin.swift`に以下の必要なものを追加：
  - クラスに`CAPBridgedPlugin`プロトコルへの準拠を追加
  - クラスに3つの変数を追加：`identifier`、`jsName`、`pluginMethods`：
    - `identifier`は`CAP_PLUGIN`マクロの最初の引数に対応
    - `jsName`は`CAP_PLUGIN`マクロの2番目の引数に対応
    - `pluginMethods`は`CAP_PLUGIN`マクロに渡されたメソッドの配列
- プラグインフォルダのルートに`Package.swift`ファイルが作成されます
- 以下のファイルは不要になったため削除されます：
  - `Plugin.xcodeproj`
  - `Plugin.xcworkspace`
  - `Plugin/Info.plist`
  - `PluginTests/Info.plist`
  - `Podfile`
- SPMのベストプラクティスに合わせて、プロジェクトファイルは`Sources`と`Tests`ディレクトリに移動されます
- プラグインの`package.json`には以下の変更が加えられます：
  - filesArrayにこれらのファイルまたはディレクトリが追加されます：
    - `ios/Sources`
    - `ios/Tests`
    - `Package.swift`
  - `verify:ios`は、期待通りに動作し続けるように`xcodebuild -scheme YourPluginName -destination generic/platform=iOS`に変更されます
- プラグインのpodspecは、`s.source_files`が`Plugin`ディレクトリではなく`Sources`ディレクトリを指すように変更されます


詳細については、[capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter)のリポジトリのドキュメントを参照してください。

### トラブルシューティング

プラグインを追加した後、Xcodeで「パッケージキャッシュをリセット」してみてください。

![Demo Step 1](../../../static/img/v6/docs/ios/spm/reset-package.png)
