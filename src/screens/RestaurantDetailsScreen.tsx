import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Navigation,
  Share2,
  Check,
  Bookmark,
} from "lucide-react";
import { Restaurant } from "../data/mockData";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

interface RestaurantDetailsScreenProps {
  restaurant: Restaurant;
  onBack: () => void;
}

export function RestaurantDetailsScreen({
  restaurant,
  onBack,
}: RestaurantDetailsScreenProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const [isWantToVisit, setIsWantToVisit] = useState(false);

  useEffect(() => {
    // Load states from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const visited = JSON.parse(localStorage.getItem("visited") || "[]");
    const wantToVisit = JSON.parse(localStorage.getItem("wantToVisit") || "[]");

    setIsFavorite(favorites.includes(restaurant.id));
    setIsVisited(visited.includes(restaurant.id));
    setIsWantToVisit(wantToVisit.includes(restaurant.id));
  }, [restaurant.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = isFavorite
      ? favorites.filter((id: string) => id !== restaurant.id)
      : [...favorites, restaurant.id];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const toggleVisited = () => {
    const visited = JSON.parse(localStorage.getItem("visited") || "[]");
    const newVisited = isVisited
      ? visited.filter((id: string) => id !== restaurant.id)
      : [...visited, restaurant.id];

    localStorage.setItem("visited", JSON.stringify(newVisited));
    setIsVisited(!isVisited);
  };

  const toggleWantToVisit = () => {
    const wantToVisit = JSON.parse(localStorage.getItem("wantToVisit") || "[]");
    const newWantToVisit = isWantToVisit
      ? wantToVisit.filter((id: string) => id !== restaurant.id)
      : [...wantToVisit, restaurant.id];

    localStorage.setItem("wantToVisit", JSON.stringify(newWantToVisit));
    setIsWantToVisit(!isWantToVisit);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: restaurant.name,
        text: `Schau dir ${restaurant.name} an auf FoodTastetic!`,
        url: window.location.href,
      });
    } else {
      alert("Teilen wird in diesem Browser nicht unterstützt");
    }
  };

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      restaurant.address
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      {/* Header Image */}
      <div className="relative h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        
        {/* Back Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 rounded-full shadow-lg"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg"
            onClick={toggleFavorite}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-primary text-primary" : ""
              }`}
            />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Info Badge */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {restaurant.cuisine}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 pb-32">
        {/* Title & Rating */}
        <div>
          <h1 className="mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-xl">⭐</span>
              <span>{restaurant.rating}</span>
            </div>
            <div className="text-primary">
              {"€".repeat(restaurant.priceLevel)}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={isVisited ? "default" : "outline"}
            onClick={toggleVisited}
            className="justify-start"
          >
            <Check className="h-4 w-4 mr-2" />
            {isVisited ? "War ich schon" : "Als besucht markieren"}
          </Button>
          <Button
            variant={isWantToVisit ? "default" : "outline"}
            onClick={toggleWantToVisit}
            className="justify-start"
          >
            <Bookmark className="h-4 w-4 mr-2" />
            {isWantToVisit ? "Gespeichert" : "Will ich ausprobieren"}
          </Button>
        </div>

        {/* Description */}
        <div>
          <h3 className="mb-2">Über das Restaurant</h3>
          <p className="text-muted-foreground">{restaurant.description}</p>
        </div>

        {/* Dietary Info */}
        {restaurant.dietary.length > 0 && (
          <div>
            <h3 className="mb-2">Ernährungsoptionen</h3>
            <div className="flex gap-2 flex-wrap">
              {restaurant.dietary.includes("vegan") && (
                <Badge variant="secondary">🌱 Vegan</Badge>
              )}
              {restaurant.dietary.includes("vegetarian") && (
                <Badge variant="secondary">🥕 Vegetarisch</Badge>
              )}
              {restaurant.dietary.includes("glutenFree") && (
                <Badge variant="secondary">🌾 Glutenfrei</Badge>
              )}
              {restaurant.dietary.includes("halal") && (
                <Badge variant="secondary">🕌 Halal</Badge>
              )}
            </div>
          </div>
        )}

        {/* Location */}
        <div>
          <h3 className="mb-2">Adresse</h3>
          <div className="flex items-start gap-3 text-muted-foreground">
            <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p>{restaurant.address}</p>
              <p className="text-sm">{restaurant.district}</p>
            </div>
          </div>
        </div>

        {/* Category */}
        <div>
          <h3 className="mb-2">Kategorie</h3>
          <Badge variant="outline">{restaurant.category}</Badge>
        </div>
      </div>

      {/* Footer Navigation Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-4">
        <Button onClick={handleNavigate} className="w-full">
          <Navigation className="h-4 w-4 mr-2" />
          Navigation starten
        </Button>
      </div>
    </div>
  );
}
