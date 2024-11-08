import React, { } from "react";
import { Modal,  } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postPayment } from "../features/payment/paymentSlice";

const ModalCheckout = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    props.onhide();
  };

  const handleCheckout = () => {
    setLoading(true);
    const actions = async () => {
   
        const resp = await dispatch(
          postPayment({
            product_id: Number.parseInt(props?.package?.id),
          })
        );
        handleClose();
        window.location = resp.payload.data.order.midtrans_payment_url;
        setLoading(false);
    };

    actions();
  };

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header className="mx-7 px-0" closeButton>
        <h4>Pembelian</h4>
      </Modal.Header>

      <Modal.Body>
        <h4 className="fw-bold shadow-sm p-7 rounded-4 mb-0">
          <div className="">{props?.package?.name}</div>
        </h4>
      </Modal.Body>

      <Modal.Footer className="d-flex mx-7 px-0">
        <div className="w-100 d-flex justify-content-between mt-0 mb-5 fs-2 fw-bold">
          <div>Total</div>

          <div>
            Rp{" "}
            {
              new Intl.NumberFormat("id-ID").format(props?.package?.price)}
          </div>
        </div>

              <button
                className="btn btn-lg btn-block bg-warning rounded-4 btn-text-dark fw-bold bg-hover-dark text-hover-warning"
                onClick={handleCheckout}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {!loading && "Beli sekarang"}
              </button>
       
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCheckout;
