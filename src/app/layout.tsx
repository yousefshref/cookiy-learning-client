import './globals.css'
import type { Metadata } from 'next'

import AuthContext from '@/context/AuthContext'
import CourseContext from '@/context/CourseContext'
import UtlitsContext from '@/context/UtlitsContext'
import EnrollmentContext from '@/context/EnrollmentContext'

import App from '@/components/App'

export const metadata: Metadata = {
  title: 'Cookiy - learning',
  description: 'E-learning platform, you can know anything you need on this great e learning platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <CourseContext>
            <UtlitsContext>
              <EnrollmentContext>
                <App children={children} />
              </EnrollmentContext>
            </UtlitsContext>
          </CourseContext>
        </AuthContext>
      </body>
    </html>
  )
}
