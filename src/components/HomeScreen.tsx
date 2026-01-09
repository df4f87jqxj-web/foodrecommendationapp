import { useState, useMemo } from 'react';
import { Restaurant, DietaryPreference, PriceLevel, District } from '../data/mockData';
import { RestaurantCard } from './RestaurantCard';
import { MapView } from './MapView';
import { Map, List, SlidersHorizontal, Sparkles, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HomeScreenProps {
  restaurants: Restaurant[];
  userPreferences: DietaryPreference[];
  onRestaurantClick: (restaurant: Restaurant) => void;
  onFilterClick: () => void;
  activeFilters: {
    districts: District[];
    priceLevel: PriceLevel[];
    dietaryPreferences: DietaryPreference[];
  };
}

export function HomeScreen({
  restaurants,
  userPreferences,
  onRestaurantClick,
  onFilterClick,
  activeFilters
}: HomeScreenProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedMapRestaurant, setSelectedMapRestaurant] = useState<Restaurant>();
  const [searchQuery, setSearchQuery] = useState('');

  // Daily recommendation (random based on preferences)
  const dailyRecommendation = useMemo(() => {
    const matching = restaurants.filter(r =>
      r.dietaryOptions.some(opt => userPreferences.includes(opt)) || userPreferences.length === 0
    );
    return matching.length > 0
      ? matching[Math.floor(Math.random() * matching.length)]
      : restaurants[0];
  }, [restaurants, userPreferences]);

  // Filter restaurants based on active filters and search query
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = restaurant.name.toLowerCase().includes(query);
        const matchesCuisine = restaurant.cuisine.toLowerCase().includes(query);
        const matchesDistrict = restaurant.district.toLowerCase().includes(query);
        const matchesTags = restaurant.tags.some(tag => tag.toLowerCase().includes(query));

        if (!matchesName && !matchesCuisine && !matchesDistrict && !matchesTags) {
          return false;
        }
      }

      // District filter
      if (activeFilters.districts.length > 0 && !activeFilters.districts.includes(restaurant.district)) {
        return false;
      }

      // Price level filter
      if (activeFilters.priceLevel.length > 0 && !activeFilters.priceLevel.includes(restaurant.priceLevel)) {
        return false;
      }

      // Dietary preferences filter
      if (activeFilters.dietaryPreferences.length > 0) {
        const hasMatchingPreference = activeFilters.dietaryPreferences.some(pref =>
          restaurant.dietaryOptions.includes(pref)
        );
        if (!hasMatchingPreference) return false;
      }

      return true;
    });
  }, [restaurants, activeFilters, searchQuery]);

  const hasActiveFilters =
    activeFilters.districts.length > 0 ||
    activeFilters.priceLevel.length > 0 ||
    activeFilters.dietaryPreferences.length > 0;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header with daily recommendation */}
      <div className="bg-gradient-to-r from-[#FF8C42] to-[#ff6b1a] text-white p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm opacity-90">Empfehlung des Tages</span>
        </div>
        <h2 className="text-xl mb-1">{dailyRecommendation.name}</h2>
        <p className="text-base opacity-90">
          {dailyRecommendation.cuisine} in {dailyRecommendation.district}
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Restaurant, Küche oder Bezirk suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and View Toggle Bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterClick}
          className={hasActiveFilters ? 'border-[#FF8C42] text-[#FF8C42]' : ''}
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filter
          {hasActiveFilters && (
            <span className="ml-2 bg-[#FF8C42] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {activeFilters.districts.length + activeFilters.priceLevel.length + activeFilters.dietaryPreferences.length}
            </span>
          )}
        </Button>

        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'list'
                ? 'bg-white text-[#FF8C42] shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <List className="w-4 h-4" />
            Liste
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'map'
                ? 'bg-white text-[#FF8C42] shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <Map className="w-4 h-4" />
            Karte
          </button>
        </div>
      </div>

      {/* Search Results Info */}
      {(searchQuery || hasActiveFilters) && (
        <div className="bg-blue-50 border-b border-blue-100 px-4 py-2">
          <p className="text-xs text-blue-700">
            {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'Restaurant' : 'Restaurants'} gefunden
            {searchQuery && <span className="ml-1">für "{searchQuery}"</span>}
          </p>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {viewMode === 'list' ? (
          <div className="p-4 space-y-4">
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Keine Restaurants gefunden.</p>
                {searchQuery && (
                  <Button
                    variant="link"
                    onClick={() => setSearchQuery('')}
                    className="text-[#FF8C42] mt-2"
                  >
                    Suche zurücksetzen
                  </Button>
                )}
                {hasActiveFilters && (
                  <Button
                    variant="link"
                    onClick={onFilterClick}
                    className="text-[#FF8C42] mt-2"
                  >
                    Filter anpassen
                  </Button>
                )}
              </div>
            ) : (
              filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => onRestaurantClick(restaurant)}
                />
              ))
            )}
          </div>
        ) : (
          <div className="h-full p-4">
            <MapView
              restaurants={filteredRestaurants}
              onRestaurantClick={(restaurant) => {
                setSelectedMapRestaurant(restaurant);
                onRestaurantClick(restaurant);
              }}
              selectedRestaurant={selectedMapRestaurant}
            />
          </div>
        )}
      </div>
    </div>
  );
}
