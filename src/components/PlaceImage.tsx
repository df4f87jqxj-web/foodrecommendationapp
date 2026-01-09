import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

interface PlaceImageProps {
    restaurantName: string;
    className?: string;
    fallbackImage: string;
}

export function PlaceImage({ restaurantName, className, fallbackImage }: PlaceImageProps) {
    const placesLib = useMapsLibrary('places');
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!placesLib) return;

        const service = new placesLib.PlacesService(document.createElement('div'));

        const request = {
            query: `${restaurantName} Berlin`,
            fields: ['photos']
        };

        service.findPlaceFromQuery(request, (results, status) => {
            if (status === placesLib.PlacesServiceStatus.OK && results && results[0].photos && results[0].photos.length > 0) {
                setPhotoUrl(results[0].photos[0].getUrl({ maxWidth: 800 }));
            }
        });
    }, [placesLib, restaurantName]);

    return (
        <img
            src={photoUrl || fallbackImage}
            alt={restaurantName}
            className={className}
        />
    );
}
