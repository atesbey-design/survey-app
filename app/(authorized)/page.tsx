import SurveyPage from "@/components/Survey/SurveyPage";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col w-full gap-5">
      <h1>My Survey</h1>
      <div className="flex w-full justify-between">
        <h1>First Survey</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Run
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Results
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        // onClick={() => {
        //   router.push("/login");
        // }}
      >
        Add Survey
      </button>
    </div>
  );
};

export default page;
