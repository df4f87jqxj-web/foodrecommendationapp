import { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { mockRestaurants, mockCurrentUser, Post } from "../data/mockData";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface AddPostScreenProps {
  onClose: () => void;
  onPostCreated: () => void;
}

export function AddPostScreen({ onClose, onPostCreated }: AddPostScreenProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!selectedRestaurant || !content.trim()) {
      alert("Bitte wähle ein Restaurant und schreibe einen Text!");
      return;
    }

    setIsSubmitting(true);

    // Create new post
    const restaurant = mockRestaurants.find((r) => r.id === selectedRestaurant);
    if (!restaurant) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: mockCurrentUser.id,
      userName: mockCurrentUser.name,
      userAvatar: mockCurrentUser.avatar,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      content: content.trim(),
      image: restaurant.image,
      timestamp: new Date(),
      likes: 0,
    };

    // Save to localStorage
    const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const updatedPosts = [newPost, ...existingPosts];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    setTimeout(() => {
      setIsSubmitting(false);
      onPostCreated();
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
        <h2>Neuer Beitrag</h2>
        <Button
          onClick={handleSubmit}
          disabled={!selectedRestaurant || !content.trim() || isSubmitting}
        >
          {isSubmitting ? "Posten..." : "Posten"}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-6 space-y-6">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src={mockCurrentUser.avatar}
            alt={mockCurrentUser.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p>{mockCurrentUser.name}</p>
            <p className="text-sm text-muted-foreground">
              Teile deine Erfahrung
            </p>
          </div>
        </div>

        {/* Restaurant Selection */}
        <div>
          <label className="block mb-2">Restaurant auswählen *</label>
          <Select value={selectedRestaurant} onValueChange={setSelectedRestaurant}>
            <SelectTrigger>
              <SelectValue placeholder="Wähle ein Restaurant..." />
            </SelectTrigger>
            <SelectContent>
              {mockRestaurants.map((restaurant) => (
                <SelectItem key={restaurant.id} value={restaurant.id}>
                  <div className="flex items-center gap-2">
                    <span>{restaurant.name}</span>
                    <span className="text-muted-foreground text-sm">
                      • {restaurant.district}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content Input */}
        <div>
          <label className="block mb-2">Deine Erfahrung *</label>
          <Textarea
            placeholder="Wie war dein Besuch? Teile deine Gedanken..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            maxLength={500}
            className="resize-none"
          />
          <p className="text-sm text-muted-foreground mt-2">
            {content.length}/500 Zeichen
          </p>
        </div>

        {/* Image Preview (if restaurant selected) */}
        {selectedRestaurant && (
          <div>
            <label className="block mb-2">Bild (automatisch hinzugefügt)</label>
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={
                  mockRestaurants.find((r) => r.id === selectedRestaurant)
                    ?.image
                }
                alt="Restaurant"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-primary/20">
          <h4 className="mb-2">💡 Tipps für deinen Beitrag:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Beschreibe dein Lieblingsgericht</li>
            <li>• Teile die Atmosphäre des Restaurants</li>
            <li>• Empfehle es für besondere Anlässe</li>
            <li>• Erwähne Preis-Leistungs-Verhältnis</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
