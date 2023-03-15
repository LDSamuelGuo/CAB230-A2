import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "../App.css";


function VolcanoData() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();
  const [isReady, useIsReady] = useState(false);
  const [populatedWithin, setPopulatedWithin] = useState();
  const [rowData, setRowData] = useState([]);
  
  const API_URL =
    "http://sefdb02.qut.edu.au:3001";
  const columns = [
    {
      headerName: "Name",
      field: "name",
      width: "270px",
      sortable: true,
      filter: "agTextColumnFilter"
    },
    {
      headerName: "Region",
      field: "region",
      width: "270px",
      sortable: true,
      filter: "agNumberColumnFilter"
    },
    {
      headerName: "Subregion",
      field: "subregion",
      width: "270px",
      sortable: true,
      filter: "agNumberColumnFilter"
    },
    
  ];
  useEffect(() => {
    let url = `${API_URL}/volcanoes?`;
    if (search!== undefined) url += `country=${search}`;
    if (populatedWithin !== undefined) url += `&populatedWithin=${populatedWithin}km`;
        fetch(url)
      .then((res) => res.json())
      .then((works) =>
        works.map((work) => {
          return {
            id: work.id,
            name: work.name,
            region: work.region,
            subregion: work.subregion,
          
          };
        })
      )
      .then((works) => setRowData(works))
      .catch((error) => {
        console.log("There was an error: ", error);
      });
      fetch(API_URL + `/countries`)
      .then((res) => {
        console.log(res.status + " - " + res.statusText);
        if (res.status > 300)
          alert("Error: " + res.status + " - " + res.statusText);
        return res.json();
      })
      .then((countries) =>
        countries.map((country) => {
          return country;
        })
      )
    
      .catch((error) => {
        console.log("There was a network error!", error);
      });
  }, [search, populatedWithin]);


  function useDCallback(callback) {
    const ref = useRef();
    ref.current = callback;
    return useCallback((...args) => ref.current.apply(this, args), []);
  }

 
  const OnGridReady = (params) => {
    useIsReady(true);
  };

  
  const getDisplayedRowData = useDCallback((params) => {
    if (isReady) {
      let toUpdate = [];      
   
      setDisplayedData(toUpdate);
    }
  });
   

 

  return (
<div className="container">
    
    Populated with in:{" "}
      <select value={populatedWithin} onChange={((event) => setPopulatedWithin(event.target.value))}>
        <option value="">*</option>
        <option value="5">5km</option>
        <option value="10">10km</option>
        <option value="30">30km</option>
        <option value="100">100km</option>
      </select>
      <div className="c1">
     Country and region:{" "}
      <select value={search} onChange={((event) => setSearch(event.target.value))}>
        <option value=''>*</option>
        <option value="Algeria">Algeria</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Argentina">Argentina</option>
        <option value="Armenia">Armenia</option>
        <option value="Australia">Australia</option>
        <option value="Bolivia">Bolivia</option>
        <option value="Burma (Myanmar)">Burma (Myanmar)</option>
        <option value="Cameroon">Cameroon</option>
        <option value="Canada">Canada</option>
        <option value="Cape Verde">Cape Verde</option>
        <option value="Chad">Chad</option>
        <option value="Chile">Chile</option>
        <option value="China">China</option>
        <option value="Colombia">Colombia</option>
        <option value="Comoros">Comoros</option>
        <option value="Costa Rica">Costa Rica</option>
        <option value="Djibouti">Djibouti</option>
        <option value="Dominica">Dominica</option>
        <option value="DR Congo">DR Congo</option>
        <option value="Ecuador">Ecuador</option>
        <option value="El Salvador">El Salvador</option>
        <option value="Equatorial Guinea">Equatorial Guinea</option>
        <option value="Eritrea">Eritrea</option>
        <option value="Ethiopia">Ethiopia</option>
        <option value="Fiji">Fiji</option>
        <option value="France">France</option>
        <option value="Georgia">Georgia</option>
        <option value="Germany">Germany</option>
        <option value="Greece">Greece</option>
        <option value="Grenada">Grenada</option>
        <option value="Guatemala">Guatemala</option>
        <option value="Honduras">Honduras</option>
        <option value="Iceland">Iceland</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Iran">Iran</option>
        <option value="Italy">Italy</option>
        <option value="Japan">Japan</option>
        <option value="Kenya">Kenya</option>
        <option value="Madagascar">Madagascar</option>
        <option value="Mexico">Mexico</option>
        <option value="Mongolia">Mongolia</option>
        <option value="Netherlands">Netherlands</option>
        <option value="New Zealand">New Zealand</option>
        <option value="Nicaragua">Nicaragua</option>
        <option value="Niger">Niger</option>
        <option value="North Korea">North Korea</option>
        <option value="Norway">Norway</option>
        <option value="Panama">Panama</option>
        <option value="Papua New Guinea">Papua New Guinea</option>
        <option value="Peru">Peru</option>
        <option value="Philippines">Philippines</option>
        <option value="Portugal">Portugal</option>
        <option value="Russia">Russia</option>
        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
        <option value="Saint Lucia">Saint Lucia</option>
        <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
        <option value="Samoa">Samoa</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Solomon Islands">Solomon Islands</option>
        <option value="South Africa">South Africa</option>
        <option value="South Korea">South Korea</option>
        <option value="Spain">Spain</option>
        <option value="Sudan">Sudan</option>
        <option value="Syria">Syria</option>
        <option value="Taiwan">Taiwan</option>
        <option value="Tanzania">Tanzania</option>
        <option value="Tonga">Tonga</option>
        <option value="Turkey">Turkey</option>
        <option value="Uganda">Uganda</option>
        <option value="Undersea">Undersea</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="United States">United States</option>
        <option value="Vanuatu">Vanuatu</option>
        <option value="Vietnam">Vietnam</option>
        <option value="Yemen">Yemen</option>
      </select>
      </div>
      <div
        className="ag-theme-alpine-dark ag-grid"
        style={{
          height: "400px",
          width: "800px"
        }}
      >
        <AgGridReact  
          OnGridReady={OnGridReady}
          rowData={rowData}
          onPaginationChanged={getDisplayedRowData}
          pagination={true}  
          paginationPageSize={7}
          columnDefs={columns}         
          onRowClicked={(row) =>   navigate(`/MapId?id=${row.data.id}`) }
        
        />
      </div>
     
     
    </div>
  );
}
export default VolcanoData