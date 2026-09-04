import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import STCInnovationsPage from './components/STCInnovationsPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<STCInnovationsPage />} />
        <Route path="/stc" element={<STCInnovationsPage />} />
        <Route path="*" element={<STCInnovationsPage />} />
      </Routes>
    </>
  )
}
