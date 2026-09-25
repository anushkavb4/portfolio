import Link from "next/link";
import { AtlasMap } from "@/components/atlas/AtlasMap";
import { researchQuestions, featuredProjects } from "@/data/atlas";

const pillars = [
  { label: "Research questions", value: "Human + computational systems" },
  { label: "Built systems", value: "Interfaces, models, and infrastructure" },
  { label: "Context", value: "Organisations, labs, and countries" },
  { label: "Reasoning", value: "Design trade-offs and limitations" },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="eyebrow">Research Atlas</span>
          <span className="brand-name">Anushka</span>
        </div>
        <nav className="nav" aria-label="Main navigation">
          <Link href="/">Atlas</Link>
          <Link href="/work">Work</Link>
          <Link href="/questions">Questions</Link>
          <Link href="/notes">Notes</Link>
          <Link href="/collaborate">Collaborate</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="kicker">Portfolio / research identity</p>
          <h1>
            I explore how computational systems can help us understand, support, and build
            things in the real world.
          </h1>
          <p className="lede">
            This portfolio is designed as a living research atlas: a practical map of the
            problems, systems, contexts, and decisions that shape the work.
          </p>
          <div className="cta-row">
            <Link href="/work" className="primary-button">Explore the atlas</Link>
            <Link href="/collaborate" className="secondary-button">Start a conversation</Link>
          </div>
        </div>

        <div className="hero-panel" id="atlas" aria-label="Research atlas summary">
          <div className="panel-header">
            <span className="panel-label">Research atlas</span>
            <span className="status-dot">Live</span>
          </div>
          <AtlasMap />
        </div>
      </section>

      <section className="section" id="questions">
        <div className="section-heading">
          <p className="eyebrow">Questions the work answers</p>
          <h2>Research identity in context</h2>
        </div>
        <div className="question-list">
          {researchQuestions.map((question, index) => (
            <article key={question.slug} className="question-card">
              <span className="question-index">0{index + 1}</span>
              <p>{question.question}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <p className="eyebrow">What shapes the work</p>
          <h2>Core pillars</h2>
        </div>
        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <article key={pillar.label} className="pillar-card">
              <span className="pillar-label">{pillar.label}</span>
              <strong>{pillar.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="featured-work">
        <div className="section-heading">
          <p className="eyebrow">Featured work</p>
          <h2>Selected stories</h2>
        </div>
        <div className="question-list">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="question-card">
              <span className="question-index">{project.order.toString().padStart(2, "0")}</span>
              <div>
                <h3>{project.name}</h3>
                <p>{project.shortTitle}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section collaborate" id="collaborate">
        <div className="section-heading">
          <p className="eyebrow">Collaboration</p>
          <h2>Open to the next question</h2>
        </div>
        <div className="collab-panel">
          <p>
            The portfolio is designed to support collaboration across research, engineering,
            product, and applied domains. New work can emerge from systems design, field
            inquiry, interdisciplinary experimentation, or practical deployment.
          </p>
          <Link href="/collaborate" className="primary-button">
            Start a conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
