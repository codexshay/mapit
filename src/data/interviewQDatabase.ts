export interface InterviewQItem {
  id: string;
  role_slug: string;
  domain: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced' | 'scenario';
  question_type: 'concept' | 'design' | 'operations' | 'troubleshooting' | 'security' | 'measurement' | 'recovery' | 'practical';
  prompt: string;
  preferred_answer: string;
  evaluation_points: string[];
  resolution_title: string;
  resolution_url: string;
  source_tier: 'A' | 'B' | 'C';
  last_verified_at: string;
  status: 'published' | 'draft';
}

export const interviewQDatabase: InterviewQItem[] = [
  // ==========================================
  // SECTION 1: DevOps & SRE (Source-Linked Questions from DevOps Intensive Bank)
  // ==========================================
  {
    id: "DVO-001",
    role_slug: "devops-engineer",
    domain: "DevOps Principles and Delivery Performance",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "What is DevOps, and why is it not simply a job title or a collection of tools?",
    preferred_answer: "DevOps is an operating approach that joins software development and operations through shared ownership, fast feedback, automation and continuous improvement. Tools enable the approach, but the outcome is a safer and faster flow of changes from idea to production, with reliability treated as a product responsibility.",
    evaluation_points: ["Shared responsibility", "Flow and feedback", "Automation", "Measurable delivery and reliability outcomes"],
    resolution_title: "Google SRE Book - Introduction",
    resolution_url: "https://sre.google/sre-book/introduction/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-002",
    role_slug: "devops-engineer",
    domain: "DevOps Principles and Delivery Performance",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "Differentiate continuous integration, continuous delivery and continuous deployment.",
    preferred_answer: "Continuous integration means developers merge small changes frequently and validate them automatically. Continuous delivery keeps every validated change in a deployable state but may retain a manual production decision. Continuous deployment automatically releases every change that passes the defined controls.",
    evaluation_points: ["Correct separation of integration", "Deployability and automatic production release", "No claim that CD always means automatic deployment"],
    resolution_title: "DORA - Continuous Delivery Capability",
    resolution_url: "https://dora.dev/capabilities/continuous-delivery/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-003",
    role_slug: "devops-engineer",
    domain: "DevOps Principles and Delivery Performance",
    difficulty: "intermediate",
    question_type: "measurement",
    prompt: "Which delivery metrics should a DevOps team track, and what does each reveal?",
    preferred_answer: "A strong answer covers deployment frequency, change lead time, change failure rate, failed deployment recovery time and deployment rework rate. Together they reveal throughput, speed, instability, recovery capability and the amount of avoidable repair work. They should be used for system improvement, not individual ranking.",
    evaluation_points: ["Names current DORA measures", "Connects each metric to a behaviour", "Warns against weaponising metrics"],
    resolution_title: "DORA - Software Delivery Performance Metrics",
    resolution_url: "https://dora.dev/guides/dora-metrics/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-004",
    role_slug: "devops-engineer",
    domain: "DevOps Principles and Delivery Performance",
    difficulty: "intermediate",
    question_type: "design",
    prompt: "Why do small batch sizes usually improve software delivery?",
    preferred_answer: "Smaller changes reduce review scope, merge risk and the number of variables involved when something fails. They produce faster feedback, make rollback or fix-forward easier and help teams release more frequently without necessarily increasing risk. Small batches require good test automation and deployment discipline.",
    evaluation_points: ["Reduced risk and diagnostic scope", "Faster feedback", "Easier recovery", "Recognises enabling practices"],
    resolution_title: "DORA - Continuous Delivery Capability",
    resolution_url: "https://dora.dev/capabilities/continuous-delivery/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-005",
    role_slug: "devops-engineer",
    domain: "DevOps Principles and Delivery Performance",
    difficulty: "intermediate",
    question_type: "concept",
    prompt: "What is infrastructure as code, and what operational problems does it solve?",
    preferred_answer: "Infrastructure as code expresses desired infrastructure in versioned, reviewable definitions rather than relying on undocumented manual changes. It improves repeatability, auditability, peer review, environment consistency and disaster recovery. It does not remove the need for testing, state protection or change controls.",
    evaluation_points: ["Versioning and repeatability", "Review/audit", "Drift reduction", "Realistic limitations"],
    resolution_title: "HashiCorp Terraform Docs - State",
    resolution_url: "https://developer.hashicorp.com/terraform/language/state",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-006",
    role_slug: "devops-engineer",
    domain: "DevOps Principles and Delivery Performance",
    difficulty: "advanced",
    question_type: "concept",
    prompt: "How does an error budget help balance release velocity and reliability?",
    preferred_answer: "An error budget is the amount of unreliability permitted by an agreed service level objective. When the service is comfortably within budget, the team can take more delivery risk; when the budget is exhausted, reliability work and tighter change controls take priority. It converts a subjective argument into a shared product decision.",
    evaluation_points: ["Links error budget to SLO", "Explains decision use", "Avoids treating it as target for downtime"],
    resolution_title: "Google SRE Book - Embracing Risk",
    resolution_url: "https://sre.google/sre-book/embracing-risk/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-007",
    role_slug: "devops-engineer",
    domain: "DevOps Principles and Delivery Performance",
    difficulty: "advanced",
    question_type: "operations",
    prompt: "What is toil in SRE, and how should a team decide what to automate?",
    preferred_answer: "Toil is repetitive, manual, operational work that is automatable, tactical, has little enduring value and tends to grow with service scale. Teams should measure recurring effort, prioritise high-frequency or high-risk tasks and automate where the lifecycle benefit exceeds the build and maintenance cost. Not every manual task is toil.",
    evaluation_points: ["Accurate definition", "Prioritisation by frequency/risk/value", "Recognises automation cost"],
    resolution_title: "Google SRE Book - Eliminating Toil",
    resolution_url: "https://sre.google/sre-book/eliminating-toil/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-008",
    role_slug: "devops-engineer",
    domain: "DevOps Principles and Delivery Performance",
    difficulty: "scenario",
    question_type: "recovery",
    prompt: "A team deploys once a month, changes often fail, and recovery takes hours. What improvement sequence would you propose?",
    preferred_answer: "First map the delivery value stream and establish trustworthy baseline metrics. Reduce batch size, add fast automated tests and reproducible builds, standardise environments, introduce progressive delivery and create a tested rollback or fix-forward path. Improve observability and post-incident learning before trying to increase deployment frequency aggressively.",
    evaluation_points: ["Baseline first", "Bottleneck-oriented sequence", "Testing and reproducibility", "Safe release and recovery"],
    resolution_title: "DORA - Value Stream Mapping for Software Delivery",
    resolution_url: "https://dora.dev/guides/value-stream-management/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // ==========================================
  // SECTION 2: 15 PRACTICAL ASSESSMENT LABS (FROM DEVOPS INTENSIVE BANK)
  // ==========================================
  {
    id: "LAB-001",
    role_slug: "devops-engineer",
    domain: "DevOps Principles and Delivery Performance",
    difficulty: "scenario",
    question_type: "practical",
    prompt: "LAB-01 [PRACTICAL ASSESSMENT]: Delivery metrics baseline calculation and experiment proposal.",
    preferred_answer: "Calculate deployment frequency, change lead time, change failure rate and failed deployment recovery time from a supplied month of deployment records. Explain one limitation in each measure and recommend one bottleneck improvement experiment.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity.",
    evaluation_points: ["One-page metric sheet with definitions", "Calculations and assumptions", "Bottleneck-linked experiment proposal"],
    resolution_title: "DORA - Software Delivery Performance Metrics",
    resolution_url: "https://dora.dev/guides/dora-metrics/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "LAB-002",
    role_slug: "devops-engineer",
    domain: "Linux Administration and Shell Automation",
    difficulty: "scenario",
    question_type: "practical",
    prompt: "LAB-02 [PRACTICAL ASSESSMENT]: Linux service boot-time failure diagnosis and systemd recovery.",
    preferred_answer: "Create a systemd service for a simple application, intentionally break its environment variables or permissions, then diagnose the boot-time failure using status and journal evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity.",
    evaluation_points: ["Corrected systemd unit file", "Command transcript & journalctl logs", "Root-cause statement", "Safe restart validation"],
    resolution_title: "Red Hat Enterprise Linux - Working with systemd Unit Files",
    resolution_url: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/using_systemd_unit_files_to_customize_and_optimize_your_system/assembly_working-with-systemd-unit-files_working-with-systemd",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "LAB-003",
    role_slug: "devops-engineer",
    domain: "Networking, DNS, HTTP and TLS",
    difficulty: "scenario",
    question_type: "practical",
    prompt: "LAB-03 [PRACTICAL ASSESSMENT]: DNS and TLS end-to-end connectivity diagnosis.",
    preferred_answer: "Trace a request from DNS resolution through TCP connection and TLS certificate verification. Introduce one wrong DNS record or hostname mismatch and document the layer-by-layer evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity.",
    evaluation_points: ["Layer-by-layer diagnostic record", "Failure confirmation point", "Certificate verification evidence"],
    resolution_title: "MDN Web Docs - Transport Layer Security",
    resolution_url: "https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "LAB-004",
    role_slug: "devops-engineer",
    domain: "Git and Collaborative Version Control",
    difficulty: "scenario",
    question_type: "practical",
    prompt: "LAB-04 [PRACTICAL ASSESSMENT]: Git regression recovery with bisect and safe revert.",
    preferred_answer: "Create a repository with a known-good commit, introduce a regression, identify it using git bisect, and produce a safe revert on a shared branch.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity.",
    evaluation_points: ["Commit graph", "Bisect automated log", "Identified bad commit hash", "Revert commit & test evidence"],
    resolution_title: "Git Documentation - git bisect",
    resolution_url: "https://git-scm.com/docs/git-bisect",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "LAB-005",
    role_slug: "devops-engineer",
    domain: "CI/CD Architecture and Release Strategies",
    difficulty: "scenario",
    question_type: "practical",
    prompt: "LAB-05 [PRACTICAL ASSESSMENT]: Production-ready release strategy design.",
    preferred_answer: "Design a deployment pipeline for a customer-facing API using build-once promotion, automated quality gates and either blue-green or canary release.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity.",
    evaluation_points: ["Pipeline architecture diagram", "Artefact identity tracking", "Automated gate criteria", "Rollback/fix-forward decision tree"],
    resolution_title: "Argo Rollouts Docs - Concepts",
    resolution_url: "https://argo-rollouts.readthedocs.io/en/stable/concepts/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // ==========================================
  // SECTION 3: FRONTEND DEVELOPER QUESTIONS & LABS
  // ==========================================
  {
    id: "FED-001",
    role_slug: "frontend-developer",
    domain: "Modern JavaScript & Web Performance",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "What is Event Delegation in JavaScript and why is it beneficial for performance?",
    preferred_answer: "Event delegation is a pattern where a single event listener is attached to a parent element to manage events for multiple child elements using event bubbling. Instead of adding listeners to 1,000 table rows or list items, one listener handles target element events, reducing memory consumption and avoiding listener re-attachment when dynamic children are added.",
    evaluation_points: ["Event bubbling mechanism", "Memory reduction", "Handling dynamic DOM insertions", "event.target vs event.currentTarget"],
    resolution_title: "MDN Web Docs - Event Delegation",
    resolution_url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "FED-002",
    role_slug: "frontend-developer",
    domain: "Modern JavaScript & Web Performance",
    difficulty: "intermediate",
    question_type: "troubleshooting",
    prompt: "How do you optimize Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS)?",
    preferred_answer: "To optimize LCP (target <2.5s), pre-load critical images/hero elements using `<link rel='preload'>`, use modern formats (WebP/AVIF), optimize server response time (TTFB), and avoid client-side rendering delays for hero content. To eliminate CLS (target <0.1), define explicit width/height on images and video containers, reserve space for ads/dynamic slots, and avoid inserting layout-shifting DOM content above existing content without user interaction.",
    evaluation_points: ["Image preloading & sizes attribute", "Explicit dimensions for aspect-ratio preservation", "Font display swap strategy", "Avoiding render-blocking resources"],
    resolution_title: "web.dev - Optimize LCP & CLS",
    resolution_url: "https://web.dev/optimize-lcp/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // ==========================================
  // SECTION 4: BACKEND DEVELOPER QUESTIONS & LABS
  // ==========================================
  {
    id: "BED-001",
    role_slug: "backend-developer",
    domain: "Database Architecture & Performance",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "What is Database Indexing, how does a B-Tree index work, and what are its trade-offs?",
    preferred_answer: "Indexing creates a sorted auxiliary data structure (typically a B+ Tree) that allows O(log N) lookups instead of sequential full-table scans O(N). The trade-off is increased write latency (INSERT/UPDATE/DELETE require index updates) and extra disk storage overhead. Indexes should be created based on query execution plans (WHERE, JOIN, ORDER BY).",
    evaluation_points: ["B-Tree logarithmic search complexity", "Table scan comparison", "Write performance penalty", "Composite index column ordering"],
    resolution_title: "PostgreSQL Docs - Indexes",
    resolution_url: "https://www.postgresql.org/docs/current/indexes.html",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "BED-002",
    role_slug: "backend-developer",
    domain: "API Architecture & Security",
    difficulty: "intermediate",
    question_type: "design",
    prompt: "How do REST, gRPC, and GraphQL compare for microservice communication?",
    preferred_answer: "REST uses HTTP/1.1 with JSON/XML, suitable for external web APIs, but has payload bloat and over/under-fetching. gRPC uses HTTP/2 with Protocol Buffers, offering high-throughput binary serialization, strict contract schemas, and bidirectional streaming ideal for internal inter-service microservices. GraphQL enables clients to request exact fields in a single query, reducing network calls for mobile/web clients.",
    evaluation_points: ["HTTP/1.1 vs HTTP/2 multiplexing", "JSON vs Protobuf binary payloads", "Over-fetching vs schema validation", "Use case recommendation"],
    resolution_title: "gRPC Documentation - Core Concepts",
    resolution_url: "https://grpc.io/docs/what-is-grpc/core-concepts/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // ==========================================
  // SECTION 5: CYBERSECURITY ANALYST QUESTIONS
  // ==========================================
  {
    id: "SEC-001",
    role_slug: "cybersecurity-analyst",
    domain: "Security Architecture & Zero Trust",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "Explain the core philosophy and pillars of Zero Trust Architecture (ZTA).",
    preferred_answer: "Zero Trust operates on the principle 'Never Trust, Always Verify'. It assumes that attackers exist both outside and inside the network perimeter. Key pillars include: explicit identity verification (MFA, RBAC), least-privilege access, micro-segmentation of networks, continuous session monitoring, and assuming breach.",
    evaluation_points: ["Never Trust, Always Verify principle", "Least-privilege access", "Micro-segmentation", "Continuous identity verification"],
    resolution_title: "NIST Special Publication 800-207 - Zero Trust Architecture",
    resolution_url: "https://csrc.nist.gov/publications/detail/sp/800-207/final",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // ==========================================
  // SECTION 6: PROMPT ENGINEER & AI ARCHITECT
  // ==========================================
  {
    id: "AI-001",
    role_slug: "prompt-engineer",
    domain: "Generative AI & LLM Systems",
    difficulty: "intermediate",
    question_type: "concept",
    prompt: "What is Retrieval-Augmented Generation (RAG) and how does it prevent LLM hallucination?",
    preferred_answer: "RAG combines non-parametric search retrieval with parametric generative language models. Instead of relying solely on pre-trained weights, RAG converts domain documents into vector embeddings stored in a vector database. When a prompt is submitted, semantic search retrieves relevant document chunks and embeds them as authoritative context in the LLM prompt.",
    evaluation_points: ["Vector embeddings & semantic search", "Combining context with generation", "Mitigating outdated knowledge & hallucinations", "Chunking & top-k retrieval parameters"],
    resolution_title: "AWS AI - What is RAG?",
    resolution_url: "https://aws.amazon.com/what-is/retrieval-augmented-generation/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  }
];
