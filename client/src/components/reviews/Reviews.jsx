import React, { useState } from "react";
import ReviewCard from "../reviewCard/ReviewCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newrequest";
import "./Reviews.scss";
import toast from "react-hot-toast";
const Reviews = ({ gigId, gigDeliveryTime, gigPrice }) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const [visibleReview, setVisibleReview] = useState(4); // Initialize as a number

  const handleShowMoreReview = () => {
    setVisibleReview((prev) => prev + 4); // Increment numerically
  };

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },

    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
    onError: (error) => {
      console.log(error);
      toast.error(`${error.response?.data || "Unknown error"}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const desc = e.target[0].value;
    const star = e.target[1].value;
    if (!desc) {
      return toast.error("Please a  dd your Opinion! ");
    }

    mutation.mutate({ desc, star, gigId });
  };

  return (
    <div className="reviews">
      <h2>What people loved about this freelancer </h2>

      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong!"
        : data.length === 0
        ? "No Reviews..."
        : data
            ?.slice(0, visibleReview) // Slicing will now work correctly
            .map((item) => (
              <ReviewCard
                key={item._id}
                gigDeliveryTime={gigDeliveryTime}
                gigPrice={gigPrice}
                item={item}
              />
            ))}
      {visibleReview < data?.length && (
        <button className="reviewBtn" onClick={handleShowMoreReview}>
          Show more Review
        </button>
      )}

      <div className="add">
        <h3>Add a Review </h3>

        <form className="addform" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <button className="addreviewbtn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
