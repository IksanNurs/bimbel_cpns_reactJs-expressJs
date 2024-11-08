import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Scrolltop from "../components/Scrolltop";
import LandingCall from "../components/LandingCall";
import KtAppHeader from "../components/KtAppHeader";
import KtAppHeader1 from "../components/KtAppHeader";
import { userSelf } from "../features/user/userSlice";
import { Helmet } from "react-helmet";

const Landing = () => {
  useEffect(() => {
    document.title = `Bimbel cpns by Appskep | Solusi Digital Belajar Test CPNS`;
  }, []);

  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${process.env.PUBLIC_URL}/js/scripts.bundle.js`;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const { head, he } = useSelector((store) => store.package)
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href={`${process.env.PUBLIC_URL}/css/plugins.bundle.css`} />
        <link rel="stylesheet" href={`${process.env.PUBLIC_URL}/css/style.bundle.css`} />
        <script src={`${process.env.PUBLIC_URL}/js/scripts.bundle.js`}></script>
      </Helmet>
      <div className="h-100" style={{ minHeight: he }}>
        <div
          className="d-flex flex-column flex-root app-root h-100"
          id="kt_app_root"
        >
          {/*begin::Page*/}
          <div
            className="app-page flex-column flex-column-fluid"
            id="kt_app_page"
          >
             <KtAppHeader1 />
            <div
              className={`app-wrapper ${head ? 'pt-15 pt-lg-0' : undefined} flex-column flex-row-fluid`}
              id="kt_app_wrapper"
            >
              <div
                className="app-main flex-column flex-row-fluid"
                id="kt_app_main"
              >
                <div className="d-flex flex-column flex-column-fluid">
                  <div
                    id="kt_app_content"
                    className="flex-column-fluid"
                  >
                    <div
                      id="kt_app_content_container"
                      className="app-container-fluid"
                    >
                      <div className="d-flex flex-column" id="beranda">

                        <LandingCall />
                      </div>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
        <Scrolltop />
      </div>
    </>
  );
};

export default Landing;
