import { useState } from 'react';
import { DietaryPreference, PriceLevel, District } from '../data/mockData';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface FilterScreenProps {
  onClose: () => void;
  onApply: (filters: {
    districts: District[];
    priceLevel: PriceLevel[];
    dietaryPreferences: DietaryPreference[];
  }) => void;
  currentFilters: {
    districts: District[];
    priceLevel: PriceLevel[];
    dietaryPreferences: DietaryPreference[];
  };
}

export function FilterScreen({ onClose, onApply, currentFilters }: FilterScreenProps) {
  const [selectedDistricts, setSelectedDistricts] = useState<District[]>(currentFilters.districts);
  const [selectedPriceLevels, setSelectedPriceLevels] = useState<PriceLevel[]>(currentFilters.priceLevel);
  const [selectedPreferences, setSelectedPreferences] = useState<DietaryPreference[]>(currentFilters.dietaryPreferences);

  const districts: District[] = ['Mitte', 'Kreuzberg', 'Friedrichshain', 'Neukölln', 'Prenzlauer Berg', 'Charlottenburg'];
  const priceLevels: PriceLevel[] = ['€', '€€', '€€€'];
  const preferences: { value: DietaryPreference; label: string; emoji: string }[] = [
    { value: 'vegan', label: 'Vegan', emoji: '🌱' },
    { value: 'vegetarian', label: 'Vegetarisch', emoji: '🥕' },
    { value: 'glutenfree', label: 'Glutenfrei', emoji: '🌾' },
    { value: 'halal', label: 'Halal', emoji: '🕌' }
  ];

  const toggleDistrict = (district: District) => {
    setSelectedDistricts(prev =>
      prev.includes(district) ? prev.filter(d => d !== district) : [...prev, district]
    );
  };

  const togglePriceLevel = (level: PriceLevel) => {
    setSelectedPriceLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const togglePreference = (pref: DietaryPreference) => {
    setSelectedPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleApply = () => {
    onApply({
      districts: selectedDistricts,
      priceLevel: selectedPriceLevels,
      dietaryPreferences: selectedPreferences
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedDistricts([]);
    setSelectedPriceLevels([]);
    setSelectedPreferences([]);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center justify-between shadow-sm">
        <h2 className="text-xl">Filter</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 pb-32">
        {/* Districts */}
        <div className="mb-8">
          <h3 className="mb-4">Bezirke</h3>
          <div className="grid grid-cols-2 gap-3">
            {districts.map((district) => (
              <button
                key={district}
                onClick={() => toggleDistrict(district)}
                className={`p-3 rounded-xl border-2 transition-all text-sm ${
                  selectedDistricts.includes(district)
                    ? 'border-[#FF8C42] bg-[#FFF4ED] text-[#FF8C42]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {district}
              </button>
            ))}
          </div>
        </div>

        {/* Price Level */}
        <div className="mb-8">
          <h3 className="mb-4">Preisniveau</h3>
          <div className="flex gap-3">
            {priceLevels.map((level) => (
              <button
                key={level}
                onClick={() => togglePriceLevel(level)}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  selectedPriceLevels.includes(level)
                    ? 'border-[#FF8C42] bg-[#FFF4ED] text-[#FF8C42]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{level}</div>
                <div className="text-xs text-muted-foreground">
                  {level === '€' && 'Günstig'}
                  {level === '€€' && 'Mittel'}
                  {level === '€€€' && 'Gehoben'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="mb-8">
          <h3 className="mb-4">Ernährungsweise</h3>
          <div className="grid grid-cols-2 gap-3">
            {preferences.map((pref) => (
              <button
                key={pref.value}
                onClick={() => togglePreference(pref.value)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedPreferences.includes(pref.value)
                    ? 'border-[#FF8C42] bg-[#FFF4ED]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{pref.emoji}</div>
                <div className="text-sm">{pref.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3">
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex-1"
        >
          Zurücksetzen
        </Button>
        <Button
          onClick={handleApply}
          className="flex-1 bg-[#FF8C42] hover:bg-[#e67a32] text-white"
        >
          Anwenden
        </Button>
      </div>
    </div>
  );
}
