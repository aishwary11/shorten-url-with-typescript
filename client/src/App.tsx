import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import { axiosInstance, toastSuccess } from "./common/utility";

function App() {
  const flag = useRef(true);
  useEffect(() => {
    axiosInstance.get('/').then(({ data }) => {
      toastSuccess(data.msg);
    });
  });
  return (
    <>
      <ToastContainer />
    </>
  );
}

export default App;
