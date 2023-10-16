'use client'
import React, { useContext } from 'react'
import Loading from '@/components/Loading'
import { UtlitsContextProvider } from '@/context/UtlitsContext'

const App = ({children}) => {
  const utlitsContext = useContext(UtlitsContextProvider)
  return (
    <div>
        {children}
        {
          utlitsContext?.loading ? <Loading /> : null
        }
    </div>
  )
}

export default App