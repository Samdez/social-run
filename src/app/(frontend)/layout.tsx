import React from 'react'
import './globals.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr">
      <body>
        {/* <Navbar /> */}
        <main className="mt-32 min-h-screen bg-[#FFDCA8] py-4">
          {children}
          {/* <Analytics />
          <SpeedInsights /> */}
        </main>
        {/* <Toaster /> */}
      </body>
    </html>
  )
}
