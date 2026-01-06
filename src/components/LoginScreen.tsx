import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Utensils } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF8C42] to-[#ff6b1a] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Utensils className="w-10 h-10 text-[#FF8C42]" />
          </div>
          <h1 className="text-4xl mb-2 text-white">FoodTastetic</h1>
          <p className="text-white/90">Discover. Connect. Taste Berlin.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl mb-2 text-center">Willkommen!</h2>
          <p className="text-muted-foreground text-center mb-6">
            Entdecke die besten Restaurants in Berlin
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Dein Name</label>
              <Input
                type="text"
                placeholder="z.B. Max Mustermann"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FF8C42] hover:bg-[#e67a32] text-white py-6"
              disabled={!name.trim()}
            >
              Anmelden
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-xs text-muted-foreground">
              Demo-Version: Keine echte Registrierung erforderlich
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
