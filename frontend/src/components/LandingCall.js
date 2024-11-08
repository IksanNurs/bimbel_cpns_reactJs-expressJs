import React, { useEffect, useState } from 'react'
import landing from '../assets/images/banner.svg'
import { Link } from 'react-router-dom'
import {useSelector } from 'react-redux';

const LandingCall = () => {
    const { user } = useSelector((store) => store.user)

    return (
        <>
            <div className="mb-0" id="home">
                <div className="d-flex flex-column w-100 min-h-400px">
                    <div className="container mt-10 py-4 py-md-10">
                        <div>
                            <div className="">
                                <div className='row'>
                                    <div className='col-12 col-lg-7'>
                                        <div>
                                            <h1 className="display-3 lh-sm mb-6">
                                                <span className="justify"
                                                ><span >Solusi</span>
                                                    <span
                                                    > Digital<br />Belajar Test CPNS
                                                    </span>
                                                </span>
                                            </h1>
                                            <p className="mb-1 lead">
                                                Hai! Apakah kamu sedang mempersiapkan diri untuk tes CPNS?
                                            </p><p className="mb-1 lead">
                                                Mau belajar, tapi bingung mau mulai darimana?
                                            </p><p className="mb-1 lead">
                                                Mau tahu tips dan trik jawab soal dengan cepat?
                                            </p><p className="mb-1 lead">
                                                <b>Bimbel Solusinya! </b>Sebuah platform belajar tes CPNS kapan saja dan dimana aja!
                                            </p>

                                            <div className="row pt-5">
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                    <Link
                                                        to="/service-available"
                                                        className="btn btn-lg bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-warning mb-4 mb-sm-4 mb-md-0 mb-lg-0 "

                                                    >
                                                        Coba Sekarang
                                                    </Link>
                                                </div>
                                            </div>
                                            {!user && (<>
                                                <p className="lead pt-0 pt-md-5">
                                                    Sudah Punya Akun?
                                                    <Link
                                                        style={{ cursor: "pointer" }}
                                                        className="fw-bold text-warning-custom"
                                                        to={process.env.REACT_APP_AUTH_URL + "/login?client_id=" + window.location.href}
                                                    >
                                                        &nbsp; Silahkan Masuk
                                                    </Link>
                                                </p>
                                            </>)}
                                        

                                        </div>
                                    </div>
                                    <div className='col-12 col-lg-5 text-end d-none d-lg-block'>
                                        <img src={landing} alt='load' style={{ width: '99%' }} />
                                    </div>
                                </div>
                           
                            </div>
                          
                        </div>
                    </div>
                </div>

            </div>
          
           
        </>
    )
}

export default LandingCall