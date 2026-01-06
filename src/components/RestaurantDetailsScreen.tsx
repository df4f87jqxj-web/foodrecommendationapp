import { Restaurant } from '../data/mockData';
import { Star, MapPin, Phone, Clock, Heart, BookmarkPlus, Navigation, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface RestaurantDetailsScreenProps {
  restaurant: Restaurant;
  onClose: () => void;
  isFavorite: boolean;
  isVisited: boolean;
  onToggleFavorite: () => void;
  onToggleVisited: () => void;
}

export function RestaurantDetailsScreen({ 
  restaurant, 
  onClose,
  isFavorite,
  isVisited,
  onToggleFavorite,
  onToggleVisited
}: RestaurantDetailsScreenProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Hero Image */}
      <div className="relative h-80">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h1 className="text-3xl text-white mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-white" />
              <span>{restaurant.rating}</span>
            </div>
            <span>{restaurant.priceLevel}</span>
            <span>{restaurant.cuisine}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Button
            variant="outline"
            onClick={onToggleFavorite}
            className={isFavorite ? 'border-[#FF8C42] bg-[#FFF4ED]' : ''}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#FF8C42] text-[#FF8C42]' : ''}`} />
          </Button>
          <Button
            variant="outline"
            onClick={onToggleVisited}
            className={isVisited ? 'border-[#FF8C42] bg-[#FFF4ED]' : ''}
          >
            <BookmarkPlus className={`w-5 h-5 ${isVisited ? 'text-[#FF8C42]' : ''}`} />
          </Button>
          <Button variant="outline">
            <Navigation className="w-5 h-5" />
          </Button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="mb-2">Über das Restaurant</h3>
          <p className="text-muted-foreground">{restaurant.description}</p>
        </div>

        {/* Dietary Options */}
        {restaurant.dietaryOptions.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3">Ernährungsoptionen</h3>
            <div className="flex gap-2 flex-wrap">
              {restaurant.dietaryOptions.includes('vegan') && (
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full">🌱 Vegan</span>
              )}
              {restaurant.dietaryOptions.includes('vegetarian') && (
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full">🥕 Vegetarisch</span>
              )}
              {restaurant.dietaryOptions.includes('glutenfree') && (
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full">🌾 Glutenfrei</span>
              )}
              {restaurant.dietaryOptions.includes('halal') && (
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full">🕌 Halal</span>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {restaurant.tags.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3">Kategorien</h3>
            <div className="flex gap-2 flex-wrap">
              {restaurant.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <MapPin className="w-5 h-5 text-[#FF8C42] mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Adresse</p>
              <p>{restaurant.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <Clock className="w-5 h-5 text-[#FF8C42] mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Öffnungszeiten</p>
              <p>Mo-So: 11:00 - 23:00</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <Phone className="w-5 h-5 text-[#FF8C42] mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Telefon</p>
              <p>+49 30 1234567</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button className="w-full bg-[#FF8C42] hover:bg-[#e67a32] text-white py-6">
          Tisch reservieren
        </Button>
      </div>
    </div>
  );
}
