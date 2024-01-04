import React from "react";
import Survey from "./Survey";

const SurveyPage = () => {
  const questions = ["Soru 1", "Soru 2", "Soru 3"]; // İstediğiniz soruları buraya ekleyin

  return (
    <div>
      <h1>Anket Uygulaması</h1>
      <Survey questions={questions} />
    </div>
  );
};

export default SurveyPage;
