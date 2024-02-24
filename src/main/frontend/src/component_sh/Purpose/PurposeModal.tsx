import React, { useState, useEffect } from "react";
import "./PurposeModal.css";
import axios from "axios";
import PurposeInput from "./PurposeInput";
import PurposeSelect from "./PurposeSelect";
import purposeImg from "assets/images/purpose_img/purposeImg.png";
import submitbtn from "assets/images/purpose_img/purposeInsertBtn.png";

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

    // purposeCategory와 purposeItem이 존재하는지 확인하고, 앞뒤 공백 제거
    const trimmedPurposeCategory = inputValues.purposeCategory
      ? inputValues.purposeCategory.trim()
      : "";
    const trimmedPurposeItem = inputValues.purposeItem ? inputValues.purposeItem.trim() : "";

    // 입력값이 공백인지 확인
    if (trimmedPurposeCategory === "" || trimmedPurposeItem === "") {
      alert("값을 입력하세요.");
      return;
    }

    axios({
      method: "post",
      url: "/pur/insert",
      data: {
        purposeCategory: trimmedPurposeCategory || selectedCategory,
        purposeItem: trimmedPurposeItem,
      },
    })
      .then((res) => {
        if (res.data != "success") {
          const dpcateory = res.data;
          alert(`추가하는 항목이 상위 항목  "${dpcateory}" 에 중복되어있습니다(추가 실패). `);
        } else {
          alert("성공");
          loadListData();
        }
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
    <div className="openModal">
      <div className="container">
        <div className="modal-title">
          <div className="modal-title-img">
            <img src={purposeImg}></img>
            <div>
              <h1>항목 추가</h1>
              <p> 새로운 항목을 추가해보세요! </p>
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
        <hr />
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
          <div className="category-div">
            <p> 추가 지출 항목(상위)</p>
            <p className="category-div-detail">
              <span> *</span>기존 항목에 없는 항목을 입력할 수 있습니다.
            </p>
            <PurposeInput
              propsname="purposeCategory"
              getResult={getResult}
              initialValue={selectedCategory}
            />
          </div>
          <div>
            <p> 추가 지출 항목(하위)</p>
            <PurposeInput propsname="purposeItem" getResult={getResult} />
          </div>
          <button className="submitButton" type="submit">
            <img src={submitbtn} />
            {/* 등록하기 */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PurposeModal;
