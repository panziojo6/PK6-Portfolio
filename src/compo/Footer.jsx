const base = import.meta.env.BASE_URL;

export default function Footer() {
  return (
    <footer className="footer">
      <a className="footer__logo" href="#top" aria-label="Back to top">
        <img src={`${base}img/logopk6.png`} alt="" width="22" height="22" />
        <span>PK6</span>
      </a>
      <span className="footer__mid">English · Bangkok, UTC+7</span>
      <span className="footer__copy">© {new Date().getFullYear()} Punnawit Kotosri</span>
    </footer>
  );
}
