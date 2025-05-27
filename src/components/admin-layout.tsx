"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Package, Plus, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch('/api/auth/verify')
        const data = await response.json()

        if (response.ok && data.verified) {
          setUser(data.user)
        } else {
          router.push('/admin/login')
        }
      } catch {
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    verifySession()
  }, [router])

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch {
      router.push('/admin/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/admin" className="flex items-center space-x-2">
              <div>
                <Image src="/logo.jpg" alt="Logo" width={112} height={112} />
              </div>

            </Link>

            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Site</span>
              </Link>
              <Link
                href="/admin"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Package className="w-4 h-4" />
                <span>Produtos</span>
              </Link>
              <Link
                href="/admin/produtos/novo"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Produto</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden md:block">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
