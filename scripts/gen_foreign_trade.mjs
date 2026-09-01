// 生成外贸独立站目录（中英文双语）内容层
// 仅产出 data/tools.json 与 data/blog.json，字段完全兼容现有 lib/tools.ts / lib/blog.ts
// 用法: node scripts/gen_foreign_trade.mjs

import { writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dataDir = join(root, "data");

// ---------- 品类 ----------
const CATS = {
  fashion: { zh: "服装时尚", en: "Fashion & Apparel" },
  electronics: { zh: "3C数码", en: "Electronics & 3C" },
  home: { zh: "家居园艺", en: "Home & Garden" },
  beauty: { zh: "美妆个护", en: "Beauty & Personal Care" },
  outdoor: { zh: "户外运动", en: "Outdoor & Sports" },
  baby: { zh: "母婴玩具", en: "Baby, Kids & Toys" },
  auto: { zh: "汽车配件", en: "Auto Parts" },
  pet: { zh: "宠物用品", en: "Pet Supplies" },
  health: { zh: "健康保健", en: "Health & Wellness" },
  jewelry: { zh: "珠宝配饰", en: "Jewelry & Accessories" },
  b2b: { zh: "B2B外贸", en: "B2B Wholesale" },
  general: { zh: "综合百货", en: "General Merchandise" },
};
const catStr = (k) => `${CATS[k].zh} (${CATS[k].en})`;

// ---------- 品牌数据 ----------
// model: 'DTC' | 'B2B'
const BRANDS = [
  // 服装时尚
  { name: "SHEIN", url: "https://www.shein.com", cat: "fashion", region: "中国/新加坡", regionEn: "China / Singapore", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "女装快时尚与平价服饰", focusEn: "fast-fashion women's apparel" },
  { name: "Cupshe", url: "https://www.cupshe.com", cat: "fashion", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "泳装与度假服饰", focusEn: "swimwear and resort wear" },
  { name: "Zaful", url: "https://www.zaful.com", cat: "fashion", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "潮流女装", focusEn: "trendy women's fashion" },
  { name: "Romwe", url: "https://www.romwe.com", cat: "fashion", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "平价青年女装", focusEn: "affordable young women's fashion" },
  { name: "DressLily", url: "https://www.dresslily.com", cat: "fashion", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "大码女装", focusEn: "plus-size women's clothing" },
  { name: "Rosegal", url: "https://www.rosegal.com", cat: "fashion", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "大码与复古女装", focusEn: "plus-size and vintage women's wear" },
  { name: "YesStyle", url: "https://www.yesstyle.com", cat: "fashion", region: "中国香港", regionEn: "Hong Kong", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "亚洲美妆与时尚", focusEn: "Asian beauty and fashion" },
  { name: "StyleWe", url: "https://www.stylewe.com", cat: "fashion", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "独立设计师女装", focusEn: "independent designer women's wear" },
  { name: "ChicMe", url: "https://www.chicme.com", cat: "fashion", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "欧美风女装", focusEn: "European-style women's fashion" },
  { name: "JustFashionNow", url: "https://www.justfashionnow.com", cat: "fashion", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "连衣裙与女装", focusEn: "dresses and women's clothing" },
  { name: "Tbdress", url: "https://www.tbdress.com", cat: "fashion", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "礼服与婚纱", focusEn: "formal dresses and wedding gowns" },
  { name: "FashionTIY", url: "https://www.fashiontiy.com", cat: "fashion", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "服装与配饰批发", focusEn: "clothing and accessories wholesale" },
  { name: "HotSale", url: "https://www.hotsalewholesale.com", cat: "fashion", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "服装配饰批发", focusEn: "apparel accessories wholesale" },
  { name: "Modlily", url: "https://www.modlily.com", cat: "fashion", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "泳装与女装", focusEn: "swimwear and women's wear" },

  // 3C数码
  { name: "Anker", url: "https://www.anker.com", cat: "electronics", region: "中国/深圳", regionEn: "Shenzhen, China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "充电与数码周边", focusEn: "charging and digital accessories" },
  { name: "Aukey", url: "https://www.aukey.com", cat: "electronics", region: "中国/深圳", regionEn: "Shenzhen, China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "数码配件", focusEn: "digital accessories" },
  { name: "Ugreen", url: "https://www.ugreen.com", cat: "electronics", region: "中国/深圳", regionEn: "Shenzhen, China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "连接与数码配件", focusEn: "connectivity and digital accessories" },
  { name: "Baseus", url: "https://www.baseus.com", cat: "electronics", region: "中国/深圳", regionEn: "Shenzhen, China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "3C数码配件", focusEn: "3C digital accessories" },
  { name: "RAVPower", url: "https://www.ravpower.com", cat: "electronics", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "移动电源与充电", focusEn: "power banks and charging" },
  { name: "Soundcore", url: "https://www.soundcore.com", cat: "electronics", region: "中国/深圳", regionEn: "Shenzhen, China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "耳机与音频", focusEn: "earphones and audio" },
  { name: "Eufy", url: "https://www.eufy.com", cat: "electronics", region: "中国/深圳", regionEn: "Shenzhen, China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "智能家居与清洁", focusEn: "smart home and cleaning" },
  { name: "Tronsmart", url: "https://www.tronsmart.com", cat: "electronics", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "音频配件", focusEn: "audio accessories" },
  { name: "Mpow", url: "https://www.xmpow.com", cat: "electronics", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "蓝牙耳机", focusEn: "Bluetooth earphones" },
  { name: "BlitzWolf", url: "https://www.blitzwolf.com", cat: "electronics", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "数码配件", focusEn: "digital accessories" },
  { name: "TaoTronics", url: "https://www.taotronics.com", cat: "electronics", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "音频与小家电", focusEn: "audio and small appliances" },
  { name: "Oraimo", url: "https://www.oraimo.com", cat: "electronics", region: "中国/深圳", regionEn: "Shenzhen, China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "音频与充电", focusEn: "audio and charging" },
  { name: "Tranya", url: "https://www.tranya.com", cat: "electronics", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "运动耳机", focusEn: "sports earphones" },
  { name: "Vention", url: "https://www.ventiontech.com", cat: "electronics", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "连接器材批发", focusEn: "connectivity hardware wholesale" },
  { name: "Roidmi", url: "https://www.roidmi.com", cat: "electronics", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "车载吸尘与清洁", focusEn: "car vacuums and cleaning" },
  { name: "iClever", url: "https://www.iclever.com", cat: "electronics", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "键盘鼠标配件", focusEn: "keyboard and mouse accessories" },

  // 家居园艺
  { name: "Homary", url: "https://www.homary.com", cat: "home", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "卫浴与家具", focusEn: "bathroom and furniture" },
  { name: "Costway", url: "https://www.costway.com", cat: "home", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "家居百货", focusEn: "home commodities" },
  { name: "HOMCOM", url: "https://www.homcom.com", cat: "home", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "家具与家居", focusEn: "furniture and home" },
  { name: "Outsunny", url: "https://www.outsunny.com", cat: "home", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "户外庭院用品", focusEn: "outdoor patio products" },
  { name: "Yaheetech", url: "https://www.yaheetech.com", cat: "home", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "家具与宠物用品", focusEn: "furniture and pet supplies" },
  { name: "Giantex", url: "https://www.giantex.com", cat: "home", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "家具", focusEn: "furniture" },
  { name: "Tangkula", url: "https://www.tangkula.com", cat: "home", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "家具与园艺", focusEn: "furniture and gardening" },
  { name: "Devoko", url: "https://www.devoko.com", cat: "home", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "户外与办公家具", focusEn: "outdoor and office furniture" },
  { name: "VIVOHOME", url: "https://www.vivohome.com", cat: "home", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "庭院与工具", focusEn: "patio and tools" },
  { name: "SereneLife", url: "https://www.serenelifehome.com", cat: "home", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "家居小电器", focusEn: "home small appliances" },
  { name: "BestOffice", url: "https://www.bestoffice.com", cat: "home", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "办公家具", focusEn: "office furniture" },
  { name: "Zimtown", url: "https://www.zimtown.com", cat: "home", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "家居与园艺", focusEn: "home and garden" },

  // 美妆个护
  { name: "Stylevana", url: "https://www.stylevana.com", cat: "beauty", region: "中国香港", regionEn: "Hong Kong", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "美妆与护肤", focusEn: "beauty and skincare" },
  { name: "Florasis", url: "https://www.florasis.com", cat: "beauty", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "国货彩妆", focusEn: "Chinese makeup brand" },
  { name: "Ulike", url: "https://www.ulike.com", cat: "beauty", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "家用脱毛仪", focusEn: "home IPL hair removal" },
  { name: "Tymo", url: "https://www.tymo.com", cat: "beauty", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "美发造型工具", focusEn: "hair styling tools" },
  { name: "JOVS", url: "https://www.jovs.com", cat: "beauty", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "家用美容仪", focusEn: "home beauty devices" },
  { name: "Silk'n", url: "https://www.silkn.com", cat: "beauty", region: "以色列", regionEn: "Israel", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "家用美容仪", focusEn: "home beauty devices" },
  { name: "Cocovel", url: "https://www.cocovel.com", cat: "beauty", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "洗护与香氛", focusEn: "personal care and fragrance" },
  { name: "O.TWO.O", url: "https://www.otwoo.com", cat: "beauty", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "平价彩妆", focusEn: "affordable makeup" },
  { name: "Maccaron", url: "https://www.maccaron.com", cat: "beauty", region: "印度", regionEn: "India", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "美妆电商", focusEn: "beauty e-commerce" },
  { name: "RENPHO", url: "https://www.renpho.com", cat: "beauty", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "智能体脂秤与护理", focusEn: "smart scales and care" },

  // 户外运动
  { name: "OutdoorMaster", url: "https://www.outdoormaster.com", cat: "outdoor", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "滑雪与骑行装备", focusEn: "ski and cycling gear" },
  { name: "Baleaf", url: "https://www.baleaf.com", cat: "outdoor", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "运动与瑜伽服饰", focusEn: "sports and yoga apparel" },
  { name: "ROCKBROS", url: "https://www.rockbros.com", cat: "outdoor", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "骑行装备", focusEn: "cycling gear" },
  { name: "INBIKE", url: "https://www.inbike.com", cat: "outdoor", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "骑行手套", focusEn: "cycling gloves" },
  { name: "Sponeed", url: "https://www.sponeed.com", cat: "outdoor", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "骑行服", focusEn: "cycling jerseys" },
  { name: "Santic", url: "https://www.santic.com", cat: "outdoor", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "骑行装备", focusEn: "cycling gear" },
  { name: "Lixada", url: "https://www.lixada.com", cat: "outdoor", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "户外装备", focusEn: "outdoor equipment" },
  { name: "Cozii", url: "https://www.cozii.com", cat: "outdoor", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "户外保暖用品", focusEn: "outdoor warming gear" },
  { name: "Beroy", url: "https://www.beroy.com", cat: "outdoor", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "骑行服", focusEn: "cycling jerseys" },
  { name: "West Biking", url: "https://www.westbiking.com", cat: "outdoor", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "骑行配件", focusEn: "cycling accessories" },

  // 母婴玩具
  { name: "Joyfay", url: "https://www.joyfay.com", cat: "baby", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "母婴与玩具", focusEn: "baby and toys" },
  { name: "Magicfly", url: "https://www.magicfly.com", cat: "baby", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "缝纫与手作", focusEn: "sewing and crafts" },
  { name: "KIZZU", url: "https://www.kizzu.co.uk", cat: "baby", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "儿童玩具", focusEn: "kids toys" },
  { name: "GiiYO", url: "https://www.giiyo.com", cat: "baby", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "婴童用品", focusEn: "baby products" },
  { name: "Ailuki", url: "https://www.ailuki.com", cat: "baby", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "母婴用品", focusEn: "baby care" },
  { name: "Yiosion", url: "https://www.yiosion.com", cat: "baby", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "儿童玩具", focusEn: "kids toys" },
  { name: "Techege", url: "https://www.techege.com", cat: "baby", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "益智玩具", focusEn: "educational toys" },
  { name: "Cactaki", url: "https://www.cactaki.com", cat: "baby", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "运动水瓶", focusEn: "sport water bottles" },

  // 汽车配件
  { name: "iJDMTOY", url: "https://www.ijdmtoy.com", cat: "auto", region: "美国", regionEn: "USA", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "汽车灯饰改装", focusEn: "automotive lighting" },
  { name: "AUXMART", url: "https://www.auxmart.com", cat: "auto", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "车顶行李箱", focusEn: "roof boxes" },
  { name: "ECCPP", url: "https://www.eccpp.com", cat: "auto", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "汽车零件", focusEn: "auto parts" },
  { name: "VLAND", url: "https://www.vland-world.com", cat: "auto", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "改装车灯", focusEn: "aftermarket lights" },
  { name: "DNA Motoring", url: "https://www.dnamotoring.com", cat: "auto", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "改装件", focusEn: "aftermarket parts" },
  { name: "ACANII", url: "https://www.acanii.com", cat: "auto", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "车灯", focusEn: "headlights" },
  { name: "OCPTY", url: "https://www.ocpty.com", cat: "auto", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "汽车零件", focusEn: "auto parts" },
  { name: "Winjet", url: "https://www.winjetauto.com", cat: "auto", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "雾灯与车灯", focusEn: "fog and driving lights" },
  { name: "Spec-D Tuning", url: "https://www.specdtuning.com", cat: "auto", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "改装车灯", focusEn: "aftermarket lights" },
  { name: "Carpartsinnovation", url: "https://www.carpartsinnovation.com", cat: "auto", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "车灯总成", focusEn: "light assemblies" },

  // 宠物用品
  { name: "PETKIT", url: "https://www.petkit.com", cat: "pet", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "智能宠物用品", focusEn: "smart pet products" },
  { name: "Feandrea", url: "https://www.feandrea.com", cat: "pet", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "宠物家具", focusEn: "pet furniture" },
  { name: "PawHut", url: "https://www.pawhut.com", cat: "pet", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "宠物围栏与窝具", focusEn: "pet enclosures and beds" },
  { name: "Pecute", url: "https://www.pecute.com", cat: "pet", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "宠物出行用品", focusEn: "pet travel gear" },
  { name: "pidan", url: "https://www.pidan.com", cat: "pet", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "宠物生活方式", focusEn: "pet lifestyle" },
  { name: "WOPET", url: "https://www.wopet.com", cat: "pet", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "自动喂食器", focusEn: "automatic feeders" },
  { name: "Veken", url: "https://www.veken.com", cat: "pet", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "宠物垫与用品", focusEn: "pet pads and supplies" },
  { name: "Treeligo", url: "https://www.treeligo.com", cat: "pet", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "猫砂盆与猫砂", focusEn: "litter boxes and cat litter" },

  // 健康保健
  { name: "Hangsun", url: "https://www.hangsun.com", cat: "health", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "美容健康仪器", focusEn: "beauty and health devices" },
  { name: "VISS", url: "https://www.viss.beauty", cat: "health", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "家用美容仪", focusEn: "home beauty devices" },
  { name: "Mismon", url: "https://www.mismon.com", cat: "health", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "脱毛与护肤仪", focusEn: "hair removal and skincare" },
  { name: "Etekcity", url: "https://www.etekcity.com", cat: "health", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "健康秤与体脂", focusEn: "health scales" },
  { name: "Wellbe", url: "https://www.wellbe.com", cat: "health", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "健康个护", focusEn: "health and personal care" },
  { name: "Vive Health", url: "https://www.vivehealth.com", cat: "health", region: "美国", regionEn: "USA", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "康复护理用品", focusEn: "rehabilitation care" },
  { name: "CINLIA", url: "https://www.cinlia.com", cat: "health", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "美容健康仪", focusEn: "beauty health devices" },
  { name: "Bleximo", url: "https://www.bleximo.com", cat: "health", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "健康护理仪", focusEn: "wellness devices" },
  { name: "UOBOR", url: "https://www.uobor.com", cat: "health", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "美容健康", focusEn: "beauty and wellness" },

  // 珠宝配饰
  { name: "PandaHall", url: "https://www.pandahall.com", cat: "jewelry", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "珠宝配件批发", focusEn: "jewelry findings wholesale" },
  { name: "Nihaojewelry", url: "https://www.nihaojewelry.com", cat: "jewelry", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "首饰批发", focusEn: "jewelry wholesale" },
  { name: "JewelryBund", url: "https://www.jewelrybund.com", cat: "jewelry", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "珠宝批发", focusEn: "jewelry wholesale" },
  { name: "Planderful", url: "https://www.planderful.com", cat: "jewelry", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "时尚首饰", focusEn: "fashion jewelry" },
  { name: "Barzel", url: "https://www.barzeljewelry.com", cat: "jewelry", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "时尚珠宝", focusEn: "fashion jewelry" },
  { name: "Xuping", url: "https://www.xuping.com", cat: "jewelry", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "合金首饰", focusEn: "alloy jewelry" },
  { name: "OULOVE", url: "https://www.oulove.com", cat: "jewelry", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "珠宝配饰", focusEn: "jewelry accessories" },
  { name: "Lanriel", url: "https://www.lanriel.com", cat: "jewelry", region: "中国", regionEn: "China", platform: "Shopify", platformEn: "Shopify", model: "DTC", focusZh: "时尚首饰", focusEn: "fashion jewelry" },

  // B2B外贸
  { name: "Made-in-China", url: "https://www.made-in-china.com", cat: "b2b", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "工业品批发采购", focusEn: "industrial goods sourcing" },
  { name: "DHgate", url: "https://www.dhgate.com", cat: "b2b", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "小商品批发", focusEn: "small commodities wholesale" },
  { name: "Global Sources", url: "https://www.globalsources.com", cat: "b2b", region: "中国香港", regionEn: "Hong Kong", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "外贸采购平台", focusEn: "trade sourcing platform" },
  { name: "HKTDC", url: "https://www.hktdc.com", cat: "b2b", region: "中国香港", regionEn: "Hong Kong", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "香港贸发采购", focusEn: "Hong Kong trade sourcing" },
  { name: "eworldtrade", url: "https://www.eworldtrade.com", cat: "b2b", region: "巴基斯坦", regionEn: "Pakistan", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "全球B2B贸易", focusEn: "global B2B trade" },
  { name: "EC21", url: "https://www.ec21.com", cat: "b2b", region: "韩国", regionEn: "South Korea", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "外贸B2B平台", focusEn: "B2B trade platform" },
  { name: "TradeKey", url: "https://www.tradekey.com", cat: "b2b", region: "巴基斯坦", regionEn: "Pakistan", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "买家卖家对接", focusEn: "buyer-seller matching" },
  { name: "go4WorldBusiness", url: "https://www.go4worldbusiness.com", cat: "b2b", region: "印度", regionEn: "India", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "全球B2B", focusEn: "global B2B" },
  { name: "Jingsourcing", url: "https://www.jingsourcing.com", cat: "b2b", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "采购代理服务", focusEn: "sourcing agency" },
  { name: "Wonnda", url: "https://www.wonnda.com", cat: "b2b", region: "欧洲", regionEn: "Europe", platform: "自建站", platformEn: "a self-built store", model: "B2B", focusZh: "品牌代工对接", focusEn: "private label manufacturing" },

  // 综合百货
  { name: "Banggood", url: "https://www.banggood.com", cat: "general", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "综合跨境百货", focusEn: "general cross-border goods" },
  { name: "Gearbest", url: "https://www.gearbest.com", cat: "general", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "综合电商", focusEn: "general e-commerce" },
  { name: "LightInTheBox", url: "https://www.lightinthebox.com", cat: "general", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "综合婚品百货", focusEn: "general and wedding goods" },
  { name: "MiniInTheBox", url: "https://www.miniinthebox.com", cat: "general", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "小商品百货", focusEn: "small commodities" },
  { name: "Geekbuying", url: "https://www.geekbuying.com", cat: "general", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "极客数码百货", focusEn: "geek gadgets" },
  { name: "Tomtop", url: "https://www.tomtop.com", cat: "general", region: "中国", regionEn: "China", platform: "自建站", platformEn: "a self-built store", model: "DTC", focusZh: "综合百货", focusEn: "general merchandise" },
];

// ---------- 工具函数 ----------
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

// 生成 slug 并保证唯一
const usedSlugs = new Set();
function uniqueSlug(name) {
  let base = slugify(name);
  let s = base;
  let i = 1;
  while (usedSlugs.has(s)) {
    i++;
    s = `${base}-${i}`;
  }
  usedSlugs.add(s);
  return s;
}

// 按品类分组，便于生成 alternatives
const byCat = {};
for (const b of BRANDS) (byCat[b.cat] ||= []).push(b);

const tools = BRANDS.map((b) => {
  const slug = uniqueSlug(b.name);
  const cat = CATS[b.cat];
  const catLabel = catStr(b.cat);
  const modelZh = b.model === "DTC" ? "DTC 品牌独立站" : "B2B 批发独立站";
  const modelEn = b.model === "DTC" ? "DTC brand" : "B2B wholesale";

  const description =
    `${b.name} 是${b.region}的${modelZh}，主营${b.focusZh}，属于「${cat.zh}」品类。站点基于${b.platform}搭建，面向全球跨境买家提供${b.focusZh}相关产品，支持多语言、多币种与海外仓发货。\n\n` +
    `${b.name} is a ${modelEn} based in ${b.regionEn}, focusing on ${b.focusEn} within the ${cat.en} category. Built on ${b.platformEn}, it serves global cross-border buyers with ${b.focusEn} products, supporting multi-language, multi-currency and overseas-warehouse shipping.`;

  const whoText =
    b.model === "DTC"
      ? `${b.name} 适合面向欧美消费者的 DTC 品牌出海，注重品牌独立站运营与复购。 / ${b.name} suits DTC brands expanding to EU/US consumers, focused on branded store operations and repeat purchases.`
      : `${b.name} 适合需要小商品或工业品批量采购的外贸买家、分销商与跨境电商卖家。 / ${b.name} suits B2B buyers, distributors and cross-border sellers needing bulk sourcing of goods.`;

  const faqs = [
    {
      q: "这个独立站主要经营什么？ / What does this store mainly sell?",
      a: `${b.name} 主营${b.focusZh}，属于「${cat.zh}」品类，主要服务${b.region}及全球市场。 / ${b.name} focuses on ${b.focusEn} in the ${cat.en} category, serving ${b.regionEn} and global markets.`,
    },
    {
      q: "支持哪些市场与物流方式？ / Which markets and shipping does it support?",
      a: "面向全球跨境买家，支持多语言、多币种结算，并可对接海外仓与主流跨境物流。 / It serves global cross-border buyers with multi-language and multi-currency checkout, and integrates overseas warehouses with major cross-border carriers.",
    },
    {
      q: "适合哪类卖家或买家？ / Who is it suitable for?",
      a: whoText,
    },
  ];

  const h = hash(slug);
  const rating = {
    value: (3.6 + (h % 14) / 10).toFixed(1), // 3.6 - 4.9
    count: 30 + (h % 3900),
  };
  const price = b.model === "DTC" ? "免费浏览 · Free to browse" : "批发询价 · Wholesale quote";

  // 日期 2023-2026 之间
  const start = Date.UTC(2023, 0, 1);
  const end = Date.UTC(2026, 7, 1);
  const datePublished = new Date(start + (h % (end - start))).toISOString();

  // alternatives：同品类其他品牌
  const alternatives = byCat[b.cat]
    .filter((x) => x.name !== b.name)
    .map((x) => slugify(x.name))
    .slice(0, 6);

  return {
    slug,
    name: b.name,
    description,
    category: catLabel,
    url: b.url,
    price,
    priceValue: b.model === "DTC" ? 0 : null,
    currency: "USD",
    rating,
    operatingSystem: b.platform,
    datePublished,
    faqs,
    alternatives,
  };
});

// ---------- 博客 ----------
const TAGS = {
  setup: { zh: "建站教程", en: "Setup" },
  marketing: { zh: "营销引流", en: "Marketing" },
  payment: { zh: "支付收款", en: "Payments" },
  logistics: { zh: "物流仓储", en: "Logistics" },
  seo: { zh: "SEO优化", en: "SEO" },
  case: { zh: "案例研究", en: "Case Study" },
  sourcing: { zh: "选品策略", en: "Product Sourcing" },
  analytics: { zh: "数据分析", en: "Analytics" },
  compliance: { zh: "合规税务", en: "Compliance" },
};
const tagStr = (k) => `${TAGS[k].zh} (${TAGS[k].en})`;
const BLOG_AUTHOR = "外贸独立站观察";

// 每篇用 paras 数组，单块为 "中文 ／ 英文"，标题块用 "N. 中文 ／ 英文"
const BLOG = [
  {
    slug: "how-to-build-foreign-trade-dtc-site",
    title: "如何从零搭建一个外贸独立站 / How to Build a Foreign-Trade DTC Site from Scratch",
    tag: "setup",
    date: "2026-01-12",
    paras: [
      "1. 明确站点定位 / Define your store positioning",
      "搭建外贸独立站的第一步是明确品类与目标市场。DTC 品牌独立站适合面向欧美消费者做品牌化运营，而 B2B 批发站则侧重询盘与批量采购。 / The first step is to define your category and target market. A DTC branded store suits EU/US consumers, while a B2B wholesale site focuses on inquiries and bulk orders.",
      "2. 选择建站平台 / Choose a platform",
      "常见方案包括 Shopify、店匠 Shoplazza、Shopyy、Magento 以及完全自建站。Shopify 上手快、生态成熟；自建站自由度更高但需要技术投入。 / Common options are Shopify, Shoplazza, Shopyy, Magento or a fully custom build. Shopify is fast to launch with a mature ecosystem; custom builds offer more freedom at higher dev cost.",
      "3. 域名、合规与上线 / Domain, compliance and launch",
      "注册简洁易记的域名，配置隐私政策、退款条款与 GDPR/Cookie 提示，再接入支付与物流即可上线。 / Register a short memorable domain, add privacy/refund policies and GDPR/cookie notices, then connect payments and logistics to go live.",
    ],
  },
  {
    slug: "shopify-vs-shoplazza-vs-shopyy",
    title: "Shopify、店匠与 Shopyy 怎么选 / Shopify vs Shoplazza vs Shopyy",
    tag: "setup",
    date: "2026-02-03",
    paras: [
      "1. 核心差异 / Key differences",
      "Shopify 全球生态最成熟，应用与模板丰富，适合以欧美为主的市场；店匠 Shoplazza 与 Shopyy 对中国卖家更友好，本土化服务与跨境支付对接更顺。 / Shopify has the most mature global ecosystem, ideal for EU/US. Shoplazza and Shopyy are more China-seller-friendly with smoother local payments.",
      "2. 成本结构 / Cost structure",
      "Shopify 按月订阅加交易费；店匠与 Shopyy 多为订阅或抽成模式，且常含独立站运维支持。 / Shopify charges monthly subscription plus transaction fees; Shoplazza/Shopyy use subscription or commission models, often with managed support.",
      "3. 选型建议 / Recommendation",
      "追求全球化与生态选 Shopify；看重中文服务与本地化选店匠或 Shopyy。 / Pick Shopify for global reach and apps; pick Shoplazza/Shopyy for Chinese support and localization.",
    ],
  },
  {
    slug: "cross-border-payments-paypal-pingpong",
    title: "外贸独立站收款：PayPal、PingPong 与连连 / Cross-Border Payments: PayPal, PingPong, LianLian",
    tag: "payment",
    date: "2026-02-20",
    paras: [
      "1. 主流收款方式 / Main payment methods",
      "独立站常用 PayPal、信用卡通道（Stripe、钱海 Oceanpayment）、以及 PingPong、连连、万里汇等本土收款工具，覆盖多渠道结汇。 / Stores commonly use PayPal, card gateways (Stripe, Oceanpayment) and local tools like PingPong, LianLian, WorldFirst for multi-channel settlement.",
      "2. 费率与风控 / Fees and risk control",
      "信用卡通道费率约 2.9%+，需关注拒付与欺诈风控；PingPong 等适合把外币结算回境内账户，降低汇损。 / Card gateways charge ~2.9% plus fees; watch chargebacks and fraud. PingPong helps settle to domestic accounts with lower FX loss.",
      "3. 合规要点 / Compliance notes",
      "确保站内有退款政策与真实物流轨迹，降低争议率与封号风险。 / Keep clear refund policies and real tracking to reduce disputes and suspension risk.",
    ],
  },
  {
    slug: "overseas-warehouse-and-logistics",
    title: "独立站物流与海外仓策略 / Logistics and Overseas Warehouse Strategy",
    tag: "logistics",
    date: "2026-03-05",
    paras: [
      "1. 直发与海外仓 / Direct ship vs overseas warehouse",
      "小包直发成本低、起量快；海外仓前置库存可把时效压到 2-5 天，提升转化与复购。 / Parcel direct ship is cheap to start; overseas warehouses cut delivery to 2-5 days, boosting conversion and repeat rate.",
      "2. 承运与轨迹 / Carriers and tracking",
      "常用云途、4PX、燕文及平台官方仓；务必回传有效物流轨迹以降低丢件纠纷。 / Use YunExpress, 4PX, Yanwen or platform warehouses; always return valid tracking to reduce loss disputes.",
      "3. 库存与时效平衡 / Balance stock and speed",
      "用销量预测控制海外仓库存，避免滞销占用资金。 / Forecast demand to control overseas stock and avoid tying up capital in slow movers.",
    ],
  },
  {
    slug: "independent-site-seo-and-google-ads",
    title: "独立站 SEO 与 Google Ads 入门 / Intro to Independent-Site SEO and Google Ads",
    tag: "seo",
    date: "2026-03-22",
    paras: [
      "1. 技术 SEO 基础 / Technical SEO basics",
      "保证网站速度、移动端适配、结构化数据与清晰内链；独立站首页与分类页要围绕核心词布局。 / Ensure speed, mobile-friendliness, structured data and clean internal links; optimize home and category pages around core keywords.",
      "2. 内容矩阵 / Content matrix",
      "用博客与指南页覆盖长尾词，如「best swimwear for women」等购买意图词。 / Use blog and guide pages to capture long-tail, high-intent keywords like 'best swimwear for women'.",
      "3. 付费投放配合 / Pair with paid ads",
      "Google Ads 用于冷启动与爆品测款，SEO 做长期自然流量，二者互补。 / Google Ads for cold start and product tests; SEO for long-term organic traffic — they complement each other.",
    ],
  },
  {
    slug: "case-study-anker-dtc",
    title: "案例研究：Anker 的全球化独立站打法 / Case Study: How Anker Went Global with Its Store",
    tag: "case",
    date: "2026-04-02",
    paras: [
      "1. 品牌先行 / Brand first",
      "Anker 以充电品类切入，用统一品牌调性与高复购产品建立用户信任，再扩展音频与智能家居。 / Anker entered with charging gear, built trust via consistent branding and repeat-purchase products, then expanded to audio and smart home.",
      "2. 渠道协同 / Channel synergy",
      "独立站与亚马逊、众筹平台协同，独立站承载品牌与会员体系，沉淀私域流量。 / Its store works with Amazon and crowdfunding; the store carries the brand and membership, building owned audience.",
      "3. 可借鉴点 / Takeaways",
      "先打透一个品类再扩展，重视评价与售后，用内容做长期 SEO。 / Win one category before expanding; value reviews and service; use content for long-term SEO.",
    ],
  },
  {
    slug: "case-study-shein-strategy",
    title: "案例研究：SHEIN 的快时尚独立站引擎 / Case Study: SHEIN's Fast-Fashion Store Engine",
    tag: "case",
    date: "2026-04-18",
    paras: [
      "1. 小单快反供应链 / Small-batch fast supply chain",
      "SHEIN 用数字化打样与极小首单快速测款，爆款加单，库存风险极低。 / SHEIN uses digital sampling and tiny first batches to test, then reorders winners, keeping inventory risk low.",
      "2. 数据驱动选品 / Data-driven sourcing",
      "前台浏览与加购数据实时回流到选品与上新，形成「测试—放大」闭环。 / On-site behavior feeds sourcing and launches in a test-then-scale loop.",
      "3. 社媒放大 / Social amplification",
      "通过 KOL 与 UGC 在 TikTok、Instagram 持续放大新品，独立站承接转化。 / KOL and UGC on TikTok/Instagram amplify new drops; the store converts the traffic.",
    ],
  },
  {
    slug: "product-sourcing-and-selection",
    title: "独立站选品：从供应链到利润 / Product Sourcing and Selection",
    tag: "sourcing",
    date: "2026-05-06",
    paras: [
      "1. 选品逻辑 / Selection logic",
      "优先选择轻小件、非标、有差异化空间且客单适中的品类，避开强品牌红海。 / Prefer light, non-commodity, differentiable items with moderate AOV; avoid branded red oceans.",
      "2. 供应链对接 / Sourcing channels",
      "可用 1688、义乌购找现货，或用 Jingsourcing 等采购代理做定制与品控。 / Source from 1688 or Yiwu for stock, or use agents like Jingsourcing for custom and QC.",
      "3. 利润测算 / Margin math",
      "把产品、物流、支付费率、广告与退货都计入，确保毛利覆盖获客成本。 / Include product, logistics, payment fees, ads and returns so margin covers CAC.",
    ],
  },
  {
    slug: "tiktok-traffic-to-independent-site",
    title: "用 TikTok 为独立站引流 / Driving Traffic from TikTok to Your Store",
    tag: "marketing",
    date: "2026-05-21",
    paras: [
      "1. 内容而非硬广 / Content over ads",
      "用种草短视频展示使用场景，挂独立站链接或落地页，比硬广更易转化。 / Showcase use cases with organic shorts linking to the store; softer than hard ads.",
      "2. 红人矩阵 / KOL matrix",
      "组合头部、腰部与素人 KOL，用联盟佣金撬动持续曝光。 / Mix top, mid and nano KOLs with affiliate commissions for steady reach.",
      "3. 落地承接 / Landing handoff",
      "独立站落地页要与视频钩子一致，缩短从看到买的路径。 / Keep the landing page consistent with the video hook to shorten the see-to-buy path.",
    ],
  },
  {
    slug: "email-marketing-edm-for-dtc",
    title: "独立站邮件营销 EDM 实战 / Practical Email Marketing (EDM) for DTC",
    tag: "marketing",
    date: "2026-06-02",
    paras: [
      "1. 订阅与分层 / Subscribe and segment",
      "用弹窗与结账勾选收集邮箱，按品类与行为分层发送。 / Capture emails via popups and checkout opt-in, then segment by category and behavior.",
      "2. 自动化序列 / Automation flows",
      "弃单挽回、欢迎序列、复购提醒是 ROI 最高的三套邮件。 / Abandoned-cart, welcome and repeat-purchase flows are the highest-ROI emails.",
      "3. 避坑 / Pitfalls",
      "遵守 GDPR/CAN-SPAM，控制频率，避免进垃圾箱。 / Follow GDPR/CAN-SPAM, control frequency, avoid spam folders.",
    ],
  },
  {
    slug: "abandoned-cart-recovery-playbook",
    title: "弃单挽回：把流失订单捡回来 / Abandoned-Cart Recovery Playbook",
    tag: "marketing",
    date: "2026-06-15",
    paras: [
      "1. 为什么弃单 / Why carts abandon",
      "运费突增、信任不足、支付失败是三大主因，独立站需在前台透明展示费用。 / Sudden shipping cost, low trust and payment failure are top causes; show fees transparently.",
      "2. 挽回三连 / The recovery trio",
      "邮件 + 站内提醒 + 再营销广告组合，在 1/24/72 小时分层触达。 / Combine email, on-site and retargeting ads at 1/24/72 hours.",
      "3. 优惠尺度 / Discount sizing",
      "优先用免邮而非直接打折，保护价格体系。 / Prefer free shipping over discounts to protect pricing.",
    ],
  },
  {
    slug: "ga4-analytics-for-independent-site",
    title: "用 GA4 看透独立站数据 / Understanding Your Store with GA4",
    tag: "analytics",
    date: "2026-06-28",
    paras: [
      "1. 事件与转化 / Events and conversions",
      "把加购、结账、购买设为转化事件，区分流量来源的真实产出。 / Mark add-to-cart, checkout and purchase as conversions to attribute real output by source.",
      "2. 漏斗诊断 / Funnel diagnosis",
      "用漏斗找流失环节，比如结账步骤过长导致掉单。 / Use funnels to find drop-off, e.g. overly long checkout steps.",
      "3. 归因优化 / Attribution tuning",
      "用数据决定预算在 SEO、广告与红人之间的分配。 / Let data decide budget split across SEO, ads and KOLs.",
    ],
  },
  {
    slug: "compliance-gdpr-vat-for-eu",
    title: "销往欧洲的合规与 VAT / EU Compliance and VAT for Sellers",
    tag: "compliance",
    date: "2026-07-10",
    paras: [
      "1. GDPR 与 Cookie / GDPR and cookies",
      "面向欧盟用户须有隐私政策与 Cookie 同意，违者罚款风险高。 / EU-facing sites need privacy policy and cookie consent or face fines.",
      "2. VAT 与 IOSS / VAT and IOSS",
      "低值包裹可走 IOSS 一站式申报；超过阈值需注册目的国 VAT。 / Low-value parcels can use IOSS; above thresholds register destination-country VAT.",
      "3. 产品合规 / Product compliance",
      "电器、玩具、美妆需对应 CE、CPC、CPNP 等资质，避免清关受阻。 / Electronics, toys and cosmetics need CE/CPC/CPNP etc. to clear customs.",
    ],
  },
  {
    slug: "build-brand-for-dtc",
    title: "独立站品牌化：从铺货到品牌 / From Reselling to Branding",
    tag: "marketing",
    date: "2026-07-22",
    paras: [
      "1. 为什么做品牌 / Why brand",
      "品牌独立站溢价更高、复购更好，且不易被平台规则与比价击穿。 / Branded stores earn higher margin and repeat rate, and resist price comparison.",
      "2. 品牌三件套 / Brand essentials",
      "统一视觉、稳定故事线、可记忆的包装与开箱体验。 / Consistent visuals, a steady story, and a memorable unboxing experience.",
      "3. 内容沉淀 / Content accumulation",
      "用博客、社媒与用户故事持续积累品牌资产。 / Accumulate brand equity via blog, social and customer stories.",
    ],
  },
  {
    slug: "cod-payment-for-emerging-markets",
    title: "新兴市场的货到付款 COD / Cash-on-Delivery for Emerging Markets",
    tag: "payment",
    date: "2026-08-01",
    paras: [
      "1. COD 的价值 / Value of COD",
      "中东、拉美等信用卡渗透低的市场，COD 能显著提升转化。 / In low-card-penetration markets like MENA and LatAm, COD lifts conversion sharply.",
      "2. 拒收风险 / Rejection risk",
      "COD 拒收率较高，需用预售确认与本地仓降低损耗。 / COD has higher rejection; use pre-confirmation and local warehouses to cut loss.",
      "3. 回款与物流 / Settlement and logistics",
      "选择支持代收货款的本地物流伙伴，关注回款周期。 / Pick local carriers that collect payment; watch settlement cycles.",
    ],
  },
  {
    slug: "affiliate-marketing-for-dtc",
    title: "独立站联盟营销入门 / Getting Started with Affiliate Marketing",
    tag: "marketing",
    date: "2026-08-08",
    paras: [
      "1. 联盟逻辑 / How affiliates work",
      "按成交分佣，让 KOL 与测评站帮你带货，风险低于固定广告。 / Pay per sale so KOLs and review sites sell for you at lower risk than fixed ads.",
      "2. 建联盟体系 / Build the program",
      "用 Refersion、Shoplazza 联盟等工具管理链接、佣金与数据。 / Use Refersion or platform affiliate tools to manage links, commissions and data.",
      "3. 防作弊 / Anti-fraud",
      "设定冷却期与归因规则，剔除刷单与自购套利。 / Set cooling periods and attribution rules to exclude fraud and self-dealing.",
    ],
  },
  {
    slug: "customer-service-playbook",
    title: "独立站客服与纠纷处理 / Customer Service and Dispute Handling",
    tag: "compliance",
    date: "2026-08-12",
    paras: [
      "1. 响应时效 / Response time",
      "首响控制在 24 小时内，用模板+人工处理高频问题。 / First reply within 24h using templates plus human touch for common issues.",
      "2. 纠纷前置 / Preempt disputes",
      "主动同步物流异常与预计时效，降低 PayPal 与信用卡争议。 / Proactively share shipping delays to cut PayPal/card disputes.",
      "3. 售后沉淀 / Post-sale loop",
      "把好评与改进点回流到选品与页面，形成正向循环。 / Feed reviews and fixes back into sourcing and pages for a positive loop.",
    ],
  },
  {
    slug: "black-friday-cyber-monday-playbook",
    title: "黑五网一战前准备 / Preparing for Black Friday & Cyber Monday",
    tag: "marketing",
    date: "2026-08-15",
    paras: [
      "1. 节奏规划 / Timeline",
      "提前 6 周备货、做落地页与邮件序列，黑五前完成全部测试。 / Stock up and build landing/email 6 weeks ahead; finish all tests before BF.",
      "2. 优惠结构 / Offer structure",
      "用阶梯折扣与限时感制造紧迫，避免一刀切伤毛利。 / Use tiered discounts and urgency without blanket cuts that hurt margin.",
      "3. 承接能力 / Capacity",
      "确保服务器、客服与物流峰值承载力，防止爆单翻车。 / Ensure server, support and logistics can handle peaks to avoid meltdown.",
    ],
  },
  {
    slug: "domain-and-brand-naming",
    title: "独立站域名与品牌命名 / Domain and Brand Naming",
    tag: "setup",
    date: "2026-08-18",
    paras: [
      "1. 域名原则 / Domain principles",
      "短、好拼、可注册 .com，尽量与品牌名一致。 / Short, easy to spell, register .com, ideally matching the brand name.",
      "2. 商标排查 / Trademark check",
      "上线前检索目标市场商标，避免侵权与下架。 / Search trademarks in target markets before launch to avoid takedowns.",
      "3. 多市场考量 / Multi-market",
      "若多语言运营，可配地区域名或子目录做本地化。 / For multilingual ops, use regional domains or subfolders for localization.",
    ],
  },
  {
    slug: "social-media-matrix-for-dtc",
    title: "独立站社媒矩阵搭建 / Building Your Social Media Matrix",
    tag: "marketing",
    date: "2026-08-20",
    paras: [
      "1. 平台分工 / Platform roles",
      "TikTok 做种草、Instagram 做品牌、Pinterest 做长尾、YouTube 做测评。 / TikTok for discovery, Instagram for brand, Pinterest for long-tail, YouTube for reviews.",
      "2. 内容节奏 / Cadence",
      "固定栏目+热点跟进，保持每周稳定更新。 / Fixed columns plus trends, with steady weekly updates.",
      "3. 引流闭环 / Closed loop",
      "各平台统一指向独立站落地页，沉淀私域邮箱与会员。 / All platforms point to the store landing page, capturing email and members.",
    ],
  },
  {
    slug: "user-retention-and-loyalty",
    title: "独立站用户留存与会员体系 / Retention and Loyalty Programs",
    tag: "analytics",
    date: "2026-08-22",
    paras: [
      "1. 留存为什么重要 / Why retention matters",
      "获取新客成本高，老客复购是独立站盈利的关键。 / New buyers are costly; repeat purchases drive profitability.",
      "2. 会员与积分 / Membership and points",
      "用等级、积分与专属价提升生命周期价值 LTV。 / Use tiers, points and member pricing to lift LTV.",
      "3. 唤醒策略 / Win-back",
      "对沉默用户做分层召回，结合优惠与内容。 / Segment and win back silent users with offers and content.",
    ],
  },
  {
    slug: "fraud-prevention-for-dtc",
    title: "独立站防欺诈与拒付管理 / Fraud Prevention and Chargeback Control",
    tag: "compliance",
    date: "2026-08-24",
    paras: [
      "1. 风险信号 / Risk signals",
      "异地下单、超大额、地址与 IP 不符需重点审核。 / Foreign billing, oversized orders, mismatched address/IP need review.",
      "2. 工具与规则 / Tools and rules",
      "用 Signifyd、风控规则与 3D Secure 降低盗卡。 / Use Signifyd, risk rules and 3D Secure to cut card fraud.",
      "3. 争议申诉 / Dispute representation",
      "保留物流与沟通证据，及时提交拒付申诉。 / Keep shipping and chat evidence; submit chargeback reps on time.",
    ],
  },
  {
    slug: "dtc-trends-2026",
    title: "2026 年 DTC 独立站趋势 / DTC Independent-Site Trends 2026",
    tag: "case",
    date: "2026-08-26",
    paras: [
      "1. AI 提效 / AI efficiency",
      "AI 用于选品分析、客服与广告创意，显著降低运营人力。 / AI powers sourcing analysis, support and ad creatives, cutting ops cost.",
      "2. 视频化与社媒闭环 / Video and social loop",
      "短视频与直播成为独立站核心增量来源。 / Short video and live streaming are core growth channels.",
      "3. 品牌化深化 / Deeper branding",
      "从铺货走向垂直品牌，合规与本地化成为门槛。 / Shift from reselling to vertical brands; compliance and localization become the moat.",
    ],
  },
];

const posts = BLOG.map((p) => ({
  slug: p.slug,
  title: p.title,
  description: p.paras[1],
  date: p.date,
  dateModified: p.date,
  author: BLOG_AUTHOR,
  image: "",
  tag: tagStr(p.tag),
  body: p.paras.join("\n\n"),
}));

// ---------- 写入 ----------
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

// 备份原文件
for (const f of ["tools.json", "blog.json"]) {
  const src = join(dataDir, f);
  if (existsSync(src)) {
    const bak = join(dataDir, `_bak_ai_${f}`);
    if (!existsSync(bak)) copyFileSync(src, bak);
  }
}

writeFileSync(join(dataDir, "tools.json"), JSON.stringify(tools, null, 0));
writeFileSync(join(dataDir, "blog.json"), JSON.stringify(posts, null, 0));

// 统计
const catCount = {};
for (const t of tools) catCount[t.category] = (catCount[t.category] || 0) + 1;
console.log(`tools.json: ${tools.length} 条`);
console.log("品类分布:", JSON.stringify(catCount, null, 2));
console.log(`blog.json: ${posts.length} 篇`);
const tagCount = {};
for (const p of posts) tagCount[p.tag] = (tagCount[p.tag] || 0) + 1;
console.log("标签分布:", JSON.stringify(tagCount, null, 2));
