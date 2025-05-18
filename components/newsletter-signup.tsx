"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "¡Suscrito!",
        description: "Has sido añadido a nuestro boletín.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <Input
        placeholder="Ingresa tu email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-primary-800 border-primary-700 text-white placeholder:text-primary-300"
      />
      <Button type="submit" disabled={isSubmitting} className="bg-white text-primary-900 hover:bg-primary-100">
        {isSubmitting ? "Suscribiendo..." : "Suscribirse"}
      </Button>
    </form>
  )
}
