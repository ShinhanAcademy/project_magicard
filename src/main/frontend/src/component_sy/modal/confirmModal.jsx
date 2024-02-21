import React, { useEffect, useState } from "react";
import "./requestModal.css";
import axios from "axios";
import refuseImg from "assets/images/request_img/refuse.png";
import approveImg from "assets/images/request_img/approve.png";
import receiptImg from "assets/images/request_img/reciept.png";
import cardImg from "assets/images/request_img/card.png";
import clockImg from "assets/images/request_img/clock.png";
import joinImg from "assets/images/request_img/join.png";
import penImg from "assets/images/request_img/pen.png";
import picImg from "assets/images/request_img/pic.png";
import purposeImg from "assets/images/request_img/purpose.png";
import shopImg from "assets/images/request_img/shop.png";
import refuseSubmitImg from "assets/images/request_img/refuseSubmit.png";

const ConfirmContext = ({ isOpen, closeModal, selectedPaymentId }) => {
  const [requestInfo, setRequestInfo] = useState(null);
  const [purposeItem, setPurposeItem] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [refuseMessage, setRefuseMessage] = useState(null);
  const [showRejectReasonInput, setShowRejectReasonInput] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setShowRejectReasonInput(false);
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
          setReceiptUrl(result.data.requestInfo.receiptUrl);
        })
        .catch((err) => {});
    }
  }, [isOpen]);

  // 용도 목적, 가져오기
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
        .catch((err) => {});
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (confirm("승인하시겠습니까?")) {
      axios({
        method: "post",
        url: "requests/sendToFinanceDept",
        data: requestInfo,
      })
        .then((res) => {
          console.log(res.data === 1 ? "승인 성공" : "승인 실패");
          setShowRejectReasonInput(false);
          closeModal();
        })
        .catch((e) => {
          console.log("error 입니다.");
        });
    }
  };

  const handleRefuseSubmit = () => {
    if (!refuseMessage) {
      alert("반려 사유를 작성해주세요!");
    }
    if (refuseMessage && confirm("반려하시겠습니까?")) {
      axios({
        method: "post",
        url: "requests/refuseRequest",
        data: {
          requestId: requestInfo.requestId,
          refuseMessage: refuseMessage,
        },
      })
        .then((res) => {
          console.log(res.data);
          console.log(res.data === 1 ? "반려 성공" : "반려 실패");
          setShowRejectReasonInput(false);
          closeModal();
        })
        .catch((err) => {
          console.log("에러 발생 : ", err);
        });
    }
  };

  if (!isOpen || !requestInfo || !purposeItem) return null;
  const paymentDate = requestInfo.paymentInfo.paymentTime.substr(0, 10);

  return (
    <div className={isOpen ? "openModal pop" : "pop"}>
      <div className="modal-content">
        <div className="modal-title">
          <div className="modal-title-img">
            <img src={receiptImg}></img>
            <div>
              <h1>결재 확인</h1>
            </div>
          </div>
          <span
            className="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-fnit94-MuiIcon-root"
            aria-hidden="true"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowRejectReasonInput(false);
              closeModal();
            }}
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
            {receiptUrl && <img className="preview" alt={receiptUrl} src={receiptUrl} />}
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={penImg} />
              메모 &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            </div>
            <div>
              <textarea className="inputbox">{requestInfo.memo}</textarea>
            </div>
          </div>

          {showRejectReasonInput && (
            <div className="modal-item">
              <div className="modal-input">
                <img src={penImg} />
                반려 사유
                <span className="ness"> * </span>
              </div>
              <div>
                <textarea
                  className="refuseIputbox"
                  onChange={(e) => setRefuseMessage(e.target.value)}
                >
                  {refuseMessage}
                </textarea>
              </div>
            </div>
          )}
        </div>
        <div className="buttons">
          <div>
            <button className="approveButton" onClick={handleSubmit}>
              <img src={approveImg} />
            </button>
          </div>
          <div>
            {!showRejectReasonInput && (
              <button className="refuseFinalButton" onClick={() => setShowRejectReasonInput(true)}>
                <img src={refuseImg} />
              </button>
            )}

            {showRejectReasonInput && (
              <button className="refuseButton" onClick={handleRefuseSubmit}>
                <img src={refuseSubmitImg} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmContext;
