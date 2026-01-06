import { User, Restaurant } from '../data/mockData';
import { RestaurantCard } from './RestaurantCard';
import { Heart, BookmarkCheck, MapPin, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface ProfileScreenProps {
  user: User;
  favoriteRestaurants: Restaurant[];
  visitedRestaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

export function ProfileScreen({ 
  user, 
  favoriteRestaurants, 
  visitedRestaurants,
  onRestaurantClick 
}: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'favorites' | 'visited'>('favorites');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FF8C42] to-[#ff6b1a] text-white px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl">
              {user.avatar}
            </div>
            <div>
              <h2 className="text-2xl mb-1">{user.name}</h2>
              <p className="text-white/90">@{user.username}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl mb-1">{favoriteRestaurants.length}</div>
            <div className="text-xs text-white/80">Favoriten</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">{visitedRestaurants.length}</div>
            <div className="text-xs text-white/80">Besucht</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">12</div>
            <div className="text-xs text-white/80">Freunde</div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      {user.preferences.length > 0 && (
        <div className="bg-white border-b px-6 py-4">
          <p className="text-sm text-muted-foreground mb-2">Deine Präferenzen</p>
          <div className="flex gap-2 flex-wrap">
            {user.preferences.includes('vegan') && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">🌱 Vegan</span>
            )}
            {user.preferences.includes('vegetarian') && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">🥕 Vegetarisch</span>
            )}
            {user.preferences.includes('glutenfree') && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">🌾 Glutenfrei</span>
            )}
            {user.preferences.includes('halal') && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">🕌 Halal</span>
            )}
          </div>
          {user.favoriteDistrict && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Lieblingsbezirk: {user.favoriteDistrict}</span>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'favorites'
                ? 'border-[#FF8C42] text-[#FF8C42]'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>Favoriten</span>
          </button>
          <button
            onClick={() => setActiveTab('visited')}
            className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'visited'
                ? 'border-[#FF8C42] text-[#FF8C42]'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            <BookmarkCheck className="w-5 h-5" />
            <span>Besucht</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'favorites' ? (
          <div className="p-4 space-y-4">
            {favoriteRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Noch keine Favoriten</p>
                <p className="text-sm text-muted-foreground mt-2">Markiere Restaurants mit ❤️</p>
              </div>
            ) : (
              favoriteRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => onRestaurantClick(restaurant)}
                />
              ))
            )}
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {visitedRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <BookmarkCheck className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Noch keine besuchten Restaurants</p>
                <p className="text-sm text-muted-foreground mt-2">Markiere besuchte Restaurants</p>
              </div>
            ) : (
              visitedRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => onRestaurantClick(restaurant)}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
