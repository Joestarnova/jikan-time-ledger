import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  trailing?: ReactNode;
  dot?: boolean;
  dotClassName?: string;
};

export default function SectionLabel({
  children,
  trailing,
  dot,
  dotClassName = "bg-amber-500",
}: SectionLabelProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
        {dot && (
          <span className={`h-1.5 w-1.5 rounded-full ${dotClassName}`} />
        )}
        {children}
      </div>
      {trailing && (
        <div className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
          {trailing}
        </div>
      )}
    </div>
  );
}
