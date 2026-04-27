import { Icon } from "@iconify/react";
import Link from "next/link";
import { CustomersMarqueeSection } from "@/components/customers-marquee-section";
import Features11 from "@/components/features-11";
import { HeroCardStack } from "@/components/landing/HeroCardStack";
import { HeroSection } from "@/components/landing/HeroSection";
import { PreloaderGate } from "@/components/landing/PreloaderGate";
import { PreloaderProvider } from "@/components/landing/PreloaderContext";
import { SiteNav } from "@/components/landing/SiteNav";
import { StagedContentVisibility } from "@/components/landing/staged-page/StagedContentVisibility";
import { StagedPageBoot } from "@/components/landing/staged-page/StagedPageBoot";
import { StagedPageRevealProvider } from "@/components/landing/staged-page/StagedPageRevealContext";

const HERO_ONLY_MODE = true;

export default function Home() {
  return (
    <PreloaderProvider>
      <StagedPageRevealProvider>
        <StagedPageBoot />
        <PreloaderGate nav={<SiteNav />} hero={<HeroSection />}>
        {!HERO_ONLY_MODE ? (
        <StagedContentVisibility>
        <main className="relative z-10 w-full">
        <section id="courses" className="relative bg-bg py-[12rem]">
          <div className="mx-auto w-full max-w-[100rem] px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-[4rem] lg:grid-cols-12 lg:items-start lg:gap-x-14 lg:gap-y-12 xl:gap-x-20">
              <div className="reveal-up lg:col-span-5">
                <div className="editorial-badge mb-[2rem]">THE_FRICTION</div>
                <h2 className="text-h3 mb-6 text-white">
                  Growth shouldn&apos;t break your systems. Or your people.
                </h2>
                <Link href="#features" className="btn-outline mt-8">
                  Explore the architecture
                  <Icon icon="solar:arrow-right-linear" aria-hidden />
                </Link>
              </div>

              <div className="reveal-up delay-1 flex min-h-0 w-full flex-col gap-[3rem] lg:col-span-7">
                <div className="flex w-full min-w-0 justify-center lg:justify-end">
                  <HeroCardStack />
                </div>
                <p className="text-body text-white">
                  As organizations scale, legacy tools create compounding technical debt. Data silos
                  form. Workflows fracture. Your best talent spends hours managing the software that
                  was supposed to manage the work.
                </p>
                <div className="border-l border-white/20 pl-6 lg:pl-10">
                  <p className="text-body">
                    Strata replaces fragmented point solutions with a singular, deterministic
                    architecture. It&apos;s designed to be invisible when you don&apos;t need it,
                    and infinitely powerful when you do.{" "}
                    <strong>Trust the system. Empower the human.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="relative overflow-hidden bg-bg py-[6rem]">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[80vw] max-h-[1000px] w-[80vw] max-w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />

          <div className="relative z-10 mx-auto w-full max-w-[100rem] px-6 lg:px-12">
            <div className="reveal-up mb-[6rem] flex flex-col items-center text-center">
              <div className="editorial-badge mb-[2rem]">INTERFACE // CORE</div>
              <h2 className="text-h2 max-w-[40rem] text-white">Clarity at any velocity.</h2>
            </div>

            <div className="glass-panel reveal-up relative flex aspect-[16/10] w-full flex-col overflow-hidden rounded-lg shadow-[0_20px_60px_-15px_rgba(255,255,255,0.05)] md:aspect-[21/9]">
              <div className="flex h-[3rem] items-center gap-4 border-b border-white/10 bg-white/[0.02] px-6">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                </div>
                <div className="ml-4 flex gap-6 font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase text-textsec">
                  <span className="border-b border-white pb-1 text-white">Overview</span>
                  <span>Revenue</span>
                  <span>Pipeline</span>
                </div>
              </div>

              <div className="grid flex-grow grid-cols-1 gap-6 bg-[#050505] p-6 md:grid-cols-3">
                <div className="group relative flex flex-col justify-between overflow-hidden rounded border border-white/5 bg-surface/50 p-6 md:col-span-2">
                  <div className="mb-8 flex items-start justify-between">
                    <div>
                      <span className="mb-1 block font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase text-textsec">
                        ARR_Velocity
                      </span>
                      <span className="text-3xl font-semibold tracking-tight text-white">$4.2M</span>
                    </div>
                    <span className="rounded bg-white/10 px-2 py-1 text-xs text-white">
                      +124% YOY
                    </span>
                  </div>
                  <div className="mt-auto flex h-[120px] items-end gap-2">
                    <div className="h-[30%] w-full rounded-t bg-white/10 transition-colors duration-300 group-hover:bg-white/20" />
                    <div className="h-[45%] w-full rounded-t bg-white/10 transition-colors delay-75 duration-300 group-hover:bg-white/20" />
                    <div className="h-[60%] w-full rounded-t bg-white/20 transition-colors delay-100 duration-300 group-hover:bg-white/30" />
                    <div className="h-[80%] w-full rounded-t bg-white/30 transition-colors delay-150 duration-300 group-hover:bg-white/40" />
                    <div className="h-full w-full rounded-t bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex-grow rounded border border-white/5 bg-surface/50 p-6">
                    <span className="mb-4 block font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase text-textsec">
                      Active_Nodes
                    </span>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <span className="h-2 w-2 rounded-full bg-white" /> Enterprise
                        </div>
                        <span className="font-mono text-xs text-textsec">84</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <span className="h-2 w-2 rounded-full bg-white/40" /> Mid-Market
                        </div>
                        <span className="font-mono text-xs text-textsec">212</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <span className="h-2 w-2 rounded-full bg-white/10" /> SMB
                        </div>
                        <span className="font-mono text-xs text-textsec">890</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div>
          <div className="mx-auto mb-12 max-w-[100rem] px-6 pt-[8rem] lg:px-12">
            <div className="editorial-badge mb-[2rem]">CAPABILITIES</div>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <h2 className="text-h3 text-white">
                Engineered for
                <br />
                leverage.
              </h2>
              <p className="text-body max-w-[24rem]">
                Complex operations reduced to elegant primitives.
              </p>
            </div>
          </div>
          <Features11 />
        </div>

        <section id="metrics" className="relative border-y border-white/10 bg-surface/30 py-[8rem]">
          <div className="mx-auto grid w-full max-w-[100rem] grid-cols-1 gap-12 divide-y divide-white/10 px-6 text-center md:grid-cols-3 md:gap-6 md:divide-x md:divide-y-0 lg:px-12">
            <div className="reveal-up flex flex-col items-center pt-8 md:pt-0">
              <div className="mb-4 flex items-baseline text-[clamp(3.5rem,6vw,5rem)] font-semibold leading-none tracking-tighter text-white">
                <span className="metric-counter" data-target="300">
                  0
                </span>
                <span className="ml-1 text-4xl text-textsec">%</span>
              </div>
              <span className="block font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-[0.08em] text-white">
                Average ROI (Year 1)
              </span>
            </div>

            <div className="reveal-up delay-1 flex flex-col items-center pt-8 md:pt-0">
              <div className="mb-4 flex items-baseline text-[clamp(3.5rem,6vw,5rem)] font-semibold leading-none tracking-tighter text-white">
                <span className="metric-counter" data-target="45">
                  0
                </span>
                <span className="ml-2 text-4xl text-textsec">hrs</span>
              </div>
              <span className="block font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-[0.08em] text-textsec">
                Saved per week / team
              </span>
            </div>

            <div className="reveal-up delay-2 flex flex-col items-center pt-8 md:pt-0">
              <div className="mb-4 flex items-baseline text-[clamp(3.5rem,6vw,5rem)] font-semibold leading-none tracking-tighter text-white">
                <span className="metric-counter" data-target="99.99" data-decimals="2">
                  0
                </span>
                <span className="ml-1 text-4xl text-textsec">%</span>
              </div>
              <span className="block font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-[0.08em] text-textsec">
                System Uptime SLA
              </span>
            </div>
          </div>
        </section>

        <CustomersMarqueeSection />

        <section
          id="pricing"
          className="relative overflow-hidden bg-white pt-[12rem] pb-[12rem] text-black"
        >
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 mx-auto flex w-full max-w-[100rem] flex-col items-center px-6 text-center lg:px-12">
            <div className="reveal-up flex w-full max-w-[56rem] flex-col items-center">
              <h2 className="text-h1 -translate-y-16 mb-10 max-w-[50rem] text-black">Pricing</h2>
              <div className="grid w-full gap-6 text-left sm:grid-cols-2">
                <div className="border border-black/10 bg-black/[0.02] p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-black/50">
                    Free
                  </p>
                  <p className="mt-4 text-2xl font-semibold text-black">Community</p>
                  <p className="text-body mt-3 text-black/70">
                    Full roadmap access, video solutions, and discussion. Start here.
                  </p>
                  <Link
                    href="#platform"
                    className="mt-8 inline-flex border border-black/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] text-black transition-colors hover:bg-black hover:text-white"
                  >
                    Browse catalog
                  </Link>
                </div>
                <div className="border border-black bg-black p-8 text-white">
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-white/60">Pro</p>
                  <p className="mt-4 text-2xl font-semibold">Premium</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Premium problems, company-specific tracks, and faster iteration cycles.
                  </p>
                  <Link
                    href="#contact"
                    className="mt-8 inline-flex bg-white px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.08em] text-black transition-colors hover:bg-white/90"
                  >
                    Get Pro
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-black/10 bg-white py-16 text-black">
          <div className="mx-auto flex w-full max-w-[32rem] flex-col gap-4 px-6 sm:flex-row sm:items-center">
            <input
              type="email"
              name="email"
              placeholder="work email address"
              className="w-full flex-grow border-b border-black/20 bg-black/5 px-4 py-4 font-mono text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none"
            />
            <button
              type="button"
              className="group flex w-full items-center justify-center gap-2 bg-black px-8 py-4 font-sans text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-black/80 sm:w-auto"
            >
              Request Access
              <Icon
                icon="solar:arrow-right-linear"
                className="transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </button>
          </div>
          <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.08em] text-black/40">
            No credit card required. SOC2 Compliant.
          </p>
        </section>
      </main>

      <footer className="relative z-10 w-full border-t border-white/10 bg-black py-[6rem] font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-[0.08em] text-textsec">
        <div className="mx-auto grid max-w-[100rem] grid-cols-1 gap-[4rem] px-6 md:grid-cols-12 md:gap-[2rem] lg:px-12">
          <div className="col-span-1 flex flex-col items-start gap-4 md:col-span-4">
            <div className="flex items-center gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <rect x="2" y="2" width="20" height="20" stroke="white" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="white" />
              </svg>
              <span className="font-sans text-base font-semibold tracking-tight text-white uppercase">
                Neetcode
              </span>
            </div>
            <p className="mt-2">INTERVIEW_PREP</p>
          </div>

          <div className="col-span-1 flex justify-between md:col-span-4 md:justify-around">
            <div className="flex flex-col gap-4">
              <span className="mb-2 text-white">Learn</span>
              <Link href="/#courses" className="transition-colors hover:text-white">
                Courses
              </Link>
              <Link href="/#features" className="transition-colors hover:text-white">
                Features
              </Link>
              <Link href="/#pricing" className="transition-colors hover:text-white">
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="mb-2 text-white">Company</span>
              <Link href="#" className="transition-colors hover:text-white">
                About
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Careers
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Blog
              </Link>
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-4 md:col-span-4 md:items-end">
            <div className="mb-4 flex gap-4 text-xl text-white">
              <Link href="#" className="transition-colors hover:text-white/60" aria-label="Twitter">
                <Icon icon="solar:twit-linear" />
              </Link>
              <Link href="#" className="transition-colors hover:text-white/60" aria-label="Link">
                <Icon icon="solar:link-linear" />
              </Link>
            </div>
            <Link href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <span className="mt-4 text-white/30">© 2026 NEETCODE</span>
          </div>
        </div>
      </footer>
        </StagedContentVisibility>
        ) : null}
        </PreloaderGate>
      </StagedPageRevealProvider>
    </PreloaderProvider>
  );
}
