import { Suspense } from "react"
import HeroSection from "@/components/home/hero-section"
import FeaturedSection from "@/components/home/featured-section"
import AboutSection from "@/components/home/about-section"
import ProcessSection from "@/components/home/process-section"
import TestimonialsSection from "@/components/home/testimonials-section"
import BlogPreviewSection from "@/components/home/blog-preview-section"
import NewsletterSection from "@/components/home/newsletter-section"
import { getProductsServer } from "@/lib/services/product-service"
import { getBlogPostsServer } from "@/lib/services/blog-service"
import { Skeleton } from "@/components/ui/skeleton"

export default async function HomePage() {
    return (
        <div className="animate-fadeIn">
            <HeroSection />

            <Suspense fallback={<FeaturedSectionSkeleton />}>
                <FeaturedProductsWrapper />
            </Suspense>

            <AboutSection />

            <ProcessSection />

            <TestimonialsSection />

            <Suspense fallback={<BlogSectionSkeleton />}>
                <BlogPreviewWrapper />
            </Suspense>

            <NewsletterSection />
        </div>
    )
}

async function FeaturedProductsWrapper() {
    // Obtener más productos para el carrusel
    const featuredProducts = await getProductsServer({ featured: true, limit: 8 })
    return <FeaturedSection products={featuredProducts} />
}

async function BlogPreviewWrapper() {
    // Obtener posts recientes del blog
    const recentPosts = await getBlogPostsServer({ limit: 3 })
    return <BlogPreviewSection posts={recentPosts} />
}

function FeaturedSectionSkeleton() {
    return (
        <section className="py-16">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                        <Skeleton className="h-8 w-64 mb-2" />
                        <Skeleton className="h-4 w-full max-w-md" />
                    </div>
                    <Skeleton className="h-10 w-40 mt-4 md:mt-0" />
                </div>

                {/* Skeleton del carrusel */}
                <div className="relative">
                    <div className="flex gap-6 overflow-hidden">
                        {Array(4)
                            .fill(0)
                            .map((_, i) => (
                                <div key={i} className="flex-none w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                                    <div className="border rounded-lg p-4">
                                        <Skeleton className="h-48 w-full rounded-md mb-4" />
                                        <Skeleton className="h-6 w-3/4 mb-2" />
                                        <Skeleton className="h-4 w-1/2 mb-4" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* Skeleton de los botones de navegación */}
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    )
}

function BlogSectionSkeleton() {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-10">
                    <Skeleton className="h-8 w-64 mx-auto mb-2" />
                    <Skeleton className="h-4 w-full max-w-md mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Array(3)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                                <Skeleton className="h-48 w-full" />
                                <div className="p-6">
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-1/2 mb-4" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-3/4 mb-4" />
                                    <Skeleton className="h-10 w-1/3" />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    )
}