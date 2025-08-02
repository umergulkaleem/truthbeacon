"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-green-100">
      <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full text-gray-800">
        <h1 className="text-3xl font-bold mb-4">About TruthBeacon</h1>
        <p className="mb-4">
          TruthBeacon is a citizen-powered platform that lets people safely and
          anonymously report real-world social issues. Our goal is to verify,
          amplify, and support these voices with community awareness, data, and
          donations.
        </p>
        <p className="mb-4">
          Every submission is reviewed and stored transparently. This initiative
          was born out of a hackathon for social good, aiming to use tech for
          meaningful civic action.
        </p>
        <p className="mb-4">
          We hope to enable social activists, NGOs, and the public to
          collaborate and build lasting change.
        </p>
      </div>
    </main>
  );
}
