---
title: Capacitorプラグイン
description: Capacitorプラグイン
---

import DocsCard from '@components/global/DocsCard';
import DocsCards from '@components/global/DocsCards';

# Capacitorプラグイン

Capacitorのプラグインは、JavaScriptがNative APIと直接インターフェースすることを可能にします。

<DocsCards>
  <DocsCard 
    header="Official plugins" 
    img="/img/v5/docs/capacitor-card.png"
    href="/apis"
  >
    <p>
      Official Plugins are maintained by the Capacitor Team
    </p>
  </DocsCard>
  <DocsCard 
    header="Community plugins"
    img="/img/v5/docs/community-card.png"
    href="/plugins/community"
  >
    <p>
      Community Plugins are maintained by the Capacitor Community
    </p>
  </DocsCard>
</DocsCards>

<br/>

Web アプリはプラグインを使用して Native API の完全なパワーにアクセスできます。プラグインは、プラットフォーム間で非常に異なる API を使用する可能性のある共通のネイティブ操作をラップする一方で、一貫したクロスプラットフォーム API を JavaScript に公開します。

さらに、Capacitorのプラグイン機能により、従来のネイティブ開発者とWeb開発者が混在するチームが、アプリの異なる部分について共同で作業することが可能になります。

Capacitorはクライアント上で自動的にJavaScriptフックを生成するため、ほとんどのプラグインは、iOSではSwift/Obj-C、AndroidではJava/Kotlinを使用するだけで済みます。もちろん、プラグイン用にカスタムJavaScriptを追加することも可能です。
