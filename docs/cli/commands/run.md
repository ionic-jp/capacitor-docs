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
- `--target <id>`: Run on a specific target device

