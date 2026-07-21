import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "#/components/landing/Navbar";
import { Hero } from "#/components/landing/Hero";
import { LogoCloud } from "#/components/landing/LogoCloud";
import { PlatformTabs } from "#/components/landing/PlatformTabs";
import { DarkFeature } from "#/components/landing/DarkFeature";
import { FeatureCards } from "#/components/landing/FeatureCards";
import { CustomerStories } from "#/components/landing/CustomerStories";
import { Changelog } from "#/components/landing/Changelog";
import { FinalCTA } from "#/components/landing/FinalCTA";
import { SiteFooter } from "#/components/landing/SiteFooter";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F0E4]">
      <Navbar />
      <Hero />
      <LogoCloud />
      <PlatformTabs />
      <DarkFeature />
      <FeatureCards />
      <CustomerStories />
      <Changelog />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}
