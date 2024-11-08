import React from 'react'
import { putcreateorder } from '../features/event/eventSlice'
import { useDispatch, useSelector } from 'react-redux'

const ModalInformasiPayment = () => {
    const { eventid, urlpayment, orderid } = useSelector((store) => store.event)
    const dispatch = useDispatch()
    const changepayment = () => {
        const getData = async () => {
            const result1 = await dispatch(putcreateorder({ event_id: Number.parseInt(eventid), order_id: Number.parseInt(orderid), }));
            ////console.log(result1.payload.order.midtrans_payment_url)
            window.location = result1.payload.order.midtrans_payment_url
        };
        getData();
    }

    // },
    // followup() {
    //     window.location = this.urlMidtrans
    // },
    return (
        <>
            <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="kt_modal_18">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content shadow-sm">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">Informasi</h2>
                            <div className="btn btn-icon btn-sm btn-active-light-primary" data-bs-dismiss="modal" aria-label="Close">
                                <span className="svg-icon svg-icon-1"><i className="fa fa-close fs-2" /></span>
                            </div>
                        </div>
                        <div className="modal-body">
                            <p className="lead">
                                Silahkan pilih <b>lanjutkan</b> untuk melakukan pembayaran dengan metode yang telah dipilih sebelumnya.
                            </p>
                            <p className="lead">
                                Silahkan pilih <b>ganti metode pembayaran</b> untuk melakukan pembayaran dengan metode baru yang akan dipilih
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={changepayment} className="
                            btn btn-outline btn-warning
                            py-2
                            rounded-pill
                            " data-bs-dismiss="modal" aria-label="Close">
                                Ganti metode pembayaran
                            </button>
                            <button data-bs-dismiss="modal" aria-label="Close" onClick={()=>{window.location=urlpayment}} className="
                        btn btn-outline btn-success
                        py-2
                        rounded-pill
                        ">
                                Lanjutkan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalInformasiPayment