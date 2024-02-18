// PurposeModal.tsx
import React, { useState, useEffect } from "react";
import "./PurposeModal.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import PurposeInput from "./PurposeInput";
import PurposeSelect from "./PurposeSelect";

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PurposeModal({ setModalOpen }: ModalProps): JSX.Element {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [selectValue, setSelectValue] = useState("");
  const [purList, setPurList] = useState<{ purposeCategory: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    loadListData();
  }, []);

  useEffect(() => {
    if (purList.length > 0) {
      setSelectValue(purList[0].purposeCategory);
      setSelectedCategory(purList[0].purposeCategory);
    }
  }, [purList]);

  const getResult = (obj: { [key: string]: string }) => {
    setInputValues({ ...inputValues, ...obj });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "/pur/insert",
      data: {
        purposeCategory: inputValues.purposeCategory || selectedCategory,
        purposeItem: inputValues.purposeItem,
      },
    })
      .then((res) => {
        if (res.data === 0) {
          alert("값이 중복되었습니다.");
        } else {
          alert("성공");
        }
        loadListData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = () => {
    setModalOpen(false);
    loadListData();
  };

  const loadListData = () => {
    axios({
      method: "get",
      url: "/pur/catelist",
    })
      .then((res) => {
        setPurList(res.data);
      })
      .catch((err) => {
        console.log("데이터 로드 실패");
      });
  };

  return (
    <div className="container">
      <button className="close" onClick={closeModal}>
        x
      </button>
      <p className="title"> 항목 추가 </p>
      <form onSubmit={handleFormSubmit} className="categoryform">
        <p>기존 지출 항목</p>
        <PurposeSelect
          propsname="selectCategory"
          purList={purList}
          initialValue={selectedCategory}
          setSelectValue={setSelectValue}
          setSelectedValue={setSelectedCategory}
          setInputValues={setInputValues}
          inputValues={inputValues}
        />
        <p> 추가할 대분류 지출 항목</p>
        <span> * 기존 항목에 없는 항목을 입력할 수 있습니다.</span>
        <PurposeInput
          propsname="purposeCategory"
          getResult={getResult}
          initialValue={selectedCategory}
        />
        <p> 추가할 소분류 지출 항목</p>
        <PurposeInput propsname="purposeItem" getResult={getResult} />
        <button className="add-btn" type="submit">
          등록하기
        </button>
      </form>
    </div>
  );
}

export default PurposeModal;
