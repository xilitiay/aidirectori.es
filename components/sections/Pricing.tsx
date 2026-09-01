import Link from "next/link";

const tiers = [
  {
    name: "入门",
    price: "¥499",
    period: "一次性",
    desc: "适合单个站点首次收录。",
    features: ["提交至 50+ 收录目录", "人工审核提交", "收录外链报告", "7 个工作日内完成"],
    highlighted: false,
  },
  {
    name: "专业",
    price: "¥999",
    period: "一次性",
    desc: "最受欢迎的套餐。",
    features: [
      "提交至 100+ 收录目录",
      "人工审核提交",
      "优先处理",
      "收录数据看板",
      "5 个工作日内完成",
    ],
    highlighted: true,
  },
  {
    name: "规模",
    price: "¥1999",
    period: "一次性",
    desc: "适合品牌与多站点矩阵。",
    features: ["提交至 100+ 收录目录", "最多 5 个站点", "专属客户经理", "API 对接", "3 个工作日内完成"],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <div id="pricing" className="w-full bg-[#F5F6F8] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            简单透明的<span className="font-instrument-serif italic"> 一次性定价</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50">
            一次付费，收录与曝光长期有效。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl border p-8 ${
                t.highlighted
                  ? "border-[#66CC8A] bg-white shadow-lg ring-1 ring-[#66CC8A]/30"
                  : "border-gray-100 bg-white"
              }`}
            >
              {t.highlighted && (
                <span className="inline-block mb-3 px-3 py-1 text-[12px] font-semibold text-[#3D8054] bg-[#66CC8A]/15 rounded-full">
                  最受欢迎
                </span>
              )}
              <h3 className="text-xl font-semibold text-gray-900">{t.name}</h3>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-medium text-gray-900">{t.price}</span>
                <span className="text-[14px] text-gray-900/40 mb-1">{t.period}</span>
              </div>
              <p className="mt-2 text-[14px] text-gray-900/50">{t.desc}</p>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[14px] text-gray-900/70">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 text-[#3D8054]">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signin"
                className={`mt-8 block text-center py-3 rounded-full font-semibold text-[14px] transition-colors ${
                  t.highlighted
                    ? "bg-[#66CC8A] text-white hover:bg-[#54AF74]"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                选择 {t.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
