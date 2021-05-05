
import React from "react";
import { signIn, useSession } from 'next-auth/client'
import { NotSignedInHomepage } from '../components/NotSignedInIndexPage'
import { ProfileIndexPage } from '../components/profile/ProfileIndexPage'

import prisma from '../util/prisma'

const IndexPage = (props) => {

  const [ session, loading ] = useSession()

  // Return nothing for now until the page loads
  if(loading) {
    return <></>
  }

  if(session) {
    return <ProfileIndexPage images={props.images}/>
  } else {
    return <NotSignedInHomepage />
  }  
}

export async function getServerSideProps(context) {

  const userImages = await prisma.image.findMany({
      where: {
        userID: 1
      },

      select: {
        id: true,
        title: true,
        description: true,
        private: true,
        fileName: true,
        userID: true
      }
  })

  if(!userImages) {
    return {
      props: { }
    }
  }

  return {
    props: {
      images: userImages
    }
  }
}

export default IndexPage