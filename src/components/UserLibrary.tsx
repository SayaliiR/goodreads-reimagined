import { useState } from 'react';
import { BookCard } from './BookCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { BookOpen, Target, Clock, Award, TrendingUp } from 'lucide-react';

interface UserLibraryProps {
  onNavigate: (page: string) => void;
  onBookSelect: (book: any) => void;
}

export function UserLibrary({ onNavigate, onBookSelect }: UserLibraryProps) {
  const [activeTab, setActiveTab] = useState('currently-reading');

  const currentlyReading = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      rating: 4.5,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      genre: "fiction",
      aiSummary: "A captivating tale of Hollywood glamour and secrets.",
      progress: 65,
      pagesRead: 240,
      totalPages: 368
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      rating: 4.7,
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      genre: "scifi",
      aiSummary: "A brilliant science fiction thriller combining humor with hard science.",
      progress: 23,
      pagesRead: 89,
      totalPages: 496
    }
  ];

  const wantToRead = [
    {
      id: 3,
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 4.3,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      genre: "fiction",
      aiSummary: "A philosophical exploration of life's possibilities.",
      dateAdded: "2 days ago"
    },
    {
      id: 4,
      title: "Educated",
      author: "Tara Westover",
      rating: 4.6,
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      genre: "biography",
      aiSummary: "A powerful memoir about education and family.",
      dateAdded: "1 week ago"
    }
  ];

  const readBooks = [
    {
      id: 5,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      rating: 4.4,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      genre: "fiction",
      aiSummary: "A beautiful coming-of-age story set in nature.",
      dateFinished: "2 weeks ago",
      userRating: 5
    },
    {
      id: 6,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      rating: 4.1,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      genre: "mystery",
      aiSummary: "A psychological thriller with an explosive twist.",
      dateFinished: "1 month ago",
      userRating: 4
    }
  ];

  const readingGoal = {
    target: 24,
    completed: 8,
    inProgress: 2
  };

  const stats = {
    totalBooks: 16,
    pagesRead: 4250,
    averageRating: 4.2,
    readingStreak: 12
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">My Library</h1>
        <p className="text-muted-foreground">Track your reading journey and discover new books</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Books Read</p>
                <p className="text-2xl">{stats.totalBooks}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pages Read</p>
                <p className="text-2xl">{stats.pagesRead.toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl">{stats.averageRating}</p>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reading Streak</p>
                <p className="text-2xl">{stats.readingStreak} days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reading Goal */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            2024 Reading Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm">{readingGoal.completed + readingGoal.inProgress} of {readingGoal.target} books</span>
            </div>
            <Progress 
              value={((readingGoal.completed + readingGoal.inProgress) / readingGoal.target) * 100} 
              className="h-2"
            />
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Completed: {readingGoal.completed}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary/50 rounded-full"></div>
                <span>In Progress: {readingGoal.inProgress}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Book Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="currently-reading">
            Currently Reading ({currentlyReading.length})
          </TabsTrigger>
          <TabsTrigger value="want-to-read">
            Want to Read ({wantToRead.length})
          </TabsTrigger>
          <TabsTrigger value="read">
            Read ({readBooks.length})
          </TabsTrigger>
        </TabsList>

        {/* Currently Reading */}
        <TabsContent value="currently-reading" className="mt-6">
          <div className="space-y-6">
            {currentlyReading.map((book) => (
              <Card key={book.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div 
                        className="w-24 h-32 rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => onBookSelect(book)}
                      >
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 
                          className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors"
                          onClick={() => onBookSelect(book)}
                        >
                          {book.title}
                        </h3>
                        <p className="text-muted-foreground">{book.author}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{book.pagesRead} / {book.totalPages} pages</span>
                        </div>
                        <Progress value={book.progress} className="h-2" />
                        <p className="text-sm text-muted-foreground">{book.progress}% complete</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm">Continue Reading</Button>
                        <Button size="sm" variant="outline">Update Progress</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Want to Read */}
        <TabsContent value="want-to-read" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wantToRead.map((book) => (
              <div key={book.id} className="relative">
                <BookCard book={book} onClick={() => onBookSelect(book)} />
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 bg-background border"
                >
                  Added {book.dateAdded}
                </Badge>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Read Books */}
        <TabsContent value="read" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {readBooks.map((book) => (
              <div key={book.id} className="relative">
                <BookCard 
                  book={{
                    ...book,
                    rating: book.userRating || book.rating
                  }} 
                  onClick={() => onBookSelect(book)} 
                />
                <Badge 
                  variant="default" 
                  className="absolute -top-2 -right-2 bg-green-600 text-white"
                >
                  ✓ Read
                </Badge>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}