import React, { useState } from 'react';
import * as locations from './locations.json'
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {MdCancel, MdChat, MdCheck} from 'react-icons/md';
import {FiZap} from 'react-icons/fi';
import { AiFillEnvironment  } from "react-icons/ai";
import MetaTags from 'react-meta-tags';


export default function App() {
  const [viewport, setViewport] = useState({
    longitude: -72.475380,
    latitude: 40.991320,
    zoom: 7.5,
    pitch: 50,
    bearing: 7,
    height: "200vh",
    width: "250vw"
})
  const REACT_APP_MAPBOX_ACCESS_TOKEN='pk.eyJ1IjoiY2Frc293YWgiLCJhIjoiY2s4cjRldHVuMGF5NTNlcTg0amlxMXN6MyJ9.iVWKcF7qB7DlL9hQ4OfYzg'
  const [selectedIcon, setSelectedIcon ] = useState(null);
return (
<div>
          <MetaTags>
            <title>Corona in New York</title>
            <meta name="Description" content="This website contains a map showing corona cases and deaths in the most affected parts of New York" />
            <meta property="og:title" content="Number of cases and deaths in New York's most affected areas due to Corona" />
            <meta property="og:image" content="../myicon.png" />
          </MetaTags>
    <ReactMapGL
    mapStyle='mapbox://styles/caksowah/ck8rfq1br0n5k1iqopziqy4me'
     {...viewport}
     mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
     onViewportChange={viewport => {
     setViewport(viewport)
     }}>

    {locations.places.map((e) =>
      {
        return <Marker key={e.name} latitude={e.latitude} longitude={e.longitude}>
          
            <AiFillEnvironment size={25} color="orange" onClick={ev=>{ev.preventDefault();
              setSelectedIcon(e)}}/>
          
        </Marker>;
      })}
      {
        selectedIcon ? (
          <Popup 
            color='grey'
            latitude={selectedIcon.latitude}
            longitude={selectedIcon.longitude}
            onClose={()=>{ 
              setSelectedIcon(null);
            }}>
              <div>
                <h3>
                  {selectedIcon.name}
                </h3>
                <p>
                  cases: {selectedIcon.cases}
                </p>
                <p>
                  deaths: {selectedIcon.deaths}
                </p>
              </div>
          </Popup>

        ): null
      }
    </ReactMapGL>
    </div>
);
}