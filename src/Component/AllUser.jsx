import React, { useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AllUser = () => {
  const users = useLoaderData();
  const [allUsers, setAllUsers] = useState(users);
  // const filter = users.map(user => setAllUsers(user));
  console.log(allUsers);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = allUsers.filter((user) => user._id !== id);
              setAllUsers(remaining);
              Swal.fire(
                "Deleted!",
                "Your Products has been deleted.",
                "success"
              );
            }
          });
      }
    });
  };

  return (
    <>
      <div>
        <div className="py-8">
          <div className="overflow-x-auto h-[60vh]  max-w-7xl mx-auto text-white">
            <table className="table">
              <thead>
                <tr className="text-center text-[16px]  bg-[#16DB93]">
                  <th className="font-bold ">ID</th>
                  <th className="font-bold ">Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Status </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {allUsers.map((user, index) => (
                    <>
                      <tr className="text-center bg-gray-200">
                        <td className="text-black">{index + 1}</td>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar text-center mx-auto">
                              <div className="mask mask-squircle  w-12 h-12">
                                <img src={user.image} alt="" />
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="text-black font-semibold">
                          {user.name}
                        </td>
                        <td className="text-black">{user.email}</td>
                        <td className="flex items-center justify-center">
                          <h2 className="text-black mt-4">{user.gender}</h2>
                        </td>
                        <td className="text-black">{user.age}</td>
                        <td className="text-black">{user.status}</td>

                        <th>
                          <button
                            onClick={() => handleDelete(user._id)}
                            type="submit"
                            className=" rounded-md text-[#16DB93] mr-3 py-2 lg:py-2 px-2 bg-white "
                          >
                            <AiOutlineDelete className="text-2xl"></AiOutlineDelete>
                          </button>
                          <Link to={`/update/${user._id}`}>
                            <button
                              type="submit"
                              className="rounded-md text-[#16DB93] py-2 lg:py-2 px-2 bg-white "
                            >
                              <AiFillEdit className="text-2xl"></AiFillEdit>
                            </button>
                          </Link>
                        </th>
                      </tr>
                    </>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUser;
