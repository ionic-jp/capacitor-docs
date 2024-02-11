---
title: ストレージ
description: 小容量から大容量のデータをCapacitorに格納する。
contributors:
  - mlynch
slug: /guides/storage
---

# Data Storage in Capacitor

ほとんどのアプリは、ローカルデータの永続化と読み込みが必要です。特定のユースケースに応じて、いくつかのアプローチを取ることができます。

> ローカルデータの暗号化が必要ですか？IonicはCapacitorアプリのために、認証、生体認証、セキュアストレージを含む箱入りのセキュリティスイートを提供します。 [詳しくはこちら](https://ionic.io/secure) 。

## なぜLocalStorageやIndexedDBを使うことができないのでしょうか？

Capacitorアプリは主にWebビューまたはブラウザで実行されるため、Capacitor開発者はストレージ用のWeb APIを使用できます。ただし、これらのAPIには留意すべき大きな注意点があります。

ローカルストレージは、ユーザーIDのような少量の一時的なデータに使用できますが、「transient_」と見なされる必要があります。つまり、アプリはデータが最終的に失われることを予期する必要があるのです。これは、デバイスの空き容量が少なくなると、OS が Web View からローカル ストレージを再要求するためです。同じことが少なくとも iOS の IndexedDB にも言えます（Android では、IndexedDB を persisted としてマークするために [persisted storage API](https://web.dev/persistent-storage/) が利用可能です）。ブラウザで [データストレージの退避ポリシー](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria) の詳細を読む。

## Capacitor プリファレンス API

Capacitorにはネイティブの [Preferences API](/apis/preferences.md) があり、上記の立ち退き問題を回避できますが、これは少量のデータ向けのものです。

Preferences APIはシンプルなキー/バリューAPIを提供し、高度なクエリサポートはありません。

```typescript
import { Preferences } from '@capacitor/preferences';

// JSON "set" example
async setObject() {
  await Preferences.set({
    key: 'user',
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}

// JSON "get" example
async getObject() {
  const ret = await Preferences.get({ key: 'user' });
  const user = JSON.parse(ret.value);
}
```

## 大容量データまたは高性能ストレージの選択肢

大量のデータを保存し、高いパフォーマンスでアクセスするためには、いくつかのオプションがあります。

最も広くサポートされているオプションは SQLite です。Capacitor で動作するコミュニティ製の SQLite プラグインが多数あり、 [capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite) や [cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage) などがあります。

Capacitor チームは、暗号化をサポートし、デバイス上の [安全な鍵管理 API](https://ionicframework.com/enterprise/identity-vault) と統合した [エンタープライズ SQLite ストレージソリューション](https://ionicframework.com/enterprise/offline-storage) も提供しています。
