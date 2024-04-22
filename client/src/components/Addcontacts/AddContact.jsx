import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { addContact, updateContact } from "../fetchContact/FetchContact";
import { contactContextShare } from "../Context/Context";

const AddContact = () => {
  const navigate = useNavigate();
  const { update, setUpdate } = contactContextShare();
  const [contact, setContact] = useState(
    update
      ? update
      : {
          fullname: "",
          phone: "",
          email: "",
          image: "",
          _id: "",
        }
  );

  const queryClient = useQueryClient();
  const {mutate, isLoading, isError } = useMutation(addContact, {
    onSuccess: () => queryClient.invalidateQueries("contact"),
  });

  const {
    mutate: updateContacts,
    isLoading: updateLoading,
    isError: updateError,
  } = useMutation(updateContact, {
    onSuccess: () => queryClient.invalidateQueries("contact"),
  });

  useEffect(() => {
    if (update) {
      setContact({
        ...contact,
        fullname: update.fullname,
        phone: update.phone,
        email: update.email,
        image: update.image,
        _id: update._id,
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (update) {
      updateContacts(contact);
      // navigate(-1);
      window.location.href = "/";
    } else {
      const { _id, ...rest } = contact;
      
      addContact(rest);
      // navigate(-1);
      window.location.href = "/";
      setUpdate(null);
    }
  };

  if (isLoading) return "Loading...";
  if (isError) return "something went wrong...";

  return (
    <section>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-[2rem] left-[4rem] button px-5 text-sm bg-pink-500 600 p-2 text-white rounded-md hover:opacity-75"
      >
        Go Back
      </button>
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="border border-gray-400 w-[30rem] p-5 flex flex-col gap-5 rounded-md
            shadow-md shadow-gray-400 m-5 lg:m-0"
        >
          <h1 className="text-center text-xl font-medium">
            {update ? "Update Contact" : "Add new Contact"}
          </h1>
          <input
            required
            className="input"
            type="text"
            value={contact.fullname}
            onChange={(e) =>
              setContact({ ...contact, fullname: e.target.value })
            }
            placeholder="Full Name..."
          />
          <input
            required
            className="input"
            type="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            placeholder="Email..."
          />
          <input
            required
            className="input"
            type="text"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            placeholder="Phone Number..."
          />
          {/* <input
            required={!update && true}
            className="input cursor-pointer"
            type="date"
            value={`${new Date(contact.birth).getFullYear()}-${
              new Date(contact.birth).getMonth() < 10
                ? "0" + new Date(contact.birth).getMonth()
                : new Date(contact.birth).getMonth()
            }-${
              new Date(contact.birth).getDate() < 10
                ? "0" + new Date(contact.birth).getDate()
                : new Date(contact.birth).getDate()
            }`}
            onChange={(e) => setContact({ ...contact, birth: e.target.value })}
          /> */}
          <input
            type="file"
            onChange={(e) =>
              setContact({ ...contact, image: e.target.files[0] })
            }
          />
          <button className="bg-pink-500 600 p-2 text-white rounded-md hover:opacity-75">
            {update ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </section>

    // <div>
    //   <section className="bg-gray-100">
    //     <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    //       <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
    //         <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
    //           <form onSubmit={handleSubmitContact} className="space-y-4">
    //             <h1 className="text-center text-xl font-medium">
    //               {update ? "Update Contact" : "Add new Contact"}
    //             </h1>
    //             <div>
    //               <label className="sr-only" htmlFor="name">
    //                 Name
    //               </label>
    //               <input
    //                 className="w-full rounded-lg border-gray-200 p-3 text-sm"
    //                 placeholder="Name"
    //                 type="text"
    //                 id="name"
    //                 name="fullName"
    //                 value={contact.fullname}
    //                 onChange={handleInput}
    //                 required
    //               />
    //             </div>

    //             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    //               <div>
    //                 <label className="sr-only" htmlFor="email">
    //                   Email
    //                 </label>
    //                 <input
    //                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
    //                   placeholder="Email address"
    //                   type="email"
    //                   id="email"
    //                   name="email"
    //                   value={contact.email}
    //                   onChange={handleInput}
    //                   required
    //                 />
    //               </div>

    //               <div>
    //                 <label className="sr-only" htmlFor="phone">
    //                   Phone
    //                 </label>
    //                 <input
    //                   className="w-full rounded-lg border-gray-200 p-3 text-sm"
    //                   placeholder="Phone Number"
    //                   type="tel"
    //                   id="phone"
    //                   name="phone"
    //                   value={contact.phone}
    //                   onChange={handleInput}
    //                   required
    //                 />
    //               </div>
    //             </div>

    //             <div className="mt-4">
    //               <button
    //                 type="submit"
    //                 className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
    //                 onClick={handleSubmitContact}
    //               >
    //                 Add
    //               </button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
  );
};

export default AddContact;
