import * as yup from 'yup'
const EditProfileSchema = yup.object().shape({
    firstName: yup.string().max(30, 'Maximum of 30 characters').required('First Name is required'),
    lastName: yup.string().max(30, 'Maximum of 30 characters').required('Last Name is required'),
    aboutMe: yup.string().max(250, 'Maximum of 250 characters'),
})

export default EditProfileSchema
