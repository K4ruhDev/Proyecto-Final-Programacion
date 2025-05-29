"use client"

import { useState, useEffect, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Camera, User, Loader2 } from "lucide-react"
import type { User } from "@supabase/supabase-js"

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
})

const formSchema = z.object({
  full_name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z
      .string()
      .email({
        message: "Por favor ingresa un correo electrónico válido.",
      })
      .optional(),
  phone: z.string().optional(),
  address: addressSchema.optional(),
})

interface ProfileData {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
  address: any
  role: string
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export function ProfileForm() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
      },
    },
  })

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single()

        if (data) {
          setProfile(data)
          form.setValue("full_name", data.full_name || "")
          form.setValue("email", user.email || "")
          form.setValue("phone", data.phone || "")

          // Parsear la dirección JSON
          if (data.address) {
            const address = typeof data.address === 'string' ? JSON.parse(data.address) : data.address
            form.setValue("address", {
              street: address.street || "",
              city: address.city || "",
              state: address.state || "",
              postal_code: address.postal_code || "",
              country: address.country || "",
            })
          }
        }
      }
    }

    fetchUserAndProfile()
  }, [form])

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona un archivo de imagen válido')
      return
    }

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen debe ser menor a 5MB')
      return
    }

    setIsUploadingAvatar(true)
    setError(null)

    try {
      // Crear nombre único para el archivo
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Math.random()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Subir archivo a Supabase Storage
      const { error: uploadError } = await supabase.storage
          .from('profiles')
          .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
          .from('profiles')
          .getPublicUrl(filePath)

      // Actualizar perfil con nueva URL del avatar
      const { error: updateError } = await supabase
          .from('profiles')
          .update({
            avatar_url: publicUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id)

      if (updateError) {
        throw updateError
      }

      // Actualizar estado local
      setProfile(prev => prev ? { ...prev, avatar_url: publicUrl } : null)
      setSuccess('Avatar actualizado correctamente')
    } catch (error: any) {
      setError(error.message || 'Error al subir la imagen')
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { error: profileError } = await supabase
          .from("profiles")
          .update({
            full_name: values.full_name,
            phone: values.phone || null,
            address: values.address ? JSON.stringify(values.address) : null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id)

      if (profileError) {
        throw profileError
      }

      setSuccess("Perfil actualizado correctamente")
    } catch (error: any) {
      setError(error.message || "Error al actualizar el perfil. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
      <div className="space-y-6">
        {/* Información del perfil */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Información del Perfil</CardTitle>
            <CardDescription>
              Visualiza y actualiza tu información personal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar y información básica */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                      src={profile?.avatar_url || undefined}
                      alt={profile?.full_name || "Usuario"}
                      style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                      }}
                  />
                  <AvatarFallback className="bg-primary/10 text-lg">
                    {profile?.full_name ? getInitials(profile.full_name) : <User className="h-8 w-8" />}
                  </AvatarFallback>
                </Avatar>
                <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                >
                  {isUploadingAvatar ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                      <Camera className="h-4 w-4" />
                  )}
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarUpload}
                    accept="image/*"
                    className="hidden"
                />
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <h3 className="text-xl font-semibold">
                  {profile?.full_name || "Sin nombre"}
                </h3>
                <p className="text-muted-foreground">{profile?.email}</p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Badge variant={profile?.role === 'admin' ? 'default' : 'secondary'}>
                    {profile?.role === 'admin' ? 'Administrador' : 'Cliente'}
                  </Badge>
                  {profile?.created_at && (
                      <Badge variant="outline">
                        Miembro desde {formatDate(profile.created_at)}
                      </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulario de edición */}
        <Card>
          <CardHeader>
            <CardTitle>Editar Perfil</CardTitle>
            <CardDescription>
              Actualiza tu información personal y de contacto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {success && (
                    <Alert className="bg-primary/10 text-primary border-primary">
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                )}

                {/* Información personal */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Información Personal</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Juan Pérez" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Correo electrónico</FormLabel>
                              <FormControl>
                                <Input placeholder="tu@email.com" {...field} disabled />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono</FormLabel>
                              <FormControl>
                                <Input placeholder="+34 123 456 789" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                  </div>
                </div>

                {/* Dirección */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Dirección</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="address.street"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Calle y número</FormLabel>
                              <FormControl>
                                <Input placeholder="Calle Mayor, 123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.city"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ciudad</FormLabel>
                              <FormControl>
                                <Input placeholder="Madrid" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.state"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Provincia/Estado</FormLabel>
                              <FormControl>
                                <Input placeholder="Madrid" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.postal_code"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Código postal</FormLabel>
                              <FormControl>
                                <Input placeholder="28001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.country"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>País</FormLabel>
                              <FormControl>
                                <Input placeholder="España" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando...
                      </>
                  ) : (
                      "Guardar cambios"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
  )
}