---
title: CLI Command - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

このコマンドは、まず[`sync`](/cli/commands/sync.md)を実行し、その後、ネイティブアプリをビルドして、選択したターゲットデバイスにデプロイします。

```bash
npx cap run [options] <platform>
```

<strong>Inputs:</strong>

- `platform` (required): `android`, `ios`

<strong>Options:</strong>

- `--flavor <flavorName>`: set the flavor of the Android project (flavor dimensions not yet supported)
- `--list`: Print a list of target devices available to the given platform
- `--no-sync`: do not run the sync command
- `--scheme <schemeName>`: set the scheme of the iOS project
- `--configuration <name>`: Configuration name of the iOS Scheme
- `--target <id>`: Run on a specific target device
- `--live-reload`: Enable Live Reload
- `-l`: Shorthand for `--live-reload`
- `--host <host>`: Live Reload by loading the web view from the specified host
- `--port <port>`: Live Reload by loading the web view from the specified port
- `--forwardPorts <port1:port2>`: Automatically run "adb reverse" for better live-reloading support

