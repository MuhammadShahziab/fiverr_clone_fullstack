import React, { useEffect, useState } from "react";
import "./Hero.scss";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newrequest";
import SearchSuggestions from "../searchSuggestions/SearchSuggestions";
const Hero = () => {
  const [search, setSearch] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (search?.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const res = await newRequest.get(
            `/gigs/suggestions?search=${search}`
          );
          setSuggestions(res.data);
        } catch (error) {
          console.error("Error fetching suggestions", err);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [search]);
  const handleSearch = () => {
    navigate(`/gigs?search=${search}`);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    navigate(`/gigs?search=${suggestion?.cat}`);
  };

  return (
    <div className="hero">
      <div className="container">
        <div className="inner_div">
          <h1>
            Scale your professional workforce with <i>freelancers</i>
          </h1>
          <div className="search">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for any service..."
            />
            <button onClick={handleSearch} className="search_button">
              <img src="./img/search.png" alt="search icon" />
            </button>
            {suggestions.length > 0 && (
              <SearchSuggestions
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
              />
            )}
          </div>

          <div className="trusted_by">
            <span>Trusted by:</span>
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png"
              alt=""
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png"
              alt=""
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png"
              alt=""
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png"
              alt=""
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png"
              alt=""
            />
          </div>
        </div>
        <div className="images">
          <img src="./img/bannerr/girl1.jpg" className="image"></img>
          <img src="./img/bannerr/men1.png" className="image"></img>
          <img src="./img/bannerr/men5.png" className="image"></img>
          <img src="./img/bannerr/men3.jpg" className="image"></img>
        </div>
      </div>
    </div>
  );
};

export default Hero;
