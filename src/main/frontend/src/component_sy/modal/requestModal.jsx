import React, { useEffect, useState } from "react";
import "./requestModal.css";
import axios from "axios";

const RequestContext = ({ isOpen, closeModal, selectedPaymentId }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [purposeItem, setPurposeItem] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [participant, setParticipant] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [memo, setMemo] = useState("");

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
    const requestData = {
      paymentId: selectedPaymentId,
      purposeItemUid: selectedPurpose.purposeItemUid,
      participant: participant,
      receiptUrl: receiptUrl,
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

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const filePath = URL.createObjectURL(files[0]);
      setReceiptUrl(filePath);
    }
  };

  const handlePurposeChange = (event) => {
    const selectedPurposeItemUid = event.target.value;
    const selectedPurpose = purposeItem.find(
      (purpose) => purpose.purposeItemUid === parseInt(selectedPurposeItemUid)
    );
    setSelectedPurpose(selectedPurpose);
  };

  if (!isOpen || !paymentInfo || !purposeItem) return null;
  const paymentDate = paymentInfo.paymentTime;

  return (
    <div className={isOpen ? "openModal pop" : "pop"}>
      <div className="modal-content">
        <h1>결재 요청</h1>
        <div>
          <div>결제일시</div>
          <input value={paymentDate} readOnly />
        </div>
        <div>
          <div>사용금액</div>
          <input value={paymentInfo.payAmount} readOnly />
        </div>
        <div>
          <div>사용처</div>
          <input value={paymentInfo.merchant} readOnly />
        </div>
        <div>
          <div>용도</div>
          <select onChange={handlePurposeChange}>
            <option value="">선택하세요</option>
            {purposeItem.map((purpose) => (
              <option key={purpose.purposeItemUid} value={purpose.purposeItemUid}>
                {purpose.purposeCategory} || {purpose.purposeItem}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>참석자</div>
          <input
            placeholder="참석자를 입력하세요."
            value={participant}
            onChange={(e) => setParticipant(e.target.value)}
          />
        </div>
        <div>
          <div>영수증 첨부</div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <div>메모</div>
          <input
            placeholder="기타 특이사항을 입력하세요."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
        <button className="submitButton" onClick={handleSubmit}>
          신청
        </button>
        <button className="closeButton" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default RequestContext;
