import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Svg9 from "@/components/pixel-perfect/svg-9";
import { Code2, Globe, LayoutGrid, Shield, Zap } from "lucide-react";

/**
 * Tailark-style bento (features-11) adapted for this project: no external raster assets,
 * uses shadcn Card + lucide for a comparable grid on a dark surface.
 */
export default function Features11() {
  return (
    <section id="features" className="bg-bg py-16 md:py-32">
      <div className="mx-auto max-w-[100rem] px-6 lg:px-12">
        <div className="mx-auto grid gap-2 sm:grid-cols-5">
          <Card className="group overflow-hidden border-white/10 bg-surface/80 shadow-black/40 sm:col-span-3 sm:rounded-none sm:rounded-tl-xl sm:border">
            <CardHeader>
              <div className="md:p-6">
                <p className="font-medium text-white">Advanced tracking system</p>
                <p className="mt-3 max-w-sm text-sm text-textsec">
                  Quick AI lives a single hotkey away — ready to appear as a floating window above
                  your other apps.
                </p>
              </div>
            </CardHeader>

            <div className="relative h-fit pl-6 md:pl-12">
              <div className="overflow-hidden rounded-tl-lg border border-white/10 border-l border-t bg-[#050505] pl-2 pt-2">
                <div className="flex aspect-[1207/929] max-h-[280px] items-center justify-center rounded-tl-md bg-gradient-to-br from-white/10 to-transparent">
                  <LayoutGrid className="size-16 text-white/30" aria-hidden />
                </div>
              </div>
            </div>
          </Card>

          <Card className="group overflow-hidden border-white/10 bg-surface/80 shadow-black/40 sm:col-span-2 sm:rounded-none sm:rounded-tr-xl sm:border">
            <p className="mx-auto my-6 max-w-md px-6 text-center text-lg font-semibold text-balance text-white sm:text-2xl md:p-6">
              Advanced UX — instantly locate all your assets.
            </p>

            <CardContent className="mt-auto h-fit">
              <div className="relative max-sm:mb-6">
                <div className="aspect-[76/59] overflow-hidden rounded-r-lg border border-white/10 bg-[#050505]">
                  <div className="flex size-full min-h-0 items-center justify-center p-3 md:p-4">
                    <Svg9 />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-white/10 bg-surface/80 p-6 shadow-black/40 sm:col-span-2 sm:rounded-none sm:rounded-bl-xl sm:border md:p-12">
            <p className="mx-auto mb-12 max-w-md text-center text-lg font-semibold text-balance text-white sm:text-2xl">
              Keyboard-first workflows for serious builders.
            </p>

            <div className="flex justify-center gap-6">
              <div className="relative flex aspect-square size-16 items-center rounded-[7px] border border-white/15 bg-white/[0.04] p-3 shadow-lg ring ring-white/5">
                <span className="absolute right-2 top-1 block text-xs text-textsec">fn</span>
                <Globe className="mt-auto size-4 text-white" />
              </div>
              <div className="flex aspect-square size-16 items-center justify-center rounded-[7px] border border-white/15 bg-white/[0.04] p-3 shadow-lg ring ring-white/5">
                <span className="text-sm font-medium text-white">K</span>
              </div>
            </div>
          </Card>

          <Card className="group relative border-white/10 bg-surface/80 shadow-black/40 sm:col-span-3 sm:rounded-none sm:rounded-br-xl sm:border">
            <CardHeader className="p-6 md:p-12">
              <p className="font-medium text-white">Integrations that scale</p>
              <p className="mt-2 max-w-sm text-sm text-textsec">
                Connect your stack without losing the deterministic core.
              </p>
            </CardHeader>
            <CardContent className="relative h-fit px-6 pb-6 md:px-12 md:pb-12">
              <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                <div className="aspect-square rounded-lg border border-dashed border-white/20" />
                <div className="flex aspect-square items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] p-4">
                  <Zap className="m-auto size-6 text-white" />
                </div>
                <div className="aspect-square rounded-lg border border-dashed border-white/20" />
                <div className="flex aspect-square items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] p-4">
                  <Code2 className="m-auto size-6 text-white" />
                </div>
                <div className="aspect-square rounded-lg border border-dashed border-white/20" />
                <div className="flex aspect-square items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] p-4">
                  <Shield className="m-auto size-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
