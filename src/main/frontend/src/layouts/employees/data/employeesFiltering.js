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
  console.log(deptSelect);

  const getDepartments = () => {
    axios
      .get("/department/listall")
      .then((response) => {
        if (response.data != "") {
          setDeptList(response.data);
        }
        console.log("부서들..", response.data[1]);
        console.log("부서들..0", response.data[0]);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getDepartments();
    console.log("deptList..", deptList[0]);
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

  const dept = deptList.map((item) => ({
    value: item.department_id,
    label: item.department_name,
  }));

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

  function RankResult() {
    return (
      <SoftBox>
        <Select
          styles={customStyles}
          placeholder="직급 선택"
          options={rank}
          onChange={(e) => {
            setDeptSelect(null);
            setAuthoritySelect(null);
            setRankSelect(e.value);
          }}
          value={rank.filter(function (option) {
            return option.value === rankSelect;
          })}
        />
      </SoftBox>
    );
  }

  function AuthorityResult() {
    return (
      <SoftBox>
        <Select
          styles={customStyles}
          placeholder="권한 선택"
          options={authority}
          onChange={(e) => {
            setRankSelect(null);
            setDeptSelect(null);
            setAuthoritySelect(e.value);
          }}
          value={authority.filter(function (option) {
            return option.value === authoritySelect;
          })}
        />
      </SoftBox>
    );
  }

  function DeptResult() {
    return (
      <SoftBox>
        <Select
          styles={customStyles}
          placeholder="부서 선택"
          options={dept}
          onChange={(e) => {
            setRankSelect(null);
            setAuthoritySelect(null);
            setDeptSelect(e.value);
          }}
          value={dept.filter(function (option) {
            return option.value === deptSelect;
          })}
        />
      </SoftBox>
    );
  }

  return props.filter == "부서" ? (
    <DeptResult />
  ) : props.filter == "직급" ? (
    <RankResult />
  ) : props.filter == "권한" ? (
    <AuthorityResult />
  ) : null;
}

export default EmployeesFiltering;
{
  /* {activeButton == "부서" ? (
                  <DeptResult />
                ) : activeButton == "직급" ? (
                  <RankResult />
                ) : activeButton == "권한" ? (
                  <AuthorityResult />
                ) : null} */
}
