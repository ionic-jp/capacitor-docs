---
title: Push Notifications Capacitor Plugin API
description: プッシュ通知APIは、ネイティブなプッシュ通知へのアクセスを提供します。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/src/definitions.ts
sidebar_label: Push Notifications
---

# @capacitor/push-notifications

プッシュ通知APIは、ネイティブなプッシュ通知へのアクセスを提供します。

## Install

```bash
npm install @capacitor/push-notifications
npx cap sync
```

## iOS

iOSでは、Push Notificationsケイパビリティを有効にする必要があります。ケイパビリティを有効にする方法については[ケイパビリティの設定](https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities)を参照してください。

Push Notificationsケイパビリティを有効にした後、アプリの`AppDelegate.swift`に以下を追加します：

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

## Android

Push Notification APIは通知を処理するために[Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) SDKを使用します。[AndroidでFirebase Cloud Messagingクライアントアプリをセットアップする](https://firebase.google.com/docs/cloud-messaging/android/client)を参照し、Firebaseプロジェクトの作成とアプリケーションの登録の手順に従ってください。Firebase SDKをアプリに追加したり、アプリマニフェストを編集したりする必要はありません - Push Notificationsがそれを提供します。必要なのは、Firebaseプロジェクトの`google-services.json`ファイルをアプリのモジュール（アプリレベル）ディレクトリに追加することだけです。

Android 13では、プッシュ通知を受信するためにパーミッションチェックが必要です。SDK 33をターゲットにする場合は、`checkPermissions()`と`requestPermissions()`を適切に呼び出す必要があります。

Android 15以降、ユーザーは[プライベートスペース](https://developer.android.com/about/versions/15/features#private-space)にアプリをインストールできます。ユーザーはいつでもプライベートスペースをロックでき、ユーザーがロックを解除するまでプッシュ通知は表示されません。

アプリがプライベートスペースにインストールされているかどうかを検出することはできません。そのため、アプリが重要な通知を表示する場合は、プライベートスペースにアプリをインストールしないようユーザーに通知してください。

プライベートスペースに関連するアプリの動作変更の詳細については、[Androidドキュメント](https://developer.android.com/about/versions/15/behavior-changes-all#private-space-changes)を参照してください。

### Variables

このプラグインは以下のプロジェクト変数（アプリの `variables.gradle` ファイルで定義）を使用します：

- `firebaseMessagingVersion`: `com.google.firebase:firebase-messaging` のバージョン（デフォルト: `25.0.1`）

---

## プッシュ通知アイコン

Androidでは、適切な名前のプッシュ通知アイコンを`AndroidManifest.xml`ファイルに追加する必要があります：

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

アイコンが指定されていない場合、Androidはアプリケーションアイコンを使用しますが、プッシュアイコンは透明な背景に白いピクセルである必要があります。アプリケーションアイコンは通常そのようになっていないため、白い正方形または円が表示されます。そのため、プッシュ通知用に別のアイコンを提供することをお勧めします。

Android Studioにはプッシュ通知アイコンを作成するために使用できるアイコンジェネレーターがあります。

## プッシュ通知チャンネル

Android 8.0（APIレベル26）以降では、通知チャンネルがサポートされ、推奨されています。SDKは以下の順序で受信プッシュ通知の`channelId`を決定します：

1. **まず、受信通知に`channelId`が設定されているかどうかを確認します。**
   FCMダッシュボードまたはAPIからプッシュ通知を送信する際に、`channelId`を指定できます。
2. **次に、`AndroidManifest.xml`で指定された値があるかどうかを確認します。**
   独自のデフォルトチャンネルを作成して使用する場合は、`default_notification_channel_id`を通知チャンネルオブジェクトのIDに設定します。FCMは受信メッセージで通知チャンネルが明示的に設定されていない場合にこの値を使用します。

```xml
<meta-data
    android:name="com.google.firebase.messaging.default_notification_channel_id"
    android:value="@string/default_notification_channel_id" />
```

3. **最後に、Firebase SDKが提供するフォールバック`channelId`を使用します。**
   FCMは基本設定のデフォルト通知チャンネルをすぐに使用できるように提供します。このチャンネルは、最初のプッシュメッセージを受信したときにFirebase SDKによって作成されます。

> **警告**
> オプション1または2を使用する場合でも、選択したオプションで使用されるIDと一致するIDを持つ通知チャンネルをコードで作成する必要があります。これには[`createChannel(...)`](#createchannel)を使用できます。これを行わないと、SDKはオプション3にフォールバックします。

## フォアグラウンドでのプッシュ通知の表示

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

アプリがフォアグラウンドにあるときのプッシュ通知の表示方法を設定できます。

| プロパティ                      | 型                              | 説明                                                                                                                                                                                                                                                                                                                                                                                          | Since |
| ------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`presentationOptions`** | <code>PresentationOption[]</code> | 組み合わせ可能な文字列の配列です。配列の可能な値: - `badge`: アプリアイコンのバッジカウントが更新されます（デフォルト値） - `sound`: プッシュ通知を受信するとデバイスが鳴動/振動します - `alert`: プッシュ通知がネイティブダイアログで表示されます。オプションが不要な場合は空の配列を指定できます。badgeはiOSのみで使用可能です。 | 1.0.0 |

### 設定例

`capacitor.config.json`での設定：

```json
{
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
}
```

`capacitor.config.ts`での設定：

```ts
/// <reference types="@capacitor/push-notifications" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
```

</docgen-config>

## サイレントプッシュ通知 / データのみの通知
#### iOS
このプラグインはiOSサイレントプッシュ（リモート通知）をサポートしていません。これらのタイプの通知を処理するには、ネイティブコードソリューションを使用することをお勧めします。[アプリへのバックグラウンド更新のプッシュ](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app)を参照してください。

#### Android
このプラグインはデータのみの通知をサポートしていますが、アプリが強制終了されている場合は`pushNotificationReceived`を呼び出しません。このシナリオを処理するには、`FirebaseMessagingService`を拡張するサービスを作成する必要があります。[FCMメッセージの処理](https://firebase.google.com/docs/cloud-messaging/android/receive)を参照してください。

## よくある問題
Androidでは、プッシュ通知の配信に影響を与える可能性のある様々なシステムとアプリの状態があります：

* デバイスが[Doze](https://developer.android.com/training/monitoring-device-state/doze-standby)モードに入った場合、アプリケーションの機能が制限される可能性があります。通知が受信される可能性を高めるには、[FCM高優先度メッセージ](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message)の使用を検討してください。
* 開発と本番では動作に違いがあります。Android Studioから起動せずにアプリをテストしてみてください。詳細は[こちら](https://stackoverflow.com/a/50238790/1351469)をご覧ください。

---

## Example

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

const addListeners = async () => {
  await PushNotifications.addListener('registration', token => {
    console.info('Registration token: ', token.value);
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('Registration error: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('Push notification received: ', notification);
  });

  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log('Push notification action performed', notification.actionId, notification.inputValue);
  });
}

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  await PushNotifications.register();
}

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('delivered notifications', notificationList);
}
```

## API

<docgen-index>

* [`register()`](#register)
* [`unregister()`](#unregister)
* [`getDeliveredNotifications()`](#getdeliverednotifications)
* [`removeDeliveredNotifications(...)`](#removedeliverednotifications)
* [`removeAllDeliveredNotifications()`](#removealldeliverednotifications)
* [`createChannel(...)`](#createchannel)
* [`deleteChannel(...)`](#deletechannel)
* [`listChannels()`](#listchannels)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`addListener('registration', ...)`](#addlistenerregistration-)
* [`addListener('registrationError', ...)`](#addlistenerregistrationerror-)
* [`addListener('pushNotificationReceived', ...)`](#addlistenerpushnotificationreceived-)
* [`addListener('pushNotificationActionPerformed', ...)`](#addlistenerpushnotificationactionperformed-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### register()

```typescript
register() => Promise<void>
```

Register the app to receive push notifications.

This method will trigger the `'registration'` event with the push token or
`'registrationError'` if there was a problem. It does not prompt the user for
notification permissions, use `requestPermissions()` first.

**Since:** 1.0.0

--------------------


### unregister()

```typescript
unregister() => Promise<void>
```

Unregister the app from push notifications.

This will delete a firebase token on Android, and unregister APNS on iOS.

**Since:** 5.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

Get a list of notifications that are visible on the notifications screen.

**Returns:** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

Remove the specified notifications from the notifications screen.

| Param           | Type                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**Since:** 1.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

Remove all the notifications from the notifications screen.

**Since:** 1.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

Create a notification channel.

Only available on Android O or newer (SDK 26+).

| Param         | Type                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**Since:** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

Delete a notification channel.

Only available on Android O or newer (SDK 26+).

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**Since:** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

List the available notification channels.

Only available on Android O or newer (SDK 26+).

**Returns:** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check permission to receive push notifications.

On Android 12 and below the status is always granted because you can always
receive push notifications. If you need to check if the user allows
to display notifications, use local-notifications plugin.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

Request permission to receive push notifications.

On Android 12 and below it doesn't prompt for permission because you can always
receive push notifications.

On iOS, the first time you use the function, it will prompt the user
for push notification permission and return granted or denied based
on the user selection. On following calls it will get the current status of
the permission without prompting again.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('registration', ...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: Token) => void) => Promise<PluginListenerHandle>
```

Called when the push notification registration finishes without problems.

Provides the push notification token.

| Param              | Type                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'registration'</code>                                 |
| **`listenerFunc`** | <code>(token: <a href="#token">Token</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('registrationError', ...)

```typescript
addListener(eventName: 'registrationError', listenerFunc: (error: RegistrationError) => void) => Promise<PluginListenerHandle>
```

Called when the push notification registration finished with problems.

Provides an error with the registration problem.

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'registrationError'</code>                                                    |
| **`listenerFunc`** | <code>(error: <a href="#registrationerror">RegistrationError</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('pushNotificationReceived', ...)

```typescript
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotificationSchema) => void) => Promise<PluginListenerHandle>
```

Called when the device receives a push notification.

| Param              | Type                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationReceived'</code>                                                              |
| **`listenerFunc`** | <code>(notification: <a href="#pushnotificationschema">PushNotificationSchema</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('pushNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: ActionPerformed) => void) => Promise<PluginListenerHandle>
```

Called when an action is performed on a push notification.

| Param              | Type                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationActionPerformed'</code>                                         |
| **`listenerFunc`** | <code>(notification: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Remove all native listeners for this plugin.

**Since:** 1.0.0

--------------------


### Interfaces


#### DeliveredNotifications

| Prop                | Type                                  | Description                                                         | Since |
| ------------------- | ------------------------------------- | ------------------------------------------------------------------- | ----- |
| **`notifications`** | <code>PushNotificationSchema[]</code> | List of notifications that are visible on the notifications screen. | 1.0.0 |


#### PushNotificationSchema

| Prop               | Type                 | Description                                                                                                          | Since |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**        | <code>string</code>  | The notification title.                                                                                              | 1.0.0 |
| **`subtitle`**     | <code>string</code>  | The notification subtitle.                                                                                           | 1.0.0 |
| **`body`**         | <code>string</code>  | The main text payload for the notification.                                                                          | 1.0.0 |
| **`id`**           | <code>string</code>  | The notification identifier.                                                                                         | 1.0.0 |
| **`tag`**          | <code>string</code>  | The notification tag. Only available on Android (from push notifications).                                           | 4.0.0 |
| **`badge`**        | <code>number</code>  | The number to display for the app icon badge.                                                                        | 1.0.0 |
| **`notification`** | <code>any</code>     | It's not being returned.                                                                                             | 1.0.0 |
| **`data`**         | <code>any</code>     | Any additional data that was included in the push notification payload.                                              | 1.0.0 |
| **`click_action`** | <code>string</code>  | The action to be performed on the user opening the notification. Only available on Android.                          | 1.0.0 |
| **`link`**         | <code>string</code>  | Deep link from the notification. Only available on Android.                                                          | 1.0.0 |
| **`group`**        | <code>string</code>  | Set the group identifier for notification grouping. Only available on Android. Works like `threadIdentifier` on iOS. | 1.0.0 |
| **`groupSummary`** | <code>boolean</code> | Designate this notification as the summary for an associated `group`. Only available on Android.                     | 1.0.0 |


#### Channel

| Prop              | Type                                              | Description                                                                                                                                                                                                                                                | Default          | Since |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----- |
| **`id`**          | <code>string</code>                               | The channel identifier.                                                                                                                                                                                                                                    |                  | 1.0.0 |
| **`name`**        | <code>string</code>                               | The human-friendly name of this channel (presented to the user).                                                                                                                                                                                           |                  | 1.0.0 |
| **`description`** | <code>string</code>                               | The description of this channel (presented to the user).                                                                                                                                                                                                   |                  | 1.0.0 |
| **`sound`**       | <code>string</code>                               | The sound that should be played for notifications posted to this channel. Notification channels with an importance of at least `3` should have a sound. The file name of a sound file should be specified relative to the android app `res/raw` directory. |                  | 1.0.0 |
| **`importance`**  | <code><a href="#importance">Importance</a></code> | The level of interruption for notifications posted to this channel.                                                                                                                                                                                        | <code>`3`</code> | 1.0.0 |
| **`visibility`**  | <code><a href="#visibility">Visibility</a></code> | The visibility of notifications posted to this channel. This setting is for whether notifications posted to this channel appear on the lockscreen or not, and if so, whether they appear in a redacted form.                                               |                  | 1.0.0 |
| **`lights`**      | <code>boolean</code>                              | Whether notifications posted to this channel should display notification lights, on devices that support it.                                                                                                                                               |                  | 1.0.0 |
| **`lightColor`**  | <code>string</code>                               | The light color for notifications posted to this channel. Only supported if lights are enabled on this channel and the device supports it. Supported color formats are `#RRGGBB` and `#RRGGBBAA`.                                                          |                  | 1.0.0 |
| **`vibration`**   | <code>boolean</code>                              | Whether notifications posted to this channel should vibrate.                                                                                                                                                                                               |                  | 1.0.0 |


#### ListChannelsResult

| Prop           | Type                   | Description                                   | Since |
| -------------- | ---------------------- | --------------------------------------------- | ----- |
| **`channels`** | <code>Channel[]</code> | List of all the Channels created by your app. | 1.0.0 |


#### PermissionStatus

| Prop          | Type                                                        | Description                                  | Since |
| ------------- | ----------------------------------------------------------- | -------------------------------------------- | ----- |
| **`receive`** | <code><a href="#permissionstate">PermissionState</a></code> | Permission state of receiving notifications. | 1.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### Token

| Prop        | Type                | Description                                                              | Since |
| ----------- | ------------------- | ------------------------------------------------------------------------ | ----- |
| **`value`** | <code>string</code> | On iOS it contains the APNS token. On Android it contains the FCM token. | 1.0.0 |


#### RegistrationError

| Prop        | Type                | Description                                        | Since |
| ----------- | ------------------- | -------------------------------------------------- | ----- |
| **`error`** | <code>string</code> | Error message describing the registration failure. | 4.0.0 |


#### ActionPerformed

| Prop               | Type                                                                      | Description                                                     | Since |
| ------------------ | ------------------------------------------------------------------------- | --------------------------------------------------------------- | ----- |
| **`actionId`**     | <code>string</code>                                                       | The action performed on the notification.                       | 1.0.0 |
| **`inputValue`**   | <code>string</code>                                                       | Text entered on the notification action. Only available on iOS. | 1.0.0 |
| **`notification`** | <code><a href="#pushnotificationschema">PushNotificationSchema</a></code> | The notification in which the action was performed.             | 1.0.0 |


### Type Aliases


#### Importance

The importance level. For more details, see the [Android Developer Docs](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)

<code>1 | 2 | 3 | 4 | 5</code>


#### Visibility

The notification visibility. For more details, see the [Android Developer Docs](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)

<code>-1 | 0 | 1</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

</docgen-api>