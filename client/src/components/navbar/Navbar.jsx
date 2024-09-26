import React, { useEffect, useRef, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import newRequest from "../../utils/newrequest";
import GetColor from "../GetColor";
import Notifications from "../Notifications/Notifications";
import getCurrentUser from "../../utils/getCurrentUser";
import { useQuery } from "@tanstack/react-query";
import SearchSuggestions from "../searchSuggestions/SearchSuggestions";
const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [unRead, setUnRead] = useState(false);
  const menuRef = useRef(null);
  const { pathname } = useLocation();
  const { isLoading, error, data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => newRequest.get(`/notifications`).then((res) => res.data),
    refetchInterval: 5000, // Poll every 5 seconds
  });

  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -200, behavior: "smooth" }); // Adjust the value as needed
    }
  };

  // Function to scroll the menu to the right
  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 200, behavior: "smooth" }); // Adjust the value as needed
    }
  };

  const isActive = () => {
    if (pathname === "/") {
      window.scrollY > 500 ? setActive(true) : setActive(false);
    } else {
      setActive(true);
    }
  };
  useEffect(() => {
    if (pathname === "/") {
      window.addEventListener("scroll", isActive);
    } else {
      setActive(true);
    }

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, [pathname]);

  useEffect(() => {
    setUnRead(data?.filter((item) => !item?.isRead)?.length > 0);
  }, [data]);
  useEffect(() => {
    if (openMenu) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup when component is unmounted
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [openMenu]);
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
    if (suggestion) {
      setSearch(suggestion);

      // Convert the suggestion to a URL-friendly query (e.g., "React Native" -> "react&native")
      const searchQuery = suggestion.split(" ").join("&").toLowerCase();

      // Navigate to the gigs page with the proper query
      navigate(`/gigs?search=${searchQuery}`);

      // Optionally close the suggestion box
      setSuggestions([]);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="container">
          {openMenu ? (
            <IoCloseOutline
              className="menuIcon close"
              onClick={() => setOpenMenu(!openMenu)}
            ></IoCloseOutline>
          ) : (
            <TbMenuDeep
              onClick={() => setOpenMenu(!openMenu)}
              className="menuIcon"
            ></TbMenuDeep>
          )}
          <div className="logo_search">
            <Link to="/" className="link">
              <div className="logo">
                <span className="text">fiverr</span>
                <span className="dot">.</span>
              </div>
            </Link>

            <div className={active ? "search active" : "search"}>
              <input
                type="text"
                placeholder="what service are you looking for today? "
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              ></input>
              <button onClick={handleSearch}>
                <img src="/img/search.png"></img>
              </button>

              {suggestions.length > 0 && (
                <SearchSuggestions
                  suggestions={suggestions}
                  onSuggestionClick={handleSuggestionClick}
                />
              )}
            </div>
          </div>

          <div className="links">
            <span>
              {" "}
              Fiverr Pro <img src="/img/down.png" alt="down icon"></img>
            </span>
            <span>
              Explore <img src="/img/down.png" alt="down icon"></img>
            </span>
            <span>
              <img src="/img/language.png" alt="language icon"></img> English
            </span>

            {currentUser && (
              <div className="notificationIcons">
                <span
                  style={{ position: "relative" }}
                  onClick={() => {
                    setOpen(false);
                    setNotification(!notification);
                  }}
                >
                  <IoMdNotificationsOutline size={25} />

                  {unRead && <div className="unRead"></div>}
                </span>
                <Link
                  to="/my_list"
                  onClick={() => setNotification(false)}
                  className="link"
                >
                  <span>
                    <FaRegHeart size={20} />
                  </span>
                </Link>

                {notification && (
                  <Notifications
                    data={data}
                    setNotification={setNotification}
                    notification={notification}
                  ></Notifications>
                )}
              </div>
            )}

            {!currentUser?.isSeller && (
              <Link to="/register" className="link">
                <span>Become a seller </span>
              </Link>
            )}

            {currentUser ? (
              <div className="user">
                {currentUser?.img ? (
                  <img
                    onClick={() => {
                      setOpen(!open);
                      setNotification(false);
                    }}
                    src={currentUser?.img}
                  ></img>
                ) : (
                  <p
                    onClick={() => {
                      setOpen(!open);
                      setNotification(false);
                    }}
                    style={{ backgroundColor: GetColor(currentUser?.username) }}
                  >
                    {currentUser?.username.charAt()}
                  </p>
                )}

                {open && (
                  <div className="options">
                    <Link
                      to={`/profile`}
                      className="link"
                      style={{ fontWeight: "bold" }}
                    >
                      {" "}
                      {currentUser?.username}
                    </Link>
                    {currentUser.isSeller && (
                      <>
                        <Link
                          onClick={() => setOpen(false)}
                          className="link"
                          to="/mygigs"
                        >
                          Gigs
                        </Link>
                        <Link
                          onClick={() => setOpen(false)}
                          className="link"
                          to="/add"
                        >
                          Add New Gig
                        </Link>
                      </>
                    )}
                    <Link
                      onClick={() => setOpen(false)}
                      className="link"
                      to="/profile"
                    >
                      Profile
                    </Link>
                    <Link
                      onClick={() => setOpen(false)}
                      className="link"
                      to="/orders"
                    >
                      Orders
                    </Link>
                    <Link
                      onClick={() => setOpen(false)}
                      className="link"
                      to="/messages"
                    >
                      Messages
                    </Link>
                    <Link className="link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="link">
                  {" "}
                  <span>Sign in </span>
                </Link>
                <Link to="/register" className="link">
                  <button>Join </button>{" "}
                </Link>
              </>
            )}
          </div>
        </div>
        <hr></hr>
        {active && (
          <>
            <div className="bottomMenu">
              <img src="/img/prev.png" alt="prev" onClick={scrollLeft} />
              <img src="/img/next.png" alt="next" onClick={scrollRight} />
              <div className="menu" ref={menuRef}>
                <Link className="link menuLink" to="/">
                  Graphics & Design
                </Link>
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>{" "}
                <Link className="link menuLink" to="/">
                  Writing & Translation
                </Link>
                <Link className="link menuLink" to="/">
                  AI Services
                </Link>
                <Link className="link menuLink" to="/">
                  Digital Marketing
                </Link>
                <Link className="link menuLink" to="/">
                  Music & Audio
                </Link>
                <Link className="link menuLink" to="/">
                  Programming & Tech
                </Link>
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>{" "}
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>{" "}
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>{" "}
                <Link className="link menuLink" to="/">
                  Business
                </Link>
                <Link className="link menuLink" to="/">
                  Lifestyle
                </Link>
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>{" "}
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>{" "}
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>{" "}
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>{" "}
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>{" "}
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>{" "}
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>{" "}
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>
              </div>
            </div>
            <hr></hr>
          </>
        )}
      </div>

      {/* ---------- Sidebar code -------- */}

      <div className={`sidebar ${openMenu ? "active" : ""} `}>
        {currentUser ? (
          <div className="user">
            <img src="/img/bannerr/men2.png"></img>{" "}
            <span>{currentUser?.username} </span>
          </div>
        ) : (
          <button>Join Fiverr</button>
        )}
        <div className="main_div">
          <div className="top">
            <div
              className="sidelink"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Browse categories <img src="/img/down.png" alt="down icon" />
            </div>
            {dropdownOpen && (
              <div className="dropdown">
                <Link className="link menuLink" to="/">
                  Graphics & Design
                </Link>
                <Link className="link menuLink" to="/">
                  Video & Animation
                </Link>
                <Link className="link menuLink" to="/">
                  Writing & Translation
                </Link>
                <Link className="link menuLink" to="/">
                  AI Services
                </Link>
                <Link className="link menuLink" to="/">
                  Digital Marketing
                </Link>
                <Link className="link menuLink" to="/">
                  Music & Audio
                </Link>
                <Link className="link menuLink" to="/">
                  Programming & Tech
                </Link>
                <Link className="link menuLink" to="/">
                  Business
                </Link>
                <Link className="link menuLink" to="/">
                  Lifestyle
                </Link>
              </div>
            )}
            <div className="sidelink">
              Explore <img src="/img/down.png" alt="down"></img>
            </div>{" "}
            <div className="sidelink">
              Fiverr Pro <img src="/img/down.png" alt="down"></img>
            </div>
          </div>

          <div className="bottom">
            <h2>General</h2>
            <div>
              <div className="sidelink">Home</div>
              <div className="sidelink">
                English <img src="/img/down.png"></img>
              </div>
              <div className="sidelink">
                PKR <img src="/img/down.png"></img>
              </div>
              <div className="sidelink">Open App</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
