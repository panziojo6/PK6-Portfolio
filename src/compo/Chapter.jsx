/* Black breathing-space band with a two-tone stacked headline. */
export default function Chapter({ id, line1, line2, children }) {
  return (
    <section className="chapter" id={id}>
      <h2 className="display display--lg chapter__title">
        <span>{line1}</span>
        <span className="accent">{line2}</span>
      </h2>
      {children}
    </section>
  );
}
