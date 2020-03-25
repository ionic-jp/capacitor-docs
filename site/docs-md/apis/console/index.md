---
title: Console
description: Console API
url: /docs/apis/console
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="pwa,ios,android,electron"></plugin-platforms>

# Console

Console APIでは自動的に `console.debug`, `console.error`, `console.info`, `console.log`, `console.trace` and `console.warn` からそれぞれのプラットフォームのネイティブログシステムを呼び出します。これによって、例えば
`console.log` はXcode と Android Studio のログウィンドウに表示されます。

現時点では無効にすることはできないが、この機能は今後提供される予定です。

## Example

```typescript
console.log('I really enjoy Avocado Toast, and I\'m not ashamed to admit it');
```

The string will show up in your Xcode or Android Studio log stream.
