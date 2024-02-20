import RequestContext from "component_sy/modal/requestModal";
import UpdateContext from "component_sy/modal/updateModal";
import CheckContext from "component_sy/modal/checkModal";
import PaymentsInfo from "layouts/payments/display/paymentsInfo";

const ModalContext = () => {
  const { isModalOpen, closeModal, selectedPaymentId, sendRequest } = PaymentsInfo();
  switch (sendRequest) {
    case "신청":
      alert("신청");
      return (
        <RequestContext
          isOpen={isModalOpen}
          closeModal={closeModal}
          selectedPaymentId={selectedPaymentId}
        />
      );
    case "조회":
      alert("조회!");
      return (
        <CheckContext
          isOpen={isModalOpen}
          closeModal={closeModal}
          selectedPaymentId={selectedPaymentId}
        />
      );
    case "수정":
      alert("수정!");
      return (
        <UpdateContext
          isOpen={isModalOpen}
          closeModal={closeModal}
          selectedPaymentId={selectedPaymentId}
        />
      );
    default:
      return null;
  }
};

export default ModalContext;
