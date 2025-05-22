"use client"

import UserIcon from "@/components/icons/user-icon"
import { Button } from "./button"
import { useRouter } from "next/navigation"
import type React from "react"

export default function LoginUserButton() {
    const router = useRouter()

    const handleClick = () => {
        router.push("/auth/login")
    }

    return (
        <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:inline-flex"
            onClick={handleClick}
        >
            <UserIcon className="h-5 w-5" />
            <span className="sr-only">Mi cuenta</span>
        </Button>
    )
}