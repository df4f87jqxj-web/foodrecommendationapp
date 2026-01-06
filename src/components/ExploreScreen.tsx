import { useMemo } from 'react';
import { Restaurant } from '../data/mockData';
import { RestaurantCard } from './RestaurantCard';
import { TrendingUp, Flame, Sparkles, Clock, Award, MapPin } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ExploreScreenProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

export function ExploreScreen({ restaurants, onRestaurantClick }: ExploreScreenProps) {
  // Trending spots (highest rated)
  const trendingSpots = useMemo(() => {
    return [...restaurants]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  }, [restaurants]);

  // Hot spots (high rating + many reviews)
  const hotSpots = useMemo(() => {
    return [...restaurants]
      .filter(r => r.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }, [restaurants]);

  // New openings (random selection to simulate new)
  const newOpenings = useMemo(() => {
    return [...restaurants]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
  }, [restaurants]);

  // Premium spots (€€€)
  const premiumSpots = useMemo(() => {
    return restaurants.filter(r => r.priceLevel === '€€€');
  }, [restaurants]);

  // Budget friendly (€)
  const budgetFriendly = useMemo(() => {
    return restaurants.filter(r => r.priceLevel === '€');
  }, [restaurants]);

  // Group by district
  const spotsByDistrict = useMemo(() => {
    const grouped = restaurants.reduce((acc, restaurant) => {
      if (!acc[restaurant.district]) {
        acc[restaurant.district] = [];
      }
      acc[restaurant.district].push(restaurant);
      return acc;
    }, {} as Record<string, Restaurant[]>);
    
    return Object.entries(grouped)
      .map(([district, spots]) => ({
        district,
        spots: spots.slice(0, 3),
        count: spots.length
      }))
      .sort((a, b) => b.count - a.count);
  }, [restaurants]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF8C42] to-[#ff6b1a] text-white p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-6 h-6" />
          <h1 className="text-2xl">Entdecken</h1>
        </div>
        <p className="text-sm opacity-90">Die angesagtesten Spots in Berlin</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="trending" className="w-full">
          <div className="sticky top-0 bg-white border-b z-10">
            <TabsList className="w-full justify-start rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="trending" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF8C42] data-[state=active]:bg-transparent data-[state=active]:text-[#FF8C42]"
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Trending
              </TabsTrigger>
              <TabsTrigger 
                value="hot" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF8C42] data-[state=active]:bg-transparent data-[state=active]:text-[#FF8C42]"
              >
                <Flame className="w-4 h-4 mr-1" />
                Hot Spots
              </TabsTrigger>
              <TabsTrigger 
                value="new" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF8C42] data-[state=active]:bg-transparent data-[state=active]:text-[#FF8C42]"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Neu
              </TabsTrigger>
              <TabsTrigger 
                value="districts" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF8C42] data-[state=active]:bg-transparent data-[state=active]:text-[#FF8C42]"
              >
                <MapPin className="w-4 h-4 mr-1" />
                Bezirke
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="trending" className="m-0 p-4 space-y-6">
            {/* Top Trending */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-[#FF8C42]" />
                <h2 className="text-lg">Top Trending Diese Woche</h2>
              </div>
              <div className="space-y-4">
                {trendingSpots.map((restaurant, index) => (
                  <div key={restaurant.id} className="relative">
                    {index < 3 && (
                      <Badge className="absolute -top-2 -left-2 z-10 bg-[#FF8C42] hover:bg-[#FF8C42]">
                        #{index + 1}
                      </Badge>
                    )}
                    <RestaurantCard
                      restaurant={restaurant}
                      onClick={() => onRestaurantClick(restaurant)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hot" className="m-0 p-4 space-y-6">
            {/* Hot Spots */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg">Hot Spots - Höchste Bewertungen</h2>
              </div>
              <div className="space-y-4">
                {hotSpots.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onClick={() => onRestaurantClick(restaurant)}
                  />
                ))}
              </div>
            </div>

            {/* Budget Friendly */}
            {budgetFriendly.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">💰</span>
                  <h2 className="text-lg">Budget-Friendly Favorites</h2>
                </div>
                <div className="space-y-4">
                  {budgetFriendly.slice(0, 4).map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onClick={() => onRestaurantClick(restaurant)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Premium Dining */}
            {premiumSpots.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">✨</span>
                  <h2 className="text-lg">Premium Dining</h2>
                </div>
                <div className="space-y-4">
                  {premiumSpots.slice(0, 4).map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onClick={() => onRestaurantClick(restaurant)}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="new" className="m-0 p-4 space-y-6">
            {/* New Openings */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-green-500" />
                <h2 className="text-lg">Neu Entdeckt</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Frisch auf FoodTastetic - probiere diese neuen Spots aus!
              </p>
              <div className="space-y-4">
                {newOpenings.map((restaurant) => (
                  <div key={restaurant.id} className="relative">
                    <Badge className="absolute -top-2 -right-2 z-10 bg-green-500 hover:bg-green-500">
                      NEU
                    </Badge>
                    <RestaurantCard
                      restaurant={restaurant}
                      onClick={() => onRestaurantClick(restaurant)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="districts" className="m-0 p-4 space-y-6">
            {/* By District */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg">Entdecke nach Bezirk</h2>
              </div>
              <div className="space-y-6">
                {spotsByDistrict.map(({ district, spots, count }) => (
                  <div key={district}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{district}</h3>
                      <Badge variant="outline">{count} Restaurants</Badge>
                    </div>
                    <div className="space-y-4">
                      {spots.map((restaurant) => (
                        <RestaurantCard
                          key={restaurant.id}
                          restaurant={restaurant}
                          onClick={() => onRestaurantClick(restaurant)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
