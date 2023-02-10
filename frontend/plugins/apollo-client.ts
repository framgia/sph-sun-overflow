import { ApolloClient, InMemoryCache } from '@apollo/client'
import { getUserToken } from '../helpers/localStorageHelper'

let getAuthToken = getUserToken()

const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql',
    headers: {
        authorization: getAuthToken ? `Bearer ${getAuthToken}` : '',
    },
    cache: new InMemoryCache(),
})

export default client
