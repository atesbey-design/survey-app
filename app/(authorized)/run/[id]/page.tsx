"use client";
import Radio from "@/components/Survey/Radio";
import Rating from "@/components/Survey/Rating";
import Anket from "@/components/Survey/Secim";
import SurveyRadioContainer from "@/components/Survey/SurveyRadioContainer";
import SurveyContainer from "@/components/deneme";
import React, { useState } from "react";

const ExampleSurveyData = [
  {
    type: "radio",
    title: "Radio Survey",
    questions: [
      {
        title: "Question 1",
        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
          { label: "Option 3", value: "option3" },
        ],
      },
    ],
    onChange: (selectedOptions: any) => {
      console.log("Selected Options:", selectedOptions);
    },
  },
  {
    type: "rating",
    title: "Rating Survey",
    questions: [
      {
        title: "How satisfied are you with the product?",
      },
    ],
    onChange: (selectedRating: any) => {
      console.log("Selected Rating:", selectedRating);
    },
  },
  {
    type: "radio",
    title: "Radio Survey",
    questions: [
      {
        title: "Question 1",
        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
          { label: "Option 3", value: "option3" },
        ],
      },
    ],
    onChange: (selectedOptions: any) => {
      console.log("Selected Options:", selectedOptions);
    },
  },
  {
    type: "selection",
    title: "Selection Survey",
    questions: [
      {
        title: "Select all applicable options",
        options: ["Option 1", "Option 2", "Option 3"],
      },
    ],
    onChange: (selectedOptions: any) => {
      console.log("Selected Options:", selectedOptions);
    },
  },
];

const Page = () => {
  return (
    <div className="flex flex-col gap-10">
      <SurveyContainer data={ExampleSurveyData} />
    </div>
  );
};

export default Page;
