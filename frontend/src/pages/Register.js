import { useState, useEffect } from "react";
import banner from "../assets/images/banner.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  district,
  institution,
  province,
  registerUser,
} from "../features/user/userSlice";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import $ from "jquery";
import Select2n from "../components/Select2n";

const initialState = {
  name: "",
  password: "",
  email: "",
};

function Register() {
  useEffect(() => {
    document.title = `Bimbel CPNS | Daftar`;
  }, []);
  
  // Toggle password visibility
  const suffixIcon = () => {
    $(".suffixcicon").toggleClass("bi-eye bi-eye-slash");
    var input = $($(".suffixcicon").attr("toggle"));
    if (input.attr("type") === "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  };

  const { isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Form submit handler
  const onSubmit1 = (values) => {
    // Dispatch the register action
    dispatch(registerUser(values));
  };

  // Formik hook with validation schema
  const formik = useFormik({
    initialValues: initialState,
    onSubmit: onSubmit1,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email tidak boleh kosong")
        .email("Email tidak valid"),
      password: yup
        .string()
        .required("Password tidak boleh kosong")
        .min(8, "Password minimal 8 karakter"),
      name: yup.string().required("Nama tidak boleh kosong"),
    }),
  });

  const handleChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <>
      <div className="d-flex flex-column flex-root h-100">
        <div
          className="d-flex flex-column flex-lg-row flex-column-fluid"
          style={{ backgroundColor: "white" }}
        >
          <div className="d-flex flex-column flex-lg-row-fluid w-lg-40 p-10 p-md-10 pt-10 order-2 order-lg-1">
            <div className="d-flex align-items-center flex-shrink-0">
              <Link to="/" className="btn btn-icon h-30px">
                <i
                  className="fas fa-arrow-left fs-3 text-warning"
                />
                &nbsp;&nbsp;
                <span className="fw-bold lead text-warning">
                  Kembali
                </span>
              </Link>
            </div>
            <div className="d-flex flex-center flex-column flex-lg-row-fluid">
              <div className="w-lg-600px w-100 p-xl-12 p-lg-18 p-md-18 p-0">
                <form className="form w-100" onSubmit={formik.handleSubmit}>
                  <div className="text-center mb-11">
                    <h1 className="fw-bolder mb-3 text-warning">Daftar</h1>
                  </div>
                  <div className="row">
                    <p className="text-justify lead">
                      Masukkan semua data yang diperlukan form pendaftaran akun anda.
                    </p>
                    <div className="col-12">
                      <div className="mb-5">
                        <label htmlFor="name" className="form-label">
                          Nama
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          className="form-control form-control-solid"
                          placeholder="Masukkan nama lengkap"
                        />
                        {formik.touched.name && formik.errors.name && (
                          <span className="text-danger mb-0">
                            {formik.errors.name}
                          </span>
                        )}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          className="form-control form-control-solid"
                          placeholder="email.anda@gmail.com"
                          autoComplete="off"
                        />
                        {formik.touched.email && formik.errors.email && (
                          <span className="text-danger mb-0">
                            {formik.errors.email}
                          </span>
                        )}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <div className="position-relative">
                          <input
                            id="inputPassword"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className="form-control form-control-solid"
                            type="password"
                            placeholder="Minimal 8 karakter"
                            autoComplete="off"
                          />
                          <span
                            className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n5 pe-13"
                            data-kt-password-meter-control="visibility"
                          >
                            <i
                              toggle="#inputPassword"
                              className="bi bi-eye fs-2 suffixcicon"
                              onClick={suffixIcon}
                            />
                          </span>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                          <span className="text-danger mb-0">
                            {formik.errors.password}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-grid mt-6">
                    <button
                      type="submit"
                      className="btn rounded-pill bg-warning"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm text-white"
                            role="status"
                            aria-hidden="true"
                          ></span>{" "}
                          &nbsp;
                          <span className="indicator-label lead">
                            Mohon tunggu...
                          </span>
                        </>
                      ) : (
                        <span className="indicator-label lead">
                          Daftar
                        </span>
                      )}
                    </button>
                  </div>
                  <p className="lead text-center mt-6">
                    Sudah Punya Akun?
                    <Link
                      style={{ cursor: "pointer" }}
                      className="text-warning"
                      to="/login"
                    >
                      Masuk
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div
            className="d-flex flex-lg-row-fluid w-lg-40 bgi-size-cover bgi-position-center bg-warning"
          >
            <div className="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
              <Link href="/landing" className="mb-0 mb-lg-6 d-none d-lg-block mx-0">
                <img alt="Logo" src={banner} className="h-400px" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
