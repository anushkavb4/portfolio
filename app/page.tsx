import Link from "next/link";
import { AtlasMap } from "@/components/atlas/AtlasMap";
import {
  contextTrajectory,
  independentWork,
  professionalExperience,
  researchQuestions,
} from "@/data/resume-atlas";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="home-kicker">AI Engineer <span>·</span> EBRD <span>·</span> London</p>
            <h1 id="home-title">Anushka<br />Bilandani</h1>
            <p className="home-role">I build AI systems that make complex knowledge useful.</p>
            <p className="home-summary">
              Research-led engineering across retrieval, intelligent workflows, and the software
              systems that bring them into practice.
            </p>
            <div className="home-actions">
              <Link href="/work" className="primary-button">
                Explore selected work <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/atlas" className="text-link-light">
                Explore the research atlas <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="home-visual" id="atlas" aria-label="Interactive research atlas">
            <div className="home-visual-heading">
              <span>Systems in context</span>
              <span>Knowledge · Tools · People</span>
            </div>
            <AtlasMap />
          </div>
        </div>
        <div className="home-hero-footer">
          <span>Research-led engineering</span>
          <span>From information to useful systems</span>
        </div>
      </section>

      <div className="home-content">
        <section className="section home-focus" id="questions">
          <div className="section-heading">
            <p className="eyebrow">A point of view</p>
            <h2>Research meets real systems</h2>
            <p className="section-intro">
              Curiosity matters when it changes what we build, how we evaluate it, and who it serves.
            </p>
          </div>
          <div className="focus-grid">
            <article>
              <span className="focus-label">Investigate</span>
              <p>How can information retrieval become more useful in institutional workflows?</p>
            </article>
            <article>
              <span className="focus-label">Build</span>
              <p>How should models, interfaces, and infrastructure work together?</p>
            </article>
            <article>
              <span className="focus-label">Evaluate</span>
              <p>What evidence shows a system helps, and where are its limits?</p>
            </article>
          </div>
        </section>

        <section className="section home-project-group" id="featured-work">
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow">Company work</p>
              <h2>Professional experience</h2>
            </div>
            <Link href="/work" className="section-link">All work <span aria-hidden="true">→</span></Link>
          </div>
          <div className="home-project-grid">
            {professionalExperience.slice(0, 3).map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="home-project">
                <span className="home-project-category">{project.organization}</span>
                <span className="home-project-context">
                  {[project.role, project.period].filter((value) => value !== "Not specified").join(" · ")}
                </span>
                <h3>{project.name}</h3>
                <p>{project.shortTitle}</p>
                <span className="home-project-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section home-project-group" aria-labelledby="independent-work-title">
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow">Outside company roles</p>
              <h2 id="independent-work-title">Independent projects & research</h2>
            </div>
            <Link href="/work" className="section-link">All work <span aria-hidden="true">→</span></Link>
          </div>
          <div className="home-project-grid">
            {independentWork.slice(0, 3).map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="home-project">
                <span className="home-project-category">{project.category.replaceAll("-", " ")}</span>
                <h3>{project.name}</h3>
                <p>{project.shortTitle}</p>
                <span className="home-project-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section" id="research-questions">
          <div className="section-heading">
            <p className="eyebrow">Questions I return to</p>
            <h2>Open questions, grounded in practice</h2>
          </div>
          <div className="home-question-list">
            {researchQuestions.map((question) => (
              <Link key={question.slug} href={`/questions#${question.slug}`} className="home-question">
                <span>{question.title}</span>
                <span className="home-question-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section" id="trajectory">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Work shaped by different contexts</h2>
          </div>
          <div className="trajectory-grid">
            {contextTrajectory.map((item) => (
              <article key={item.step} className="trajectory-card">
                <span className="trajectory-step">{item.step}</span>
                <h3>{item.context}</h3>
                <p><strong>Question:</strong> {item.question}</p>
                <p><strong>Technical choices:</strong> {item.technicalChoices}</p>
                <p><strong>Outcome:</strong> {item.outcome}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section education-section" id="education">
          <div>
            <p className="eyebrow">Education</p>
            <h2>{profile.education.institution}</h2>
          </div>
          <div>
            <p>{profile.education.degree}</p>
            <p>{profile.education.location} · {profile.education.period}</p>
          </div>
        </section>

        <section className="home-contact" id="collaborate">
          <div>
            <p className="eyebrow">Collaboration</p>
            <h2>Have a thoughtful problem to solve?</h2>
          </div>
          <Link href="/collaborate" className="primary-button">
            Get in touch <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
