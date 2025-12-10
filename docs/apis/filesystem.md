---
title: Filesystem Capacitor Plugin API
description: ファイルシステムAPIは、デバイス上のファイルを操作するためのNodeJSライクなAPIを提供します。
custom_edit_url: https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Filesystem
---

# @capacitor/filesystem

ファイルシステムAPIは、デバイス上のファイルを操作するためのNodeJSライクなAPIを提供します。

## Install

```bash
npm install @capacitor/filesystem
npx cap sync
```

## Apple プライバシーマニフェストの要件

Appleは、ユーザーのプライバシーを向上させるために、アプリ開発者がAPI使用の承認された理由を指定することを義務付けています。2024年5月1日までに、App Store Connectにアプリを提出する際にこれらの理由を含める必要があります。

このプラグインをアプリで使用する場合、`/ios/App`に`PrivacyInfo.xcprivacy`ファイルを作成するか、VS Code拡張機能を使用して生成し、使用理由を指定する必要があります。

詳細な手順については、[Capacitorドキュメント](https://capacitorjs.com/docs/ios/privacy-manifest)を参照してください。

**このプラグインで必要な辞書キーは[NSPrivacyAccessedAPICategoryFileTimestamp](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)で、推奨される理由は[C617.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)です。**

### PrivacyInfo.xcprivacyの例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- Add this dict entry to the array if the PrivacyInfo file already exists -->
      <dict>
        <key>NSPrivacyAccessedAPIType</key>
        <string>NSPrivacyAccessedAPICategoryFileTimestamp</string>
        <key>NSPrivacyAccessedAPITypeReasons</key>
        <array>
          <string>C617.1</string>
        </array>
      </dict>
    </array>
  </dict>
</plist>
```

## downloadFileからFile Transferプラグインへの移行

バージョン7.1.0以降、Filesystemプラグインの`downloadFile`機能は非推奨となり、新しい[@capacitor/file-transfer](https://capacitorjs.com/docs/apis/file-transfer)プラグインの使用が推奨されています。

### File Transferプラグインのインストール

```bash
npm install @capacitor/file-transfer
npx cap sync
```

### 移行の例

変更前（Filesystemプラグインを使用）：

```typescript
import { Filesystem, Directory } from '@capacitor/filesystem';

await Filesystem.downloadFile({
  url: 'https://example.com/file.pdf',
  path: 'downloaded-file.pdf',
  directory: Directory.Documents,
  progress: true
});

// Progress events
Filesystem.addListener('progress', (progress) => {
  console.log(`Downloaded ${progress.bytes} of ${progress.contentLength}`);
});
```

変更後（File Transferプラグインを使用）：

```typescript
import { FileTransfer } from '@capacitor/file-transfer';
import { Filesystem, Directory } from '@capacitor/filesystem';

// First get the full file path using Filesystem
const fileInfo = await Filesystem.getUri({
  directory: Directory.Documents,
  path: 'downloaded-file.pdf'
});

// Then use the FileTransfer plugin to download
await FileTransfer.downloadFile({
  url: 'https://example.com/file.pdf',
  path: fileInfo.uri,
  progress: true
});

// Progress events
FileTransfer.addListener('progress', (progress) => {
  console.log(`Downloaded ${progress.bytes} of ${progress.contentLength}`);
});
```

File Transferプラグインは、信頼性の向上、特定のエラーコードによるエラーハンドリングの改善に加え、アップロード機能も追加されています。

## iOS

ファイルアプリにファイルを表示させるには、`Info.plist`で以下のキーを`YES`に設定する必要があります：

- `UIFileSharingEnabled`（`Application supports iTunes file sharing`）
- `LSSupportsOpeningDocumentsInPlace`（`Supports opening documents in place`）

設定については[iOSの設定](https://capacitorjs.com/docs/ios/configuration)を参照してください。

## Android

<a href="#directory">`Directory.Documents`</a>または<a href="#directory">`Directory.ExternalStorage`</a>を使用する場合、Android 10以前では、このAPIには以下のパーミッションを`AndroidManifest.xml`に追加する必要があります：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

Androidパーミッションの設定の詳細については、[Androidガイド](https://capacitorjs.com/docs/android)の[パーミッションの設定](https://capacitorjs.com/docs/android/configuration#setting-permissions)を参照してください。

<a href="#directory">`Directory.ExternalStorage`</a>はAndroid 9以前でのみ利用可能で、<a href="#directory">`Directory.Documents`</a>はAndroid 11以降ではアプリが作成したファイル/フォルダにのみアクセスできます。

大きなファイルを扱う場合は、`AndroidManifest.xml`の`<application>`タグに`android:largeHeap="true"`を追加する必要があるかもしれません。

## ディレクトリとファイルの理解

iOSとAndroidには、クラウドにバックアップされる特別なディレクトリや、ドキュメントを保存するためのディレクトリなど、ファイル間に追加の分離層があります。Filesystem APIは、各操作をデバイス上の特定の特別なディレクトリにスコープする簡単な方法を提供します。

さらに、Filesystem APIは完全な`file://`パスの使用や、Androidでの`content://`ファイルの読み取りをサポートしています。完全なファイルパスを使用するには、`directory`パラメータを省略するだけです。

## Example

```typescript
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const writeSecretFile = async () => {
  await Filesystem.writeFile({
    path: "secrets/text.txt",
    data: "This is a test",
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
};

const readSecretFile = async () => {
  const contents = await Filesystem.readFile({
    path: "secrets/text.txt",
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });

  console.log("secrets:", contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: "secrets/text.txt",
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // Here's an example of reading a file with a full file path. Use this to
  // read binary data (base64 encoded) from plugins that return File URIs, such as
  // the Camera.
  const contents = await Filesystem.readFile({
    path: "file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt",
  });

  console.log("data:", contents);
};
```

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`readFile(...)`](#readfile)
* [`readFileInChunks(...)`](#readfileinchunks)
* [`writeFile(...)`](#writefile)
* [`appendFile(...)`](#appendfile)
* [`deleteFile(...)`](#deletefile)
* [`mkdir(...)`](#mkdir)
* [`rmdir(...)`](#rmdir)
* [`readdir(...)`](#readdir)
* [`getUri(...)`](#geturi)
* [`stat(...)`](#stat)
* [`rename(...)`](#rename)
* [`copy(...)`](#copy)
* [`downloadFile(...)`](#downloadfile)
* [`addListener('progress', ...)`](#addlistenerprogress-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

For list of existing error codes, see [Errors](#errors).

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check read/write permissions.
Required on Android, only when using <a href="#directory">`Directory.Documents`</a> or
`Directory.ExternalStorage`.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

Request read/write permissions.
Required on Android, only when using <a href="#directory">`Directory.Documents`</a> or
`Directory.ExternalStorage`.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### readFile(...)

```typescript
readFile(options: ReadFileOptions) => Promise<ReadFileResult>
```

Read a file from disk

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#readfileoptions">ReadFileOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### readFileInChunks(...)

```typescript
readFileInChunks(options: ReadFileInChunksOptions, callback: ReadFileInChunksCallback) => Promise<CallbackID>
```

Read a file from disk, in chunks.
Native only (not available in web).
Use the callback to receive each read chunk.
If empty chunk is returned, it means file has been completely read.

| Param          | Type                                                                          |
| -------------- | ----------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#readfileinchunksoptions">ReadFileInChunksOptions</a></code>   |
| **`callback`** | <code><a href="#readfileinchunkscallback">ReadFileInChunksCallback</a></code> |

**Returns:** <code>Promise&lt;string&gt;</code>

**Since:** 7.1.0

--------------------


### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

Write a file to disk in the specified location on device

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#writefileresult">WriteFileResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

Append to a file on disk in the specified location on device

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**Since:** 1.0.0

--------------------


### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

Delete a file from disk

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**Since:** 1.0.0

--------------------


### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

Create a directory.

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**Since:** 1.0.0

--------------------


### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

Remove a directory

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**Since:** 1.0.0

--------------------


### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

Return a list of files from the directory (not recursive)

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

Return full File URI for a path and directory

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

Return data about a file

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#fileinfo">FileInfo</a>&gt;</code>

**Since:** 1.0.0

--------------------


### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

Rename a file or directory

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**Since:** 1.0.0

--------------------


### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

Copy a file or directory

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

Perform a http request to a server and download the file to the specified destination.

This method has been deprecated since version 7.1.0.
We recommend using the @capacitor/file-transfer plugin instead, in conjunction with this plugin.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**Since:** 5.1.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: 'progress', listenerFunc: ProgressListener) => Promise<PluginListenerHandle>
```

Add a listener to file download progress events.

This method has been deprecated since version 7.1.0.
We recommend using the @capacitor/file-transfer plugin instead, in conjunction with this plugin.

| Param              | Type                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                       |
| **`listenerFunc`** | <code><a href="#progresslistener">ProgressListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 5.1.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Remove all listeners for this plugin.

This method has been deprecated since version 7.1.0.
We recommend using the @capacitor/file-transfer plugin instead, in conjunction with this plugin.

**Since:** 5.2.0

--------------------


### Interfaces


#### PermissionStatus

| Prop                | Type                                                        |
| ------------------- | ----------------------------------------------------------- |
| **`publicStorage`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### ReadFileResult

| Prop       | Type                        | Description                                                                                                                            | Since |
| ---------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`data`** | <code>string \| Blob</code> | The representation of the data contained in the file Note: Blob is only available on Web. On native, the data is returned as a string. | 1.0.0 |


#### ReadFileOptions

| Prop            | Type                                            | Description                                                                                                                                                                 | Since |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | The path of the file to read                                                                                                                                                | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | The <a href="#directory">`Directory`</a> to read the file from                                                                                                              | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | The encoding to read the file in, if not provided, data is read as binary and returned as base64 encoded. Pass <a href="#encoding">Encoding.UTF8</a> to read data as string | 1.0.0 |


#### ReadFileInChunksOptions

| Prop            | Type                | Description                  | Since |
| --------------- | ------------------- | ---------------------------- | ----- |
| **`chunkSize`** | <code>number</code> | Size of the chunks in bytes. | 7.1.0 |


#### WriteFileResult

| Prop      | Type                | Description                             | Since |
| --------- | ------------------- | --------------------------------------- | ----- |
| **`uri`** | <code>string</code> | The uri where the file was written into | 1.0.0 |


#### WriteFileOptions

| Prop            | Type                                            | Description                                                                                                                                               | Default            | Since |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**      | <code>string</code>                             | The path of the file to write                                                                                                                             |                    | 1.0.0 |
| **`data`**      | <code>string \| Blob</code>                     | The data to write Note: Blob data is only supported on Web.                                                                                               |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | The <a href="#directory">`Directory`</a> to store the file in                                                                                             |                    | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | The encoding to write the file in. If not provided, data is written as base64 encoded. Pass <a href="#encoding">Encoding.UTF8</a> to write data as string |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | Whether to create any missing parent directories.                                                                                                         | <code>false</code> | 1.0.0 |


#### AppendFileOptions

| Prop            | Type                                            | Description                                                                                                                                               | Since |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | The path of the file to append                                                                                                                            | 1.0.0 |
| **`data`**      | <code>string</code>                             | The data to write                                                                                                                                         | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | The <a href="#directory">`Directory`</a> to store the file in                                                                                             | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | The encoding to write the file in. If not provided, data is written as base64 encoded. Pass <a href="#encoding">Encoding.UTF8</a> to write data as string | 1.0.0 |


#### DeleteFileOptions

| Prop            | Type                                            | Description                                                      | Since |
| --------------- | ----------------------------------------------- | ---------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | The path of the file to delete                                   | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | The <a href="#directory">`Directory`</a> to delete the file from | 1.0.0 |


#### MkdirOptions

| Prop            | Type                                            | Description                                                           | Default            | Since |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**      | <code>string</code>                             | The path of the new directory                                         |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | The <a href="#directory">`Directory`</a> to make the new directory in |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | Whether to create any missing parent directories as well.             | <code>false</code> | 1.0.0 |


#### RmdirOptions

| Prop            | Type                                            | Description                                                           | Default            | Since |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**      | <code>string</code>                             | The path of the directory to remove                                   |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | The <a href="#directory">`Directory`</a> to remove the directory from |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | Whether to recursively remove the contents of the directory           | <code>false</code> | 1.0.0 |


#### ReaddirResult

| Prop        | Type                    | Description                                        | Since |
| ----------- | ----------------------- | -------------------------------------------------- | ----- |
| **`files`** | <code>FileInfo[]</code> | List of files and directories inside the directory | 1.0.0 |


#### FileInfo

| Prop        | Type                               | Description                                                                          | Since |
| ----------- | ---------------------------------- | ------------------------------------------------------------------------------------ | ----- |
| **`name`**  | <code>string</code>                | Name of the file or directory.                                                       | 7.1.0 |
| **`type`**  | <code>'file' \| 'directory'</code> | Type of the file.                                                                    | 4.0.0 |
| **`size`**  | <code>number</code>                | Size of the file in bytes.                                                           | 4.0.0 |
| **`ctime`** | <code>number</code>                | Time of creation in milliseconds. It's not available on Android 7 and older devices. | 7.1.0 |
| **`mtime`** | <code>number</code>                | Time of last modification in milliseconds.                                           | 7.1.0 |
| **`uri`**   | <code>string</code>                | The uri of the file.                                                                 | 4.0.0 |


#### ReaddirOptions

| Prop            | Type                                            | Description                                                 | Since |
| --------------- | ----------------------------------------------- | ----------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | The path of the directory to read                           | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | The <a href="#directory">`Directory`</a> to list files from | 1.0.0 |


#### GetUriResult

| Prop      | Type                | Description         | Since |
| --------- | ------------------- | ------------------- | ----- |
| **`uri`** | <code>string</code> | The uri of the file | 1.0.0 |


#### GetUriOptions

| Prop            | Type                                            | Description                                                    | Since |
| --------------- | ----------------------------------------------- | -------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | The path of the file to get the URI for                        | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | The <a href="#directory">`Directory`</a> to get the file under | 1.0.0 |


#### StatOptions

| Prop            | Type                                            | Description                                                    | Since |
| --------------- | ----------------------------------------------- | -------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | The path of the file to get data about                         | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | The <a href="#directory">`Directory`</a> to get the file under | 1.0.0 |


#### CopyOptions

| Prop              | Type                                            | Description                                                                                                                                                  | Since |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`from`**        | <code>string</code>                             | The existing file or directory                                                                                                                               | 1.0.0 |
| **`to`**          | <code>string</code>                             | The destination file or directory                                                                                                                            | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | The <a href="#directory">`Directory`</a> containing the existing file or directory                                                                           | 1.0.0 |
| **`toDirectory`** | <code><a href="#directory">Directory</a></code> | The <a href="#directory">`Directory`</a> containing the destination file or directory. If not supplied will use the 'directory' parameter as the destination | 1.0.0 |


#### CopyResult

| Prop      | Type                | Description                            | Since |
| --------- | ------------------- | -------------------------------------- | ----- |
| **`uri`** | <code>string</code> | The uri where the file was copied into | 4.0.0 |


#### DownloadFileResult

| Prop       | Type                | Description                                                          | Since |
| ---------- | ------------------- | -------------------------------------------------------------------- | ----- |
| **`path`** | <code>string</code> | The path the file was downloaded to.                                 | 5.1.0 |
| **`blob`** | <code>Blob</code>   | The blob data of the downloaded file. This is only available on web. | 5.1.0 |


#### DownloadFileOptions

| Prop            | Type                                            | Description                                                                                                                                                                                                                      | Default            | Since |
| --------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**      | <code>string</code>                             | The path the downloaded file should be moved to.                                                                                                                                                                                 |                    | 5.1.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | The directory to write the file to. If this option is used, filePath can be a relative path rather than absolute. The default is the `DATA` directory.                                                                           |                    | 5.1.0 |
| **`progress`**  | <code>boolean</code>                            | An optional listener function to receive downloaded progress events. If this option is used, progress event should be dispatched on every chunk received. Chunks are throttled to every 100ms on Android/iOS to avoid slowdowns. |                    | 5.1.0 |
| **`recursive`** | <code>boolean</code>                            | Whether to create any missing parent directories.                                                                                                                                                                                | <code>false</code> | 5.1.2 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ProgressStatus

| Prop                | Type                | Description                                          | Since |
| ------------------- | ------------------- | ---------------------------------------------------- | ----- |
| **`url`**           | <code>string</code> | The url of the file being downloaded.                | 5.1.0 |
| **`bytes`**         | <code>number</code> | The number of bytes downloaded so far.               | 5.1.0 |
| **`contentLength`** | <code>number</code> | The total number of bytes to download for this file. | 5.1.0 |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### ReadFileInChunksCallback

Callback for receiving chunks read from a file, or error if something went wrong.

<code>(chunkRead: <a href="#readfileresult">ReadFileResult</a> | null, err?: any): void</code>


#### CallbackID

<code>string</code>


#### StatResult

<code><a href="#fileinfo">FileInfo</a></code>


#### RenameOptions

<code><a href="#copyoptions">CopyOptions</a></code>


#### ProgressListener

A listener function that receives progress events.

<code>(progress: <a href="#progressstatus">ProgressStatus</a>): void</code>


### Enums


#### Directory

| Members               | Value                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Since |
| --------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`Documents`**       | <code>'DOCUMENTS'</code>        | The Documents directory. On iOS it's the app's documents directory. Use this directory to store user-generated content. On Android it's the Public Documents folder, so it's accessible from other apps. It's not accessible on Android 10 unless the app enables legacy External Storage by adding `android:requestLegacyExternalStorage="true"` in the `application` tag in the `AndroidManifest.xml`. On Android 11 or newer the app can only access the files/folders the app created. | 1.0.0 |
| **`Data`**            | <code>'DATA'</code>             | The Data directory. On iOS it will use the Documents directory. On Android it's the directory holding application files. Files will be deleted when the application is uninstalled.                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`Library`**         | <code>'LIBRARY'</code>          | The Library directory. On iOS it will use the Library directory. On Android it's the directory holding application files. Files will be deleted when the application is uninstalled.                                                                                                                                                                                                                                                                                                       | 1.1.0 |
| **`Cache`**           | <code>'CACHE'</code>            | The Cache directory. Can be deleted in cases of low memory, so use this directory to write app-specific files. that your app can re-create easily.                                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`External`**        | <code>'EXTERNAL'</code>         | The external directory. On iOS it will use the Documents directory. On Android it's the directory on the primary shared/external storage device where the application can place persistent files it owns. These files are internal to the applications, and not typically visible to the user as media. Files will be deleted when the application is uninstalled.                                                                                                                         | 1.0.0 |
| **`ExternalStorage`** | <code>'EXTERNAL_STORAGE'</code> | The external storage directory. On iOS it will use the Documents directory. On Android it's the primary shared/external storage directory. It's not accessible on Android 10 unless the app enables legacy External Storage by adding `android:requestLegacyExternalStorage="true"` in the `application` tag in the `AndroidManifest.xml`. It's not accessible on Android 11 or newer.                                                                                                     | 1.0.0 |
| **`ExternalCache`**   | <code>'EXTERNAL_CACHE'</code>   | The external cache directory. On iOS it will use the Documents directory. On Android it's the primary shared/external cache.                                                                                                                                                                                                                                                                                                                                                               | 7.1.0 |
| **`LibraryNoCloud`**  | <code>'LIBRARY_NO_CLOUD'</code> | The Library directory without cloud backup. Used in iOS. On Android it's the directory holding application files.                                                                                                                                                                                                                                                                                                                                                                          | 7.1.0 |
| **`Temporary`**       | <code>'TEMPORARY'</code>        | A temporary directory for iOS. On Android it's the directory holding the application cache.                                                                                                                                                                                                                                                                                                                                                                                                | 7.1.0 |


#### Encoding

| Members     | Value                | Description                                                                                                                              | Since |
| ----------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`UTF8`**  | <code>'utf8'</code>  | Eight-bit UCS Transformation Format                                                                                                      | 1.0.0 |
| **`ASCII`** | <code>'ascii'</code> | Seven-bit ASCII, a.k.a. ISO646-US, a.k.a. the Basic Latin block of the Unicode character set This encoding is only supported on Android. | 1.0.0 |
| **`UTF16`** | <code>'utf16'</code> | Sixteen-bit UCS Transformation Format, byte order identified by an optional byte-order mark This encoding is only supported on Android.  | 1.0.0 |

</docgen-api>

### Errors

Since version 7.1.0, the plugin returns specific errors with specific codes on native Android and iOS. Web does not follow this standard for errors.

The following table list all the plugin errors:

| Error code        | Platform(s)      | Message                      |
|-------------------|------------------|------------------------------|
| OS-PLUG-FILE-0004 | iOS              | Cordova / Capacitor bridge isn’t initialized. |
| OS-PLUG-FILE-0005 | Android, iOS     | The method input parameters aren’t valid. |
| OS-PLUG-FILE-0006 | Android, iOS     | Invalid path was provided. |
| OS-PLUG-FILE-0007 | Android          | Unable to perform file operation, user denied permission request. |
| OS-PLUG-FILE-0008 | Android, iOS     | Operation failed because file does not exist. |
| OS-PLUG-FILE-0009 | Android          | Operation not supported for provided input. |
| OS-PLUG-FILE-0010 | Android, iOS     | Directory already exists, cannot be overwritten. |
| OS-PLUG-FILE-0011 | Android, iOS     | Missing parent directory – possibly recursive=false was passed or parent directory creation failed. |
| OS-PLUG-FILE-0012 | Android, iOS     | Cannot delete directory with children; received recursive=false but directory has contents. |
| OS-PLUG-FILE-0013 | Android, iOS     | The operation failed with an error. |