import React, { useState, useRef } from "react";
import "./FavListPopUp.scss";
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newrequest";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const FavListPopup = ({
  onClose,
  gigId,
  create,
  edit,
  name,
  id,
  setOpenDropdown,
}) => {
  const [listName, setListName] = useState(name || "");
  const [newList, setNewList] = useState(edit || create || false);
  const [isAdding, setIsAdding] = useState(false); // Concurrency flag
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["favList"],
    queryFn: () => newRequest.get(`/favList`).then((res) => res.data),
  });

  const isAddingRef = useRef(isAdding); // Use a ref to store isAdding
  const { pathname } = useLocation();
  // Mutation to create a new list
  const path = pathname.split("/")[1];

  const mutation = useMutation({
    mutationFn: (name) => {
      return newRequest.post(`/favList/create`, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favList"]);
      setListName("");
      toast.success("List created");
      if (path === "my_list") {
        onClose();
      } else {
        setNewList(false);
      }
    },
  });

  // mutation update to list
  const updateMutation = useMutation({
    mutationFn: (name) => {
      return newRequest.put(`/favList/${id}`, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favList"]);
      setListName("");
      toast.success("List Updated");
      onClose();
      setOpenDropdown(false);
    },
  });

  // Mutation to add gig to a list
  const addFavMutation = useMutation({
    mutationFn: (data) => {
      return newRequest.post(`/favList/${data.id}`, { gigId: data.gigId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favList"]);
      toast.success("Added to list");
      setIsAdding(false); // Reset flag after successful addition
      isAddingRef.current = false; // Reset ref flag
    },
    onError: () => {
      setIsAdding(false); // Reset flag if error occurs
      isAddingRef.current = false;
      toast.error("Error adding to list");
    },
  });

  // Mutation to remove gig from a list
  const removeFavMutation = useMutation({
    mutationFn: (data) => {
      return newRequest.post(`/favList/remove/${data?.id}`, {
        gigId: data.gigId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favList"]);
      toast.success("Removed from list");
      setIsAdding(false); // Reset flag after successful removal
      isAddingRef.current = false; // Reset ref flag
    },
    onError: () => {
      setIsAdding(false); // Reset flag if error occurs
      isAddingRef.current = false;
      toast.error("Error removing from list");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      if (edit) {
        updateMutation.mutate({
          name: listName,
        });
      } else {
        mutation.mutate({
          name: listName,
        });
      }
    }
  };

  const handleCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      addFavMutation.mutate({
        id,
        gigId,
      });
    } else {
      removeFavMutation.mutate({
        id,
        gigId,
      });
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-btn" onClick={onClose}>
          <RxCross2 />
        </button>
        <div className="header">
          <h2>{edit ? "Edit List" : "Create a New List"}</h2>{" "}
          <FiPlus onClick={() => setNewList(true)} className="plus" size={20} />
        </div>
        {newList && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="For example: Websites"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              required
            />
            <div className="createBtns">
              <button
                type="button"
                onClick={() => setNewList(false)}
                className="cancel-btn btn"
              >
                Cancel
              </button>
              <button type="submit" className="create-btn btn">
                {edit ? "Update List" : "Create List"}
              </button>
            </div>
          </form>
        )}

        {!newList && !create && (
          <div className="mylists">
            {isLoading
              ? "Loading..."
              : error
              ? "Something went wrong!"
              : data?.map((list) => (
                  <div key={list?._id} className="item">
                    <p>{list?.name}</p>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={list?.gigs.find((fav) => fav?._id === gigId)}
                        onChange={(e) =>
                          handleCheckboxChange(list?._id, e.target.checked)
                        }
                      />
                    </label>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavListPopup;
