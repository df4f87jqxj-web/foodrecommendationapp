import { useState, useEffect } from 'react';
import { 
  mockRestaurants, 
  mockUsers, 
  mockPosts,
  DietaryPreference, 
  PriceLevel, 
  District,
  Restaurant,
  User,
  Post
} from './data/mockData';
import { LoginScreen } from './components/LoginScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeScreen } from './components/HomeScreen';
import { FilterScreen } from './components/FilterScreen';
import { RestaurantDetailsScreen } from './components/RestaurantDetailsScreen';
import { FriendsFeedScreen } from './components/FriendsFeedScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AddPostScreen } from './components/AddPostScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { Home, Users, PlusCircle, User as UserIcon, Compass } from 'lucide-react';

type Screen = 'home' | 'feed' | 'profile' | 'add-post' | 'explore';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showAddPost, setShowAddPost] = useState(false);

  // User data
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<string[]>([]);
  const [visitedRestaurants, setVisitedRestaurants] = useState<string[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>(mockPosts);

  // Filters
  const [filters, setFilters] = useState<{
    districts: District[];
    priceLevel: PriceLevel[];
    dietaryPreferences: DietaryPreference[];
  }>({
    districts: [],
    priceLevel: [],
    dietaryPreferences: []
  });

  // Handle login
  const handleLogin = (name: string) => {
    setCurrentUser({
      ...currentUser,
      name,
      username: name.toLowerCase().replace(/\s+/g, '')
    });
    setIsLoggedIn(true);
  };

  // Handle onboarding completion
  const handleOnboardingComplete = (preferences: DietaryPreference[], favoriteDistrict: District) => {
    setCurrentUser({
      ...currentUser,
      preferences,
      favoriteDistrict
    });
    setHasCompletedOnboarding(true);
  };

  // Toggle favorite
  const toggleFavorite = (restaurantId: string) => {
    setFavoriteRestaurants(prev =>
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  // Toggle visited
  const toggleVisited = (restaurantId: string) => {
    setVisitedRestaurants(prev =>
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  // Add post
  const handleAddPost = (content: string, restaurantId: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      restaurantId,
      content,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    setUserPosts([newPost, ...userPosts]);
    setShowAddPost(false);
  };

  // Show screens
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  const favoriteRestaurantsList = mockRestaurants.filter(r => favoriteRestaurants.includes(r.id));
  const visitedRestaurantsList = mockRestaurants.filter(r => visitedRestaurants.includes(r.id));

  return (
    <div className="h-screen flex flex-col bg-white max-w-md mx-auto">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeScreen === 'home' && (
          <HomeScreen
            restaurants={mockRestaurants}
            userPreferences={currentUser.preferences}
            onRestaurantClick={setSelectedRestaurant}
            onFilterClick={() => setShowFilter(true)}
            activeFilters={filters}
          />
        )}

        {activeScreen === 'feed' && (
          <FriendsFeedScreen
            posts={userPosts}
            users={mockUsers}
            restaurants={mockRestaurants}
          />
        )}

        {activeScreen === 'profile' && (
          <ProfileScreen
            user={currentUser}
            favoriteRestaurants={favoriteRestaurantsList}
            visitedRestaurants={visitedRestaurantsList}
            onRestaurantClick={setSelectedRestaurant}
          />
        )}

        {activeScreen === 'explore' && (
          <ExploreScreen
            restaurants={mockRestaurants}
            onRestaurantClick={setSelectedRestaurant}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t shadow-lg">
        <div className="flex items-center justify-around px-4 py-3">
          <button
            onClick={() => setActiveScreen('home')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeScreen === 'home' ? 'text-[#FF8C42]' : 'text-gray-400'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => setActiveScreen('explore')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeScreen === 'explore' ? 'text-[#FF8C42]' : 'text-gray-400'
            }`}
          >
            <Compass className="w-6 h-6" />
            <span className="text-xs">Discover</span>
          </button>

          <button
            onClick={() => setShowAddPost(true)}
            className="flex flex-col items-center gap-1 p-2 -mt-6"
          >
            <div className="bg-[#FF8C42] rounded-full p-4 shadow-lg">
              <PlusCircle className="w-8 h-8 text-white" />
            </div>
          </button>

          <button
            onClick={() => setActiveScreen('feed')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeScreen === 'feed' ? 'text-[#FF8C42]' : 'text-gray-400'
            }`}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs">Feed</span>
          </button>

          <button
            onClick={() => setActiveScreen('profile')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeScreen === 'profile' ? 'text-[#FF8C42]' : 'text-gray-400'
            }`}
          >
            <UserIcon className="w-6 h-6" />
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </div>

      {/* Overlays */}
      {showFilter && (
        <FilterScreen
          onClose={() => setShowFilter(false)}
          onApply={setFilters}
          currentFilters={filters}
        />
      )}

      {selectedRestaurant && (
        <RestaurantDetailsScreen
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          isFavorite={favoriteRestaurants.includes(selectedRestaurant.id)}
          isVisited={visitedRestaurants.includes(selectedRestaurant.id)}
          onToggleFavorite={() => toggleFavorite(selectedRestaurant.id)}
          onToggleVisited={() => toggleVisited(selectedRestaurant.id)}
        />
      )}

      {showAddPost && (
        <AddPostScreen
          onClose={() => setShowAddPost(false)}
          onPost={handleAddPost}
          restaurants={mockRestaurants}
        />
      )}
    </div>
  );
}
