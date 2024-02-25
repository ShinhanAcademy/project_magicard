import React, { useEffect, useState } from "react";
import "./requestModal.css";
import axios from "axios";
import checkImg from "assets/images/request_img/checkmodal.png";
import cardImg from "assets/images/request_img/card.png";
import clockImg from "assets/images/request_img/clock.png";
import joinImg from "assets/images/request_img/join.png";
import penImg from "assets/images/request_img/pen.png";
import picImg from "assets/images/request_img/pic.png";
import purposeImg from "assets/images/request_img/purpose.png";
import shopImg from "assets/images/request_img/shop.png";

const CheckContext = ({ isOpen, closeModal, selectedId }) => {
  const [requestInfo, setRequestInfo] = useState(null);
  const [purposeItem, setPurposeItem] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [preImg, setPreImg] = useState("");

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
        url: `/requests/requestInfo/bySelectedId/${selectedId}`,
      })
        .then((result) => {
          console.log(result.data);
          setRequestInfo(result.data);
          setSelectedPurpose(result.data.purposeItem.purposeItemUid);
          setPreImg(result.data.receiptUrl);
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

  if (!isOpen || !requestInfo || !purposeItem) return null;

  const paymentDate = requestInfo.paymentInfo.paymentTime.substr(0, 10);
  const paymentTimeArray = requestInfo.paymentInfo.paymentTime.substr(11, 11).split("").slice(0, 5);
  const paymentTime = paymentDate + " " + paymentTimeArray.join("");
  const payAmount = requestInfo.paymentInfo.payAmount.toLocaleString();

  return (
    <div className={isOpen ? "openModal pop" : "pop"}>
      <div className="modal-content">
        {requestInfo.refuseMessage && (
          <>
            <div style={{ color: "red" }}>반려 사유 : {requestInfo.refuseMessage}</div>
            <br />
          </>
        )}
        <div className="modal-title">
          <div className="modal-title-img">
            <img src={checkImg}></img>
            <div>
              <h1>결재 확인</h1>
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
            <input value={paymentTime} readOnly />
          </div>
          <div className="modal-item">
            <div className="modal-input">
              <img src={cardImg} />
              사용금액
              <span className="ness"> * </span>
            </div>
            <input value={payAmount + "원"} readOnly style={{ color: "red" }} />
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
            {purposeItem.map(
              (purpose) =>
                selectedPurpose === purpose.purposeItemUid && (
                  <input
                    key={purpose.purposeItemUid}
                    type="text"
                    value={`${purpose.purposeCategory || ""} || ${purpose.purposeItem}`}
                    readOnly
                  />
                )
            )}
          </div>
          <div className="modal-item">
            <div className="modal-input">
              <img src={joinImg} />
              참석자
              <span className="ness"> * </span>
            </div>
            <input value={requestInfo.participant || ""} readOnly />
          </div>
          <div className="modal-item">
            <div className="modal-input">
              <img src={picImg} />
              영수증 &nbsp; &nbsp;
            </div>
            {preImg && <img className="preview" alt={preImg} src={preImg} />}
            {!preImg && <input value="선택된 사진이 없습니다." readOnly />}
          </div>
          <div className="modal-item">
            <div className="modal-input">
              <img src={penImg} />
              메모 &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            </div>
            <div>
              <textarea className="inputbox" readOnly>
                {requestInfo.memo}
              </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckContext;
