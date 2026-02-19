import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import MyListPage from './pages/MyListPage';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from './components/ErrorBoundary';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-netflix-black">
        <Outlet />
      </div>
      <Toaster />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const movieDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movie/$title',
  component: MovieDetailPage,
});

const myListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-list',
  component: MyListPage,
});

const routeTree = rootRoute.addChildren([indexRoute, movieDetailRoute, myListRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  console.log('[App] Rendering App component');
  
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
        <Suspense fallback={
          <div className="min-h-screen bg-netflix-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
          </div>
        }>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
