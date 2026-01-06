import { useState, useEffect } from "react";
import { Settings, Heart, Bookmark, CheckCircle, Edit2 } from "lucide-react";
import { mockCurrentUser, mockRestaurants, Restaurant } from "../data/mockData";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface ProfileScreenProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export function ProfileScreen({ onSelectRestaurant }: ProfileScreenProps) {
  const [user] = useState(mockCurrentUser);
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const [wantToVisit, setWantToVisit] = useState<Restaurant[]>([]);
  const [visited, setVisited] = useState<Restaurant[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const favoritesIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    const wantToVisitIds = JSON.parse(
      localStorage.getItem("wantToVisit") || "[]"
    );
    const visitedIds = JSON.parse(localStorage.getItem("visited") || "[]");

    setFavorites(
      mockRestaurants.filter((r) => favoritesIds.includes(r.id))
    );
    setWantToVisit(
      mockRestaurants.filter((r) => wantToVisitIds.includes(r.id))
    );
    setVisited(mockRestaurants.filter((r) => visitedIds.includes(r.id)));
  }, []);

  const RestaurantListItem = ({ restaurant }: { restaurant: Restaurant }) => (
    <button
      onClick={() => onSelectRestaurant(restaurant)}
      className="w-full p-4 bg-card rounded-lg border border-border hover:shadow-md transition-shadow text-left"
    >
      <div className="flex gap-3">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="mb-1 truncate">{restaurant.name}</h4>
          <p className="text-sm text-muted-foreground mb-2">
            {restaurant.district} • {restaurant.cuisine}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm">⭐ {restaurant.rating}</span>
            <span className="text-sm text-primary">
              {"€".repeat(restaurant.priceLevel)}
            </span>
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1>Profil</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2>{user.name}</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground">
              📍 Lieblingsbezirk: {user.favoriteDistrict}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <div className="mb-1">{visited.length}</div>
            <p className="text-sm text-muted-foreground">Besucht</p>
          </div>
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <div className="mb-1">{favorites.length}</div>
            <p className="text-sm text-muted-foreground">Favoriten</p>
          </div>
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <div className="mb-1">{wantToVisit.length}</div>
            <p className="text-sm text-muted-foreground">Watchlist</p>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="mb-3">Meine Präferenzen</h3>
          <div className="flex gap-2 flex-wrap">
            {user.preferences.includes("vegan") && (
              <Badge variant="secondary">🌱 Vegan</Badge>
            )}
            {user.preferences.includes("vegetarian") && (
              <Badge variant="secondary">🥕 Vegetarisch</Badge>
            )}
            {user.preferences.includes("glutenFree") && (
              <Badge variant="secondary">🌾 Glutenfrei</Badge>
            )}
            {user.preferences.includes("halal") && (
              <Badge variant="secondary">🕌 Halal</Badge>
            )}
            {user.preferences.length === 0 && (
              <Badge variant="outline">Keine Präferenzen ausgewählt</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="favorites" className="h-full flex flex-col">
          <TabsList className="mx-4 grid w-auto grid-cols-3">
            <TabsTrigger value="favorites" className="gap-1.5">
              <Heart className="h-4 w-4" />
              Favoriten
            </TabsTrigger>
            <TabsTrigger value="wantToVisit" className="gap-1.5">
              <Bookmark className="h-4 w-4" />
              Watchlist
            </TabsTrigger>
            <TabsTrigger value="visited" className="gap-1.5">
              <CheckCircle className="h-4 w-4" />
              Besucht
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto pb-20">
            <TabsContent value="favorites" className="px-4 py-4 space-y-3 mt-0">
              {favorites.length > 0 ? (
                favorites.map((restaurant) => (
                  <RestaurantListItem
                    key={restaurant.id}
                    restaurant={restaurant}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Noch keine Favoriten
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="wantToVisit"
              className="px-4 py-4 space-y-3 mt-0"
            >
              {wantToVisit.length > 0 ? (
                wantToVisit.map((restaurant) => (
                  <RestaurantListItem
                    key={restaurant.id}
                    restaurant={restaurant}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Keine gespeicherten Restaurants
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="visited" className="px-4 py-4 space-y-3 mt-0">
              {visited.length > 0 ? (
                visited.map((restaurant) => (
                  <RestaurantListItem
                    key={restaurant.id}
                    restaurant={restaurant}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Noch keine Restaurants besucht
                  </p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
