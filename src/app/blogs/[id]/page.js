"use client";
import { useGetBlogQuery } from "@/Services/API/Blogs";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import moment from "moment";
import { Chip, Divider, Textarea } from "@nextui-org/react";
import NextButton from "@/NextUI/NextButton";
import { useFormik } from "formik";
import { commentInitialState } from "@/Configurations/InitialStates";
import { commentSchema } from "@/Configurations/YupSchema";
import { Helmet } from "react-helmet";
import { useCreateCommentMutation } from "@/Services/API/Comments";
import { useAlert } from "@/Hooks/Toastify";

const page = ({ params }) => {
  const { showAlert } = useAlert();

  const { data  ,refetch} = useGetBlogQuery({ id: params.id });
  const [modalState, setModalState] = useState("Create");
  const [CreateComment] = useCreateCommentMutation();

  const handleComment = async (values) => {
    const toastid = showAlert(null, `Please we will ${modalState}ing`, "info");
    try {
      let response;
      response = await CreateComment(values).unwrap();

      showAlert(toastid, response.message, response?.status);
      handleReset()
      refetch()
    } catch (error) {
      Array.isArray(error.data.errors)
        ? error.data.errors.forEach((error) => showAlert(toastid, error, false))
        : showAlert(toastid, "Something went wrong", false);
    }
  };
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: commentInitialState,
    validationSchema: commentSchema,
    onSubmit: handleComment,
  });

  useEffect(() => {
    setFieldValue("blog_id", params.id);
  }, [params]);

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <div>
                    <p
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {data?.blog?.created_by_user?.display_name}
                    </p>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      {data?.blog?.created_by_user?.designation}
                    </p>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      <time>
                        {moment(data?.blog?.created_at).format("lll")}
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <Chip
                color="warning"
                variant="bordered"
                className="rounded p-0  h-fit mb-2"
              >
                {data?.blog?.category?.name}
              </Chip>
              <span className="h1 pt-16 text-xl	"> / </span>
              <Chip
                color="success"
                variant="bordered"
                className="rounded p-0  h-fit mb-2"
              >
                {data?.blog?.category?.name}
              </Chip>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {data?.blog?.title}
              </h1>
            </header>
            <div>
              <div dangerouslySetInnerHTML={{ __html: data?.blog?.content }} />
            </div>

            <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion ({data?.blog?.comments?.length})
                </h2>
              </div>
              <Textarea
                label="Description"
                placeholder="Enter your description"
                className=""
                variant="faded"
                onBlur={(e) => setFieldTouched("comment", true)}
                rows={15}
                onChange={(e) => setFieldValue("comment", e.target.value)}
                errorMessage={touched?.comment && errors?.comment}
                isInvalid={Boolean(touched?.comment && errors?.comment)}
              />
              <div className="flex justify-end my-3">
                <NextButton
                  type={"submit"}
                  buttonText="Submit"
                  onClick={handleSubmit}
                  name="Submit"
                  isDisabled={(values?.comment || "").length <= 0}
                />
              </div>
               {_.map(data?.blog?.comments, (comment) => {
                return (
                  <>
                    <Divider className=" bg-black" key={comment?.id} />
                    <article className="px-6 py-3 text-base bg-white rounded-lg dark:bg-gray-900">
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 font-semibold text-medium text-gray-900 dark:text-white">
                            {comment?.created_by_user?.display_name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time>{moment(comment?.created_at).fromNow()}</time>
                          </p>
                        </div>
                      </footer>
                      <p>
                       {
                        comment?.comment
                       } </p>
                    </article>
                  </>
                );
              })}
            </section>
          </article>
        </div>
      </main>
    </>
  );
};

export default page;
