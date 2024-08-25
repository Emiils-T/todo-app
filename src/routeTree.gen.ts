/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const AddLazyImport = createFileRoute('/add')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()
const TodoTodoIdLazyImport = createFileRoute('/todo/$todoId')()

// Create/Update Routes

const AddLazyRoute = AddLazyImport.update({
  path: '/add',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/add.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TodoTodoIdLazyRoute = TodoTodoIdLazyImport.update({
  path: '/todo/$todoId',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/todo.$todoId.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/add': {
      id: '/add'
      path: '/add'
      fullPath: '/add'
      preLoaderRoute: typeof AddLazyImport
      parentRoute: typeof rootRoute
    }
    '/todo/$todoId': {
      id: '/todo/$todoId'
      path: '/todo/$todoId'
      fullPath: '/todo/$todoId'
      preLoaderRoute: typeof TodoTodoIdLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  AboutLazyRoute,
  AddLazyRoute,
  TodoTodoIdLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/add",
        "/todo/$todoId"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/add": {
      "filePath": "add.lazy.tsx"
    },
    "/todo/$todoId": {
      "filePath": "todo.$todoId.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
