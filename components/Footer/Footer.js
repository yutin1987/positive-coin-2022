import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Powered by</span>
      <span className={styles.logo}>
        <Image src="/logo.svg" alt="Positive Coin Logo" width={32} height={32} />
      </span>
    </footer>
  );
}