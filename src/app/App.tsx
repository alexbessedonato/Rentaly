import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from '../routes/router'
import { Analytics } from '@vercel/analytics/react'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Analytics />
    </QueryClientProvider>
  )
}

export default App