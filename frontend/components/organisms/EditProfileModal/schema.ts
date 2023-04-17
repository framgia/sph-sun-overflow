import * as yup from 'yup'
const EditProfileSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    aboutMe: yup.string(),
    avatar: yup.string(),
})

export default EditProfileSchema
