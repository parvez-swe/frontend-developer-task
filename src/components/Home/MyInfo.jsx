import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteUserData,
  updateUserData,
} from "../../redux/features/auth/userDataSlice";

const MyInfo = () => {
  const { user, sectorData, isGetting, isUpdating, isLoading } = useSelector(
    (state) => state?.userData
  );

  const dispatch = useDispatch();
  const [isopenSelector, setIsopenSelector] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [name, setName] = useState(user?.user?.name || "");
  const [selector, setSelector] = useState(
    user?.user?.sector || "Select Sector"
  );
  const [isTermsChecked, setIsTermsChecked] = useState(
    user?.user?.terms || false
  );

  const openSelector = () => {
    setIsopenSelector(!isopenSelector);
  };

  const selectHanlder = (data) => {
    setSelector(data);
    setIsopenSelector(false);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (name === "") {
      toast.warning("Please Enter Your Name");
    }
    if (selector === "Select Sector") {
      toast.warning("Please Select Sector");
    }
    if (isTermsChecked === false) {
      toast.warning("Please Checked The terms");
    }

    if (
      (name !== user?.user?.name ||
        selector !== user?.user?.sector ||
        isTermsChecked !== user?.user?.terms) &&
      name !== "" &&
      selector !== "Select Sector" &&
      isTermsChecked !== false
    ) {
      const userData = {
        id: user?.user?._id,
        name,
        sector: selector,
        terms: isTermsChecked,
      };
      dispatch(updateUserData(userData));

      // Update UserData
      toast.success("Successfully updated user data");
    }

    if (
      !(
        name !== user?.user?.name ||
        selector !== user?.user?.sector ||
        isTermsChecked !== user?.user?.terms
      )
    ) {
      toast.warning("Nothing change yet!");
    }
  };

  const deleteHanlder = (id) => {
    dispatch(deleteUserData(id));
    toast.success("Sucessfully Deleted");
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className=" bg-white w-[95vw] md:w-[90vw] lg:w-[40vw] dark:bg-darkbg  p-3 lg:p-8 border border-slate-300 dark:border-slate-700 shadow-lg rounded"
    >
      <h1 className=" w-full  text-start  text-xl font-semibold pb-5">
        My Information
      </h1>

      <div className="w-full">
        <label
          htmlFor="name"
          className="block mb-1 lg:text-lg text-sm font-medium text-slate-900 dark:text-white"
        >
          Enter Your Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="outline-none bg-gray-50 dark:bg-darks border border-gray-300 dark:border-dark focus:border-porrange dark:focus:border-pgreen text-dark sm:text-sm rounded focus:ring-oragnge-600  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white "
          placeholder="Please Enter your Name here"
          //   required
        />
      </div>
      {/* Select where you involve */}
      <div>
        <div className=" w-full mt-4">
          <label
            htmlFor="name"
            className="block mb-1 lg:text-lg text-sm font-medium text-dark dark:text-white"
          >
            Pick Your Sector
          </label>

          <button
            onClick={openSelector}
            className=" flex justify-between  bg-gray-50 border border-gray-300 dark:border-dark  text-dark sm:text-sm rounded  w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white "
          >
            {selector === "Select Sector" ? (
              <span className="dark:text-gray-50  text-gray-400">
                {selector}
              </span>
            ) : (
              <span className="dark:text-white  text-slate-900">
                {selector}
              </span>
            )}
            <BiChevronDown
              className={` ${
                isopenSelector ? "rotate-180" : ""
              }  text-xl inline-block`}
            />
          </button>
          {isopenSelector && (
            <div className=" relative">
              <ul className="absolute  h-[30vh]  overflow-y-auto overflow-hidden  bg-gray-50 border border-gray-300 dark:border-dark  text-dark sm:text-sm rounded  w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white ">
                {sectorData[0]?.sectors?.map((data) => (
                  <div>
                    <div className=" hover:dark:bg-dark px-1">
                      <strong>{data.category}</strong>
                    </div>
                    <ul className="hover:cursor-pointer ml-2">
                      {data?.subcategories?.map((s1) => (
                        <li className=" hover:cursor-pointer ml-4">
                          <div
                            className={`hover:dark:bg-dark px-1 hover:bg-slate-200 ${
                              selector === s1.category &&
                              "dark:bg-dark bg-slate-200 "
                            } `}
                          >
                            <button onClick={() => selectHanlder(s1.category)}>
                              {s1.category}
                            </button>
                          </div>
                          <ul>
                            {s1?.subcategories?.map((s2) => (
                              <li className="ml-8 hover:cursor-pointer">
                                <div
                                  className={`hover:dark:bg-dark px-1 hover:bg-slate-200 ${
                                    selector === s2.category &&
                                    "dark:bg-dark bg-slate-200 "
                                  } `}
                                >
                                  <button
                                    onClick={() => selectHanlder(s2.category)}
                                  >
                                    {s2?.category}
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Checkbox for Terms and Conditions */}
      <div className="mt-4">
        <label className="inline-flex items-center  hover:cursor-pointer ">
          <input
            type="checkbox"
            className="form-checkbox bg-slate-50 dark:bg-slate-800 h-5 w-5 hover:cursor-pointer "
            checked={isTermsChecked}
            onChange={() => setIsTermsChecked(!isTermsChecked)}
          />
          <span className="ml-2 text-sm text-slate-900 dark:text-white">
            Agree to terms
          </span>
        </label>
      </div>

      {/* save button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={formSubmitHandler}
          className=" w-full md:w-[20vw] lg:w-[15] font-semibold uppercase border border-pgreen dark:border-porrange hover:bg-gradient-to-r from-primary to-secondary from-porrange to-sorrange dark:from-pgreen dark:to-sgreen dark:text-white text-slate-900 hover:text-white  px-4 py-2 rounded-md focus:outline-none"
          //   disabled={!update}
        >
          {isUpdating ? <span>Loaing...</span> : <span>Update</span>}
        </button>
      </div>

      {/* Delete button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={
            confirmDelete
              ? () => deleteHanlder(user?.user?._id)
              : () => setConfirmDelete(true)
          }
          className=" w-full md:w-[20vw] lg:w-[15] font-semibold uppercase border border-red-700 dark:border-red-700 hover:bg-red-700  dark:text-white text-slate-900 hover:text-white  px-4 py-2 rounded-md focus:outline-none"
          //   disabled={!update}
        >
          {isLoading ? (
            <span>Loaing...</span>
          ) : (
            <>{confirmDelete ? <span>Confirm</span> : <span>Delete</span>}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default MyInfo;

// export const sectorsData = [
//   {
//     category: "Manufacturing",
//     subcategories: [
//       { category: "Construction materials" },
//       { category: "Electronics and Optics" },
//       {
//         category: "Food and Beverage",
//         subcategories: [
//           { category: "Bakery & confectionery products" },
//           { category: "Beverages" },
//           { category: "Fish & fish products" },
//           { category: "Meat & meat products" },
//           { category: "Milk & dairy products" },
//           { category: "Sweets & snack food" },
//           { category: "Other (Fod and Beverage" },
//         ],
//       },
//       {
//         category: "Furniture",
//         subcategories: [
//           { category: "Bathroom/sauna" },
//           { category: "Bedroom" },
//           { category: "Children’s room" },
//           { category: "Kitchen" },
//           { category: "Living room" },
//           { category: "Office" },
//           { category: "Other (Furniture)" },
//           { category: "Outdoor" },
//           { category: "Project furniture" },
//         ],
//       },
//       {
//         category: "Machinery",
//         subcategories: [
//           { category: "Machinery components" },
//           { category: "Machinery equipment/tools" },
//           { category: "Manufacture of machinery" },
//           { category: "Maritime" },
//           {
//             category: "Aluminium and steel workboats",
//             subcategories: [
//               { category: "Boat/Yacht building" },
//               { category: "Ship repair and conversion" },
//             ],
//           },
//           { category: "Metal structures" },
//           { category: "Other" },
//           { category: "Repair and maintenance service" },
//         ],
//       },
//       {
//         category: "Metalworking",
//         subcategories: [
//           { category: "Construction of metal structures" },
//           { category: "Houses and buildings" },
//           { category: "Metal products" },
//           { category: "Metal works" },
//           {
//             category: "CNC-machining",
//             subcategories: [
//               { category: "Forgings, Fasteners" },
//               { category: "Gas, Plasma, Laser cutting" },
//               { category: "MIG, TIG, Aluminum welding" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Plastic and Rubber",
//         subcategories: [
//           { category: "Packaging" },
//           { category: "Plastic goods" },
//           { category: "Plastic processing technology" },
//           { category: "Blowing" },
//           { category: "Moulding" },
//           { category: "Plastics welding and processing" },
//           { category: "Plastic profiles" },
//         ],
//       },
//       {
//         category: "Printing",
//         subcategories: [
//           { category: "Advertising" },
//           { category: "Book/Periodicals printing" },
//           { category: "Labelling and packaging printing" },
//         ],
//       },
//       {
//         category: "Textile and Clothing",
//         subcategories: ["Clothing", "Textile"],
//       },
//       {
//         category: "Wood",
//         subcategories: [
//           { category: "Other (Wood)" },
//           { category: "Wooden building materials" },
//           { category: "Wooden houses" },
//         ],
//       },
//     ],
//   },
//   {
//     category: "Other",
//     subcategories: [
//       { category: "Creative industries" },
//       { category: "Energy technology" },
//       { category: "Environment" },
//       {
//         category: "Service",
//         subcategories: [
//           { category: "Business services" },
//           { category: "Engineering" },
//           { category: "Information Technology and Telecommunications" },
//           {
//             category: "Data processing, Web portals, E-marketing",
//             subcategories: [
//               { category: "Programming, Consultancy" },
//               { category: "Software, Hardware" },
//               { category: "Telecommunications" },
//             ],
//           },
//         ],
//       },
//       { category: "Tourism" },
//       { category: "Translation services" },
//       { category: "Transport and Logistics" },
//       {
//         category: "Air",
//         subcategories: [
//           { category: "Rail" },
//           { category: "Road" },
//           { category: "Water" },
//         ],
//       },
//     ],
//   },
// ];
