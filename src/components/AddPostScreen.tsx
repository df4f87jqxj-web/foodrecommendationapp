import { useState } from 'react';
import { Restaurant } from '../data/mockData';
import { X, Image as ImageIcon, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface AddPostScreenProps {
  onClose: () => void;
  onPost: (content: string, restaurantId: string) => void;
  restaurants: Restaurant[];
}

export function AddPostScreen({ onClose, onPost, restaurants }: AddPostScreenProps) {
  const [content, setContent] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
  const [showRestaurantPicker, setShowRestaurantPicker] = useState(false);

  const handlePost = () => {
    if (content.trim() && selectedRestaurant) {
      onPost(content, selectedRestaurant);
      onClose();
    }
  };

  const selectedRestaurantData = restaurants.find(r => r.id === selectedRestaurant);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center justify-between shadow-sm">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl">Neuer Beitrag</h2>
        <Button
          onClick={handlePost}
          disabled={!content.trim() || !selectedRestaurant}
          className="bg-[#FF8C42] hover:bg-[#e67a32] text-white"
        >
          Posten
        </Button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Restaurant Picker */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Restaurant</label>
          {!selectedRestaurantData ? (
            <button
              onClick={() => setShowRestaurantPicker(!showRestaurantPicker)}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#FF8C42] transition-colors flex items-center justify-center gap-2 text-muted-foreground"
            >
              <MapPin className="w-5 h-5" />
              <span>Restaurant auswählen</span>
            </button>
          ) : (
            <div 
              onClick={() => setShowRestaurantPicker(!showRestaurantPicker)}
              className="p-4 border-2 border-[#FF8C42] bg-[#FFF4ED] rounded-xl cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={selectedRestaurantData.image} 
                  alt={selectedRestaurantData.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{selectedRestaurantData.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedRestaurantData.district}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRestaurant('');
                  }}
                  className="p-1 hover:bg-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Restaurant List */}
          {showRestaurantPicker && (
            <div className="mt-3 border rounded-xl overflow-hidden max-h-64 overflow-y-auto">
              {restaurants.map((restaurant) => (
                <button
                  key={restaurant.id}
                  onClick={() => {
                    setSelectedRestaurant(restaurant.id);
                    setShowRestaurantPicker(false);
                  }}
                  className="w-full p-3 hover:bg-gray-50 flex items-center gap-3 border-b last:border-b-0"
                >
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{restaurant.name}</p>
                    <p className="text-xs text-muted-foreground">{restaurant.district}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Input */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Dein Erlebnis</label>
          <Textarea
            placeholder="Wie war dein Besuch? Teile deine Gedanken..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            {content.length}/500 Zeichen
          </p>
        </div>

        {/* Add Image (Placeholder) */}
        <div className="mb-6">
          <button className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#FF8C42] transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageIcon className="w-8 h-8" />
            <span className="text-sm">Foto hinzufügen (optional)</span>
          </button>
        </div>

        {/* Tips */}
        <div className="bg-[#FFF4ED] border border-[#FF8C42]/20 rounded-xl p-4">
          <p className="text-sm mb-2">💡 Tipps für gute Beiträge:</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Beschreibe dein Lieblingsgericht</li>
            <li>Erwähne die Atmosphäre</li>
            <li>Gib Tipps für andere Foodie-Freunde</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
