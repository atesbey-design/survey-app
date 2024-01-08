"use client";
import SurveyPage from "@/components/Survey/SurveyPage";
import Backend from "@/data/Backend";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Define a functional component called Page
const Page = () => {
  // Declare state variable 'surveys' and a function 'setSurveys' to update it
  const [surveys, setSurveys] = useState<any[]>([]);

  // Use useEffect hook to fetch surveys when the component mounts
  useEffect(() => {
    // Define an asynchronous function 'fetchSurveys' to handle survey data retrieval
    const fetchSurveys = async () => {
      try {
        // Call Backend.Survey.getAllSurveys() to get survey data
        const surveyData = await Backend.Survey.getAllSurveys();

        // Check if 'surveys' property exists in the retrieved survey data
        if (surveyData.surveys) {
          // If 'surveys' property exists, update the state variable 'surveys'
          setSurveys(surveyData.surveys);
        } else {
          // If 'surveys' property is not found, log an error
          console.error("Surveys not found in surveyData:", surveyData);
        }
      } catch (error) {
        // Log an error if there's an issue fetching surveys
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, []); 

  
  return (
    <div className="flex flex-col w-full gap-5">
      <h1>My Surveys</h1>
      {/* Map through the 'surveys' array and render survey information */}
      {surveys.map((survey) => (
        <div key={survey.survey_id} className="border p-4 rounded-md shadow-md">
          <h2>{survey.survey_title}</h2>
          <p>{survey.survey_description}</p>
          <div className="flex w-full justify-between">
            {/* Create a Link to navigate to the 'Run' page with the survey ID */}
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              href={`/run/${survey.survey_id}`}
            >
              Run
            </Link>
            {/* Create a Link to navigate to the 'Edit' page with the survey ID */}
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              href={`/edit/${survey.survey_id}`}
            >
              Edit
            </Link>
            {/* Button to view survey results (Not yet implemented) */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Results
            </button>
          </div>
        </div>
      ))}
      {/* Link to navigate to the 'Add Survey' page */}
      <Link
        href="/addSurvey"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Survey
      </Link>
    </div>
  );
};

export default Page;
