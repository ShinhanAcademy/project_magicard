/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import axios from "axios";
import SoftBox from "components/SoftBox";
import Select from "react-select";
import { useEffect, useState } from "react";

function EmployeesFiltering(props) {
  const [deptList, setDeptList] = useState([]);
  const [rankSelect, setRankSelect] = useState(null);
  const [deptSelect, setDeptSelect] = useState(null);
  const [authoritySelect, setAuthoritySelect] = useState(null);

  console.log("EmployeesFiltering", props.filter);

  const getDepartments = () => {
    axios
      .get("/department/listall")
      .then((response) => {
        if (response.data != "") {
          setDeptList(response.data);
        }
        console.log("부서들.." + response.data[1]);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getDepartments();
    console.log("deptList : ", deptList);
  }, []);

  const rank = [
    { value: "임원", label: "임원" },
    { value: "부장", label: "부장" },
    { value: "대리", label: "대리" },
    { value: "사원", label: "사원" },
    { value: "인턴", label: "인턴" },
  ];

  const authority = [
    { value: "일반", label: "일반" },
    { value: "관리자", label: "관리자" },
  ];

  const customStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#A9B1BE",
        fontSize: "medium",
        fontWeight: "regular",
      };
    },
    option: (provided, state) => ({
      ...provided,
      // border: "1px dotted black",
      // color: state.data.color,
      fontSize: "medium",
    }),
    control: (provided, state) => ({
      ...provided,
      paddingLeft: "5px",
      borderRadius: "10px",
      borderColor: state.isFocused ? "#35D1F5" : "#d2d6da",
      boxShadow: state.isFocused ? "0 0 0 2px #81E3F9" : "none",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: "medium",
    }),
  };

  return (
    <>
      <SoftBox mt={1} mb={5}>
        <Select
          styles={customStyles}
          sx={{ fontSize: "small" }}
          placeholder="직급 선택"
          options={rank}
          onChange={(e) => {
            setRankSelect(e.value);
          }}
        />
      </SoftBox>
      <SoftBox mt={1} mb={5}>
        <Select
          styles={customStyles}
          sx={{ fontSize: "small" }}
          placeholder="권한 선택"
          options={authority}
          onChange={(e) => {
            setAuthoritySelect(e.value);
          }}
        />
      </SoftBox>
      <SoftBox mt={1} mb={5}>
        <Select
          styles={customStyles}
          sx={{ fontSize: "small" }}
          placeholder="부서 선택"
          options={deptList}
          onChange={(e) => {
            setDeptSelect(e.value);
          }}
        />
      </SoftBox>
    </>
  );
}

export default EmployeesFiltering;
