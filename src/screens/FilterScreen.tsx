import { useState, useEffect } from "react";
import { X, Euro } from "lucide-react";
import { districts, dietaryPreferences } from "../data/mockData";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

interface FilterScreenProps {
  onClose: () => void;
  onApplyFilters: (filters: {
    districts: string[];
    priceLevel: number[];
    dietary: string[];
  }) => void;
  currentFilters: {
    districts: string[];
    priceLevel: number[];
    dietary: string[];
  };
}

export function FilterScreen({
  onClose,
  onApplyFilters,
  currentFilters,
}: FilterScreenProps) {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(
    currentFilters.districts
  );
  const [selectedPriceLevel, setSelectedPriceLevel] = useState<number[]>(
    currentFilters.priceLevel
  );
  const [selectedDietary, setSelectedDietary] = useState<string[]>(
    currentFilters.dietary
  );

  const toggleDistrict = (district: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(district)
        ? prev.filter((d) => d !== district)
        : [...prev, district]
    );
  };

  const togglePriceLevel = (level: number) => {
    setSelectedPriceLevel((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const toggleDietary = (pref: string) => {
    setSelectedDietary((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      districts: selectedDistricts,
      priceLevel: selectedPriceLevel,
      dietary: selectedDietary,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedDistricts([]);
    setSelectedPriceLevel([]);
    setSelectedDietary([]);
  };

  const hasChanges =
    selectedDistricts.length > 0 ||
    selectedPriceLevel.length > 0 ||
    selectedDietary.length > 0;

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border px-4 py-4 flex items-center justify-between">
        <h2>Filter</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-8 pb-32">
        {/* Bezirke */}
        <div>
          <h3 className="mb-4">Bezirk</h3>
          <div className="grid grid-cols-2 gap-2">
            {districts.map((district) => (
              <Button
                key={district}
                variant={
                  selectedDistricts.includes(district) ? "default" : "outline"
                }
                onClick={() => toggleDistrict(district)}
                className="justify-start"
              >
                {district}
              </Button>
            ))}
          </div>
        </div>

        {/* Preisniveau */}
        <div>
          <h3 className="mb-4">Preisniveau</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((level) => (
              <Button
                key={level}
                variant={
                  selectedPriceLevel.includes(level) ? "default" : "outline"
                }
                onClick={() => togglePriceLevel(level)}
                className="flex items-center justify-center gap-1"
              >
                {"€".repeat(level)}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            € = günstig, €€ = mittel, €€€ = gehoben
          </p>
        </div>

        {/* Ernährungspräferenzen */}
        <div>
          <h3 className="mb-4">Ernährungspräferenzen</h3>
          <div className="grid grid-cols-2 gap-2">
            {dietaryPreferences.map((pref) => (
              <Button
                key={pref.id}
                variant={
                  selectedDietary.includes(pref.id) ? "default" : "outline"
                }
                onClick={() => toggleDietary(pref.id)}
                className="justify-start"
              >
                <span className="mr-2">{pref.icon}</span>
                {pref.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-primary/20">
          <p className="text-sm">
            💡 Tipp: Wähle mehrere Filter aus, um personalisierte Empfehlungen
            zu erhalten!
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-4 space-y-2">
        {hasChanges && (
          <Button variant="outline" onClick={handleReset} className="w-full">
            Zurücksetzen
          </Button>
        )}
        <Button onClick={handleApply} className="w-full">
          Filter anwenden
          {hasChanges &&
            ` (${
              selectedDistricts.length +
              selectedPriceLevel.length +
              selectedDietary.length
            })`}
        </Button>
      </div>
    </div>
  );
}
