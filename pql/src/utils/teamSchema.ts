import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  description: yup.string(),
}).required();

export type FormData = yup.InferType<typeof schema>;