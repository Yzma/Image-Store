
import React from "react";
import { signIn, useSession } from 'next-auth/client'
import { NotSignedInHomepage } from '../components/NotSignedInIndexPage'
import { ProfileIndexPage } from '../components/profile/ProfileIndexPage'

const IndexPage = () => {

  const [ session, loading ] = useSession()

  // Return nothing for now until the page loads
  if(loading) {
    return <></>
  }

  if(session) {
    return <ProfileIndexPage />
  } else {
    return <NotSignedInHomepage />
  }  
}

export default IndexPage