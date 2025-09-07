import { useState } from 'react';
import { Star, Clock, BookOpen, Heart, Share2, Sparkles, Users, Calendar, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface BookDetailProps {
  book: any;
  onNavigate: (page: string) => void;
}

export function BookDetail({ book, onNavigate }: BookDetailProps) {
  const [readingStatus, setReadingStatus] = useState('want-to-read');

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button onClick={() => onNavigate('home')} variant="outline" className="mb-4">
          ← Back to Home
        </Button>
        <p>Book not found</p>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      text: "Absolutely captivating! The characters felt so real and the plot twists kept me guessing until the very end.",
      date: "2 days ago",
      helpful: 24
    },
    {
      id: 2,
      author: "Mike R.",
      rating: 4,
      text: "Great read with beautiful prose. The pacing was perfect and I couldn't put it down.",
      date: "1 week ago",
      helpful: 18
    },
    {
      id: 3,
      author: "Emma L.",
      rating: 5,
      text: "This book changed my perspective on so many things. Highly recommend to anyone looking for depth.",
      date: "2 weeks ago",
      helpful: 31
    }
  ];

  const similarBooks = [
    {
      id: 7,
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop",
      rating: 4.2
    },
    {
      id: 8,
      title: "The Ten Thousand Doors of January",
      author: "Alix E. Harrow",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=200&fit=crop",
      rating: 4.1
    },
    {
      id: 9,
      title: "The Priory of the Orange Tree",
      author: "Samantha Shannon",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=200&fit=crop",
      rating: 4.3
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button onClick={() => onNavigate('home')} variant="outline" className="mb-6">
        ← Back to Home
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Book Cover and Actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg mb-6">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Button className="flex-1">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Reading
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              <select 
                value={readingStatus}
                onChange={(e) => setReadingStatus(e.target.value)}
                className="w-full p-2 border border-border rounded-md bg-background"
              >
                <option value="want-to-read">Want to Read</option>
                <option value="currently-reading">Currently Reading</option>
                <option value="read">Read</option>
              </select>

              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pages:</span>
                      <span>368</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Publisher:</span>
                      <span>Atria Books</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Published:</span>
                      <span>June 2017</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Language:</span>
                      <span>English</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-4xl mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                {renderStars(book.rating)}
                <span className="text-lg">{book.rating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">12,847 ratings</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">2,341 reviews</span>
            </div>

            <div className="flex gap-2 mb-6">
              <Badge variant="secondary">Fiction</Badge>
              <Badge variant="secondary">Historical Fiction</Badge>
              <Badge variant="secondary">Romance</Badge>
            </div>
          </div>

          {/* AI Summary Card */}
          <Card className="mb-6 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Sparkles className="w-5 h-5 mr-2" />
                AI-Powered Insight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {book.aiSummary} This book excels in character development and emotional depth, 
                with readers particularly praising the authentic dialogue and compelling narrative structure. 
                The pacing builds perfectly to a satisfying conclusion that resonates long after reading.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl text-green-600 mb-1">92%</div>
                  <div className="text-xs text-muted-foreground">Recommend</div>
                </div>
                <div>
                  <div className="text-2xl text-blue-600 mb-1">4.2/5</div>
                  <div className="text-xs text-muted-foreground">Emotional Impact</div>
                </div>
                <div>
                  <div className="text-2xl text-purple-600 mb-1">8.5/10</div>
                  <div className="text-xs text-muted-foreground">Writing Quality</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Description, Reviews, etc. */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="leading-relaxed text-muted-foreground mb-4">
                    In this entrancing novel, Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.
                  </p>
                  <p className="leading-relaxed text-muted-foreground mb-4">
                    Why her? Why now? Monique is not exactly on top of the world. Her husband has left her, and her career has stagnated. Regardless of why Evelyn has selected her to write her biography, Monique is determined to use this opportunity to jumpstart her career.
                  </p>
                  <p className="leading-relaxed text-muted-foreground">
                    Summoned to Evelyn's luxurious apartment, Monique listens in fascination as the actress tells her story. From making her way to Los Angeles in the 1950s to her decision to leave show business in the '80s, and, of course, the seven husbands along the way, Evelyn unspools a tale of ruthless ambition, unexpected friendship, and a great forbidden love.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{review.author}</span>
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{review.text}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Button variant="ghost" size="sm">
                          👍 Helpful ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Book Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ISBN:</span>
                          <span>978-1501139239</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Format:</span>
                          <span>Hardcover</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Edition:</span>
                          <span>First Edition</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3">Reading Stats</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Average Reading Time:</span>
                          <span>{book.readingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Difficulty Level:</span>
                          <span>Easy</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Genre Rank:</span>
                          <span>#15 in Historical Fiction</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Similar Books */}
      <section>
        <h2 className="text-2xl mb-6">Similar Books You Might Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {similarBooks.map((similarBook) => (
            <div key={similarBook.id} className="cursor-pointer group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3 shadow-md group-hover:shadow-lg transition-shadow">
                <img
                  src={similarBook.cover}
                  alt={similarBook.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="font-medium text-sm line-clamp-2 mb-1">{similarBook.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{similarBook.author}</p>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{similarBook.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}