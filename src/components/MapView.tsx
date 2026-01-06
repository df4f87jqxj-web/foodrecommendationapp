import { Restaurant } from '../data/mockData';
import { MapPin, Star } from 'lucide-react';

interface MapViewProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
  selectedRestaurant?: Restaurant;
}

export function MapView({ restaurants, onRestaurantClick, selectedRestaurant }: MapViewProps) {
  // Mock map centered on Berlin
  const centerLat = 52.5200;
  const centerLng = 13.4050;
  
  // Simple projection for mock map
  const latToY = (lat: number) => ((centerLat - lat) * 3000) + 200;
  const lngToX = (lng: number) => ((lng - centerLng) * 5000) + 200;

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Mock map background with Berlin districts */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200">
        <svg className="w-full h-full opacity-10">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* District labels */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
        <p className="text-xs mb-1">📍 Berlin</p>
        <p className="text-[10px] text-muted-foreground">{restaurants.length} Restaurants gefunden</p>
      </div>

      {/* District markers on map */}
      <div className="absolute top-1/4 left-1/4 text-xs text-gray-400 pointer-events-none">Mitte</div>
      <div className="absolute top-1/3 left-1/2 text-xs text-gray-400 pointer-events-none">Prenzlauer Berg</div>
      <div className="absolute top-1/2 left-1/3 text-xs text-gray-400 pointer-events-none">Kreuzberg</div>
      <div className="absolute top-1/2 left-2/3 text-xs text-gray-400 pointer-events-none">Friedrichshain</div>
      <div className="absolute top-2/3 left-1/2 text-xs text-gray-400 pointer-events-none">Neukölln</div>

      {/* Restaurant pins */}
      {restaurants.map((restaurant) => {
        const x = lngToX(restaurant.longitude);
        const y = latToY(restaurant.latitude);
        const isSelected = selectedRestaurant?.id === restaurant.id;

        return (
          <button
            key={restaurant.id}
            className="absolute transform -translate-x-1/2 -translate-y-full transition-all hover:scale-110 z-10"
            style={{ left: `${x}px`, top: `${y}px`, zIndex: isSelected ? 20 : 10 }}
            onClick={() => onRestaurantClick(restaurant)}
          >
            <div className="relative">
              <MapPin 
                className={`w-8 h-8 ${isSelected ? 'text-[#FF8C42] fill-[#FF8C42]' : 'text-red-500 fill-red-500'} drop-shadow-lg`}
              />
              {isSelected && (
                <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-xl w-48 text-left border border-gray-200">
                  <p className="text-sm mb-1">{restaurant.name}</p>
                  <p className="text-xs text-gray-500 mb-1">{restaurant.cuisine} • {restaurant.district}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{restaurant.rating}</span>
                    <span className="ml-1 text-gray-400">{restaurant.priceLevel}</span>
                  </div>
                </div>
              )}
              {!isSelected && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-md whitespace-nowrap text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {restaurant.name}
                </div>
              )}
            </div>
          </button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <MapPin className="w-3 h-3 text-red-500 fill-red-500" />
          <span className="text-muted-foreground">Restaurant</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <MapPin className="w-3 h-3 text-[#FF8C42] fill-[#FF8C42]" />
          <span className="text-muted-foreground">Ausgewählt</span>
        </div>
      </div>
      
      {/* Instructions */}
      {!selectedRestaurant && restaurants.length > 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg text-center pointer-events-none">
          <p className="text-sm text-gray-600">Klicke auf einen Pin für mehr Details</p>
        </div>
      )}
    </div>
  );
}
