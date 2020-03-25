---
title: Capacitor APIs
description: Capacitor APIs
url: /docs/apis
contributors:
  - mlynch
  - jcesarmobile
---

# Capacitor APIs

Capacitorには、すべてのCapacitor Appで使用できる多数のネイティブAPIが含まれています。これらはCapacitor "core plugins,"と考えることができ、各プラットフォームで一般的に必要とされる機能へのアクセスを容易にします。

Cordovaから来た人のために、core Capacitor APIは、core Cordova pluginの大部分をカバーし、いくつかの新しいものも含んでいます。

使用可能なAPIの完全なリストについては、左側のメニューのAPIリストを参照してください。

## API Usage

To use a Capacitor API, follow these steps:

1) Import the `Plugins` object. It represents the registry of all Capacitor plugins.
```typescript
import { Plugins } from '@capacitor/core';
```

2) Get a plugin from the Plugin Registry (`Plugins` object).
```typescript
const { Browser } = Plugins;
```

3) Use the plugin API:
```typescript
async openBrowser() {
  // On iOS, for example, open the URL in SFSafariViewController (the in-app browser)
  await Browser.open({ url: "https://ionicframework.com" });
}
```

A common mistake is to import a plugin directly, then use the plugin API immediately, resulting in the web implementation being used:
```typescript
import { Browser } from '@capacitor/core';

async openBrowser() {
  // On iOS, for example, this will open the URL in Safari instead of
  // the SFSafariViewController (in-app browser)
  await Browser.open({ url: "https://ionicframework.com" });
}
```

By using the plugins from the plugin registry (`Plugins` object), the native implementation of the plugin is used (if available), with fallback to the web version.
