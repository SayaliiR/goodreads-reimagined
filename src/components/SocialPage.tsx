import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  Users, 
  Search, 
  Heart, 
  MessageCircle, 
  BookOpen, 
  Star, 
  Clock,
  UserPlus,
  MoreHorizontal,
  ArrowRight
} from 'lucide-react';

interface SocialPageProps {
  onNavigate: (page: string) => void;
  onBookSelect: (book: any) => void;
}

export function SocialPage({ onNavigate, onBookSelect }: SocialPageProps) {
  const [searchFriends, setSearchFriends] = useState('');
  const [activeTab, setActiveTab] = useState('feed');

  const friends = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      username: "@sarahreads",
      booksRead: 42,
      mutualFriends: 8,
      status: "Currently reading Project Hail Mary",
      isFollowing: true
    },
    {
      id: 2,
      name: "Marcus Williams",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      username: "@marcusbooks",
      booksRead: 67,
      mutualFriends: 12,
      status: "Finished The Seven Husbands of Evelyn Hugo",
      isFollowing: true
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      username: "@emmareads",
      booksRead: 35,
      mutualFriends: 5,
      status: "Added 3 books to want-to-read",
      isFollowing: false
    }
  ];

  const activityFeed = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face",
        username: "@sarahreads"
      },
      action: "finished reading",
      book: {
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=150&fit=crop"
      },
      rating: 5,
      review: "Absolutely beautiful and thought-provoking! This book made me reflect on so many life choices.",
      timestamp: "2 hours ago",
      likes: 14,
      comments: 3
    },
    {
      id: 2,
      user: {
        name: "Marcus Williams",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        username: "@marcusbooks"
      },
      action: "started reading",
      book: {
        title: "Project Hail Mary",
        author: "Andy Weir",
        cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=150&fit=crop"
      },
      timestamp: "5 hours ago",
      likes: 8,
      comments: 1
    },
    {
      id: 3,
      user: {
        name: "Emma Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        username: "@emmareads"
      },
      action: "joined reading group",
      group: "Sci-Fi Book Club",
      timestamp: "1 day ago",
      likes: 6,
      comments: 2
    },
    {
      id: 4,
      user: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        username: "@alexthinks"
      },
      action: "gave 4 stars to",
      book: {
        title: "Educated",
        author: "Tara Westover",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=150&fit=crop"
      },
      review: "Powerful memoir that really stays with you. The writing is incredible.",
      timestamp: "2 days ago",
      likes: 12,
      comments: 4
    }
  ];

  const suggestedFriends = [
    {
      id: 4,
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      username: "@davidreads",
      mutualFriends: 3,
      reason: "Loves the same genres as you"
    },
    {
      id: 5,
      name: "Lisa Kumar",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      username: "@lisakumar",
      mutualFriends: 7,
      reason: "Has similar reading tastes"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Social Hub</h1>
        <p className="text-muted-foreground">Connect with fellow readers and discover new books</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="feed">Activity Feed</TabsTrigger>
              <TabsTrigger value="friends">Friends ({friends.length})</TabsTrigger>
            </TabsList>

            {/* Activity Feed */}
            <TabsContent value="feed" className="space-y-6">
              {activityFeed.map((activity) => (
                <Card key={activity.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                        <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">{activity.user.name}</span>
                          <span className="text-muted-foreground">{activity.user.username}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                        </div>

                        <div className="mb-3">
                          {activity.book ? (
                            <div className="flex items-start space-x-3">
                              <div 
                                className="w-16 h-24 rounded-md overflow-hidden cursor-pointer flex-shrink-0"
                                onClick={() => onBookSelect(activity.book)}
                              >
                                <img
                                  src={activity.book.cover}
                                  alt={activity.book.title}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm mb-2">
                                  <span className="text-muted-foreground">{activity.action} </span>
                                  <span 
                                    className="font-medium hover:text-primary cursor-pointer"
                                    onClick={() => onBookSelect(activity.book)}
                                  >
                                    {activity.book.title}
                                  </span>
                                  <span className="text-muted-foreground"> by {activity.book.author}</span>
                                </p>
                                
                                {activity.rating && (
                                  <div className="flex items-center space-x-1 mb-2">
                                    {renderStars(activity.rating)}
                                  </div>
                                )}
                                
                                {activity.review && (
                                  <p className="text-sm text-muted-foreground italic">
                                    "{activity.review}"
                                  </p>
                                )}
                              </div>
                            </div>
                          ) : activity.group ? (
                            <p className="text-sm">
                              <span className="text-muted-foreground">{activity.action} </span>
                              <span className="font-medium text-primary cursor-pointer">
                                {activity.group}
                              </span>
                            </p>
                          ) : null}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Heart className="w-4 h-4 mr-1" />
                            {activity.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {activity.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Friends List */}
            <TabsContent value="friends" className="space-y-4">
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search friends..."
                    value={searchFriends}
                    onChange={(e) => setSearchFriends(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={() => onNavigate('friend-recommendations')}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Find Friends
                </Button>
              </div>

              {friends.map((friend) => (
                <Card key={friend.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{friend.name}</h3>
                          <p className="text-sm text-muted-foreground">{friend.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {friend.booksRead} books • {friend.mutualFriends} mutual friends
                          </p>
                          <p className="text-sm text-primary mt-1">{friend.status}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant={friend.isFollowing ? "outline" : "default"}
                          size="sm"
                        >
                          {friend.isFollowing ? "Following" : "Follow"}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Your Network
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Following</span>
                <span className="font-medium">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Followers</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reading Groups</span>
                <span className="font-medium">5</span>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Friends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Suggested Friends
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate('friend-recommendations')}
                >
                  See All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedFriends.map((person) => (
                <div key={person.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{person.name}</p>
                      <p className="text-xs text-muted-foreground">{person.reason}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <UserPlus className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Reading Groups Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Active Groups
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate('groups')}
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Sci-Fi Book Club</p>
                  <p className="text-xs text-muted-foreground">24 members • 3 new messages</p>
                </div>
                <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Mystery Lovers</p>
                  <p className="text-xs text-muted-foreground">67 members • 1 new message</p>
                </div>
                <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">1</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}