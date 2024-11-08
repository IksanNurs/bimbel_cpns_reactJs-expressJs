import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postPayment1 } from '../features/payment/paymentSlice';
import { useMemo } from 'react';
import subcard1 from '../assets/images/subcard1.svg'
import subcard2 from '../assets/images/subcard2.svg'
import { useNavigate } from 'react-router-dom';
import check from '../assets/images/check.svg'

const ModalDeskripsi = (props) => {
    const navigate = useNavigate()
    return (
        <div className="modal fade" id={'desc' + props.id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content" style={{ borderRadius: "24px", boxShadow: "0px 4px 14px 0px #162D4314", }}>
                    <div
                        className="modal-header justify-content-center"
                        style={{
                            height: "100px",
                            borderRadius: "24px 24px 0px 0px",
                            backgroundColor: '#FFCC41',
                        }}
                    >
                        <div className="modal-title">
                            <h2 className="fw-bold pb-4 text-dark" style={{ textAlign: "center" }}>
                                {props?.type === 0 && ("TryOut")}
                                {props?.type === 1 && ("Kelas Intensif")}
                                {props?.type === 2 && ("Belajar Mandiri")}
                            </h2>
                        </div>
                        <img alt='load' src={subcard1} className='position-absolute top-0 end-0' />
                        <img alt='load' src={subcard2} className='position-absolute start-0' style={{ bottom: "48%" }} />
                        <div className='position-absolute' style={{ right: '10px', top: '10px' }}>
                            <button
                                className="btn btn-icon btn-sm btn-active-light-warning text-hover-success"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <span className="svg-icon svg-icon-1">
                                    <i className="fa fa-close fs-2 text-dark" />
                                </span>
                            </button>
                        </div>

                    </div>

                    <div className="modal-body p-8" style={{ marginTop: '-20px', borderRadius: "24px", backgroundColor: 'white' }}>
                        <h3 className="mb-0 py-5 text-center fw-bolder">{props?.name}</h3>
                        {props?.description !== null && props?.description !== '' && <div className='mt-5'>
                            {
                                props?.description.split("\n").filter((e) => e.trim() !== "").map((e, index) => (
                                    <table key={index} className='mb-4'><tbody><tr><td style={{ width: '28px', whiteSpace: 'nowrap' }} className='d-flex align-self-start'><img alt='loading' src={check} /></td><td>{e}</td></tr></tbody></table>
                                ))

                            }

                        </div>}
                    </div>
                    <div className="modal-footer p-8 border-gray-300 border-top-dashed" style={{ backgroundColor: 'white', borderRadius: " 0 0 24px 24px" }}>
                        <div className='w-100 text-start'>
                            Rp
                        </div>
                        <div className='d-flex w-100 justify-content-between '>
                            <div className='fs-1 fw-bolder'>
                                {new Intl.NumberFormat('id-ID').format(props?.price)}
                            </div>
                            <div>
                                <button
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    className="btn btn-text-warning fw-bold al py-3 px-4 px-lg-8 fs-7 fs-lg-5"
                                >
                                    Kembali
                                </button>
                                {props?.price !== 0 && (<>
                                    <button type='button' onClick={() => {
                                        navigate(props?.type !== 0 ? "/service-available/view?bundle_id=" + props?.id : "/service-available/view?package_id=" + props?.id)
                                    }}
                                        className="btn bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-warning px-10"
                                    >
                                        Beli
                                    </button>
                                </>)}
                                {props?.price === 0 && (<button type='button' onClick={() => navigate(props?.type !== 0 ? "/service-available/view?bundle_id=" + props?.id : "/service-available/view?package_id=" + props?.id)}
                                    className="btn bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-white px-10"
                                >
                                    Ikuti
                                </button>)}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ModalDeskripsi