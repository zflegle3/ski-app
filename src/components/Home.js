import axios from 'axios';
import { useEffect, useState, useMemo } from "react";
import { useLoadScript} from "@react-google-maps/api";
//Components
import Map from "./map/Map.js"
import SidePanel from "./results-panel/SidePanel.js";
import Sheet from 'react-modal-sheet';
import ModalContainer from './modals/ModalContainer';
import LoadingSpinner from "./LoadingSpinner.js";
//Images
import { FaLocationArrow } from 'react-icons/fa';


function Home({profileImage}) {
    const [ libraries ] = useState(['places']);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
        libraries,
    });
    const [resorts, setResorts] = useState(false);
    const [resortsSorted, setResortsSorted] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [sort, setSort] = useState(
        {
            title:"A to Z",
            titleLong:"Alphabetical A to Z",
            id: 0
        },
    );
    const center  = useMemo(() => getLocation(), []);
    const [lng, setLng] = useState(false);
    const [lat, setLat] = useState(false);


    function showPosition(position) {
        //if user accepts geolocation, sets lat/lng to user location
        setLng(Number(position.coords.longitude));
        setLat(Number(position.coords.latitude));
    }
    
    function defaultPosition(err) {
        //if user declines geolocation, sets lat/lng to Denver, CO
        console.log(err);
        console.log("Geolocation is not supported by this browser.")
        setLng(-104.9903);
        setLat(39.7392);
    }

    function getLocation() {
        //attempts to pull users location and set as lat/lng states
        //if err, sets default as denver lat/lng
        navigator.geolocation.getCurrentPosition(showPosition, defaultPosition);
    }

    const getData = async () => {
        const dataIn = await axios.get("http://localhost:8080/conditions/all")
            .catch(function (err) {
                console.log("ERROR WITH MARKER DATA,", err)
            });
        setResorts(dataIn.data);
    }

    useEffect(() => {
        getData(); 
    },[]);


    if (!isLoaded || !resorts || !lat || !lng ) {
        return (
              <LoadingSpinner />
          );
    } else {
        //Desktop 
        if (window.innerWidth > 760) {
            return (
                <div className="home-dash">
                    <Map lat={lat} lng={lng} resorts={resorts} setSearchResults={setSearchResults} setSort={setSort} profileImage={profileImage}/>
                    <SidePanel searchResults={searchResults} sortData={sort} resorts={resorts} setLng={setLng} setLat={setLat}/>
                    <ModalContainer profileImage={profileImage} resorts={resorts}/>
                </div>
            );
        //Mobile 
        } else {
            return (
                <div className="home-dash">
                    {/* <SearchBar/> */}
                    <Map lat={lat} setLat={setLat} setLng={setLng} lng={lng} resorts={resorts} setSearchResults={setSearchResults} profileImage={profileImage}/>
                    <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
                        <Sheet.Container>
                            <Sheet.Header />
                            <Sheet.Content>{/* Your sheet content goes here */}</Sheet.Content>
                        </Sheet.Container>
    
                        <Sheet.Backdrop />
                    </Sheet>
                    <button onClick={() => setOpen(true)}>Open sheet</button>
                </div>
            );
        }
    }
}

export default Home;


