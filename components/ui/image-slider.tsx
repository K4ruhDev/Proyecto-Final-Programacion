'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const images = [
    "/images/hero-coffee1.png",
    "/images/hero-coffee2.jpg",
    "/images/hero-coffee3.jpg",
]

export default function ImageSlider() {
    const [current, setCurrent] = useState(0)
    const [prev, setPrev] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setPrev(current)
            setCurrent((prevIndex) => (prevIndex + 1) % images.length)
            setIsTransitioning(true)

            setTimeout(() => setIsTransitioning(false), 1000) // duración de la transición
        }, 5000)

        return () => clearInterval(interval)
    }, [current])

    return (
        <div className="relative h-[600px] md:h-[700px] overflow-hidden">
            {/* Imagen anterior (solo si hay transición) */}
            {isTransitioning && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={images[prev]}
                        alt="Slide anterior"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            )}

            {/* Imagen actual */}
            <motion.div
                initial={{ opacity: isTransitioning ? 0 : 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: isTransitioning ? 1 : 0 }}
                className="absolute inset-0 z-10"
            >
                <Image
                    src={images[current]}
                    alt="Slide actual"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
        </div>
    )
}
