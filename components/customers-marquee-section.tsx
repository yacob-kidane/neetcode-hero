import { Suspense } from "react";
import { VerticalMarquee } from "@/components/unlumen-ui/vertical-marquee";

/** Placeholder: same post for all columns until you swap in more IDs. */
const TWEET_ID = "2044299838234472915";
const TWEET_IDS: string[] = [TWEET_ID, TWEET_ID, TWEET_ID, TWEET_ID];

async function MarqueeInner() {
  return (
    <VerticalMarquee
      tweetIds={TWEET_IDS}
      className="mx-auto h-[min(640px,70vh)] max-w-5xl"
      speed={28}
      columns={2}
    />
  );
}

export function CustomersMarqueeSection() {
  return (
    <section id="customers" className="relative bg-bg py-[10rem]">
      <div className="mx-auto w-full max-w-[100rem] px-6 lg:px-12">
        <div className="reveal-up mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="editorial-badge">VOICES</div>
          </div>
          <h2 className="text-h3 text-white">What builders are saying</h2>
          <p className="text-body mx-auto mt-4 max-w-xl">
            Live posts from the community — pause on hover to read.
          </p>
        </div>
        <Suspense
          fallback={
            <div className="mx-auto h-[560px] max-w-5xl animate-pulse rounded-xl border border-white/10 bg-white/[0.04]" />
          }
        >
          <MarqueeInner />
        </Suspense>
      </div>
    </section>
  );
}
