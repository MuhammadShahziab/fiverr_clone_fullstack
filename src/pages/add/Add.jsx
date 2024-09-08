import React, { useState } from "react";
import "./Add.scss";
const Add = () => {
  const [featurePoint, setfeaturePoint] = useState([{ point: "" }]);

  const addPoint = () => {
    setfeaturePoint((prevPoint) => [...prevPoint, { point: "" }]);
  };
  const removePoint = (value) => {
    if (featurePoint.length === 1) {
      return;
    }

    setfeaturePoint((prevPoint) => {
      return prevPoint.filter((i, index) => index !== value);
    });
  };
  const handleChange = (index, value) => {
    setfeaturePoint((prev) => {
      let data = [...prev];
      data[index] = { point: value };
      return data;
    });
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
              placeholder="React Developer"
              id=""
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="title"
              placeholder="eg. one-page web design"
              id=""
            />
          </div>{" "}
          <div className="input_div">
            <label htmlFor="">Category</label>
            <select name="cat" id="">
              <option value="weddesign">Digital Marketing</option>
              <option value="weddesign">SEO</option>
              <option value="weddesign">Graphic Designing</option>
              <option value="weddesign">Video Editing</option>
              <option value="weddesign">Web Developer</option>
            </select>
          </div>{" "}
          <div className="input_div img">
            <label htmlFor="">Upload Images </label>
            <input type="file" multiple />
          </div>{" "}
          <div className="input_div">
            <label htmlFor="">delivery Time (eg. 3 days)</label>
            <input
              type="number"
              min={1}
              placeholder=" eg.3 days"
              name="title"
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Revision Number (eg. 3 days)</label>
            <input type="number" min={1} name="title" />
          </div>{" "}
          <div className="input_div">
            <label htmlFor="">Description</label>
            <textarea
              name="description"
              rows={5}
              cols={30}
              placeholder="Brief descrition to introduce your service to client"
              id=""
            />
          </div>
          <div className="input_div">
            <label htmlFor="">Short Description</label>
            <textarea
              cols={30}
              rows={5}
              name=""
              placeholder="Short description of your service"
              id=""
            />
          </div>{" "}
          <div className="input_div ">
            <label htmlFor="">Add Features</label>
            {featurePoint?.map((item, index) => (
              <div className="point">
                <input
                  key={index}
                  type="text"
                  name="title"
                  value={item?.point}
                  placeholder="Add point"
                  onChange={(e) => handleChange(index, e.target.value)}
                  id=""
                />
                <span onClick={addPoint} className="add">
                  +
                </span>
                <span onClick={() => removePoint(index)} className="remove">
                  -
                </span>
              </div>
            ))}
            {/* <input type="text" name="title" placeholder="Add point" id="" />
            <input type="text" name="title" placeholder="Add point" id="" />
            <input type="text" name="title" placeholder="Add point" id="" /> */}
          </div>
          <div className="input_div">
            <label htmlFor="">Price </label>
            <input
              type="number"
              placeholder="eg. PKR 3000"
              min={1}
              name="title"
            />
          </div>{" "}
        </div>
        <div className="button">
          <button>Create</button>
        </div>
      </div>
    </div>
  );
};

export default Add;
