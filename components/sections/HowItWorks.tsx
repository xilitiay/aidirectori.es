const steps = [
  {
    n: "01",
    title: "浏览与筛选",
    desc: "按品类、平台或关键词搜索，快速找到符合你需求的外贸独立站与供货渠道。",
  },
  {
    n: "02",
    title: "查看替代方案",
    desc: "在任一站点页查看同类替代独立站，横向对比定位、定价与模式。",
  },
  {
    n: "03",
    title: "学习与上线",
    desc: "结合博客的建站、选品、支付与合规实战，把你的独立站跑起来。",
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="w-full bg-[#F5F6F8] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            使用<span className="font-instrument-serif italic"> 流程</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50">
            简单三步，找到并做成你的外贸独立站。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-md transition-shadow"
            >
              <div className="text-[#3D8054] font-instrument-serif italic text-3xl mb-4">
                {s.n}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-[15px] text-gray-900/50 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
