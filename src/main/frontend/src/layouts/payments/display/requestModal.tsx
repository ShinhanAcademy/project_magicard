import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import "./requestModal.css";
import axios from "axios";

interface PaymentInfo {
  payment: string;
  payAmount: number;
  merchant: string;
}

const ModalContext = ({ isOpen, closeModal, selectedPaymentId }: any) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    if (isOpen) {
      axios({
        method: "get",
        url: "/paymentInfo/getTotalAmount",
      })
        .then((result) => {
          console.log(result.data);
          setPaymentInfo(result.data);
        })
        .catch((err) => {});
    }
  }, [isOpen]);

  if (!isOpen || !paymentInfo) return null;

  return (
    <div className={isOpen ? "openModal pop" : "pop"}>
      <div className="modal-content">
        <h1>결재 요청</h1>
        <div>
          <div>결제일시</div>
          <input value={paymentInfo.payment} readOnly />
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
            <option value="1">선택하시오</option>
            <option value="2">Option 1</option>
            <option value="3">Option 2</option>
          </select>
        </div>
        <div>
          <div>참석자</div>
          <input placeholder="참석자를 입력하세요." />
        </div>
        <div>
          <div>영수증 첨부</div>
          <input type="file" />
        </div>
        <button className="closeButton" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalContext;
