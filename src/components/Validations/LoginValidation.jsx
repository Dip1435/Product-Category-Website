import * as Yup from "yup";

export const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
    .required('No password provided.') 
    .min(6, 'Password is too short - should be 6 chars minimum.')
  })