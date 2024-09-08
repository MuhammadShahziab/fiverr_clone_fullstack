import React from "react";
import "./Orders.scss";
const Orders = () => {
  const currentUser = {
    id: 1,
    username: "Shahzaib",
    isSeller: true,
  };
  return (
    <div className="orders layout">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>

        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
            <th>Contact</th>
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
              <img src="/img/message.png" alt="delete" className="message" />
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
              <img src="/img/message.png" alt="delete" className="message" />
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
              <img src="/img/message.png" alt="delete" className="message" />
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
              <img src="/img/message.png" alt="delete" className="message" />
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
              <img src="/img/message.png" alt="delete" className="message" />
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
              <img src="/img/message.png" alt="delete" className="message" />
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
              <img src="/img/message.png" alt="delete" className="message" />
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
              <img src="/img/message.png" alt="delete" className="message" />
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
              <img src="/img/message.png" alt="delete" className="message" />
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
              <img src="/img/message.png" alt="delete" className="message" />
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
              <img src="/img/message.png" alt="delete" className="message" />
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
              <img src="/img/message.png" alt="delete" className="message" />
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
              <img src="/img/message.png" alt="delete" className="message" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Orders;
