---
title: Capacitor's JavaScript API
description: Capacitor's JavaScript API
slug: /basics/utilities
sidebar_label: JavaScript API
---

# CapacitorのJavaScript API

Capacitorは、同じコードベースで複数のプラットフォームでアプリが正常に動作するように、いくつかのJavaScript関数を用意しています。

## グローバルなCapacitorオブジェクト

以下のコードでグローバルなCapacitorオブジェクトをインポートすることができます。

```typescript
インポート { Capacitor } from '@capacitor/core';
```

Capacitor` オブジェクトには、Capacitor アプリの開発で直面する可能性のある WebView to Native の最も一般的な問題を解決するための関数がいくつかあります。

### Capacitor.convertFileSrc

`convertFileSrc: (filePath: string) => string;` （ファイルパス：文字列）。

デバイスのファイルパスをWeb Viewに適したパスに変換します。

Capacitorアプリはデバイスファイルとは異なるプロトコルで提供されます。これらのプロトコル間の困難を避けるため、デバイスファイルへのパスは書き換える必要があります。例えば、Android では `file:///path/to/device/file` を `http://localhost/_capacitor_file_/path/to/device/file` に書き換えてから Web View で使用する必要があります。

```typescript
// file:///path/to/device/photo.jpg
const rawPhotoUri = await Filesystem.writeFile({
  path: "myFile.jpg",
  data: base64Data,
  directory: FilesystemDirectory.Data
});

// http://localhost/path/to/device/photo.jpg
const fixedPhotoUri = Capacitor.convertFileSrc(rawPhotoUri.uri),
```

### Capacitor.getPlatform

`getPlatform: () => 'web' | 'ios' | 'android';`

アプリが現在動作しているPlatformの名前を取得します。アプリが動作しているデバイスに応じて `"web"`, `"ios"`, または `"android"` という値が返されます。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  console.log('iOS!');
} else if (Capacitor.getPlatform() === 'android') {
  console.log('Android!');
} else {
  console.log('Web!');
}
```

### Capacitor.isNativePlatform

`isNativePlatform: () => boolean;`

現在稼働しているプラットフォームがネイティブであるかどうかを確認します。この関数は、アプリがネイティブでインストールされたCapacitorアプリとして実行されている場合は `true` を、ブラウザ経由で提供されている場合やPWAとしてインストールされている場合は `false` の値を返します。

```typescript
if (Capacitor.isNativePlatform()) {
  console.log("I'm a native app!");
} else {
  console.log("I'm a PWA or Web app!");
}
```

### Capacitor.isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

現在実行中のプラットフォームでプラグインが利用可能かどうかをチェックします。プラグイン名はプラグインレジストリで使用されるため、カスタムプラグインでも動作します。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // Have the user upload a file instead
} else {
  // Otherwise, make the call:
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```
