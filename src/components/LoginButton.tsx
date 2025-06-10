'use client'

import { Button } from './ui/button'
import { Logout } from './logout'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function LoginButton() {
  const { data: session, isPending, refetch } = authClient.useSession()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Refetch session when route changes
    refetch()
  }, [pathname, searchParams, refetch])

  return (
    <div className="flex items-center space-x-4">
      {isPending ? (
        <div className="flex items-center space-x-2">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      ) : session ? (
        <>
          {/* <Button asChild variant="outline">
        <Link href="/create-event">
        <Plus className="w-4 h-4 mr-2" />
        Créer un événement
        </Link>
        </Button> */}
          {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
        <div className="flex flex-col space-y-1 leading-none">
        <p className="font-medium">{user.name}</p>
        <p className="w-[200px] truncate text-sm text-muted-foreground">
        {user.email}
        </p>
        </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
        <Link href="/profile">
        <User className="mr-2 h-4 w-4" />
        Profil
        </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
        <Link href="/settings">
        <Settings className="mr-2 h-4 w-4" />
        Paramètres
        </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
        <LogOut className="mr-2 h-4 w-4" />
        Se déconnecter
        </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu> */}
          <Logout />
        </>
      ) : (
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/login">Se connecter</Link>
          </Button>
          <Button asChild>
            <Link href="/register">S&apos;inscrire</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
