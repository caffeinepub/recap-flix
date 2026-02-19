import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Plus, Check, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useGetMovie } from '../hooks/useQueries';
import { useMyList } from '../hooks/useMyList';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function MovieDetailPage() {
  const { title } = useParams({ from: '/movie/$title' });
  const navigate = useNavigate();
  const { data: movie, isLoading } = useGetMovie(title);
  const { isInList, toggleList, isUpdating } = useMyList();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <div className="text-white text-xl">Movie not found</div>
          <Button onClick={() => navigate({ to: '/' })}>Go Home</Button>
        </div>
      </div>
    );
  }

  const inList = isInList(movie.title);

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <div className="absolute inset-0">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/70 to-transparent" />
        </div>

        <div className="relative h-full flex items-end px-4 md:px-8 lg:px-12 pb-8">
          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/' })}
              className="text-white hover:bg-white/10 mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>

            <h1 className="text-4xl md:text-6xl font-bold text-white">{movie.title}</h1>

            <div className="flex items-center gap-4 text-sm md:text-base">
              <span className="text-netflix-red font-semibold">{movie.year.toString()}</span>
              <span className="text-gray-300">{movie.genre}</span>
              <div className="flex items-center gap-1 text-gray-300">
                <Clock className="h-4 w-4" />
                <span>{movie.duration.toString()} min read</span>
              </div>
            </div>

            <Button
              onClick={() => toggleList(movie.title)}
              disabled={isUpdating}
              variant={inList ? 'secondary' : 'default'}
              size="lg"
              className="mt-4"
            >
              {inList ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  In My List
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Add to My List
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Recap Content */}
      <div className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Movie Recap</h2>
          
          <ScrollArea className="h-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {movie.recapScript}
              </p>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-netflix-black border-t border-netflix-gray-800 py-8 px-4 md:px-8 lg:px-12 mt-16">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} RecapFlix. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'recapflix'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-netflix-red hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
