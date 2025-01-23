---
title: Swift Package Manager
description: SPMの基本
contributors:
  - giralte-ionic
slug: /ios/spm
---

# Swift Package Manager

Swift Packagesは、Appleの新しいファーストパーティツールで、ソフトウェア依存関係を管理します。従来、Capacitorは内部およびプラグインの依存関係を管理するためにCocoapodsを使用していましたが、今こそサポートされているソリューションに移行する時です。

Capacitor 6では、CocoapodsまたはSwift Package Manager（SPM）のどちらかを選択できるようになりました。現在のほとんどのcapacitor-teamサポートプラグインはSPMをサポートしており、特に<a href="https://github.com/ionic-team/capacitor-plugins">capacitor-plugins</a>のプラグインが該当します。

SPMを使用するためにCapacitorの作業方法を大きく変更する必要がないように最善を尽くしましたが、いくつか理解しておくべきことがあります。

### 仕組み

CapacitorプロジェクトがSPMを使用している場合、すべてのプロジェクト依存関係を参照する場所として「Base SPM」パッケージを使用します。

![Base SPM Picture](../../../static/img/v6/docs/ios/spm/base-spm.png)

Capacitor CLIは、新しいプラグインを同期するときにCapAPP-SPMパッケージを変更します。ここに含まれる内容には触れないようにすることが重要です。CLIは変更を加える可能性があります。

### 新しいCapacitorプロジェクトでSPMを使用する

まず、通常の`npm init @capacitor/app`から始めます。

![Demo Step 1](../../../static/img/v6/docs/ios/spm/demo-step1.png)

次に、iOSプラットフォームをプロジェクトに追加します。

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

You can now use the App plugin normally.

<em>More details coming soon</em>

### Converting existing plugins to SPM

More details soon, but check this repository out: https://github.com/ionic-team/capacitor-plugin-converter


### トラブルシューティング

プラグインを追加した後、Xcodeで「パッケージキャッシュをリセット」してみてください。

![Demo Step 1](../../../static/img/v6/docs/ios/spm/reset-package.png)
