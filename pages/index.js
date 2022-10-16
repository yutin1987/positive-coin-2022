import Head from 'next/head'
import Image from 'next/image'
import styles from './index.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Positive Coin</title>
        <meta name="description" content="Positive Coin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Positive Coin</a>
        </h1>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h2>使用說明 &rarr;</h2>
            <p>Description...</p>
          </a>
          <a href="#" className={styles.card}>
            <h2>感染 @ 感染名稱 &rarr;</h2>
            <p>Description...</p>
          </a>
          <a href="#" className={styles.card}>
            <h2>購買 Coin &rarr;</h2>
            <p>Description...</p>
          </a>
          <a href="#" className={styles.card}>
            <h2>Community &rarr;</h2>
            <p>Description...</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
