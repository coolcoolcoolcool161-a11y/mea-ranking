// S03 ポイランク：編集スコアの算出モジュール。
// 事実の正は ~/workspace/site-migration/work/services-data.json（このファイルはそこから読み込む）。
// スコアは「編集スコア」：公式に確認できる事実（特典額・条件の項目数・キャンペーン期限）だけから
// 下記の決定式で算出する。実測・検証の結果ではない。ページ上の「スコアの算出方法」セクションの
// 説明文と、このファイルの式は一致させること（片方だけ変えない）。
import data from '../../../work/services-data.json';

export interface ServiceFacts {
  slug: string;
  name: string;
  code: string | null;
  friendCode?: string | null;
  url: string | null;
  benefit: string;
  conditions: string[];
  deadline: string | null;
  verified: string;
}

export interface ScoredService extends ServiceFacts {
  /** 特典の円換算額（公式レートで換算できるものだけ）。換算できない特典は null */
  benefitYen: number | null;
  scores: {
    benefit: number; // 特典額スコア（0-100）
    ease: number; // 条件の手軽さスコア（0-100）
    deadline: number; // 期限の余裕スコア（0-100）
    total: number; // 総合スコア（0-100）
  };
  /** 同点時のタイブレーク用おすすめ優先度（小さいほど先） */
  priority: number;
  /** services-data.json 内の元の並び（最終タイブレーク） */
  index: number;
}

// 特典の円換算額。根拠は services-data.json の benefit / conditions の公式表記のみ：
// - 金額がそのまま書かれているもの（Freecash 1,430円分、モッピー最大7,000P=円相当、TikTok 6,000円分 等）
// - 公式レートが明記されているもの（ワラウ 1pt＝1円→最大2,500円、ハピタス 1P＝1円→最大2,300円、
//   サンポ 110pt≒1円→4,000pt≒36円、ぶたまる 500pt＝50円分）
// - 「円相当」「円分」と明記されているもの（Olive 1,000円相当、エアウォレット 300円分、メルカリ 500円分、PayPay 300pt=300円相当）
// 円換算できない特典（ポケカツの割引率、Museのトークン、ミラポイの金額非公開、トクエルの未確認レート、
// オリくじの未確認レート、dipsのアイテム特典）は null とし、特典額スコアは中位の50点として扱う。
const BENEFIT_YEN: Record<string, number | null> = {
  freecash: 1430,
  warau: 2500,
  hapitas: 2300,
  moppy: 7000,
  tiktok: 6000,
  'tiktok-lite': 1400,
  'rakuten-mobile': 13000,
  paypay: 300,
  olive: 1000,
  airwallet: 300,
  mercari: 500,
  orikuji: null,
  pokekatsu: null,
  muse: null,
  sampo: 36,
  butamaru: 50,
  mirapoi: null,
  tokueru: null,
  dips: null,
};

// 同点時のおすすめ優先度（ユーザー決定の推奨順位）：
// Freecash → ワラウ → TikTok系（本家→Lite）→ モッピー → ハピタス → その他
const PRIORITY: Record<string, number> = {
  freecash: 0,
  warau: 1,
  tiktok: 2,
  'tiktok-lite': 3,
  moppy: 4,
  hapitas: 5,
};
const PRIORITY_DEFAULT = 6;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** 特典額スコア：円換算額の対数スケール（最大額13,000円を100点とする）。換算不可は中位50点。 */
export const benefitScore = (yen: number | null): number =>
  yen === null ? 50 : Math.round((100 * Math.log10(yen + 1)) / Math.log10(13000 + 1));

/** 条件の手軽さスコア：公式条件の項目数 n から算出（項目が少ないほど高い）。n=1→100、2→74、3→59、4→49、5→42 */
export const easeScore = (conditionCount: number): number =>
  Math.round(100 / (1 + 0.35 * Math.max(0, conditionCount - 1)));

/** 期限の余裕スコア：期限までの残り日数×2（上限90）。期限の公表がない恒常特典は中位50点。 */
export const deadlineScore = (deadline: string | null, today: Date): number => {
  if (!deadline) return 50;
  const m = deadline.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return 50;
  const end = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 23, 59, 59);
  const days = Math.ceil((end.getTime() - today.getTime()) / 86400000);
  return clamp(Math.round(days * 2), 5, 90);
};

/** 総合スコア：特典額50%＋手軽さ30%＋期限の余裕20%の加重平均 */
export const totalScore = (benefit: number, ease: number, deadline: number): number =>
  Math.round(0.5 * benefit + 0.3 * ease + 0.2 * deadline);

export type SortAxis = 'total' | 'benefit' | 'ease' | 'deadline';

export const AXIS_LABELS: Record<SortAxis, string> = {
  total: '総合スコア',
  benefit: '特典額',
  ease: '条件の手軽さ',
  deadline: '期限の余裕',
};

/** 並び替え：選択したスコアの降順 → おすすめ優先度 → 元の並び、で決定する */
export const sortServices = (list: ScoredService[], axis: SortAxis): ScoredService[] =>
  [...list].sort(
    (a, b) =>
      b.scores[axis] - a.scores[axis] || a.priority - b.priority || a.index - b.index,
  );

const today = new Date();

export const SCORED_SERVICES: ScoredService[] = (data.services as ServiceFacts[]).map(
  (s, index) => {
    const benefitYen = BENEFIT_YEN[s.slug] ?? null;
    const benefit = benefitScore(benefitYen);
    const ease = easeScore(s.conditions.length);
    const deadline = deadlineScore(s.deadline, today);
    return {
      ...s,
      benefitYen,
      scores: { benefit, ease, deadline, total: totalScore(benefit, ease, deadline) },
      priority: PRIORITY[s.slug] ?? PRIORITY_DEFAULT,
      index,
    };
  },
);

/** サービス情報の最終確認日（全サービスの verified の最大値） */
export const LAST_VERIFIED: string = SCORED_SERVICES.reduce(
  (max, s) => (s.verified > max ? s.verified : max),
  '',
);
