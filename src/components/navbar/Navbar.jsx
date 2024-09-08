import React, { useEffect, useRef, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuRef = useRef(null);
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
    window.scrollY > 500 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = {
    id: 1,
    username: "Shahzaib",
    isSeller: true,
  };

  // Toggle body scroll lock when sidebar is open or closed
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
              ></input>
              <button>
                <img src="/img/search.png"></img>
              </button>
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

            {!currentUser?.isSeller && <span>Become a seller </span>}

            {currentUser ? (
              <div className="user">
                <img
                  onClick={() => setOpen(!open)}
                  src="/img/bannerr/men2.png"
                ></img>

                {open && (
                  <div className="options">
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
                    <Link className="link" to="/">
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <span>Sign in </span>
                <button>Join </button>{" "}
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
