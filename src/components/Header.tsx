import Link from 'next/link'
import LoginButton from './LoginButton'

export function Header() {
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
            <Link href="/mes-runs" className="text-gray-700 hover:text-purple-600 font-medium">
              MES RUNS
            </Link>
            <Link href="/run-clubs" className="text-gray-700 hover:text-purple-600 font-medium">
              CLUBS
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 font-medium">
              CONTACT
            </Link>
          </nav>

          <LoginButton />
        </div>
      </div>
    </header>
  )
}
