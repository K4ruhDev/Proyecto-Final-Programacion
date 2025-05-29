"use client"

import {useEffect, useState} from "react"
import {supabase} from "@/lib/supabase/client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Eye, Loader2, Search, Trash2, User} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatDate} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import { toast } from "sonner";

interface Client {
    id: string,
    full_name: string,
    email: string,
    phone?: string,
    address?: string,
    role: string,
    created_at: string,
    avatar_url?: string
}

export default function ClientList() {
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState<string>("all")
    const [deletingId, setDeletingId] = useState<string | null>(null)

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const {data, error} = await supabase
                    .from("profiles")
                    .select("*")
                    .order('created_at', {ascending: false})

                if (error) {
                    throw error
                }
                setClients(data)
            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchClients()
    }, []);

    const deleteClient = async (client: Client) => {
        const confirmMessage = `¿Estás seguro de que quieres eliminar al cliente "${client.full_name}"? Esta acción no se puede deshacer.`

        if (!confirm(confirmMessage)) {
            return
        }

        try {
            setDeletingId(client.id)

            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', client.id)

            if (error) {
                throw error
            }

            // Actualizar la lista eliminando el cliente
            setClients(prev => prev.filter(c => c.id !== client.id))
            toast.success('Cliente eliminado correctamente')
        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al eliminar el cliente')
        } finally {
            setDeletingId(null)
        }
    }

    const filteredClients = clients.filter((client) => {
        const matchesSearch =
            client.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesRole = roleFilter === "all" || client.role === roleFilter

        return matchesSearch && matchesRole
    })

    // Función para obtener las iniciales del nombre
    const getInitials = (name: string) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Clientes</CardTitle>
                <CardDescription>Gestiona los clientes registrados</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            placeholder="Buscar por nombre o email..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filtrar por rol"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los roles</SelectItem>
                            <SelectItem value="customer">Cliente</SelectItem>
                            <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">{error}</div>
                ) : filteredClients.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No se encontraron clientes</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Avatar</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Teléfono</TableHead>
                                    <TableHead>Rol</TableHead>
                                    <TableHead>Fecha registro</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredClients.map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell>
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage
                                                    src={client.avatar_url}
                                                    alt={client.full_name || "Usuario"}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                                <AvatarFallback className="bg-primary/10">
                                                    {client.full_name ? getInitials(client.full_name) : <User className="h-4 w-4" />}
                                                </AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{client.full_name || "N/A"}</TableCell>
                                        <TableCell>{client.email}</TableCell>
                                        <TableCell>{client.phone || "N/A"}</TableCell>
                                        <TableCell>{client.role === "admin" ? "Administrador" : "Cliente"}</TableCell>
                                        <TableCell>{formatDate(client.created_at)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/admin/clients/${client.id}`}>
                                                        <Eye className="mr-2 h-4 w-4"/>
                                                        Ver
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="icon"
                                                    onClick={() => deleteClient(client)}
                                                    disabled={deletingId === client.id}
                                                >
                                                    {deletingId === client.id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Trash2  className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
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