---
title: UIの構築
description: 優れたCapacitorモバイルアプリを構築するための人気のあるUIオプション
slug: /getting-started/ui
---

# UIの構築

Capacitorアプリは基本的にウェブアプリです。しかし、優れたネイティブ品質のモバイルアプリを提供するには、単にウェブサイトをラップするだけでは不十分です。

今日、チームにはアプリのUIに関してさまざまなオプションがあります。最も人気のあるオプションのいくつかを見てみましょう。

## Ionic Framework

[Ionic Framework](https://ionicframework.com/)は、Capacitorを使用するウェブ開発者がプラットフォームの規約に従ったネイティブ品質のアプリ体験を得るためのモバイル向けUIキットおよびユーティリティのセットです。Ionic FrameworkはCapacitorを作成した会社によって作成されており、Capacitorを念頭に置いて設計されています。

今日、Ionic FrameworkはCapacitorにとって推奨されるUIフレームワークです。なぜなら、チームが最高品質のネイティブアプリ体験を達成するのに役立つと信じているからです。しかし、それを使用することはCapacitorアプリにおいて必須ではありません。

Ionic Frameworkは、[Angular](https://ionicframework.com/docs/angular/navigation)、[React](https://ionicframework.com/docs/react/navigation)、および[Vue](https://ionicframework.com/docs/vue/navigation)のためのネイティブ品質のトランジションとルーティングを備えており、各フレームワークで最も人気のあるルーティングソリューションに深く統合されています。さらに、Ionicには[モーダル](https://ionicframework.com/docs/api/modal)、[メニュー](https://ionicframework.com/docs/api/menu)、[リスト](https://ionicframework.com/docs/api/list)などの強力なコンポーネントや、[スライディングアイテム](https://ionicframework.com/docs/api/item-sliding)、[フォーム入力](https://ionicframework.com/docs/api/input)、[日時ピッカー](https://ionicframework.com/docs/api/datetime)、[カード](https://ionicframework.com/docs/api/card)、[タブ](https://ionicframework.com/docs/api/tabs)、[iOSスタイルの凝縮ヘッダー](https://ionicframework.com/docs/api/header#condensed-header)などの強力なアイテム機能が備わっています。

Ionic FrameworkはAngular、React、またはVueを必要とするため、これらの技術を使用しているチームにのみ適しています。

始めるには、[IonicとCapacitorの使用](./with-ionic)ドキュメントを参照してください。

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/)は、多くのCapacitor開発者が優れたアプリ体験を構築するために使用する人気のあるCSSフレームワークで、コンパニオンUIテンプレートライブラリもあります。私たちのお気に入りの例には、[Reflect](https://reflect.app/)や[LogSnag](https://twitter.com/ImSh4yy/status/1615080429417103366?s=20&t=bmVrAb9PNFY6AQPNXwMFYA)があります。

また、[Konsta UI](https://konstaui.com/)などの興味深いTailwind中心のモバイルUIフレームワークもあります。

Tailwindを使用する際には、Tailwindがモバイルスタイルのナビゲーションおよびルーティングのプリミティブを提供しないことを念頭に置くことが重要です。そのため、チームはプラットフォームの規約に合ったUXを構築する必要があります。一つの方法として、TailwindとIonic Frameworkを組み合わせる方法があります。この[Next.js + Tailwind + Ionic Framework + Capacitorテンプレート](https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter)を参照してください。もう一つの方法として、従来の前進/後退ナビゲーションを避け、タブやモーダルを使用するUXを設計することがあります。最後に、必要に応じてカスタムナビゲーションおよびルーティング体験を構築することもできます。

## Framework7

[Framework7](https://framework7.io/)は、強力なモバイルタッチスライダーライブラリである[Swiper](https://swiperjs.com/)の開発者によって作成された人気のあるモバイル向けUIライブラリです。

## Quasar

[Quasar](https://quasar.dev/)は、モバイル向けコンポーネントを備えたVue.jsフレームワークで、[Capacitorの公式サポート](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/introduction#introduction)があります。

## Material UI

[Material UI](https://mui.com/)は、Material Designガイドラインを実装した人気のあるReact中心のライブラリです。

## 独自のUIを作成する

既存のUIキットを持っている場合や独自に実装したい場合は、Ionic Frameworkやここで紹介した他のオプションを参考にすることをお勧めします。Capacitorは夢を実現するための白紙の状態を提供しますが、独自のUIを作成する場合、ユーザーが期待する優れた体験を構築する責任があります。これはアプリの構築に加えて挑戦となることがあるため、非常に高度なチームやすでにモバイル最適化されたウェブアプリに対してのみ一般的に推奨されます。
