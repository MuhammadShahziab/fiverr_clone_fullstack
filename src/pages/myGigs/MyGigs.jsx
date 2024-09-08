import React from "react";
import "./MyGigs.scss";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
const MyGigs = () => {
  return (
    <div className="mygigs layout">
      <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          <Link to="/add" className="link ">
            <button>Add New Gig</button>
          </Link>
        </div>

        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>sales</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <img
                className="gigImg"
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/364895902/original/92e70a5a6865658fb43e832cc196d842adaf2591/do-project-management-and-ensure-delivery.jpeg"
                alt=""
              />
            </td>
            <td> Gig1</td>
            <td>13800</td>
            <td>122</td>
            <td>
              <img src="/img/delete.png" alt="delete" className="trash" />
            </td>
          </tr>
        </table>
      </div>
      <Pagination totalPages={6} currentPage={1} />
    </div>
  );
};

export default MyGigs;
