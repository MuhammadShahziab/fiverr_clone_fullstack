import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import "./FavouriteList.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newrequest";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlinePublic } from "react-icons/md";
import toast from "react-hot-toast";
import DeleteConfirm from "../../components/deleteConfirmation/DeleteConfirm";
import FavListPopup from "../../components/favListPopup/FavListPopUp";

const FavouriteList = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [popup, setPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["favList"],
    queryFn: () => newRequest.get(`/favList`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/favList/deleteList/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favList"]);
      toast.success("List Deleted");
      setDeletePopup(false);
    },
  });

  const toggleDropdown = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="layout favourite">
      <div className="heading">
        <h2 className="title">My Lists</h2>
        <p className="desc">
          Organize your go-to freelancers and favorite services into custom
          lists you can easily access and share with your team.
        </p>

        <div className="lists">
          <div className="create" onClick={() => setPopup(true)}>
            <span>
              <FiPlus size={30} />
            </span>
            <p>Create a list</p>
          </div>

          {popup && (
            <FavListPopup onClose={() => setPopup(false)} create={true} />
          )}

          {data?.map((list) => (
            <div className="listCard" key={list._id}>
              <Link to={`/my_list/${list?.name}`} className="link">
                <div className="imagegrid">
                  <div className="left">
                    {list.gigs[0]?.images[0] && (
                      <img src={list.gigs[0]?.images[0]}></img>
                    )}
                  </div>
                  <div className="right">
                    <div>
                      {list.gigs[1]?.images[0] && (
                        <img src={list.gigs[1]?.images[0]}></img>
                      )}
                    </div>
                    <div>
                      {list.gigs[2]?.images[0] && (
                        <img src={list.gigs[2]?.images[0]}></img>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              <h3>{list?.name}</h3>
              <div className="footer">
                <p>Gigs {`(${list?.gigs?.length})`}</p>
                <BsThreeDots
                  onClick={() => toggleDropdown(list?._id)}
                  size={20}
                  style={{ cursor: "pointer" }}
                ></BsThreeDots>
                {openDropdown === list?._id && (
                  <div className="dropdown">
                    <div className="item">
                      <p>Public Sharing</p>

                      <MdOutlinePublic size={18} color="green" />
                    </div>
                    <div className="item" onClick={() => setEditPopup(true)}>
                      <p>Edit</p>

                      <FaRegEdit size={18} color="blue" />
                      {editPopup && (
                        <FavListPopup
                          onClose={() => setEditPopup(false)}
                          edit={true}
                          id={list?._id}
                          name={list?.name}
                          setOpenDropdown={setOpenDropdown}
                        />
                      )}
                    </div>
                    <div className="item" onClick={() => setDeletePopup(true)}>
                      <p>Delete</p> <IoTrashOutline color="red" size={18} />
                    </div>

                    {deletePopup && (
                      <DeleteConfirm
                        setDeletePopup={setDeletePopup}
                        id={list?._id}
                        handleDelete={handleDelete}
                        setOpenDropdown={setOpenDropdown}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouriteList;
