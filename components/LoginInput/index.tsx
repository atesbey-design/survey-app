import React, { ReactNode, ChangeEvent, MouseEvent } from "react";

interface GenericInputProps {
  label: string;
  id: string;
  placeholder: string;
  icon?: ReactNode;
  value?: string;
  inputType?: string;
  onChange?: (value: string) => void;
  onIconClick?: (event: MouseEvent<HTMLDivElement>) => void; // Yeni eklenen prop
}

const GenericInput = ({
  label,
  id,
  placeholder,
  icon,
  value,
  inputType = "text",
  onChange,
  onIconClick,
}: GenericInputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-900 ">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div
            className="absolute  inset-y-0 start-0 z-50 flex items-center ps-3.5  cursor-pointer"
            onClick={onIconClick}
          >
            {icon}
          </div>
        )}
        <input
          type={inputType}
          id={id}
          className="border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600  dark:text-white "
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default GenericInput;
