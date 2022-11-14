import React from 'react';
import Head from 'next/head'
import Footer from '../components/Footer';
import styles from './mixes.module.css'

export default function Mixes() {
  const timeout = React.useRef(null);
  const [rna, setRNA] = React.useReducer((state, action) => {
    if (action === 'CLEAR') return [];
    if (state[state.length - 1] === action) return state;
    return [...state, action];
  }, [])

  React.useEffect(() => {
    let html5QrCode = null;
    (async () => {
      const { Html5Qrcode } = await import('html5-qrcode');
      const cameras = await Html5Qrcode.getCameras();
      if (html5QrCode === false) return;
      const html5QrCode = new Html5Qrcode('scanner');
      html5QrCode.start(cameras[0].id, { fps: 10, qrbox: { width: 250, height: 250 } }, (text) => {
        setRNA(text)
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setRNA('CLEAR'), 10000);
      }, () => {});
    })()

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
      if (html5QrCode !== null) html5QrCode.clear();
      html5QrCode = false;
    }
  }, [])

  React.useEffect(() => {
    if (rna[0] && rna[1]) {
      // doing
    }
  }, [rna[0], rna[1]]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Positive Coin</title>
        <meta name="description" content="Positive Coin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div id="scanner" />
        <div className={styles.content}>
          <a href="#" className={styles.rna}>
            <h2>RNA 1.</h2>
            <p>{rna[0]}</p>
          </a>
          <a href="#" className={styles.rna}>
            <h2>RNA 2.</h2>
            <p>{rna[1]}</p>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
