import { profile } from "@/data/profile";

const groups = [...new Set(profile.involvement.map((item) => item.group))];

export default function InvolvementPage() {
  return (
    <main className="page-shell">
      <section className="section involvement-page" aria-labelledby="involvement-title">
        <header className="section-heading">
          <p className="eyebrow">Beyond academics</p>
          <h1 id="involvement-title">Extracurriculars</h1>
          <p className="section-intro">
            Campus leadership and service, music teaching, arts, and creative practice.
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

        <section className="involvement-group" aria-labelledby="extracurricular-qualifications-title">
          <h2 className="eyebrow" id="extracurricular-qualifications-title">Music & art qualifications</h2>
          <ul className="involvement-list">
            {profile.extracurricularQualifications.map((qualification) => (
              <li key={qualification.name} className="involvement-row qualification-row">
                <div>
                  <h3>{qualification.name}</h3>
                  <p className="involvement-role">{qualification.achievement}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}