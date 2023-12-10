import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addUserData } from "../../redux/features/auth/userDataSlice";

const Form = () => {
  const [isopenSelector, setIsopenSelector] = useState(false);
  const [name, setName] = useState("");
  const [selector, setSelector] = useState("Select Sector");
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const { isSending, isGetting, user, sectorData } = useSelector(
    (state) => state.userData
  );
  const dispatch = useDispatch();
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
      name !== "" &&
      selector !== "Select Sector" &&
      isTermsChecked !== false
    ) {
      const userData = { name, sector: selector, terms: isTermsChecked };
      dispatch(addUserData(userData));
      setName("");
      setSelector("Select Sector");
      setIsTermsChecked(false);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className=" bg-white w-[95vw] md:w-[90vw] lg:w-[40vw] dark:bg-darkbg  p-3 lg:p-8 border border-slate-300 dark:border-slate-700 shadow-lg rounded"
    >
      <h1 className=" w-full  text-start  text-xl font-semibold pb-5">
        Please enter your name and pick the Sectors you are currently involved
        in.
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
                {isGetting ? (
                  <>loading</>
                ) : (
                  <>
                    {" "}
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
                                <button
                                  onClick={() => selectHanlder(s1.category)}
                                >
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
                                        onClick={() =>
                                          selectHanlder(s2.category)
                                        }
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
                  </>
                )}
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
          disabled={isSending || user?.user}
        >
          {isSending ? <span>Loaing...</span> : <span>Save</span>}
        </button>
      </div>
    </form>
  );
};

export default Form;

const sectorsArray = [
  {
    category: "Manufacturing",
    subcategories: [
      "Construction materials",
      "Electronics and Optics",
      "Food and Beverage",
      {
        category: "Food and Beverage",
        subcategories: [
          "Bakery & confectionery products",
          "Beverages",
          "Fish & fish products",
          "Meat & meat products",
          "Milk & dairy products",
          "Other",
          "Sweets & snack food",
        ],
      },
      {
        category: "Furniture",
        subcategories: [
          "Bathroom/sauna",
          "Bedroom",
          "Children’s room",
          "Kitchen",
          "Living room",
          "Office",
          "Other (Furniture)",
          "Outdoor",
          "Project furniture",
        ],
      },
      {
        category: "Machinery",
        subcategories: [
          "Machinery components",
          "Machinery equipment/tools",
          "Manufacture of machinery",
          "Maritime",
          {
            category: "Aluminium and steel workboats",
            subcategories: [
              "Boat/Yacht building",
              "Ship repair and conversion",
            ],
          },
          "Metal structures",
          "Other",
          "Repair and maintenance service",
        ],
      },
      {
        category: "Metalworking",
        subcategories: [
          "Construction of metal structures",
          "Houses and buildings",
          "Metal products",
          "Metal works",
          {
            category: "CNC-machining",
            subcategories: [
              "Forgings, Fasteners",
              "Gas, Plasma, Laser cutting",
              "MIG, TIG, Aluminum welding",
            ],
          },
        ],
      },
      {
        category: "Plastic and Rubber",
        subcategories: [
          "Packaging",
          "Plastic goods",
          "Plastic processing technology",
          "Blowing",
          "Moulding",
          "Plastics welding and processing",
          "Plastic profiles",
        ],
      },
      {
        category: "Printing",
        subcategories: [
          "Advertising",
          "Book/Periodicals printing",
          "Labelling and packaging printing",
        ],
      },
      {
        category: "Textile and Clothing",
        subcategories: ["Clothing", "Textile"],
      },
      {
        category: "Wood",
        subcategories: [
          "Other (Wood)",
          "Wooden building materials",
          "Wooden houses",
        ],
      },
    ],
  },
  {
    category: "Other",
    subcategories: [
      "Creative industries",
      "Energy technology",
      "Environment",
      {
        category: "Service",
        subcategories: [
          "Business services",
          "Engineering",
          "Information Technology and Telecommunications",
          {
            category: "Data processing, Web portals, E-marketing",
            subcategories: [
              "Programming, Consultancy",
              "Software, Hardware",
              "Telecommunications",
            ],
          },
        ],
      },
      "Tourism",
      "Translation services",
      "Transport and Logistics",
      {
        category: "Air",
        subcategories: ["Rail", "Road", "Water"],
      },
    ],
  },
];
