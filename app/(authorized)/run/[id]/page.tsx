"use client";
import Radio from "@/components/Survey/Radio";
import Rating from "@/components/Survey/Rating";
import Anket from "@/components/Survey/Secim";
import SurveyRadioContainer from "@/components/Survey/SurveyRadioContainer";
import SurveyContainer from "@/components/deneme";
import Backend from "@/data/Backend";
import React, { useEffect, useState } from "react";

const Page = ({ params }: any) => {
  console.log(params);
  const [survey, setSurvey] = useState<any>(null);
  const id = params.id;

  const [surveyData, setSurveyData] = useState<any>({
    title: "anket1",
    surveyId: params.id,
    description: "denemee",
    questionsAnsver: {},
  });

  console.log(survey);
  useEffect(() => {
    const fetchSurveys = async () => {
      const surveyData = await Backend.Survey.getSurveyById(id);
      setSurvey(surveyData.survey);
    };

    fetchSurveys();
  }, [id]);

  if (!survey) {
    return (
      <div className="  w-full items-center justify-center">
        <div>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10">
      <SurveyContainer data={survey} surveyId={params.id} />
    </div>
  );
};

export default Page;
