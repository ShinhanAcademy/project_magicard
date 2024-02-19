import React, { useState, useEffect } from "react";
import "./PurposeModal.css";
import axios from "axios";
import PurposeInput from "./PurposeInput";
import PurposeSelect from "./PurposeSelect";
import receiptImg from "assets/images/request_img/reciept.png";

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PurposeModal({ setModalOpen }: ModalProps): JSX.Element {
  const [purList, setPurList] = useState<{ purposeCategory: string }[]>([]);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [selectedCategory, setSelectedCategory] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    loadListData();
  }, []);

  useEffect(() => {
    if (purList.length > 0) {
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
      <div className="modal-title">
        <div className="modal-title-img">
          <img src={receiptImg}></img>
          <div>
            <h1>항목 추가</h1>
            <p> 이제 새로운 항목을 추가하거나 기존 항목을 관리할 수 있습니다. </p>
          </div>
        </div>
        <span
          className="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-fnit94-MuiIcon-root"
          aria-hidden="true"
          style={{ cursor: "pointer" }}
          onClick={closeModal}
        >
          close
        </span>
      </div>
      <form onSubmit={handleFormSubmit} className="categoryform">
        <div>
          <p>기존 지출 항목</p>
          <PurposeSelect
            propsname="selectCategory"
            purList={purList} // 선택할 수 있는 목적 카테고리의 목록을 나타냄
            initialValue={selectedCategory} // 선택 상자의 초기 값으로 사용됨
            setSelectedValue={setSelectedCategory} // 선택된 값을 업데이트하는 함수
            setInputValues={setInputValues} // 선택된 값을 inputValues 객체에 업데이트하는 함수
            inputValues={inputValues} // 다른 입력 값들을 포함하는 객체
          />
        </div>
        <div>
          <p> 추가할 지출 항목</p>
          <span> * 기존 항목에 없는 항목을 입력할 수 있습니다.</span>
          <PurposeInput
            propsname="purposeCategory"
            getResult={getResult}
            initialValue={selectedCategory}
          />
        </div>
        <div>
          <p> 추가 지출 항목</p>
          <PurposeInput propsname="purposeItem" getResult={getResult} />
        </div>
        <button className="add-btn" type="submit">
          등록하기
        </button>
      </form>
    </div>
  );
}

export default PurposeModal;
