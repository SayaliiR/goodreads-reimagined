import { useState } from 'react';
import { Search, BookOpen, User, Heart, Menu, Star, Users, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, onSearch, currentPage }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate('home')}
          >
            <BookOpen className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-semibold text-primary">BookVerse</span>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search books, authors, friends..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-input-background border-0 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              onClick={() => onNavigate('home')}
              size="sm"
            >
              <Star className="h-4 w-4 mr-1" />
              For You
            </Button>
            <Button
              variant={currentPage === 'social' ? 'default' : 'ghost'}
              onClick={() => onNavigate('social')}
              size="sm"
              className="relative"
            >
              <Users className="h-4 w-4 mr-1" />
              Social
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                3
              </Badge>
            </Button>
            <Button
              variant={currentPage === 'groups' ? 'default' : 'ghost'}
              onClick={() => onNavigate('groups')}
              size="sm"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Groups
            </Button>
            <Button
              variant={currentPage === 'library' ? 'default' : 'ghost'}
              onClick={() => onNavigate('library')}
              size="sm"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              My Books
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search books, authors, friends..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-input-background border-0"
              />
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-border mt-2 pt-2">
            <div className="flex flex-col space-y-2">
              <Button
                variant={currentPage === 'home' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('home');
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                <Star className="h-4 w-4 mr-2" />
                For You
              </Button>
              <Button
                variant={currentPage === 'social' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('social');
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                <Users className="h-4 w-4 mr-2" />
                Social
                <Badge variant="destructive" className="ml-auto h-4 w-4 p-0 text-xs">
                  3
                </Badge>
              </Button>
              <Button
                variant={currentPage === 'groups' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('groups');
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Reading Groups
              </Button>
              <Button
                variant={currentPage === 'library' ? 'default' : 'ghost'}
                onClick={() => {
                  onNavigate('library');
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                My Books
              </Button>
              <Button variant="ghost" className="justify-start">
                <Heart className="h-4 w-4 mr-2" />
                Favorites
              </Button>
              <Button variant="ghost" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}