import React, { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const KtAppHeader = () => {

  const { user } = useSelector((store) => store.user);

  return (
    <>
      <div id="kt_app_header" className="app-header" style={{ position: "sticky", top: "0", zIndex: '111' }}>
        <div
          className="container d-flex align-items-stretch justify-content-between"
          id="kt_app_header_container"
        >
          <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15">
            <Link to="/">
            <div className="fw-bold fs-1 text-warning">BIMBEL CPNS</div>


            </Link>
          </div>
          <div
            className="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
            id="kt_app_header_wrapper"
          >
           

            <div
              className="app-header-menu ms-auto me-auto app-header-mobile-drawer align-items-stretch"
              data-kt-drawer="true"
              data-kt-drawer-name="app-header-menu"
              data-kt-drawer-activate="{default: true, lg: false}"
              data-kt-drawer-overlay="true"
              data-kt-drawer-width="250px"
              data-kt-drawer-direction="start"
              data-kt-drawer-toggle="#kt_app_header_menu_toggle"
              data-kt-swapper="true"
              data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
              data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
            >
             

            </div>
            <div className="app-navbar flex-shrink-0">
              {user == null ? (
                <>
                  <div
                    className="app-navbar-item ms-1 ms-lg-3"
                    id="kt_app_header_menu"
                  >
                    <Link
                      to={'/register'}
                      className="btn btn-outline border-warning btn-lg rounded-4 btn-text-dark fw-bold bg-hover-warning text-hover-dark"
                    >
                      Daftar
                    </Link>
                  </div>
                  <div
                    className="app-navbar-item ms-1 ms-lg-3"
                    id="kt_app_header_menu"
                  >
                    <Link
                      to={'/login'}
                      className="btn btn-lg bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-warning"
                    >
                      Masuk
                    </Link>
                  </div>
                </>
              ) : (
                <>
                    <div
                      className="app-navbar-item ms-1 ms-lg-3"
                      id="kt_app_header_menu"
                    >
                      <Link
                        to={"/service-purchased"}
                        className="btn btn-lg bg-warning rounded-4 btn-text-dark fw-bolder bg-hover-dark text-hover-warning"
                      >
                        {user?.name?.split(' ')[0]}
                      </Link>
                    </div>
                  {/* <Dropdown3 /> */}
                
                </>
              )}
           
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KtAppHeader
