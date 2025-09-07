import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SearchPage } from './components/SearchPage';
import { BookDetail } from './components/BookDetail';
import { UserLibrary } from './components/UserLibrary';
import { SocialPage } from './components/SocialPage';
import { ReadingGroups } from './components/ReadingGroups';
import { FriendRecommendations } from './components/FriendRecommendations';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onBookSelect={setSelectedBook} />;
      case 'search':
        return <SearchPage query={searchQuery} onNavigate={setCurrentPage} onBookSelect={setSelectedBook} />;
      case 'book':
        return <BookDetail book={selectedBook} onNavigate={setCurrentPage} />;
      case 'library':
        return <UserLibrary onNavigate={setCurrentPage} onBookSelect={setSelectedBook} />;
      case 'social':
        return <SocialPage onNavigate={setCurrentPage} onBookSelect={setSelectedBook} />;
      case 'groups':
        return <ReadingGroups onNavigate={setCurrentPage} onBookSelect={setSelectedBook} />;
      case 'friend-recommendations':
        return <FriendRecommendations onNavigate={setCurrentPage} onBookSelect={setSelectedBook} />;
      default:
        return <HomePage onNavigate={setCurrentPage} onBookSelect={setSelectedBook} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onNavigate={setCurrentPage} 
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage('search');
        }}
        currentPage={currentPage}
      />
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  );
}