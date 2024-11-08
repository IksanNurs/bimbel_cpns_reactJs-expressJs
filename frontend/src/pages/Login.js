import { useEffect } from "react";
import banner from "../assets/images/banner.svg";
//import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
//import { loginUser } from '../features/user/userSlice';
import { Link } from "react-router-dom";
import $ from "jquery";
import "select2";
import "select2/dist/css/select2.min.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { loginUser, setLogout } from "../features/user/userSlice";


const initialState = {
  email: "",
  password: "",
};

function Login() {
  useEffect(() => {
    document.title = `Bimbel CPNS | Masuk`;
  }, []);
  // const selectInput = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLogout({ isLogout: false }));
    const getData = async () => {

    };
    getData();
  }, [dispatch]);

  const suffixIcon = () => {
    $(".suffixcicon").toggleClass("bi-eye bi-eye-slash");
    var input = $($(".suffixcicon").attr("toggle"));
    if (input.attr("type") === "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  };
  const onSubmit1 = async () => {
  const resp= await dispatch(
      loginUser({
        email: formik.values.email,
        password: formik.values.password,
      })
    );
    console.log(resp)
  };
  //const [values, setValues] = useState(initialState);
  const formik = useFormik({
    initialValues: initialState,
    onSubmit: onSubmit1,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("email tidak boleh kosong")
        .email("email tidak valid"),
      password: yup
        .string()
        .required("password tidak boleh kosong")
        .min(8, "password minimal 8 karakter"),
    }),
  });
  const { isLoading } = useSelector((store) => store.user);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleChange = (e) => {
    //const name = e.target.name;
    //const value = e.target.value;

    //setValues({ ...values, [name]: value });
    formik.setFieldValue(e.target.name, e.target.value);
    //////console.log(value)
  };
  const { he, wi } = useSelector((store) => store.package)
  return (
    <>
      <div
        className="d-flex flex-column flex-root h-100 bg-white"
        id="kt_app_root"
        style={{ minHeight: he, minWidth: wi }}
      >
        <div className="d-flex flex-column flex-lg-row flex-column-fluid bg-white">
          <div
            className="
          d-flex
          flex-column flex-lg-row-fluid
          w-lg-60
          p-md-10
          pt-10
          p-10
          order-2 order-lg-1
        "
          >
            <div className="d-flex align-items-center flex-shrink-0">
              <Link to="/" className="btn btn-icon h-30px">
                <i
                  className="fas fa-arrow-left fs-3 text-warning"
                />
                &nbsp;&nbsp;
                <span
                  className="fw-bold lead text-warning"
                >
                  Kembali
                </span>
              </Link>
            </div>
            <div className="d-flex flex-center flex-column flex-lg-row-fluid">
              <div className="w-lg-600px w-100 p-xl-12 p-lg-18 p-md-18 p-0">
                <form className="form w-100" onSubmit={formik.handleSubmit}>
                  <div className="text-center mb-11">
                    <h1 className="fw-bolder mb-3 text-warning">
                      Masuk
                    </h1>
                  </div>
                  <div className="fv-row mb-5">
                    <p className="text-justify lead">
                      Masukkan alamat email dan password anda yang telah
                      didaftarkan sebelumnya.
                    </p>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="..."
                      name="email"
                      autoComplete="on"
                      className="form-control rounded-pill ps-6"
                      onChange={handleChange}
                    />
                    {formik.touched.email && formik.errors.email && <span className="text-danger mb-0">
                      {" "}
                      {formik.errors.email}
                    </span>}
                  </div>

                  <div className="fv-row mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        id="inputPassword"
                        className="form-control form-control-lg ps-6 rounded-pill"
                        onChange={handleChange}
                        type="password"
                        placeholder="..."
                        name="password"
                        autoComplete="on"
                      />
                      <span
                        className="
                      btn btn-sm btn-icon
                      position-absolute
                      translate-middle
                      top-50
                      end-0
                      me-n5
                      pe-13
                    "
                        data-kt-password-meter-control="visibility"
                      >
                        <i
                          toggle="#inputPassword"
                          className="bi bi-eye fs-2 suffixcicon"
                          onClick={suffixIcon}
                        />
                      </span>
                    </div>
                    {formik.touched.password && formik.errors.password && <span className="text-danger mb-0">
                      {" "}
                      {formik.errors.password}
                    </span>}
                  </div>
                  <div
                    className="
                  d-flex
                  flex-stack flex-wrap
                  gap-3
                  fs-base
                  fw-semibold
                  mb-8
                "
                  >
                    <div />
                    <Link
                      to="/forgot"
                      className="lead text-warning"
                      style={{  cursor: "pointer" }}
                    >
                      Lupa Kata Sandi ?
                    </Link>
                  </div>
                  <div className="d-grid mt-6">
                    <button
                      type="submit"
                      className="btn rounded-pill bg-warning"
                      
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
                        <span className="indicator-label  lead">
                          Masuk
                        </span>
                      )}
                    </button>
                  </div>
                  <p className="lead text-center mt-6">
                    Belum Punya Akun?
                    <Link
                    className="text-warning"
                      style={{ cursor: "pointer" }}
                      to="/register"
                    >
                      Daftar Sekarang
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div
            className="
          d-flex
          flex-lg-row-fluid
          w-lg-40
          bgi-size-cover bgi-position-center bg-warning
        "
            
          >
            {/*begin::Content*/}
            <div
              className="
            d-flex
            flex-column flex-center
            py-7 py-lg-15
            px-5 px-md-15
            w-100
          "
            >

          
              <Link
                href="/landing"
                className="mb-0 mb-lg-6 d-none d-lg-block mx-0"
              >
                <img alt="Logo" src={banner} className="h-400px" />
              </Link>
              {/*end::Text*/}
            </div>
            {/*end::Content*/}
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
