---
title: 認証情報の自動入力
description: 認証情報の自動入力
contributors:
  - dtarnawsky
slug: /guides/autofill-credentials
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 自動入力される認証情報
Android、iOS、Webには、ユーザー名とパスワードのフィールドを自動的に検出し、これらの認証情報を安全に保存、呼び出しするパスワードマネージャーが組み込まれています。

AppleとGoogleが認証情報を自動入力して保存するためには、Webサイトとアプリの間に双方向の関連付けを設定する必要があります。このガイドでは、[Deep Linking](deep-links#create-site-association-file-1) で使用したのと同じステップに従いますが、ここでは [Capacitor Configuration](#set-capacitor-server-hostname) と `autocomplete` 属性の使用に関するステップを追加しています。

## アプリのコード化

アプリケーションには、ユーザー名とパスワードを入力するための `ion-input` が必要です。この入力には [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) 属性を使用しなければなりません。以下に例を示します。

<Tabs groupId="framework" defaultValue="angular" values={[{ value: 'angular', label: 'Angular' }, { value: 'javascript', label: 'Javascript' }]}>
<TabItem value="angular">

```html
<form>
  <ion-list>
    <ion-item>
      <ion-label>E-Mail Address</ion-label>
      <ion-input appAutofill type="email" name="email" autocomplete="email" [(ngModel)]="email" required email></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Password</ion-label>
      <ion-input appAutofill type="password" name="password" autocomplete="current-password" required [(ngModel)]="password"></ion-input>
    </ion-item>
  </ion-list>
  <ion-button type="submit">Submit</ion-button>
</form>
```

[webkit のバグ](https://bugs.webkit.org/show_bug.cgi?id=226023) により、フィールドの自動入力に関連する `ion-input` を回避するために、この [this directive](https://gist.github.com/dtarnawsky/fc92869c1c67b9c74c66de8af3e081b2) をコードにコピーする必要があります。

この [サンプルアプリケーション](https://github.com/ionic-enterprise/cs-autofill-credendials) は、このガイドのテクニックを使って、iOS、Android、Web上で資格情報の自動入力を可能にしています。
</TabItem>

<TabItem value="javascript">

```html
<form>
  <ion-list>
    <ion-item>
      <ion-label>E-Mail Address</ion-label>
      <ion-input type="email" name="email" autocomplete="email" required email></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Password</ion-label>
      <ion-input id="pwd" type="password" name="password" autocomplete="current-password" required></ion-input>
    </ion-item>
  </ion-list>
  <ion-button type="submit">Submit</ion-button>
</form>
```

[webkit のバグ](https://bugs.webkit.org/show_bug.cgi?id=226023) により、`ion-input` のフィールドへの自動入力に関連するため、この回避コードが必要になります。
```javascript
    document.getElementById('pwd').children[0].addEventListener('change', (e) => {
      this.password = (e.target as any).value;      
    });
```
</TabItem>


</Tabs>

:::note
`autocomplete` 属性は、 `username`, `current-pasword`, `new-password` のようなクレデンシャルタイプを自動入力できるようにします。また、電話番号、ワンタイムコード、クレジットカード情報、[more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)などには、この追加設定なしで使用することができます。
:::

## Capacitorサーバーのホスト名を設定する

デフォルトではCapacitorはドメイン `localhost` (iOSでは `capacitor://localhost` 、Androidでは `http://localhost`) を使用してサービスを提供します。アプリに保存された認証情報をパスワードマネージャーに表示させたい場合は、設定を `localhost` から `my-app.com` (アプリに関連付けたドメイン) に変更する必要があります。

これは `capacitor.config.ts` または `capacitor.config.json` ファイルで行うことができます。
```typescript
const config: CapacitorConfig = {
...
  server: {
    hostname: 'my-app.com'
  }
};
```

:::warning
`ホスト名`をデフォルトの `localhost` から変更すると、 [`navigator.geolocation`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation) や [`MediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) などの [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) を必要とする Web API の使用に影響を及ぼします。この種の機能は、変更後に必ずテストしてください。   
:::

## iOSのための設定

### XCode での設定

XCodeでプロジェクトを開き、`Signing & Capabilities` に移動します。

![XCode capabilities](../../../static/img/v4/docs/guides/autofill-credentials/xcode-capabilities.png)

- `+` をクリックし、"Associated Domains "のケイパビリティを追加します。
- Domainsセクションで、`+`をクリックし、`applinks:my-app.com` というエントリーを指定します。ここで、`my-app.com`はあなたが所有し、App Association Fileを作成するドメイン名です。
- `Automatically manage signing`  が有効になっていることを確認します（有効になっていない場合は、 [Apple Developer Portal](https://developer.apple.com/account/resources/identifiers/list) でApp Ids、Capabilities、Profilesを構成する必要があります）。

### Apple App Site Association File

以下のような `apple-app-site-association` というサイトアソシエーションファイルを作成します。`TEAMID.BUNDLEID` を自分の Apple Team ID と App Bundle ID (例: `8L65AZE66A.com.company.myapp`) に置き換えてください。


```json
"applinks": {
    "details": [
      {
        "appID": "TEAMID.BUNDLEID",
        "paths": ["*"]
      }
    ]
}
```

> Note：JSONファイルであるにもかかわらず、ファイル拡張子を付けて保存しないでください。


このファイルを、あなたのウェブサイトの `.well-known` フォルダーにアップロードしてください（HTTPSでホストされている必要があります）。
URLは以下の形式である必要があります。 `https://my-app.com/.well-known/apple-app-site-association`


### 検証

アプリのサイトの関連付けが正しいかどうかは、iOS デバイス上で確認することができます。

`Settings` > `Developer` > `Universal Links` -> `Diagnostics` に移動します。URL (例: `https://my-app.com`) を入力すると、以下のような検証結果が表示されます。

![Diagnostics](../../../static/img/v4/docs/guides/autofill-credentials/diagnostics.png)

緑色のチェックマークは検証の設定に問題がないことを示し、黄色の警告は問題があることを示します。

#### その他の検証ツール
Appleは、関連付けを検証するための [Tool](https://search.developer.apple.com/appsearch-validation-tool/) を提供しています。注意:これは良い設定でも失敗するようです。

Branchは、リンク、content-type、JSON構造を検証する[ツール](https://branch.io/resources/aasa-validator)を提供しています。ただし、無効なJSONスキーマの場合は誤検出されます。

### クレデンシャルの保存

ユーザ名とパスワードの保存をネイティブのiOSパスワードマネージャで制御するには、 [capacitor-ios-autofill-save-password](https://github.com/cuongpl/capacitor-ios-autofill-save-password) プラグインを使用する必要があります。
```bash
npm install capacitor-ios-autofill-save-password
```

iOSをターゲットにしている場合、ログインに成功した後に認証情報を保存する必要があります（他のプラットフォームでは必要ありません）。
```typescript
if (Capacitor.getPlatform() === 'ios') {
    await SavePassword.promptDialog({
        username: '[the username that was entered]',
        password: '[the password that was entered]'
    });
}
```

上記のコードが呼び出されると、新しい認証情報を保存する場合、またはパスワードがデバイスに保存されたものと異なる場合に、以下のダイアログが表示されます。保存した認証情報が変更されていない場合は、このダイアログは表示されません。

![Save Credentials](../../../static/img/v4/docs/guides/autofill-credentials/save-password.png)

### 自動入力の動作
正しく設定された場合、アプリケーションには、ドメイン名とユーザー名が表示された以下のようなアクセサリバーが表示されます。これをタップすると、フォームに認証情報が自動入力されます。

もし、鍵のアイコンと「パスワード」のテキストしか表示されない場合は、最初の認証情報を保存する必要があるか、アプリケーションが誤って設定されている可能性があります。

![Autofill Credentials](../../../static/img/v4/docs/guides/autofill-credentials/auto-fill.png)


## Android向けの設定
Androidを対象とする場合は、[ディープリンクガイド](deep-links#android-configuration)に従ってください。

## Web向けの設定
Webを対象とする場合は、[ディープリンクスガイド](deep-links#details-website-configuration)に従ってください。

デバイスにアプリをインストールしている場合、iOSのSafariでWebサイトにアクセスすると、上部にアプリを開くためのオプションが表示されます。この動作を回避したい場合は、アプリケーション用に別のサブドメインを用意することを検討してください。

![iOS Safari](../../../static/img/v4/docs/guides/autofill-credentials/ios-safari.png)

## iOS トラブルシューティング
アプリケーションの設定を誤ると、iOS 上で認証情報を保存したり呼び出したりできなくなることがあります。

#### パスワードの自動入力のオプションが表示されません。何を確認すればよいですか？

- Capacitor Server Hostnameは、ウェブサイトのドメイン名と一致している必要があります。
- XCodeのBundle Identifierは、`apple-app-site-association`ファイルのBundle Identifierと一致しなければなりません。
- apple-app-site-association` ファイルの `AppID` をプレフィックスとする Team Identifier は、あなたの Apple Developer Account の Team Identifier と一致しなければなりません。
- 関連付けられたドメインは、XCodeでは `applinks:` という接頭辞を持っています。
- XCodeのAssociated Domainsは、あなたのウェブサイトのドメイン名と一致しなければなりません。
- apple-app-site-association` ファイルは `http` や自己署名証明書ではなく、信頼できる証明書による `https` 経由で提供されています。
- URL `https://my-app.com/.well-known/apple-app-site-association` がブラウザで表示可能である。
- apple-app-site-association` へのリクエストに対するレスポンスは `content-type` が `application/json` で返されます。
- apple-app-site-association` ファイルには **No** ファイル拡張子が使用されています。
- apple-app-site-association` ファイルは `.well-known` という名前のフォルダーにアップロードされました。
- リダイレクトは `apple-app-site-association` に **not** 使用されています。
- 少なくとも一組の認証情報を保存している（ユーザー名やパスワードを一度も入力していない場合、自動入力はできません）。

:::warning
`Apple-app-site-association` ファイルは Apple の CDN 経由でチェックされ、最大で 1 週間キャッシュされます。このため、初期チェック時に誤った設定をしていた場合、問題を修正しても動作しない可能性があります。また、適切な設定を誤ったファイルに変更しても、デバイスがあなたのドメインとアプリの関連付けをキャッシュしているため、あなたのアプリが機能しているように見える可能性があることを意味します。
:::

#### `AutoFill Credential Provider` capability は必要ですか？
いいえ、この capability は必要ありません。

#### Associated Domains に `webcredentials:domain` が必要ですか？
いいえ、関連付けられたドメインにある `applinks:domain` だけが必要です。

#### `apple-app-site-association` に `webcredentials` は必要ですか？
いいえ、`applinks`と`appID`プロパティだけが必要です。

#### Appleの検証ツールは、`Error cannot parse app site association`と報告します。
Appleのツールは、アプリケーションが認証情報を自動入力して保存しているにもかかわらず、エラーを報告します。Apple App Site Associationファイルを検証するには、Branchの [代替ツール](https://branch.io/resources/aasa-validator/) を使用してください。

#### Appleのドキュメントは、この説明書とは異なります。
Apple による [associated domains](https://developer.apple.com/documentation/xcode/supporting-associated-domains#Add-the-Associated-Domain-File-to-Your-Website) のドキュメントでは、配列である `appIDs` (と `components`) というプロパティを含む JSON の例が示されていますが、この手順では `appID` (と `paths`) というプロパティが含まれています。この記事の時点（2022年8月）とiOS 15.6でのテストでは、このドキュメントが正しく、AppleのJSON例のドキュメントが誤っているように見えます。これはiOSまたはドキュメントのバグである可能性があります。Appleはいくつかの実用的な例を持っています[ここ](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html#//apple_ref/doc/uid/TP40016308-CH12-SW1) 。