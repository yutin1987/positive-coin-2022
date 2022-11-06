import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from './index.module.css'

export default function Index() {
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
          <Link href="/viruses" className={styles.card}>
            <a>
              <h2>感染 @ 感染名稱 &rarr;</h2>
              <p>Description...</p>
            </a>
          </Link>
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
        <span>{`Powered by${' '}`}</span>
        <span className={styles.logo}>
          <Image src="/logo.svg" alt="Positive Coin Logo" width={32} height={32} />
        </span>
      </footer>
    </div>
  )
}
