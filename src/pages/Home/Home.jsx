import React, { useContext, useEffect } from "react";
import Form from "../../components/Home/Form";
import MyInfo from "../../components/Home/MyInfo";
import { useDispatch, useSelector } from "react-redux";
import { getSectorData } from "../../redux/features/auth/userDataSlice";

const Home = () => {
  const { user, sectorData } = useSelector((state) => state?.userData);
  const dispatch = useDispatch();
  // dispatch(getSectorData());

  useEffect(() => {
    dispatch(getSectorData());
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-darkbg">
      <div
        className=" bg-no-repeat bg-cover min-h-[90vh]"
        // style={containerStyles}
      >
        <div className="  flex flex-col items-center justify-center pt-10 ">
          {/*Form for post*/}
          <Form />

          {/* My Info */}
          {user?.user && (
            <div className=" mt-10 pb-5">
              <MyInfo />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
