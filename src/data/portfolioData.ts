import { Education, Experience, Skill, Project, Certification } from '../types';

export const personalDetails = {
  name: 'Manamoy Banerjee',
  title: 'AI Engineer • Data Analyst • ML Engineer',
  roles: ['AI Engineer', 'Data Analyst', 'Machine Learning Engineer', 'Software Developer'],
  targetRoles: [
    'AI Engineer',
    'Data Analyst',
    'Machine Learning Engineer',
    'Software Development Engineer',
    'Data Scientist'
  ],
  bio: 'Highly motivated AI Engineer with strong analytical and software engineering skills, specializing in bridging the gap between deep machine learning research and enterprise software systems.',
  longBio: 'I specialize in architecting deep learning solutions, natural language processing pipelines, high-density data visualization interfaces, and highly performant backend integrations. Eager to solve real-world problems with data intelligence, combining strong statistical foundations with Apple-grade user interface precision.',
  education: {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'SRM Institute of Science and Technology',
    duration: '2021 — 2025',
    cgpa: '8.20 / 10',
    details: [
      'Specialization in Artificial Intelligence and Machine Learning',
      'Relevant Coursework: Advanced Deep Learning, Data Analytics, Neural Networks, Database Management Systems (DBMS), Analysis of Algorithms, Object-Oriented Software Design.'
    ]
  } as Education,
  socialLinks: {
    github: 'https://github.com/manamoybanerjee',
    linkedin: 'https://linkedin.com/in/manamoybanerjee',
    email: 'manamoyraja@gmail.com',
    location: 'India'
  }
};

export const skillsData: Skill[] = [
  // Programming Languages
  { name: 'Python', category: 'Programming', proficiency: 94, iconType: 'python' },
  { name: 'Java', category: 'Programming', proficiency: 82, iconType: 'java' },
  { name: 'C++', category: 'Programming', proficiency: 78, iconType: 'cpp' },
  { name: 'JavaScript', category: 'Programming', proficiency: 88, iconType: 'javascript' },
  { name: 'SQL', category: 'Programming', proficiency: 90, iconType: 'sql' },

  // Technical Domains
  { name: 'Machine Learning', category: 'Domains', proficiency: 92, iconType: 'ml' },
  { name: 'Deep Learning', category: 'Domains', proficiency: 89, iconType: 'deeplearning' },
  { name: 'Data Analytics', category: 'Domains', proficiency: 88, iconType: 'data' },
  { name: 'NLP', category: 'Domains', proficiency: 85, iconType: 'nlp' },
  { name: 'Software Engineering', category: 'Domains', proficiency: 91, iconType: 'se' },

  // Frameworks
  { name: 'TensorFlow', category: 'Frameworks', proficiency: 86, iconType: 'tensorflow' },
  { name: 'PyTorch', category: 'Frameworks', proficiency: 88, iconType: 'pytorch' },
  { name: 'Scikit-Learn', category: 'Frameworks', proficiency: 90, iconType: 'scikit' },
  { name: 'OpenCV', category: 'Frameworks', proficiency: 82, iconType: 'opencv' },
  { name: 'Pandas', category: 'Frameworks', proficiency: 94, iconType: 'pandas' },
  { name: 'NumPy', category: 'Frameworks', proficiency: 90, iconType: 'numpy' },

  // Databases
  { name: 'MySQL', category: 'Databases', proficiency: 85, iconType: 'mysql' },
  { name: 'MongoDB', category: 'Databases', proficiency: 80, iconType: 'mongodb' },
  { name: 'SQLite', category: 'Databases', proficiency: 84, iconType: 'sqlite' },
  { name: 'PostgreSQL', category: 'Databases', proficiency: 88, iconType: 'postgres' },

  // Developer Tools
  { name: 'Git', category: 'Tools', proficiency: 90, iconType: 'git' },
  { name: 'GitHub', category: 'Tools', proficiency: 92, iconType: 'github' },
  { name: 'VS Code', category: 'Tools', proficiency: 95, iconType: 'vscode' },
  { name: 'Google Colab', category: 'Tools', proficiency: 88, iconType: 'colab' },
  { name: 'Jupyter', category: 'Tools', proficiency: 87, iconType: 'jupyter' }
];

