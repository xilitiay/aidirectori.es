const features = [
  {
    title: "12 大品类",
    desc: "覆盖服装、3C、家居、美妆、户外、汽配、宠物、B2B 等外贸独立站核心品类。",
  },
  {
    title: "人工精选",
    desc: "每个站点都经过人工筛选与持续更新，剔除低质与失效链接。",
  },
  {
    title: "DTC 与 B2B",
    desc: "同时收录面向消费者的 DTC 品牌站与面向采购的 B2B 批发站。",
  },
  {
    title: "替代方案",
    desc: "为热门站点提供替代独立站推荐，方便横向对比与选品。",
  },
  {
    title: "双语内容",
    desc: "站点介绍、FAQ 与博客均为中英文双语，兼顾国内外出海团队。",
  },
  {
    title: "持续更新",
    desc: "紧跟平台与品类变化，定期补充新站点与最新实战文章。",
  },
];

export default function Features() {
  return (
    <div id="features" className="w-full bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            发现优质外贸独立站<span className="font-instrument-serif italic"> 所需的一切</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50">
            一个为出海卖家打造的跨境独立站导航。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-100 bg-[#F5F6F8] p-7 hover:border-[#66CC8A]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[#66CC8A]/15 flex items-center justify-center mb-4">
                <div className="w-4 h-4 rounded-full bg-[#66CC8A]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-[14px] text-gray-900/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
