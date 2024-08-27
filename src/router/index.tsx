import { createElement, lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function createLazyElement(load: () => Promise<{ default: React.ComponentType<any> }>) {
  return (
    <Suspense fallback=''>
      {createElement(lazy(load))}
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: '/editor',
    element: createLazyElement(() => import('@/pages/editor'))
  },
])

const Router = () => <RouterProvider router={router} />

export default Router