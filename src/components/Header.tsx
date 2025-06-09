'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
// import { useAuth } from '@/components/auth-provider'
import { Logout } from './logout'
import { authClient } from '@/lib/auth-client'

export function Header() {
  const { data: session } = authClient.useSession()

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-purple-600">
              SOCIAL RUN
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
              TOUS LES RUNS
            </Link>
            <Link href="/destinations" className="text-gray-700 hover:text-purple-600 font-medium">
              DESTINATIONS
            </Link>
            <Link href="/themes" className="text-gray-700 hover:text-purple-600 font-medium">
              THÈMES
            </Link>
            <Link href="/types" className="text-gray-700 hover:text-purple-600 font-medium">
              TYPES DE COURSES
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-purple-600 font-medium">
              BLOG
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {session ? (
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
        </div>
      </div>
    </header>
  )
}
