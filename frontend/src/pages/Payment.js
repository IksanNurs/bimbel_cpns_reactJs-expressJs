import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KtAppHeaderOrganizer from "../components/KtAppHeaderOrganizer";
import Heading from "../components/Heading";
import SpinnerLoad from "../components/SpinnerLoad";
import CardNonEvent from "../components/CardNonEvent";
import Footer1 from "../components/FooterLanding";
import Scrolltop from "../components/Scrolltop";
import { getPayments } from "../features/payment/paymentSlice";
import ContentPayment from "../components/ContentPayment";
const Payment = () => {
  useEffect(() => {
    document.title = `Bimbel CPNS | Pembayaran`;
  }, []);
  const dispatch = useDispatch();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const { head, he, act } = useSelector((store) => store.package)
  const { isLoading1, isLoading2 } = useSelector((store) => store.payment)
  useEffect(() => {
    const getData = async () => {
      const result1 = await dispatch(getPayments);
      ////console.log(result1)
      setPayment(result1)
      setLoading(true);
    };
    if (act) {
      setLoading(false)
    }
    if (!act || isLoading1 || isLoading2) {
      getData();
    }
  }, [dispatch, act, isLoading1, isLoading2  ]);

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
        style={{ minHeight: he, }}
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
                    <Heading title="Pembayaran" />
                    {!loading ? (
                      <SpinnerLoad />
                    ) : (
                      <>
                        {payment === null ? (
                          <CardNonEvent />
                        ) : (
                          <div className="row mt-3 pe-2 ps-3 mb-10">
                            <ContentPayment payment={payment} setPayment={setPayment}/>
                          </div>
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
      </div>
    </>
  );
};

export default Payment;
