import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import { validationSchema } from "../Validations/LoginValidation";

const Login = () => {
 
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
       dispatch(login(values));
       values.email = ""
       values.password = ""
    },
  });

  if (token) {
    return <Navigate to="/dashboard/home" />;
   }
  return (
    <div className="container-fluid" style={{ backgroundColor: "#9A616D" }}>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card shadow" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://img.webcodegenie.com/img/home/web-development.svg?ver=20240612092547"
                      alt="login form"
                      className="img-fluid h-100"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">
                            Product Category Website
                          </span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label className="form-label" htmlFor="form">
                            Email address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Your Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="form-control form-control-lg"
                          />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="text-danger">
                            {formik.errors.email}
                          </div>
                        ) : null}
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example27">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className="form-control form-control-lg"
                          />
                        {formik.touched.password && formik.errors.password ? (
                          <div className="text-danger">
                            {formik.errors.password}
                          </div>
                        ) : null}
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
