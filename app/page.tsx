import HeroSection from "@/components/home/hero-section"
import FeaturedSection from "@/components/home/featured-section"
import AboutSection from "@/components/home/about-section"
import BlogPreviewSection from "@/components/home/blog-preview-section"
import NewsletterSection from "@/components/home/newsletter-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedSection />
      <AboutSection />
      <BlogPreviewSection />
      <NewsletterSection />
    </div>
  )
}
