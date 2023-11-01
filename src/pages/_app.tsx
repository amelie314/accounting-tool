import '../app/globals.css';
import { auth } from '../firebaseConfig';
import React, { useEffect, useState, ReactNode } from 'react';
import Layout from '../app/layout';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setCurrentUser(user ? user : null);
    });
  }, []);

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return getLayout(
    <>
      <Navbar />
      <Component {...pageProps} currentUser={currentUser} />
    </>
  );
}

export default MyApp;