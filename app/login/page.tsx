"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginAuth, RegisterAuth } from "@/components/login/login-auth"

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState("login")

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="mx-auto w-full max-w-md">
                <Tabs
                    defaultValue="login"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login" className="mt-0">
                        <LoginAuth />
                    </TabsContent>
                    <TabsContent value="register" className="mt-0">
                        <RegisterAuth />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}