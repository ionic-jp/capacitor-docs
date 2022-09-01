---
title: CLI Command - cap init
description: Capacitor CLI command - cap init
contributors:
  - thomasvidas
sidebar_label: init
---

# Capacitor CLI - cap init

アプリ名、アプリID、および既存のウェブアプリ用のオプションのウェブディレクトリを指定して、Capacitor構成を初期化します。

```bash
npx cap init <appName> <appID>
```

<strong>Inputs:</strong>

- `appName` (required): The application's name
- `appID` (required): The application's App ID; something like `com.example.appname`

<strong>Options:</strong>

- `--web-dir <value>`: The existing web application to use with initialization
