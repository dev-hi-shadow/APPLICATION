"use client";
import { useState } from "react";
import { useFormik } from "formik";
import moment from "moment/moment";
import {
  Button,
  Input,
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
  Spinner,
  Autocomplete,
  AutocompleteItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  TableBody,
  TableHeader,
} from "@nextui-org/react";
import Link from "next/link";
import {
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
  useUpdateSubCategoryMutation,
} from "@/Services/API/SubCategory";
import { useGetCategoriesQuery } from "@/Services/API/Category";
import { SubCategoryInitialState } from "@/Configurations/InitialStates";
import { SubCategorySchema } from "@/Configurations/YupSchema";
import { useAlert } from "@/Hooks/Toastify";

const SubCategory = () => {
  const [ModalState, setModalState] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [CreateSubCategories] = useCreateSubCategoryMutation();
  const [UpdateSubCategories] = useUpdateSubCategoryMutation();
  const [DeleteSubCategories] = useDeleteSubCategoryMutation();
  const { showAlert } = useAlert();

  const { data: GetCategory } = useGetCategoriesQuery();
  const { isSuccess, isLoading, data } = useGetSubCategoriesQuery();

  const handleSubCategory = async (values) => {
    const toastid = showAlert(null, `Please we will ${ModalState}ing`, "info");
    try {
      let response;
      if (ModalState === "Update") {
        response = await UpdateSubCategories(values).unwrap();
      } else if (ModalState === "Create") {
        response = await CreateSubCategory(values).unwrap();
      } else if (["Delete", "Deactivated"].includes(ModalState)) {
        response = await DeleteSubCategories(values).unwrap();
      }
      showAlert(
        toastid,
        response.message,
        response.success || response?.status
      );
      onClose();
      resetForm();
    } catch (error) {
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
    handleSubmit,
    handleBlur,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: SubCategoryInitialState,
    validationSchema: SubCategorySchema,
    onSubmit: handleSubCategory,
  });

  return (
    <>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h6 className="card-title">Total {} Sub-Categories</h6>
                  <div className="d-flex gap-3">
                    <Link
                      href="/deleted-sub-categories"
                      className="text-red-600 text-decoration-none"
                    >
                      Deleted Sub-Categories
                    </Link>
                    <Button
                      onClick={() => {
                        setModalState("Create");
                        onOpen();
                      }}
                    >
                      Create Sub-Category
                    </Button>
                  </div>
                </div>
                <div className="table-responsive">
                  <Table
                    removeWrapper
                    aria-label="Example table with dynamic content"
                  >
                    <TableHeader>
                      <TableColumn>#</TableColumn>
                      <TableColumn>Sub Category</TableColumn>
                      <TableColumn>Created At</TableColumn>
                      <TableColumn className="text-center">Action</TableColumn>
                    </TableHeader>
                    <TableBody
                      emptyContent={
                        isLoading ? (
                          <Spinner
                            size="sm"
                            label="Loading..."
                            color="warning"
                          />
                        ) : (
                          "No data Found"
                        )
                      }
                    >
                      {isSuccess &&
                        Array.isArray(data.data.rows) &&
                        data.data.rows.map((SubCategory, index) => (
                          <TableRow key={SubCategory.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{SubCategory.name}</TableCell>
                            <TableCell>
                              {moment(SubCategory.created_at).format(
                                "MMMM DD, YYYY"
                              )}
                            </TableCell>

                            <TableCell className="text-center">
                              <i
                                onClick={() => {
                                  setModalState("Update");
                                  setValues({
                                    ...SubCategory,
                                    category_id: SubCategory.category.id,
                                    category: undefined,
                                  });
                                  onOpen();
                                }}
                                className="fa-solid fa-pen me-3 text-warning"
                                style={{ fontSize: "20px" }}
                              ></i>
                              <i
                                onClick={() => {
                                  setModalState("Delete");
                                  setValues({
                                    ...SubCategory,
                                    category_id: SubCategory.category_id.id,
                                    is_deleted: true,
                                  });
                                  onOpen();
                                }}
                                className="fa-solid fa-trash ms-3 text-danger"
                                style={{ fontSize: "20px" }}
                              ></i>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="p-3">{ModalState} SubCategory</ModalHeader>
          <form onSubmit={handleSubmit}>
            {["Create", "Update"].includes(ModalState) && (
              <ModalBody className="p-3">
                <Input
                  type="text"
                  value={values.name}
                  variant="faded"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.name}
                />
                <Autocomplete
                  label="Favorite Animal"
                  variant=""
                  placeholder="Search an animal"
                  className=""
                  selectedKey={values.category_id?.toString()}
                  onSelectionChange={(e) => setFieldValue("category_id", e)}
                  onBlur={handleBlur}
                >
                  {Array.isArray(GetCategory.data.rows) &&
                    GetCategory.data.rows.map((item) => (
                      <AutocompleteItem
                        key={item.id}
                        value={item.id?.toString()}
                      >
                        {item.name}
                      </AutocompleteItem>
                    ))}
                </Autocomplete>
              </ModalBody>
            )}
            {ModalState === "Delete" && (
              <ModalBody className="p-3">
                <div>If you proceed, you will lose all {values?.name} data</div>
              </ModalBody>
            )}
            {ModalState === "Deactivated" && (
              <ModalBody className="p-3">
                <Table removeWrapper aria-label="Example empty table">
                  <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn className="text-center">Action</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent={"No rows to display."}>
                    {data.data.rows
                      ?.filter((subcategory) => subcategory.is_deleted)
                      .map((subcategory) => (
                        <TableRow key={subcategory.id}>
                          <TableCell>{subcategory.name}</TableCell>
                          <TableCell className="text-center">
                            <Button
                              color="success"
                              variant="light"
                              onClick={async () => {
                                handleSubCategory({
                                  ...subcategory,
                                  is_deleted: false,
                                });
                              }}
                            >
                              Recover
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
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
