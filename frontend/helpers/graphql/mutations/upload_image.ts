import { gql } from '@apollo/client'

const UPLOAD_IMAGE = gql`
    mutation UploadImage($img: String!) {
        uploadImage(img: $img)
    }
`
export default UPLOAD_IMAGE
