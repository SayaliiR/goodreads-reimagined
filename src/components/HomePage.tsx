import { useState } from 'react';
import { BookCard } from './BookCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, TrendingUp, Clock, Award } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onBookSelect: (book: any) => void;
}

export function HomePage({ onNavigate, onBookSelect }: HomePageProps) {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const genres = [
    { id: 'all', name: 'All' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'mystery', name: 'Mystery' },
    { id: 'romance', name: 'Romance' },
    { id: 'scifi', name: 'Sci-Fi' },
    { id: 'biography', name: 'Biography' },
    { id: 'selfhelp', name: 'Self-Help' }
  ];

  const recommendations = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      rating: 4.5,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      genre: "fiction",
      aiSummary: "A captivating tale of Hollywood glamour and secrets. Readers praise the complex characters and emotional depth.",
      readingTime: "8 hours",
      isRecommended: true
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
      isRecommended: true
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
      isRecommended: true
    },
    {
      id: 4,
      title: "Educated",
      author: "Tara Westover",
      rating: 4.6,
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      genre: "biography",
      aiSummary: "A powerful memoir about education and family. Critics call it both harrowing and inspiring.",
      readingTime: "10 hours",
      isRecommended: false
    }
  ];

  const trending = [
    {
      id: 5,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      rating: 4.1,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
      genre: "mystery",
      aiSummary: "A psychological thriller with an explosive twist. Readers can't put it down."
    },
    {
      id: 6,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      rating: 4.4,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
      genre: "fiction",
      aiSummary: "A beautiful coming-of-age story set in nature. Praised for its atmospheric writing."
    }
  ];

  const filteredRecommendations = selectedGenre === 'all' 
    ? recommendations 
    : recommendations.filter(book => book.genre === selectedGenre);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Discover Your Next Great Read
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Personalized recommendations powered by AI insights from millions of readers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Browse Books
            </Button>
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className="py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl mb-2">Curated For You</h2>
            <p className="text-muted-foreground">Based on your reading history and preferences</p>
          </div>
          <Badge variant="secondary" className="mt-2 sm:mt-0">
            <TrendingUp className="w-3 h-3 mr-1" />
            Updated Daily
          </Badge>
        </div>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {genres.map((genre) => (
            <Button
              key={genre.id}
              variant={selectedGenre === genre.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGenre(genre.id)}
              className="text-sm"
            >
              {genre.name}
            </Button>
          ))}
        </div>

        {/* Recommended Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredRecommendations.map((book) => (
            <BookCard key={book.id} book={book} onClick={() => onBookSelect(book)} />
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-12 border-t border-border">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl mb-2">Trending Now</h2>
            <p className="text-muted-foreground">What everyone's reading this week</p>
          </div>
          <Button variant="ghost">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trending.map((book) => (
            <div
              key={book.id}
              className="cursor-pointer group"
              onClick={() => onBookSelect(book)}
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3 shadow-md group-hover:shadow-lg transition-shadow">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="font-medium text-sm line-clamp-2 mb-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reading Stats */}
      <section className="py-12 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl mb-2">2.5M+</h3>
            <p className="text-muted-foreground">Hours Read This Month</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl mb-2">150K+</h3>
            <p className="text-muted-foreground">Books Reviewed</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl mb-2">98%</h3>
            <p className="text-muted-foreground">Recommendation Accuracy</p>
          </div>
        </div>
      </section>
    </div>
  );
}