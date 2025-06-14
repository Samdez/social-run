'use client'

import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { logout } from '@/app/(frontend)/(server)/queries/users'
import { useRouter } from 'next/navigation'

interface LogoutProps {
  onLogout?: () => void
}

export function Logout({ onLogout }: LogoutProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }
  return (
    <div>
      <Button variant="outline" onClick={handleLogout}>
        Se déconnecter <LogOut className="w-4 h-4" />
      </Button>
    </div>
  )
}
