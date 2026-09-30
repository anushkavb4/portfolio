export type AtlasNode = {
  id: string;
  label: string;
  kind: "problem" | "system" | "context" | "project" | "question";
  description: string;
  relatedSlugs: string[];
};

export type AtlasEdge = {
  id: string;
  source: string;
  target: string;
  type: "informs" | "implemented-in" | "constrained-by" | "raises-question-about";
};

export type ProjectSection = {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
};

export type WorkflowStep = {
  title: string;
  detail: string;
};

export type PortfolioProject = {
  slug: string;
  name: string;
  shortTitle: string;
  category: string;
  status: "selected-work" | "current-work" | "experimental" | "archive";
  organization: string;
  role: string;
  period: string;
  location: string;
  contexts: string[];
  systems: string[];
  technologies: string[];
  summary: string;
  outcome: string;
  disclosure: string;
  workflow?: {
    caption: string;
    steps: WorkflowStep[];
  };
  caseStudy: ProjectSection[];
  links: { label: string; url: string }[];
  featured: boolean;
  order: number;
};

export type ResearchQuestion = {
  slug: string;
  title: string;
  question: string;
  whyItMatters: string;
  relatedSystems: string[];
  confidence: "low" | "medium" | "high";
  unknowns: string[];
};

export type ProjectNoteSection = {
  title: string;
  body: string;
};

export type ProjectNote = {
  slug: string;
  title: string;
  status: "draft" | "exploration" | "published";
  summary: string;
  relatedProject: string;
  sections: ProjectNoteSection[];
};

export type ContextTrajectory = {
  step: string;
  context: string;
  question: string;
  technicalChoices: string;
  outcome: string;
};

export const atlasNodes: AtlasNode[] = [
  {
    id: "knowledge-retrieval",
    label: "Knowledge retrieval",
    kind: "problem",
    description: "Retrieval and extraction from institutional documents at EBRD.",
    relatedSlugs: ["ebrd-rag", "ebrd-agentic-ai", "clinical-document-intelligence-hub"],
  },
  {
    id: "workflow-platforms",
    label: "Workflow platforms",
    kind: "system",
    description: "APIs, access controls, job monitoring, and production tooling.",
    relatedSlugs: ["cern-gofer", "aiassistant-platform", "clinical-document-intelligence-hub"],
  },
  {
    id: "international-teams",
    label: "International teams",
    kind: "context",
    description: "Work contexts listed in London, Geneva, California, and remote roles.",
    relatedSlugs: ["ebrd-rag", "cern-gofer", "aiassistant-platform", "infosys-nlp"],
  },
  {
    id: "applied-ml",
    label: "Applied machine learning",
    kind: "project",
    description: "Published crop-disease research, image segmentation, and music generation.",
    relatedSlugs: ["potato-leaf-disease", "urban-scene-segmentation", "music-generation", "spotify-blend"],
  },
  {
    id: "system-evaluation",
    label: "System evaluation",
    kind: "question",
    description: "Questions about measurable outcomes, operational limits, and responsible automation.",
    relatedSlugs: ["measuring-retrieval", "operational-guardrails"],
  },
];

export const atlasEdges: AtlasEdge[] = [
  { id: "e1", source: "knowledge-retrieval", target: "workflow-platforms", type: "informs" },
  { id: "e2", source: "international-teams", target: "workflow-platforms", type: "constrained-by" },
  { id: "e3", source: "workflow-platforms", target: "applied-ml", type: "implemented-in" },
  { id: "e4", source: "applied-ml", target: "system-evaluation", type: "raises-question-about" },
];

const resumeOnlyDisclosure =
  "This public summary uses information from the supplied resume. No public repository or additional implementation details were supplied.";

