import { researchQuestions } from "@/data/atlas";

export default function QuestionsPage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="eyebrow">Questions</span>
          <span className="brand-name">Research directions</span>
        </div>
      </header>

      <section className="section">
        <div className="question-list">
          {researchQuestions.map((question) => (
            <article key={question.slug} className="question-card">
              <span className="question-index">{question.confidence}</span>
              <div>
                <h2>{question.title}</h2>
                <p>{question.question}</p>
                <p>
                  <strong>Why it matters:</strong> {question.whyItMatters}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
