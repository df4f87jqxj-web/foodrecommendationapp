import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Restaurant } from '../data/mockData';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Just in case, though usually index.css handles it.

// Fix for default marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
    restaurants: Restaurant[];
    onRestaurantClick: (restaurant: Restaurant) => void;
    apiKey?: string; // Not needed anymore but kept for prop compatibility
    center?: { lat: number; lng: number };
    zoom?: number;
}

// Fix for map loading issues in tabs/hidden containers
function MapResizer() {
    const map = useMap();
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            map.invalidateSize();
        });
        resizeObserver.observe(map.getContainer());

        // Also invalidate on mount just in case
        setTimeout(() => {
            map.invalidateSize();
        }, 100);

        return () => {
            resizeObserver.disconnect();
        };
    }, [map]);
    return null;
}

// Helper component to update map view when props change
function ChangeView({ center, zoom }: { center: { lat: number, lng: number }, zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView([center.lat, center.lng], zoom);
    }, [center, zoom, map]);
    return null;
}

export function MapComponent({
    restaurants,
    onRestaurantClick,
    center = { lat: 52.5200, lng: 13.4050 }, // Default to Berlin
    zoom = 12
}: MapComponentProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="h-full w-full rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-gray-100 z-0 relative">
            <MapContainer
                center={[center.lat, center.lng]}
                zoom={zoom}
                scrollWheelZoom={true}
                className="h-full w-full"
                style={{ height: '100%', width: '100%' }}
            >
                <MapResizer />
                <ChangeView center={center} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {restaurants.map(restaurant => (
                    <Marker
                        key={restaurant.id}
                        position={[restaurant.latitude, restaurant.longitude]}
                        eventHandlers={{
                            click: () => {
                                setSelectedId(restaurant.id);
                            },
                        }}
                    >
                        <Popup>
                            <div className="min-w-[200px]">
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    className="w-full h-24 object-cover rounded mb-2"
                                />
                                <h3 className="font-bold text-base mb-1">{restaurant.name}</h3>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-gray-500">{restaurant.cuisine}</span>
                                    <span className="text-xs font-semibold text-[#FF8C42]">{restaurant.rating} ★</span>
                                </div>
                                <button
                                    onClick={() => onRestaurantClick(restaurant)}
                                    className="bg-[#FF8C42] hover:bg-[#ff6b1a] text-white text-sm px-3 py-2 rounded-lg w-full transition-colors"
                                >
                                    Details ansehen
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
