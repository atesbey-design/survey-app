"use client";
import { InputField } from "@/components/InputField";
import { title } from "process";
import React, { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";

const SurveyPage: React.FC = () => {
  // const [airdropData, setAirdrop] = useState<any>({
  //   title: "",
  //   description: "",
  //   questions: [
  //     {
  //       type: "",
  //       title: "",
  //       question: [
  //         {
  //           title: "",
  //           options: [],
  //         },
  //       ],
  //     },
  //   ],
  // });

  const [surveyData, setSurveyData] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  console.log(surveyData);
  const addSurveyQuestion = (type: any) => {
    const newSurveyData = [...surveyData];
    const newQuestion = {
      type,
      title: "",
      options: [],
    };
    newSurveyData.push(newQuestion);
    setSurveyData(newSurveyData);
  };

  const createQuestion = async (questionData: any) => {
    try {
      const response = await fetch("/create-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question_data: questionData }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Question created successfully:", result);
      } else {
        console.error("Failed to create question");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const addSatisfactionQuestion = () => {
    const newSurveyData = [...surveyData];
    const newQuestion = {
      type: "satisfaction",
      title: "How satisfied are you with the product?",
      options: [],
    };
    newSurveyData.push(newQuestion);
    setSurveyData(newSurveyData);
  };

  const removeSurveyQuestion = (index) => {
    const newSurveyData = [...surveyData];
    newSurveyData.splice(index, 1);
    setSurveyData(newSurveyData);
  };

  const addOption = (questionIndex) => {
    const newSurveyData = [...surveyData];
    newSurveyData[questionIndex].options.push("");
    setSurveyData(newSurveyData);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newSurveyData = [...surveyData];
    newSurveyData[questionIndex].options.splice(optionIndex, 1);
    setSurveyData(newSurveyData);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newSurveyData = [...surveyData];
    newSurveyData[questionIndex].options[optionIndex] = value;
    setSurveyData(newSurveyData);
  };

  const submitSurvey = () => {
    setSubmittedData(surveyData);
    console.log("Submitted Survey Data:", surveyData);
    // You can add logic to display the survey results or send them to a server
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <button onClick={() => addSurveyQuestion("radio")}>
          Add Radio Survey
        </button>
        {/* ... (other buttons) */}
      </div>

      {surveyData.map((question, index) => (
        <div key={index}>
          <p>{`Question ${index + 1} - Type: ${question.type}`}</p>
          <input
            type="text"
            placeholder="Enter question title"
            value={question.title}
            onChange={(e) => {
              const newSurveyData = [...surveyData];
              newSurveyData[index].title = e.target.value;
              setSurveyData(newSurveyData);
            }}
          />

          {question.type === "radio" && (
            <div>
              <p>Options:</p>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                  />
                  <button onClick={() => removeOption(index, optionIndex)}>
                    Remove Option
                  </button>
                </div>
              ))}
              <button onClick={() => addOption(index)}>Add Option</button>
            </div>
          )}
          <button onClick={() => removeSurveyQuestion(index)}>
            Remove Question
          </button>
        </div>
      ))}

      <div className="flex w-2/3 flex-col space-y-8 rounded-md border  border-gray-400 dark:bg-[#1c2446]  p-5 ">
        <h1 className="text-md  font-medium tracking-widest text-gray-900 dark:text-gray-100">
          Airdrop Tasks
        </h1>
        <div>
          {airdropData.tasks.map((task, index) => (
            <div className="flex space-x-5" key={index}>
              <InputField
                label="Task Link"
                name="tasklink"
                placeholder=" "
                value={task.tasklink}
                onChange={(e: any) => handleTaskChange(e, index)}
              />
              <InputField
                label="Task Description"
                name="taskdescription"
                placeholder=" "
                value={task.taskdescription}
                onChange={(e: any) => handleTaskChange(e, index)}
              />

              <button
                type="button"
                onClick={() => handleRemoveTask(index)}
                className="rounded-full bg-none hover:bg-gray-100 hover:dark:bg-gray-500 text-xl w-max p-2"
              >
                <IoMdRemoveCircleOutline className="text-black dark:text-white" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTask}
            className="rounded-full bg-none hover:bg-gray-100 hover:dark:bg-gray-500 text-xl w-max p-2"
          >
            <IoAddCircleOutline className="text-black dark:text-white" />
          </button>
        </div>
      </div>

      <button onClick={submitSurvey}>Submit Survey</button>

      {submittedData && (
        <div>
          <h2>Submitted Survey Data</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SurveyPage;
