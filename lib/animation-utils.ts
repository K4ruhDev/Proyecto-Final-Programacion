"use client"

import { useEffect, useState, useRef } from "react"

export function useInView(options = {}) {
    const ref = useRef(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting)
        }, options)

        const currentRef = ref.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [options])

    return [ref, isInView]
}

// Hook para animar elementos cuando entran en el viewport
export function useScrollReveal() {
    useEffect(() => {
        const revealElements = document.querySelectorAll(".reveal")

        const revealOnScroll = () => {
            for (let i = 0; i < revealElements.length; i++) {
                const elementTop = revealElements[i].getBoundingClientRect().top
                const elementVisible = 150

                if (elementTop < window.innerHeight - elementVisible) {
                    revealElements[i].classList.add("active")
                }
            }
        }

        window.addEventListener("scroll", revealOnScroll)
        revealOnScroll() // Check on initial load

        return () => window.removeEventListener("scroll", revealOnScroll)
    }, [])
}

// Hook para animar elementos en una lista con efecto escalonado
export function useStaggeredAnimation() {
    useEffect(() => {
        const staggerItems = document.querySelectorAll(".stagger-item")

        const animateStaggerItems = () => {
            staggerItems.forEach((item, index) => {
                const elementTop = item.getBoundingClientRect().top
                const elementVisible = 150

                if (elementTop < window.innerHeight - elementVisible) {
                    setTimeout(() => {
                        item.classList.add("active")
                    }, index * 100) // 100ms delay between each item
                }
            })
        }

        window.addEventListener("scroll", animateStaggerItems)
        animateStaggerItems() // Check on initial load

        return () => window.removeEventListener("scroll", animateStaggerItems)
    }, [])
}

// Función para aplicar un efecto de parallax
export function applyParallax(element: HTMLElement, speed: number) {
    const handleScroll = () => {
        const scrollY = window.scrollY
        const yPos = scrollY * speed
        element.style.transform = `translateY(${yPos}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
}

// Función para crear un efecto de typing
export function typeText(element: HTMLElement, text: string, speed = 50) {
    let i = 0
    element.textContent = ""

    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i)
            i++
        } else {
            clearInterval(typing)
        }
    }, speed)

    return typing
}
