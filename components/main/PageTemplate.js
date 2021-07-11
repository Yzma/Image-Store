import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

import React from 'react';

export const PageTemplate = (props) => {
  return (
    <>
     <Header user={props.user} />
      <main className="content">
        {/* <Sidebar user={props.user} /> */}
       
        {props.children}
        <Footer />
      </main>
    </>
  )
}
