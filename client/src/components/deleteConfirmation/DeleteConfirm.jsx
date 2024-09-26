import React from "react";
import "./DeleteConfirm.scss";
import { RxCross2 } from "react-icons/rx";
const DeleteConfirm = ({
  setDeletePopup,
  id,
  handleDelete,
  setOpenDropdown,
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-button" onClick={() => setDeletePopup(false)}>
          <RxCross2 />
        </button>
        <h1>Are You Sure You Want To Delete This ? </h1>
        <p>
          All the content you saved to this list will be permanently lost. Are
          you sure?
        </p>
        <div className="btns">
          <button
            onClick={() => {
              setOpenDropdown(false);
              setDeletePopup(false);
            }}
          >
            Cancel{" "}
          </button>
          <button onClick={() => handleDelete(id)}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
