"use client";
import Modal from "@/components/Modal";
import Radio from "@/components/Survey/Radio";
import RatingComponent from "@/components/Survey/Rating";
import Backend from "@/data/Backend";
import React, { useEffect, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";

const SurveyPage: React.FC = ({ params }: any) => {
  const [editableRadio, setEditableRadio] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [surveyData, setSurveyData] = useState<any>({
    title: "anket1",
    description: "denemee",
    questions: [],
  });
  const id = params.id;

  console.log(surveyData);
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const surveyData = await Backend.Survey.getSurveyById(id);

        // Map the API data to the format expected by your component
        const mappedSurveyData = {
          title: surveyData.survey.survey_title,
          description: surveyData.survey.survey_description,
          questions: surveyData.survey.questions.map((question: any) => {
            if (question.survey_types === "radio") {
              // Map radio type question
              return {
                survey_types: "radio",
                title: question.title,
                questions: [
                  {
                    options: question.options.map((option: any) => ({
                      label: option.label,
                      value: option.value,
                    })),
                  },
                ],
              };
            } else if (question.survey_types === "rating") {
              // Map rating type question
              return {
                survey_types: "rating",
                title: question.title,
                questions: [
                  {
                    options: [
                      {
                        minValue: question.options[0].minValue,
                        maxValue: question.options[0].maxValue,
                      },
                    ],
                  },
                ],
              };
            } else if (question.survey_types === "selection") {
              // Map selection type question
              return {
                survey_types: "selection",
                title: question.title,
                questions: [
                  {
                    options: question.options.map((option: any) => option),
                  },
                ],
              };
            }

            // Add more conditions as needed for other question types

            return null; // Default case
          }),
        };

        setSurveyData(mappedSurveyData);
      } catch (error) {
        console.error("Error fetching survey:", error);
      }
    };

    fetchSurveys();
  }, [id]);
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const surveyData = await Backend.Survey.getSurveyById(id);
        const mappedSurveyData = {
          title: surveyData.survey.survey_title,
          description: surveyData.survey.survey_description,
          questions: surveyData.survey.questions.map((question: any) => {
            if (question.survey_types === "radio") {
              // Map radio type question
              return {
                survey_types: "radio",
                title: question.title,
                questions: [
                  {
                    options: question.options.map((option: any) => ({
                      label: option.label,
                      value: option.value,
                    })),
                  },
                ],
              };
            } else if (question.survey_types === "rating") {
              // Map rating type question
              return {
                survey_types: "rating",
                title: question.title,
                questions: [
                  {
                    options: [
                      {
                        minValue: question.options[0].minValue,
                        maxValue: question.options[0].maxValue,
                      },
                    ],
                  },
                ],
              };
            } else if (question.survey_types === "selection") {
              return {
                survey_types: "selection",
                title: question.title,
                questions: [
                  {
                    options: question.options.map((option: any) => option),
                  },
                ],
              };
            }

            return null; // Default case
          }),
        };

        setSurveyData(mappedSurveyData);
      } catch (error) {
        console.error("Error fetching survey:", error);
      }
    };

    fetchSurveys();
  }, [id]);

  if (!surveyData) {
    return (
      <div className="  w-full items-center justify-center">
        <div>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  console.log(surveyData);

  const addTextInputSurvey = () => {
    const newTextInputSurvey = {
      survey_types: "input",
      title: "",
      questions: [],
    };

    setSurveyData({
      ...surveyData,
      questions: [...surveyData.questions, newTextInputSurvey],
    });

    setEditableRadio(surveyData.questions.length);
  };

  const handleTextInputTitleChange = (index: number, value: string) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[index].title = value;
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const handleTextInputDescriptionChange = (index: number, value: string) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[index].description = value;
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const addSelectionSurvey = () => {
    const newSelectionSurvey = {
      survey_types: "selection",
      title: "",
      questions: [
        {
          title: "",
          options: [],
        },
      ],
    };

    setSurveyData({
      ...surveyData,
      questions: [...surveyData.questions, newSelectionSurvey],
    });

    setEditableRadio(surveyData.questions.length);
  };

  const handleSelectionOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[questionIndex].questions[0].options[optionIndex] = value;
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const handleAddSelectionOption = (index: number) => {
    const updatedQuestions = [...surveyData.questions];
    const newOption = `Option ${
      updatedQuestions[index].questions[0].options.length + 1
    }`;
    updatedQuestions[index].questions[0].options.push(newOption);
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const handleDeleteSelectionOption = (
    questionIndex: number,
    optionIndex: number
  ) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[questionIndex].questions[0].options.splice(optionIndex, 1);
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const handleDeleteSelectionSurvey = (index: number) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions.splice(index, 1);
    setSurveyData({ ...surveyData, questions: updatedQuestions });
    setEditableRadio(null);
  };

  const addRadioSurvey = () => {
    const newRadioSurvey = {
      survey_types: "radio",
      title: "",
      questions: [
        {
          title: "",
          options: [{}],
        },
      ],
    };

    setSurveyData({
      ...surveyData,
      questions: [...surveyData.questions, newRadioSurvey],
    });

    setEditableRadio(surveyData.questions.length);
  };

  const handleRadioTitleChange = (index: number, value: string) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[index].title = value;
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const handleRadioOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[questionIndex].questions[0].options[optionIndex].label =
      value;
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const handleAddRadioOption = (index: number) => {
    const updatedQuestions = [...surveyData.questions];
    const newOption = {
      label: `Option ${
        updatedQuestions[index].questions[0].options.length + 1
      }`,
      value: `option${updatedQuestions[index].questions[0].options.length + 1}`,
    };
    updatedQuestions[index].questions[0].options.push(newOption);
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const handleDeleteRadioOption = (
    questionIndex: number,
    optionIndex: number
  ) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[questionIndex].questions[0].options.splice(optionIndex, 1);
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const handleDeleteRadioSurvey = (index: number) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions.splice(index, 1);
    setSurveyData({ ...surveyData, questions: updatedQuestions });
    setEditableRadio(null);
  };

  const handleToggleEditableRadio = (index: number) => {
    setEditableRadio(editableRadio === index ? null : index);
  };

  const addRatingSurvey = () => {
    const newRatingSurvey = {
      survey_types: "rating",
      title: "",
      questions: [
        {
          title: "",
          options: [
            {
              minValue: "",
              maxValue: "",
            },
          ],
        },
      ],
    };

    setSurveyData({
      ...surveyData,
      questions: [...surveyData.questions, newRatingSurvey],
    });

    setEditableRadio(surveyData.questions.length);
  };

  const handleRatingMinValueChange = (questionIndex: number, value: string) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[questionIndex].questions[0].options[0].minValue = value;
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const handleRatingMaxValueChange = (questionIndex: number, value: string) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[questionIndex].questions[0].options[0].maxValue = value;
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const handleUpdateSurvey = async () => {
    if (isSubmitting) {
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await Backend.Survey.updateSurvey(surveyData, id);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex justify-between items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addRadioSurvey()}
        >
          Add Radio Survey
        </button>
        <button
          onClick={() => addRatingSurvey()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Rating Survey
        </button>
        <button
          onClick={() => addSelectionSurvey()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Selection Survey
        </button>
        <button
          onClick={() => addTextInputSurvey()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Text Input Survey
        </button>
      </div>
      <div className="">
        {surveyData.questions.map((question: any, index: number) => (
          <div key={index} className="my-4">
            {question.survey_types === "radio" && (
              <div>
                {editableRadio === index ? (
                  <div>
                    <input
                      className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      type="text"
                      placeholder="Enter question title"
                      value={question.title}
                      onChange={(e) =>
                        handleRadioTitleChange(index, e.target.value)
                      }
                    />
                    {question.questions[0].options.map(
                      (option: any, optionIndex: number) => (
                        <div
                          key={optionIndex}
                          className="mt-2 flex items-center"
                        >
                          <input
                            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent flex-1"
                            type="text"
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option.label}
                            onChange={(e) =>
                              handleRadioOptionChange(
                                index,
                                optionIndex,
                                e.target.value
                              )
                            }
                          />
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                            onClick={() =>
                              handleDeleteRadioOption(index, optionIndex)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      )
                    )}
                    <div className="mt-2">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleAddRadioOption(index)}
                      >
                        Add Option
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleToggleEditableRadio(index)}
                      >
                        Done Editing
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {question.title && (
                      <p className="text-lg font-bold">{question.title}</p>
                    )}
                    {question.questions[0].options.map(
                      (option: any, optionIndex: number) => (
                        <div
                          key={optionIndex}
                          className="mt-2 flex items-center"
                        >
                          <Radio
                            id={`${index}_${optionIndex}`}
                            value={option.value}
                            name={`question_${index}`}
                            label={option.label}
                          />
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                            onClick={() =>
                              handleDeleteRadioOption(index, optionIndex)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      )
                    )}
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
                      onClick={() => handleToggleEditableRadio(index)}
                    >
                      Edit
                    </button>
                    <div className="mt-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteRadioSurvey(index)}
                      >
                        Delete Survey
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {question.survey_types === "rating" && (
              <div>
                {editableRadio === index ? (
                  <div>
                    <input
                      className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      type="text"
                      placeholder="Enter question title"
                      value={question.title}
                      onChange={(e) =>
                        handleRadioTitleChange(index, e.target.value)
                      }
                    />
                    <div className="mt-2 flex items-center">
                      <label className="mr-2">Min Value:</label>
                      <input
                        className="border text-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        type="string"
                        value={question.questions[0].options[0].minValue}
                        onChange={(e) =>
                          handleRatingMinValueChange(index, e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-2 flex items-center">
                      <label className="mr-2">Max Value:</label>
                      <input
                        className="border text-black trounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        type="string"
                        value={question.questions[0].options[0].maxValue}
                        onChange={(e) =>
                          handleRatingMaxValueChange(index, e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleToggleEditableRadio(index)}
                      >
                        Done Editing
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <RatingComponent
                      minValue={question.questions[0].options[0].minValue}
                      maxValue={question.questions[0].options[0].maxValue}
                      title={question.title}
                    />
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
                      onClick={() => handleToggleEditableRadio(index)}
                    >
                      Edit
                    </button>
                    <div className="mt-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteRadioSurvey(index)}
                      >
                        Delete Survey
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {question.survey_types === "selection" && (
              <div>
                {editableRadio === index ? (
                  <div>
                    <input
                      className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      type="text"
                      placeholder="Enter question title"
                      value={question.title}
                      onChange={(e) =>
                        handleRadioTitleChange(index, e.target.value)
                      }
                    />
                    {question.questions[0].options.map(
                      (option: any, optionIndex: number) => (
                        <div
                          key={optionIndex}
                          className="mt-2 flex items-center"
                        >
                          <input
                            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent flex-1"
                            type="text"
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) =>
                              handleSelectionOptionChange(
                                index,
                                optionIndex,
                                e.target.value
                              )
                            }
                          />
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                            onClick={() =>
                              handleDeleteSelectionOption(index, optionIndex)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      )
                    )}
                    <div className="mt-2">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleAddSelectionOption(index)}
                      >
                        Add Option
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleToggleEditableRadio(index)}
                      >
                        Done Editing
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {question.title && (
                      <p className="text-lg font-bold">{question.title}</p>
                    )}
                    {question.questions[0].options.map(
                      (option: any, optionIndex: number) => (
                        <div
                          key={optionIndex}
                          className="mt-2 flex items-center"
                        >
                          <input type="checkbox" />
                          <span>{option}</span>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                            onClick={() =>
                              handleDeleteSelectionOption(index, optionIndex)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      )
                    )}
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
                      onClick={() => handleToggleEditableRadio(index)}
                    >
                      Edit
                    </button>
                    <div className="mt-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteSelectionSurvey(index)}
                      >
                        Delete Survey
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {question.surve_types === "text_input" && (
              <div>
                {editableRadio === index ? (
                  <div>
                    <input
                      className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      type="text"
                      placeholder="Enter question title"
                      value={question.title}
                      onChange={(e) =>
                        handleTextInputTitleChange(index, e.target.value)
                      }
                    />
                    <textarea
                      className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent mt-2"
                      placeholder="Enter question description"
                      value={question.description}
                      onChange={(e) =>
                        handleTextInputDescriptionChange(index, e.target.value)
                      }
                    />
                    <div className="mt-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleToggleEditableRadio(index)}
                      >
                        Done Editing
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {question.title && (
                      <p className="text-lg font-bold">{question.title}</p>
                    )}
                    {question.description && (
                      <textarea
                        className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent mt-2"
                        placeholder="Enter question description"
                        value={question.description}
                      />
                    )}
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
                      onClick={() => handleToggleEditableRadio(index)}
                    >
                      Edit
                    </button>
                    <div className="mt-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteRadioSurvey(index)}
                      >
                        Delete Survey
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleUpdateSurvey()}
      >
        Submit
      </button>
    </div>
  );
};

export default SurveyPage;