export const featuredProjects: PortfolioProject[] = [
  {
    slug: "ebrd-agentic-ai",
    name: "Agentic AI for enterprise workflows",
    shortTitle: "Multi-agent orchestration and tool-augmented LLMs",
    category: "enterprise-ai",
    status: "current-work",
    organization: "EBRD",
    role: "AI Engineer",
    period: "Jul 2026 – Present",
    location: "London, United Kingdom",
    contexts: ["Enterprise workflows", "Knowledge retrieval", "Decision support"],
    systems: ["Multi-agent orchestration", "Tool-augmented LLMs", "Knowledge retrieval"],
    technologies: ["LLMs", "Multi-agent systems"],
    summary: "Building agentic AI solutions for enterprise workflows, including systems for complex knowledge retrieval and decision-making use cases.",
    outcome: "Automating complex knowledge retrieval and decision-making processes across institutional use cases.",
    disclosure: resumeOnlyDisclosure,
    workflow: {
      caption: "High-level scope from the resume; internal architecture and handoffs were not provided.",
      steps: [
        { title: "Enterprise workflow", detail: "Institutional knowledge and decision-making use cases" },
        { title: "Orchestration", detail: "Multi-agent system" },
        { title: "Tools and models", detail: "Tool-augmented LLMs" },
        { title: "Intended work", detail: "Automated knowledge retrieval and decision support" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Enterprise workflows at EBRD", body: "The resume describes agentic AI work for enterprise workflows at EBRD in London, beginning in July 2026." },
      { eyebrow: "Contribution", title: "Building agentic AI solutions", body: "The stated work uses multi-agent orchestration and tool-augmented LLMs to automate complex knowledge retrieval and decision-making processes." },
      { eyebrow: "Evidence and limits", title: "Implementation detail is not public here", body: "The resume does not name specific models, tools, system architecture, evaluation methods, or quantified outcomes. Those details are intentionally not inferred." },
    ],
    links: [],
    featured: true,
    order: 1,
  },
  {
    slug: "ebrd-rag",
    name: "Institutional document RAG and extraction",
    shortTitle: "Retrieval-augmented generation for institutional documents",
    category: "enterprise-ai",
    status: "selected-work",
    organization: "EBRD",
    role: "AI Intern",
    period: "Aug 2025 – Feb 2026",
    location: "London, United Kingdom",
    contexts: ["Institutional documents", "Information retrieval", "Structured extraction"],
    systems: ["RAG", "Semantic chunking", "Contextual compression", "Data extraction"],
    technologies: ["Azure OpenAI", "Azure AI Search", "LlamaIndex", "Streamlit"],
    summary: "Developed RAG systems for institutional documents and LLM-driven structured data extraction pipelines.",
    outcome: "Processed 1,000+ documents at 95% extraction accuracy; semantic chunking and contextual compression reduced retrieval time by 30%.",
    disclosure: resumeOnlyDisclosure,
    workflow: {
      caption: "High-level flow assembled from resume-listed tasks and tools; component-level architecture was not supplied.",
      steps: [
        { title: "Institutional documents", detail: "Source material for retrieval and structured extraction" },
        { title: "Retrieval", detail: "Azure AI Search, LlamaIndex, semantic chunking, and contextual compression" },
        { title: "LLM processing", detail: "Azure OpenAI for RAG and structured data extraction" },
        { title: "User interface", detail: "Streamlit" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Institutional document workflows", body: "During an AI internship at EBRD in London, the work focused on retrieving information from institutional documents and extracting structured data." },
      { eyebrow: "Contribution", title: "RAG and extraction pipelines", body: "Developed systems using Azure OpenAI, Azure AI Search, LlamaIndex, and Streamlit. Proposed semantic chunking and contextual compression techniques." },
      { eyebrow: "Outcome", title: "Measured pipeline improvements", body: "The resume reports processing 1,000+ documents with 95% extraction accuracy and a 30% reduction in retrieval time. Evaluation methodology and baseline details were not included." },
    ],
    links: [],
    featured: true,
    order: 2,
  },
  {
    slug: "cern-gofer",
    name: "Gofer: Synthesis-as-a-Service",
    shortTitle: "A job platform for particle physics simulation workflows",
    category: "platform-engineering",
    status: "selected-work",
    organization: "CERN Openlab",
    role: "Technical Intern",
    period: "Jun 2025 – Aug 2025",
    location: "Geneva, Switzerland",
    contexts: ["Particle physics", "Simulation workflows", "Scientific computing"],
    systems: ["Job submission", "Quotas", "Role-based access control", "Job monitoring"],
    technologies: ["Python", "FastAPI", "OpenAPI"],
    summary: "Built Gofer, a secure and scalable Synthesis-as-a-Service platform for particle physics simulation workflows.",
    outcome: "OpenAPI integration tools and client libraries reduced onboarding time for new services by 40%; real-time job status tracking increased task submission success by 35%.",
    disclosure: resumeOnlyDisclosure,
    workflow: {
      caption: "Operational sequence reconstructed from resume-listed platform features; internal service architecture was not supplied.",
      steps: [
        { title: "Submit simulation job", detail: "Particle physics workflow enters Gofer" },
        { title: "Access controls", detail: "User quotas and role-based access control" },
        { title: "Run and monitor", detail: "Job monitoring for submitted work" },
        { title: "Track status", detail: "Real-time job status in the redesigned web UI" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Simulation workflows at CERN Openlab", body: "Gofer supported particle physics simulation workflows during a technical internship at CERN Openlab in Geneva." },
      { eyebrow: "Contribution", title: "Platform, integrations, and job visibility", body: "Built the platform with Python and FastAPI, including user quotas, role-based access control, and job monitoring. Delivered OpenAPI-based integration tools and client libraries, and redesigned the web UI with real-time job status tracking." },
      { eyebrow: "Outcome", title: "Onboarding and submission measures", body: "The resume reports 40% less onboarding time for new services and a 35% increase in task submission success rate. Deployment architecture and evaluation details were not supplied." },
    ],
    links: [],
    featured: true,
    order: 3,
  },
  {
    slug: "aiassistant-platform",
    name: "AI-powered products and voice assistant APIs",
    shortTitle: "Platform engineering, voice integrations, and speech synthesis",
    category: "platform-engineering",
    status: "selected-work",
    organization: "AIAssistant.co",
    role: "SDE Intern",
    period: "Feb 2024 – May 2025",
    location: "California, United States (Remote)",
    contexts: ["AI products", "Voice assistants", "Production platform"],
    systems: ["REST APIs", "Text-to-speech", "Production services"],
    technologies: ["Python", "Flask", "FastAPI", "PostgreSQL"],
    summary: "Implemented product features, fixed production issues, optimized platform performance, and built REST APIs for voice assistant integrations.",
    outcome: "Contributed to platform stability for 5,000+ users; voice API work improved response times by 35%, and TTS work improved naturalness by at least 30%.",
    disclosure: resumeOnlyDisclosure,
    caseStudy: [
      { eyebrow: "Context", title: "Production AI products", body: "Worked remotely with AIAssistant.co, a California-based organization, on AI-powered products used by more than 5,000 users." },
      { eyebrow: "Contribution", title: "Product services and speech quality", body: "Implemented features and REST APIs for voice assistant integrations using Python, Flask, FastAPI, and PostgreSQL. Fine-tuned acoustic models and adjusted prosody and synthesis parameters for text-to-speech." },
      { eyebrow: "Architecture boundary", title: "Two contributions, not one asserted pipeline", body: "The resume lists voice assistant API work and TTS model tuning separately; it does not document how the API and speech-synthesis work were connected in production." },
      { eyebrow: "Outcome", title: "Reported service and quality results", body: "The resume reports 35% faster system response times and at least 30% higher TTS naturalness. It does not provide the measurement protocols or public repository links." },
    ],
    links: [],
    featured: true,
    order: 4,
  },
  {
    slug: "infosys-nlp",
    name: "Tweet classification for crisis management",
    shortTitle: "NLP classification of more than 15,000 tweets",
    category: "machine-learning",
    status: "selected-work",
    organization: "Infosys Springboard Internship",
    role: "AI Intern",
    period: "May 2024 – Jul 2024",
    location: "Remote",
    contexts: ["Crisis management", "Social media", "Situational awareness"],
    systems: ["NLP classification", "Crisis response"],
    technologies: ["NLP", "Machine learning"],
    summary: "Developed a machine learning model using NLP techniques to classify more than 15,000 tweets.",
    outcome: "The resume reports a 40% improvement in crisis management team response time.",
    disclosure: resumeOnlyDisclosure,
    workflow: {
      caption: "High-level workflow from the resume; model choice and evaluation method were not provided.",
      steps: [
        { title: "Tweet data", detail: "More than 15,000 tweets" },
        { title: "NLP classification", detail: "Machine learning model classifies tweets" },
        { title: "Situational awareness", detail: "Classification supports crisis management teams" },
        { title: "Response", detail: "Resume reports a 40% response-time improvement" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Crisis management signals", body: "The internship project used tweet classification to support situational awareness for crisis management teams." },
      { eyebrow: "Contribution", title: "NLP model development", body: "Developed a machine learning model leveraging NLP techniques to classify a dataset of more than 15,000 tweets." },
      { eyebrow: "Outcome and limits", title: "Response-time claim", body: "The resume reports a 40% improvement in response time. It does not name the model, provide classification metrics, or explain the response-time measurement." },
    ],
    links: [],
    featured: true,
    order: 5,
  },
  {
    slug: "potato-leaf-disease",
    name: "Enhancing Crop Productivity with Fine-Tuned Deep Convolution Neural Network",
    shortTitle: "Potato leaf disease detection research",
    category: "machine-learning",
    status: "selected-work",
    organization: "Published in Expert Systems with Applications",
    role: "Research project",
    period: "Not specified",
    location: "Not specified",
    contexts: ["Agriculture", "Plant disease detection", "Academic research"],
    systems: ["Image classification", "Convolutional neural networks"],
    technologies: ["CNNs", "Deep learning"],
    summary: "Compared three CNN models for potato leaf disease detection.",
    outcome: "The resume reports a 7.68% accuracy improvement. The paper is listed in Expert Systems with Applications (impact factor 7.5).",
    disclosure: "Published paper: https://doi.org/10.1016/j.eswa.2024.126066. The resume does not specify the three model names or the accuracy baseline.",
    workflow: {
      caption: "Research workflow reconstructed from the resume; model names and evaluation split were not provided.",
      steps: [
        { title: "Potato leaf images", detail: "Disease detection task" },
        { title: "CNN comparison", detail: "Three different convolutional neural network models" },
        { title: "Accuracy evaluation", detail: "Reported 7.68% improvement; baseline not stated" },
        { title: "Publication", detail: "Expert Systems with Applications" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Potato leaf disease detection", body: "The project investigated deep convolutional neural networks for identifying disease in potato leaves." },
      { eyebrow: "Contribution", title: "Comparison across three CNN models", body: "Compared results using three different CNN models. The resume does not identify the models or describe the individual contribution boundaries." },
      { eyebrow: "Publication and outcome", title: "Published research", body: "The work was published in Expert Systems with Applications. The resume reports a 7.68% improvement in accuracy; the baseline and evaluation split are not stated here." },
    ],
    links: [{ label: "Published paper (DOI)", url: "https://doi.org/10.1016/j.eswa.2024.126066" }],
    featured: true,
    order: 6,
  },
  {
    slug: "urban-scene-segmentation",
    name: "Semantic Object Segmentation for Autonomous Vehicles in Urban Traffic Scene",
    shortTitle: "Semantic segmentation on the CamVid dataset",
    category: "machine-learning",
    status: "selected-work",
    organization: "Independent project",
    role: "Research project",
    period: "Not specified",
    location: "Not specified",
    contexts: ["Autonomous vehicles", "Urban traffic scenes", "Computer vision"],
    systems: ["Semantic segmentation", "Pixel-wise prediction"],
    technologies: ["DeepLabV3+", "ResNet-50", "CamVid"],
    summary: "Proposed a DeepLabV3+ model with a ResNet-50 backbone for pixel-wise segmentation on CamVid.",
    outcome: "Reported validation accuracy 91.8%, Dice 94.99%, and IoU 90.53%; test accuracy 87.3%, Dice 92.6%, and IoU 86.5%.",
    disclosure: "No public repository or publication URL was supplied in the resume.",
    workflow: {
      caption: "Model and dataset are resume-backed; preprocessing and training details were not supplied.",
      steps: [
        { title: "CamVid dataset", detail: "Urban traffic-scene images" },
        { title: "Segmentation model", detail: "DeepLabV3+ with a ResNet-50 backbone" },
        { title: "Pixel-wise prediction", detail: "Semantic object segmentation" },
        { title: "Evaluation", detail: "Validation and test accuracy, Dice, and IoU reported in the resume" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Urban traffic scene understanding", body: "The project applied semantic segmentation to the CamVid dataset for autonomous-vehicle traffic scenes." },
      { eyebrow: "Contribution", title: "DeepLabV3+ with ResNet-50", body: "Proposed a DeepLabV3+ architecture with a ResNet-50 backbone for pixel-wise segmentation." },
      { eyebrow: "Evidence", title: "Validation and test metrics", body: "The resume reports validation accuracy of 91.8%, Dice of 94.99%, and IoU of 90.53%; test accuracy of 87.3%, Dice of 92.6%, and IoU of 86.5%. Dataset split details were not provided." },
    ],
    links: [],
    featured: true,
    order: 7,
  },
  {
    slug: "music-generation",
    name: "Music Generation using RNN-LSTM",
    shortTitle: "An end-to-end MIDI music generation pipeline",
    category: "machine-learning",
    status: "experimental",
    organization: "Independent project",
    role: "Project developer",
    period: "Not specified",
    location: "Not specified",
    contexts: ["Music generation", "MIDI datasets", "Model deployment"],
    systems: ["Data preprocessing", "Melody generation API", "Containerized deployment"],
    technologies: ["Keras", "TensorFlow", "Flask", "Docker", "Gradio", "LSTM"],
    summary: "Built an LSTM-based music generation model trained on MIDI datasets, with preprocessing, model training, a melody-generation API, Docker deployment, and a Gradio interface.",
    outcome: "The resume reports a 15% reduction in loss.",
    disclosure: "The public repository documents the Gradio interface, API, and deployment options. The resume reports the model outcome; the repository does not provide a benchmark methodology for the 15% loss reduction.",
    workflow: {
      caption: "Stages combine the resume and public repository; model evaluation methodology for the reported loss reduction is unavailable.",
      steps: [
        { title: "MIDI data", detail: "Training dataset" },
        { title: "Preprocess and train", detail: "Keras/TensorFlow LSTM pipeline" },
        { title: "Generate melody", detail: "Flask API with Docker deployment" },
        { title: "Try the demo", detail: "Public Gradio interface on Hugging Face Spaces" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Sequence modeling for music", body: "The project trained an LSTM-based music generation model on MIDI datasets." },
      { eyebrow: "Contribution", title: "End-to-end implementation", body: "The resume describes preprocessing and training with Keras/TensorFlow, a melody generation API with Flask, and containerized deployment using Docker. The public repository also includes a Gradio interface." },
      { eyebrow: "Outcome", title: "Loss reduction and public demo", body: "The resume reports a 15% reduction in loss. The public repository provides a live Hugging Face demo; no benchmark methodology for the loss figure is stated." },
    ],
    links: [
      { label: "GitHub repository", url: "https://github.com/anushkavb4/Music-Gen" },
      { label: "Live demo", url: "https://huggingface.co/spaces/anushkavb4/music-gen" },
    ],
    featured: true,
    order: 8,
  },
  {
    slug: "clinical-document-intelligence-hub",
    name: "Clinical Document Intelligence Hub",
    shortTitle: "Traceable extraction and deterministic clinical decision support",
    category: "enterprise-ai",
    status: "experimental",
    organization: "Independent prototype",
    role: "Repository contributor",
    period: "Not specified",
    location: "Not specified",
    contexts: ["Clinical documents", "Synthetic data", "Decision support"],
    systems: ["Multimodal document ingestion", "Schema-constrained extraction", "NEWS2 scoring", "Encounter comparison"],
    technologies: ["Python", "Gemini 3.6 Flash", "Pydantic", "Streamlit", "pdfplumber", "pytest"],
    summary: "A public proof of concept that ingests clinical text, PDFs, and images, extracts structured fields with source quotes, and presents a patient summary with a deterministic NEWS2 risk flag.",
    outcome: "The repository reports 59 passing tests and an audit of 95 source quotes with zero containing content absent from the source. Its bundled samples are synthetic.",
    disclosure: "Proof of concept using synthetic data only; the repository states it is decision support, not a medical device. Confidence is noisy on mildly degraded scans, and clinical validation is not claimed.",
    workflow: {
      caption: "Stages follow the public repository's documented pipeline.",
      steps: [
        { title: "Ingest", detail: "Text, PDF, or image becomes bytes and a MIME type" },
        { title: "Extract", detail: "Gemini structured output validated against a Pydantic schema" },
        { title: "Score", detail: "Python computes NEWS2 and critical-lab flags deterministically" },
        { title: "Compare", detail: "Optional deterministic comparison of two encounters" },
        { title: "Present", detail: "Summary, source quotes, trajectory, details, and JSON export" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "A document-to-summary proof of concept", body: "The public project handles unstructured clinical documents using synthetic examples. It is explicitly described as decision support, not a medical device." },
      { eyebrow: "Architecture", title: "The model extracts; Python scores", body: "Text, PDF, and image inputs are ingested, then a Gemini call returns schema-constrained fields validated with Pydantic. Python computes NEWS2 and critical-lab flags deterministically; a separate comparison path diffs two encounters." },
      { eyebrow: "Technical decisions", title: "Keep evidence and risk rules inspectable", body: "Extracted fields carry verbatim source quotes, missing values remain marked as not documented, and incomplete vital signs can produce an INDETERMINATE score. The repository reports native image reading without a local OCR stage." },
      { eyebrow: "Evidence and limits", title: "Measured on bundled synthetic samples", body: "The repository reports 59 passing tests and 95 audited source quotes with zero containing content absent from the source. It also documents unstable confidence on mildly degraded scans and nondeterministic extraction details; the prototype is not presented as clinically validated." },
    ],
    links: [
      { label: "GitHub repository", url: "https://github.com/anushkavb4/clinical-document-intelligence-hub" },
      { label: "Design notes and findings", url: "https://github.com/anushkavb4/clinical-document-intelligence-hub/blob/main/FINDINGS.md" },
    ],
    featured: true,
    order: 9,
  },
  {
    slug: "spotify-blend",
    name: "Spotify Blend: Reinforcement Learning Edition",
    shortTitle: "A playlist recommendation prototype for two listeners",
    category: "machine-learning",
    status: "experimental",
    organization: "Independent project",
    role: "Repository author",
    period: "Not specified",
    location: "Not specified",
    contexts: ["Music recommendation", "Two-user preference blending", "Spotify API"],
    systems: ["Reinforcement learning", "Playlist generation", "Preference blending"],
    technologies: ["Python", "Stable-Baselines3", "Gymnasium", "Spotipy", "PyTorch", "Pandas", "NumPy"],
    summary: "A public repository describing a reinforcement-learning approach to selecting songs for playlists that blend two users' preferences, audio features, genre distribution, and diversity.",
    outcome: "The README describes data collection, training, evaluation, and playlist-generation steps but reports no quantitative evaluation results or live demo.",
    disclosure: "The README mentions contextual bandits in its overview and DQN in its training instructions; the implemented algorithm and measured performance need confirmation before making a stronger claim.",
    workflow: {
      caption: "The stages reflect the README; the specific RL algorithm and outcome measures remain unverified.",
      steps: [
        { title: "Collect listening data", detail: "Spotify API integration" },
        { title: "Prepare preferences", detail: "Audio features, genre distribution, and diversity" },
        { title: "Train and evaluate", detail: "README describes an RL agent; algorithm references are inconsistent" },
        { title: "Generate playlist", detail: "Blend preferences from two users" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Blending two music profiles", body: "The repository describes a Spotify Blend-style recommender intended to create a shared playlist using two users' listening preferences." },
      { eyebrow: "System", title: "Recommendation and Spotify integration", body: "The README describes collecting listening data, training and evaluating an RL agent, then generating a playlist through the Spotify API. Listed tools include Stable-Baselines3, Gymnasium, Spotipy, PyTorch, Pandas, and NumPy." },
      { eyebrow: "Evidence and limits", title: "Experimental; performance not reported", body: "No quantitative recommendation results or live demo are documented. The README refers to both contextual bandits and DQN, so the precise algorithm requires verification against the implementation." },
    ],
    links: [{ label: "GitHub repository", url: "https://github.com/anushkavb4/OneOverF" }],
    featured: true,
    order: 10,
  },
];

export const researchQuestions: ResearchQuestion[] = [
  {
    slug: "measuring-retrieval",
    title: "How should retrieval improvements be evaluated?",
    question: "Which retrieval-time and extraction-quality measures best represent usefulness in institutional document workflows?",
    whyItMatters: "The EBRD RAG work reports a retrieval-time reduction and extraction accuracy; the resume does not specify their evaluation methods or baselines.",
    relatedSystems: ["ebrd-rag", "ebrd-agentic-ai"],
    confidence: "medium",
    unknowns: ["Evaluation baselines", "Impact of document and query variation"],
  },
  {
    slug: "operational-guardrails",
    title: "Which platform controls make scientific jobs safer to operate?",
    question: "How do quotas, role-based access, and job monitoring affect successful use of shared simulation services?",
    whyItMatters: "These controls are listed as components of CERN Openlab's Gofer service, but the resume does not give separate measurements for each.",
    relatedSystems: ["cern-gofer", "aiassistant-platform"],
    confidence: "medium",
    unknowns: ["Per-control impact", "Deployment and reliability details"],
  },
];

export const notes: ProjectNote[] = [
  {
    slug: "retrieval-pipeline-outcomes",
    title: "Retrieval pipeline outcomes",
    status: "published",
    summary: "Resume-backed notes on the EBRD document RAG work and its reported measures.",
    relatedProject: "ebrd-rag",
    sections: [
      { title: "Pipeline scope", body: "The internship work covered RAG for institutional documents and LLM-driven structured data extraction, using Azure OpenAI, Azure AI Search, LlamaIndex, and Streamlit." },
      { title: "Reported measures", body: "The resume reports 1,000+ documents processed at 95% extraction accuracy and a 30% retrieval-time reduction after proposing semantic chunking and contextual compression." },
      { title: "What remains unknown", body: "The resume does not state the accuracy definition, retrieval-time baseline, test methodology, or public implementation URL." },
    ],
  },
  {
    slug: "gofer-service-controls",
    title: "Gofer service controls",
    status: "published",
    summary: "A factual summary of the access and monitoring features listed for CERN Openlab's Gofer platform.",
    relatedProject: "cern-gofer",
    sections: [
      { title: "Platform features", body: "The resume describes user quotas, role-based access control, and job monitoring for particle physics simulation workflows." },
      { title: "Integration and status", body: "OpenAPI-based integration tools and client libraries were delivered, and the web UI was redesigned to show real-time job status." },
      { title: "Reported outcomes", body: "The resume attributes 40% less onboarding time for new services to the integration tools and client libraries, and a 35% increase in task submission success to real-time job status tracking." },
    ],
  },
];

export const contextTrajectory: ContextTrajectory[] = [
  {
    step: "01",
    context: "EBRD · London, United Kingdom · AI Engineer · Jul 2026–Present",
    question: "How can multi-agent orchestration and tool-augmented LLMs automate enterprise knowledge work?",
    technicalChoices: "The resume names multi-agent orchestration and tool-augmented LLMs for enterprise workflows; models, tools, and evaluation details are not disclosed.",
    outcome: "Building agentic AI solutions for knowledge retrieval and decision-making; the resume lists no quantified outcome yet.",
  },
  {
    step: "02",
    context: "EBRD · London, United Kingdom · AI Intern · Aug 2025–Feb 2026",
    question: "How can institutional documents support retrieval and structured extraction?",
    technicalChoices: "RAG and extraction used Azure OpenAI, Azure AI Search, LlamaIndex, and Streamlit. Semantic chunking and contextual compression were proposed; the resume reports 30% faster retrieval.",
    outcome: "RAG and extraction pipelines with reported 95% accuracy across 1,000+ documents and 30% lower retrieval time.",
  },
  {
    step: "03",
    context: "CERN Openlab · Geneva, Switzerland · Technical Intern · Jun–Aug 2025",
    question: "How can simulation services expose access, job state, and integration paths?",
    technicalChoices: "Gofer included user quotas, role-based access control, job monitoring, OpenAPI client tools, and real-time job status for simulation workflows.",
    outcome: "Built Gofer platform features, OpenAPI tools, client libraries, and real-time job status tracking.",
  },
  {
    step: "04",
    context: "AIAssistant.co · California, United States (Remote) · SDE Intern · Feb 2024–May 2025",
    question: "How can production voice integrations improve responsiveness and speech naturalness?",
    technicalChoices: "Production work used Python, Flask, and PostgreSQL; voice integrations used FastAPI. TTS acoustic-model, prosody, and synthesis tuning were separately listed contributions.",
    outcome: "Built voice assistant APIs and worked on TTS; the resume reports 35% faster responses and at least 30% higher naturalness.",
  },
  {
    step: "05",
    context: "Infosys Springboard Internship · Remote · AI Intern · May–Jul 2024",
    question: "How can tweet classification support crisis management teams?",
    technicalChoices: "The project applied NLP-based machine-learning classification to more than 15,000 tweets; the resume does not name the model or evaluation metrics.",
    outcome: "The resume reports a 40% improvement in crisis-management response time.",
  },
  {
    step: "06",
    context: "Independent research projects · locations not specified",
    question: "How do AI methods map to different research tasks?",
    technicalChoices: "The listed projects use CNN comparison for potato leaf disease, DeepLabV3+ with ResNet-50 for CamVid segmentation, and an LSTM for MIDI music generation. Their project locations are not specified.",
    outcome: "The potato-leaf study was published in Expert Systems with Applications; segmentation and music-generation results are recorded on their project pages.",
  },
];

export const portfolioContent = {
  atlasNodes,
  atlasEdges,
  projects: featuredProjects,
  questions: researchQuestions,
  notes,
  contextTrajectory,
};
