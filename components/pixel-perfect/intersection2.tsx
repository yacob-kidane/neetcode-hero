import { cn } from "@/lib/utils";

type Intersection2Props = {
  children: React.ReactNode;
  className?: string;
  centerClassName?: string;
  horizontalOnly?: boolean;
};

const Intersection2 = ({
  children,
  className,
  centerClassName,
  horizontalOnly = false,
}: Intersection2Props) => {
  if (horizontalOnly) {
    return (
      <div
        className={cn(
          "relative h-full w-full [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10",
          className,
        )}
      >
        <div className={cn("relative z-10", centerClassName)}>{children}</div>
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-4 w-screen -translate-x-1/2 border-y border-white/20 mask-x-from-60% bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 bottom-0 h-4 w-screen -translate-x-1/2 border-y border-white/18 mask-x-from-60% bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-full w-full grid grid-cols-[1fr_1rem_auto_1rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:bg-transparent dark:[--pattern-fg:var(--color-white)]/10",
        className,
      )}
    >
      {/* Center content */}
      <div className={cn("relative col-start-3 row-start-3 flex max-w-lg flex-col", centerClassName)}>
        {children}
      </div>
      {/* Left vertical line */}
      <div className="-right-px col-start-2 row-span-full row-start-1 border-x mask-y-from-60% bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" />
      {/* Right vertical line */}
      <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) mask-y-from-60% bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" />
      {/* Top horizontal line */}
      <div className="relative -bottom-px col-span-full col-start-1 row-start-2 mask-x-from-60% border-t border-dashed" />
      {/* Bottom horizontal line */}
      <div className="relative -top-px col-span-full col-start-1 row-start-4 mask-x-from-60% border-b border-dashed" />
    </div>
  );
};

export default Intersection2;
