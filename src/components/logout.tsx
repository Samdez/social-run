'use client'

import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'

interface LogoutProps {
  onLogout?: () => void
}

export function Logout({ onLogout }: LogoutProps) {
  const handleLogout = async () => {
    await authClient.signOut()
    onLogout?.()
  }
  return (
    <div>
      <Button variant="outline" onClick={handleLogout}>
        Se déconnecter <LogOut className="w-4 h-4" />
      </Button>
    </div>
  )
}
