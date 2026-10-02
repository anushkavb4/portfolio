import { profile } from "@/data/profile";

const groups = [...new Set(profile.involvement.map((item) => item.group))];

export default function InvolvementPage() {
  return (
    <main className="page-shell">
      <section className="section involvement-page" aria-labelledby="involvement-title">
        <header className="section-heading">
          <p className="eyebrow">Beyond technical work</p>
          <h1 id="involvement-title">Leadership & involvement</h1>
          <p className="section-intro">
            Organizing, editing, mentoring, and making things happen with people across campus.
          </p>
        </header>

        <div className="involvement-groups">
          {groups.map((group) => (
            <section className="involvement-group" key={group} aria-labelledby={`involvement-${group}`}>
              <h2 className="eyebrow" id={`involvement-${group}`}>{group}</h2>
              <ul className="involvement-list">
                {profile.involvement.filter((item) => item.group === group).map((item) => (
                  <li key={item.organization} className="involvement-row">
                    <div>
                      <h3>{item.organization}</h3>
                      <p className="involvement-role">{item.role}</p>
                      <p className="involvement-summary">{item.summary}</p>
                    </div>
                    <time className="involvement-period">{item.period}</time>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}