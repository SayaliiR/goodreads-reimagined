import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  UserPlus, 
  Users, 
  BookOpen, 
  Star, 
  MessageCircle,
  MapPin,
  Calendar,
  Filter,
  Check
} from 'lucide-react';

interface FriendRecommendationsProps {
  onNavigate: (page: string) => void;
  onBookSelect: (book: any) => void;
}

export function FriendRecommendations({ onNavigate, onBookSelect }: FriendRecommendationsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [followedUsers, setFollowedUsers] = useState<number[]>([]);

  const filters = [
    'Similar Taste',
    'Local',
    'Popular',
    'New Members',
    'Active Readers',
    'Same Genres'
  ];

  const recommendedFriends = [
    {
      id: 1,
      name: "David Park",
      username: "@davidreads",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      location: "San Francisco, CA",
      booksRead: 89,
      mutualFriends: 12,
      compatibility: 94,
      joinedDate: "March 2023",
      currentlyReading: "Project Hail Mary",
      favoriteGenres: ["Sci-Fi", "Fantasy", "Mystery"],
      recentBooks: [
        {
          title: "The Midnight Library",
          cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop",
          rating: 5
        },
        {
          title: "Educated",
          cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=60&h=90&fit=crop",
          rating: 4
        }
      ],
      reason: "Has 94% reading compatibility with you"
    },
    {
      id: 2,
      name: "Lisa Kumar",
      username: "@lisakumar",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      location: "New York, NY",
      booksRead: 156,
      mutualFriends: 7,
      compatibility: 88,
      joinedDate: "January 2022",
      currentlyReading: "The Seven Husbands of Evelyn Hugo",
      favoriteGenres: ["Romance", "Historical Fiction", "Biography"],
      recentBooks: [
        {
          title: "Where the Crawdads Sing",
          cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=60&h=90&fit=crop",
          rating: 5
        },
        {
          title: "Educated",
          cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=60&h=90&fit=crop",
          rating: 4
        }
      ],
      reason: "Loves the same books as you"
    },
    {
      id: 3,
      name: "James Wilson",
      username: "@jameswrites",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      location: "Austin, TX",
      booksRead: 234,
      mutualFriends: 3,
      compatibility: 82,
      joinedDate: "September 2021",
      currentlyReading: "The Silent Patient",
      favoriteGenres: ["Thriller", "Mystery", "Non-Fiction"],
      recentBooks: [
        {
          title: "Project Hail Mary",
          cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=90&fit=crop",
          rating: 5
        }
      ],
      reason: "Active in groups you might like"
    },
    {
      id: 4,
      name: "Maria Garcia",
      username: "@mariareads",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      location: "Los Angeles, CA",
      booksRead: 67,
      mutualFriends: 15,
      compatibility: 91,
      joinedDate: "June 2023",
      currentlyReading: "Educated",
      favoriteGenres: ["Biography", "Self-Help", "Fiction"],
      recentBooks: [
        {
          title: "The Midnight Library",
          cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop",
          rating: 4
        }
      ],
      reason: "Has 15 mutual friends"
    }
  ];

  const localReaders = [
    {
      id: 5,
      name: "Alex Thompson",
      username: "@alexthinks",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      location: "San Francisco, CA",
      distance: "2.3 miles away",
      booksRead: 45,
      currentlyReading: "The Silent Patient",
      favoriteGenres: ["Mystery", "Thriller"]
    },
    {
      id: 6,
      name: "Sophie Chen",
      username: "@sophiereads",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      location: "San Francisco, CA",
      distance: "4.1 miles away",
      booksRead: 78,
      currentlyReading: "Project Hail Mary",
      favoriteGenres: ["Sci-Fi", "Fantasy"]
    }
  ];

  const newMembers = [
    {
      id: 7,
      name: "Ryan O'Connor",
      username: "@ryanreads",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      joinedDate: "2 days ago",
      booksRead: 12,
      currentlyReading: "The Midnight Library",
      favoriteGenres: ["Fiction", "Philosophy"]
    }
  ];

  const handleFollow = (userId: number) => {
    setFollowedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="outline" 
          onClick={() => onNavigate('social')}
          className="mb-4"
        >
          ← Back to Social
        </Button>
        
        <h1 className="text-3xl mb-2">Find Friends</h1>
        <p className="text-muted-foreground">Discover readers with similar tastes and expand your reading community</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, username, or books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter}
              variant={selectedFilters.includes(filter) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20 transition-colors"
              onClick={() => toggleFilter(filter)}
            >
              <Filter className="w-3 h-3 mr-1" />
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="local">Local Readers</TabsTrigger>
          <TabsTrigger value="new">New Members</TabsTrigger>
        </TabsList>

        {/* Recommended Friends */}
        <TabsContent value="recommended" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedFriends.map((person) => (
              <Card key={person.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{person.name}</h3>
                        <p className="text-sm text-muted-foreground">{person.username}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{person.location}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={followedUsers.includes(person.id) ? "outline" : "default"}
                      onClick={() => handleFollow(person.id)}
                    >
                      {followedUsers.includes(person.id) ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-1" />
                          Follow
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-medium">{person.booksRead}</div>
                        <div className="text-muted-foreground">Books</div>
                      </div>
                      <div>
                        <div className="font-medium">{person.mutualFriends}</div>
                        <div className="text-muted-foreground">Mutual</div>
                      </div>
                      <div>
                        <div className="font-medium text-green-600">{person.compatibility}%</div>
                        <div className="text-muted-foreground">Match</div>
                      </div>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">{person.reason}</p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Currently reading: </span>
                        <span className="font-medium">{person.currentlyReading}</span>
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Favorite Genres:</p>
                      <div className="flex flex-wrap gap-1">
                        {person.favoriteGenres.map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Recent Reads:</p>
                      <div className="flex space-x-2">
                        {person.recentBooks.map((book, index) => (
                          <div 
                            key={index} 
                            className="cursor-pointer group"
                            onClick={() => onBookSelect(book)}
                          >
                            <div className="w-12 h-18 rounded-md overflow-hidden mb-1">
                              <img
                                src={book.cover}
                                alt={book.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="flex justify-center">
                              {renderStars(book.rating)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <BookOpen className="w-3 h-3 mr-1" />
                        View Books
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Local Readers */}
        <TabsContent value="local" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localReaders.map((person) => (
              <Card key={person.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{person.name}</h3>
                      <p className="text-sm text-muted-foreground">{person.username}</p>
                      <p className="text-sm text-primary">{person.distance}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Books Read:</span>
                      <span className="font-medium">{person.booksRead}</span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Currently Reading:</p>
                      <p className="text-sm font-medium">{person.currentlyReading}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Favorite Genres:</p>
                      <div className="flex flex-wrap gap-1">
                        {person.favoriteGenres.map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      size="sm" 
                      className="w-full"
                      variant={followedUsers.includes(person.id) ? "outline" : "default"}
                      onClick={() => handleFollow(person.id)}
                    >
                      {followedUsers.includes(person.id) ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-1" />
                          Follow
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* New Members */}
        <TabsContent value="new" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newMembers.map((person) => (
              <Card key={person.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{person.name}</h3>
                      <p className="text-sm text-muted-foreground">{person.username}</p>
                      <div className="flex items-center space-x-1 text-sm text-green-600">
                        <Calendar className="w-3 h-3" />
                        <span>Joined {person.joinedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Books Read:</span>
                      <span className="font-medium">{person.booksRead}</span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Currently Reading:</p>
                      <p className="text-sm font-medium">{person.currentlyReading}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Favorite Genres:</p>
                      <div className="flex flex-wrap gap-1">
                        {person.favoriteGenres.map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      size="sm" 
                      className="w-full"
                      variant={followedUsers.includes(person.id) ? "outline" : "default"}
                      onClick={() => handleFollow(person.id)}
                    >
                      {followedUsers.includes(person.id) ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-1" />
                          Welcome & Follow
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}