import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postPayment, } from '../features/payment/paymentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import ModalCheckout1 from './ModalCheckout1'
import ModalDeskripsi from './ModalDeskripsi'
import subcard1 from '../assets/images/subcard1.svg'
import subcard2 from '../assets/images/subcard2.svg'
import check from '../assets/images/check.svg'
import { toast } from 'react-toastify'
import ModalDeskripsi1 from './ModalDeskripsi1'

const CardProduct = (props) => {
    const navigate = useNavigate()
    const [expand, setExpand] = useState(false);
    const [datamodal, setDataModal] = useState(null)
    const [show, setDataShow] = useState(false)
    const { user } = useSelector((store) => store.user)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const reOrder = (urlpayment) => {
        window.location = urlpayment
    }
    const handleClick = async () => {
        setLoading(true)
        window.scrollTo(0, 0);
        if (props.count_field === 0) {
            const resp = await dispatch(postPayment({ bundle_id: Number.parseInt(props.id) }))
            if (resp.payload.status === 200) {
                toast.success(`Berhasil membeli kelas intensif`);
                setLoading(false)
                navigate('/service-purchased')
            }
        } else {
            setLoading(false)
            navigate('/service-available/register?id=' + props.id)
        }

        // //console.log(props.id)
    }

    return (
        <>
            <div className="col-12 col-md-6 col-lg-4 col-xxl-3" style={{ display: "flex", flexDirection: "column" }}>
                <div id='card_3' className="card mb-8 card-custom border border-1" style={{ borderRadius: "24px", boxShadow: "0px 4px 14px 0px #162D4314", flex: "1" }}>
                    <div
                        className="card-header justify-content-center"
                        style={{
                            height: "100px",
                            borderRadius: "24px 24px 0px 0px",
                            backgroundColor: "#FFCC41",
                        }}
                    >
                        <div className="card-title">
                            <h2 className="fw-bold pb-4 text-dark" style={{ textAlign: "center" }}>
                                {props?.type === 0 && ("TryOut")}
                                {props?.type === 1 && ("Kelas Intensif")}
                                {props?.type === 2 && ("Belajar Mandiri")}
                            </h2>
                        </div>
                        <img alt='load' src={subcard1} className='position-absolute top-0 end-0' />
                        <img alt='load' src={subcard2} className='position-absolute start-0' style={{ bottom: "82%" }} />
                    </div>
                    <div className="card-body position-relative" style={{ marginTop: '-20px', borderRadius: "24px", backgroundColor: 'white' }}>
                        <h3 className="mb-0 py-5 text-center fw-bolder">{props?.name}</h3>
                        {props?.description !== null && props?.description !== '' && <div className='mt-5'>
                            {expand ?
                                props?.description.split("\n").filter((e) => e.trim() !== "").map((e, index) => (
                                    <table key={index} className='mb-4'><tbody><tr><td style={{ width: '28px', whiteSpace: 'nowrap' }} className='d-flex align-self-start'><img alt='loading' src={check} /></td><td>{e}</td></tr></tbody></table>
                                ))
                                :
                                props?.description.split("\n").slice(0, props?.name?.length < 25 ? 4 : props?.name?.length>50?2:3).filter((e) => e.trim() !== "").map((e, index) => (
                                    <table key={index} className='mb-4'><tbody><tr><td style={{ width: '28px', whiteSpace: 'nowrap' }} className='d-flex align-self-start'><img alt='loading' src={check} /></td><td>{e}</td></tr></tbody></table>
                                ))
                            }
                            {props?.description.split("\n").length > 2 &&
                                <div className="text-center position-absolute translate-middle" style={{ bottom: '-8%', left: '50%' }}>
                                    <button data-bs-toggle="modal"
                                        data-bs-target={'#desc' + props.id} className="btn btn-link text-primary text-small fs-6 text-lowercase">selengkapnya {'>'}</button>
                                </div>
                            }
                        </div>}
                    </div>
                    <div className="card-footer border-gray-300 border-top-dashed" style={{ backgroundColor: 'white', borderRadius: " 0 0 24px 24px" }}>
                    {props?.status!="up" && props?.status!="vp" &&
                        <div className=''>
                            Rp
                        </div>}
                        <div className={`d-flex ${props?.status=="up" || props?.status=="vp" ?'justify-content-center':'justify-content-between'}`}>
                            {props?.status!="up" && props?.status!="vp" &&
                             <div className='fs-1 fw-bolder'>
                                {new Intl.NumberFormat('id-ID').format(props?.price)}
                            </div>}
                            {user && (<>
                                {props.status === "vp" && (<>
                                {props.paid_at !== null ? <button
                                    type="button" onClick={() => navigate('/service-purchased/view?id=' + props.payment.bundle_id)} className='btn bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-warning px-10'>
                                    Lihat
                                </button> : <button onClick={() => reOrder(props.payment.midtrans_payment_url)} type="button" className="btn bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-warning px-10">
                                    Follow up
                                </button>}
                            </>)}
                                {props?.status === 'up' && <Link to={'/service-purchased/view?id=' + props.id}
                                className="btn bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-warning px-10
                     "
                                disabled={props.head}
                            >
                                Lihat
                            </Link>}
                                {props?.status!="up" && props?.status!="vp" && <>
                                    {props.price !== 0 && (<button type='button' onClick={() => {
                                        setDataShow(true)
                                        setDataModal(props)
                                    }}
                                        className="btn bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-warning px-10
                     "
                                    // disabled={props.head}
                                    >
                                        Beli
                                    </button>)}
                                    {props.price === 0 && (<button type='button' onClick={!loading && handleClick}
                                        className="btn bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-warning px-10
                     "
                                    // disabled={props.head}
                                    >
                                        {loading && (<>
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>{" "}
                                            &nbsp;
                                            <span className="indicator-label">
                                                Mohon tunggu...
                                            </span>
                                        </>)}
                                        {!loading && "Ikuti"}


                                    </button>)}
                                    </>}
                               
                            </>)}
                            
                            {!user && (<>
                                {props?.price !== 0 && (<button type='button' onClick={() => {
                                    navigate(props?.type !== 0 ? "/service-available/view?bundle_id=" + props?.id : "/service-available/view?package_id=" + props?.id)
                                }}
                                    className="btn bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-warning px-10"
                                >
                                    Beli
                                </button>)}
                                {props?.price === 0 && (<button type='button' onClick={() => navigate(props?.type !== 0 ? "/service-available/view?bundle_id=" + props?.id : "/service-available/view?package_id=" + props?.id)}
                                    className="btn bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-white px-10"
                                >
                                    Ikuti
                                </button>)}
                            </>)}
                      
                        </div>
                    </div>
                </div>
            </div>
            {datamodal && <ModalCheckout1 datacount={props?.count_field} package={props} show={show} onhide={() => setDataShow(false)} />}
            {!user &&  <ModalDeskripsi {...props} /> }
            {user &&  <ModalDeskripsi1 {...props} /> }
        </>
    )
}

export default CardProduct

