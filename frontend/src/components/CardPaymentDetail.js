import React from 'react'
import profil from '../assets/images/iconlytwotoneprofile1.svg'
import time from '../assets/images/iconlytwotonetime-circle6.svg'
import itotal from '../assets/images/iconlytwotonedocument2.svg'
import ipackage from '../assets/images/iconlytwotonepassword2.svg'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const CardPaymentDetail = (props) => {
    const navigate = useNavigate()
    const reOrder = (urlpayment) => {
        window.location = urlpayment
    }
    const convertSecond = (detik) => {
        const duration = moment.duration(detik, 'seconds');
        const jam = Math.floor(duration.asHours());
        const menit = duration.minutes();
        if (menit === 0) {
            return `${jam} jam`;
        } else if (jam === 0) {
            return `${menit} menit`;
        } else {
            return `${jam} jam ${menit} menit`;
        }
    }

    return (
        <>
            <div className="col-sm-12 col-lg-4 mb-3">
                <div className="card card-custom">
                    <div className="card-body">
                        <div className="text-center mb-6">
                            <h3 style={{ marginTop: '10px' }}>
                                {props?.Package?.name}
                            </h3>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-sm-6">
                                    <ul className="fa-ul check">
                                        <li className="mb-2">
                                            <img alt="" src={profil} /> &nbsp;<span className='fw-bold'>Order ID</span>
                                            <br />
                                            <span className="fw-semibold px-9">#{props.id}</span>
                                        </li>
                                        <li>
                                            <img alt="" src={time} />&nbsp;<span className='fw-bold'>Durasi</span><br />
                                            <span className="fw-semibold px-9">
                                                <span>{
                                                    convertSecond(props?.Package?.duration)}</span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-sm-6">
                                    <ul className="fa-ul check">
                                        <li className="mb-2">
                                            <img alt="" src={ipackage} />&nbsp;<span className='fw-bold'>Kode Paket Soal</span>
                                          <br />
                                            <span className="fw-semibold px-9">#{props?.Package?.id}</span>
                                        </li>
                                        <li>
                                            <img alt="" src={itotal} />
                                            &nbsp;<span className='fw-bold'>Total pertanyaan</span><br />
                                            <span className="fw-semibold px-9">{props.sumquestion}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row px-3">
                            {/* <button v-if="isLoading == true" type="button" className="btn btn-primary py-3 rounded-pill">
                              Please wait...
                              <span className="
                                spinner-border spinner-border-sm
                                rounded-pill
                              " role="status" aria-hidden="true" />
                          </button> */}
                            {props.examid === 0 && props.paid_at !== null ? <button
                                type="button" onClick={() => navigate('/tryout/start?uuid=' + props.uuid)} className="btn btn-lg bg-warning rounded-4 btn-text-dark fw-bold bg-hover-dark text-hover-warning">
                                Mulai Tryout
                            </button> : props.examid !== 0 ? <button onClick={() => navigate('/tryout/view?id=' + props.examid)} type="button" className="btn btn-lg bg-warning rounded-4 btn-text-dark fw-bold bg-hover-dark text-hover-warning">
                                Detail
                                </button> : <button onClick={() => reOrder(props.midtrans_payment_url)} type="button" className="btn btn-lg bg-warning rounded-4 btn-text-dark fw-bold bg-hover-dark text-hover-warning">
                                Lanjutkan Pembayaran
                            </button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPaymentDetail