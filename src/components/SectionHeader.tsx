function SectionHeader({
  module,
  title,
  meta,
}: {
  module: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="w-full px-2 pt-8 pb-6 flex flex-col gap-4">
      <div className="cp-section-head">
        <span>/// .{module}</span>
        {meta && <span>{meta}</span>}
      </div>
      <p className="text-4xl md:text-5xl font-bold uppercase tracking-wide text-(--cp-accent)">
        {title}
      </p>
    </div>
  );
}

export default SectionHeader;
