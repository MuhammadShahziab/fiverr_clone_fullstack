import React, { useState } from "react";
import "./MyGigs.scss";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newrequest";
import getCurrentUser from "../../utils/getCurrentUser";
import { FiEye } from "react-icons/fi";

const MyGigs = () => {
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest
        .get(`/gigs?userId=${currentUser?._id}`)
        .then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("myGigs");
    },
  });
  const handleDelete = (id) => {
    mutation.mutate(id);
    console.log("cliekced", id);
  };

  const totalPages = Math.ceil(data?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data?.length);

  const currentData = data?.slice(startIndex, endIndex);
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

          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.map((g) => (
                <tr key={g._id}>
                  <td>
                    <img className="gigImg" src={g.images[0]} alt="gigImage" />
                  </td>
                  <td> {g?.title}</td>
                  <td>{g.price}</td>
                  <td>{g?.sales}</td>
                  <td className="actions">
                    <img
                      src="/img/delete.png"
                      alt="delete"
                      className="trash"
                      onClick={() => handleDelete(g._id)}
                    />
                    <Link className="link" to={`/gig/${g._id}`}>
                      <FiEye className="trash"></FiEye>
                    </Link>
                  </td>
                </tr>
              ))}
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      ></Pagination>{" "}
    </div>
  );
};

export default MyGigs;
