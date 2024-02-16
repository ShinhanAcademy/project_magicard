import React, { useEffect, useState } from "react";
import "./requestModal.css";
import axios from "axios";
import receiptImg from "assets/images/request_img/reciept.png";
import cardImg from "assets/images/request_img/card.png";
import clockImg from "assets/images/request_img/clock.png";
import shopImg from "assets/images/request_img/shop.png";
import purposeImg from "assets/images/request_img/purpose.png";
import joinImg from "assets/images/request_img/join.png";
import picImg from "assets/images/request_img/pic.png";
import penImg from "assets/images/request_img/pen.png";
import submitbtn from "assets/images/request_img/submitbtn.png";

interface PaymentInfo {
  paymentTime: string;
  payAmount: number;
  merchant: string;
}

interface PurposeItem {
  purposeItemUid: number;
  purposeCategory: string;
  purposeItem: string;
}

interface Request {
  paymentId: number;
  purposeId: number;
  participant: string;
  receiptUrl?: File;
}

const ModalContext = ({ isOpen, closeModal, selectedPaymentId }: any) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [purposeItem, setPurposeItem] = useState<PurposeItem[]>([]);
  const [request, setRequest] = useState<RequestInfo | null>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<number | null>(null);
  const [participant, setParticipant] = useState<string>("");
  const [receiptUrl, setReceiptUrl] = useState<File | null>(null);

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
    if (!selectedPurpose) {
      alert("용도를 선택해주세요.");
      return;
    }
    const requestData: Request = {
      paymentId: selectedPaymentId,
      purposeId: selectedPurpose,
      participant: participant,
    };

    if (receiptUrl) {
      requestData.receiptUrl = receiptUrl;
    }

    axios({
      method: "post",
      url: "requests/sendRequest",
      data: requestData,
    })
      .then((res) => {
        console.log(res.data === 1 ? "요청 성공" : "요청 실패");
      })
      .catch((e) => {
        console.log("error 입니다.");
      });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setReceiptUrl(files[0]);
    }
  };

  const modalClose = () => {
    // 모달 닫힘 코드 구현 예정
  };

  const handlePurposeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPurpose(parseInt(event.target.value));
  };

  if (!isOpen || !paymentInfo || !purposeItem) return null;
  const paymentDate = paymentInfo.paymentTime.substring(0, 10);
  return (
    <div className={isOpen ? "openModal pop" : "pop"}>
      <div className="modal-content">
        <div className="modal-title">
          <div className="modal-title-img">
            <img src={receiptImg}></img>
            <div>
              <h1>결재 요청</h1>
              <p style={{ color: "#8e8e8e", fontSize: "0.8rem" }}>
                {" "}
                결제 정보가 자동으로 연동됩니다. 필수 정보를 모두 입력해주세요.{" "}
              </p>
            </div>
          </div>
          <span
            className="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-fnit94-MuiIcon-root"
            aria-hidden="true"
            onClick={modalClose}
          >
            close
          </span>
        </div>
        <hr />
        <div className="modal-main-content">
          <div className="modal-item">
            <div className="modal-input">
              <img src={clockImg} style={{ width: "20px", height: "20px" }} />
              결제일시
              <span className="ness"> * </span>
            </div>
            <input value={paymentDate} readOnly />
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={cardImg} style={{ width: "20px", height: "20px" }} />
              사용금액
              <span className="ness"> * </span>
            </div>
            <input value={paymentInfo.payAmount} readOnly />
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={shopImg} style={{ width: "20px", height: "20px" }} />
              사용처 <span className="ness"> * </span>&nbsp; &nbsp;
            </div>
            <input value={paymentInfo.merchant} readOnly />
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={purposeImg} style={{ width: "20px", height: "20px" }} />
              용도
              <span className="ness"> * </span> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            </div>
            <select onChange={handlePurposeChange}>
              <option value="">선택하세요</option>
              {purposeItem.map((purpose: any) => (
                <option key={purpose.purposeItemUid} value={purpose.purposeItemUid}>
                  {purpose.purposeCategory} || {purpose.purposeItem}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={joinImg} style={{ width: "20px", height: "20px" }} />
              참석자
              <span className="ness"> * </span>
            </div>
            <input
              placeholder="참석자를 입력하세요."
              value={participant}
              onChange={(e) => setParticipant(e.target.value)}
            />
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={picImg} style={{ width: "20px", height: "20px" }} />
              영수증 &nbsp; &nbsp;
            </div>
            <input type="file" onChange={handleFileChange} />
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={penImg} style={{ width: "20px", height: "20px" }} />
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
        {/* <button className="closeButton" onClick={closeModal}>
          닫기
        </button> */}
      </div>
    </div>
  );
};

export default ModalContext;
