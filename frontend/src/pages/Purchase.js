import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KtAppHeaderOrganizer from "../components/KtAppHeaderOrganizer";
import Heading from "../components/Heading";
import SpinnerLoad from "../components/SpinnerLoad";
import CardNonEvent from "../components/CardNonEvent";
import Footer1 from "../components/FooterLanding";
import Scrolltop from "../components/Scrolltop";
import { getBundleServicePurchased, setRequest } from "../features/packaged/packagedSlice";
import { Link } from "react-router-dom";
import CardProduct from "../components/Card";
const Purchase = () => {
  useEffect(() => {
    document.title = `Bimbel CPNS | Paket Saya`;
  }, []);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataname, setDataName] = useState("Semua Paket");
  const [dataBundle, setDataBundle] = useState(null);
  const { head, he, servicePurchase, act } = useSelector((store) => store.package)
  useEffect(() => {
    const getData = async () => {
      setLoading(false);
      let url = "/products?status=purchased"
  
      if (dataname !== "Semua Paket") {
        if (url.includes('?')) {
          url += '&name=' + encodeURIComponent(dataname?.split(" ")[0]);
        } else {
          url += '?name=' + encodeURIComponent(dataname?.split(" ")[0]);
        }
      }

      if (servicePurchase === 1 || servicePurchase === 2) {
        if (url.includes('?')) {
            url += '&type=' + encodeURIComponent(servicePurchase);
        } else {
            url += '?type=' + encodeURIComponent(servicePurchase);
        }
    }
     
      const resp2 = await getBundleServicePurchased(url)

      setDataBundle(resp2.products)
  
      setLoading(true);
    };
    if (act) {
      setLoading(false)
    }
    if (!act) {
      getData();
    }
  }, [dispatch, act, dataname, servicePurchase]);

  return (
    <>
      {/* <Helmet>
              <script src={`${process.env.PUBLIC_URL}/plugins/global/plugins.bundle.js`}></script>
              <script src={`${process.env.PUBLIC_URL}/js/scripts.bundle.js`}></script>
          </Helmet> */}
      <div
        
        className="d-flex flex-column flex-root app-root h-100"
        id="kt_app_root"
        data-kt-app-layout="light-header"
        data-kt-app-header-fixed="true"
        data-kt-app-toolbar-enabled="true"
        data-kt-app-sidebar-enabled="true"
        data-kt-app-sidebar-fixed="true"
        data-kt-app-sidebar-hoverable="true"
        data-kt-app-sidebar-push-header="true"
        data-kt-app-sidebar-push-toolbar="true"
        data-kt-app-sidebar-push-footer="true"
        style={{ minHeight: he }}
      >
        <div
          className="app-page flex-column flex-column-fluid"
          id="kt_app_page"
        >
          <KtAppHeaderOrganizer />
          <div
            className={`app-wrapper ${head ? 'pt-20 pt-lg-0' : undefined} flex-column flex-row-fluid`}
            id="kt_app_wrapper"
          >
            <div
              className="app-main flex-column flex-row-fluid"
              id="kt_app_main"
            >
              <div className="d-flex flex-column flex-column-fluid">
                <div
                  id="kt_app_content"
                  className="app-content flex-column-fluid"
                >
                  <div
                    id="kt_app_content_container"
                    className="app-container container-fluid pt-10 mt-lg-0"
                  >
                    {/* {packageUp && <Heading title="Paket Tryout Saya" />} */}

                    <Heading title="Paket Saya" />
                    {/* <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDateTimePicker label="Pilih tanggal dan waktu" onChange={(e) => { //console.log(e.format("YYYY-MM-DD HH:mm:ss"))}} />
                    </LocalizationProvider>
                    </ThemeProvider> */}
                    <div className="table table-responsive">
                      <table>
                        <tbody>
                        <tr>
                          <td className="pe-6 pt-3 pb-3"> <button
                            type="button"
                            data-bs-toggle="dropdown"
                            // onClick={() => dispatch(setRequest({ servicePurchase: 0 }))}
                            className={`btn ${'btn-lg py-4 bg-dark dropdown-toggle rounded-4 btn-text-warning fw-bolder bg-hover-warning text-hover-dark'}`}
                            style={{ whiteSpace: 'nowrap' }}
                          >
                            {dataname}
                          </button>
                            <ul className="dropdown-menu p-0 w-dropdown">
                              <li className={`py-3 border border-end-0 border-right-0 border-top-0 border-start-0 bg-hover-warning ${dataname == "Semua Paket" && 'bg-light-warning'}`}>
                                <Link onClick={() => setDataName("Semua Paket")} className={`dropdown-item fw-semibold bg-hover-warning`}>Semua Paket</Link>
                              </li>
                              <li className={`py-3 border border-end-0 border-right-0 border-top-0 border-start-0 bg-hover-warning ${dataname == "CPNS" && 'bg-light-warning'}`}>
                                <Link onClick={() => setDataName("CPNS")} className={`dropdown-item fw-semibold bg-hover-warning`}>CPNS</Link>
                              </li>
                              <li className={`py-3 border border-end-0 border-right-0 border-top-0 border-start-0 bg-hover-warning ${dataname == "PPPK" && 'bg-light-warning'}`}>
                                <Link onClick={() => setDataName("PPPK")} className={`dropdown-item fw-semibold bg-hover-warning`}>PPPK</Link>
                              </li>
                              <li className={`py-3 border border-end-0 border-right-0 border-top-0 border-start-0 bg-hover-warning ${dataname == "TKD CPNS" && 'bg-light-warning'}`}>
                                <Link onClick={() => setDataName("TKD CPNS")} className={`dropdown-item fw-semibold bg-hover-warning`}>TKD CPNS</Link>
                              </li>
                              <li className={`py-3 border border-end-0 border-right-0 border-top-0 border-start-0 bg-hover-warning ${dataname == "TKB CPNS" && 'bg-light-warning'}`}>
                                <Link onClick={() => setDataName("TKB CPNS")} className={`dropdown-item fw-semibold bg-hover-warning`}>TKB CPNS</Link>
                              </li>
                            </ul>
                          </td>
                      
                        {/* <td>  <button
                            onClick={() => dispatch(setRequest({ servicePurchase: 1 }))}
                            type="button"
                            className={`btn  px-15 ${servicePurchase === 1 ? 'btn-lg py-4 bg-dark rounded-4 btn-text-warning fw-bolder bg-hover-warning text-hover-dark' : 'btn-lg py-4 bg-secondary rounded-4 btn-text-dark fw-bolder bg-hover-warning'}`}
                            style={{ whiteSpace: 'nowrap' }}
                          >
                            Tryout
                          </button></td> */}
                        <td className="pe-6 pt-3 pb-3">  <button
                            onClick={() => {
                              if (servicePurchase == 2) {
                                dispatch(setRequest({ servicePurchase: null }))
                              } else {
                                dispatch(setRequest({ servicePurchase: 2 }))
                              }
                            }}
                          type="button"
                          className={`btn ${servicePurchase === 2 ? 'btn-lg py-4 bg-dark rounded-4 btn-text-warning fw-bolder bg-hover-warning text-hover-dark' : 'btn-lg py-4 bg-secondary rounded-4 btn-text-dark fw-bolder bg-hover-secondary'}`}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Belajar Mandiri
                        </button></td>
                        <td className="pe-6 pt-3 pb-3">  <button
                            onClick={() => {
                              if (servicePurchase == 1) {
                                dispatch(setRequest({ servicePurchase: null }))
                              } else {
                                dispatch(setRequest({ servicePurchase: 1 }))
                              }
                            }}
                          className={`btn ${servicePurchase === 1 ? 'btn-lg py-4 bg-dark rounded-4 btn-text-warning fw-bolder bg-hover-warning text-hover-dark' : 'btn-lg py-4 bg-secondary rounded-4 btn-text-dark fw-bolder bg-hover-secondary'}`}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Kelas Intensif
                        </button></td>
                      </tr>
                        </tbody>
                    
                    </table>
                  </div>
                  {!loading ? (
                    <SpinnerLoad />
                  ) : (
                    <>
                          {!dataBundle ? (
                        <CardNonEvent location="Belajar Mandiri" />
                      ) : (
                        <>
                         
                          <div className="row mt-3 pe-2 pb-4 pt-4 mb-2">
                                {dataBundle && dataBundle.map((pkg) => <CardProduct key={pkg.id} status="up" {...pkg} head={head} />)}
                              </div>
                          
                         
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <Footer1 />
          </div>
        </div>
      </div>
      <Scrolltop />
    </div >
    </>
  );
};

export default Purchase;
