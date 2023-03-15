import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { Button } from "reactstrap";
import { Map, Marker } from "pigeon-maps"
import { Chart, Bars, Layer} from "rumble-charts";


function setMapId(id,token) {
    const [mapIdLoading, setMapIdLoading] = useState(true);
    const [mapId, setMapId] = useState([]);
    const [mapIdError, setMapIdError] = useState(null);
    const API_URL = "http://sefdb02.qut.edu.au:3001";
    let headers = new Headers();
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')
    if (token != '') {
        fetch(API_URL, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }) 
    
   
    useEffect(
        () => {
            fetch(`${API_URL}/volcano/${id}`, {
                method: 'GET',
                headers: headers
            })
                .then((res) => res.json())
                .then((data) => {
                    setMapId(data)
                    console.log(data)
                }).catch((event) => {
                    setMapIdError(event);
                }).finally(() => {
                    setMapIdLoading(false);
                })
        },
        [API_URL]
    )

    return {
        mapIdLoading,
        mapId,
    mapIdError
                }}
                else {
                    alert("You are not authorised to view this resource.")} 
            
            };
        
    function VolcanoMap(props){
        const navigate = useNavigate();
        const id = props.MapId;
        const token = props.token;
        let { mapIdLoading, mapId} = setMapId(id,token);
        return (
               
                    <div>
                        <div className="container" >
                              <p >Volcano:{mapId.name}</p>
                            <p >Country: {mapId.country}</p>
                            <p >Region: {mapId.region}</p>
                            <p >Subregion: {mapId.subregion}</p>
                            <p >Last Eruption: {mapId.last_eruption}</p>
                            <p >Summit: {mapId.summit}</p>
                            <p >Elevation:{mapId.elevation}</p>
                    </div>
                    {mapIdLoading === true ?
                        console.log('loading')
 :
                        <div>
                             <Map height={300} width={600} defaultCenter={[parseFloat(mapId.latitude), parseFloat(mapId.longitude)]} defaultZoom={7}>
                            <Marker width={50} anchor={[parseFloat(mapId.latitude), parseFloat(mapId.longitude)]} />
                        </Map>
                            <Chart
                                height={300}
                                minY={0}
                                series={[
                                    {
                                        label: "",
                                        data: [
                                            3,
    
                                        ]
                                    },
                                    {
                                        label: "",
                                        data: [
                                            5,
    
                                        ]
                                    },
                                    {
                                        label: "",
                                        data: [
                                            9,
    
                                        ]
                                    }
                                ]}
                                width={600}
                            >
                                <Layer width='100%' height='70%' position='bottom center'>
                              
                                    <Bars innerPadding='0.02%' />
                                </Layer>
                            </Chart>
                        </div>}
                        <Button
        color="info"
        size="sm"
        className="mt-3"
        onClick={() => navigate("/")}
      >
        Back
      </Button>
                </div>
    
           
        )}
        export default VolcanoMap;              
