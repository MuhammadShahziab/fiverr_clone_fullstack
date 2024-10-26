import React, { useReducer, useState } from "react";
import "./Add.scss";
import { ClipLoader } from "react-spinners";
import { gigReducer, initialState } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import newRequest from "../../utils/newrequest";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RxCross2 } from "react-icons/rx";

const Add = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [state, dispatch] = useReducer(gigReducer, initialState);

  console.log(state, "state");
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onMutate: () => {
      // Triggered when mutation starts
      setLoading(true); // Start loader when mutation starts
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      setLoading(false);
      navigate("/mygigs");
    },
    onError: (error) => {
      console.log("Error:", error);
      setLoading(false); // Stop loader when mutation fails
    },
  });

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleAddFeature = () => {
    dispatch({ type: "ADD_FEATURE" });
  };

  const handleUpdateFeature = (index, value) => {
    dispatch({
      type: "UPDATE_FEATURE",
      payload: { index, value },
    });
  };

  const handleRemoveFeature = (index) => {
    dispatch({
      type: "REMOVE_FEATURES",
      payload: index,
    });
  };

  const handleImages = async () => {
    setUploading(true);
    try {
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({
        type: "ADD_IMAGES",
        payload: { images },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && tagInput) {
      dispatch({ type: "ADD_TAGS", payload: tagInput });
      setTagInput("");
    }
  };
  const handleRemoveTag = (index) => {
    dispatch({
      type: "REMOVE_TAGS",
      payload: index,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(state);
  };

  return (
    <div className="add layout">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="section">
          <div className="input_div">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="e.g. I will do something I'm really good at"
              id=""
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              onChange={handleChange}
              placeholder="e.g. Logo Design, Web Development"
              id=""
            />
          </div>{" "}
          <div className="input_div">
            <label htmlFor="">Category</label>
            <select name="cat" id="" onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="SEO">SEO</option>
              <option value="Graphic Designing">Graphic Designing</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Website Development">Website Development</option>
              <option value="Product Photography">Product Photography</option>
              <option value="Data Science">Data Science</option>{" "}
              <option value="E-commerece Maketing">E-commerece Maketing</option>
              <option value="Product Photography">Product Photography</option>
            </select>
          </div>{" "}
          <div className="input_div ">
            <label htmlFor="">Upload Images </label>

            <div className="img_row">
              <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
              />
              <button onClick={handleImages}>
                {" "}
                {uploading ? (
                  <>
                    <ClipLoader color="white" size={17} />
                    Uploading...{" "}
                  </>
                ) : (
                  "Upload"
                )}{" "}
              </button>
            </div>
          </div>{" "}
          <div className="input_div">
            <label htmlFor="">delivery Time (eg. 3 days)</label>
            <input
              type="number"
              min={1}
              placeholder="Delivery time in days"
              onChange={handleChange}
              name="deliveryTime"
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Revision Number </label>
            <input
              type="number"
              placeholder="eg.4"
              min={1}
              name="revisionNumber"
              onChange={handleChange}
            />
          </div>{" "}
          <div className="input_div">
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              rows={5}
              cols={30}
              placeholder="Describe your service in detail"
              onChange={handleChange}
              id=""
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Short Description</label>
            <textarea
              cols={30}
              rows={5}
              name="shortDesc"
              placeholder="Short description of your service"
              id=""
              onChange={handleChange}
            />
          </div>{" "}
          <div className="input_div">
            <label htmlFor="">Price </label>
            <input
              type="number"
              placeholder="Enter your price"
              min={100}
              name="price"
              onChange={handleChange}
            />
          </div>{" "}
          <div className="input_div">
            <label htmlFor="">Tags </label>
            <input
              type="text"
              placeholder="Enter your Tags"
              name="tags"
              value={tagInput}
              onKeyDown={handleKeyPress}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <div className="tags">
              {state?.tags.map((tag, index) => (
                <div className="tag" key={index}>
                  <span>{tag}</span>
                  <span
                    className="delete"
                    onClick={() => handleRemoveTag(index)}
                  >
                    <RxCross2></RxCross2>{" "}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="input_div ">
            <label htmlFor="">Add Features</label>
            {state?.features.map((feature, index) => (
              <div className="point">
                <input
                  key={index}
                  type="text"
                  name="features"
                  value={feature}
                  onChange={(e) => handleUpdateFeature(index, e.target.value)}
                  placeholder="Add Feature"
                  id=""
                />
                <div className="controls">
                  <span onClick={handleAddFeature} className="addF">
                    +
                  </span>
                  <span
                    onClick={() => handleRemoveFeature(index)}
                    className="removeF"
                  >
                    -
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="button" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <ClipLoader color="white" size={19}></ClipLoader> Processing...{" "}
            </>
          ) : (
            "Create"
          )}{" "}
        </button>
      </div>
    </div>
  );
};
export default Add;
