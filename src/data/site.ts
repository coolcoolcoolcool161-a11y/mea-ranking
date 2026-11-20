// サイト共通の設定。GA4測定IDはユーザーから提供され次第ここに入れる。
// 空のままならGA4スクリプトは出力されない。
export const SITE = {
  name: '紹介コードランキング',
  operator: 'メア',
  siteUrl: 'https://coolcoolcoolcool161-a11y.github.io/mea-ranking',
  description:
    '紹介コード・招待コードの特典額ランキング全19サービス比較。楽天モバイル13,000pt・モッピー7,000P・TikTok 6,000円分・ワラウ最大2,500pt・ハピタス最大2,300P・Freecash約1,430円相当など、特典額の大きい順に並べました。',
  dateModified: '2026-11-19',
  gaMeasurementId: '',
  xAccount: 'https://x.com/pppppuririn',
  hubUrl:
    'https://coolcoolcoolcool161-a11y.github.io/mea-poikatsu-media/',
} as const;

// Astro 5ではcontent collectionのentry.idに拡張子（.md）が付くため、URL用スラッグに変換する
export const slugOf = (id: string) => id.replace(/\.md$/, '');

export const CATEGORIES = [
  { slug: 'point-sites', name: 'ポイントサイト' },
  { slug: 'sns-video', name: '動画・SNS' },
  { slug: 'payment-bank', name: 'お金・決済・通信' },
  { slug: 'shopping', name: 'ショッピング' },
  { slug: 'game-entertainment', name: 'ゲーム・エンタメ' },
  { slug: 'new-apps', name: '新着ポイ活アプリ' },
  { slug: 'others', name: 'その他' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const CATEGORY_NAMES: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.name]),
);

// 特典額ランキング（旧サイトの表と同じ順序・金額で移行）
// 順位・金額順とずれている箇所も旧サイト通り（例：7位 Freecash 約1,430円相当 → 8位 TikTok Lite 1,400円分）。
export const RANKING = [
  { rank: 1, slug: 'rakuten-mobile', name: '楽天モバイル', benefit: '最大13,000pt', category: 'payment-bank' },
  { rank: 2, slug: 'moppy', name: 'モッピー', benefit: '最大7,000P', category: 'point-sites' },
  { rank: 3, slug: 'tiktok', name: 'TikTok', benefit: '6,000円分', category: 'sns-video' },
  { rank: 4, slug: 'warau', name: 'ワラウ', benefit: '最大2,500pt', category: 'point-sites' },
  { rank: 5, slug: 'hapitas', name: 'ハピタス', benefit: '最大2,300円分', category: 'point-sites' },
  { rank: 6, slug: 'olive', name: 'SMBC Olive', benefit: '1,000円相当', category: 'payment-bank' },
  { rank: 7, slug: 'freecash', name: 'Freecash', benefit: '約1,430円相当', category: 'game-entertainment', featured: true },
  { rank: 8, slug: 'tiktok-lite', name: 'TikTok Lite', benefit: '1,400円分', category: 'sns-video' },
  { rank: 9, slug: 'pokekatsu', name: 'ポケカツ', benefit: '1,300円分', category: 'game-entertainment' },
  { rank: 10, slug: 'mercari', name: 'メルカリ', benefit: '500円分', category: 'shopping' },
  { rank: 11, slug: 'paypay', name: 'PayPay', benefit: '300pt', category: 'payment-bank' },
  { rank: 12, slug: 'airwallet', name: 'エアウォレット', benefit: 'Ponta 300pt', category: 'payment-bank' },
  { rank: 13, slug: 'orikuji', name: 'オリくじ', benefit: 'くじプレゼント', category: 'game-entertainment' },
] as const;

// 姉妹ブログ（旧muse.ai URL。2026-11-21にGitHub Pagesの新URLへ更新済み）
export const SISTER_BLOGS = [
  {
    name: 'ポイ活ブログ（総合）',
    note: '全サービスをカテゴリ別カードで紹介する総合版。まず全体を見たい人に。',
    url: 'https://coolcoolcoolcool161-a11y.github.io/mea-poikatsu-blog/',
  },
  {
    name: 'ポイ活コード検索',
    note: 'サービス名やコードで検索して、目的のコードをすぐ見つけられる検索特化版。',
    url: 'https://coolcoolcoolcool161-a11y.github.io/mea-code-search/',
  },
  {
    name: 'ポイ活マガジン',
    note: '読み物スタイルでサービスを特集。じっくり読みながら選びたい人に。',
    url: 'https://coolcoolcoolcool161-a11y.github.io/mea-poikatsu-magazine/',
  },
  {
    name: 'かんたん紹介コード案内',
    note: '大きな文字とシンプルな案内で、初めての人でも迷わない初心者向け版。',
    url: 'https://coolcoolcoolcool161-a11y.github.io/mea-kantan-guide/',
  },
  {
    name: 'ゲームポイ活ブログ',
    note: 'Freecashなど、ゲームを遊んで貯めるサービスに特化した版。',
    url: 'https://coolcoolcoolcool161-a11y.github.io/mea-game-poikatsu/',
  },
] as const;

export const FAQS = [
  {
    q: '一番特典額が大きい紹介コードはどれですか？',
    a: '楽天モバイルの紹介キャンペーンです。他社から電話番号そのまま乗り換え（MNP）で13,000ポイント、乗り換え以外でも12,000ポイントがもらえます（初めての申し込み限定）。',
  },
  {
    q: '紹介コードはどこで入力しますか？',
    a: 'サービスごとに異なります。登録画面やアプリ内の紹介コード入力欄に入力するタイプ（モッピー、PayPay、オリくじ、メルカリなど）と、紹介リンクから登録するだけで自動適用されるタイプ（ハピタス、Freecash、楽天モバイルなど）があります。各サービスの記事ページに手順が書いてあります。',
  },
  {
    q: 'Freecashは7位なのに、なぜイチオシなのですか？',
    a: '特典額は約1,430円相当と中位なんだけど、対象のゲームをプレイするだけで報酬がもらえるから、条件達成のハードルが低くてスマホだけで完結するの✨ 金額の大きさだけじゃなくて「もらいやすさ」も含めて、メアがおすすめしているよ💖',
  },
  {
    q: '複数のサービスに登録しても大丈夫ですか？',
    a: 'はい。各サービスの紹介特典は基本的にそのサービスの新規登録が対象なので、サービスごとに1回ずつ特典を受けられます。同じサービスへの二重登録は規約違反になる場合があるので避けてください。',
  },
  {
    q: 'ランキングの順位は何で決まっていますか？',
    a: '紹介登録でもらえる特典の最大額（円・ポイント換算）を高い順に並べています。条件の達成しやすさはサービスごとに違うので、順位とあわせて各サービスの獲得条件も確認してください。',
  },
  {
    q: 'メアにも紹介報酬は入りますか？💖',
    a: 'はい。本ページの紹介リンク・紹介コードを経由して登録し、各サービスの条件を満たした場合、メアに紹介報酬が発生します。でも、あなたが受け取る特典額が減ったり、追加費用が発生したりすることはありません。詳しくは「広告・紹介報酬について」をご覧ください。',
  },
] as const;
