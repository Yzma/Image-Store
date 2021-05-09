import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

import React from 'react';

export const PageTemplate = (props) => {
  return (
    <>
      <main className="content">
        <Sidebar user={props.user}/>
        <Header user={props.user} />
          {props.children}
        <Footer />
      </main>
    </>
  )
}
