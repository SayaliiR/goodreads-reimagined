import { Star, Clock, BookOpen, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface BookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    rating: number;
    cover: string;
    genre: string;
    aiSummary: string;
    readingTime?: string;
    isRecommended?: boolean;
  };
  onClick: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-border/50 overflow-hidden"
      onClick={onClick}
    >
      <div className="relative">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        {book.isRecommended && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            <Sparkles className="w-3 h-3 mr-1" />
            Recommended
          </Badge>
        )}
        {book.readingTime && (
          <Badge variant="secondary" className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm">
            <Clock className="w-3 h-3 mr-1" />
            {book.readingTime}
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {renderStars(book.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              {book.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* AI Summary */}
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-2">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-xs text-primary font-medium">AI Insight</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {book.aiSummary}
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <BookOpen className="w-3 h-3 mr-1" />
            Add to Library
          </Button>
          <Button size="sm" variant="outline">
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}