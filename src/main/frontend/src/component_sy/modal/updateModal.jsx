import React, { useEffect, useState } from "react";
import "./requestModal.css";
import axios from "axios";
import receiptImg from "assets/images/request_img/updatemodal.png";
import cardImg from "assets/images/request_img/card.png";
import clockImg from "assets/images/request_img/clock.png";
import joinImg from "assets/images/request_img/join.png";
import penImg from "assets/images/request_img/pen.png";
import picImg from "assets/images/request_img/pic.png";
import purposeImg from "assets/images/request_img/purpose.png";
import shopImg from "assets/images/request_img/shop.png";
import submitbtn from "assets/images/request_img/submitbtn.png";

const UpdateContext = ({ isOpen, closeModal, selectedPaymentId }) => {
  const [requestInfo, setRequestInfo] = useState(null);
  const [purposeItem, setPurposeItem] = useState([]);
  const [requestId, setRequestId] = useState(0);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [participant, setParticipant] = useState("");
  const [postImg, setPostImg] = useState("");
  const [preImg, setPreImg] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [memo, setMemo] = useState("");

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
        url: `/requests/requestInfo/${selectedPaymentId}`,
      })
        .then((result) => {
          console.log(result.data);
          setRequestInfo(result.data);
          setSelectedPurpose(result.data.purposeItem.purposeItemUid);
          setRequestId(result.data.requestId);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      axios({
        method: "get",
        url: "/purpose/getList",
      })
        .then((result) => {
          console.log(result.data);
          setPurposeItem(result.data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!selectedPurpose) {
      alert("용도를 선택해주세요.");
      return;
    }

    const requestData = {
      requestId: requestId,
      paymentId: selectedPaymentId,
      purposeItemUid: selectedPurpose.purposeItemUid,
      participant: participant,
      receiptUrl: receiptUrl,
      memo: memo,
    };

    axios({
      method: "post",
      url: "requests/updateRequest",
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
      setReceiptUrl(preview.result);
    };
    preview.readAsDataURL(file);
  }

  const handlePurposeChange = (event) => {
    const selectedPurposeItemUid = event.target.value;
    const selectedPurpose = purposeItem.find(
      (purpose) => purpose.purposeItemUid === parseInt(selectedPurposeItemUid)
    );
    setSelectedPurpose(selectedPurpose);
  };

  if (!isOpen || !requestInfo || !purposeItem) return null;

  const paymentDate = requestInfo.paymentInfo.paymentTime.substr(0, 10);

  return (
    <div className={isOpen ? "openModal pop" : "pop"}>
      <div className="modal-content">
        <div>반려 사유 : {requestInfo.refuseMessage}</div>
        <div className="modal-title">
          <div className="modal-title-img">
            <img src={receiptImg}></img>
            <div>
              <h1>결재 요청</h1>
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
            <input value={requestInfo.paymentInfo.payAmount} readOnly />
          </div>
          <div className="modal-item">
            <div className="modal-input">
              <img src={shopImg} />
              사용처 <span className="ness"> * </span>&nbsp; &nbsp;
            </div>
            <input value={requestInfo.paymentInfo.merchant} readOnly />
          </div>
          <div className="modal-item">
            <div className="modal-input">
              <img src={purposeImg} />
              용도
              <span className="ness"> * </span> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            </div>
            <select
              value={selectedPurpose ? selectedPurpose.purposeItemUid : ""}
              onChange={handlePurposeChange}
            >
              {purposeItem.map((purpose) => (
                <option
                  key={purpose.purposeItemUid}
                  value={purpose.purposeItemUid}
                  selected={selectedPurpose === purpose.purposeItemUid ? "selected" : ""}
                >
                  {purpose.purposeCategory} || {purpose.purposeItem}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-item">
            <div className="modal-input">
              <img src={joinImg} />
              참석자
              <span className="ness"> * </span>
            </div>
            <input
              placeholder="참석자를 입력하세요."
              value={requestInfo.participant}
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
              메모 &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
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

export default UpdateContext;
