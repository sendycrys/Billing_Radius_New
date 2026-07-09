"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, Loader2, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError("Email atau kata sandi tidak valid.")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-blue-900/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-neutral-950 to-neutral-950"></div>
      
      <Card className="w-full max-w-md bg-neutral-900 border-neutral-800 text-neutral-100 shadow-2xl relative z-10">
        <CardHeader className="space-y-3 text-center pt-8 pb-6">
          <div className="mx-auto bg-blue-600/20 p-4 rounded-full border border-blue-500/30 w-16 h-16 flex items-center justify-center mb-2">
            <Wifi className="w-8 h-8 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">ISP Billing Manager</CardTitle>
          <CardDescription className="text-neutral-400">
            Masuk ke panel kontrol admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-md flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-300">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="admin@isp.local" 
                required 
                className="bg-neutral-950 border-neutral-800 focus-visible:ring-blue-600 text-white placeholder:text-neutral-600 h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-neutral-300">Password</Label>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="bg-neutral-950 border-neutral-800 focus-visible:ring-blue-600 text-white h-11"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Masuk ke Dashboard"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t border-neutral-800/50 py-4 mt-2">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} ISP Billing System. Hak Cipta Dilindungi.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
