import { Reveal } from "../../components/ui";

export function ProofCard({ title, film, names }) {
  return (
    <section className="sv-wrap rs-proof-wrap">
      <Reveal className="rs-proof">
        <a className="rs-proof-film" href={film.href} target="_blank" rel="noopener noreferrer">
          <img src={film.img} alt={film.t} loading="lazy" decoding="async" />
          <span className="play" aria-hidden="true">
            ▶
          </span>
          <span className="cap">
            <small>{film.k}</small>
            <b>{film.t}</b>
          </span>
        </a>
        <div className="rs-proof-side">
          <h2>{title}</h2>
          <ul>
            {names.map(([n, r]) => (
              <li key={n}>
                <b>{n}</b>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
