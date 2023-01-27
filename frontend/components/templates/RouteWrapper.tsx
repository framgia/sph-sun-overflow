import { GET_AUTHENTICATED_USER } from "@/helpers/graphql/users/Queries";
import { getUserToken } from "@/helpers/localStorageHelper";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

type LayoutProps = {
  children: JSX.Element
}

const RouteWrapper = ({ children } : LayoutProps) => {
  const { loading, error, data} = useQuery(GET_AUTHENTICATED_USER)
  const router = useRouter()

  const dataCheckIfNone = data?.me === null || data === undefined
  const errorCheck = error?.message === "Unauthenticated." || error === undefined

  if(loading) 
    return "Loading ...";
  else if(dataCheckIfNone && errorCheck && router.asPath !== "/login" && getUserToken() === "")
    router.push("/login")
  else if(!dataCheckIfNone && router.asPath === "/login" && getUserToken() !== "")
    router.push("/")
  else {
    return children
  }
    
}

export default RouteWrapper
