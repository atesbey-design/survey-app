"use client";
import React, { useState } from "react";
import Radio from "./Survey/Radio";

const SurveyContainer: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="flex flex-col gap-10">
      {data.map((surveyData, index) => (
        <Survey key={index} {...surveyData} />
      ))}
    </div>
  );
};

const Survey = ({ type, title, questions, onChange }: any) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {type === "radio" && (
        <SurveyRadio questions={questions} onChange={onChange} />
      )}
      {type === "rating" && <Rating title={title} onChange={onChange} />}
      {type === "selection" && (
        <Anket questions={questions} onChange={onChange} />
      )}
    </div>
  );
};

const SurveyRadio: React.FC<any> = ({ title, questions, onChange }) => {
  return (
    <div>
      <header className="w-full px-5 bg-white my-5 text-black py-5">
        <h1
          className="text-2xl font-bold text-center"
          style={{ color: "#2d3748" }}
        >
          {title}
        </h1>
      </header>
      <div className="flex flex-col gap-5">
        {questions &&
          questions.map((question: any, questionIndex: any) => (
            <div key={questionIndex}>
              <h1>
                <span className="mr-5">{`soru: ${questionIndex + 1}`}</span>
                {question.title}
              </h1>
              {question.options &&
                question.options.map((option: any, optionIndex: any) => (
                  <Radio
                    key={optionIndex}
                    id={`question${questionIndex + 1}-option${optionIndex + 1}`}
                    value={option.value}
                    name={`question${questionIndex + 1}`}
                    label={option.label}
                    onChange={(value: any) => onChange(value)}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

const Rating: React.FC<any> = ({ title, onChange }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleCircleClick = (value: any) => {
    setSelectedRating(value);
    onChange(value);
  };

  return (
    <div>
      <h1>{title}</h1>
      <div className="rating-container flex items-center gap-5">
        <p>katılıyorum</p>
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
        <p>katılmıyorum</p>
      </div>
    </div>
  );
};

const Anket: React.FC<any> = ({ questions, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSecim = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className="">
      <div className="flex flex-col">
        {questions &&
          questions.map((question: any, questionIndex: any) => (
            <div key={questionIndex}>
              <label className="block text-sm font-medium text-gray-700">
                {question.title}
              </label>
              {question.options &&
                question.options.map((option: string, optionIndex: any) => (
                  <div key={optionIndex}>
                    <input
                      type="checkbox"
                      onChange={() => handleSecim(option)}
                      checked={selectedOptions.includes(option)}
                    />
                    <span>{option}</span>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SurveyContainer;
