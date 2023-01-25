import * as yup from "yup";
const QuestionFormSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title is too short")
    .max(20, "Title is too long"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Please explain in a more detailed way"),
  tags: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number(),
        title: yup.string(),
      })
    )
    .min(1, "Questions must have at least 1 tag"),
});

export default QuestionFormSchema;
