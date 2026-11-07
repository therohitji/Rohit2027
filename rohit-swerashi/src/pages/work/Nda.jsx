export function Nda({ title, names }) {
  return (
    <section className="sv-wrap sv-pad rs-exp" data-badge="Experiments">
      <h2>{title}</h2>
      <ol>
        {names.map((n, i) => (
          <li key={n.name}>
            <small>{String(i + 1).padStart(2, "0")}</small>
            <b>{n.name}</b>
            <p>{n.note}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
