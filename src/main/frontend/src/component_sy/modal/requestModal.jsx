import cardImg from "assets/images/request_img/card.png";
import clockImg from "assets/images/request_img/clock.png";
import joinImg from "assets/images/request_img/join.png";
import penImg from "assets/images/request_img/pen.png";
import picImg from "assets/images/request_img/pic.png";
import purposeImg from "assets/images/request_img/purpose.png";
import receiptImg from "assets/images/request_img/reciept.png";
import refresh from "assets/images/request_img/refresh.png";
import shopImg from "assets/images/request_img/shop.png";
import submitbtn from "assets/images/request_img/submitbtn.png";
import axios from "axios";
import { useEffect, useState } from "react";
import "./requestModal.css";

const RequestContext = ({ isOpen, closeModal, selectedPaymentId }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [purposeItem, setPurposeItem] = useState([]);
  const [optionPurposeItem, setOptionPurposeItem] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [participant, setParticipant] = useState("");
  const [postImg, setPostImg] = useState("");
  const [preImg, setPreImg] = useState("");
  const [url, setUrl] = useState("");
  const [memo, setMemo] = useState("");
  const [selectPurposeItem, setSelectPurposeItem] = useState([]); //option에서 카테코리 별 purpostitem을 알기 위한 변수

  //esc keyEvent 추가
  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (isOpen) {
      axios({
        method: "get",
        url: `/requests/paymentInfo/${selectedPaymentId}`,
      })
        .then((result) => {
          console.log(result.data);
          setPaymentInfo(result.data);
        })
        .catch((err) => {});
    }
  }, [isOpen]);

  //gpt 용도 연결
  useEffect(() => {
    if (isOpen) {
      axios({
        method: "Get",
        url: `/gpt/recommend/${selectedPaymentId}`,
      })
        .then((res) => {
          console.log("gpt id : " + selectedPaymentId);

          setPurposeItem(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isOpen]);

  // select 용도 목적, 가져오기
  useEffect(() => {
    if (isOpen) {
      axios({
        method: "get",
        url: "/pur/list",
      })
        .then((result) => {
          console.log("select 용도 확인 : " + result.data);
          setOptionPurposeItem(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isOpen]);

  // category 별 item 추출
  useEffect(() => {
    if (selectedPurpose) {
      optionPurposeItem.find(function (data) {
        if (data.purposeCategory == selectedPurpose) {
          setSelectPurposeItem(data.purposeItem);
        }
      });
    }
  }, [selectedPurpose]);

  const handlePurposeChange = (event) => {
    setSelectedPurpose(event.target.value);
  };

  const handleSubmit = () => {
    if (!optionPurposeItem) {
      alert("용도를 선택해주세요.");
      return;
    }
    const requestData = {
      requestId: 0,
      paymentId: selectedPaymentId,
      purposeItemUid: selectedPurpose.purposeItemUid,
      participant: participant,
      receiptUrl: url,
      memo: memo,
    };

    axios({
      method: "post",
      url: "requests/sendRequest",
      data: requestData,
    })
      .then((res) => {
        alert(res.data === 1 ? "요청 성공" : "요청 실패");

        closeModal();
      })
      .catch((e) => {
        console.log("error 입니다.");
      });
  };

  function uploadFile(e) {
    let file = e.target.files[0];
    setPostImg(file);

    let preview = new FileReader();
    preview.onload = function () {
      setPreImg(preview.result);
      setUrl(preview.result);
    };
    preview.readAsDataURL(file);
  }

  if (!isOpen || !paymentInfo || !purposeItem) return null;
  const paymentDate = paymentInfo.paymentTime.substr(0, 10);

  return (
    <div className={isOpen ? "openModal pop" : "pop"}>
      <div className="modal-content">
        <div className="modal-title">
          <div className="modal-title-img">
            <img src={receiptImg}></img>
            <div>
              <h1>결재 요청</h1>
              <p> 결제 정보가 자동으로 연동됩니다. 필수 정보를 모두 입력해주세요. </p>
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
        <div className="modal-main-content">
          <div className="modal-item">
            <div className="modal-input">
              <img src={clockImg} />
              결제일시
              <span className="ness"> * </span>
            </div>
            <input value={paymentDate} readOnly />
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={cardImg} />
              사용금액
              <span className="ness"> * </span>
            </div>
            <input value={paymentInfo.payAmount} readOnly />
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={shopImg} />
              사용처 <span className="ness"> * </span>&nbsp; &nbsp;
            </div>
            <input value={paymentInfo.merchant} readOnly />
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={purposeImg} />
              용도
              <span className="ness"> * </span> &nbsp; &nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            {purposeItem && (
              <SelectPurpose
                selectPurposeItem={selectPurposeItem}
                handlePurposeChange={handlePurposeChange}
                optionPurposeItem={optionPurposeItem}
                gptResult={purposeItem}
              />
            )}
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={joinImg} />
              참석자
              <span className="ness"> * </span>
            </div>{" "}
            &nbsp;&nbsp;
            <input
              placeholder="참석자를 입력하세요."
              value={participant}
              onChange={(e) => setParticipant(e.target.value)}
            />
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={picImg} />
              영수증 &nbsp; &nbsp;
            </div>
            {preImg && <img className="preview" alt={preImg} src={preImg} />}
            <input id="file-upload" type="file" onChange={uploadFile}></input>
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={penImg} />
              메모 &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            </div>
            <div>
              <textarea className="inputbox" />
            </div>
          </div>
        </div>

        <div>
          <button className="submitButton" onClick={handleSubmit}>
            <img src={submitbtn} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestContext;

const SelectPurpose = ({
  gptResult,
  optionPurposeItem,
  handlePurposeChange,
  selectPurposeItem,
}) => {
  var [ind, setInd] = useState(0);

  var selectedPurpose = gptResult[0]; //추천 초기값

  function cntInd() {
    ind++;
    setInd(ind);
    return ind;
  }

  //클릭한 경우 3번을 넘어가면 직접 입력란 활성화
  if (ind < 3) {
    selectedPurpose = gptResult[ind];
    return <Select purpose={selectedPurpose} cntInd={cntInd} />;
  } else {
    return (
      <Option
        handlePurposeChange={handlePurposeChange}
        optionPurposeItem={optionPurposeItem}
        selectPurposeItem={selectPurposeItem}
      />
    );
  }
};

const Select = ({ purpose, cntInd }) => {
  return (
    <div className="purpose-content">
      <div className="refresh-content">
        {purpose && (
          <>
            <span className="purpose-span1">{purpose.purposeCategory} </span> &nbsp;&nbsp; ||
            &nbsp;&nbsp;
            <span className="purpose-span2"> {purpose.purposeItem}</span>
          </>
        )}

        <button className="refreshBtn" onClick={cntInd}>
          <img src={refresh} />{" "}
        </button>
      </div>
      <span className="refresh-notion">
        {" "}
        * 추천 용도입니다. 최대
        <span> 3개 </span>까지 추천 받을 수 있습니다.
      </span>
    </div>
  );
};

const Option = ({ optionPurposeItem, handlePurposeChange, selectPurposeItem }) => {
  return (
    <>
      <select onChange={handlePurposeChange}>
        <option value=""> 용도를 선택하세요</option>
        {optionPurposeItem.map((purpose, ind) => (
          <option key={ind} value={purpose.purposeCategory}>
            {purpose.purposeCategory}
          </option>
        ))}
      </select>

      <select onChange={handlePurposeChange}>
        <option value=""> 세부 용도를 선택하세요</option>
        {selectPurposeItem.map((selectPurpose, ind) => (
          <option key={ind} value={selectPurpose}>
            {selectPurpose}
          </option>
        ))}
      </select>
    </>
  );
};
