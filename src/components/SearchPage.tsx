import { useState, useEffect } from 'react';
import { BookCard } from './BookCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface SearchPageProps {
  query: string;
  onNavigate: (page: string) => void;
  onBookSelect: (book: any) => void;
}

export function SearchPage({ query, onNavigate, onBookSelect }: SearchPageProps) {
  const [sortBy, setSortBy] = useState('relevance');
  const [minRating, setMinRating] = useState([0]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const genres = ['Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography', 'Self-Help', 'Fantasy', 'History'];

  const searchResults = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      rating: 4.5,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      genre: "fiction",
      aiSummary: "A captivating tale of Hollywood glamour and secrets. Readers praise the complex characters and emotional depth.",
      readingTime: "8 hours",
      publishYear: 2017
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      rating: 4.7,
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      genre: "scifi",
      aiSummary: "A brilliant science fiction thriller combining humor with hard science. Perfect for fans of The Martian.",
      readingTime: "12 hours",
      publishYear: 2021
    },
    {
      id: 3,
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 4.3,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      genre: "fiction",
      aiSummary: "A philosophical exploration of life's possibilities. Readers find it thought-provoking and emotionally resonant.",
      readingTime: "6 hours",
      publishYear: 2020
    },
    {
      id: 4,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      rating: 4.1,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      genre: "mystery",
      aiSummary: "A psychological thriller with an explosive twist. Readers can't put it down.",
      readingTime: "7 hours",
      publishYear: 2019
    },
    {
      id: 5,
      title: "Educated",
      author: "Tara Westover",
      rating: 4.6,
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      genre: "biography",
      aiSummary: "A powerful memoir about education and family. Critics call it both harrowing and inspiring.",
      readingTime: "10 hours",
      publishYear: 2018
    },
    {
      id: 6,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      rating: 4.4,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      genre: "fiction",
      aiSummary: "A beautiful coming-of-age story set in nature. Praised for its atmospheric writing.",
      readingTime: "9 hours",
      publishYear: 2018
    }
  ];

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const filteredResults = searchResults.filter(book => {
    const matchesRating = book.rating >= minRating[0];
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.some(g => 
      book.genre.toLowerCase().includes(g.toLowerCase())
    );
    return matchesRating && matchesGenre;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Search Results</h1>
        <p className="text-muted-foreground mb-4">
          {query ? `Showing results for "${query}"` : 'Browse all books'} 
          <span className="ml-2">({filteredResults.length} books found)</span>
        </p>
        
        {/* Sort and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex gap-2 flex-wrap">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Rating Filter */}
              <div>
                <label className="text-sm font-medium mb-3 block">Minimum Rating</label>
                <Slider
                  value={minRating}
                  onValueChange={setMinRating}
                  max={5}
                  min={0}
                  step={0.5}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Any</span>
                  <span>{minRating[0]}+ stars</span>
                </div>
              </div>

              {/* Genre Filter */}
              <div>
                <label className="text-sm font-medium mb-3 block">Genres</label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <Badge
                      key={genre}
                      variant={selectedGenres.includes(genre) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/20 transition-colors"
                      onClick={() => toggleGenre(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(minRating[0] > 0 || selectedGenres.length > 0) && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setMinRating([0]);
                    setSelectedGenres([]);
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResults.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onClick={() => onBookSelect(book)} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl mb-2">No books found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={() => {
                setMinRating([0]);
                setSelectedGenres([]);
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}