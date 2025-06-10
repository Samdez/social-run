// 'use client'

import { Button } from './ui/button'
import { Logout } from './logout'
import Link from 'next/link'
import { getUser } from '@/server/users'

export default async function LoginButton() {
  // const { data: session, isPending, refetch } = authClient.useSession()
  const user = await getUser()
  // const pathname = usePathname()
  // const searchParams = useSearchParams()

  // useEffect(() => {
  //   // Refetch session when route changes
  //   refetch()
  // }, [pathname, searchParams, refetch])

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <div className="flex items-center space-x-2">
          <p>{user.email}</p>
          <Logout />
        </div>
      ) : (
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/login">Se connecter</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">S&apos;inscrire</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
