import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { getUserToken } from '../helpers/localStorageHelper'
import PusherLink from '@/helpers/PusherLink'
import Pusher from 'pusher-js'
Pusher.logToConsole = true

let getAuthToken = getUserToken()

const pusher = new Pusher(`6bc7f1f12960fd2b45e3`, {
    cluster: `ap1`,
    authEndpoint: `http://localhost:8000/graphql/subscriptions/auth`,
    auth: {
        headers: {
            authorization: `Bearer ${getAuthToken}`,
        },
    },
})
const pusherLink = new PusherLink({
    pusher: pusher,
})

const observer = {
    next: (data) => {
        console.log('Next data: ', data)
    },
    error: (error) => {
        console.error('Error: ', error)
    },
    complete: () => {
        console.log('Completed')
    },
}

pusherLink.subscribeToChannel('latestAnswer', observer)

const link = ApolloLink.from([
    pusherLink,
    new HttpLink({
        uri: `http://localhost:8000/graphql`,
        headers: { authorization: `Bearer ${getAuthToken}` },
    }),
])

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
    headers: { authorization: `Bearer ${getAuthToken}` },
    connectToDevTools: true,
})

export default client

// var channel1 = pusher.subscribe('latestAnswer')
// console.log(pusher.allChannels())

// channel1.bind('postAnswer', function (data) {
//     console.log(data)
// })

// const pusher = new Pusher('6bc7f1f12960fd2b45e3', {
//     cluster: 'ap1',
//     authEndpoint: 'graphql/subscriptions/auth',
// })
// pusher
// var channel1 = pusher.subscribe('postAnswer')
// console.log(pusher.allChannels())
// channel1.bind('postAnswer', function (data) {
//     console.log(data)
//     alert(JSON.stringify(data))
//     app.messages.push(JSON.stringify(data)) //Data assignment
// })
// var channel2 = pusher.subscribe('pushNotification')
// channel2.bind('pushNotification', function (data) {
//     console.log(data)
//     alert(JSON.stringify(data))
//     app.messages.push(JSON.stringify(data)) //Data assignment
// })
// console.log('here')
