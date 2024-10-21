"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
  TableBody,
  TableHeader,
} from "@nextui-org/react";
import moment from "moment";
import { useGetSubCategoriesQuery } from "@/Services/API/SubCategory";
import { BlogInitialState } from "@/Configurations/InitialStates";
import { BlogSchema, SubCategorySchema } from "@/Configurations/YupSchema";
import { Pagination } from "@nextui-org/react";
import { useAlert } from "@/Hooks/Toastify";
import {
  useCreateBlogsMutation,
  useDeleteBlogsMutation,
  useGetBlogsQuery,
  useUpdateBlogsMutation,
} from "@/Services/API/Blogs";
import NextInput from "@/NextUI/NextInput";
import { useGetUsersQuery } from "@/Services/API/Users";
import RichTextEditor from "@/NextUI/RichTextEditor";
import Link from "next/link";
import Head from "next/head";
import { Helmet } from "react-helmet";
import { extractTextFromHTML } from "@/Utils";

const SubCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ModalState, setModalState] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showAlert } = useAlert();

  const { data: GetSubCategory } = useGetSubCategoriesQuery();

  const [CreateBlog, {}] = useCreateBlogsMutation();
  const [DeleteBlog, {}] = useDeleteBlogsMutation();
  const [UpdateBlog, {}] = useUpdateBlogsMutation();

  const { data: GetBlogs, refetch } = useGetBlogsQuery({
    offset: (currentPage - 1) * 12,
    limit: 12,
  });

  const handleBlog = async (values) => {
    delete values.created_at;
    delete values.updated_at;

    const toastid = showAlert(null, `Please we will ${ModalState}ing`, "info");
    try {
      let response;
      if (ModalState === "Update") {
        response = await UpdateBlog(values).unwrap();
      } else if (ModalState === "Create") {
        response = await CreateBlog(values).unwrap();
      } else if (["Delete", "Deactivated"].includes(ModalState)) {
        response = await DeleteBlog(values).unwrap();
      }
      refetch();
      showAlert(
        toastid,
        response.message,
        response.success || response?.status
      );
      onClose();
      resetForm();
    } catch (error) {
      console.log("error:", error);
      Array.isArray(error.data.errors)
        ? error.data.errors.forEach((error) => showAlert(toastid, error, false))
        : showAlert(toastid, "Something went wrong", false);
    }
  };

  const {
    setFieldValue,
    values,
    handleChange,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: BlogInitialState,
    validationSchema: BlogSchema,
    onSubmit: handleBlog,
  });
  console.log("errors` :>> ", errors);
  console.log("values` :>> ", values);

  return (
    <>
      <Helmet>
        <title>Blogs</title>
      </Helmet>

      <div className="d-flex justify-content-between px-3">
        <h6 className="card-title">
          Total {GetBlogs?.data?.blogs?.count} Blog(s)
        </h6>
        <div className="d-flex gap-3">
          <Button
            variant="faded"
            color="primary"
            className="text-decoration-none"
            onClick={() => {
              setModalState("Create"), onOpen();
            }}
          >
            Create Blog
          </Button>
        </div>
      </div>

      <div className="flex flex-row gap-3 flex-wrap px-3">
        {_.map(GetBlogs?.data?.blogs?.rows, (blog) => {
          return (
            <div
              key={blog.id}
              className=" p-4 border-2	border-grey-900 rounded-xl		 lg:p-6 transition-all duration-300 max-w-[360px]   group-hover:bg-gray-50"
            >
              <span className="text-indigo-600 font-medium mb-3 block flex justify-between ">
                <span>@{blog?.created_by_user?.display_name}</span>
                <span>{moment(blog?.created_at).fromNow()}</span>
              </span>
              <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">
                {blog?.title}
              </h4>
              <p className="text-gray-500 leading-6 mb-10  whitespace-nowrap text-ellipsis overflow-hidden  ">
                {extractTextFromHTML(blog?.content)}
              </p>
              <Link href={`/blogs/${blog.id}`}>Read More...</Link>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center absolute bottom-0 left-0 right-0 mb-4">
        <Pagination
          page={currentPage}
          onChange={setCurrentPage}
          showControls
          total={Math.ceil(GetBlogs?.data?.blogs?.count / 12)}
          color={["primary"]}
          classNames={{
            item: " data-[active=true]:bg-primary data-[active=true]:text-white",
          }}
        />
      </div>

      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="p-3">{ModalState} Blogs</ModalHeader>
          <form onSubmit={handleSubmit}>
            {["Create", "Update"].includes(ModalState) && (
              <ModalBody className="p-3">
                <NextInput
                  type="text"
                  value={values.title}
                  variant="faded"
                  label="Title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />

                <Autocomplete
                  label="Sub Category"
                  variant=""
                  className=""
                  selectedKey={values.sub_category_id?.toString()}
                  onSelectionChange={(e) => setFieldValue("sub_category_id", e)}
                  onBlur={handleBlur}
                >
                  {Array.isArray(GetSubCategory?.data?.rows) &&
                    GetSubCategory?.data?.rows?.map((item, index) => (
                      <AutocompleteItem
                        key={item.id}
                        value={item.id?.toString()}
                      >
                        {item.name}
                      </AutocompleteItem>
                    ))}
                </Autocomplete>

                <RichTextEditor
                  value={values?.content}
                  className="h-100"
                  handleChange={(e) => {
                    setFieldValue("content", e);
                  }}
                  handleBlur={(e) => setFieldTouched("content", true)}
                  name="content"
                />
              </ModalBody>
            )}
            {ModalState === "Delete" && (
              <ModalBody className="p-3">
                <div>If you proceed, you will lose all {values?.name} data</div>
              </ModalBody>
            )}

            {!["Deactivated"].includes(ModalState) && (
              <ModalFooter className="p-3">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color={ModalState === "Delete" ? "danger" : "primary"}
                  type="submit"
                  className="rounded"
                >
                  {ModalState}
                </Button>
              </ModalFooter>
            )}
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubCategory;
