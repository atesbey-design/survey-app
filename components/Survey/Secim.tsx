"use client";
import React, { useState } from "react";

const Anket: React.FC = () => {
  const [secimler, setSecimler] = useState<string[]>([]);

  const handleSecim = (secim: string) => {
    if (secimler.includes(secim)) {
      setSecimler(secimler.filter((item) => item !== secim));
    } else {
      setSecimler([...secimler, secim]);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Anket</h1>
      <div className="flex flex-col">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Seçenek 1
          </label>
          <input
            type="checkbox"
            onChange={() => handleSecim("secenek1")}
            checked={secimler.includes("secenek1")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Seçenek 2
          </label>
          <input
            type="checkbox"
            onChange={() => handleSecim("secenek2")}
            checked={secimler.includes("secenek2")}
          />
        </div>
      </div>
    </div>
  );
};

export default Anket;
