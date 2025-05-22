import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/auth/profile-form"
import { ChangePasswordForm } from "@/components/auth/change-password-form"
import { UserOrders } from "@/components/auth/user-orders"
import { LogoutButton } from "@/components/auth/logout-button"
import { AuthCheck } from "@/components/auth/auth-check"

export const metadata: Metadata = {
    title: "Mi cuenta",
    description: "Gestiona tu cuenta y pedidos en Onsen Coffee",
}

export default function AccountPage() {
    return (
        <AuthCheck>
            <div className="container py-10 md:py-16">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Mi cuenta</h1>
                        <LogoutButton />
                    </div>

                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="mb-8">
                            <TabsTrigger value="profile">Perfil</TabsTrigger>
                            <TabsTrigger value="password">Contraseña</TabsTrigger>
                            <TabsTrigger value="orders">Pedidos</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <ProfileForm />
                        </TabsContent>
                        <TabsContent value="password">
                            <ChangePasswordForm />
                        </TabsContent>
                        <TabsContent value="orders">
                            <UserOrders />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AuthCheck>
    )
}
