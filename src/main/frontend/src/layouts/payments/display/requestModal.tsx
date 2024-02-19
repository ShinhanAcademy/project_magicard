import React, { useCallback, useEffect, useRef, useState } from "react";
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
import refresh from "assets/images/request_img/refresh.png";

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

  //esc keyEvent 추가
  const handleKeyPress = (e: any) => {
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
              <span className="ness"> * </span> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            </div>
            <SelectPurpose />
          </div>

          <div className="modal-item">
            <div className="modal-input">
              <img src={joinImg} />
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
              <img src={picImg} />
              영수증 &nbsp; &nbsp;
            </div>
            <input type="file" onChange={handleFileChange} />
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

export default ModalContext;

const SelectPurpose = () => {
  const gptResult: string[] = ["식비", "교통비", "접대비"];
  var [ind, setInd] = useState(0);
  // var ind: number = 0; //인덱스 초기값
  var selectedPurpose: string = gptResult[0]; //추천 초기값

  //click 이벤트
  function handleClick() {}

  function cntInd() {
    ind++;
    setInd(ind);
    return ind;
  }

  //클릭한 경우 3번을 넘어가면 직접 입력란 활성화
  if (ind >= 3) {
    return <Write />;
  } else {
    selectedPurpose = gptResult[ind];
    return <Select purpose={selectedPurpose} cntInd={cntInd} />;
  }
};

const Select = ({ purpose, cntInd }: any) => {
  return (
    <div className="purpose-content">
      <div className="refresh-content">
        <p>{purpose}</p>
        <button className="refreshBtn" onClick={cntInd}>
          <img src={refresh} />{" "}
        </button>
      </div>
      <span className="refresh-notion">
        {" "}
        * 추천 용도입니다. 일치하지 않는다면 새로고침을 통해
        <span> 2개 </span>의 항목을 더 추천 받을 수 있습니다.
      </span>
    </div>
  );
};

const Write = () => {
  return <input placeholder="용도를 직접 입력해주세요." />;
};