export const projectsData: Project[] = [
  {
    id: 'sentiment-stock-forecast',
    title: 'Sentiment-Aware Stock Volatility Forecasting',
    category: 'ML',
    description: 'An advanced pipeline incorporating qualitative and quantitative data to anticipate market behaviors under stressful event horizons.',
    problem: 'High-frequency stock markets suffer from instantaneous price shocks. Conventional parametric models completely ignore micro-blogging sentiment and macroeconomic news indicators, leading to severe volatility mispricing.',
    solution: 'Designed and deployed an end-to-end forecasting pipeline that parses real-time financial news datasets via FinBERT to yield qualitative indices. Feeds continuous sentiment values jointly with price histories into a hybrid LSTM-GARCH neural architecture.',
    impact: 'Suppressed Mean Absolute Error (MAE) by 18.4% compared to standard GARCH(1,1) benchmarks. Provided actionable volatility heatmaps signaling potential hedge zones 3 trading hours before extreme shocks materialised.',
    techStack: ['Python', 'PyTorch', 'FinBERT', 'Pandas', 'Matplotlib', 'Statsmodels'],
    githubUrl: 'https://github.com/manamoybanerjee/sentiment-stock-volatility',
    demoUrl: '#',
    image: '📈',
    featured: true,
    architecture: [
      'Ingest unstructured real-time articles via NewsAPI streams.',
      'Quantify headline sentiments to 3D vectors with FinBERT weights.',
      'Bind continuous qualitative indices into a quantitative price series grid.',
      'Feed standard LSTM cells mapping long-term sequential dependencies.',
      'Fit residual GARCH(1,1) layers modeling high-frequency variance.'
    ],
    results: 'Outperformed traditional GARCH models with an 18.4% reduction in Mean Absolute Error (MAE) and successfully predicted two major market drawdown incidents ahead of normal market alerts.',
    challenges: 'Abrupt news cycles caused high signal-to-noise ratio in sentiment curves. This was mitigated by applying localized double exponential smoothing on sentiment outputs before binding.',
    futureImprovements: [
      'Integrate macroeconomic signals such as Federal Reserve rate announcements.',
      'Introduce real-time backtesting triggers for automatic paper trading.'
    ],
    stars: 142,
    forks: 38,
    openIssues: 3
  },
  {
    id: 'deepfake-detection',
    title: 'Dual-Stream Deepfake Detection System',
    category: 'Research',
    description: 'A deep neural defense framework designed to capture micro-expressions and frame inconsistencies in real-time video validation fields.',
    problem: 'Generative facial synthesis models (GANs, Diffusion) have scaled rapidly, producing photorealistic deepfakes capable of passing visual inspections, causing huge biometric verification vulnerabilities.',
    solution: 'Built a dual-stream architecture tracking spatial facial artifacts (coarse pixel inconsistencies, blended margins) using EfficientNet-B4 combined with temporal frame sequence verification using an interactive ConvLSTM sequence block.',
    impact: 'Achieved a robust 94.2% AUC on the Celeb-DF test suite, accompanied by a grad-CAM activation visualizer overlay illustrating exactly which facial nodes trigger the authentic-vs-manipulated rating.',
    techStack: ['Python', 'TensorFlow', 'EfficientNet', 'ConvLSTM', 'OpenCV', 'FastAPI'],
    githubUrl: 'https://github.com/manamoybanerjee/deepfake-detection',
    demoUrl: '#',
    image: '🎭',
    featured: true,
    architecture: [
      'Crop and align facial landmark frames with MTCNN detectors.',
      'Extract fine-grained spatial anomalies using an EfficientNet-B4 CNN backbone.',
      'Map multi-frame temporal vectors utilizing recurrent ConvLSTM layers.',
      'Classify target media authenticity score through dual attention grids.',
      'Render dynamic spotlight heatmaps using Grad-CAM class activation mapping.'
    ],
    results: 'Registered a 94.2% Area Under Curve (AUC) across the benchmark Celeb-DF repository, analyzing dynamic frame clips in less than 42ms on low-overhead nodes.',
    challenges: 'High compression rates in social media uploads blurred standard artifacts. Overcame this by injecting synthetic blur and compression noise into early training cycles.',
    futureImprovements: [
      'Expand verification to multi-channel acoustic speech patterns.',
      'Enable concurrent tracking of multiple faces in complex crowds.'
    ],
    stars: 195,
    forks: 48,
    openIssues: 7
  },
  {
    id: 'medicine-recommendation',
    title: 'Medicine Recommendation System',
    category: 'AI',
    description: 'A semantics-driven clinical recommendation workflow leveraging pharmaceutical knowledge graphs and patient inputs.',
    problem: 'Self-treatment symptom profiling suffers from subjective patient descriptions, and standard indexing often recommends conflicting or dangerous drug interactions during initial diagnoses.',
    solution: 'Structured a bio-semantic system. Extracts patient intents using BioBERT from unstructured descriptions, aligns symptoms with clinical graphs, and filters recommendations based on therapeutic drug family overlaps and cross-indications.',
    impact: 'Accelerated preliminary screening processes by 35% on experimental charts. Integrated safety flag indicators resolving contraindications with a 99.1% check rate.',
    techStack: ['Python', 'HuggingFace', 'BioBERT', 'Neo4j', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/manamoybanerjee/med-recommendation-graph',
    demoUrl: '#',
    image: '💊',
    featured: true,
    architecture: [
      'Parse unstructured verbal symptom summaries to clinical token vectors.',
      'Map specific symptom entities utilizing a fine-tuned BioBERT network.',
      'Traverse Graph paths on Neo4j to associate matching pharmaceutical families.',
      'Filter candidates through cross-indication and severe allergic warning logs.',
      'Render interactive medical relationship clusters on React canvases.'
    ],
    results: 'Isolated matching medical candidates for over 450 test profiles and maintained zero interaction reporting failures in critical allergy test cases.',
    challenges: 'Misspelled symptom terms caused lookup errors. Resolved by establishing custom Jaro-Winkler string matcher mappings inside medical dictionary databases.',
    futureImprovements: [
      'Connect securely with open Healthcare Standards (HL7 FHIR API logs).',
      'Deploy conversational context checkpoints to manage multi-turn dialogs.'
    ],
    stars: 112,
    forks: 26,
    openIssues: 2
  },
  {
    id: 'personal-intel-system',
    title: 'Personal Intelligence System',
    category: 'Automation',
    description: 'Fully localized autonomous AI coordinator compiling, indexing, and organizing daily contextual assets and physical file repositories.',
    problem: 'Daily technical documents, research notes, and files are scattered across multiple platforms. Standard cloud search tools breach privacy and require constant active internet connections.',
    solution: 'Created a secure local automation system containing background file crawlers, a localized embedding index (using ChromaDB), and locally hosted small model tool execution loops.',
    impact: 'Established multi-format local indexing across 10,000+ files with sub-100ms vector matches and zero external cloud server telemetry.',
    techStack: ['TypeScript', 'Ollama', 'ChromaDB', 'Node.js', 'Electron', 'SQLite'],
    githubUrl: 'https://github.com/manamoybanerjee/personal-intelligence-core',
    demoUrl: '#',
    image: '🧠',
    featured: true,
    architecture: [
      'Index local file movements via continuous operating system file system hooks.',
      'Extract and chunk text formats based on markdown and section hierarchies.',
      'Generate local semantic vectors using Ollama-hosted embedding weights.',
      'Index document metadata fields in nested SQLite and ChromaDB files.',
      'Process localized prompt query lookups through isolated model routers.'
    ],
    results: 'Reduced manual folder retrieval timelines down to automatic unified commands, search results returning within 120ms with absolute data confidentiality.',
    challenges: 'High runtime overhead during heavy batch importing. Solved this by building a Rust-based parallel folder scanner.',
    futureImprovements: [
      'Introduce local voice-guided desktop automation shortcuts.',
      'Support peer-to-peer encrypted synchronization across personal devices.'
    ],
    stars: 238,
    forks: 54,
    openIssues: 5
  },
  {
    id: 'professional-portfolio',
    title: 'Professional Portfolio Website',
    category: 'Web Development',
    description: 'A responsive, premium developer showcase integrating dynamic headless CMS loaders, customized analytics, and interactive sandboxes.',
    problem: 'Developer portfolios are generally static and non-interactive, failing to validate actual implementation skills or provide engaging user experiences for recruiters.',
    solution: 'Synthesized a full-stack single-page application integrating interactive radar visualizations, real-time spreadsheet-synced databases, and a localized playground sandbox.',
    impact: 'Achieved impeccable Lighthouse performance metrics, full responsive theme adaptors, and high retention times.',
    techStack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Recharts', 'Motion'],
    githubUrl: 'https://github.com/manamoybanerjee/interactive-designer-portfolio',
    demoUrl: '#',
    image: '💻',
    featured: false,
    architecture: [
      'Design clean modular component structures in React.',
      'Formulate responsive, accessible grids and controls via Tailwind CSS utilities.',
      'Construct high-speed, type-safe data loading connectors for Headless databases.',
      'Render smooth motion transitions using Motion animations.',
      'Integrate client-side local cache systems to handle offline requests.'
    ],
    results: 'Secured pristine page load ratings of 100/100, resulting in highly increased visitor sessions and instant recruitment follow-ups.',
    challenges: 'Chart loading created sluggish initial frame response on mobile viewports. Remedied by deferring radar and chart render cycles utilizing Intersection Observers.',
    futureImprovements: [
      'Incorporate beautiful 3D particle backgrounds utilizing lightweight webgl grids.',
      'Add live statistics representing continuous integration (CI) deployment cycles.'
    ],
    stars: 87,
    forks: 14,
    openIssues: 0
  },
  {
    id: 'heart-disease-prediction',
    title: 'Cardiovascular Prediction & Analytics Engine',
    category: 'Data Analytics',
    description: 'An explainable cardiovascular analysis tool empowering healthcare providers with instant predictive clinical risk scoring.',
    problem: 'Physicians face high clinical load, where critical cardiovascular metrics scattered in multi-column databases create diagnosis lag-times.',
    solution: 'Formulated a highly accurate gradient boosted predictive model (XGBoost + Random Forest). Handled dataset class imbalance with SMOTE, computing feature impact values using TreeSHAP to deliver clear explanatory diagnostic notes.',
    impact: 'Secured a 98.7% statistical recall rating for critical heart failure conditions, visualizing tabular diagnostic inputs into individual Patient Biomarker Risk Explanations in under 80 milliseconds.',
    techStack: ['Python', 'Scikit-Learn', 'XGBoost', 'SMOTE', 'SHAP', 'Streamlit'],
    githubUrl: 'https://github.com/manamoybanerjee/heart-disease-predictor',
    demoUrl: '#',
    image: '❤️',
    featured: false,
    architecture: [
      'Load medical datasets into optimized Pandas structured arrays.',
      'Preprocess columns, standardizing fields and scaling variances with Scikit-Learn.',
      'Generate synthetic sample vectors utilizing SMOTE algorithms.',
      'Train gradient-boosting classifiers with exhaustive randomized grid search.',
      'Query and visualize structural symptom weights utilizing SHAP explanation plots.'
    ],
    results: 'Raised clinical recall to 98.7% for severe cardiovascular diagnoses and generated instant readable risk factor summaries.',
    challenges: 'Black-box neural systems are strictly untrustworthy in clinical settings. Avoided deep networks, opting for explainable booster models backed by rigorous SHAP weights.',
    futureImprovements: [
      'Configure auto-import routes for continuous telemetry from smartwatches.',
      'Integrate DICOM imaging analysis blocks alongside tabular biomarkers.'
    ],
    stars: 76,
    forks: 18,
    openIssues: 1
  }
];

export const experienceData: Experience[] = [
  {
    role: 'AI Engineer & ML Researcher Intern',
    company: 'Artificial Intelligence Research Labs',
    location: 'Remote / Bengaluru, India',
    duration: 'Jan 2025 — Present',
    type: 'Internship',
    points: [
      'Architected generative NLP workflows to parse multi-page financial risk documents, executing indexing speeds 40% faster than legacy transformers.',
      'Refined large language models via parameter-efficient fine-tuning (LoRA), lowering GPU memory bottlenecks by 3.2x while keeping semantic precision.',
      'Collaborated on real-time data visualizers generating high-frequency chart trends with low-overhead canvas components.'
    ],
    techUsed: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'HuggingFace', 'Docker']
  },
  {
    role: 'Technical Lead & Lead Developer',
    company: 'SRM AI/ML Innovation Club',
    location: 'Chennai, India',
    duration: 'Jul 2023 — Dec 2024',
    type: 'Leadership',
    points: [
      'Spearheaded a technical team of 15+ student developers, establishing robust code standards and continuous integration (CI) review loops.',
      'Designed and coordinated full-scale academic hackathons and workshops, introducing 400+ participants to basic neural networks and predictive data systems.',
      'Mentored multiple award-winning student projects integrating computer vision models with customized edge microcontrollers.'
    ],
    techUsed: ['Python', 'Scikit-Learn', 'Git', 'GitHub Actions', 'VS Code']
  },
  {
    role: 'Developer & Data Analyst Intern',
    company: 'NexTech Solutions',
    location: 'Chennai, India',
    duration: 'May 2024 — Jul 2024',
    type: 'Internship',
    points: [
      'Analyzed complex operational business datasets, formulating interactive dashboards in Power BI and Tableau showcasing performance KPIs.',
      'Constructed robust SQL batch ingestion scripts converting raw file structures into optimized relative schemas, lowering query execution times by 22%.',
      'Created custom Python automating scripts handling excel-to-database data validation checklists with instant reporting dashboards.'
    ],
    techUsed: ['SQL', 'Power BI', 'Tableau', 'Excel', 'Python', 'Pandas']
  },
  {
    role: 'Full-Stack Portfolio Synthesizer Project',
    company: 'Academic Specialized Research',
    location: 'Chennai, India',
    duration: 'Sep 2023 — Nov 2023',
    type: 'Academic Project',
    points: [
      'Built a full-stack dashboard platform tracking multi-server network status metrics, utilizing low-latency web connections and high-contrast SVG representations.',
      'Maintained 100% strict type safety guidelines across the TypeScript codebase, designing reusable UI states with responsive media queries.',
      'Pioneered local storage cached states ensuring fast load times and keeping visual experiences smooth across sluggish network speeds.'
    ],
    techUsed: ['TypeScript', 'React', 'Tailwind CSS', 'Express', 'Vite']
  }
];

