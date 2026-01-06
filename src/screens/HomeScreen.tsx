import { useState, useEffect } from "react";
import { Sparkles, SlidersHorizontal, Map, List } from "lucide-react";
import { Restaurant, mockRestaurants } from "../data/mockData";
import { RestaurantCard } from "../components/RestaurantCard";
import { RestaurantMap } from "../components/RestaurantMap";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

interface HomeScreenProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onOpenFilters: () => void;
  appliedFilters: {
    districts: string[];
    priceLevel: number[];
    dietary: string[];
  };
}

export function HomeScreen({
  onSelectRestaurant,
  onOpenFilters,
  appliedFilters,
}: HomeScreenProps) {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);
  const [dailyPick, setDailyPick] = useState<Restaurant | null>(null);

  useEffect(() => {
    // Load favorites from localStorage
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }

    // Select daily pick
    const today = new Date().toDateString();
    const storedDaily = localStorage.getItem("dailyPick");
    const storedDate = localStorage.getItem("dailyPickDate");

    if (storedDaily && storedDate === today) {
      setDailyPick(JSON.parse(storedDaily));
    } else {
      const randomPick = mockRestaurants[Math.floor(Math.random() * mockRestaurants.length)];
      setDailyPick(randomPick);
      localStorage.setItem("dailyPick", JSON.stringify(randomPick));
      localStorage.setItem("dailyPickDate", today);
    }
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = mockRestaurants;

    if (appliedFilters.districts.length > 0) {
      filtered = filtered.filter((r) =>
        appliedFilters.districts.includes(r.district)
      );
    }

    if (appliedFilters.priceLevel.length > 0) {
      filtered = filtered.filter((r) =>
        appliedFilters.priceLevel.includes(r.priceLevel)
      );
    }

    if (appliedFilters.dietary.length > 0) {
      filtered = filtered.filter((r) =>
        appliedFilters.dietary.every((pref) => r.dietary.includes(pref))
      );
    }

    setFilteredRestaurants(filtered);
  }, [appliedFilters]);

  const toggleFavorite = (restaurantId: string) => {
    const newFavorites = favorites.includes(restaurantId)
      ? favorites.filter((id) => id !== restaurantId)
      : [...favorites, restaurantId];

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const hasActiveFilters =
    appliedFilters.districts.length > 0 ||
    appliedFilters.priceLevel.length > 0 ||
    appliedFilters.dietary.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-primary mb-1">FoodTastetic</h1>
            <p className="text-muted-foreground">Discover. Connect. Taste Berlin.</p>
          </div>
          <Button
            variant={hasActiveFilters ? "default" : "outline"}
            size="icon"
            onClick={onOpenFilters}
            className="relative"
          >
            <SlidersHorizontal className="h-5 w-5" />
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
            )}
          </Button>
        </div>

        {/* Daily Pick */}
        {dailyPick && !hasActiveFilters && (
          <div
            className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectRestaurant(dailyPick)}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-primary">Heutiger Vorschlag</span>
            </div>
            <h3 className="mb-1">
              {dailyPick.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              🍣 Lust auf {dailyPick.cuisine} in {dailyPick.district}?
            </p>
          </div>
        )}
      </div>

      {/* View Mode Toggle */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("list")}
          className="flex-1"
        >
          <List className="h-4 w-4 mr-2" />
          Liste
        </Button>
        <Button
          variant={viewMode === "map" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("map")}
          className="flex-1"
        >
          <Map className="h-4 w-4 mr-2" />
          Karte
        </Button>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Filter:</span>
            {appliedFilters.districts.map((d) => (
              <Badge key={d} variant="secondary">
                {d}
              </Badge>
            ))}
            {appliedFilters.priceLevel.map((p) => (
              <Badge key={p} variant="secondary">
                {"€".repeat(p)}
              </Badge>
            ))}
            {appliedFilters.dietary.map((d) => (
              <Badge key={d} variant="secondary">
                {d === "vegan"
                  ? "🌱 Vegan"
                  : d === "vegetarian"
                  ? "🥕 Vegetarisch"
                  : d === "glutenFree"
                  ? "🌾 Glutenfrei"
                  : "🕌 Halal"}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 pb-20">
        {viewMode === "list" ? (
          <div className="space-y-4">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onSelect={() => onSelectRestaurant(restaurant)}
                  isFavorite={favorites.includes(restaurant.id)}
                  onToggleFavorite={() => toggleFavorite(restaurant.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-2">
                  Keine Restaurants gefunden
                </p>
                <Button variant="outline" onClick={onOpenFilters}>
                  Filter anpassen
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-[600px]">
            <RestaurantMap
              restaurants={filteredRestaurants}
              onSelectRestaurant={onSelectRestaurant}
            />
          </div>
        )}
      </div>
    </div>
  );
}
