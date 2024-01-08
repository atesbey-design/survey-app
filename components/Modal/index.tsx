"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React, { useState } from "react";
import { SelectComponents } from "../Select";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupComponents } from "../Radio";
import AddRadio from "../RadioContainer/AddRadio";

const Modal = () => {
  const [selectedSurveyType, setSelectedSurveyType] = useState(null);
  const handleSelectChange = (value: any) => {
    setSelectedSurveyType(value);
  };
  console.log(selectedSurveyType);

  const renderModalContent = () => {
    switch (selectedSurveyType) {
      case "radio":
        return <div>k</div>;
      case "rating":
        return <div>Render Rating Component Here</div>;
      // Handle other types as needed
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Survey Question</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Survey Type</DialogTitle>

            <SelectComponents handleSelectChange={handleSelectChange} />
          </DialogHeader>
          <div>{renderModalContent()}</div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
