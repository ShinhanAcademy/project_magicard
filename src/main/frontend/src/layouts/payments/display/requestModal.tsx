import React, { useEffect, useState } from "react";
import "./requestModal.css";
import axios from "axios";

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

interface RequestInfo {}

const ModalContext = ({ isOpen, closeModal, selectedPaymentId }: any) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [request, setRequest] = useState<RequestInfo | null>(null);
  const [purposeItem, setPurposeItem] = useState<PurposeItem[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState<number | null>(null);
  const [participant, setParticipant] = useState<string>("");

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
  };

  if (!isOpen || !paymentInfo || !purposeItem) return null;
  const paymentDate = paymentInfo.paymentTime.substring(0, 10);
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
          <select>
            {purposeItem.map((purpose: any) => (
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
          <input type="file" />
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

export default ModalContext;
