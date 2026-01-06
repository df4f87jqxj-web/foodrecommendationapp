import { useState } from 'react';
import { DietaryPreference, District } from '../data/mockData';
import { Button } from './ui/button';
import { Utensils } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: (preferences: DietaryPreference[], favoriteDistrict: District) => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [selectedPreferences, setSelectedPreferences] = useState<DietaryPreference[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<District>('Mitte');

  const preferences: { value: DietaryPreference; label: string; emoji: string }[] = [
    { value: 'vegan', label: 'Vegan', emoji: '🌱' },
    { value: 'vegetarian', label: 'Vegetarisch', emoji: '🥕' },
    { value: 'glutenfree', label: 'Glutenfrei', emoji: '🌾' },
    { value: 'halal', label: 'Halal', emoji: '🕌' }
  ];

  const districts: District[] = ['Mitte', 'Kreuzberg', 'Friedrichshain', 'Neukölln', 'Prenzlauer Berg', 'Charlottenburg'];

  const togglePreference = (pref: DietaryPreference) => {
    setSelectedPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4ED] to-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FF8C42] rounded-full flex items-center justify-center mx-auto mb-4">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2 text-[#2D2D2D]">Willkommen bei FoodTastetic!</h1>
          <p className="text-muted-foreground">Discover. Connect. Taste Berlin.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="mb-4">Deine Essenspräferenzen</h2>
          <p className="text-sm text-muted-foreground mb-4">Wähle alle, die auf dich zutreffen:</p>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
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

          <h3 className="mb-4">Dein Lieblingsbezirk</h3>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value as District)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white focus:border-[#FF8C42] focus:outline-none"
          >
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <Button
          onClick={() => onComplete(selectedPreferences, selectedDistrict)}
          className="w-full bg-[#FF8C42] hover:bg-[#e67a32] text-white py-6 rounded-xl"
        >
          Los geht's! 🎉
        </Button>
      </div>
    </div>
  );
}
