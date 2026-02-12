import { useEffect } from "react";
import API from "../services/api";

function TestConnection() {
  useEffect(() => {
    const test = async () => {
      try {
        const res = await API.get("/products");
        console.log(res.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    test();
  }, []);

  return (
    <div className="text-white p-10">
      Check console for backend response 👀
    </div>
  );
}

export default TestConnection;
