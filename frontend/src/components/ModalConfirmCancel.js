import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { cancelOrder, setState } from '../features/payment/paymentSlice';

const ModalConfirmCancel = (props) => {
    const dispatch = useDispatch()
    const handleCheckout = () => {
        const actions=async()=>{
           await dispatch(cancelOrder(props.data.id))
            props.onhide()
                dispatch(setState({ isLoading1: true, isLoading2: true }));
                setTimeout(() => {
                    dispatch(setState({ isLoading1: false, isLoading2: false }));
                }, 1000);
        }
        actions()
    };
  return (
      <Modal show={props.show} onHide={props.onhide}>
         

          <Modal.Body className='mb-0'>
              <p className='mb-0 fw-bold'>
                Batalkan pembelian {props.data.name}?      
              </p>
          
          </Modal.Body>

          <Modal.Footer>
              <Button variant="light" onClick={props.onhide}>
                  Tidak
              </Button>
              <button className='btn btn-lg bg-warning rounded-4 btn-text-dark fw-bold bg-hover-dark text-hover-warning' onClick={handleCheckout}>
                  Iya
              </button>
          </Modal.Footer>
      </Modal>
  )
}

export default ModalConfirmCancel