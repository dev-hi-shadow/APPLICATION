"use client"; // Ensure this component is treated as a client component
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation, useProfileQuery } from "../../Services/API/auth";
 import { useFormik } from "formik";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useAlert } from "@/Hooks/Toastify";
import { SignInInitialState } from "@/Configurations/InitialStates";
import { SignInSchema } from "@/Configurations/YupSchema";

const SignIn = () => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const [activePage, setActivePage] = useState("/");

  const { data, isError, isLoading } = useProfileQuery();

  useEffect(() => {
     if (activePage === "/" && !isLoading && !isError && data?.success) {
      router.push("/");
    }
  }, [activePage, data, isError, isLoading, router]);

  const [login] = useLoginMutation();

  const handleSignInSubmit = async (formData) => {
    try {
      const data = await login(formData).unwrap();
       window.localStorage.setItem("accessToken", data.data.token);
      showAlert("Signin Successful");
      router.push("/");
    } catch (err) {
      showAlert(
        `Signin Failed: ${err.data ? err.data.error : "An error occurred"}`
      );
    }
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: SignInInitialState,
      validationSchema: SignInSchema,
      onSubmit: handleSignInSubmit,
    });

  return (
    <main className="main-content my-5 ps">
      <section>
        <div className="page-header min-vh-75">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-6 col-md-7 d-flex flex-column mx-auto">
                <div className="card card-plain mt-8">
                  <div className="card-header text-left bg-transparent py-4 flex justify-between items-center">
                    <h3 className="font-weight-bolder text-info text-gradient">
                      Welcome back
                    </h3>
                    <p className="mb-0">
                      Enter your email and password to sign in
                    </p>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <Input
                        className="mb-3"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.credential}
                        variant="bordered"
                        name="credential"
                        type="text"
                        isRequired
                        placeholder="Email or Phone"
                        isInvalid={errors.credential && touched.credential}
                        errorMessage={touched.credential && errors.credential}
                      />
                      <Input
                        className="mb-3"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.password}
                        name="password"
                        variant="bordered"
                        type="password"
                        isRequired
                        placeholder="Password"
                        isInvalid={errors.password && touched.password}
                        errorMessage={touched.password && errors.password}
                      />
                      <Button type="submit" variant="faded" color="primary">
                        Sign in
                      </Button>
                    </form>
                  </div>
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-4 text-sm mx-auto">
                      Don't have an account?
                      <Link
                        href="/sign-up"
                        className="text-info text-gradient font-weight-bold"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                  <div
                    className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                    style={{
                      backgroundImage: `url("/assets/img/curved-images/curved6.jpg")`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
