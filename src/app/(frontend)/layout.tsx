import React from 'react'
import './globals.css'
import { Header } from '../../components/Header'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen bg-gray-50">
          <Header />

          <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
            {/* <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                TOUTES LES COURSES
              </h1>
            </div> */}

            {/* <EventFilters filters={filters} onFilterChange={handleFilterChange} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Aucun événement ne correspond à vos critères de recherche.
                </p>
              </div>
            )} */}
          </main>
        </div>
      </body>
    </html>
  )
}
