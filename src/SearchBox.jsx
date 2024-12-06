import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const SearchBox = (props) => {
  const { selectPosition, setSelectedPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  // Effect when selectPosition is set
  React.useEffect(() => {
    if (selectPosition) {
      setSearchText(selectPosition.display_name); // Set the search text to selected position's name
      setListPlace([]); // Clear the list when a position is selected
    }
  }, [selectPosition]);

  const handleSearch = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = { method: "GET", redirect: "follow" };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);
        setListPlace(data);
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleClear = () => {
    setSearchText(""); // Clear the search box
    setListPlace([]); // Clear the list
    setSelectedPosition(null); // Clear the selected position
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            style={{ marginLeft: "10px" }}
          >
            Clear
          </Button>
        </div>
      </div>

      {!selectPosition && (
        <div>
          <List component="nav" aria-label="main mailbox folders">
            {listPlace.map((item) => {
              return (
                <div key={item?.osm_id}>
                  <ListItem
                    button
                    onClick={() => {
                      setSelectedPosition(item); // Set the selected position
                    }}
                  >
                    <ListItemText primary={item?.display_name} />
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </div>
      )}
    </div>
  );
}; 

export default SearchBox;
