import * as yup from 'yup'
const CommentFormSchema = yup.object().shape({
    comment: yup.string().required('Comment is required'),
})

export default CommentFormSchema
