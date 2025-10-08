import Hero from "@/components/Hero";
import FeaturedDresses from "@/components/FeaturedDresses";
import AboutSection from "@/components/AboutSection";

// Disable caching for homepage to show latest dresses
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDresses />
      <AboutSection />
    </>
  );
}
