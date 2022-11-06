import Head from 'next/head'
import React from 'react'
import axios from 'axios'
import { QRCodeSVG } from 'qrcode.react';
import Footer from '../components/Footer'
import localStorage from '../utils/localStorage'
import userKey from '../utils/userKey'
import styles from './viruses.module.css'

export default function Viruses() {
  const [fingerprint, setFingerprint] = React.useState(null)

  React.useEffect(() => {
    setFingerprint(localStorage.getItem('POSITIVE_COIN_FINGERPRINT') || null)
  }, [])

  const onClick = async () => {
    const publicKey = await userKey.publicKey();
    const { data: { result } } = await axios({ method: 'POST', url: '/api/viruses', data: { publicKey } });
    const tmp = `${result.fingerprint}:${result.signature}`;
    localStorage.setItem('POSITIVE_COIN_FINGERPRINT', tmp)
    setFingerprint(tmp)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Positive Coin</title>
        <meta name="description" content="Positive Coin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {fingerprint ? (
          <div className={styles.fingerprint}>
            <QRCodeSVG value={fingerprint} size={256} />
          </div>
        ) : (
          <div className={styles.card} onClick={onClick}>
            接受感染 →
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
