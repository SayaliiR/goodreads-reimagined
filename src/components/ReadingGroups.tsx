import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  MessageCircle, 
  Users, 
  Search, 
  Plus, 
  Calendar,
  BookOpen,
  Settings,
  Star,
  Send,
  MoreHorizontal,
  Clock
} from 'lucide-react';

interface ReadingGroupsProps {
  onNavigate: (page: string) => void;
  onBookSelect: (book: any) => void;
}

export function ReadingGroups({ onNavigate, onBookSelect }: ReadingGroupsProps) {
  const [searchGroups, setSearchGroups] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const myGroups = [
    {
      id: 1,
      name: "Sci-Fi Book Club",
      description: "Exploring the universe through science fiction literature",
      members: 24,
      currentBook: {
        title: "Project Hail Mary",
        author: "Andy Weir",
        cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop"
      },
      nextMeeting: "March 15, 2024",
      unreadMessages: 3,
      isAdmin: true,
      recentActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Mystery Lovers",
      description: "Discussing the best mysteries and thrillers",
      members: 67,
      currentBook: {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop"
      },
      nextMeeting: "March 18, 2024",
      unreadMessages: 1,
      isAdmin: false,
      recentActivity: "1 day ago"
    },
    {
      id: 3,
      name: "Literary Fiction Circle",
      description: "Deep dives into contemporary and classic literature",
      members: 35,
      currentBook: {
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop"
      },
      nextMeeting: "March 22, 2024",
      unreadMessages: 0,
      isAdmin: false,
      recentActivity: "3 days ago"
    }
  ];

  const suggestedGroups = [
    {
      id: 4,
      name: "Fantasy Adventures",
      description: "Epic fantasy discussions and recommendations",
      members: 156,
      currentBook: {
        title: "The Priory of the Orange Tree",
        author: "Samantha Shannon"
      },
      tags: ["Fantasy", "Epic", "Dragons"]
    },
    {
      id: 5,
      name: "Non-Fiction Explorers",
      description: "Learning and growing through non-fiction",
      members: 89,
      currentBook: {
        title: "Educated",
        author: "Tara Westover"
      },
      tags: ["Biography", "History", "Science"]
    }
  ];

  const messages = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face"
      },
      message: "I'm absolutely loving Project Hail Mary! The science is so well explained and the humor is perfect. What do you all think about Grace's character development?",
      timestamp: "2 hours ago",
      likes: 8
    },
    {
      id: 2,
      user: {
        name: "Marcus Williams",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
      },
      message: "Agreed! Andy Weir really knows how to balance scientific accuracy with compelling storytelling. I'm only halfway through but already can't put it down.",
      timestamp: "1 hour ago",
      likes: 5
    },
    {
      id: 3,
      user: {
        name: "Emma Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
      },
      message: "Has anyone else noticed the similarities to The Martian in terms of problem-solving approach? I love how methodical Grace is!",
      timestamp: "45 minutes ago",
      likes: 3
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage('');
    }
  };

  if (selectedGroup) {
    const group = myGroups.find(g => g.id === selectedGroup);
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Group Header */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => setSelectedGroup(null)}
            className="mb-4"
          >
            ← Back to Groups
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl mb-2">{group?.name}</h1>
              <p className="text-muted-foreground">{group?.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {group?.members} members
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Next meeting: {group?.nextMeeting}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {group?.isAdmin && (
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-1" />
                  Manage
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-1" />
                Members
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Discussion
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex space-x-3">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={message.user.avatar} alt={message.user.name} />
                        <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{message.user.name}</span>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                        <p className="text-sm mb-2">{message.message}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <button className="flex items-center space-x-1 hover:text-primary">
                            <Star className="w-3 h-3" />
                            <span>{message.likes}</span>
                          </button>
                          <button className="hover:text-primary">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[80px]"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Book */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Current Book
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-3">
                  <div 
                    className="w-20 h-28 rounded-md overflow-hidden cursor-pointer flex-shrink-0"
                    onClick={() => onBookSelect(group?.currentBook)}
                  >
                    <img
                      src={group?.currentBook.cover}
                      alt={group?.currentBook.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 
                      className="font-medium mb-1 cursor-pointer hover:text-primary"
                      onClick={() => onBookSelect(group?.currentBook)}
                    >
                      {group?.currentBook.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      by {group?.currentBook.author}
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      View Progress
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reading Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Reading Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Chapters 1-5</span>
                  <Badge variant="default">Complete</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Chapters 6-10</span>
                  <Badge variant="secondary">In Progress</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Chapters 11-15</span>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Final Discussion</span>
                  <span className="text-sm text-muted-foreground">{group?.nextMeeting}</span>
                </div>
              </CardContent>
            </Card>

            {/* Members Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Members ({group?.members})
                  </span>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  {[...Array(6)].map((_, i) => (
                    <Avatar key={i} className="w-8 h-8 border-2 border-background">
                      <AvatarImage 
                        src={`https://images.unsplash.com/photo-${1494790108755 + i}-2616b612b47c?w=50&h=50&fit=crop&crop=face`} 
                      />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">+{group?.members - 6}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl mb-2">Reading Groups</h1>
            <p className="text-muted-foreground">Join discussions and read together with fellow book lovers</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>
      </div>

      <Tabs defaultValue="my-groups" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="my-groups">My Groups ({myGroups.length})</TabsTrigger>
          <TabsTrigger value="discover">Discover Groups</TabsTrigger>
        </TabsList>

        {/* My Groups */}
        <TabsContent value="my-groups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myGroups.map((group) => (
              <Card 
                key={group.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedGroup(group.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {group.description}
                      </p>
                    </div>
                    {group.unreadMessages > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                        {group.unreadMessages}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex space-x-3 mb-4">
                    <div className="w-12 h-18 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={group.currentBook.cover}
                        alt={group.currentBook.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-2">
                        {group.currentBook.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        by {group.currentBook.author}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {group.members} members
                      </span>
                      {group.isAdmin && <Badge variant="secondary" className="text-xs">Admin</Badge>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Next: {group.nextMeeting}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {group.recentActivity}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Discover Groups */}
        <TabsContent value="discover" className="space-y-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search groups by name, genre, or book..."
                value={searchGroups}
                onChange={(e) => setSearchGroups(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Currently reading: </span>
                        <span className="font-medium">{group.currentBook.title}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        by {group.currentBook.author}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {group.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {group.members} members
                      </span>
                      <Button size="sm">Join Group</Button>
                    </div>
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