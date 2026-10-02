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
  workType: "professional-experience" | "independent-work";
  organization: string;
  role: string;
  period: string;
  location: string;
  contexts: string[];
  systems: string[];
  technologies: string[];
  summary: string;
  outcome: string;
  disclosure?: string;
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

export const featuredProjects: PortfolioProject[] = [
  {
    slug: "moqi-collective-intelligence",
    name: "Collective intelligence for decision-making",
    shortTitle: "Multi-agent evaluation for enterprise innovation and early-stage investing",
    category: "enterprise-ai",
    status: "current-work",
    workType: "professional-experience",
    organization: "MoQi",
    role: "Co-Founder & Lead Engineer",
    period: "Mar 2025 – Present",
    location: "Remote",
    contexts: ["Enterprise innovation", "Early-stage investing", "Decision systems"],
    systems: ["Multi-agent input", "Weighted aggregation", "Explainable ranking"],
    technologies: [],
    summary: "Building a collective intelligence platform that turns subjective idea and startup evaluation into structured, data-driven decision systems.",
    outcome: "Designed mechanisms to capture, weight, and aggregate multi-agent input into ranked, explainable outcomes.",
    workflow: {
      caption: "High-level workflow summarized from the supplied CV; internal architecture is not shown.",
      steps: [
        { title: "Idea or startup", detail: "A proposal enters an evaluation workflow" },
        { title: "Collect input", detail: "Capture judgments from multiple agents" },
        { title: "Weight and aggregate", detail: "Combine input into a structured decision" },
        { title: "Explainable ranking", detail: "Present ranked outcomes for review" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "From subjective opinions to structured decisions", body: "MoQi is developing decision systems for enterprise innovation and early-stage investing, where evaluations can otherwise be difficult to compare." },
      { eyebrow: "Contribution", title: "Co-founding and technical leadership", body: "As Co-Founder and Lead Engineer, designed mechanisms to capture, weight, and aggregate multi-agent input." },
      { eyebrow: "System", title: "Ranked and explainable outcomes", body: "The platform turns collected judgments into structured rankings that make the basis of an evaluation easier to inspect." },
    ],
    links: [],
    featured: true,
    order: 0,
  },
  {
    slug: "ebrd-agentic-ai",
    name: "Agentic AI for enterprise workflows",
    shortTitle: "Multi-agent orchestration and tool-augmented LLMs",
    category: "enterprise-ai",
    status: "current-work",
    workType: "professional-experience",
    organization: "EBRD",
    role: "AI Engineer",
    period: "Jul 2026 – Present",
    location: "London, United Kingdom",
    contexts: ["Enterprise workflows", "Knowledge retrieval", "Decision support"],
    systems: ["Multi-agent orchestration", "Tool-augmented LLMs", "Knowledge retrieval"],
    technologies: ["LLMs", "Multi-agent systems"],
    summary: "Building agentic AI solutions for enterprise workflows, including systems for complex knowledge retrieval and decision-making use cases.",
    outcome: "Automating complex knowledge retrieval and decision-making processes across institutional use cases.",
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
    workType: "professional-experience",
    organization: "EBRD",
    role: "AI Intern",
    period: "Aug 2025 – Feb 2026",
    location: "London, United Kingdom",
    contexts: ["Institutional documents", "Information retrieval", "Structured extraction"],
    systems: ["RAG", "Hybrid search", "Reranking", "Embedding retrieval", "Semantic chunking", "Structured extraction"],
    technologies: ["Python", "Azure OpenAI", "Azure AI Search", "LlamaIndex", "Streamlit"],
    summary: "Built institutional-document RAG and structured-extraction pipelines with hybrid retrieval, reranking, and embedding-based search.",
    outcome: "Built RAG and structured-extraction pipelines for institutional documents using semantic chunking and contextual compression.",
    workflow: {
      caption: "High-level flow assembled from resume-listed tasks and tools; component-level architecture was not supplied.",
      steps: [
        { title: "Institutional documents", detail: "Source material for retrieval and structured extraction" },
        { title: "Retrieve", detail: "Hybrid search, reranking, embeddings, chunking, and context management" },
        { title: "LLM processing", detail: "Azure OpenAI for RAG and structured data extraction" },
        { title: "User interface", detail: "Streamlit" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Institutional document workflows", body: "During an AI internship at EBRD in London, the work focused on retrieving information from institutional documents and extracting structured data." },
      { eyebrow: "Contribution", title: "Retrieval and structured extraction", body: "Built RAG with LlamaIndex, Azure OpenAI, and Azure AI Search, including hybrid search, reranking, and embedding-based retrieval. Developed Python extraction pipelines with schema design, chunking, and retrieval alignment." },
      { eyebrow: "Outcome", title: "Pipeline improvements", body: "The source material describes improvements to extraction quality and retrieval time, but does not provide evaluation methodology or baselines." },
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
    workType: "professional-experience",
    organization: "CERN Openlab",
    role: "Technical Intern",
    period: "Jun 2025 – Aug 2025",
    location: "Geneva, Switzerland",
    contexts: ["Particle physics", "FPGA synthesis", "Scientific computing"],
    systems: ["FPGA synthesis workflows", "Quotas", "Role-based access control", "Secure job orchestration", "REST API client"],
    technologies: ["Python", "FastAPI", "OpenAPI"],
    summary: "Developed Gofer, a multi-user Synthesis-as-a-Service platform for FPGA workflows in scientific computing.",
    outcome: "OpenAPI integration tools and client libraries streamlined service onboarding, while real-time job status tracking improved task submission success.",
    workflow: {
      caption: "Operational sequence reconstructed from resume-listed platform features; internal service architecture was not supplied.",
      steps: [
        { title: "Submit synthesis job", detail: "Research groups submit FPGA workflows to Gofer" },
        { title: "Access controls", detail: "User quotas and role-based access control" },
        { title: "Run and monitor", detail: "Job monitoring for submitted work" },
        { title: "Track status", detail: "Real-time job status in the redesigned web UI" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Scientific computing at CERN Openlab", body: "Gofer enabled multi-user access to FPGA synthesis workflows for research groups at CERN Openlab in Geneva." },
      { eyebrow: "Contribution", title: "Workflow platform and research integrations", body: "Developed Gofer in Python with quotas, role-based access, and secure job orchestration. Built a REST API client for submitting, monitoring, and retrieving jobs, and improved workflow scheduling." },
      { eyebrow: "Outcome", title: "Onboarding and submission improvements", body: "The source material associates the integration tools with easier onboarding and real-time status tracking with higher task submission success. Deployment architecture and evaluation details were not supplied." },
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
    workType: "professional-experience",
    organization: "AIAssistant.co",
    role: "SDE Intern",
    period: "Feb 2024 – May 2025",
    location: "California, United States (Remote)",
    contexts: ["AI products", "Voice assistants", "Production platform"],
    systems: ["Prompt orchestration", "Multi-agent coordination", "Voice APIs", "TTS conditioning", "Inference reliability"],
    technologies: ["Python", "Flask", "FastAPI", "PostgreSQL"],
    summary: "Built prompt orchestration and voice integration features, improved text-to-speech interactions, and fixed production reliability issues.",
    outcome: "Contributed to platform stability, responsive voice APIs, and more natural text-to-speech output.",
    caseStudy: [
      { eyebrow: "Context", title: "Production AI products", body: "Worked remotely with AIAssistant.co, a California-based organization, on deployed AI-powered products." },
      { eyebrow: "Contribution", title: "Prompt orchestration and voice interaction", body: "Designed a prompt orchestration framework with template libraries, dynamic context injection, and few-shot strategies. Developed content-aware TTS conditioning and contributed to agent coordination, latency, and inference reliability." },
      { eyebrow: "Architecture boundary", title: "Two contributions, not one asserted pipeline", body: "The resume lists voice assistant API work and TTS model tuning separately; it does not document how the API and speech-synthesis work were connected in production." },
      { eyebrow: "Outcome", title: "Service and speech-quality improvements", body: "The resume describes improved response times and TTS naturalness, but does not provide measurement protocols or public repository links." },
    ],
    links: [],
    featured: true,
    order: 4,
  },
  {
    slug: "infosys-nlp",
    name: "Tweet classification for crisis management",
    shortTitle: "Disaster-tweet classification and analysis",
    category: "machine-learning",
    status: "selected-work",
    workType: "professional-experience",
    organization: "Infosys Springboard Internship",
    role: "AI Intern",
    period: "May 2024 – Jul 2024",
    location: "Remote",
    contexts: ["Crisis management", "Social media", "Situational awareness"],
    systems: ["TF-IDF", "Transformer embeddings", "Ensemble classifiers", "Inference dashboards"],
    technologies: ["Python", "Streamlit", "NLP", "Machine learning"],
    summary: "Built a disaster-related tweet classification pipeline using TF-IDF, transformer embeddings, and ensemble classifiers.",
    outcome: "Created visualization dashboards for inference, evaluation, and error analysis.",
    workflow: {
      caption: "High-level workflow from the resume; model choice and evaluation method were not provided.",
      steps: [
        { title: "Social media posts", detail: "Source material for situational awareness" },
        { title: "Classify", detail: "Compare TF-IDF, transformer, and ensemble approaches" },
        { title: "Review", detail: "Streamlit dashboards for evaluation and error analysis" },
        { title: "Response", detail: "Classification supports crisis response" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Crisis management signals", body: "The internship project used tweet classification to support situational awareness for crisis management teams." },
      { eyebrow: "Contribution", title: "Classification pipeline", body: "Benchmarked TF-IDF, transformer embeddings, and ensemble classifiers on disaster-related social media posts." },
      { eyebrow: "Outcome", title: "Analysis dashboards", body: "Built Streamlit dashboards for inference, evaluation metrics, and error analysis." },
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
    workType: "independent-work",
    organization: "Published in Expert Systems with Applications",
    role: "Research project",
    period: "Not specified",
    location: "Not specified",
    contexts: ["Agriculture", "Plant disease detection", "Academic research"],
    systems: ["Six-class image classification", "K-fold cross-validation", "Hyperparameter optimization"],
    technologies: ["DenseNet201", "ResNet152V2", "NASNetMobile", "Deep learning"],
    summary: "Co-authored a six-class potato leaf disease study comparing DenseNet201, ResNet152V2, and NASNetMobile.",
    outcome: "The published study reports a 7.68% accuracy improvement over baselines using optimized preprocessing and augmentation.",
    disclosure: "The exact baseline scores and detailed cross-validation setup are not stated in the supplied resume.",
    workflow: {
      caption: "Research workflow reconstructed from the resume; model names and evaluation split were not provided.",
      steps: [
        { title: "Potato leaf images", detail: "Disease detection task" },
        { title: "Model comparison", detail: "DenseNet201, ResNet152V2, and NASNetMobile" },
        { title: "Evaluation", detail: "K-fold cross-validation and hyperparameter optimization" },
        { title: "Publication", detail: "Expert Systems with Applications" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Potato leaf disease detection", body: "The project investigated deep convolutional neural networks for identifying disease in potato leaves." },
      { eyebrow: "Contribution", title: "Model development and research", body: "Co-authored the work, contributing to model development, experimental design, result analysis, and manuscript writing. The study compared DenseNet201, ResNet152V2, and NASNetMobile across six potato leaf disease classes." },
      { eyebrow: "Publication and outcome", title: "Published in Expert Systems with Applications", body: "The study used k-fold cross-validation and hyperparameter optimization, and reports a 7.68% accuracy improvement over baselines after preprocessing and augmentation improvements." },
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
    workType: "independent-work",
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
    workType: "independent-work",
    organization: "Independent project",
    role: "Project developer",
    period: "Not specified",
    location: "Not specified",
    contexts: ["Music generation", "MIDI datasets", "Model deployment"],
    systems: ["Data preprocessing", "Melody generation API", "Containerized deployment"],
    technologies: ["Keras", "TensorFlow", "Flask", "Docker", "Gradio", "LSTM"],
    summary: "Trained an LSTM-based music generation model on more than 50,000 MIDI events, with preprocessing, a melody-generation API, and a live demo.",
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
      { eyebrow: "Contribution", title: "End-to-end implementation", body: "Trained an LSTM model on more than 50,000 MIDI events, tuned hyperparameters, and built the generation API and deployment. The public repository also includes a Gradio interface." },
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
    workType: "independent-work",
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
    workType: "independent-work",
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
  {
    slug: "multilingual-safety-alignment",
    name: "Multilingual safety alignment with intent-aware DPO",
    shortTitle: "Research on multilingual LLM jailbreak robustness",
    category: "ai-safety",
    status: "current-work",
    workType: "independent-work",
    organization: "Group research project",
    role: "Research project",
    period: "2025 – Ongoing",
    location: "Not specified",
    contexts: ["AI safety", "Multilingual NLP", "Bengali, Chinese, and Arabic"],
    systems: ["Intent-aware prompt rewriting", "Safety filtering", "Preference optimization"],
    technologies: ["Direct Preference Optimization", "Hugging Face Transformers", "PEFT", "XSTest", "PolyGuard"],
    summary: "Developing an alignment framework for multilingual LLM jailbreak vulnerabilities across Bengali, Chinese, and Arabic.",
    outcome: "The group is constructing synthetic preference data and evaluating aligned models with multilingual safety benchmarks.",
    workflow: {
      caption: "Research workflow summarized from the supplied CV; this is not an original internal diagram.",
      steps: [
        { title: "Multilingual adversarial input", detail: "Jailbreak prompts in Bengali, Chinese, and Arabic" },
        { title: "Intent-aware safeguards", detail: "Prompt rewriting and safety filtering" },
        { title: "Preference alignment", detail: "Synthetic preferences and DPO fine-tuning" },
        { title: "Robustness evaluation", detail: "XSTest and PolyGuard benchmarks" },
      ],
    },
    caseStudy: [
      { eyebrow: "Research question", title: "Can safety transfer across languages?", body: "This group research project studies multilingual jailbreak vulnerabilities in Bengali, Chinese, and Arabic." },
      { eyebrow: "Approach", title: "Intent-aware alignment", body: "The project is developing prompt rewriting and safety filtering, then training with Direct Preference Optimization on synthetic preference datasets using Transformers and PEFT." },
      { eyebrow: "Evaluation", title: "Measure multilingual robustness", body: "The CV lists XSTest and PolyGuard for benchmark evaluation and analysis of cross-lingual transferability. Results are not yet reported." },
    ],
    links: [],
    featured: true,
    order: 11,
  },
  {
    slug: "alzheimers-detection-ensembles",
    name: "Alzheimer’s disease detection with deep learning ensembles",
    shortTitle: "Ensemble classification from MRI scans",
    category: "machine-learning",
    status: "selected-work",
    workType: "independent-work",
    organization: "Independent research",
    role: "Research project",
    period: "Not specified",
    location: "Not specified",
    contexts: ["Medical image analysis", "MRI", "Alzheimer’s disease"],
    systems: ["Image preprocessing", "Ensemble classification", "Ablation studies"],
    technologies: ["VGG16", "MobileNet", "InceptionResNetV2", "Deep learning"],
    summary: "Developed an ensemble framework for multi-stage Alzheimer’s classification from MRI scans.",
    outcome: "The CV reports 97.93% accuracy, 98.04% specificity, and 95.89% sensitivity, outperforming individual backbones by 2.8%.",
    workflow: {
      caption: "High-level research workflow summarized from the supplied CV; dataset and evaluation protocol are not specified.",
      steps: [
        { title: "MRI scans", detail: "Medical images for multi-stage classification" },
        { title: "Preprocess", detail: "Intensity normalization, skull-stripping, and spatial alignment" },
        { title: "Ensemble", detail: "Combine VGG16, MobileNet, and InceptionResNetV2" },
        { title: "Evaluate", detail: "Ablation and hyperparameter studies" },
      ],
    },
    caseStudy: [
      { eyebrow: "Context", title: "Medical image analysis", body: "This independent research project applies deep-learning ensembles to Alzheimer’s classification from MRI scans." },
      { eyebrow: "Approach", title: "Preprocessing and model ensemble", body: "The work combines VGG16, MobileNet, and InceptionResNetV2, with intensity normalization, skull-stripping, and spatial alignment before classification." },
      { eyebrow: "Reported results", title: "Ensemble performance", body: "The supplied CV reports 97.93% accuracy, 98.04% specificity, and 95.89% sensitivity, with a 2.8% improvement over individual backbone models. Dataset and evaluation details were not supplied." },
    ],
    links: [],
    featured: true,
    order: 12,
  },
];

export const professionalExperience = featuredProjects.filter(
  (project) => project.workType === "professional-experience",
);

export const homepageProfessionalExperience = professionalExperience.filter((project) =>
  ["moqi-collective-intelligence", "ebrd-agentic-ai", "cern-gofer"].includes(project.slug),
);

export const independentWork = featuredProjects.filter(
  (project) => project.workType === "independent-work",
);

export const homepageIndependentWork = independentWork.filter((project) =>
  ["potato-leaf-disease", "multilingual-safety-alignment", "alzheimers-detection-ensembles"].includes(project.slug),
);

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
      { title: "Reported measures", body: "The resume describes extraction-quality and retrieval-time improvements after proposing semantic chunking and contextual compression, but does not provide evaluation details or baselines." },
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
      { title: "Reported outcomes", body: "The resume associates the integration tools and client libraries with easier service onboarding, and real-time job status tracking with improved task submission success." },
    ],
  },
];

export const portfolioContent = {
  atlasNodes,
  atlasEdges,
  projects: featuredProjects,
  questions: researchQuestions,
  notes,
};
