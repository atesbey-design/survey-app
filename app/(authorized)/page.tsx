"use client";
import SurveyPage from "@/components/Survey/SurveyPage";
import Backend from "@/data/Backend";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// ...

const Page = () => {
  const [surveys, setSurveys] = useState<any[]>([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const surveyData = await Backend.Survey.getAllSurveys();
        if (surveyData.surveys) {
          setSurveys(surveyData.surveys);
        } else {
          console.error("Surveys not found in surveyData:", surveyData);
        }
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div className="flex flex-col w-full gap-5">
      <h1>My Surveys</h1>
      {surveys.map((survey) => (
        <div key={survey.survey_id} className="border p-4 rounded-md shadow-md">
          <h2>{survey.survey_title}</h2>
          <p>{survey.survey_description}</p>
          <div className="flex w-full justify-between">
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              href={`/run/${survey.survey_id}`}
            >
              Run
            </Link>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              href={`/edit/${survey.survey_id}`}
            >
              Edit
            </Link>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Results
            </button>
          </div>
        </div>
      ))}
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
