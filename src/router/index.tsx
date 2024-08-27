import { createElement, lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import _ConfigProvider from './ConfigProvider'

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
    element: createLazyElement(() => import('@/pages/editor/index'))
  },
])

const Router = () => <_ConfigProvider>
  <RouterProvider router={router} />
</_ConfigProvider>

export default Router