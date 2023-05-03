import { ApolloClient, InMemoryCache } from '@apollo/client'
import { getUserToken } from '../helpers/localStorageHelper'

const getAuthToken = getUserToken()

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_GRAPHQL_URL,
    headers: {
        authorization: getAuthToken ? `Bearer ${getAuthToken}` : '',
    },
    cache: new InMemoryCache(),
})

export default client
