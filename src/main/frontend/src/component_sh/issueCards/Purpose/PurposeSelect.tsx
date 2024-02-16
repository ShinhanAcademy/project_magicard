import React from "react";
import "./PurposeSelect.css";
interface SelectProps {
  purList: { purposeCategory: string }[];
  initialValue?: string;
  propsname: string;
  setSelectValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedValue: (value: string) => void;
  setInputValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  inputValues: { [key: string]: string };
}

const PurposeSelect: React.FC<SelectProps> = ({
  purList,
  initialValue,
  propsname,
  setSelectValue,
  setSelectedValue,
  setInputValues,
  inputValues,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectValue(selectedValue);
    setSelectedValue(selectedValue);
    setInputValues({ ...inputValues, [propsname]: selectedValue }); // inputValues 업데이트
  };

  return (
    <select
      name={propsname}
      value={initialValue}
      onChange={handleChange}
      className="purpose-select"
    >
      {purList.map((item, index) => (
        <option key={index} value={item.purposeCategory}>
          {item.purposeCategory}
        </option>
      ))}
    </select>
  );
};

export default PurposeSelect;
