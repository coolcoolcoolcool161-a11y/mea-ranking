# 紹介コードランキング（mea-ranking）

メアのポイ活メディア「紹介コードランキング」の独立サイト版。Astro＋Markdownで構築し、Cloudflare Pages（Free）で公開する。旧サイト（muse.ai）は移行完了＋ユーザー最終承認があるまで削除しない。

## 公開URL（暫定）

- https://mea-ranking.pages.dev （Cloudflare Pagesのプロジェクト作成時にサブドメインが確定したら `astro.config.mjs`・`public/robots.txt`・`public/sitemap.xml` のURLを書き換えること）

## 内容

- 記事：全19サービス分の個別記事ページ（`src/content/articles/`）。ランキング表13件（順位データは `src/data/site.ts` の `RANKING`）＋新着アプリ5件＋Muse1件
- トップページ：特典額トップ3、Freecash特集、Muse紹介、ランキング表13件（条件の要約＋記事ページへのリンク）、新着アプリ5件、カテゴリ別ランキング、特典のもらい方、FAQ、姉妹ブログ
- カテゴリページ：ポイントサイト／動画・SNS／お金・決済・通信／ショッピング／ゲーム・エンタメ／新着ポイ活アプリ／その他
- サイト内検索：`/search/`（ビルド時に `/search-index.json` を生成し、ブラウザ内で絞り込み）
- 法務ページ：広告・紹介報酬に関する表記／プライバシーポリシー／利用規約・免責事項（旧サイトの文言をそのまま移行）
- SEO：ページごとの固有title・meta description・canonical・XMLサイトマップ・robots.txt・OGP・JSON-LD（WebPage／ItemList／FAQPage／Article／BreadcrumbList）・パンくず・内部リンク・モバイル対応。JavaScriptなしでも記事本文はHTMLに含まれる。

## 紹介コード・URLの扱い

- コード・紹介URL・特典額・条件は `src/content/articles/*.md` のfrontmatterと本文に記載。変更するときは `~/workspace/*-referral-post.txt` と台帳 `~/workspace/site-migration-inventory.md` §4.1 で照合すること。
- **注意：ワラウの紹介URLは `https://www.warau.jp/friend/reg/bEs5`、コードは `bEs7`。公式バナーHTMLの `/boav` は別物で使わないこと。**
- ワラウのレートは公式確認で **1pt＝1円**（ワラウコインは別物で10コイン＝1pt）。
- Freecashの招待された側は約1,430円相当（「約1,500円分」は誤りで使わないこと）。
- ランキング表の順位・金額は旧サイト通り。金額順とずれている箇所（7位 Freecash 約1,430円相当 → 8位 TikTok Lite 1,400円分）も旧サイトの順序を維持している。

## 広告

- 忍者AdMaxの同期タグ2枠（SP ID 1239768・PC ID 1239769）を `src/components/AdSlot.astro` で3箇所（トップページ）・2箇所（記事ページ）に配置。同一タグの複数箇所流用は公式未確認のため、PCで表示されない場合は箇所ごとに枠を作り直すこと。

## GA4（未設定）

- 測定IDは `src/data/site.ts` の `gaMeasurementId` に入れる。空のままならGA4スクリプトは出力されない。GA4プロパティの作成はユーザーのGoogleアカウントでの操作が必要。

## 開発・ビルド

```bash
npm install
npm run dev      # 開発サーバー
npm run build    # 静的HTMLを dist/ に出力
npm run preview  # ビルド結果の確認
```

## デプロイ（Cloudflare Pages）

1. Cloudflareアカウントを作成する（ユーザー側作業。2026-11-20時点ではTurnstileのため未作成）。
2. Cloudflare Pagesでプロジェクト作成 → このGitHubリポジトリを接続。
3. ビルド設定：フレームワークプリセット `Astro`、ビルドコマンド `npm run build`、出力ディレクトリ `dist`。
4. デプロイ後、Search Consoleでサイトマップ（`/sitemap.xml`）を送信し、所有権確認（HTMLファイル／メタタグ方式）を行う。

## 画像について

- `public/images/` の6ファイル（ヒーロー、Freecash HQバナー、Muse HQバナー、公式細型バナー3枚）は旧サイトで表示されていたものと同一バイト（SHA256照合済み）。
- **注意：このリポジトリへの画像（バイナリ）アップロードは、MuseのGitHub連携（push_files）ではUTF-8テキストのみ対応のため行えない。** 画像はGitHub Web UIのドラッグ＆ドロップで `public/images/` にアップロードするか、gitコマンドで直接プッシュすること。アップロードが済むまで、デプロイ先では画像が表示されない。

## 旧サイトとの対応

- 旧URL：https://muse.ai/s/shao-jie-kodorankingu-jxj6xcxsxfxqxj6xqx0/OqiA00u9xkaSI9_7bBwCrskhhMRQu3SkOvHqtDonW84（v19・公開中）
- 旧サイトの301リダイレクトはmuse.ai共有URLでは不可のため、移行完了後は旧ページに移転案内と新URLへのリンクを掲示する。
- 旧サイトのインタラクティブな表（カテゴリ絞り込み・並び替え）は、静的サイトではカテゴリページ＋サイト内検索で代替した。各行の「条件・原文を見る」は記事ページに全文を移行し、表の行には条件の要約と記事へのリンクを載せている。
