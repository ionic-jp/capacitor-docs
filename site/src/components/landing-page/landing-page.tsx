import { Component, Element } from '@stencil/core';


@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss'
})
export class LandingPage {

  @Element() el: Element;

  constructor() {
    let root: any = document.querySelector('capacitor-site');
    root.isLandingPage = true;
    document.title = `Capacitor: Universal Web Applications`;
  }

  componentDidUnload() {
    let root: any = document.querySelector('capacitor-site');
    root.isLandingPage = false;
  }

  render() {
    return [
      // <div class="announcement container">
      //   <stencil-route-link url="/blog/" >
      //     <span class="pill">New</span>
      //     <span class="message">
      //       Announcing Capacitor 1.0.0 Beta
      //     </span>
      //     <span class="cta">
      //       Read Post
      //       <app-icon name="caret-right"></app-icon>
      //     </span>
      //   </stencil-route-link>
      // </div>,

      <div class="container">
        <section class="hero">
          <hgroup>
            <h1 id="action-call">Native BridgeによるWebアプリのクロスプラットフォーム化</h1>
            <h3>
              ひとつのコードベースで、iOS、Android、Electron、WebのNative SDKを呼び出します。
              Ionic Frameworkアプリケーションに最適化しつつも、任意のWebアプリケーションフレームワークで使用できます。
            </h3>
            <stencil-route-link url="/docs/getting-started/">
              <button id="get-started">
                はじめよう
              </button>
            </stencil-route-link>
            <h5>サポート</h5>
            <img alt="Apple, Android, Electron, PWA" src="/assets/img/supported-env.png"></img>
          </hgroup>
          <div class="hero-illustration">
            <img src="/assets/img/capacitor-hero.jpg"></img>
          </div>
        </section>

        <section class="points">
            <div class="points__item points__item--crossplatform">
              <h2>クロスプラットフォーム</h2>

              <p>
                iOS、Android、Electron、Progressive Web Appsとして
                それぞれ同じように機能するWebアプリケーションを構築する
            </p>
          </div>
          <div class="points__item points__item--nativeaccess">
            <h2>Nativeアクセス</h2>

            <p>
              各プラットフォームのすべてのNative SDKにアクセスすることができ
              アプリストア（もちろんWebにも！）に簡単にデプロイできます。
            </p>
          </div>
          <div class="points__item points__item--simple">
            <h2>Ionicと使う</h2>
            <p>
              CapacitorはWebアプリにNative機能を提供し、
              Ionic Frameworkに最適化されています
            </p>
          </div>
          <div class="points__item points__item--webnative">
            <h2>Web Native</h2>
            <p>
              標準化されたウェブテクノロジーを使って何十年も機能するアプリを構築し、
              アプリストアやモバイルウェブ上のユーザーに簡単に届ける。
            </p>
          </div>
          <div class="points__item points__item--extensible">
            <h2>拡張可能</h2>

            <p>
              シンプルなPlugin APIでカスタムのNative機能を簡単に追加したり、
              互換性レイヤで既存のCordovaプラグインを使用したりできます。
            </p>
          </div>
          <div class="points__item points__item--opensource">
            <h2>オープンソース</h2>

            <p>
              Capacitor完全にオープンソース(MIT)であり、
              <a href="http://ionicframework.com/">Ionic</a>とそのコミュニティーによって保守されています。
            </p>
          </div>
      </section>
    </div>,
    <newsletter-signup></newsletter-signup>
    ];
  }
}
