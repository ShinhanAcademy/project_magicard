import React from "react";
import "./PurposeSelect.css";

interface SelectProps {
  purList: { purposeCategory: string }[];
  initialValue?: string;
  propsname: string;
  setSelectedValue: (value: string) => void;
  setInputValues: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  inputValues: { [key: string]: string };
}

const PurposeSelect: React.FC<SelectProps> = ({
  purList,
  initialValue,
  propsname,
  setSelectedValue,
  setInputValues,
  inputValues,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedValue(selectedValue); // 선택된 값을 업데이트합니다.
    setInputValues({ ...inputValues, [propsname]: selectedValue }); // 선택된 값을 inputValues에 업데이트합니다.
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
