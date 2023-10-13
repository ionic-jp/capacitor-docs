---
title: CLI Command - cap copy
description: Capacitor CLI command - cap copy
contributors:
  - dotNetkow
sidebar_label: copy
---

# Capacitor CLI - cap copy

Web アプリのビルドと Capacitor の設定ファイルをネイティブプラットフォームのプロジェクトにコピーします。Web アプリに変更を加えたり、設定値を変更したりするたびに実行してください。

```bash
npx cap copy [<platform>]
```

<strong>Inputs:</strong>

- `platform` (optional): `android`, `ios`

<strong>Options:</strong>

- `--inline`: After syncing, all JS source maps will be inlined allowing for debugging an Android Web View in Chromium based browsers.

## Hooks

The following hooks are available for copy command:

- `capacitor:copy:before`
- `capacitor:copy:after`

[More information](../hooks)
