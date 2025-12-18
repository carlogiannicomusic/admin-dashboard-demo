import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata = {
  title: 'Digital Renaissance Admin Dashboard',
  description: 'Admin dashboard for Digital Renaissance Music Institute',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
