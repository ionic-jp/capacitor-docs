---
title: プラグインのモック
description: Capacitorプラグインのモックの作り方
contributors:
  - kensodemann
slug: /guides/mocking-plugins
---

# Capacitor プラグインをモックする

アプリケーション内でユニットテストを作成する場合、 テスト対象のユニットに対する外部依存関係のモックを作成するのがベストプラクティスです。これには、コンポーネントやサービスが使用している Capacitor プラグインも含まれます。

ほとんどのモッキングライブラリは、オブジェクトを取得して JavaScript プロキシでラップすることでモックを作成し、そのオブジェクト上のメソッドの呼び出しを調べたりメソッドの戻り値を制御したりします。しかし、CapacitorプラグインはJavaScriptレイヤーの中でプロキシとして実装されています。プロキシのプロキシを作成することはサポートされておらず、失敗します。この問題を回避するために、手動モックを使用することができます。

## 手動モック

手動モックを使用すると、JavaScript モジュール全体の機能を簡単にスタブ化することができます。その結果、テストが `import { Storage } from '@capacitor/storage'` を実行すると、本当の `Storage` JavaScript proxy object をロードする代わりに、以下のようなものをロードすることになります。

```TypeScript
export const Storage = {
  async get(data: { key: string }): Promise<{ value: string | undefined }> {
    return { value: undefined };
  },

  async set(data: { key: string; value: string }): Promise<void> {},
  async clear(): Promise<void> {},
};
```

これはプロキシオブジェクトではなくプレーンなJavaScriptオブジェクトなので、スパイするのは非常に簡単です。また、モックであるため、ネイティブ呼び出しを試みません。これにより、Capacitorプラグインを使用するコードをテストする際に、手動モックの使用が理想的な選択となります。

### Jest

Jestテストフレームワークには<a href="https://jestjs.io/docs/manual-mocks" _target="blank">手動モック</a>が組み込まれています。プロジェクトのルートに`__mocks__/@capacitor`フォルダを作成すると、Jestは`node_modules`からではなくそこからファイルを自動的に読み込みます。

たとえば、次のディレクトリ構造があるとします：

```
.
|
+- __mocks__
| |
| +- @capacitor
|   |
|   +- storage.ts
|   +- toast.ts
...
+- src
```

テストでは、`node_modules`の実際の`@capacitor/storage`および`@capacitor/toast`プラグインではなく、`storage.ts`と`toast.ts`で定義されたスタブが使用されます。

### Jasmine

Jasmineテストフレームワークには「手動モック」の概念は含まれていませんが、TypeScriptのパスマッピングを使用することで簡単にシミュレートできます。

まず、Jestの例と同様に、プロジェクトのルートレベルに同じディレクトリ構造を作成します。

Angularプロジェクト（テストフレームワークとしてJasmineを使用する最も一般的なシナリオ）には、ユニットテストが実行されるときに`tsconfig.json`ベース設定を拡張する`tsconfig.spec.json`ファイルが含まれています。ベースレベルで持っている可能性のある`paths`マッピングを拡張するようにこのファイルを変更します。

たとえば、`tsconfig.json`ファイルに次の`paths`マッピングが含まれている場合：

```JSON
    "paths": {
      "@app/*": ["src/app/*"],
      "@env/*": ["src/environments/*"]
    },
```

次に、`tsconfig.spec.json`ファイルを更新して、それらのパスとユニットテストに使用したいパスを含めます：

```JSON
    "paths": {
      "@app/*": ["src/app/*"],
      "@env/*": ["src/environments/*"],
      "@test/*": ["test/*"],
      "@capacitor/*": ["__mocks__/@capacitor/*"]
    }
```

これで、ユニットテストがコンパイルされるとき、`import { Storage } from '@capacitor/storage';`は`node_modules`の実際のものではなく、`__mocks__/@capacitor`の下のスタブファイルを使用します。

**注意：** `paths`オブジェクトはマージされるのではなく完全に置き換えられるため、`tsconfig.json`で定義されているパスがある場合は、`tsconfig.spec.json`にも含める_必要があります_。

## スタブのモック

手動モックが配置されたら、通常の方法でメソッド呼び出しをモックおよびスパイするテストを作成できます。

### Jest

```TypeScript
  it("gets the first and last name", async () => {
    Storage.get = jest.fn().mockImplementation(
      async (data: { key: string }): Promise<{ value: string }> => {
        return data.key === "firstName"
          ? { value: "Jimmy" }
          : data.key === "lastName"
          ? { value: "Simms" }
          : { value: "unknown" };
      }
    );
    const w = mount(Home);
    await flushPromises();
    expect(w.vm.firstName).toEqual("Jimmy");
    expect(w.vm.lastName).toEqual("Simms");
  });

  it("clears the storage", () => {
    const button = wrapper.findComponent('[data-testid="clear"]');
    Storage.clear = jest.fn().mockResolvedValue(undefined);
    button.trigger("click");
    expect(Storage.clear).toHaveBeenCalledTimes(1);
  });
```

### Jasmine

```TypeScript
  it("gets the first and last name", async () => {
    spyOn(Storage, 'get');
    (Storage.get as any)
      .withArgs({ key: 'firstName' })
      .and.returnValue(Promise.resolve({ value: 'Jason' }));
    (Storage.get as any)
      .withArgs({ key: 'lastName' })
      .and.returnValue(Promise.resolve({ value: 'Jones' }));

    fixture.detectChanges();
    await fixture.whenRenderingDone();

    expect(component.firstName).toEqual('Jason');
    expect(component.lastName).toEqual('Jones');
  });

  it('clears the storage', () => {
    spyOn(Storage, 'clear');
    click(clear.nativeElement);
    fixture.detectChanges();
    expect(Storage.clear).toHaveBeenCalledTimes(1);
  });
```

## 例

- [JasmineでのCapacitorプラグインのモック](https://github.com/ionic-team/cap-plugin-mock-jasmine)
- [JestでのCapacitorプラグインのモック](https://github.com/ionic-team/cap-plugin-mock-jest)
