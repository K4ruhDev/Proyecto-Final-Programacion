"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Mail, User, MessageSquare, Loader2, Check, Reply, Archive, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

interface Contact {
    id: number
    created_at: string
    name: string
    email: string
    subject: string
    message: string
    status: 'new' | 'read' | 'replied' | 'archived'
}

const statusColors = {
    new: "bg-blue-500 hover:bg-blue-600",
    read: "bg-gray-500 hover:bg-gray-600",
    replied: "bg-green-500 hover:bg-green-600",
    archived: "bg-yellow-500 hover:bg-yellow-600"
}

const statusLabels = {
    new: "Nuevo",
    read: "Leído",
    replied: "Respondido",
    archived: "Archivado"
}

export default function ContactDetailPage() {
    const params = useParams()
    const router = useRouter()
    const contactId = params.id as string

    const [contact, setContact] = useState<Contact | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        const getContactById = async () => {
            try {
                setIsLoading(true)
                const { data, error } = await supabase
                    .from('contact_messages')
                    .select('*')
                    .eq('id', contactId)
                    .single()

                if (error) {
                    console.error('Error:', error)
                    toast.error('Error al cargar el mensaje')
                    return
                }

                setContact(data)

                // Marcar como leído automáticamente si es nuevo
                if (data && data.status === 'new') {
                    await markAsRead(data.id, false)
                }
            } catch (error) {
                console.error('Error:', error)
                toast.error('Error inesperado al cargar el mensaje')
            } finally {
                setIsLoading(false)
            }
        }

        if (contactId) {
            getContactById()
        }
    }, [contactId])

    const markAsRead = async (id: number, showToast = true) => {
        try {
            setIsUpdating(true)

            const { error } = await supabase
                .from('contact_messages')
                .update({ status: 'read' })
                .eq('id', id)

            if (error) {
                throw error
            }

            setContact(prev => prev ? { ...prev, status: 'read' } : null)
            if (showToast) {
                toast.success('Mensaje marcado como leído')
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al actualizar el estado')
        } finally {
            setIsUpdating(false)
        }
    }

    const markAsReplied = async (id: number) => {
        try {
            setIsUpdating(true)

            const { error } = await supabase
                .from('contact_messages')
                .update({ status: 'replied' })
                .eq('id', id)

            if (error) {
                throw error
            }

            setContact(prev => prev ? { ...prev, status: 'replied' } : null)
            toast.success('Mensaje marcado como respondido')
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al actualizar el estado')
        } finally {
            setIsUpdating(false)
        }
    }

    const archiveMessage = async (id: number) => {
        try {
            setIsUpdating(true)

            const { error } = await supabase
                .from('contact_messages')
                .update({ status: 'archived' })
                .eq('id', id)

            if (error) {
                throw error
            }

            setContact(prev => prev ? { ...prev, status: 'archived' } : null)
            toast.success('Mensaje archivado')
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al actualizar el estado')
        } finally {
            setIsUpdating(false)
        }
    }

    const deleteMessage = async (id: number) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este mensaje? Esta acción no se puede deshacer.')) {
            return
        }

        try {
            setIsUpdating(true)

            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id)

            if (error) {
                throw error
            }

            toast.success('Mensaje eliminado correctamente')
            // Redirigir a admin después de eliminar
            router.push('/admin')
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al eliminar el mensaje')
        } finally {
            setIsUpdating(false)
        }
    }

    const handleEmailReply = () => {
        if (contact) {
            const subject = `Re: ${contact.subject}`
            const body = `Hola ${contact.name},\n\nGracias por contactarnos.\n\n---\nMensaje original:\n${contact.message}`
            window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <Card className="w-full max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Cargando mensaje...</CardTitle>
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

    if (!contact) {
        return (
            <div className="container mx-auto p-6">
                <Card className="w-full max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Mensaje no encontrado</CardTitle>
                        <CardDescription>El mensaje que buscas no existe o ha sido eliminado</CardDescription>
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
                        <div>
                            <CardTitle className="text-2xl mb-2">Mensaje de Contacto #{contact.id}</CardTitle>
                            <CardDescription>
                                Recibido el {formatDate(contact.created_at)}
                            </CardDescription>
                        </div>
                        <Badge
                            variant="default"
                            className={`${statusColors[contact.status]} text-white`}
                        >
                            {statusLabels[contact.status]}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Información del remitente */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <User className="h-4 w-4" />
                                Nombre
                            </div>
                            <p className="text-lg font-medium">{contact.name}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                Email
                            </div>
                            <p className="text-lg">
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="text-green-600 hover:text-green-800 hover:underline"
                                >
                                    {contact.email}
                                </a>
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Asunto */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            Asunto
                        </div>
                        <p className="text-lg font-medium">{contact.subject}</p>
                    </div>

                    <Separator />

                    {/* Mensaje */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            Mensaje
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                                {contact.message}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Información adicional */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            Fecha de recepción
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {formatDate(contact.created_at)}
                        </p>
                    </div>

                    <Separator />

                    {/* Acciones */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Acciones</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                onClick={handleEmailReply}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <Reply className="mr-2 h-4 w-4" />
                                Responder por Email
                            </Button>

                            {contact.status !== 'read' && (
                                <Button
                                    onClick={() => markAsRead(contact.id)}
                                    variant="outline"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Check className="mr-2 h-4 w-4" />
                                    )}
                                    Marcar como Leído
                                </Button>
                            )}

                            {contact.status !== 'replied' && (
                                <Button
                                    onClick={() => markAsReplied(contact.id)}
                                    variant="outline"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Check className="mr-2 h-4 w-4" />
                                    )}
                                    Marcar como Respondido
                                </Button>
                            )}

                            {contact.status !== 'archived' && (
                                <Button
                                    onClick={() => archiveMessage(contact.id)}
                                    variant="outline"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Archive className="mr-2 h-4 w-4" />
                                    )}
                                    Archivar
                                </Button>
                            )}

                            <Button
                                onClick={() => deleteMessage(contact.id)}
                                variant="destructive"
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="mr-2 h-4 w-4" />
                                )}
                                Eliminar Mensaje
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}