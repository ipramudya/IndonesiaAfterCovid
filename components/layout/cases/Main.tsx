import { Markers, Popup } from "components/common";
import { useCases } from "context";
import { FunctionComponent, Ref, useEffect, useRef, useState } from "react";
import Map, { MapRef } from "react-map-gl";
import { ListDataEntity } from "types/provinces-cases.types";

interface MainProps {
    provinces: ListDataEntity[] | null | undefined;
}

const defaultCoordinate = {
    longitude: 117.9188324776498,
    latitude: -2.1851528432548974,
    zoom: 4.4,
};

const Main: FunctionComponent<MainProps> = ({ provinces }) => {
    const mapRef: Ref<MapRef> = useRef(null);
    const {
        state: { exploredProvince },
    } = useCases();

    const [Viewport, setViewport] = useState(defaultCoordinate);
    const latitude = exploredProvince.province?.lokasi.lat as number;
    const longitude = exploredProvince.province?.lokasi.lon as number;

    useEffect(() => {
        if (exploredProvince.isEmpty || !exploredProvince.province?.lokasi) {
            mapRef.current?.resize();
            return setViewport(defaultCoordinate);
        } else {
            mapRef.current?.resize();
            return setViewport({ latitude, longitude, zoom: 9 });
        }
    }, [exploredProvince.isEmpty, exploredProvince.province?.lokasi, latitude, longitude]);

    return (
        <Map
            {...Viewport}
            onMove={(event) => {
                setViewport(event.viewState);
            }}
            ref={mapRef}
            mapStyle="mapbox://styles/ipramudya0/cl0k1g3f6000315p4q5f1grm2/draft"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        >
            <Markers provinces={provinces} />
            {!exploredProvince.isEmpty && <Popup />}
        </Map>
    );
};

export default Main;
