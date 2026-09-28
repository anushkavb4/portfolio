import Link from "next/link";
import { profile } from "@/data/profile";

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
            {profile.availability}
          </p>
          <p>
            I am interested in collaborations that connect research, systems design, and field
            constraints. This includes applied technical work, interdisciplinary teams, and
            emerging questions that benefit from careful, grounded experimentation.
          </p>
          <p>
            <strong>Location:</strong> {profile.location}
          </p>
          <div className="cta-row">
            <Link href={`mailto:${profile.email}`} className="primary-button">
              Email
            </Link>
            <Link href={profile.github} className="secondary-button" target="_blank" rel="noreferrer">
              GitHub
            </Link>
            <Link href={profile.linkedin} className="secondary-button" target="_blank" rel="noreferrer">
              LinkedIn
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
