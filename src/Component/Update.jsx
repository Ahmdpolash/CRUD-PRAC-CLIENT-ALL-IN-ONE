import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
  const users = useLoaderData();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const name = form.name.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const age = form.age.value;
    const status = form.status.value;

    const formData = { image, name, email, gender,age, status };
    console.log(formData);

    fetch(`http://localhost:5000/users/${users._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire("Good job!", "Product Updated Successfully!", "success");
          navigate("/all");
        }
      });
  };

  return (
    <div>
      <div className="py-6 text-center">
        <h3 className="text-3xl font-bold"> Add New User</h3>
        <p className="text-gray-700 text-[17px] ">
          User the below form to create a new account
        </p>
      </div>
      <form
        onSubmit={handleUpdate}
        className="flex items-center p-8 border bg-gray-200 w-1/2 mx-auto"
      >
        <div className="w-full">
          <label className="font-bold text-gray-500 my-2" htmlFor="name">
            Image
          </label>
          <br />
          <input
            className="w-full mb-2 py-2 px-4 mt-2"
            type="text"
            name="image"
            defaultValue={users.image}
            placeholder="Image URL"
          />
          <label className="font-bold text-gray-500 my-2" htmlFor="name">
            Your Name
          </label>
          <br />
          <input
            className="w-full mb-2 py-2 px-4 mt-2"
            type="text"
            name="name"
            defaultValue={users.name}
            placeholder="Name"
          />
          <label className="font-bold text-gray-500 my-2" htmlFor="name">
            Email
          </label>
          <br />
          <input
            className="w-full mb-2 py-2 px-4 mt-2"
            type="text"
            name="email"
            defaultValue={users.email}
            placeholder="Your Email"
          />
          <label className="font-bold text-gray-500 my-2" htmlFor="Gender">
            Gender
          </label>{" "}
          <br />
          <input
            className="p-6 "
            type="radio"
            value="male"
            defaultChecked={users.gender}
            name="gender"
            id=""
          />
          Male
          <input
            className="p-6"
            type="radio"
            value="female"
            name="gender"
            defaultChecked={users.gender}
            id=""
          />{" "}
          Female
          <br />
          <label className="font-bold text-gray-500 " htmlFor="Gender">
            Status
          </label>{" "}
          <br />
          <input
            className=""
            type="radio"
            defaultChecked={users.status}
            value="active"
            name="status"
            id=""
          />
          Active
          <input
            className=""
            type="radio"
            value="inactive"
            defaultChecked={users.status}
            name="status"
            id=""
          />{" "}
          Inactive
          <br />
          <select  name="age" id="">
            <option defaultValue={users.age} name="age" value=" 15-18">
              15-18
            </option>
            <option defaultValue={users.age} name="age" value="18-23">
              18-23
            </option>
            <option defaultValue={users.age} name="age" value="23-25">
              23-25
            </option>
          </select>
          <input
            className="w-full bg-[#16DB93] py-2 mt-3 font-bold rounded-md"
            type="submit"
            value="Update"
          />
        </div>
      </form>
    </div>
  );
};

export default Update;
