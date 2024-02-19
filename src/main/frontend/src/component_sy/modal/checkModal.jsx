import React, { useEffect, useState } from "react";
import "./requestModal.css";
import axios from "axios";

const CheckContext = ({ isOpen, closeModal, selectedPaymentId }) => {
  const [requestInfo, setRequestInfo] = useState(null);
  const [purposeItem, setPurposeItem] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [participant, setParticipant] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");
  const [memo, setMemo] = useState("");

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

  return (
    <div className={isOpen ? "openModal pop" : "pop"}>
      <div className="modal-content">
        <h1>결재 확인</h1>
        <div>
          <div>결제일시</div>
          <input value={paymentDate} readOnly />
        </div>
        <div>
          <div>사용금액</div>
          <input value={requestInfo.paymentInfo.payAmount} readOnly />
        </div>
        <div>
          <div>사용처</div>
          <input value={requestInfo.paymentInfo.merchant} readOnly />
        </div>
        <div>
          <div>용도</div>
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
        <div>
          <div>참석자</div>
          <input value={requestInfo.participant} readOnly />
        </div>
        <div>
          <div>영수증 첨부</div>
          <input type="file" />
        </div>
        <div>
          <div>메모</div>
          <input value={requestInfo.memo} readOnly />
        </div>
        <button className="closeButton" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default CheckContext;
