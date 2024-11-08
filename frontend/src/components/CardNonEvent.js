import React from 'react'
import nopackage from '../assets/images/nokosong.svg'
import { Link } from 'react-router-dom'

const CardNonEvent = (props) => {
    return (
        <div
            className="row mt-lg-2"
        >
            <div className="col-12">
                <div className="card shadow-sm">
                 
                    <div className="card-body text-center">
                        <div className="text-center mb-3">
                            <img alt="" className='w-100 w-sm-50 w-lg-25' src={nopackage} />
                        </div>
                        {props?.location !== 'class' && props?.location !== 'discuss' && <h2 className='mb-4'>Belum ada data nih, yuk beli paket belajar & Try Out sekarang!</h2>}
                        {props?.location === 'discuss' && <h2 className='mb-4'>Belum ada data nih, silahkan ajukan pertanyaan!</h2>}
                        {props?.location === 'class' && <h2 className='mb-4'>Belum ada paket yang tersedia</h2>}
                        {props?.location === 'discuss' && <div className='text-muted mb-4'>Ajukan pertanyaan pada soal di Tryout yang telah selesai dikerjakan dan perlu didiskusikan</div>}
                        {props?.location !== 'discuss' && <div className='text-muted mb-4'>Raih karir impianmu dengan paket belajar & try out dan dapatkan analisis perkembanganmu secara akurat dan mendalam</div>}
                        {props?.location !== 'package' && props?.location !== 'class' && props?.location !== 'discuss' && <div className="px-0 px-lg-5 pt-3 pb-3">
                            <Link to={'/service-available'} className="btn btn-lg bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-warning" >
                                Beli Paket
                            </Link>
                        </div>}
                        {props?.location === 'discuss' && <div className="px-0 px-lg-5 pt-3 pb-3">
                            <Link to={'/tryout'} className="btn btn-lg bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-warning" >
                                Lihat Riwayat Tryout
                            </Link>
                        </div>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardNonEvent