/**
 * Category and neighbourhood metadata, kept separate from places.json so the
 * data file stays pure and trivially editable.
 *
 * `icon` values are raw SVG path `d` strings drawn on a 24×24 grid.
 */

export interface CategoryMeta {
  en: string;
  zh: string;
  icon: string;
}

export interface NeighborhoodMeta {
  en: string;
  zh: string;
  district?: string;
}

/** Display order: eat → drink → see → explore. Categories absent from this
 *  list are appended alphabetically at the end. */
export const CATEGORY_ORDER = [
  'Cantonese & Dim Sum',
  'Chaoshan & Hakka',
  'Sichuan & Hunan',
  'Hotpot',
  'BBQ & Skewers',
  'Noodles & Dumplings',
  'Fine Dining',
  'International',
  'Japanese & Korean',
  'Brunch & Casual',
  'Cafes',
  'Tea & Sweets',
  'Bars & Nightlife',
  'Food Streets & Markets',
  'Parks & Waterfront',
  'Museums & Galleries',
  'Architecture & Views',
  'Neighborhoods & Villages',
  'Hikes & Beaches',
  'Books & Music',
] as const;

export const CATEGORIES: Record<string, CategoryMeta> = {
  'Cantonese & Dim Sum': {
    en: 'Cantonese & Dim Sum',
    zh: '粤菜 · 点心',
    // steamer basket
    icon: 'M3 10h18M4 10a8 8 0 0 0 16 0M12 4v2M8 14h8M9 17h6',
  },
  'Chaoshan & Hakka': {
    en: 'Chaoshan & Hakka',
    zh: '潮汕 · 客家',
    // drumstick
    icon: 'M14.5 3.5a5 5 0 0 0-6.6 6.6l-4 4a2.5 2.5 0 1 0 3.5 3.5l4-4a5 5 0 0 0 6.6-6.6 3 3 0 0 1-3.5-3.5Z',
  },
  'Sichuan & Hunan': {
    en: 'Sichuan & Hunan',
    zh: '川菜 · 湘菜',
    // chilli
    icon: 'M9 5c0-1.5 1.5-2.5 3-2M12 4c4 0 7 3 7 7 0 5-4 9-9 9-3 0-5-2-5-4 0-3 4-4 7-6 2-1.3 2-4 0-6Z',
  },
  Hotpot: {
    en: 'Hotpot',
    zh: '火锅',
    // pot with steam
    icon: 'M4 11h16v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-4ZM2 11h20M8 8c0-1 1-1 1-2M12 7c0-1 1-1 1-2M16 8c0-1 1-1 1-2',
  },
  'BBQ & Skewers': {
    en: 'BBQ & Skewers',
    zh: '烧烤 · 串',
    // skewer
    icon: 'M4 20 20 4M8 12l2 2M11 9l2 2M14 6l2 2',
  },
  'Noodles & Dumplings': {
    en: 'Noodles & Dumplings',
    zh: '面 · 饺',
    // bowl with chopsticks
    icon: 'M3 11h18a9 9 0 0 1-18 0ZM14 3l4 6M17 3l2 6',
  },
  'Fine Dining': {
    en: 'Fine Dining',
    zh: '精致餐饮',
    // wine glass
    icon: 'M8 3h8l-1 6a3 3 0 0 1-6 0L8 3ZM12 12v7M9 21h6',
  },
  International: {
    en: 'International',
    zh: '国际风味',
    // fork and knife
    icon: 'M7 3v7a2 2 0 0 0 4 0V3M9 10v11M17 3c-2 2-2 6-2 8h2v10',
  },
  'Japanese & Korean': {
    en: 'Japanese & Korean',
    zh: '日料 · 韩料',
    // sushi
    icon: 'M4 12a8 5 0 0 1 16 0 8 5 0 0 1-16 0ZM8 12h8',
  },
  'Brunch & Casual': {
    en: 'Brunch & Casual',
    zh: '早午餐',
    // fried egg
    icon: 'M12 5c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7Zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  },
  Cafes: {
    en: 'Cafes',
    zh: '咖啡',
    // coffee cup
    icon: 'M4 8h13v6a5 5 0 0 1-10 0V8ZM17 10h2a2 2 0 0 1 0 4h-2M3 21h15M8 3c0 1 1 1 1 2M12 3c0 1 1 1 1 2',
  },
  'Tea & Sweets': {
    en: 'Tea & Sweets',
    zh: '茶饮 · 甜品',
    // bubble tea
    icon: 'M7 4h10l-1.5 16h-7L7 4ZM6 4h12M10 9l-1 9M14 9l1 9',
  },
  'Bars & Nightlife': {
    en: 'Bars & Nightlife',
    zh: '酒吧 · 夜生活',
    // cocktail glass
    icon: 'M4 4h16l-8 8v8M8 20h8M7 7h10',
  },
  'Food Streets & Markets': {
    en: 'Food Streets & Markets',
    zh: '美食街 · 市集',
    // market awning
    icon: 'M3 9h18v11H3V9ZM3 9l2-5h14l2 5M8 9v3a2 2 0 0 0 4 0V9M12 9v3a2 2 0 0 0 4 0V9',
  },
  'Parks & Waterfront': {
    en: 'Parks & Waterfront',
    zh: '公园 · 水岸',
    // tree
    icon: 'M12 3 6 12h3l-3 5h12l-3-5h3L12 3ZM12 17v4',
  },
  'Museums & Galleries': {
    en: 'Museums & Galleries',
    zh: '美术馆 · 展馆',
    // classical building
    icon: 'M3 9 12 4l9 5M5 9v10M19 9v10M9 9v10M15 9v10M3 20h18',
  },
  'Architecture & Views': {
    en: 'Architecture & Views',
    zh: '建筑 · 观景',
    // towers
    icon: 'M4 21V7l5-3v17M13 21V10l5-2v13M3 21h18M6 10h1M6 14h1M15 13h1M15 17h1',
  },
  'Neighborhoods & Villages': {
    en: 'Neighborhoods & Villages',
    zh: '街区 · 古村',
    // houses
    icon: 'M3 11l5-4 5 4v9H3v-9ZM13 20v-6l4-3 4 3v6M6 15h2M6 18h2',
  },
  'Hikes & Beaches': {
    en: 'Hikes & Beaches',
    zh: '山 · 海',
    // mountain and sun
    icon: 'M2 19l7-11 4 6 2-3 7 8H2ZM17 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z',
  },
  'Books & Music': {
    en: 'Books & Music',
    zh: '书店 · 现场',
    // open book with note
    icon: 'M12 6C10 4 6 4 3 5v13c3-1 7-1 9 1 2-2 6-2 9-1V5c-3-1-7-1-9 1ZM12 6v13M17 3v6M17 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z',
  },
};

export const NEIGHBORHOODS: Record<string, NeighborhoodMeta> = {
  'Futian CBD': { en: 'Futian CBD', zh: '福田中心', district: 'Futian' },
  Huaqiangbei: { en: 'Huaqiangbei', zh: '华强北', district: 'Futian' },
  Lianhuashan: { en: 'Lianhuashan', zh: '莲花山', district: 'Futian' },
  Chegongmiao: { en: 'Chegongmiao', zh: '车公庙', district: 'Futian' },
  Shuiwei: { en: 'Shuiwei', zh: '水围', district: 'Futian' },
  Shangxiasha: { en: 'Shangxiasha', zh: '上下沙', district: 'Futian' },
  'Nanshan Center': { en: 'Nanshan Center', zh: '南山中心', district: 'Nanshan' },
  Houhai: { en: 'Houhai', zh: '后海', district: 'Nanshan' },
  Keyuan: { en: 'Keyuan / Tech Park', zh: '科技园', district: 'Nanshan' },
  OCT: { en: 'OCT', zh: '华侨城', district: 'Nanshan' },
  'OCT-LOFT': { en: 'OCT-LOFT', zh: '华侨城创意园', district: 'Nanshan' },
  Nantou: { en: 'Nantou Old Town', zh: '南头古城', district: 'Nanshan' },
  Shekou: { en: 'Shekou', zh: '蛇口', district: 'Nanshan' },
  'Sea World': { en: 'Sea World', zh: '海上世界', district: 'Nanshan' },
  Qianhai: { en: 'Qianhai', zh: '前海', district: 'Nanshan' },
  Luohu: { en: 'Luohu', zh: '罗湖', district: 'Luohu' },
  Dongmen: { en: 'Dongmen', zh: '东门', district: 'Luohu' },
  KK100: { en: 'KK100', zh: '京基100', district: 'Luohu' },
  Yantian: { en: 'Yantian', zh: '盐田', district: 'Yantian' },
  "Bao'an": { en: "Bao'an", zh: '宝安', district: "Bao'an" },
  Longhua: { en: 'Longhua', zh: '龙华', district: 'Longhua' },
  Guanlan: { en: 'Guanlan', zh: '观澜', district: 'Longhua' },
  Buji: { en: 'Buji', zh: '布吉', district: 'Longgang' },
  Longgang: { en: 'Longgang', zh: '龙岗', district: 'Longgang' },
  Pingshan: { en: 'Pingshan', zh: '坪山', district: 'Pingshan' },
  Dapeng: { en: 'Dapeng', zh: '大鹏', district: 'Dapeng' },
  Guangming: { en: 'Guangming', zh: '光明', district: 'Guangming' },
  Shajing: { en: 'Shajing', zh: '沙井', district: "Bao'an" },
};

export const TAGS: Record<string, { en: string; zh: string }> = {
  'late-night': { en: 'Late night', zh: '夜宵' },
  cheap: { en: 'Cheap', zh: '便宜' },
  queue: { en: 'Expect a queue', zh: '要排队' },
  'book-ahead': { en: 'Book ahead', zh: '需预订' },
  groups: { en: 'Good for groups', zh: '适合聚会' },
  date: { en: 'Date spot', zh: '约会' },
  'solo-ok': { en: 'Fine solo', zh: '一人食' },
  family: { en: 'Family friendly', zh: '亲子' },
  free: { en: 'Free', zh: '免费' },
  view: { en: 'The view', zh: '景观' },
  skyline: { en: 'Skyline', zh: '天际线' },
  sunset: { en: 'Sunset', zh: '日落' },
  night: { en: 'Best at night', zh: '夜景' },
  wander: { en: 'Wander', zh: '漫步' },
  design: { en: 'Design', zh: '设计' },
  art: { en: 'Art', zh: '艺术' },
  historic: { en: 'Historic', zh: '历史' },
  local: { en: 'Local', zh: '在地' },
  'local-brand': { en: 'Born in Shenzhen', zh: '深圳品牌' },
  'local-specialty': { en: 'Local speciality', zh: '深圳特产' },
  seafood: { en: 'Seafood', zh: '海鲜' },
  spicy: { en: 'Spicy', zh: '辣' },
  'dim-sum': { en: 'Dim sum', zh: '点心' },
  light: { en: 'Light', zh: '清淡' },
  casual: { en: 'Casual', zh: '随意' },
  specialty: { en: 'Specialty coffee', zh: '精品咖啡' },
  gift: { en: 'Good gift', zh: '适合送礼' },
  'breakfast': { en: 'Breakfast', zh: '早餐' },
  brunch: { en: 'Brunch', zh: '早午餐' },
  lunch: { en: 'Lunch', zh: '午餐' },
  dinner: { en: 'Dinner', zh: '晚餐' },
  coffee: { en: 'Coffee', zh: '咖啡' },
  tea: { en: 'Tea', zh: '茶' },
  beer: { en: 'Beer', zh: '啤酒' },
  cocktails: { en: 'Cocktails', zh: '鸡尾酒' },
  bakery: { en: 'Bakery', zh: '烘焙' },
  snack: { en: 'Snack', zh: '小食' },
  dessert: { en: 'Dessert', zh: '甜品' },
  vegan: { en: 'Vegetarian', zh: '素食' },
  vegetarian: { en: 'Vegetarian', zh: '素食' },
  'tasting-menu': { en: 'Tasting menu', zh: '套餐' },
  western: { en: 'Western', zh: '西餐' },
  expat: { en: 'Expat haunt', zh: '老外聚集' },
  'share-table': { en: 'Shared tables', zh: '拼桌' },
  craft: { en: 'Craft', zh: '讲究' },
  adventurous: { en: 'Adventurous', zh: '猎奇' },
  'street-food': { en: 'Street food', zh: '街头小吃' },
  market: { en: 'Market', zh: '市场' },
  morning: { en: 'Go early', zh: '趁早' },
  seasonal: { en: 'Seasonal', zh: '时令' },
  'day-trip': { en: 'Day trip', zh: '一日游' },
  overnight: { en: 'Stay overnight', zh: '过夜' },
  weekend: { en: 'Weekend', zh: '周末' },
  weekday: { en: 'Better on weekdays', zh: '工作日更佳' },
  hike: { en: 'Hike', zh: '徒步' },
  hard: { en: 'Hard', zh: '强度大' },
  quick: { en: 'Quick', zh: '快捷' },
  beach: { en: 'Beach', zh: '海滩' },
  surf: { en: 'Surf', zh: '冲浪' },
  waterfall: { en: 'Waterfall', zh: '瀑布' },
  running: { en: 'Running', zh: '跑步' },
  cycling: { en: 'Cycling', zh: '骑行' },
  green: { en: 'Green', zh: '绿化' },
  walking: { en: 'Walking route', zh: '步道' },
  quiet: { en: 'Quiet', zh: '安静' },
  crowded: { en: 'Crowded', zh: '人多' },
  outdoor: { en: 'Outdoor seating', zh: '户外' },
  waterfront: { en: 'Waterfront', zh: '滨水' },
  photo: { en: 'Photo spot', zh: '出片' },
  instagram: { en: 'Photogenic', zh: '出片' },
  architecture: { en: 'Architecture', zh: '建筑' },
  industrial: { en: 'Industrial', zh: '工业风' },
  new: { en: 'Recently opened', zh: '新' },
  museum: { en: 'Museum', zh: '博物馆' },
  garden: { en: 'Garden', zh: '园林' },
  temple: { en: 'Temple', zh: '寺庙' },
  history: { en: 'History', zh: '历史' },
  border: { en: 'Border', zh: '边境' },
  permit: { en: 'Permit needed', zh: '需通行证' },
  unique: { en: 'Nowhere else', zh: '独一无二' },
  'must-do': { en: 'Must do', zh: '必去' },
  'tourist-fun': { en: 'Tourist fun', zh: '游客向' },
  reliable: { en: 'Reliable', zh: '稳定' },
  mall: { en: 'In a mall', zh: '商场内' },
  shopping: { en: 'Shopping', zh: '购物' },
  ticketed: { en: 'Ticketed', zh: '需购票' },
  'winter-birds': { en: 'Winter birding', zh: '冬季观鸟' },
  spring: { en: 'Best in spring', zh: '春季最佳' },
  summer: { en: 'Summer only', zh: '夏季限定' },
  'rainy-day': { en: 'Rainy day', zh: '雨天好去处' },
  laptop: { en: 'Laptop friendly', zh: '可办公' },
  cafe: { en: 'Has a cafe', zh: '有咖啡' },
  'afternoon-tea': { en: 'Afternoon tea', zh: '下午茶' },
  bar: { en: 'Bar', zh: '酒吧' },
  music: { en: 'Live music', zh: '现场音乐' },
  culture: { en: 'Culture', zh: '文化' },
  books: { en: 'Books', zh: '书' },
  sport: { en: 'Sport on TV', zh: '赛事直播' },
  tech: { en: 'Tech', zh: '科技' },
  banquet: { en: 'Banquet room', zh: '宴会' },
  business: { en: 'Business meal', zh: '商务' },
  occasion: { en: 'Occasion', zh: '重要场合' },
  regional: { en: 'Regional', zh: '地方菜' },
  transport: { en: 'Transport hub', zh: '交通枢纽' },
  'fine-dining': { en: 'Fine dining', zh: '精致餐饮' },
  healthy: { en: 'Healthy', zh: '轻食' },
  'old-town': { en: 'Old town', zh: '老城' },
};

/** Copy that changes with the EN / 中文 toggle. */
export const UI = {
  en: {
    brandLine1: "Calvin's",
    brandLine2: 'Shenzhen',
    brandLine3: 'List',
    kicker: '深圳 · SHENZHEN',
    lede:
      'A personal list of where to eat, drink and wander in Shenzhen — restaurants, cafes, bars, parks, galleries and the neighbourhoods in between. Added to as I find things worth repeating.',
    topPicks: 'Top Picks',
    topPicksSub: 'The places I send friends to first',
    searchPlaceholder: 'Search places, neighbourhoods, notes…',
    allCategories: 'All',
    allNeighborhoods: 'Everywhere',
    resultCount: (n: number) => `${n} ${n === 1 ? 'place' : 'places'}`,
    noResults: 'No places found',
    noResultsSub: 'Try a different search, or clear the filters.',
    clearFilters: 'Clear filters',
    places: 'Places',
    categories: 'Categories',
    picks: 'Top Picks',
    scroll: 'Scroll',
    topPick: 'TOP PICK',
    openIn: 'Open in',
    footerMade: 'Made in Shenzhen · Calvin’s personal city guide',
    footerNote: 'Ratings are my own, not an aggregate of anyone else’s.',
    themeCulture: 'Culture',
    themeTech: 'Tech',
    langToggle: '中文',
    notRated: 'not rated yet',
  },
  zh: {
    brandLine1: 'Calvin 的',
    brandLine2: '深圳',
    brandLine3: '清单',
    kicker: 'SHENZHEN · 深圳',
    lede:
      '一份私人深圳指南——餐厅、咖啡、酒吧、公园、美术馆，以及值得反复去的街区。发现好东西就加进来。',
    topPicks: '私藏推荐',
    topPicksSub: '朋友来深圳，我先带他们去这些地方',
    searchPlaceholder: '搜索店名、街区、笔记…',
    allCategories: '全部',
    allNeighborhoods: '全城',
    resultCount: (n: number) => `${n} 个地点`,
    noResults: '没有找到',
    noResultsSub: '换个关键词，或清除筛选。',
    clearFilters: '清除筛选',
    places: '地点',
    categories: '分类',
    picks: '推荐',
    scroll: '下滑',
    topPick: '私藏推荐',
    openIn: '打开地图',
    footerMade: 'Made in Shenzhen · Calvin 的城市指南',
    footerNote: '评分是我个人的，不是任何平台的综合分。',
    themeCulture: '文化',
    themeTech: '科技',
    langToggle: 'EN',
    notRated: '暂未评分',
  },
} as const;

export type Lang = keyof typeof UI;
export type Theme = 'culture' | 'tech';
