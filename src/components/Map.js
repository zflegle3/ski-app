import { GoogleMap, useLoadScript, MarkerF, getBounds, Marker } from "@react-google-maps/api"
import { useMemo } from "react";
import { useState, createRef } from "react";
import { ReactComponent as Greaticon } from '../svgs/bestIcon.svg';
import IconPng from "../svgs/bestIcon.png";
// import LocationMarker from "./LocationMarker";

function Map({resorts, lat, lng}) {
    //props.resorts
    const myMap = createRef();
    //props.lat
    //props.lng
    // const { isLoaded } = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API})
    // const [lng, setLng] = useState(false);
    // const [lat, setLat] = useState(false);




    const handleClick = () => {
        console.log("SHREEEED IT DUUUUUUDE!!!")
    }




    const svgMarker = {
        path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        // anchor: new Point(0, 20),
      };


    console.log(Array.isArray(resorts));
    console.log(resorts);
    const markers = resorts.map((resort) => {
        return <Marker key={resort.refId} onClick={handleClick} position={{lat: Number(resort.location.lat), lng: Number(resort.location.lng,), optimized: true, icon: svgMarker }}/>
    });

    if (lng && lat) {
        console.log("loaded");
        const defaultLat = 39.7392;
        const defaultLng = -104.9903;

        return (

            <div className="google-map">
                <GoogleMap
                    ref={myMap} 
                    zoom={8} 
                    center={{lat: lat, lng: lng}} 
                    mapContainerClassName="map-container"
                    // onBoundsChanged={map => onMapLoad(map)}
                    // onLoad = {onMapLoad}
                >
                    {/* <LocationMarker lat={defaultLat} lng={defaultLng} /> */}
                    {markers}
                    <Marker position={{lat: lat, lng: lng}} />
                </GoogleMap>
            </div>
        );
    } else {
        console.log("loading");

        return (
            <div className="google-map">
                Loading Map
            </div>
        );

    }


  }
  
  export default Map;