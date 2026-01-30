export interface ResumeSection {
  title: string;
  content: string;
}

export const parseResume = (markdown: string): ResumeSection[] => {
  if (!markdown) return [];

  const lines = markdown.split("\n");
  const sections: ResumeSection[] = [];
  let currentSection: ResumeSection = {
    title: "Dados Pessoais",
    content: "",
  };

  lines.forEach((line) => {
    if (line.startsWith("# ")) {
      // Name usually
      if (currentSection.content.trim()) {
        sections.push(currentSection);
      }
      currentSection = { title: line.replace("# ", "").trim(), content: "" };
    } else if (line.startsWith("## ")) {
      if (
        currentSection.content.trim() ||
        currentSection.title === "Dados Pessoais"
      ) {
        sections.push(currentSection);
      }
      currentSection = { title: line.replace("## ", "").trim(), content: "" };
    } else {
      currentSection.content += line + "\n";
    }
  });

  if (currentSection.content.trim() || currentSection.title) {
    sections.push(currentSection);
  }

  return sections.filter((s) => s.content.trim() !== "");
};
