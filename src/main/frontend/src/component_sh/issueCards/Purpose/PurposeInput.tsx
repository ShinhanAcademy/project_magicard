// PurposeInput.tsx
import React from "react";

interface InputProps {
  propsname: string;
  getResult: (obj: { [key: string]: string }) => void;
  initialValue?: string;
}

const PurposeInput: React.FC<InputProps> = ({ propsname, getResult, initialValue }) => {
  const [inputValue, setInputValue] = React.useState(initialValue || "");

  React.useEffect(() => {
    setInputValue(initialValue || "");
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    getResult({ [propsname]: value });
  };

  return (
    <input className="purpose-input" name={propsname} value={inputValue} onChange={handleChange} />
  );
};

export default PurposeInput;
