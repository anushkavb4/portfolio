export default function CollaboratePage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="eyebrow">Collaborate</span>
          <span className="brand-name">Open to the next question</span>
        </div>
      </header>

      <section className="section">
        <div className="collab-panel" style={{ display: "grid", gap: "1rem" }}>
          <p>
            I am interested in collaborations that connect research, systems design, and field
            constraints. This includes applied technical work, interdisciplinary teams, and
            emerging questions that benefit from careful, grounded experimentation.
          </p>
          <p>
            If you are exploring a problem at the intersection of human decision-making,
            technical infrastructure, and real-world impact, I would be glad to connect.
          </p>
        </div>
      </section>
    </main>
  );
}
