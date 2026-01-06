export type DietaryPreference = 'vegan' | 'vegetarian' | 'glutenfree' | 'halal';
export type PriceLevel = '€' | '€€' | '€€€';
export type District = 'Mitte' | 'Kreuzberg' | 'Friedrichshain' | 'Neukölln' | 'Prenzlauer Berg' | 'Charlottenburg' | 'Schöneberg' | 'Tempelhof' | 'Wedding' | 'Pankow' | 'Lichtenberg';

export interface Restaurant {
  id: string;
  name: string;
  district: District;
  cuisine: string;
  priceLevel: PriceLevel;
  rating: number;
  image: string;
  description: string;
  address: string;
  dietaryOptions: DietaryPreference[];
  latitude: number;
  longitude: number;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  preferences: DietaryPreference[];
  favoriteDistrict?: District;
}

export interface Post {
  id: string;
  userId: string;
  restaurantId: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
}

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Sakura Sushi Bar',
    district: 'Mitte',
    cuisine: 'Japanisch',
    priceLevel: '€€',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1696449241254-11cf7f18ce32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYxMDMwODMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Authentisches Sushi in modernem Ambiente. Frischer Fisch täglich importiert.',
    address: 'Torstraße 125, 10119 Berlin',
    dietaryOptions: [],
    latitude: 52.5289,
    longitude: 13.4015,
    tags: ['Date Spot', 'Sushi', 'Modern']
  },
  {
    id: '2',
    name: 'Pizza Paradiso',
    district: 'Kreuzberg',
    cuisine: 'Italienisch',
    priceLevel: '€',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYxMDM1MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Neapolitanische Pizza aus dem Steinofen. Gemütliche Atmosphäre.',
    address: 'Oranienstraße 45, 10969 Berlin',
    dietaryOptions: ['vegetarian'],
    latitude: 52.5018,
    longitude: 13.4208,
    tags: ['Pizza', 'Casual', 'Street Food']
  },
  {
    id: '3',
    name: 'Green Soul Kitchen',
    district: 'Prenzlauer Berg',
    cuisine: 'Vegan',
    priceLevel: '€€',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGZvb2R8ZW58MXx8fHwxNzYxMDU5NjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Kreative vegane Küche mit saisonalen Zutaten. Absolutes Highlight!',
    address: 'Kollwitzstraße 88, 10435 Berlin',
    dietaryOptions: ['vegan', 'vegetarian', 'glutenfree'],
    latitude: 52.5321,
    longitude: 13.4186,
    tags: ['Vegan', 'Healthy', 'Modern']
  },
  {
    id: '4',
    name: 'Burger Haus',
    district: 'Friedrichshain',
    cuisine: 'Amerikanisch',
    priceLevel: '€',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1644447381290-85358ae625cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MTA1MzAyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Saftige Burger mit hausgemachten Saucen und knusprigen Pommes.',
    address: 'Simon-Dach-Straße 12, 10245 Berlin',
    dietaryOptions: ['halal'],
    latitude: 52.5145,
    longitude: 13.4577,
    tags: ['Burger', 'Casual', 'American']
  },
  {
    id: '5',
    name: 'Banh Mi Brothers',
    district: 'Neukölln',
    cuisine: 'Vietnamesisch',
    priceLevel: '€',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1623133894375-ce20135ee521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHN0cmVldCUyMGZvb2R8ZW58MXx8fHwxNzYxMDU5NjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Authentische vietnamesische Sandwiches und Pho. Street Food at its best!',
    address: 'Weserstraße 202, 12047 Berlin',
    dietaryOptions: ['vegetarian'],
    latitude: 52.4822,
    longitude: 13.4361,
    tags: ['Street Food', 'Asian', 'Quick']
  },
  {
    id: '6',
    name: 'Le Petit Bistro',
    district: 'Charlottenburg',
    cuisine: 'Französisch',
    priceLevel: '€€€',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1685040235380-a42a129ade4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMDQ4MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Französische Haute Cuisine in elegantem Ambiente. Perfekt für besondere Anlässe.',
    address: 'Kantstraße 152, 10623 Berlin',
    dietaryOptions: [],
    latitude: 52.5063,
    longitude: 13.3227,
    tags: ['Date Spot', 'Fine Dining', 'French']
  },
  {
    id: '7',
    name: 'Halal Grill & Kebab',
    district: 'Kreuzberg',
    cuisine: 'Türkisch',
    priceLevel: '€',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1623133894375-ce20135ee521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHN0cmVldCUyMGZvb2R8ZW58MXx8fHwxNzYxMDU5NjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Traditionelle türkische Küche. Alle Speisen 100% Halal.',
    address: 'Kottbusser Damm 95, 10967 Berlin',
    dietaryOptions: ['halal'],
    latitude: 52.4945,
    longitude: 13.4223,
    tags: ['Halal', 'Turkish', 'Street Food']
  },
  {
    id: '8',
    name: 'Glutenfrei & Gut',
    district: 'Mitte',
    cuisine: 'International',
    priceLevel: '€€',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGZvb2R8ZW58MXx8fHwxNzYxMDU5NjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Komplett glutenfreie Küche ohne Geschmackseinbußen.',
    address: 'Rosenthaler Straße 40, 10178 Berlin',
    dietaryOptions: ['glutenfree', 'vegetarian', 'vegan'],
    latitude: 52.5245,
    longitude: 13.4015,
    tags: ['Gluten Free', 'Healthy', 'Modern']
  },
  {
    id: '9',
    name: 'Seoul BBQ House',
    district: 'Schöneberg',
    cuisine: 'Koreanisch',
    priceLevel: '€€',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1709433420510-1d3d65d7ac68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBiYnElMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MTE5MDA1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Authentisches Korean BBQ mit Tischgrill. Perfekt zum Teilen mit Freunden!',
    address: 'Hauptstraße 15, 10827 Berlin',
    dietaryOptions: ['halal'],
    latitude: 52.4839,
    longitude: 13.3501,
    tags: ['BBQ', 'Korean', 'Group Dining']
  },
  {
    id: '10',
    name: 'Taj Mahal Palace',
    district: 'Wedding',
    cuisine: 'Indisch',
    priceLevel: '€€',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1690915475414-9aaecfd3ba74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYxMjI4NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Traditionelle indische Currys und Tandoori-Spezialitäten. Große vegetarische Auswahl.',
    address: 'Müllerstraße 138, 13353 Berlin',
    dietaryOptions: ['vegetarian', 'vegan', 'halal'],
    latitude: 52.5482,
    longitude: 13.3549,
    tags: ['Indian', 'Curry', 'Spicy']
  },
  {
    id: '11',
    name: 'Taco Loco',
    district: 'Friedrichshain',
    cuisine: 'Mexikanisch',
    priceLevel: '€',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1615818449536-f26c1e1fe0f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBmb29kfGVufDF8fHx8MTc2MTI2OTcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Frische Tacos und Burritos. Happy Hour Margaritas jeden Abend!',
    address: 'Warschauer Straße 56, 10243 Berlin',
    dietaryOptions: ['vegetarian', 'vegan'],
    latitude: 52.5057,
    longitude: 13.4487,
    tags: ['Mexican', 'Tacos', 'Casual']
  },
  {
    id: '12',
    name: 'Bangkok Street Kitchen',
    district: 'Neukölln',
    cuisine: 'Thailändisch',
    priceLevel: '€',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1665917152889-b170c7b8b5fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwZm9vZCUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYxMjEzMjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Authentisches Thai Street Food. Pad Thai und Currys wie in Bangkok!',
    address: 'Sonnenallee 85, 12045 Berlin',
    dietaryOptions: ['vegetarian', 'vegan', 'glutenfree'],
    latitude: 52.4742,
    longitude: 13.4429,
    tags: ['Thai', 'Street Food', 'Spicy']
  },
  {
    id: '13',
    name: 'Hummus Heaven',
    district: 'Kreuzberg',
    cuisine: 'Libanesisch',
    priceLevel: '€',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1680405531955-8b4981bb1b0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwaHVtbXVzJTIwZm9vZHxlbnwxfHx8fDE3NjEyOTc3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Der beste Hummus der Stadt! Libanesische Mezze-Platten zum Teilen.',
    address: 'Mehringdamm 32, 10961 Berlin',
    dietaryOptions: ['vegan', 'vegetarian', 'halal'],
    latitude: 52.4951,
    longitude: 13.3882,
    tags: ['Lebanese', 'Healthy', 'Mezze']
  },
  {
    id: '14',
    name: 'Berliner Schnitzelhaus',
    district: 'Tempelhof',
    cuisine: 'Deutsch',
    priceLevel: '€€',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzY2huaXR6ZWwlMjBmb29kfGVufDF8fHx8MTc2MTIzMjAwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Traditionelle deutsche Küche. Schnitzel so groß wie der Teller!',
    address: 'Tempelhofer Damm 227, 12099 Berlin',
    dietaryOptions: [],
    latitude: 52.4617,
    longitude: 13.3895,
    tags: ['German', 'Traditional', 'Comfort Food']
  },
  {
    id: '15',
    name: 'Ramen Ya',
    district: 'Mitte',
    cuisine: 'Japanisch',
    priceLevel: '€€',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1732522158226-676fa2512f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMG5vb2RsZXMlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MTI5Nzc5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Authentische japanische Ramen mit 12-Stunden Brühe. Ein Muss für Ramen-Fans!',
    address: 'Invalidenstraße 112, 10115 Berlin',
    dietaryOptions: ['halal'],
    latitude: 52.5312,
    longitude: 13.3782,
    tags: ['Ramen', 'Japanese', 'Comfort Food']
  },
  {
    id: '16',
    name: 'Café Morgenrot',
    district: 'Prenzlauer Berg',
    cuisine: 'Café',
    priceLevel: '€',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1670710029405-ad968b51b6dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBicnVuY2glMjBjYWZlfGVufDF8fHx8MTc2MTI5Nzc5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Gemütliches Café mit legendärem Brunch. Perfekt für entspannte Wochenenden.',
    address: 'Kastanienallee 85, 10435 Berlin',
    dietaryOptions: ['vegetarian', 'vegan'],
    latitude: 52.5365,
    longitude: 13.4042,
    tags: ['Café', 'Brunch', 'Coffee']
  },
  {
    id: '17',
    name: 'Addis Abeba',
    district: 'Lichtenberg',
    cuisine: 'Äthiopisch',
    priceLevel: '€',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1596235502219-a1c80d8be60c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYW4lMjBpbmplcmElMjBmb29kfGVufDF8fHx8MTc2MTI5Nzc5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Traditionelle äthiopische Küche. Mit den Händen essen auf Injera!',
    address: 'Frankfurter Allee 58, 10247 Berlin',
    dietaryOptions: ['vegan', 'vegetarian', 'halal'],
    latitude: 52.5155,
    longitude: 13.4712,
    tags: ['Ethiopian', 'Traditional', 'Unique']
  },
  {
    id: '18',
    name: 'La Tapería',
    district: 'Charlottenburg',
    cuisine: 'Spanisch',
    priceLevel: '€€',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1730406928830-25b6133a6ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFuaXNoJTIwdGFwYXMlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MTIzNTUwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Spanische Tapas und Wein. Lebendige Atmosphäre wie in Barcelona.',
    address: 'Savignyplatz 5, 10623 Berlin',
    dietaryOptions: ['vegetarian'],
    latitude: 52.5049,
    longitude: 13.3224,
    tags: ['Spanish', 'Tapas', 'Wine']
  },
  {
    id: '19',
    name: 'Dim Sum Palace',
    district: 'Pankow',
    cuisine: 'Chinesisch',
    priceLevel: '€€',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1730711524904-679bb6f02e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwZGltJTIwc3VtfGVufDF8fHx8MTc2MTE5MDA1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Handgemachte Dim Sum und Dumplings. Sonntags mit authentischem Dim Sum Brunch.',
    address: 'Breite Straße 43, 13187 Berlin',
    dietaryOptions: ['vegetarian'],
    latitude: 52.5697,
    longitude: 13.4047,
    tags: ['Chinese', 'Dim Sum', 'Brunch']
  },
  {
    id: '20',
    name: 'Bäckerei Herrmann',
    district: 'Schöneberg',
    cuisine: 'Café',
    priceLevel: '€',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cmllcyUyMGNhZmV8ZW58MXx8fHwxNzYxMjk3Nzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Traditionelle Berliner Bäckerei seit 1952. Die besten Croissants der Stadt!',
    address: 'Winterfeldtstraße 22, 10781 Berlin',
    dietaryOptions: ['vegetarian'],
    latitude: 52.4952,
    longitude: 13.3549,
    tags: ['Bakery', 'Breakfast', 'Traditional']
  },
  {
    id: '21',
    name: 'Falafel Point',
    district: 'Wedding',
    cuisine: 'Arabisch',
    priceLevel: '€',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1606577961562-7e2614b96132?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWxhZmVsJTIwbWVkaXRlcnJhbmVhbiUyMHN0cmVldCUyMGZvb2R8ZW58MXx8fHwxNzYxMjk3Nzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Frisch fritierte Falafel und Shawarma. Schnell, lecker, preiswert!',
    address: 'Badstraße 10, 13357 Berlin',
    dietaryOptions: ['vegan', 'vegetarian', 'halal'],
    latitude: 52.5509,
    longitude: 13.3742,
    tags: ['Falafel', 'Street Food', 'Quick']
  },
  {
    id: '22',
    name: 'The Grill Masters',
    district: 'Charlottenburg',
    cuisine: 'Steakhouse',
    priceLevel: '€€€',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1690983325563-fe4412c4c347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVha2hvdXNlJTIwbWVhdCUyMGdyaWxsfGVufDF8fHx8MTc2MTI1MTU1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Premium Steaks und Grillspezialitäten. Dry-aged Beef vom Feinsten.',
    address: 'Kurfürstendamm 195, 10707 Berlin',
    dietaryOptions: [],
    latitude: 52.4984,
    longitude: 13.3103,
    tags: ['Steakhouse', 'Fine Dining', 'Premium']
  },
  {
    id: '23',
    name: 'Nordsee Fischhaus',
    district: 'Mitte',
    cuisine: 'Seafood',
    priceLevel: '€€',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1680405104108-a249b7c3ddf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwZmlzaCUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYxMjk3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Frischer Fisch und Meeresfrüchte. Täglich wechselnde Fangempfehlungen.',
    address: 'Friedrichstraße 105, 10117 Berlin',
    dietaryOptions: [],
    latitude: 52.5237,
    longitude: 13.3889,
    tags: ['Seafood', 'Fish', 'Fresh']
  },
  {
    id: '24',
    name: 'The Daily Grind',
    district: 'Friedrichshain',
    cuisine: 'Café',
    priceLevel: '€',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMjcwMzAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Specialty Coffee und hausgemachte Kuchen. Perfekt zum Arbeiten mit Laptop.',
    address: 'Revaler Straße 99, 10245 Berlin',
    dietaryOptions: ['vegetarian', 'vegan'],
    latitude: 52.5093,
    longitude: 13.4617,
    tags: ['Coffee', 'Café', 'Work-Friendly']
  },
  {
    id: '25',
    name: 'Poke Paradise',
    district: 'Prenzlauer Berg',
    cuisine: 'Hawaiian',
    priceLevel: '€€',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1606757819934-d61a9f7279d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2tlJTIwYm93bCUyMGhlYWx0aHl8ZW58MXx8fHwxNzYxMjk3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Frische Poke Bowls mit nachhaltigem Fisch. Gesund und lecker!',
    address: 'Schönhauser Allee 175, 10119 Berlin',
    dietaryOptions: ['glutenfree'],
    latitude: 52.5328,
    longitude: 13.4118,
    tags: ['Poke', 'Healthy', 'Fresh']
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Du',
    username: 'foodlover',
    avatar: '👤',
    preferences: [],
    favoriteDistrict: 'Kreuzberg'
  },
  {
    id: '2',
    name: 'Sarah Mueller',
    username: 'sarahm',
    avatar: '👩',
    preferences: ['vegan'],
    favoriteDistrict: 'Prenzlauer Berg'
  },
  {
    id: '3',
    name: 'Max Schmidt',
    username: 'maxs',
    avatar: '👨',
    preferences: ['halal'],
    favoriteDistrict: 'Neukölln'
  },
  {
    id: '4',
    name: 'Lisa Chen',
    username: 'lisac',
    avatar: '👩',
    preferences: ['vegetarian'],
    favoriteDistrict: 'Mitte'
  },
  {
    id: '5',
    name: 'Tom Wagner',
    username: 'tomw',
    avatar: '🧑',
    preferences: ['glutenfree'],
    favoriteDistrict: 'Schöneberg'
  },
  {
    id: '6',
    name: 'Jana Koch',
    username: 'janak',
    avatar: '👱‍♀️',
    preferences: ['vegan', 'glutenfree'],
    favoriteDistrict: 'Wedding'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '2',
    restaurantId: '3',
    content: 'Unglaublich leckeres veganes Curry! 🌱 Green Soul Kitchen ist ein absolutes Muss!',
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGZvb2R8ZW58MXx8fHwxNzYxMDU5NjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '2025-10-24T18:30:00Z',
    likes: 24
  },
  {
    id: '2',
    userId: '3',
    restaurantId: '1',
    content: 'Bestes Sushi in Berlin! 🍣 Das Ambiente ist super modern und gemütlich.',
    timestamp: '2025-10-24T12:15:00Z',
    likes: 18
  },
  {
    id: '3',
    userId: '4',
    restaurantId: '2',
    content: 'Pizza wie in Neapel! Die Atmosphäre in Kreuzberg ist genial 🍕',
    image: 'https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYxMDM1MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '2025-10-23T20:00:00Z',
    likes: 31
  },
  {
    id: '4',
    userId: '2',
    restaurantId: '5',
    content: 'Street Food Paradies! Die Banh Mi sind der Hammer 🥖',
    timestamp: '2025-10-23T14:45:00Z',
    likes: 15
  },
  {
    id: '5',
    userId: '5',
    restaurantId: '9',
    content: 'Seoul BBQ House in Schöneberg ist mega! 🔥 Korean BBQ vom Feinsten. Muss man probiert haben!',
    image: 'https://images.unsplash.com/photo-1709433420510-1d3d65d7ac68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBiYnElMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MTE5MDA1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    timestamp: '2025-10-23T11:20:00Z',
    likes: 42
  },
  {
    id: '6',
    userId: '6',
    restaurantId: '13',
    content: 'Hummus Heaven hat den Namen verdient! Bester Hummus ever 😍 Alles vegan und halal!',
    timestamp: '2025-10-22T19:30:00Z',
    likes: 27
  },
  {
    id: '7',
    userId: '3',
    restaurantId: '15',
    content: 'Ramen Ya - die Brühe ist unfassbar lecker! 🍜 Warte-Zeit lohnt sich definitiv.',
    image: 'https://images.unsplash.com/photo-1732522158226-676fa2512f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMG5vb2RsZXMlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MTI5Nzc5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    timestamp: '2025-10-22T15:45:00Z',
    likes: 33
  },
  {
    id: '8',
    userId: '4',
    restaurantId: '11',
    content: 'Taco Loco in Friedrichshain! Die veganen Tacos sind der Wahnsinn 🌮',
    timestamp: '2025-10-22T13:10:00Z',
    likes: 19
  },
  {
    id: '9',
    userId: '2',
    restaurantId: '25',
    content: 'Poke Paradise - so frisch und gesund! 🥗 Perfekt nach dem Sport.',
    image: 'https://images.unsplash.com/photo-1606757819934-d61a9f7279d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2tlJTIwYm93bCUyMGhlYWx0aHl8ZW58MXx8fHwxNzYxMjk3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    timestamp: '2025-10-21T17:00:00Z',
    likes: 28
  },
  {
    id: '10',
    userId: '5',
    restaurantId: '22',
    content: 'The Grill Masters - teuer aber es lohnt sich! Das beste Steak meines Lebens 🥩',
    timestamp: '2025-10-21T21:30:00Z',
    likes: 45
  },
  {
    id: '11',
    userId: '6',
    restaurantId: '17',
    content: 'Addis Abeba in Lichtenberg! Äthiopisches Essen ist so unterbewertet. Mit den Händen essen macht so viel Spaß! 🇪🇹',
    timestamp: '2025-10-21T12:00:00Z',
    likes: 22
  },
  {
    id: '12',
    userId: '4',
    restaurantId: '16',
    content: 'Café Morgenrot Brunch am Sonntag = perfekter Start ins Wochenende ☕️🥐',
    timestamp: '2025-10-20T10:30:00Z',
    likes: 36
  }
];
