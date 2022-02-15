import { useEffect, useState } from "react";
import { ThirdStepStyle } from "./ThirdStep.Style";
import CircularProgress from "@mui/material/CircularProgress";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click(e) {
            map.locate();
            console.log(e.latlng);
            setPosition(e.latlng);
        },
    });

    return position === null ? null : <Marker position={position}></Marker>;
}

const ThirdStep = () => {
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(false);
    const [coords, setCoords] = useState([0, 0]);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords([
                    position.coords.latitude,
                    position.coords.longitude,
                ]);
                setLoad(false);
            },
            () => {
                setError(true);
                setLoad(false);
            }
        );
    }, [navigator.geolocation]);
    return (
        <ThirdStepStyle>
            {!load ? (
                !error ? (
                    <MapContainer
                        className="map-container"
                        center={coords}
                        zoom={13}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={coords}></Marker>
                    </MapContainer>
                ) : (
                    <MapContainer
                        className="map-container"
                        center={{ lat: 51.505, lng: -0.09 }}
                        zoom={13}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationMarker />
                    </MapContainer>
                )
            ) : (
                <CircularProgress />
            )}
        </ThirdStepStyle>
    );
};

export default ThirdStep;
