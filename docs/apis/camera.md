---
title: Camera Capacitor Plugin API
description: カメラAPIは、カメラで写真を撮影したり、フォトアルバムから既存の写真を選択する機能を提供します。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/camera/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/camera/src/definitions.ts
sidebar_label: Camera
---

# @capacitor/camera

カメラAPIは、カメラで写真を撮影したり、フォトアルバムから既存の写真を選択する機能を提供します。

## Install

```bash
npm install @capacitor/camera
npx cap sync
```

## iOS

iOSでは、`Info.plist`にアプリ用の以下の使用説明を追加して記入する必要があります：

- `NSCameraUsageDescription`（`Privacy - Camera Usage Description`）
- `NSPhotoLibraryAddUsageDescription`（`Privacy - Photo Library Additions Usage Description`）
- `NSPhotoLibraryUsageDescription`（`Privacy - Photo Library Usage Description`）

XcodeでのiOSパーミッションの設定については、[iOSガイド](https://capacitorjs.com/docs/ios)の[`Info.plist`の設定](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist)を参照してください。

## Android

デバイスギャラリーから既存の画像を選択する際、AndroidフォトピッカーコンポーネントがAndroidでは使用されるようになりました。フォトピッカーは以下の条件を満たすデバイスで利用できます：

- Android 11（APIレベル30）以上を実行している
- Google Systemアップデートを通じてモジュラーシステムコンポーネントの変更を受信している

Android 11または12を実行しているGoogle Playサービスをサポートする古いデバイスやAndroid Goデバイスでは、バックポートされたフォトピッカーをインストールできます。Google Playサービスを通じてバックポートされたフォトピッカーモジュールの自動インストールを有効にするには、`AndroidManifest.xml`ファイルの`<application>`タグに以下のエントリを追加します：

```xml
<!-- Trigger Google Play services to install the backported photo picker module. -->
<!--suppress AndroidDomInspection -->
<service android:name="com.google.android.gms.metadata.ModuleDependencies"
    android:enabled="false"
    android:exported="false"
    tools:ignore="MissingClass">
    <intent-filter>
        <action android:name="com.google.android.gms.metadata.MODULE_DEPENDENCIES" />
    </intent-filter>
    <meta-data android:name="photopicker_activity:0:required" android:value="" />
</service>
```

そのエントリが追加されていない場合、フォトピッカーをサポートしていないデバイスでは、フォトピッカーコンポーネントは`Intent.ACTION_OPEN_DOCUMENT`にフォールバックします。

Cameraプラグインは、`saveToGallery: true`を使用しない限りパーミッションは不要です。その場合、以下のパーミッションを`AndroidManifest.xml`に追加する必要があります：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

これらのパーミッションは、リクエストされるAndroidバージョンに対してのみ指定することもできます：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29"/>
```

ストレージパーミッションは、写真ファイルの読み取り/保存のためのものです。

Androidパーミッションの設定の詳細については、[Androidガイド](https://capacitorjs.com/docs/android)の[パーミッションの設定](https://capacitorjs.com/docs/android/configuration#setting-permissions)を参照してください。

また、Camera APIは写真を撮影するために別のActivityを起動するため、Activityの実行中にOSによってアプリが終了された場合に送信されたカメラデータを処理するために、`App`プラグインの`appRestoredResult`をリッスンする必要があります。

### Variables

このプラグインは以下のプロジェクト変数（アプリの `variables.gradle` ファイルで定義）を使用します：

- `androidxExifInterfaceVersion`: `androidx.exifinterface:exifinterface` のバージョン（デフォルト: `1.4.1`）
- `androidxMaterialVersion`: `com.google.android.material:material` のバージョン（デフォルト: `1.13.0`）

## PWAに関する注意事項

Cameraプラグインが動作するには[PWA Elements](https://capacitorjs.com/docs/web/pwa-elements)が必要です。

## Example

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  var imageUrl = image.webPath;

  // Can be set to the src of an image now
  imageElement.src = imageUrl;
};
```

## API

<docgen-index>

* [`getPhoto(...)`](#getphoto)
* [`pickImages(...)`](#pickimages)
* [`pickLimitedLibraryPhotos()`](#picklimitedlibraryphotos)
* [`getLimitedLibraryPhotos()`](#getlimitedlibraryphotos)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getPhoto(...)

```typescript
getPhoto(options: ImageOptions) => Promise<Photo>
```

Prompt the user to pick a photo from an album, or take a new photo
with the camera.

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#imageoptions">ImageOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#photo">Photo</a>&gt;</code>

**Since:** 1.0.0

--------------------


### pickImages(...)

```typescript
pickImages(options: GalleryImageOptions) => Promise<GalleryPhotos>
```

Allows the user to pick multiple pictures from the photo gallery.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#galleryimageoptions">GalleryImageOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**Since:** 1.2.0

--------------------


### pickLimitedLibraryPhotos()

```typescript
pickLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

Allows the user to update their limited photo library selection.
Returns all the limited photos after the picker dismissal.
If instead the user gave full access to the photos it returns an empty array.

**Returns:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**Since:** 4.1.0

--------------------


### getLimitedLibraryPhotos()

```typescript
getLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

Return an array of photos selected from the limited photo library.

**Returns:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**Since:** 4.1.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check camera and photo album permissions

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: CameraPluginPermissions | undefined) => Promise<PermissionStatus>
```

Request camera and photo album permissions

| Param             | Type                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#camerapluginpermissions">CameraPluginPermissions</a></code> |

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### Interfaces


#### Photo

| Prop               | Type                 | Description                                                                                                                                                                                                                                                              | Since |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`base64String`** | <code>string</code>  | The base64 encoded string representation of the image, if using <a href="#cameraresulttype">CameraResultType.Base64</a>.                                                                                                                                                 | 1.0.0 |
| **`dataUrl`**      | <code>string</code>  | The url starting with 'data:image/jpeg;base64,' and the base64 encoded string representation of the image, if using <a href="#cameraresulttype">CameraResultType.DataUrl</a>. Note: On web, the file format could change depending on the browser.                       | 1.0.0 |
| **`path`**         | <code>string</code>  | If using <a href="#cameraresulttype">CameraResultType.Uri</a>, the path will contain a full, platform-specific file URL that can be read later using the Filesystem API.                                                                                                 | 1.0.0 |
| **`webPath`**      | <code>string</code>  | webPath returns a path that can be used to set the src attribute of an image for efficient loading and rendering.                                                                                                                                                        | 1.0.0 |
| **`exif`**         | <code>any</code>     | Exif data, if any, retrieved from the image                                                                                                                                                                                                                              | 1.0.0 |
| **`format`**       | <code>string</code>  | The format of the image, ex: jpeg, png, gif. iOS and Android only support jpeg. Web supports jpeg, png and gif, but the exact availability may vary depending on the browser. gif is only supported if `webUseInput` is set to `true` or if `source` is set to `Photos`. | 1.0.0 |
| **`saved`**        | <code>boolean</code> | Whether if the image was saved to the gallery or not. On Android and iOS, saving to the gallery can fail if the user didn't grant the required permissions. On Web there is no gallery, so always returns false.                                                         | 1.1.0 |


#### ImageOptions

| Prop                     | Type                                                          | Description                                                                                                                                                                                                                                                                | Default                             | Since |
| ------------------------ | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----- |
| **`quality`**            | <code>number</code>                                           | The quality of image to return as JPEG, from 0-100 Note: This option is only supported on Android and iOS                                                                                                                                                                  |                                     | 1.0.0 |
| **`allowEditing`**       | <code>boolean</code>                                          | Whether to allow the user to crop or make small edits (platform specific). On iOS it's only supported for <a href="#camerasource">CameraSource.Camera</a>, but not for <a href="#camerasource">CameraSource.Photos</a>.                                                    |                                     | 1.0.0 |
| **`resultType`**         | <code><a href="#cameraresulttype">CameraResultType</a></code> | How the data should be returned. Currently, only 'Base64', 'DataUrl' or 'Uri' is supported                                                                                                                                                                                 |                                     | 1.0.0 |
| **`saveToGallery`**      | <code>boolean</code>                                          | Whether to save the photo to the gallery. If the photo was picked from the gallery, it will only be saved if edited.                                                                                                                                                       | <code>: false</code>                | 1.0.0 |
| **`width`**              | <code>number</code>                                           | The desired maximum width of the saved image. The aspect ratio is respected.                                                                                                                                                                                               |                                     | 1.0.0 |
| **`height`**             | <code>number</code>                                           | The desired maximum height of the saved image. The aspect ratio is respected.                                                                                                                                                                                              |                                     | 1.0.0 |
| **`correctOrientation`** | <code>boolean</code>                                          | Whether to automatically rotate the image "up" to correct for orientation in portrait mode                                                                                                                                                                                 | <code>: true</code>                 | 1.0.0 |
| **`source`**             | <code><a href="#camerasource">CameraSource</a></code>         | The source to get the photo from. By default this prompts the user to select either the photo album or take a photo.                                                                                                                                                       | <code>: CameraSource.Prompt</code>  | 1.0.0 |
| **`direction`**          | <code><a href="#cameradirection">CameraDirection</a></code>   | iOS and Web only: The camera direction.                                                                                                                                                                                                                                    | <code>: CameraDirection.Rear</code> | 1.0.0 |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code>                        | iOS only: The presentation style of the Camera.                                                                                                                                                                                                                            | <code>: 'fullscreen'</code>         | 1.0.0 |
| **`webUseInput`**        | <code>boolean</code>                                          | Web only: Whether to use the PWA Element experience or file input. The default is to use PWA Elements if installed and fall back to file input. To always use file input, set this to `true`. Learn more about PWA Elements: https://capacitorjs.com/docs/web/pwa-elements |                                     | 1.0.0 |
| **`promptLabelHeader`**  | <code>string</code>                                           | Text value to use when displaying the prompt.                                                                                                                                                                                                                              | <code>: 'Photo'</code>              | 1.0.0 |
| **`promptLabelCancel`**  | <code>string</code>                                           | Text value to use when displaying the prompt. iOS only: The label of the 'cancel' button.                                                                                                                                                                                  | <code>: 'Cancel'</code>             | 1.0.0 |
| **`promptLabelPhoto`**   | <code>string</code>                                           | Text value to use when displaying the prompt. The label of the button to select a saved image.                                                                                                                                                                             | <code>: 'From Photos'</code>        | 1.0.0 |
| **`promptLabelPicture`** | <code>string</code>                                           | Text value to use when displaying the prompt. The label of the button to open the camera.                                                                                                                                                                                  | <code>: 'Take Picture'</code>       | 1.0.0 |


#### GalleryPhotos

| Prop         | Type                        | Description                     | Since |
| ------------ | --------------------------- | ------------------------------- | ----- |
| **`photos`** | <code>GalleryPhoto[]</code> | Array of all the picked photos. | 1.2.0 |


#### GalleryPhoto

| Prop          | Type                | Description                                                                                                       | Since |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**    | <code>string</code> | Full, platform-specific file URL that can be read later using the Filesystem API.                                 | 1.2.0 |
| **`webPath`** | <code>string</code> | webPath returns a path that can be used to set the src attribute of an image for efficient loading and rendering. | 1.2.0 |
| **`exif`**    | <code>any</code>    | Exif data, if any, retrieved from the image                                                                       | 1.2.0 |
| **`format`**  | <code>string</code> | The format of the image, ex: jpeg, png, gif. iOS and Android only support jpeg. Web supports jpeg, png and gif.   | 1.2.0 |


#### GalleryImageOptions

| Prop                     | Type                                   | Description                                                                                                             | Default                     | Since |
| ------------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----- |
| **`quality`**            | <code>number</code>                    | The quality of image to return as JPEG, from 0-100 Note: This option is only supported on Android and iOS.              |                             | 1.2.0 |
| **`width`**              | <code>number</code>                    | The desired maximum width of the saved image. The aspect ratio is respected.                                            |                             | 1.2.0 |
| **`height`**             | <code>number</code>                    | The desired maximum height of the saved image. The aspect ratio is respected.                                           |                             | 1.2.0 |
| **`correctOrientation`** | <code>boolean</code>                   | Whether to automatically rotate the image "up" to correct for orientation in portrait mode                              | <code>: true</code>         | 1.2.0 |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code> | iOS only: The presentation style of the Camera.                                                                         | <code>: 'fullscreen'</code> | 1.2.0 |
| **`limit`**              | <code>number</code>                    | Maximum number of pictures the user will be able to choose. Note: This option is only supported on Android 13+ and iOS. | <code>0 (unlimited)</code>  | 1.2.0 |


#### PermissionStatus

| Prop         | Type                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| **`camera`** | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |
| **`photos`** | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |


#### CameraPluginPermissions

| Prop              | Type                                |
| ----------------- | ----------------------------------- |
| **`permissions`** | <code>CameraPermissionType[]</code> |


### Type Aliases


#### CameraPermissionState

<code><a href="#permissionstate">PermissionState</a> | 'limited'</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### CameraPermissionType

<code>'camera' | 'photos'</code>


### Enums


#### CameraResultType

| Members       | Value                  |
| ------------- | ---------------------- |
| **`Uri`**     | <code>'uri'</code>     |
| **`Base64`**  | <code>'base64'</code>  |
| **`DataUrl`** | <code>'dataUrl'</code> |


#### CameraSource

| Members      | Value                 | Description                                                        |
| ------------ | --------------------- | ------------------------------------------------------------------ |
| **`Prompt`** | <code>'PROMPT'</code> | Prompts the user to select either the photo album or take a photo. |
| **`Camera`** | <code>'CAMERA'</code> | Take a new photo using the camera.                                 |
| **`Photos`** | <code>'PHOTOS'</code> | Pick an existing photo from the gallery or photo album.            |


#### CameraDirection

| Members     | Value                |
| ----------- | -------------------- |
| **`Rear`**  | <code>'REAR'</code>  |
| **`Front`** | <code>'FRONT'</code> |

</docgen-api>