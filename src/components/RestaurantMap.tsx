import { MapPin } from "lucide-react";
import { Restaurant } from "../data/mockData";

interface RestaurantMapProps {
  restaurants: Restaurant[];
  selectedRestaurant?: Restaurant;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export function RestaurantMap({
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
}: RestaurantMapProps) {
  // Mock map view - in production würde hier Google Maps oder Leaflet verwendet werden
  const centerLat = 52.52;
  const centerLng = 13.405;
  
  const getRelativePosition = (lat: number, lng: number) => {
    // Vereinfachte Berechnung für Mock-Karte
    const x = ((lng - centerLng + 0.15) / 0.3) * 100;
    const y = ((centerLat - lat + 0.08) / 0.16) * 100;
    return { x: `${Math.max(5, Math.min(95, x))}%`, y: `${Math.max(5, Math.min(95, y))}%` };
  };

  return (
    <div className="relative w-full h-full bg-muted rounded-xl overflow-hidden">
      {/* Mock Karten-Hintergrund */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Straßen */}
          <line x1="0" y1="30" x2="100" y2="30" stroke="#2D2D2D" strokeWidth="0.5" />
          <line x1="0" y1="70" x2="100" y2="70" stroke="#2D2D2D" strokeWidth="0.5" />
          <line x1="25" y1="0" x2="25" y2="100" stroke="#2D2D2D" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#2D2D2D" strokeWidth="0.8" />
          <line x1="75" y1="0" x2="75" y2="100" stroke="#2D2D2D" strokeWidth="0.5" />
        </svg>
      </div>
      
      {/* Bezirks-Labels */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm">
        Berlin
      </div>

      {/* Restaurant-Pins */}
      {restaurants.map((restaurant) => {
        const pos = getRelativePosition(restaurant.lat, restaurant.lng);
        const isSelected = selectedRestaurant?.id === restaurant.id;

        return (
          <button
            key={restaurant.id}
            className={`absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 ${
              isSelected ? "scale-125 z-10" : ""
            }`}
            style={{ left: pos.x, top: pos.y }}
            onClick={() => onSelectRestaurant(restaurant)}
            title={restaurant.name}
          >
            <div className="relative">
              <MapPin
                className={`h-8 w-8 ${
                  isSelected
                    ? "text-primary fill-primary"
                    : "text-destructive fill-destructive"
                }`}
              />
              {isSelected && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg px-3 py-2 whitespace-nowrap text-sm border border-border">
                  <div className="mb-1">{restaurant.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {restaurant.district}
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-border rotate-45" />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
