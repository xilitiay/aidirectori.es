const categories = [
  "服装时尚",
  "3C数码",
  "家居园艺",
  "美妆个护",
  "户外运动",
  "汽车配件",
  "宠物用品",
  "B2B外贸",
  "综合百货",
  "珠宝配饰",
  "母婴玩具",
  "健康保健",
];

export default function FeaturedMarquee() {
  const row = [...categories, ...categories];
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[14px] sm:text-[16px] md:text-[18px] font-medium text-gray-900/50 mb-4 sm:mb-6 md:mb-8 px-4">
          覆盖服装、3C、家居、美妆、户外等外贸独立站品类，连接全球买家与供应商。
        </p>
        <div className="group w-full min-w-0 cursor-default overflow-hidden">
          <div className="flex w-max max-w-none gap-0 will-change-transform animate-marquee">
            {row.map((c, i) => (
              <div
                key={i}
                className="flex shrink-0 flex-nowrap items-center gap-2 sm:gap-2.5 pr-6 sm:pr-8 md:pr-10"
              >
                <span className="truncate text-[14px] font-bold text-gray-800 opacity-40 sm:text-[18px]">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-dashed border-blue-300/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
