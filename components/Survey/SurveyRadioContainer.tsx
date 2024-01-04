import React from "react";
import Radio from "./Radio";

const SurveyRadioContainer = ({ surveyTitle, questions }: any) => {
  return (
    <div>
      <header className="w-full px-5 bg-white my-5 text-black py-5">
        <h1
          className="text-2xl font-bold text-center"
          style={{ color: "#2d3748" }}
        >
          {surveyTitle}
        </h1>
      </header>
      <div className="flex flex-col gap-5">
        {questions.map((question: any, index: any) => (
          <div key={index}>
            <h1>
              <span className="mr-5">{`soru: ${index + 1}`}</span>
              {question.title}
            </h1>
            {question.options.map((option: any, optionIndex: any) => (
              <Radio
                key={optionIndex}
                id={`question${index + 1}-option${optionIndex + 1}`}
                value={option.value}
                name={`question${index + 1}`}
                label={option.label}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyRadioContainer;
