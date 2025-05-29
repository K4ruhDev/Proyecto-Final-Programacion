"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Mail, User, Phone, MapPin, Loader2, Trash2, UserCog } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

interface Client {
    id: string
    created_at: string
    full_name: string
    email: string
    phone?: string
    address?: string | AddressObject // Update type to allow AddressObject
    role: string
    avatar_url?: string
}

// Define the shape of the address object
interface AddressObject {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

const roleColors = {
    admin: "bg-purple-500 hover:bg-purple-600",
    customer: "bg-green-500 hover:bg-green-600"
}

const roleLabels = {
    admin: "Administrador",
    customer: "Cliente"
}

export default function ClientDetailPage() {
    const params = useParams()
    const router = useRouter()
    const clientId = params.id as string

    const [client, setClient] = useState<Client | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const getClientById = async () => {
            try {
                setIsLoading(true)
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', clientId)
                    .single()

                if (error) {
                    console.error('Error:', error)
                    toast.error('Error al cargar el cliente')
                    return
                }

                // Parse the address JSON string if it exists
                if (data && typeof data.address === 'string') {
                    try {
                        data.address = JSON.parse(data.address) as AddressObject;
                    } catch (jsonError) {
                        console.error('Error parsing address JSON:', jsonError);
                        data.address = undefined; // Set to undefined if parsing fails
                    }
                }

                setClient(data)
            } catch (error) {
                console.error('Error:', error)
                toast.error('Error inesperado al cargar el cliente')
            } finally {
                setIsLoading(false)
            }
        }

        if (clientId) {
            getClientById()
        }
    }, [clientId])

    const deleteClient = async () => {
        if (!client) return

        const confirmMessage = `¿Estás seguro de que quieres eliminar al cliente "${client.full_name}"? Esta acción no se puede deshacer y eliminará todos los datos asociados.`

        if (!confirm(confirmMessage)) {
            return
        }

        try {
            setIsDeleting(true)

            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', client.id)

            if (error) {
                throw error
            }

            toast.success('Cliente eliminado correctamente')
            router.push('/admin/clients')
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al eliminar el cliente')
        } finally {
            setIsDeleting(false)
        }
    }

    const handleEmailClient = () => {
        if (client) {
            const subject = `Hola ${client.full_name}`
            window.location.href = `mailto:${client.email}?subject=${encodeURIComponent(subject)}`
        }
    }

    // Helper function to format the address for display
    const formatAddress = (address: AddressObject | string | undefined) => {
        if (typeof address === 'object' && address !== null) {
            return `${address.street}, ${address.postal_code} ${address.city}, ${address.state}, ${address.country}`;
        }
        return address || <span className="text-muted-foreground">No especificada</span>;
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <Card className="w-full max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Cargando cliente...</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!client) {
        return (
            <div className="container mx-auto p-6">
                <Card className="w-full max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Cliente no encontrado</CardTitle>
                        <CardDescription>El cliente que buscas no existe o ha sido eliminado</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => router.back()} variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <Button onClick={() => router.back()} variant="outline" className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a la lista
                </Button>
            </div>

            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                                {client.avatar_url ? (
                                    <img
                                        src={client.avatar_url}
                                        alt={client.full_name}
                                        className="h-16 w-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="h-8 w-8 text-gray-500" />
                                )}
                            </div>
                            <div>
                                <CardTitle className="text-2xl mb-2">{client.full_name}</CardTitle>
                                <CardDescription>
                                    Cliente desde {formatDate(client.created_at)}
                                </CardDescription>
                            </div>
                        </div>
                        <Badge
                            variant="default"
                            className={`${roleColors[client.role as keyof typeof roleColors]} text-white`}
                        >
                            {roleLabels[client.role as keyof typeof roleLabels]}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Información de contacto */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    Email
                                </div>
                                <p className="text-lg">
                                    <a
                                        href={`mailto:${client.email}`}
                                        className="text-green-600 hover:text-green-800 hover:underline"
                                    >
                                        {client.email}
                                    </a>
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    Teléfono
                                </div>
                                <p className="text-lg">
                                    {client.phone ? (
                                        <a
                                            href={`tel:${client.phone}`}
                                            className="text-green-600 hover:text-green-800 hover:underline"
                                        >
                                            {client.phone}
                                        </a>
                                    ) : (
                                        <span className="text-muted-foreground">No especificado</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Dirección */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            Dirección
                        </div>
                        <p className="text-lg">
                            {formatAddress(client.address)}
                        </p>
                    </div>

                    <Separator />

                    {/* Información del sistema */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Información del Sistema</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    Fecha de registro
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(client.created_at)}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <UserCog className="h-4 w-4" />
                                    ID del sistema
                                </div>
                                <p className="text-sm text-muted-foreground font-mono">
                                    {client.id}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Acciones */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Acciones</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                onClick={handleEmailClient}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <Mail className="mr-2 h-4 w-4" />
                                Enviar Email
                            </Button>

                            {client.phone && (
                                <Button
                                    onClick={() => window.location.href = `tel:${client.phone}`}
                                    variant="outline"
                                >
                                    <Phone className="mr-2 h-4 w-4" />
                                    Llamar
                                </Button>
                            )}

                            <Button
                                onClick={deleteClient}
                                variant="destructive"
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="mr-2 h-4 w-4" />
                                )}
                                Eliminar Cliente
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}