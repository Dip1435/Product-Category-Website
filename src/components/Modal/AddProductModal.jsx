import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../Redux/slices/productSlice";
import { Modal, Button, Form, FormCheck } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Fragment } from "react";
import Select from "react-select";
import { validationSchema } from "../Validations/ModalValidationSchema";

export const AddProductModal = ({ show, handleClose, catId, catName }) => {

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      tags: [],
      category_id: catId ? catId : "",
      colors: [],
    },
    enableReinitialize: true,

    validationSchema: validationSchema,

    onSubmit: (values) => {
      dispatch(addProduct(values));
      values.tags = ""
      values.price = ""
      values.name = ""
      values.colors = ""
      values.category_id = ""
      toast.success("Product Added Successfully");
      handleClose();
    },
  });

  // for taking tag value
  const handleTagChange = (tag) => {
    const { tags } = formik.values;
    if (tags.includes(tag)) {
      formik.setFieldValue(
        "tags",
        tags.filter((t) => t !== tag)
      );
    } else {
      formik.setFieldValue("tags", [...tags, tag]);
    }
  };

  // for taking colour value
  const handleColorChange = (selectedOptions) => {
    formik.setFieldValue(
      "colors",
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  // color options for multiple color select menu
  const colorOptions = [
    { value: "Black", label: "Black" },
    { value: "White", label: "White" },
    { value: "Yellow", label: "Yellow" },
    { value: "Green", label: "Green" },
    { value: "Blue", label: "Blue" },
    { value: "Red", label: "Red" },
  ];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product to {catName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formProductName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Product Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              placeholder="Product Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.price && formik.errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <div>
              <div className="row">
                {["Black", "White", "Yellow", "Green", "Blue", "Red"].map((tag, index) => (
                  <div className="col-md-4" key={index}>
                    <Fragment>
                      <FormCheck
                        key={tag}
                        type="checkbox"
                        label={tag}
                        value={tag}
                        placeholder="Select Tag"
                        checked={formik.values.tags.includes(tag)}
                        onChange={() => handleTagChange(tag)}
                        isInvalid={formik.touched.tags && formik.errors.tags}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.tags}
                      </Form.Control.Feedback>
                    </Fragment>
                  </div>
                ))}
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Colors</Form.Label>
            <Select
              isMulti
              name="colors"
              options={colorOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder = "Select Colors"
              onChange={handleColorChange}
              onBlur={formik.handleBlur}
              value={colorOptions.filter(option => formik.values.colors.includes(option.value))}
            />
            {formik.touched.colors && formik.errors.colors ? (
              <div className="invalid-feedback d-block">
                {formik.errors.colors}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categories</Form.Label>
            <Form.Control
              as="select"
              id="category_id"
              name="category_id"
              placeholder="Select category"
              disabled={catId ? true : false}
              value={formik.values.category_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Form.Control>
            {formik.touched.category_id && formik.errors.category_id ? (
              <div className="invalid-feedback d-block">
                {formik.errors.category_id}
              </div>
            ) : null}
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
