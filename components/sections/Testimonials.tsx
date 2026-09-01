const testimonials = [
  {
    quote:
      "在这里一次性对比了十几个服装独立站，选品和定价参考非常直接，省下了大量调研时间。",
    name: "林晓",
    role: "跨境电商卖家",
  },
  {
    quote:
      "B2B 批发频道帮我快速对接到靠谱的工厂与贸易商，询盘效率明显提升。",
    name: "David Chen",
    role: "外贸采购",
  },
  {
    quote:
      "博客里的建站与支付教程很实用，新手也能照着把第一个独立站跑起来。",
    name: "王磊",
    role: "独立站运营",
  },
];

function initials(name: string) {
  return name.slice(0, 1);
}

export default function Testimonials() {
  return (
    <div id="testimonials" className="w-full bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            出海卖家的<span className="font-instrument-serif italic"> 信赖之选</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50">
            已有 1000+ 出海卖家通过我们筛选站点与渠道。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-gray-100 bg-[#F5F6F8] p-7">
              <p className="text-[15px] text-gray-900/70 leading-relaxed">“{t.quote}”</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#66CC8A]/20 text-[#3D8054] flex items-center justify-center font-semibold">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-gray-900">{t.name}</div>
                  <div className="text-[13px] text-gray-900/50">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
