import React, { useEffect } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import 'datatables/media/js/jquery.dataTables.min.js'
import ModalConfirmCancel from './ModalConfirmCancel'
import { useState } from 'react'
import { getPayments, checkStatusMidtrans  } from '../features/payment/paymentSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const ContentPayment = (props) => {
    console.log(props)
    const dispatch=useDispatch()
    const [loading, setLoading] = useState({});
    useEffect(() => {
        setTimeout(function () {
            $(document).ready(function () {
                $('#example1').DataTable({
                    // dom: '<"top card-header"<"card-title fs-6"i><"card-toolbar"f>><"center card-body table-responsive"rt><"bottom card-footer d-flex justify-content-center"p><"clear">',
                    dom: '<"top card-header border border-0"<"card-title "><"card-toolbar"f>><"center card-body table-responsive"rt><"bottom card-footer d-flex justify-content-center"p><"clear">',
                    language: {
                        search: "", // Mengosongkan teks pencarian,
                        lengthMenu: '<select name="example1_length" class="form-select form-select-solid" aria-controls="example1"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>',
                    },
                    paginate: true,
                    initComplete: function () {
                        const searchInput = $('.dataTables_filter input');
                        searchInput.attr('placeholder', 'Cari Paket/Kelas');
                        searchInput.addClass('form-control form-control-solid');
                        const inputWrapper = searchInput.wrap('<span class="input-group"></span>').parent();
                        inputWrapper.prepend('<span class="input-group-text border border-0"><i class="bi bi-search" style="color: #959595;"></i></span>');

                        // const maxButtons = 3;
                        // const buttonsToShow = maxButtons - 2;

                        // const paginateWrapper = document.querySelector('.dataTables_paginate');
                        // const paginateButtons = Array.from(paginateWrapper.querySelectorAll('.paginate_button'));

                        // paginateButtons.forEach(button => button.style.display = 'none');

                        // if (paginateButtons.length <= maxButtons) {
                        //     paginateButtons.forEach(button => button.style.display = '');
                        // } else {
                        //     const activeButtonIndex = paginateButtons.findIndex(button => button.classList.contains('active'));

                        //     paginateButtons[0].style.display = '';

                        //     if (activeButtonIndex > (buttonsToShow / 2)) {
                        //         const ellipsisLeft = document.createElement('span');
                        //         ellipsisLeft.innerHTML = '...';
                        //         paginateWrapper.insertBefore(ellipsisLeft, paginateButtons[1]);
                        //     }

                        //     const startIndex = Math.max(activeButtonIndex - Math.floor(buttonsToShow / 2), 1);
                        //     const endIndex = Math.min(startIndex + buttonsToShow, paginateButtons.length - 2);

                        //     for (let i = startIndex; i <= endIndex; i++) {
                        //         paginateButtons[i].style.display = '';
                        //     }

                        //     if (activeButtonIndex < (paginateButtons.length - (buttonsToShow / 2) - 1)) {
                        //         const ellipsisRight = document.createElement('span');
                        //         ellipsisRight.innerHTML = '...';
                        //         paginateWrapper.insertBefore(ellipsisRight, paginateButtons[paginateButtons.length - 1]);
                        //     }

                        //     paginateButtons[paginateButtons.length - 1].style.display = '';
                        // }

                    }
                })
                // $('#example1').on('draw.dt', function () {

                //     // kode lain yang ingin dijalankan setelah datatable selesai digenerate
                // });
            })

        }, 1)

    }, [])
    const [datamodal, setDataModal] = useState(null)
    const [show, setDataShow] = useState(false)
    return (
        <div className="card card-custom shadow-sm mb-10">
            <table id='example1' className="
                              col-12 col-sm-12
                              table table-hover table-rounded table-custom
                            ">
                <thead>
                    <tr className="
                                  fw-bold
                                  fs-5
                                  text-gray-800
                                  border-bottom-2 border-gray-200
                                ">
                        <th>#</th>
                        {/* <th>Serial</th> */}
                      <th>Nama Paket/Kelas</th>
                        {/* <th>Type</th> */}
                        <th className="text-end">Harga</th>
                        {/* <th>Date</th> */}
                        <th className="text-start">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {props.payment.map((py, u) => <tr key={py.id}>
                        <th className='ps-7' style={{ width: '1px', whiteSpace: 'nowrap', }}>{u += 1}</th>
                        {/* <td>88311122</td> */}
                    
                        <td >
                            <span className='badge badge-light-primary'>
                                {py?.product?.name }
                            </span>
                        </td>

                        {/* <td>Paid Test</td> */}
                        <td style={{ width: '1px', whiteSpace: 'nowrap', }} className='text-end'>Rp {new Intl.NumberFormat('id-ID').format(py.amount)}</td>
                        {/* <td>2022-08-12 15:04:23</td> */}
                        <td className="text-start" style={{ whiteSpace: 'nowrap' }}>
                            {py.paid_at !== null && <div className="
                                      badge badge-light-success
                                      p-0
                                      m-0
                                      py-2
                                      px-3
                                      text-center
                                    " role="alert">
                                Success
                            </div>}
                            {py.expired_at !== null && <div className="
                                      badge badge-light-danger
                                      p-0
                                      m-0
                                      py-2
                                      px-3
                                      text-center
                                    " role="alert">
                                Expire
                            </div>}

                            {py.cancelled_at !== null &&
                                <div className="
                                      badge badge-light-danger
                                      p-0
                                      m-0
                                      py-2
                                      px-3
                                      text-center
                                    " role="alert">
                                    Cancel
                                </div>}

                            {py.paid_at === null && py.expired_at === null && py.cancelled_at === null && (<>
                                <div className="
                                      badge badge-light-warning
                                      p-0
                                      m-0
                                      py-2
                                      px-3
                                      text-center
                                    " role="alert">
                                    Pending
                                </div>
                                &nbsp;
                                &nbsp;
                                {py.midtrans_payment_url !== null && <button className="
                                      badge text-primary border border-primary bg-white
                                      p-0
                                      m-0
                                      py-2
                                      px-3
                                      text-center
                                    " role="alert"
                                    disabled={loading[py.uuid]==true}
                                    style={{ cursor: 'pointer' }}
                                    onClick={async() => {
                                        setLoading((prev) => ({ ...prev, [py.uuid]: true }));
                                        const resp = await dispatch(checkStatusMidtrans(py.uuid));
                                        
                                        if (resp.payload?.status === 200) {
                                             toast.success("berhasil update status")
                                            const result1 = await dispatch(getPayments);
                                            props?.setPayment(result1);
                                           

                                        }
                                        setLoading((prev) => ({ ...prev, [py.uuid]: false }));
                                    }}
                                > {loading[py.uuid]?"menunggu ..." :"Refresh"}
                                    
                                </button>}
                                &nbsp;
                                &nbsp;
                                {py.midtrans_payment_url !== null && <div className="
                                      badge badge-danger
                                      p-0
                                      m-0
                                      py-2
                                      px-3
                                      text-center
                                    " role="alert"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setDataShow(true)
                                        setDataModal({ id: py.transaction_id, name: py?.product?.name })
                                    }}
                                >
                                    Batalkan
                                </div>}
                            </>)}
                        </td>


                    </tr>)}

                </tbody>
            </table>
            {datamodal && <ModalConfirmCancel data={datamodal} show={show} onhide={() => setDataShow(false)} />}
        </div>
    )
}

export default ContentPayment