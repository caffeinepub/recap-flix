import { useNavigate } from '@tanstack/react-router';
import { Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useMyList } from '../hooks/useMyList';
import { Button } from '@/components/ui/button';

export default function MyListPage() {
  const navigate = useNavigate();
  const { myList, isLoading, removeFromList, isUpdating } = useMyList();

  const handleMovieClick = (title: string) => {
    navigate({ to: '/movie/$title', params: { title } });
  };

  const handleRemove = async (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    await removeFromList(title);
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />

      <div className="pt-24 px-4 md:px-8 lg:px-12 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">My List</h1>

        {isLoading ? (
          <div className="text-center text-gray-400 py-12">Loading your list...</div>
        ) : myList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Your list is empty</p>
            <Button onClick={() => navigate({ to: '/' })}>Browse Movies</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {myList.map((movie) => (
              <div
                key={movie.title}
                className="relative group cursor-pointer"
                onClick={() => handleMovieClick(movie.title)}
              >
                <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-netflix-gray-800 shadow-lg">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                      <h3 className="text-white font-semibold text-sm line-clamp-2">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <span>{movie.year.toString()}</span>
                        <span>•</span>
                        <span>{movie.genre}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => handleRemove(e, movie.title)}
                        disabled={isUpdating}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-netflix-black border-t border-netflix-gray-800 py-8 px-4 md:px-8 lg:px-12">
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
