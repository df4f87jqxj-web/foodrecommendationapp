import { Restaurant } from '../data/mockData';
import { Star, MapPin, Euro } from 'lucide-react';
import { Card } from './ui/card';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 fill-[#FF8C42] text-[#FF8C42]" />
          <span className="text-sm">{restaurant.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="flex-1">{restaurant.name}</h3>
          <span className="text-[#FF8C42] ml-2">{restaurant.priceLevel}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-2">{restaurant.cuisine}</p>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{restaurant.district}</span>
        </div>
        
        {restaurant.dietaryOptions.length > 0 && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {restaurant.dietaryOptions.includes('vegan') && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">🌱 Vegan</span>
            )}
            {restaurant.dietaryOptions.includes('vegetarian') && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">🥕 Vegetarisch</span>
            )}
            {restaurant.dietaryOptions.includes('glutenfree') && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">🌾 Glutenfrei</span>
            )}
            {restaurant.dietaryOptions.includes('halal') && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">🕌 Halal</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
