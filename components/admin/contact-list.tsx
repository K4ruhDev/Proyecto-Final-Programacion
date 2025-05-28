"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Contact {
    id: number,
    created_at: string,
    name: string,
    email: string,
    subject: string,
    message: string,
    status: 'new' | 'read' | 'replied' | 'archived'
}

const statusColors = {
    new: "bg-blue-500",
    read: "bg-gray-500",
    replied: "bg-green-500",
    archived: "bg-yellow-500"
}

export default function ContactList() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const getContacts = async () => {
            try {
                setIsLoading(true)
                const { data: contacts, error } = await supabase
                    .from('contact_messages')
                    .select('*')
                    .order('created_at', { ascending: false })

                if (error) {
                    console.error('Error:', error)
                    return
                }

                setContacts(contacts || [])
            } catch (error) {
                console.error('Error:', error)
            } finally {
                setIsLoading(false)
            }
        }

        getContacts()
    }, [])

    const filteredContacts = contacts?.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (isLoading) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Mensajes de Contacto</CardTitle>
                    <CardDescription>Cargando mensajes...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Mensajes de Contacto</CardTitle>
                <CardDescription>Gestiona los mensajes de contacto recibidos</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            placeholder="Buscar por nombre, email o asunto..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {filteredContacts.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No se encontraron mensajes</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Asunto</TableHead>
                                    <TableHead>Mensaje</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredContacts.map((contact) => (
                                    <TableRow key={contact.id}>
                                        <TableCell className="font-medium">{contact.id}</TableCell>
                                        <TableCell>
                                            <Badge variant="default" className={statusColors[contact.status]}>
                                                {contact.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{contact.name}</TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                        <TableCell>{contact.subject}</TableCell>
                                        <TableCell>{contact.message.slice(0, 50)}...</TableCell>
                                        <TableCell>{formatDate(contact.created_at)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/contacts/${contact.id}`}>
                                                    <Eye className="mr-2 h-4 w-4"/>
                                                    Ver
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}