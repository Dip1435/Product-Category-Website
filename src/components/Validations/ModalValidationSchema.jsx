import * as Yup from "yup";

export const validationSchema =  Yup.object({
    name: Yup.string().required("Required"),
    price: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .min(0, "Price must be greater than 0"),
    tags: Yup.array()
      .required("Required")
      .min(1, "Please select at least one color"),
    category_id: Yup.string().required("Please select any category"),
    colors: Yup.array()
      .required("Required")
      .min(1, "Please select at least one color"),
  })