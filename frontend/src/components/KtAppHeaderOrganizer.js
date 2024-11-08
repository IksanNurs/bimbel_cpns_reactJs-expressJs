import React, { useEffect, useState } from "react";
import { Dropdown, Offcanvas } from "react-bootstrap";
import people from "../assets/images/user.svg"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Dropdown2 from "./Dropdown2";
import $ from "jquery";
import Dropdown1 from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setRequest } from "../features/packaged/packagedSlice";

const KtAppHeaderOrganizer = () => {
  const [show, setShow] = useState(false);
  const { user } = useSelector((store) => store.user)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [widthWind, setWidthWind] = useState(null);
  const dispacth = useDispatch()


  var width = $(window).width();
  window.onresize = function () {
    if ($(this).width() !== width) setShow(false);
  };
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    const myFunction = (x) => {
      setWidthWind(x.matches ? 1 : 0);
    };
    const x = window.matchMedia("(max-width: 991px)");
    myFunction(x);
    x.addListener(myFunction);
  }, []);

  return (
    <>
    
      <div
        id="kt_app_header"
        className="app-header1"
        style={{ position: widthWind === 1 ? "sticky" : undefined, top: widthWind === 1 ? "0" : undefined, zIndex: widthWind === 1 ? '111' : undefined }}
      >
        <div
          className="
            app-container
            container-fluid
            d-flex
            align-items-stretch
            justify-content-between
          "
          id="kt_app_header_container"
        >
          <div
            className="
            d-flex
            align-items-center
            flex-grow-1 flex-lg-grow-0
            me-lg-15
          "
          >
            <Link to={pathname=='/service-available'?'/':'/service-available'} className="d-lg-none">
             <div className="fw-bold fs-1 text-warning">BIMBEL CPNS</div>

            </Link>
          </div>
          <div
            className="
              d-flex
              align-items-stretch
              justify-content-between
              flex-lg-grow-1
            "
            id="kt_app_header_wrapper"
          >
            <Offcanvas
              show={show}
              onHide={handleClose}
              style={{ width: "250px" }}
            >
              <Offcanvas.Body>
                <div
                  className="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0"
                  id="kt_app_header_menu"
                  data-kt-menu="true"
                >
                  <div className="menu-item mb-5">
                    <div className="mb-4 text-center">
                      <img style={{ width: '30%' }} alt="" src={people} />
                    </div>
                    <div className="mb-1 text-center">
                      <b >
                        {user?.name}</b>
                    </div>
                    <div className="mb-1 text-center">
                      <div style={{ fontSize: '12px' }}>
                        {user?.email}
                      </div>
                    </div>
                 
              
                  </div>
                  
                  <div className="menu-item">
                    <Link
                      onClick={() => {
                        dispacth(setRequest({ act: true, }));
                        setTimeout(() => {
                          dispacth(setRequest({ act: false }));
                        }, 1000);
                        handleClose()
                      }}
                      to="/service-purchased"
                      className="menu-link"
                      style={{
                        backgroundColor:
                          pathname === "/service-purchased" ? "#f4f6fa" : undefined,
                      }}
                    >
                      <span
                        className={`menu-title ${pathname === "/service-purchased" ? 'fw-bold' : undefined}`}
                        style={{
                          color:
                            pathname === "/service-purchased"
                              ? "#162D43"
                              : undefined,
                        }}
                      >
                        <span className="svg-icon svg-icon-primary menu-icon svg-icon-2x">
                          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="44" height="44" rx="16" fill={pathname === "/service-purchased" ? "#162D43" : "#eaebec"} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.207 26.5996C17.207 26.0473 17.6548 25.5996 18.207 25.5996H25.4071C25.9593 25.5996 26.4071 26.0473 26.4071 26.5996C26.4071 27.1519 25.9593 27.5996 25.4071 27.5996H18.207C17.6548 27.5996 17.207 27.1519 17.207 26.5996Z" fill={pathname === "/service-purchased" ? "#ffcc41" : "#777777"} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.2059 21.2515C17.2059 20.6992 17.6537 20.2515 18.2059 20.2515H22.6806C23.2328 20.2515 23.6806 20.6992 23.6806 21.2515C23.6806 21.8037 23.2328 22.2515 22.6806 22.2515H18.2059C17.6537 22.2515 17.2059 21.8037 17.2059 21.2515Z" fill={pathname === "/service-purchased" ? "#ffcc41" : "#777777"} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.9072 11.6965C14.9497 9.44374 18.1175 8.6665 22.3864 8.6665C23.622 8.6665 24.7617 8.73506 25.7888 8.87576C25.9968 8.90425 26.1907 8.99753 26.3427 9.14236L33.9027 16.3424C34.0563 16.4886 34.1593 16.6798 34.1971 16.8884C34.4643 18.3649 34.5864 20.068 34.5864 21.9998C34.5864 26.6662 33.8948 30.0869 31.8767 32.3089C29.832 34.5598 26.6605 35.3332 22.3864 35.3332C18.1185 35.3332 14.9503 34.5597 12.9075 32.3085C10.8913 30.0868 10.1997 26.6664 10.1997 21.9998C10.1997 17.3396 10.8915 13.9197 12.9072 11.6965ZM14.3889 13.0399C12.9079 14.6733 12.1997 17.4201 12.1997 21.9998C12.1997 26.5866 12.9081 29.333 14.3886 30.9645C15.8425 32.5666 18.2676 33.3332 22.3864 33.3332C26.5121 33.3332 28.9407 32.5665 30.3961 30.9641C31.878 29.3328 32.5864 26.5868 32.5864 21.9998C32.5864 20.2912 32.4864 18.8183 32.2833 17.562L25.2009 10.8169C24.3599 10.7175 23.4193 10.6665 22.3864 10.6665C18.2686 10.6665 15.8431 11.4359 14.3889 13.0399Z" fill={pathname === "/service-purchased" ? "#ffcc41" : "#777777"} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M24.9122 8.77686C25.4645 8.77686 25.9122 9.22458 25.9122 9.77686V13.3249C25.9122 15.2495 27.4721 16.8089 29.3976 16.8089H33.3322C33.8845 16.8089 34.3322 17.2566 34.3322 17.8089C34.3322 18.3611 33.8845 18.8089 33.3322 18.8089H29.3976C26.3684 18.8089 23.9122 16.3549 23.9122 13.3249V9.77686C23.9122 9.22458 24.36 8.77686 24.9122 8.77686Z" fill={pathname === "/service-purchased" ? "#ffcc41" : "#777777"} />
                          </svg>

                        </span>
                        &nbsp;&nbsp;Paket Saya
                      </span>
                      <span
                        className="fa fa-angle-right d-lg-none"
                        style={{
                          color:
                            pathname === "/service-purchased"
                              ? "#162D43"
                              : "#000000",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="menu-item">
                    <Link
                      onClick={() => {
                        dispacth(setRequest({ act: true, }));
                        setTimeout(() => {
                          dispacth(setRequest({ act: false }));
                        }, 1000);
                        handleClose()
                      }}
                      to="/service-available"
                      className="menu-link"
                      style={{
                        backgroundColor:
                          pathname === "/service-available" ? "#f4f6fa" : undefined,
                      }}
                    >
                      <span
                        className={`menu-title ${pathname === "/service-available" ? 'fw-bold' : undefined}`}
                        style={{
                          color:
                            pathname === "/service-available"
                              ? "#162D43"
                              : undefined,
                        }}
                      >
                        <span className="svg-icon svg-icon-primary menu-icon svg-icon-2x">
                          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="44" height="44" rx="16" fill={pathname === "/service-available" ? "#162D43" : "#eaebec"} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.6577 11.6581C13.8814 9.43435 17.3198 8.66699 22 8.66699C26.6801 8.66699 30.1185 9.43435 32.3422 11.6581C34.566 13.8818 35.3333 17.3202 35.3333 22.0003C35.3333 26.6805 34.566 30.1189 32.3422 32.3426C30.1185 34.5663 26.6801 35.3337 22 35.3337C17.3198 35.3337 13.8814 34.5663 11.6577 32.3426C9.43399 30.1189 8.66663 26.6805 8.66663 22.0003C8.66663 17.3202 9.43399 13.8818 11.6577 11.6581ZM13.0719 13.0723C11.4413 14.7029 10.6666 17.4311 10.6666 22.0003C10.6666 26.5695 11.4413 29.2978 13.0719 30.9283C14.7025 32.559 17.4308 33.3337 22 33.3337C26.5692 33.3337 29.2974 32.559 30.928 30.9283C32.5586 29.2978 33.3333 26.5695 33.3333 22.0003C33.3333 17.4311 32.5586 14.7029 30.928 13.0723C29.2974 11.4416 26.5692 10.667 22 10.667C17.4308 10.667 14.7025 11.4416 13.0719 13.0723Z" fill={pathname === "/service-available" ? "#ffcc41" : "#777777"} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M27.1095 16.8906C27.3727 17.1537 27.4679 17.5412 27.3567 17.8964L25.258 24.6017C25.1602 24.9145 24.9152 25.1594 24.6026 25.2573L17.8959 27.3573C17.5407 27.4685 17.1532 27.3733 16.89 27.1102C16.6269 26.847 16.5316 26.4596 16.6427 26.1044L18.7414 19.3977C18.8393 19.0849 19.0843 18.8399 19.3971 18.742L26.1038 16.6433C26.459 16.5322 26.8464 16.6274 27.1095 16.8906ZM20.4938 20.4945L19.1222 24.8776L23.5056 23.505L24.8772 19.1228L20.4938 20.4945Z" fill={pathname === "/service-available" ? "#ffcc41" : "#777777"} />
                          </svg>

                        </span>
                        &nbsp;&nbsp;Cari Paket
                      </span>
                      <span
                        className="fa fa-angle-right d-lg-none"
                        style={{
                          color:
                            pathname === "/service-available"
                              ? "#162D43"
                              : "#000000",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="menu-item">
                    <Link
                      onClick={() => {
                        dispacth(setRequest({ act: true, }));
                        setTimeout(() => {
                          dispacth(setRequest({ act: false }));
                        }, 1000);
                        handleClose()
                      }}
                      to="/order"
                      className="menu-link"
                      style={{
                        backgroundColor:
                          pathname === "/order" || pathname === "/order/view" ? "#f4f6fa" : undefined,
                      }}
                    >
                      <span
                        className={`menu-title ${pathname === "/order" || pathname === "/order/view" ? 'fw-bold' : undefined}`}
                        style={{
                          color:
                            pathname === "/order" || pathname === "/order/view"
                              ? "#162D43"
                              : undefined,
                        }}
                      >
                        <span className="svg-icon svg-icon-primary menu-icon svg-icon-2x">
                          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="44" height="44" rx="16" fill={pathname === "/order" || pathname === "/order/view" ? "#162D43" : "#eaebec"} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M29.3793 19.7319C28.0447 19.7319 26.9623 20.8144 26.9623 22.1491C26.9623 23.4852 28.0449 24.5675 29.3793 24.5675H34.5616C35.1139 24.5675 35.5616 25.0152 35.5616 25.5675C35.5616 26.1198 35.1139 26.5675 34.5616 26.5675H29.3793C26.9399 26.5675 24.9623 24.5894 24.9623 22.1491C24.9623 19.7098 26.9401 17.7319 29.3793 17.7319H34.5209C35.0732 17.7319 35.5209 18.1796 35.5209 18.7319C35.5209 19.2842 35.0732 19.7319 34.5209 19.7319H29.3793Z" fill={pathname === "/order" || pathname === "/order/view" ? "#ffcc41" : "#777777"} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M28.5665 22.0708C28.5665 21.5185 29.0143 21.0708 29.5665 21.0708H29.9628C30.5151 21.0708 30.9628 21.5185 30.9628 22.0708C30.9628 22.6231 30.5151 23.0708 29.9628 23.0708H29.5665C29.0143 23.0708 28.5665 22.6231 28.5665 22.0708Z" fill={pathname === "/order" || pathname === "/order/view" ? "#ffcc41" : "#777777"} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M15.475 16.8584C15.475 16.3061 15.9227 15.8584 16.475 15.8584H21.8883C22.4406 15.8584 22.8883 16.3061 22.8883 16.8584C22.8883 17.4107 22.4406 17.8584 21.8883 17.8584H16.475C15.9227 17.8584 15.475 17.4107 15.475 16.8584Z" fill={pathname === "/order" || pathname === "/order/view" ? "#ffcc41" : "#777777"} />
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.341 14.1791C11.7246 15.6631 10.9521 18.1397 10.9521 22.3375C10.9521 26.5347 11.7246 29.0114 13.341 30.4955C14.9831 32.0032 17.7441 32.723 22.3535 32.723C26.962 32.723 29.7227 32.0032 31.3647 30.4955C32.9809 29.0114 33.7535 26.5347 33.7535 22.3375C33.7535 18.1397 32.9809 15.663 31.3647 14.1791C29.7228 12.6715 26.9621 11.9521 22.3535 11.9521C17.7441 11.9521 14.9831 12.6715 13.341 14.1791ZM11.9884 12.7058C14.2215 10.6556 17.6612 9.95215 22.3535 9.95215C27.0451 9.95215 30.4844 10.6556 32.7173 12.7059C34.976 14.7797 35.7535 17.9957 35.7535 22.3375C35.7535 26.6788 34.976 29.8948 32.7173 31.9687C30.4844 34.0191 27.0451 34.723 22.3535 34.723C17.6611 34.723 14.2215 34.0191 11.9884 31.9687C9.72956 29.8948 8.95215 26.6788 8.95215 22.3375C8.95215 17.9957 9.72955 14.7796 11.9884 12.7058Z" fill={pathname === "/order" || pathname === "/order/view" ? "#ffcc41" : "#777777"} />
                          </svg>

                        </span>
                        &nbsp;&nbsp;Pembayaran
                      </span>
                      <span
                        className="fa fa-angle-right d-lg-none"
                        style={{
                          color:
                            pathname === "/order" || pathname === "/order/view"
                              ? "#162D43"
                              : "#000000",
                        }}
                      />
                    </Link>
                  </div>
              
                </div>
              </Offcanvas.Body>
            </Offcanvas>
            <div
              id="kt_app_sidebar"
              className="app-sidebar flex-column bg-white overflow-auto"
              data-kt-drawer="true"
              data-kt-drawer-name="app-sidebar"
              data-kt-drawer-activate="{default: true, lg: false}"
              data-kt-drawer-overlay="true"
              data-kt-drawer-width="225px"
              data-kt-drawer-direction="start"
              data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
            >
              <div className="app-sidebar-logo d-flex justify-content-center" id="kt_app_sidebar_logo">
                <Link to={pathname=='/service-available'?'/':'/service-available'}>
                <div className="fw-bold fs-1 text-warning">BIMBEL CPNS</div>

                </Link>
              </div>
              <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
                <div
                  id="kt_app_sidebar_menu_wrapper"
                  className="app-sidebar-wrapper hover-scroll-overlay-y my-5"
                  data-kt-scroll="true"
                  data-kt-scroll-activate="true"
                  data-kt-scroll-height="auto"
                  data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
                  data-kt-scroll-wrappers="#kt_app_sidebar_menu"
                  data-kt-scroll-offset="5px"
                  data-kt-scroll-save-state="true"
                >
                  <div
                    className="
                                                                                                                                                  menu menu-column menu-rounded menu-sub-indention
                                                                                                                                                  px-3
                                                                                                                                                "
                    id="#kt_app_sidebar_menu"
                    data-kt-menu="true"
                    data-kt-menu-expand="false"
                  >
                    <div className="menu-item mb-5">
                      <div className="mb-4 text-center">
                        <img style={{ width: '30%' }} alt="" src={people} />
                      </div>
                      <div className="mb-1 text-center">
                        <b>
                          {user?.name}</b>
                      </div>
                      <div className="mb-1 text-center">
                        <div style={{ fontSize: '12px' }}>
                          {user?.email}
                        </div>
                      </div>
                    
                    </div>

                    <div className="menu-item ">
                      <Link
                        onClick={() => {
                          dispacth(setRequest({ act: true, }));
                          setTimeout(() => {
                            dispacth(setRequest({ act: false }));
                          }, 1000);
                        }}
                        className="menu-link"
                        style={{
                          backgroundColor:
                            pathname === "/service-purchased"
                              ? "#f4f6fa"
                              : undefined,
                        }}
                        to="/service-purchased"
                      >
                        <span className="menu-icon ms-7">
                          <span className="svg-icon menu-icon svg-icon-2x">
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="44" height="44" rx="16" fill={pathname === "/service-purchased" ? "#162D43" : "#eaebec"} />
                              <path fillRule="evenodd" clipRule="evenodd" d="M17.207 26.5996C17.207 26.0473 17.6548 25.5996 18.207 25.5996H25.4071C25.9593 25.5996 26.4071 26.0473 26.4071 26.5996C26.4071 27.1519 25.9593 27.5996 25.4071 27.5996H18.207C17.6548 27.5996 17.207 27.1519 17.207 26.5996Z" fill={pathname === "/service-purchased" ? "#ffcc41" : "#777777"} />
                              <path fillRule="evenodd" clipRule="evenodd" d="M17.2059 21.2515C17.2059 20.6992 17.6537 20.2515 18.2059 20.2515H22.6806C23.2328 20.2515 23.6806 20.6992 23.6806 21.2515C23.6806 21.8037 23.2328 22.2515 22.6806 22.2515H18.2059C17.6537 22.2515 17.2059 21.8037 17.2059 21.2515Z" fill={pathname === "/service-purchased" ? "#ffcc41" : "#777777"} />
                              <path fillRule="evenodd" clipRule="evenodd" d="M12.9072 11.6965C14.9497 9.44374 18.1175 8.6665 22.3864 8.6665C23.622 8.6665 24.7617 8.73506 25.7888 8.87576C25.9968 8.90425 26.1907 8.99753 26.3427 9.14236L33.9027 16.3424C34.0563 16.4886 34.1593 16.6798 34.1971 16.8884C34.4643 18.3649 34.5864 20.068 34.5864 21.9998C34.5864 26.6662 33.8948 30.0869 31.8767 32.3089C29.832 34.5598 26.6605 35.3332 22.3864 35.3332C18.1185 35.3332 14.9503 34.5597 12.9075 32.3085C10.8913 30.0868 10.1997 26.6664 10.1997 21.9998C10.1997 17.3396 10.8915 13.9197 12.9072 11.6965ZM14.3889 13.0399C12.9079 14.6733 12.1997 17.4201 12.1997 21.9998C12.1997 26.5866 12.9081 29.333 14.3886 30.9645C15.8425 32.5666 18.2676 33.3332 22.3864 33.3332C26.5121 33.3332 28.9407 32.5665 30.3961 30.9641C31.878 29.3328 32.5864 26.5868 32.5864 21.9998C32.5864 20.2912 32.4864 18.8183 32.2833 17.562L25.2009 10.8169C24.3599 10.7175 23.4193 10.6665 22.3864 10.6665C18.2686 10.6665 15.8431 11.4359 14.3889 13.0399Z" fill={pathname === "/service-purchased" ? "#ffcc41" : "#777777"} />
                              <path fillRule="evenodd" clipRule="evenodd" d="M24.9122 8.77686C25.4645 8.77686 25.9122 9.22458 25.9122 9.77686V13.3249C25.9122 15.2495 27.4721 16.8089 29.3976 16.8089H33.3322C33.8845 16.8089 34.3322 17.2566 34.3322 17.8089C34.3322 18.3611 33.8845 18.8089 33.3322 18.8089H29.3976C26.3684 18.8089 23.9122 16.3549 23.9122 13.3249V9.77686C23.9122 9.22458 24.36 8.77686 24.9122 8.77686Z" fill={pathname === "/service-purchased" ? "#ffcc41" : "#777777"} />
                            </svg>

                          </span>
                        </span>
                        <span
                          style={{
                            color:
                              pathname === "/service-purchased"
                                ? "#162D43"
                                : "#777777",
                          }}
                          className="
                          menu-title
                          align-items-center
                          ps-1
                          fs-5
                          fw-bold
                        "
                        >
                          Paket Saya
                        </span>
                      </Link>
                    </div>
                    <div className="menu-item ">
                      <Link
                        onClick={() => {
                          dispacth(setRequest({ act: true, }));
                          setTimeout(() => {
                            dispacth(setRequest({ act: false }));
                          }, 1000);
                        }}
                        className="menu-link"
                        style={{
                          backgroundColor:
                            pathname === "/service-available"
                              ? "#f4f6fa"
                              : undefined,
                        }}
                        to="/service-available"
                      >
                        <span className="menu-icon ms-7">
                          <span className="svg-icon menu-icon svg-icon-2x">
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="44" height="44" rx="16" fill={pathname === "/service-available" ? "#162D43" : "#eaebec"} />
                              <path fillRule="evenodd" clipRule="evenodd" d="M11.6577 11.6581C13.8814 9.43435 17.3198 8.66699 22 8.66699C26.6801 8.66699 30.1185 9.43435 32.3422 11.6581C34.566 13.8818 35.3333 17.3202 35.3333 22.0003C35.3333 26.6805 34.566 30.1189 32.3422 32.3426C30.1185 34.5663 26.6801 35.3337 22 35.3337C17.3198 35.3337 13.8814 34.5663 11.6577 32.3426C9.43399 30.1189 8.66663 26.6805 8.66663 22.0003C8.66663 17.3202 9.43399 13.8818 11.6577 11.6581ZM13.0719 13.0723C11.4413 14.7029 10.6666 17.4311 10.6666 22.0003C10.6666 26.5695 11.4413 29.2978 13.0719 30.9283C14.7025 32.559 17.4308 33.3337 22 33.3337C26.5692 33.3337 29.2974 32.559 30.928 30.9283C32.5586 29.2978 33.3333 26.5695 33.3333 22.0003C33.3333 17.4311 32.5586 14.7029 30.928 13.0723C29.2974 11.4416 26.5692 10.667 22 10.667C17.4308 10.667 14.7025 11.4416 13.0719 13.0723Z" fill={pathname === "/service-available" ? "#ffcc41" : "#777777"} />
                              <path fillRule="evenodd" clipRule="evenodd" d="M27.1095 16.8906C27.3727 17.1537 27.4679 17.5412 27.3567 17.8964L25.258 24.6017C25.1602 24.9145 24.9152 25.1594 24.6026 25.2573L17.8959 27.3573C17.5407 27.4685 17.1532 27.3733 16.89 27.1102C16.6269 26.847 16.5316 26.4596 16.6427 26.1044L18.7414 19.3977C18.8393 19.0849 19.0843 18.8399 19.3971 18.742L26.1038 16.6433C26.459 16.5322 26.8464 16.6274 27.1095 16.8906ZM20.4938 20.4945L19.1222 24.8776L23.5056 23.505L24.8772 19.1228L20.4938 20.4945Z" fill={pathname === "/service-available" ? "#ffcc41" : "#777777"} />
                            </svg>
                          </span>
                        </span>
                        <span
                          style={{
                            color:
                              pathname === "/service-available"
                                ? "#162D43"
                                : "#777777",
                          }}
                          className="
                          menu-title
                          align-items-center
                          ps-1
                          fs-5
                          fw-bold
                        "
                        >
                          Cari Paket
                        </span>
                      </Link>
                    </div>
                    
                    <div className="menu-item ">
                      <Link
                        onClick={() => {
                          dispacth(setRequest({ act: true, }));
                          setTimeout(() => {
                            dispacth(setRequest({ act: false }));
                          }, 1000);
                        }}
                        className="menu-link"
                        style={{
                          backgroundColor:
                            pathname === "/order" || pathname === "/order/view"
                              ? "#f4f6fa"
                              : undefined,
                        }}
                        to="/order"
                      >
                        <span className="menu-icon ms-7">
                          <span className="svg-icon menu-icon svg-icon-2x">
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="44" height="44" rx="16" fill={pathname === "/order" || pathname === "/order/view" ? "#162D43" : "#eaebec"} />
                              <path fillRule="evenodd" clipRule="evenodd" d="M29.3793 19.7319C28.0447 19.7319 26.9623 20.8144 26.9623 22.1491C26.9623 23.4852 28.0449 24.5675 29.3793 24.5675H34.5616C35.1139 24.5675 35.5616 25.0152 35.5616 25.5675C35.5616 26.1198 35.1139 26.5675 34.5616 26.5675H29.3793C26.9399 26.5675 24.9623 24.5894 24.9623 22.1491C24.9623 19.7098 26.9401 17.7319 29.3793 17.7319H34.5209C35.0732 17.7319 35.5209 18.1796 35.5209 18.7319C35.5209 19.2842 35.0732 19.7319 34.5209 19.7319H29.3793Z" fill={pathname === "/order" || pathname === "/order/view" ? "#ffcc41" : "#777777"} />
                              <path fillRule="evenodd" clipRule="evenodd" d="M28.5665 22.0708C28.5665 21.5185 29.0143 21.0708 29.5665 21.0708H29.9628C30.5151 21.0708 30.9628 21.5185 30.9628 22.0708C30.9628 22.6231 30.5151 23.0708 29.9628 23.0708H29.5665C29.0143 23.0708 28.5665 22.6231 28.5665 22.0708Z" fill={pathname === "/order" || pathname === "/order/view" ? "#ffcc41" : "#777777"} />
                              <path fillRule="evenodd" clipRule="evenodd" d="M15.475 16.8584C15.475 16.3061 15.9227 15.8584 16.475 15.8584H21.8883C22.4406 15.8584 22.8883 16.3061 22.8883 16.8584C22.8883 17.4107 22.4406 17.8584 21.8883 17.8584H16.475C15.9227 17.8584 15.475 17.4107 15.475 16.8584Z" fill={pathname === "/order" || pathname === "/order/view" ? "#ffcc41" : "#777777"} />
                              <path fillRule="evenodd" clipRule="evenodd" d="M13.341 14.1791C11.7246 15.6631 10.9521 18.1397 10.9521 22.3375C10.9521 26.5347 11.7246 29.0114 13.341 30.4955C14.9831 32.0032 17.7441 32.723 22.3535 32.723C26.962 32.723 29.7227 32.0032 31.3647 30.4955C32.9809 29.0114 33.7535 26.5347 33.7535 22.3375C33.7535 18.1397 32.9809 15.663 31.3647 14.1791C29.7228 12.6715 26.9621 11.9521 22.3535 11.9521C17.7441 11.9521 14.9831 12.6715 13.341 14.1791ZM11.9884 12.7058C14.2215 10.6556 17.6612 9.95215 22.3535 9.95215C27.0451 9.95215 30.4844 10.6556 32.7173 12.7059C34.976 14.7797 35.7535 17.9957 35.7535 22.3375C35.7535 26.6788 34.976 29.8948 32.7173 31.9687C30.4844 34.0191 27.0451 34.723 22.3535 34.723C17.6611 34.723 14.2215 34.0191 11.9884 31.9687C9.72956 29.8948 8.95215 26.6788 8.95215 22.3375C8.95215 17.9957 9.72955 14.7796 11.9884 12.7058Z" fill={pathname === "/order" || pathname === "/order/view" ? "#ffcc41" : "#777777"} />
                            </svg>




                          </span>
                        </span>
                        <span
                          style={{
                            color:
                              pathname === "/order" || pathname === "/order/view"
                                ? "#162D43"
                                : "#777777",
                          }}
                          className="
                          menu-title
                          align-items-center
                          ps-1
                          fs-5
                          fw-bold
                        "
                        >
                          Pembayaran
                        </span>
                      </Link>
                    </div>
                  
                    <div className="menu-item d-flex justify-content-center">
                      <hr className="border border-solid border-2 border-secondary border-dashed w-100" />
                    </div>
              
                  </div>
                </div>
              </div>
            </div>
            <div
              className="
                                                                                                        app-header-menu
                                                                                                        ms-auto
                                                                                                        me-auto
                                                                                                        app-header-mobile-drawer
                                                                                                        align-items-stretch
                                                                                                      "
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
              <div
                className="
                  menu menu-rounded menu-column menu-lg-row
                  my-5 my-lg-0
                  align-items-stretch
                  fw-semibold
                  px-2 px-lg-0
                "
                id="kt_app_header_menu"
                data-kt-menu="true"
              >
                <div className="menu-item d-lg-none">
                  <span className="menu-link active">
                    <a className="menu-title" href="/penyelenggara">
                      <svg
                        width={18}
                        height={15}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24.000000 21.000000"
                      >
                        <path
                          d="M17 17.9924V23.9924H21C22.6568 23.9924 24 22.6492 24 20.9924V11.8714C24.0002 11.3519 23.7983 10.8527 23.437 10.4794L14.939 1.29236C13.4396 -0.329979 10.9089 -0.429588 9.28655 1.06985C9.20948 1.1411 9.13523 1.2153 9.06403 1.29236L0.581016 10.4764C0.208734 10.8512 -0.000140554 11.3581 7.09607e-08 11.8864V20.9924C7.09607e-08 22.6492 1.34316 23.9924 3 23.9924H6.99998V17.9924C7.01869 15.2656 9.22027 13.0388 11.8784 12.9747C14.6255 12.9084 16.9791 15.1731 17 17.9924Z"
                          fill="#0D0F8F"
                        />
                      </svg>
                      &nbsp;&nbsp;Beranda
                    </a>
                    <span className="menu-arrow d-lg-none" />
                  </span>
                </div>
                <div className="menu-item d-lg-none">
                  <span className="menu-link">
                    <a className="menu-title" href="/penyelenggara/event">
                      <svg
                        version={1.0}
                        width={18}
                        height={15}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24.000000 21.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g
                          transform="translate(0.000000,21.000000) scale(0.100000,-0.100000)"
                          fill={
                            pathname === "/penyelenggara/event"
                              ? "#0D0F8F"
                              : "#000000"
                          }
                          stroke="none"
                        >
                          <path
                            d="M77 190 c-14 -11 -32 -20 -41 -20 -15 0 -36 -28 -36 -49 0 -7 42 -11
                                                                                                                                                                            120 -11 78 0 120 4 120 11 0 22 -21 49 -39 49 -10 0 -26 9 -36 20 -10 11 -28
                                                                                                                                                                            20 -40 20 -12 0 -34 -9 -48 -20z m73 -5 c11 -13 6 -15 -31 -15 -41 1 -43 2
                                                                                                                                                                            -25 15 25 19 40 19 56 0z"
                          />
                          <path
                            d="M0 56 c0 -42 29 -56 116 -56 89 0 124 15 124 55 0 24 0 24 -120 24
                                                                                                                                                                -118 0 -120 0 -120 -23z"
                          />
                        </g>
                      </svg>
                      &nbsp;&nbsp;Event
                    </a>
                    <span className="menu-arrow d-lg-none" />
                  </span>
                </div>
              </div>
            </div>
            <div className="app-navbar flex-shrink-0">
              {/* <Dropdown3 :title="user_name.data" /> */}
            
              {widthWind === 0 ? <Dropdown2 /> : <Dropdown1 />}
              <div
                className="app-navbar-item d-lg-none ms-2 me-n3"
                title="Show header menu"
              >
                <div
                  className="btn btn-icon btn-active-color-primary w-35px h-35px"
                  variant="primary"
                  onClick={handleShow}
                >
                  {/*begin::Svg Icon | path: icons/duotune/text/txt001.svg*/}
                  <span className="svg-icon svg-icon-3x">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="#162d43" />
                    </svg>

                  </span>
                  {/*end::Svg Icon*/}{" "}
                </div>
              </div>
            </div>
          </div >
        </div >

      </div >
    </>
  );
};

export default KtAppHeaderOrganizer;
