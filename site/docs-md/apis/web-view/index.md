---
title: WebView
description: WebView API
url: /docs/apis/webview
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# WebView

WebView APIは、iOSとAndroidの組み込みWebViewにいくつかの設定オプションを提供します。

<plugin-api index="true" name="web-view"></plugin-api>

## Example

```typescript
import { Plugins } from '@capacitor/core';
const { WebView } = Plugins;

WebView.setServerBasePath('../../path/to/new/basepath');
```

## API

<plugin-api name="web-view"></plugin-api>
