"use client";
import React, { useState } from "react";
import Radio from "./Survey/Radio";
import Backend from "@/data/Backend";

const SurveyContainer: React.FC<{ data: any; surveyId: any }> = ({
  data,
  surveyId,
}) => {
  const [userResponses, setUserResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [surveyData, setSurveyData] = useState<any>({
    title: data.survey_title,
    surveyId: data.survey_id,
    description: data.survey_description,
    questionsAnsver: {},
  });

  console.log(surveyData);

  const handleResponseSurvey = async () => {
    if (isSubmitting) {
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await Backend.Survey.userSurveyResponse(surveyData);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionResponse = (questionId: any, response: any) => {
    setSurveyData((prevSurveyData: any) => ({
      ...prevSurveyData,
      questionsAnsver: {
        ...prevSurveyData.questionsAnsver,
        [questionId]: {
          id: questionId,
          title: data.questions.find((q: any) => q.id === questionId)?.title,
          response: response,
        },
      },
    }));
  };

  return (
    <div className="flex flex-col gap-10">
      <h1>{data.survey_title}</h1>
      <p>{data.survey_description}</p>
      <Survey
        questions={data.questions}
        onQuestionResponse={handleQuestionResponse}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleResponseSurvey()}
      >
        Submit
      </button>
    </div>
  );
};

const Survey: React.FC<any> = ({ questions, onQuestionResponse }: any) => {
  return (
    <div>
      {questions.map((question: any, index: number) => (
        <div key={index}>
          <h1>
            <span className="mr-5">{`Soru ${index + 1}:`}</span>
            {question.title}
          </h1>
          {renderQuestionComponent(question, onQuestionResponse)}
        </div>
      ))}
    </div>
  );
};

const renderQuestionComponent = (question: any, onQuestionResponse: any) => {
  switch (question.survey_types) {
    case "radio":
      return (
        <SurveyRadio
          key={question.id}
          question={question}
          onQuestionResponse={onQuestionResponse}
        />
      );
    case "rating":
      return (
        <Rating
          key={question.id}
          question={question}
          onQuestionResponse={onQuestionResponse}
        />
      );
    case "selection":
      return (
        <Anket
          key={question.id}
          question={question}
          onQuestionResponse={onQuestionResponse}
        />
      );
    default:
      return null;
  }
};

const SurveyRadio: React.FC<any> = ({ question, onQuestionResponse }: any) => {
  const handleRadioChange = (selectedOption: any) => {
    onQuestionResponse(question.id, selectedOption.value);
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        {question.options &&
          question.options.map((option: any, optionIndex: number) => (
            <Radio
              key={optionIndex}
              id={`option${optionIndex + 1}`}
              value={option}
              name={`option`}
              label={option.label}
              onChange={(selectedOption: any) =>
                handleRadioChange(selectedOption)
              }
            />
          ))}
      </div>
    </div>
  );
};

const Rating: React.FC<any> = ({ question, onQuestionResponse }: any) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleCircleClick = (value: number) => {
    setSelectedRating(value);
    onQuestionResponse(question.id, value);
  };

  return (
    <div>
      <h1>{question.title}</h1>
      <div className="rating-container flex items-center gap-5">
        <div className="rating-circles">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`circle ${value === selectedRating ? "selected" : ""}`}
              onClick={() => handleCircleClick(value)}
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Anket: React.FC<any> = ({ question, onQuestionResponse }: any) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSecim = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onQuestionResponse(question.id, updatedOptions);
  };

  return (
    <div className="">
      <div className="flex flex-col">
        {question.options &&
          question.options.map((option: string, optionIndex: number) => (
            <div key={optionIndex}>
              <div key={optionIndex}>
                <input
                  type="checkbox"
                  onChange={() => handleSecim(option)}
                  checked={selectedOptions.includes(option)}
                />
                <span>{option}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SurveyContainer;
