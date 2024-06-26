---
title: Text Zoom Capacitor Plugin API
description: テキストズームAPIは、視覚的なアクセシビリティのためにWeb Viewのテキストサイズを変更する機能を提供します。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/src/definitions.ts
sidebar_label: Text Zoom
---

# @capacitor/text-zoom

テキストズームAPIは、視覚的なアクセシビリティのためにWeb Viewのテキストサイズを変更する機能を提供します。

**注意:** テキストズームプラグインは、[Capacitor設定ファイル](https://capacitorjs.com/docs/config) で `preferredContentMode` 設定が `mobile` になっていないとiPadでは動作しません。

```json
{
  "ios": {
    "preferredContentMode": "mobile"
  }
}
```

## Install

```bash
npm install @capacitor/text-zoom
npx cap sync
```

## API

<docgen-index>

* [`get()`](#get)
* [`getPreferred()`](#getpreferred)
* [`set(...)`](#set)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### get()

```typescript
get() => Promise<GetResult>
```

Get the current zoom level.

Zoom levels are represented as a decimal (e.g. 1.2 is 120%).

**Returns:** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getPreferred()

```typescript
getPreferred() => Promise<GetPreferredResult>
```

Get the preferred zoom level.

Zoom levels are represented as a decimal (e.g. 1.2 is 120%).

**Returns:** <code>Promise&lt;<a href="#getpreferredresult">GetPreferredResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

Set the current zoom level.

Zoom levels are represented as a decimal (e.g. 1.2 is 120%).

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**Since:** 1.0.0

--------------------


### Interfaces


#### GetResult

| Prop        | Type                | Description                                        | Since |
| ----------- | ------------------- | -------------------------------------------------- | ----- |
| **`value`** | <code>number</code> | The current zoom level (represented as a decimal). | 1.0.0 |


#### GetPreferredResult

| Prop        | Type                | Description                                          | Since |
| ----------- | ------------------- | ---------------------------------------------------- | ----- |
| **`value`** | <code>number</code> | The preferred zoom level (represented as a decimal). | 1.0.0 |


#### SetOptions

| Prop        | Type                | Description                                    | Since |
| ----------- | ------------------- | ---------------------------------------------- | ----- |
| **`value`** | <code>number</code> | The new zoom level (represented as a decimal). | 1.0.0 |

</docgen-api>