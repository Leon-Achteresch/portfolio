export async function AboutMe() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 text-center h-screen">      
      <h1 className="text-5xl font-bold tracking-tight mb-2">
        About me
      </h1>
      <p className="bg-gradient-to-b from-foreground to-[#7b9cda] bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
        Software Entwickler
      </p>
      <p className="text-xl">
        Ich bin ein Softwareentwickler, der sich für die Entwicklung von
        modernen Webanwendungen und Systemen einsetzt. Meine Fähigkeiten
        umfassen die Entwicklung von Frontend-Anwendungen, Backend-Systemen,
        Datenbanken und APIs. Ich bin ein Teamführer, der sich für die
        Entwicklung von Projekten und Teams einsetzt und mich auf die
        Erfolgschancen von Unternehmen und Organisationen spezialisiert.
      </p>
    </section>
  );
}