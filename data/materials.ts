export interface MaterialItem {
  id: string;
  title: string;
  description: string;
  path: string;
  downloadName: string;
}

export const materials: MaterialItem[] = [
  {
    id: "resume",
    title: "Resume",
    description: "Experience, projects, and technical skills",
    path: "/Hung_Ngo_Resume.pdf",
    downloadName: "Hung_Ngo_Resume.pdf",
  },
  {
    id: "transcript",
    title: "Transcript",
    description: "Official academic transcript from UNR",
    path: "/transcript.pdf",
    downloadName: "Hung_Ngo_Transcript.pdf",
  },
  {
    id: "recommendation",
    title: "Recommendation Letter",
    description: "From Address Income",
    path: "/Recommendation Letter - Hung.pdf",
    downloadName: "Recommendation_Letter_Address_Income.pdf",
  },
];

export const resumeMaterial = materials[0];
