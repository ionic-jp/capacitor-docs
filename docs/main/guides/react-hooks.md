---
title: React Hooks
description: Use these React hooks to simplify native mobile API access with Capacitor
contributors:
  - mlynch
slug: /guides/react-hooks
---

# Capacitor 用 React Hooks

Capacitor アプリで React を使用している開発者は、React 関数コンポーネント内の Capacitor API にアクセスするための、コミュニティで保守されている便利な React Hooks のセットを利用することができます。

この hooks のインストール方法:

```shell
npm install @capacitor-community/react-hooks
```

hooks を使うためには、関数コンポーネントにインストールして利用します:

```typescript
import { useFilesystem, base64FromPath, availableFeatures } from '@capacitor-community/react-hooks/filesystem';

const MyComponent = () => (
  const { readFile } = useFilesystem();

  useEffect(() => {
    const readMyFile = async () => {
      const file = await readFile({
        path: filepath,
        directory: FilesystemDirectory.Data
      });
      // ...
    }

    readMyFile();
  }, [ readFile ]);
```

## より多くの情報

[@capacitor-community/react-hooks](https://github.com/capacitor-community/react-hooks) レポジトリのドキュメンテーションにすべての利用可能な Hooks が掲載されています。
