import styles from './Footer.module.scss';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram
} from 'react-icons/fa';

const iconeProps = {
  color: 'white',
  size: 24,
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
       Política de privacidade.
      </span>
      <div>
        <span>contact@aiko.digital</span>
        <span>Telefone: +55 (31) 3564-0815</span>
      </div>

      <div>
        <FaFacebook {...iconeProps} />
        <FaTwitter {...iconeProps} />
        <FaInstagram {...iconeProps} />
      </div>
    </footer>
  )
}