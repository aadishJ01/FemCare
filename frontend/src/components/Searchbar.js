import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "@material-ui/icons";
import "./css/Searchbar.css";

function Searchbar({ postsProp, setPostsProp }) {
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");

  useEffect(() => {
		async function fetchData() {
      const url = `/api/questions/search/${debouncedText}`;
      await axios
      .get(url)
      .then((res) => {
        setPostsProp(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
		}
		if (debouncedText !== "") {
			fetchData();
		}
	}, [debouncedText]);

	useEffect(() => {
		let timer = setTimeout(() => {
			setDebouncedText(searchText);
		}, 700);
		return () => {
			clearTimeout(timer);
		};
	}, [searchText]);

  return (
    <div className="searchBar__input">
      <input
        type="text" 
        placeholder="Search questions"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Search />
    </div>
  )
}

export default Searchbar