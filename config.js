// 占いの設定ファイル

// 干支の配列
export const zodiacSigns = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

// 星座の配列と日付範囲
export const constellations = [
    { name: "山羊座", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { name: "水瓶座", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { name: "魚座", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { name: "牡羊座", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { name: "牡牛座", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { name: "双子座", startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
    { name: "蟹座", startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
    { name: "獅子座", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { name: "乙女座", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { name: "天秤座", startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
    { name: "蠍座", startMonth: 10, startDay: 24, endMonth: 11, endDay: 22 },
    { name: "射手座", startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 }
];

// 星座の元素マッピング
export const elementMap = {
    "牡羊座": "火", "獅子座": "火", "射手座": "火",
    "牡牛座": "地", "乙女座": "地", "山羊座": "地",
    "双子座": "風", "天秤座": "風", "水瓶座": "風",
    "蟹座": "水", "蠍座": "水", "魚座": "水"
};

// 相性の良い元素の組み合わせ
export const compatibleElements = {
    "火": "風", "風": "火",
    "地": "水", "水": "地"
};

// メッセージの設定
export const messages = {
    excellent: name => `運命的な出会いかもしれません！${name}%という素晴らしい相性です。`,
    good: name => `${name}%の相性で、とても良い関係を築けそうです。`,
    normal: name => `${name}%の相性です。時間をかけて理解を深められそうです。`,
    challenging: name => `${name}%の相性です。違いを活かして新しい発見があるかもしれません！`
};

// 相性の重み付け設定
export const weights = {
    name: 0.3,
    zodiac: 0.35,
    constellation: 0.35
};