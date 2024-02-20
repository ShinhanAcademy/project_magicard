import React, { useEffect, useState } from "react";
import "./requestModal.css";
import axios from "axios";

const ConfirmContext = ({ isOpen, closeModal, selectedPaymentId }) => {
  const [requestInfo, setRequestInfo] = useState(null);
  const [purposeItem, setPurposeItem] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [refuseMessage, setRefuseMessage] = useState(null);
  const [showRejectReasonInput, setShowRejectReasonInput] = useState(false);

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
          closeModal();
        })
        .catch((e) => {
          console.log("error 입니다.");
        });
    }
  };

  const handleRefuseSubmit = () => {
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
        <h1>결재 요청</h1>
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
        {showRejectReasonInput && (
          <div>
            <div>반려 사유</div>
            <input value={refuseMessage} onChange={(e) => setRefuseMessage(e.target.value)} />
          </div>
        )}
        <button className="submitButton" onClick={handleSubmit}>
          승인
        </button>

        {!showRejectReasonInput && (
          <button className="refuseMessage" onClick={() => setShowRejectReasonInput(true)}>
            반려
          </button>
        )}

        {showRejectReasonInput && (
          <button className="refuseButton" onClick={handleRefuseSubmit}>
            반려 제출
          </button>
        )}

        <button className="closeButton" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default ConfirmContext;
