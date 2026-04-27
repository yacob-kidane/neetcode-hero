import { HeroSectionV2 } from "@/components/landing/HeroSectionV2";
import { PreloaderGate } from "@/components/landing/PreloaderGate";
import { PreloaderProvider } from "@/components/landing/PreloaderContext";
import { SiteNav } from "@/components/landing/SiteNav";
import { StagedPageBoot } from "@/components/landing/staged-page/StagedPageBoot";
import { StagedPageRevealProvider } from "@/components/landing/staged-page/StagedPageRevealContext";

export default function V2Page() {
  return (
    <PreloaderProvider>
      <StagedPageRevealProvider>
        <StagedPageBoot />
        <PreloaderGate nav={<SiteNav />} hero={<HeroSectionV2 />} />
      </StagedPageRevealProvider>
    </PreloaderProvider>
  );
}

