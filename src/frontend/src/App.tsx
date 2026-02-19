import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import MyListPage from './pages/MyListPage';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

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

function Outlet() {
  return <div id="router-outlet" />;
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
