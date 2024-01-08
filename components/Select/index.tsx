"use client";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectComponents({ handleSelectChange }: any) {
  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Questions</SelectLabel>
          <SelectItem value="radio">Radio</SelectItem>
          <SelectItem value="rating">Rating</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
