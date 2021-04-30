import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

import React from 'react';

export const PageTemplate = (props) => {
  return (
    <>
      <main className="content">
        <Sidebar />
        <Header />
          {props.children}
        <Footer />
      </main>
    </>
  )
}