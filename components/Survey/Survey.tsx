"use client";
import React, { useState } from "react";

interface SurveyProps {
  questions: string[];
}

const Survey: React.FC<SurveyProps> = ({ questions }) => {
  const [responses, setResponses] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = event.target.value;
    setResponses(newResponses);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Tüm soruları cevapladıysak, burada anketi tamamlama işlemlerini ekleyebilirsiniz.
      console.log("Anket tamamlandı. Cevaplar:", responses);
    }
  };

  return (
    <div>
      <h2>{questions[currentQuestionIndex]}</h2>
      <input
        type="text"
        value={responses[currentQuestionIndex] || ""}
        onChange={handleResponseChange}
      />
      <button onClick={handleNextQuestion}>Sonraki Soru</button>
    </div>
  );
};

export default Survey;
