export interface MaterialItem {
  id: string;
  title: string;
  description: string;
  path: string;
  downloadName: string;
}

export const materials: MaterialItem[] = [
  {
    id: "software-engineering-resume",
    title: "Software Engineering Resume",
    description: "Full-stack, backend, and product-focused experience",
    path: "/Software-Engineering-Resume.pdf",
    downloadName: "Hung_Ngo_Software_Engineering_Resume.pdf",
  },
  {
    id: "ml-ai-resume",
    title: "ML/AI Engineer Resume",
    description: "ML models, data systems, and applied AI work",
    path: "/ML-AI-Engineer-Resume.pdf",
    downloadName: "Hung_Ngo_ML_AI_Engineer_Resume.pdf",
  },
];

export const softwareEngineeringResume = materials[0];
export const mlAiResume = materials[1];

/** @deprecated Use softwareEngineeringResume or mlAiResume */
export const resumeMaterial = softwareEngineeringResume;
