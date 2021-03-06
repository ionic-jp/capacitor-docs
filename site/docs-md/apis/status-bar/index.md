---
title: Status Bar
description: Status Bar API
url: /docs/apis/status-bar
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# Status Bar

StatusBar APIは、ステータスバーのスタイルを表示または非表示に設定するメソッドを提供します。

<plugin-api index="true" name="status-bar"></plugin-api>

## iOS Note

This plugin requires "View controller-based status bar appearance" (`UIViewControllerBasedStatusBarAppearance`) set to `YES` in `Info.plist`. Read about [Configuring iOS](../ios/configuration) for help.

The status bar visibility defaults to visible and the style defaults to `StatusBarStyle.Light`. You can change these defaults by adding `UIStatusBarHidden` and or `UIStatusBarStyle` in the `Info.plist`.

## Events

* statusTap

## Example

```typescript
// Events (iOS only)
window.addEventListener('statusTap', function () {
  console.log("statusbar tapped");
});

//API
import {
  Plugins,
  StatusBarStyle,
} from '@capacitor/core';

const { StatusBar } = Plugins;

export class StatusBarExample {
  isStatusBarLight = true

  changeStatusBar() {
    StatusBar.setStyle({
      style: this.isStatusBarLight ? StatusBarStyle.Dark : StatusBarStyle.Light
    });
    this.isStatusBarLight = !this.isStatusBarLight;

    // Display content under transparent status bar (Android only)
    Statusbar.setOverlaysWebView({
      overlay: true
    });
  }

  hideStatusBar() {
    StatusBar.hide();
  }

  showStatusBar() {
    StatusBar.show();
  }
}
```

## API

<plugin-api name="status-bar"></plugin-api>
