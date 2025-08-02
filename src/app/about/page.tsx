"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-lime-100">
      <div className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto w-full text-gray-800">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-green-800">
          About TruthBeacon
        </h1>

        <p className="mb-4 text-lg leading-relaxed">
          <strong>TruthBeacon</strong> is a citizen-powered platform that
          empowers individuals to safely and anonymously report real-world
          social issues, injustices, and events that often go unnoticed. We aim
          to turn silent voices into amplified truths by building a
          community-driven space where awareness leads to action.
        </p>

        <p className="mb-4 text-lg leading-relaxed">
          Built during the Hack4Good hackathon, TruthBeacon is more than just a
          project — it’s a movement toward digital transparency and
          accountability. Verified submissions go through a moderation process
          before being displayed to the public, ensuring a balance between
          freedom of expression and factual reliability.
        </p>

        <p className="mb-4 text-lg leading-relaxed">
          Our platform is designed with a mission to:
        </p>
        <ul className="list-disc list-inside text-lg mb-6 space-y-2">
          <li>
            Promote transparency by allowing public access to verified reports.
          </li>
          <li>Empower local voices in underrepresented communities.</li>
          <li>Encourage civic engagement and collective problem-solving.</li>
          <li>Support NGOs and journalists with grassroots-level insights.</li>
        </ul>

        <p className="mb-4 text-lg leading-relaxed">
          Whether it’s environmental damage, social injustice, corruption, or
          public safety concerns — TruthBeacon provides the tools to raise
          awareness and invite meaningful support from the community.
        </p>

        <p className="mb-4 text-lg leading-relaxed">
          Together, we can shine a light on the truth, one report at a time.
        </p>
      </div>
    </main>
  );
}
