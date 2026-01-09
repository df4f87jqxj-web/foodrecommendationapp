import { Restaurant } from '../data/mockData';
import { MapComponent } from './MapComponent';

interface MapViewProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
  selectedRestaurant?: Restaurant;
}

export function MapView({ restaurants, onRestaurantClick, selectedRestaurant }: MapViewProps) {
  // If a restaurant is selected, center on it, otherwise center on Berlin
  const center = selectedRestaurant
    ? { lat: selectedRestaurant.latitude, lng: selectedRestaurant.longitude }
    : { lat: 52.5200, lng: 13.4050 };

  const zoom = selectedRestaurant ? 15 : 12;

  // We can also pass the selectedRestaurant prop to MapComponent if we want to highlight it specifically,
  // but for now, centering is enough feedback.

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative">
      {/* We use MapComponent here, ensuring it fills the container */}
      <MapComponent
        restaurants={restaurants}
        onRestaurantClick={onRestaurantClick}
        center={center}
        zoom={zoom}
      />
    </div>
  );
}
