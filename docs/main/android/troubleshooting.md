---
title: Androidのトラブルシューティング
sidebar_label: トラブルシューティング
description: Androidのトラブルシューティング
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# Android の問題のトラブルシューティング

100％完璧な Native 管理ツールを作成するのはほぼ不可能です。遅かれ早かれ、Android ワークフローの一部でさまざまな問題に遭遇するでしょう。

このガイドでは、考えられる解決策とともに一般的な Android の問題を文書化することを試みます。

## Android Toolbox

Android 開発者は、Android の問題をデバッグするためのいくつかの一般的なテクニックを学びます。

### Google, Google, Google

Android、Gradle、エミュレータなどで問題が発生した場合、最初にすべきことは、そのエラーをコピーして Google 検索にペーストすることです。

Capacitor は標準的な Android ツールキットを使用していますので、何か問題が発生した場合、多くの Android 開発者も同様に問題を抱えており、解決策が存在する可能性があります。

依存関係の更新、Gradle sync の実行、キャッシュの無効化などの簡単な方法があります。

## Gradle Sync

npm から新しいプラグインをインストールしたのに、Android のビルドでプラグインが使えない、または表示されない場合は、Android Studio の右上にある「Sync Project with Gradle Files」ボタン（アイコンは象の形をしています）を使ってみてください。これにより、Android のネイティブコードが新しいプラグインのコードを含むように再同期され、新しいプラグインを使用できるようになります。詳細については、 [this issue on Github](https://github.com/ionic-team/capacitor/issues/4012) をご覧ください。

他にも様々な問題に対応できるので、Android のビルドで問題が発生した際には、"Sync Project with Gradle Files "を実行することをお勧めします。

### クリーン/リビルド

クリーンとリビルドを行うことで、多くのビルド問題を解決することができます。

![Android Clean and Build](../../../static/img/v6/docs/android/clean-rebuild.png)

### キャッシュの無効化/再起動

問題を解決した自信があっても、Android Studio や Gradle が納得しない場合、多くの場合、Android Studio のキャッシュを無効にしてプログラムを再起動することで解決します。

これは File メニューから簡単に行うことができます:

![Android Invalidate Caches](../../../static/img/v6/docs/android/invalidate-caches.png)

## Error: "package android.support.\* does not exist"

このエラーは、Cordova や Capacitor のプラグインが、新しい AndroidX に相当するものではなく、古い android support の依存関係を使用している場合に発生します。
この問題をプラグインのリポジトリに報告することで、メンテナが AndroidX の依存性を使用するようプラグインを更新することができます。

回避策として、jetifier を使ってプラグインにパッチを当てることもできます。

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## Error: "Please select Android SDK"

このエラーは、多くの場合、Gradle の同期が必要なことが原因です。
これは、依存関係を更新したり、プロジェクトの設定を変更した後に定期的に行う必要があります。

Gradle を手動で同期するには、メインメニューバーから「File」→「Sync Project with Gradle Files」を開きます:

![Sync Gradle](../../../static/img/v6/docs/android/sync-gradle.png)

## Error: "APK Can't be installed"

APK がエミュレータやデバイスにインストールできないのは、同じパッケージ名の既存のアプリがあることが原因の場合が多いです。アプリを実行しようとすると、次のようなエラーが表示されることがあります:

![Android APK Failed](../../../static/img/v6/docs/android/apk-failed.png)

解決策としては、古いアプリを削除し、パッケージ名が `AndroidManifest.xml` で最新のものになっていて、開発中の他のアプリと競合していないことを確認します。

最後に、念のため、クリーンアップとリビルドを行います。

## Error: "Unable to locate a Java Runtime"

このエラーは、環境変数 `JAVA_HOME` が設定されていない場合に `run` コマンドを使用すると発生する可能性があります。

解決するには、Android StudioのPreferences > Build, Execution, Deployment, Build Tools > Gradle > Gradle JDKにあるパスを用いて、環境変数またはシステム変数として `JAVA_HOME` を設定します。

![JDK Path in Android Studio](../../../static/img/v6/docs/android/jdk-path.png)

Macの場合は、`.zshrc` または `.bashrc` ファイルで更新するか、環境にエクスポートします。

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

Windowsの場合、環境変数の設定で、`JAVA_HOME` をシステム変数として設定することができます。

## プロジェクトの再構築

Capacitor では、自分の Android プロジェクトを管理することができます。IDE で管理されているプロジェクトと同様に、時には同期が取れなくなることもあり、その場合はプロジェクトを再構築するしかありません。

これを行うには、以下の手順に従います。

1. 作成したソースコード（`app/android/src`にある Java ファイル、マニフェストファイル、リソースファイルなど）を`app/android`以外の安全な場所にコピーします。
2. 続いて、Capacitor CLI を最新のバージョンにアップデートします: `npm install @capacitor/cli@latest`
3. android ディレクトリを削除します：`rm -rf android/`。
4. Capacitor からアンドロイドアプリを再作成します：`npx cap add android`。
5. 保存したソースファイルをプロジェクトにコピーして戻す

## Plugin Not Implemented

On Android, this can happen if Capacitor doesn't find the plugins or can't inject its code into the WebView.

First of all, make sure the plugin is installed and appears in the `package.json`.

Then, run `npx cap sync android`.

Finally, use the "Sync Project with Gradle Files" button in the top right of Android Studio (the icon looks like an elephant). This will re-sync your native Android code to include the new plugin code and should allow use of your new plugin.

Also, if you are migrating from Capacitor 1 or 2, make sure you enabled the [automatic plugin loading](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading).

If still getting the "Plugin not implemented" error, make sure you are not using service workers, that prevents Capacitor's and Plugins code from injecting. Or if you want to use them, you can use [this workaround](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390) for making the injection work.

## Using Proguard

ProGuard is a tool used to shrink, obfuscate, and reduce the size of your app. It is enabled by setting the `minifyEnabled` option in `build.gradle` to `true`. This process can sometimes lead to issues in Capacitor when using a plugin or some custom native code that relies on its code being being readable at run time, such as code reflection. ProGuard scans code to try and optimize and shink the size of an app and sometimes this process can remove classes or methods that are important for the functionality of a plugin.

As of Capacitor v3.2.3 there are ProGuard rules included in Capacitor that cover the core functionality of Capacitor plugins, permissions, and activity results. If you are using an earlier version of Capacitor than v3.2.3, add [the following rules](https://github.com/ionic-team/capacitor/blob/main/android/capacitor/proguard-rules.pro) to your Android project's `proguard-rules.pro` file. Those rules should resolve problems with any of the core Capacitor features and core plugins.

If you still encounter any issues after adding those rules, try to identify the source plugin or native code and add a rule to cover the specific plugin code, for example:

```
-keep class com.mythirdpartyplugin.** { *; }
```

If you are certain a Capacitor plugin is causing the ProGuard issue the following ProGuard rule will cover any plugin class code, if you don't mind all plugins being exempt from ProGuard processing:

```
-keep public class * extends com.getcapacitor.Plugin
```