export const achievementsData = [
  'Ranked in the Top 5% of kaggle competitors in multiple global data analytics tournaments.',
  'Recipient of the SRM Technical Excellence Badge for contributions to academic machine learning research.',
  'Automated an administration parsing workflow that reduced department file processing times from 12 hours to 8 minutes.',
  'Achieved Rank 1 in the SRM inter-departmental AI Hackathon on computer vision diagnostics of agricultural disease patterns.'
];

export const defaultCertifications: Certification[] = [
  {
    title: 'IBM RAG and Agentic AI',
    issuer: 'IBM',
    issueDate: '2025-02',
    skills: 'Retrieval Augmented Generation, Agentic Workflows, LangChain, Watsonx',
    credentialUrl: 'https://www.credly.com/org/ibm',
    category: 'AI',
    isHighlighted: true
  },
  {
    title: 'Google Advanced Data Analytics',
    issuer: 'Google',
    issueDate: '2024-11',
    skills: 'Regression Analysis, Python, Statistical Hypothesis, Tableau, Predictive Analytics',
    credentialUrl: 'https://coursera.org/verify/google-advanced-data-analytics',
    category: 'Data Analytics',
    isHighlighted: true
  },
  {
    title: 'IBM Data Analyst',
    issuer: 'IBM',
    issueDate: '2024-09',
    skills: 'SQL, Python Data Analysis, Excel Charts, Cognos Dashboards, Data Ethics',
    credentialUrl: 'https://coursera.org/verify/ibm-data-analyst',
    category: 'Data Analytics',
    isHighlighted: true
  },
  {
    title: 'Google Business Intelligence',
    issuer: 'Google',
    issueDate: '2024-06',
    skills: 'BI Architecture, BigQuery, Tableau Dashboards, Visualizing KPIs, Data Modeling',
    credentialUrl: 'https://coursera.org/verify/google-business-intelligence',
    category: 'Business Intelligence',
    isHighlighted: true
  },
  {
    title: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    issueDate: '2024-03',
    skills: 'Azure Machine Learning, Cognitive Services, NLP Foundations, Anomaly Detection',
    credentialUrl: 'https://learn.microsoft.com/en-us/users/manamoybanerjee/credentials',
    category: 'Cloud',
    isHighlighted: false
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI (Coursera)',
    issueDate: '2024-08',
    skills: 'CNNs, RNNs, Sequence Models, Hyperparameter Tuning, PyTorch, TensorFlow',
    credentialUrl: 'https://coursera.org/verify/deep-learning',
    category: 'Machine Learning',
    isHighlighted: false
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI (Coursera)',
    issueDate: '2023-11',
    skills: 'Supervised Learning, Feature Engineering, Neural Network Kernels, Unsupervised Learning',
    credentialUrl: 'https://coursera.org/verify/machine-learning',
    category: 'Machine Learning',
    isHighlighted: false
  },
  {
    title: 'PostgreSQL Database Administration',
    issuer: 'Coursera',
    issueDate: '2023-04',
    skills: 'Indexing, Scaling, Row Security, Query Optimization, SQL Triggers',
    credentialUrl: 'https://coursera.org',
    category: 'Programming',
    isHighlighted: false
  }
];
