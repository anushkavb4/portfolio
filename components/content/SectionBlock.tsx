type SectionBlockProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  bullets?: string[];
};

export function SectionBlock({ eyebrow, title, body, bullets }: SectionBlockProps) {
  return (
    <section className="detail-section">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
      {bullets && bullets.length > 0 ? (
        <ul>
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
