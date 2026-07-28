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
  {
  "id": "DVO-001",
  "role_slug": "devops-engineer",
  "domain": "DevOps Principles and Delivery Performance",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What is DevOps, and why is it not simply a job title or a collection of tools?",
  "preferred_answer": "DevOps is an operating approach that joins software development and operations through shared ownership, fast feedback, automation and continuous improvement. Tools enable the approach, but the outcome is a safer and faster flow of changes from idea to production, with reliability treated as a product responsibility.",
  "evaluation_points": [
    "Shared responsibility",
    "Flow and feedback",
    "Automation",
    "Measurable delivery and reliability outcomes"
  ],
  "resolution_title": "Google SRE Book - Introduction",
  "resolution_url": "https://sre.google/sre-book/introduction/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-002",
  "role_slug": "devops-engineer",
  "domain": "DevOps Principles and Delivery Performance",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "Differentiate continuous integration, continuous delivery and continuous deployment.",
  "preferred_answer": "Continuous integration means developers merge small changes frequently and validate them automatically. Continuous delivery keeps every validated change in a deployable state but may retain a manual production decision. Continuous deployment automatically releases every change that passes the defined controls.",
  "evaluation_points": [
    "Correct separation of integration",
    "Deployability and automatic production release",
    "No claim that CD always means automatic deployment"
  ],
  "resolution_title": "DORA - Continuous Delivery Capability",
  "resolution_url": "https://dora.dev/capabilities/continuous-delivery/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-003",
  "role_slug": "devops-engineer",
  "domain": "DevOps Principles and Delivery Performance",
  "difficulty": "intermediate",
  "question_type": "measurement",
  "prompt": "Which delivery metrics should a DevOps team track, and what does each reveal?",
  "preferred_answer": "A strong answer covers deployment frequency, change lead time, change failure rate, failed deployment recovery time and deployment rework rate. Together they reveal throughput, speed, instability, recovery capability and the amount of avoidable repair work. They should be used for system improvement, not individual ranking.",
  "evaluation_points": [
    "Names the current DORA measures",
    "Connects each metric to a behaviour",
    "Warns against weaponising metrics"
  ],
  "resolution_title": "DORA - Software Delivery Performance Metrics",
  "resolution_url": "https://dora.dev/guides/dora-metrics/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-004",
  "role_slug": "devops-engineer",
  "domain": "DevOps Principles and Delivery Performance",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "Why do small batch sizes usually improve software delivery?",
  "preferred_answer": "Smaller changes reduce review scope, merge risk and the number of variables involved when something fails. They produce faster feedback, make rollback or fix-forward easier and help teams release more frequently without necessarily increasing risk. Small batches require good test automation and deployment discipline.",
  "evaluation_points": [
    "Reduced risk and diagnostic scope",
    "Faster feedback",
    "Easier recovery",
    "Recognises enabling practices"
  ],
  "resolution_title": "DORA - Continuous Delivery Capability",
  "resolution_url": "https://dora.dev/capabilities/continuous-delivery/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-005",
  "role_slug": "devops-engineer",
  "domain": "DevOps Principles and Delivery Performance",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "What is infrastructure as code, and what operational problems does it solve?",
  "preferred_answer": "Infrastructure as code expresses desired infrastructure in versioned, reviewable definitions rather than relying on undocumented manual changes. It improves repeatability, auditability, peer review, environment consistency and disaster recovery. It does not remove the need for testing, state protection or change controls.",
  "evaluation_points": [
    "Versioning and repeatability",
    "Review/audit",
    "Drift reduction",
    "Realistic limitations"
  ],
  "resolution_title": "HashiCorp Terraform Docs - State",
  "resolution_url": "https://developer.hashicorp.com/terraform/language/state",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-006",
  "role_slug": "devops-engineer",
  "domain": "DevOps Principles and Delivery Performance",
  "difficulty": "advanced",
  "question_type": "concept",
  "prompt": "How does an error budget help balance release velocity and reliability?",
  "preferred_answer": "An error budget is the amount of unreliability permitted by an agreed service level objective. When the service is comfortably within budget, the team can take more delivery risk; when the budget is exhausted, reliability work and tighter change controls take priority. It converts a subjective argument into a shared product decision.",
  "evaluation_points": [
    "Links error budget to SLO",
    "Explains decision use",
    "Avoids treating it as target for downtime"
  ],
  "resolution_title": "Google SRE Book - Embracing Risk",
  "resolution_url": "https://sre.google/sre-book/embracing-risk/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-007",
  "role_slug": "devops-engineer",
  "domain": "DevOps Principles and Delivery Performance",
  "difficulty": "advanced",
  "question_type": "operations",
  "prompt": "What is toil in SRE, and how should a team decide what to automate?",
  "preferred_answer": "Toil is repetitive, manual, operational work that is automatable, tactical, has little enduring value and tends to grow with service scale. Teams should measure recurring effort, prioritise high-frequency or high-risk tasks and automate where the lifecycle benefit exceeds the build and maintenance cost. Not every manual task is toil.",
  "evaluation_points": [
    "Accurate definition",
    "Prioritisation by frequency/risk/value",
    "Recognises automation cost"
  ],
  "resolution_title": "Google SRE Book - Eliminating Toil",
  "resolution_url": "https://sre.google/sre-book/eliminating-toil/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-008",
  "role_slug": "devops-engineer",
  "domain": "DevOps Principles and Delivery Performance",
  "difficulty": "scenario",
  "question_type": "recovery",
  "prompt": "A team deploys once a month, changes often fail, and recovery takes hours. What improvement sequence would you propose?",
  "preferred_answer": "First map the delivery value stream and establish trustworthy baseline metrics. Reduce batch size, add fast automated tests and reproducible builds, standardise environments, introduce progressive delivery and create a tested rollback or fix-forward path. Improve observability and post-incident learning before trying to increase deployment frequency aggressively.",
  "evaluation_points": [
    "Baseline first",
    "Bottleneck-oriented sequence",
    "Testing and reproducibility",
    "Safe release and recovery"
  ],
  "resolution_title": "DORA - Value Stream Mapping for Software Delivery",
  "resolution_url": "https://dora.dev/guides/value-stream-management/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-009",
  "role_slug": "devops-engineer",
  "domain": "Linux Administration and Shell Automation",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What is the practical difference between a process and a thread?",
  "preferred_answer": "A process has its own virtual address space and operating-system resources, while threads within a process share most of that process memory and resources. Threads are lighter to create and communicate through shared memory, but a fault or unsafe shared-state change can affect the whole process.",
  "evaluation_points": [
    "Separate process address spaces",
    "Shared thread resources",
    "Performance and isolation trade-off"
  ],
  "resolution_title": "Linux man-pages - proc(5)",
  "resolution_url": "https://man7.org/linux/man-pages/man5/proc.5.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-010",
  "role_slug": "devops-engineer",
  "domain": "Linux Administration and Shell Automation",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "Why should a Linux service be managed by systemd instead of starting its daemon manually?",
  "preferred_answer": "systemd provides a declared unit, dependency ordering, controlled startup and shutdown, restart policy, status tracking and centralised logs. A daemon launched manually may not be known to systemd, so service status, restart and boot-time behaviour become unreliable or inconsistent.",
  "evaluation_points": [
    "Lifecycle supervision",
    "Dependencies and restart",
    "Boot persistence",
    "Status/log integration"
  ],
  "resolution_title": "Red Hat Enterprise Linux - Managing systemd",
  "resolution_url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/managing-systemd_configuring-basic-system-settings",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-011",
  "role_slug": "devops-engineer",
  "domain": "Linux Administration and Shell Automation",
  "difficulty": "intermediate",
  "question_type": "operations",
  "prompt": "Explain the meaning of file modes 644 and 755.",
  "preferred_answer": "Mode 644 gives the owner read and write permissions, while group and others receive read only. Mode 755 gives the owner read, write and execute, while group and others receive read and execute. Directory execute permission controls traversal, so the effect differs from an ordinary file.",
  "evaluation_points": [
    "Correct owner/group/other mapping",
    "Octal interpretation",
    "Directory traversal nuance"
  ],
  "resolution_title": "Red Hat Enterprise Linux - Managing File System Permissions",
  "resolution_url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/managing-file-system-permissions_configuring-basic-system-settings",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-012",
  "role_slug": "devops-engineer",
  "domain": "Linux Administration and Shell Automation",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "How do hard links and symbolic links differ?",
  "preferred_answer": "A hard link is another directory entry for the same inode and normally cannot cross filesystems or link directories. A symbolic link stores a path to another object, can cross filesystems and can become dangling if the target moves or disappears. Deleting one hard-link name does not remove the data while another link remains.",
  "evaluation_points": [
    "Inode versus path",
    "Filesystem limitation",
    "Dangling symlink",
    "Deletion behaviour"
  ],
  "resolution_title": "Red Hat Enterprise Linux - Managing File System Permissions",
  "resolution_url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/managing-file-system-permissions_configuring-basic-system-settings",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-013",
  "role_slug": "devops-engineer",
  "domain": "Linux Administration and Shell Automation",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "A host has high load average. What would you inspect before adding CPU?",
  "preferred_answer": "Confirm whether the load is CPU pressure, runnable tasks or uninterruptible I/O wait. Inspect CPU utilisation, run queue, memory and swap pressure, disk latency, blocked processes, recent deployments and application-level saturation. High load alone does not prove CPU shortage.",
  "evaluation_points": [
    "Separates CPU from I/O and blocked tasks",
    "Checks memory/disk/processes",
    "Correlates with change history"
  ],
  "resolution_title": "Linux man-pages - proc(5)",
  "resolution_url": "https://man7.org/linux/man-pages/man5/proc.5.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-014",
  "role_slug": "devops-engineer",
  "domain": "Linux Administration and Shell Automation",
  "difficulty": "advanced",
  "question_type": "troubleshooting",
  "prompt": "The filesystem is full according to df, but du cannot account for the used space. What is a likely cause?",
  "preferred_answer": "A common cause is a large file that was deleted from the directory tree but is still open by a running process. The blocks remain allocated until the process closes the file or restarts. Check open deleted files, confirm the owning process, then rotate or restart safely rather than deleting more files blindly.",
  "evaluation_points": [
    "Identifies deleted-but-open file",
    "Explains block retention",
    "Proposes safe verification and remediation"
  ],
  "resolution_title": "Red Hat Enterprise Linux - Troubleshooting with Log Files",
  "resolution_url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/assembly_troubleshooting-problems-using-log-files_configuring-basic-system-settings",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-015",
  "role_slug": "devops-engineer",
  "domain": "Linux Administration and Shell Automation",
  "difficulty": "advanced",
  "question_type": "operations",
  "prompt": "When should SIGTERM be used instead of SIGKILL?",
  "preferred_answer": "SIGTERM requests graceful termination and allows an application to flush buffers, close connections and release resources. SIGKILL cannot be caught or handled and should be a last resort when the process cannot terminate normally. A production stop procedure should allow a bounded grace period before escalation.",
  "evaluation_points": [
    "Graceful handling versus forced termination",
    "Data/connection implications",
    "Bounded escalation"
  ],
  "resolution_title": "Linux man-pages - signal(7)",
  "resolution_url": "https://man7.org/linux/man-pages/man7/signal.7.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "DVO-016",
  "role_slug": "devops-engineer",
  "domain": "Linux Administration and Shell Automation",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "A custom service runs when started manually but fails after reboot. How would you diagnose it?",
  "preferred_answer": "Inspect the systemd unit, status and journal for the boot attempt. Verify the executable path, user, working directory, environment variables, file permissions, dependencies and network readiness; then use explicit unit directives rather than shell-profile assumptions. Reload units, enable the service and retest through a controlled reboot.",
  "evaluation_points": [
    "Uses systemctl/journalctl",
    "Checks environment and permissions",
    "Dependencies/order",
    "Daemon reload and enable"
  ],
  "resolution_title": "Red Hat Enterprise Linux - Working with systemd Unit Files",
  "resolution_url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/using_systemd_unit_files_to_customize_and_optimize_your_system/assembly_working-with-systemd-unit-files_working-with-systemd",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-001",
  "role_slug": "devops-engineer",
  "domain": "DevOps Principles and Delivery Performance",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-01 [PRACTICAL ASSESSMENT]: Delivery metrics baseline calculation and experiment proposal.",
  "preferred_answer": "Calculate deployment frequency, change lead time, change failure rate and failed deployment recovery time from a supplied month of deployment records. Explain one limitation in each measure and recommend one bottleneck improvement experiment.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity.",
  "evaluation_points": [
    "One-page metric sheet with definitions",
    "Calculations and assumptions",
    "Bottleneck-linked experiment proposal"
  ],
  "resolution_title": "DORA - Software Delivery Performance Metrics",
  "resolution_url": "https://dora.dev/guides/dora-metrics/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-002",
  "role_slug": "devops-engineer",
  "domain": "Linux Administration and Shell Automation",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-02 [PRACTICAL ASSESSMENT]: Linux service boot-time failure diagnosis and systemd recovery.",
  "preferred_answer": "Create a systemd service for a simple application, intentionally break its environment variables or permissions, then diagnose the boot-time failure using status and journal evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity.",
  "evaluation_points": [
    "Corrected systemd unit file",
    "Command transcript & journalctl logs",
    "Root-cause statement",
    "Safe restart validation"
  ],
  "resolution_title": "Red Hat Enterprise Linux - Working with systemd Unit Files",
  "resolution_url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/using_systemd_unit_files_to_customize_and_optimize_your_system/assembly_working-with-systemd-unit-files_working-with-systemd",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-003",
  "role_slug": "devops-engineer",
  "domain": "Networking, DNS, HTTP and TLS",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-03 [PRACTICAL ASSESSMENT]: DNS and TLS end-to-end connectivity diagnosis.",
  "preferred_answer": "Trace a request from DNS resolution through TCP connection and TLS certificate verification. Introduce one wrong DNS record or hostname mismatch and document the layer-by-layer evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity.",
  "evaluation_points": [
    "Layer-by-layer diagnostic record",
    "Failure confirmation point",
    "Certificate verification evidence"
  ],
  "resolution_title": "MDN Web Docs - Transport Layer Security",
  "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-004",
  "role_slug": "devops-engineer",
  "domain": "Git and Collaborative Version Control",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-04 [PRACTICAL ASSESSMENT]: Git regression recovery with bisect and safe revert.",
  "preferred_answer": "Create a repository with a known-good commit, introduce a regression, identify it using git bisect, and produce a safe revert on a shared branch.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity.",
  "evaluation_points": [
    "Commit graph",
    "Bisect automated log",
    "Identified bad commit hash",
    "Revert commit & test evidence"
  ],
  "resolution_title": "Git Documentation - git bisect",
  "resolution_url": "https://git-scm.com/docs/git-bisect",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-005",
  "role_slug": "devops-engineer",
  "domain": "CI/CD Architecture and Release Strategies",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-05 [PRACTICAL ASSESSMENT]: Production-ready release strategy design.",
  "preferred_answer": "Design a deployment pipeline for a customer-facing API using build-once promotion, automated quality gates and either blue-green or canary release.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity.",
  "evaluation_points": [
    "Pipeline architecture diagram",
    "Artefact identity tracking",
    "Automated gate criteria",
    "Rollback/fix-forward decision tree"
  ],
  "resolution_title": "Argo Rollouts Docs - Concepts",
  "resolution_url": "https://argo-rollouts.readthedocs.io/en/stable/concepts/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "FED-001",
  "role_slug": "frontend-developer",
  "domain": "Modern JavaScript & Web Performance",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What is Event Delegation in JavaScript and why is it beneficial for performance?",
  "preferred_answer": "Event delegation is a pattern where a single event listener is attached to a parent element to manage events for multiple child elements using event bubbling. Instead of adding listeners to 1,000 table rows or list items, one listener handles target element events, reducing memory consumption and avoiding listener re-attachment when dynamic children are added.",
  "evaluation_points": [
    "Event bubbling mechanism",
    "Memory reduction",
    "Handling dynamic DOM insertions",
    "event.target vs event.currentTarget"
  ],
  "resolution_title": "MDN Web Docs - Event Delegation",
  "resolution_url": "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "SEC-001",
  "role_slug": "cybersecurity-analyst",
  "domain": "Security Architecture & Zero Trust",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "Explain the core philosophy and pillars of Zero Trust Architecture (ZTA).",
  "preferred_answer": "Zero Trust operates on the principle 'Never Trust, Always Verify'. It assumes that attackers exist both outside and inside the network perimeter. Key pillars include: explicit identity verification (MFA, RBAC), least-privilege access, micro-segmentation of networks, continuous session monitoring, and assuming breach.",
  "evaluation_points": [
    "Never Trust, Always Verify principle",
    "Least-privilege access",
    "Micro-segmentation",
    "Continuous identity verification"
  ],
  "resolution_title": "NIST Special Publication 800-207 - Zero Trust Architecture",
  "resolution_url": "https://csrc.nist.gov/publications/detail/sp/800-207/final",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "AI-001",
  "role_slug": "prompt-engineer",
  "domain": "Generative AI & LLM Systems",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "What is Retrieval-Augmented Generation (RAG) and how does it prevent LLM hallucination?",
  "preferred_answer": "RAG combines non-parametric search retrieval with parametric generative language models. Instead of relying solely on pre-trained weights, RAG converts domain documents into vector embeddings stored in a vector database. When a prompt is submitted, semantic search retrieves relevant document chunks and embeds them as authoritative context in the LLM prompt.",
  "evaluation_points": [
    "Vector embeddings & semantic search",
    "Combining context with generation",
    "Mitigating outdated knowledge & hallucinations",
    "Chunking & top-k retrieval parameters"
  ],
  "resolution_title": "AWS AI - What is RAG?",
  "resolution_url": "https://aws.amazon.com/what-is/retrieval-augmented-generation/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-001",
  "role_slug": "backend-developer",
  "domain": "Backend Foundations and Request Lifecycle",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What responsibilities normally belong to a backend developer?",
  "preferred_answer": "A backend developer implements server-side business rules, exposes interfaces such as HTTP or RPC APIs, manages persistence and integrations, protects data and identities, and makes services testable, observable and operable. The role is broader than writing database queries: it includes defining contracts, handling failures, maintaining compatibility and reasoning about production behaviour.",
  "evaluation_points": [
    "Server-side business logic",
    "APIs",
    "data persistence",
    "security",
    "integration",
    "testing and production ownership."
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Web API design",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-002",
  "role_slug": "backend-developer",
  "domain": "Backend Foundations and Request Lifecycle",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "Describe the lifecycle of a typical HTTP request inside a backend application.",
  "preferred_answer": "The server accepts a connection, parses the HTTP request, applies cross-cutting middleware such as correlation, authentication and limits, routes the request to a handler, validates input, executes application and domain logic, accesses dependencies, commits or rolls back state, serialises a response and records telemetry. The exact order matters because authentication, error handling and transaction boundaries can change correctness.",
  "evaluation_points": [
    "Connection and parsing",
    "middleware order",
    "routing",
    "validation",
    "domain work",
    "persistence",
    "serialisation",
    "telemetry."
  ],
  "resolution_title": "RFC 9110 - HTTP Semantics",
  "resolution_url": "https://www.rfc-editor.org/rfc/rfc9110.html",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-003",
  "role_slug": "backend-developer",
  "domain": "Backend Foundations and Request Lifecycle",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "Why separate transport, application, domain and infrastructure concerns?",
  "preferred_answer": "Separation prevents HTTP, database and vendor details from dominating business rules. Transport code translates requests, application services coordinate use cases, domain code enforces business invariants, and infrastructure adapters perform external I/O. This improves testability and allows a dependency or delivery mechanism to change without rewriting the core behaviour, while avoiding unnecessary abstraction for very small services.",
  "evaluation_points": [
    "Clear boundaries",
    "dependency direction",
    "testability",
    "replaceable infrastructure",
    "avoids over-engineering."
  ],
  "resolution_title": "Spring Framework - Dependency Injection",
  "resolution_url": "https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-004",
  "role_slug": "backend-developer",
  "domain": "Backend Foundations and Request Lifecycle",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What is dependency injection, and what problem does it solve in backend systems?",
  "preferred_answer": "Dependency injection supplies an object with its collaborators instead of letting it construct or locate them globally. It makes dependencies explicit, supports controlled lifetimes, reduces coupling and enables tests to substitute fakes. It does not remove complexity; poor registration, service-locator usage or injecting too many dependencies can still signal weak design.",
  "evaluation_points": [
    "Explicit dependencies",
    "inversion of control",
    "lifecycle management",
    "testing",
    "recognises misuse risks."
  ],
  "resolution_title": "Spring Framework - Dependency Injection",
  "resolution_url": "https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-005",
  "role_slug": "backend-developer",
  "domain": "Backend Foundations and Request Lifecycle",
  "difficulty": "intermediate",
  "question_type": "operations",
  "prompt": "How should application configuration and secrets be handled across environments?",
  "preferred_answer": "Keep deploy-varying configuration outside the code and immutable build artefact. Validate required values at startup, use typed configuration where possible, store secrets in a dedicated secret manager, grant least-privilege access and rotate credentials. Do not commit secrets, log them or expose them through diagnostics. Environment variables are common, but they still require secure delivery and governance.",
  "evaluation_points": [
    "External configuration",
    "startup validation",
    "secret manager",
    "least privilege",
    "rotation",
    "no logging or source control."
  ],
  "resolution_title": "The Twelve-Factor App",
  "resolution_url": "https://12factor.net/",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-006",
  "role_slug": "backend-developer",
  "domain": "Backend Foundations and Request Lifecycle",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "When is a modular monolith preferable to microservices?",
  "preferred_answer": "A modular monolith is often preferable when the domain and team boundaries are still evolving, the workload can scale as one unit and operational simplicity matters. Strong internal modules can preserve ownership and dependency rules without network calls, distributed transactions and multiple deployment pipelines. Microservices become attractive when independently deployable boundaries, isolation or scaling needs justify the operational cost.",
  "evaluation_points": [
    "Team and domain maturity",
    "operational cost",
    "independent deployment or scaling",
    "strong module boundaries."
  ],
  "resolution_title": "Azure Architecture Center - Cloud Design Patterns",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/patterns/",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-007",
  "role_slug": "backend-developer",
  "domain": "Backend Foundations and Request Lifecycle",
  "difficulty": "advanced",
  "question_type": "concept",
  "prompt": "How do you evolve a backend contract without breaking existing consumers?",
  "preferred_answer": "Prefer additive changes, tolerant readers and explicit deprecation windows. Preserve existing field meaning, distinguish omitted and null values, keep old behaviour until usage data supports removal, publish machine-readable contracts and test known consumers. For unavoidable breaks, introduce a new media type, endpoint or version and provide migration guidance rather than silently changing semantics.",
  "evaluation_points": [
    "Additive evolution",
    "semantic stability",
    "deprecation evidence",
    "contract tests",
    "explicit version only for real breaks."
  ],
  "resolution_title": "OpenAPI Specification",
  "resolution_url": "https://spec.openapis.org/oas/latest.html",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-008",
  "role_slug": "backend-developer",
  "domain": "Backend Foundations and Request Lifecycle",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "A request succeeds locally but returns intermittent 500 errors in production. What is your investigation sequence?",
  "preferred_answer": "Start with a correlation or trace identifier and determine the failing endpoint, deployment version and affected cohort. Compare logs, traces, metrics and dependency errors; verify configuration and data differences; reproduce with production-like inputs; inspect recent changes; and test a reversible mitigation such as rollback or feature disablement. Preserve evidence before restarting components and avoid guessing from a single log line.",
  "evaluation_points": [
    "Scope and correlation",
    "telemetry triangulation",
    "environment and data differences",
    "recent changes",
    "safe mitigation",
    "evidence preservation."
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-009",
  "role_slug": "backend-developer",
  "domain": "HTTP Semantics, Headers and Caching",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What do safe and idempotent mean for HTTP methods?",
  "preferred_answer": "A safe method is intended only to retrieve or observe state, while an idempotent method has the same intended server-side effect whether performed once or repeatedly. GET and HEAD are safe and idempotent; PUT and DELETE are idempotent but not safe; POST is generally neither. Real implementations must still prevent incidental effects such as duplicate billing when clients retry.",
  "evaluation_points": [
    "Correct distinction",
    "examples",
    "intended semantics rather than transport guarantee",
    "retry implications."
  ],
  "resolution_title": "MDN - HTTP request methods",
  "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-010",
  "role_slug": "backend-developer",
  "domain": "HTTP Semantics, Headers and Caching",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "How should a backend choose between 400, 401, 403, 404, 409 and 422?",
  "preferred_answer": "Use 400 for malformed or invalid request syntax, 401 when valid authentication credentials are required, 403 when the authenticated principal is not permitted, 404 when the resource is not found or intentionally concealed, 409 for a conflict with current resource state, and 422 when well-formed content fails semantic validation. Consistency and a useful problem body matter as much as the exact code.",
  "evaluation_points": [
    "Accurate meanings",
    "authentication versus authorisation",
    "conflict versus validation",
    "consistent error body."
  ],
  "resolution_title": "MDN - HTTP response status codes",
  "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-011",
  "role_slug": "backend-developer",
  "domain": "HTTP Semantics, Headers and Caching",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "What is content negotiation, and which headers commonly participate?",
  "preferred_answer": "Content negotiation lets client and server select a representation. The client can use Accept and related headers to express supported response media, while Content-Type identifies the representation being sent. A server should return 406 when it cannot produce an acceptable representation and 415 when it cannot consume the request media type. Vary helps shared caches separate negotiated responses.",
  "evaluation_points": [
    "Accept versus Content-Type",
    "406 and 415",
    "representation selection",
    "Vary cache implications."
  ],
  "resolution_title": "RFC 9110 - HTTP Semantics",
  "resolution_url": "https://www.rfc-editor.org/rfc/rfc9110.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-012",
  "role_slug": "backend-developer",
  "domain": "HTTP Semantics, Headers and Caching",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "Differentiate Cache-Control max-age, no-cache and no-store.",
  "preferred_answer": "max-age allows reuse while the response is fresh. no-cache permits storage but requires validation with the origin before reuse. no-store instructs caches not to store the response. A strong answer also considers private versus public, validators such as ETag, and that authenticated or personalised responses need deliberate cache policy rather than assumptions.",
  "evaluation_points": [
    "Freshness",
    "revalidation",
    "prohibition on storage",
    "private/public",
    "validators",
    "personalised data."
  ],
  "resolution_title": "MDN - HTTP caching",
  "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-013",
  "role_slug": "backend-developer",
  "domain": "HTTP Semantics, Headers and Caching",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "How do ETag and If-None-Match reduce bandwidth, and how can they help with concurrency?",
  "preferred_answer": "A server returns an ETag representing a selected resource version. A client can send If-None-Match to receive 304 when unchanged, avoiding the body. For writes, If-Match can require the client to update only the version it read; a mismatch can return 412, preventing a lost update. The tag must track the relevant representation semantics.",
  "evaluation_points": [
    "Validator generation",
    "304 flow",
    "If-Match for optimistic concurrency",
    "412",
    "representation awareness."
  ],
  "resolution_title": "MDN - HTTP caching",
  "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-014",
  "role_slug": "backend-developer",
  "domain": "HTTP Semantics, Headers and Caching",
  "difficulty": "advanced",
  "question_type": "concept",
  "prompt": "Which cookie attributes matter for a secure browser session?",
  "preferred_answer": "Use Secure so the cookie travels only over HTTPS, HttpOnly to block JavaScript access, and an appropriate SameSite policy to reduce cross-site request risks. Set narrow Domain and Path scope, a controlled lifetime and a non-sensitive opaque session identifier. Rotate the session on privilege changes and invalidate it server-side. Cookie flags complement, rather than replace, CSRF and XSS controls.",
  "evaluation_points": [
    "Secure",
    "HttpOnly",
    "SameSite",
    "scope and lifetime",
    "opaque identifier",
    "rotation and invalidation",
    "defence in depth."
  ],
  "resolution_title": "MDN - Using HTTP cookies",
  "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-015",
  "role_slug": "backend-developer",
  "domain": "HTTP Semantics, Headers and Caching",
  "difficulty": "advanced",
  "question_type": "concept",
  "prompt": "Why is CORS not an API authentication mechanism?",
  "preferred_answer": "CORS is a browser-enforced policy that controls whether frontend JavaScript may read a cross-origin response. Non-browser clients are not constrained by it, and some requests can still be sent even when the browser blocks access to the response. The API must authenticate and authorise every request independently. Permissive origins combined with credentials can expose data.",
  "evaluation_points": [
    "Browser enforcement",
    "response-read control",
    "non-browser bypass",
    "separate auth",
    "credentialed-origin risk."
  ],
  "resolution_title": "MDN - Cross-Origin Resource Sharing",
  "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-016",
  "role_slug": "backend-developer",
  "domain": "HTTP Semantics, Headers and Caching",
  "difficulty": "scenario",
  "question_type": "concept",
  "prompt": "An API response is cached by a CDN but users sometimes receive another user's data. What should you inspect?",
  "preferred_answer": "Immediately disable or bypass the unsafe cache path, then inspect Cache-Control, Vary, cache keys, authentication headers and whether personalised data was marked public. Verify that the CDN includes every representation-varying dimension and that private responses are not shared. Purge affected entries, assess exposure and add automated tests for cross-user cache isolation.",
  "evaluation_points": [
    "Containment",
    "cache directives and keys",
    "Vary",
    "auth handling",
    "purge",
    "exposure assessment",
    "regression test."
  ],
  "resolution_title": "MDN - HTTP caching",
  "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-017",
  "role_slug": "backend-developer",
  "domain": "REST API Design, Validation and Versioning",
  "difficulty": "foundation",
  "question_type": "design",
  "prompt": "What makes an HTTP API resource-oriented rather than RPC-shaped?",
  "preferred_answer": "A resource-oriented API identifies domain resources with stable URIs and uses HTTP methods to express operations on their representations. The contract emphasises nouns, state transitions and standard semantics rather than embedding every action in a verb endpoint. Some domain commands do not map cleanly to CRUD; modelling an action resource or explicit command can be clearer than forcing artificial purity.",
  "evaluation_points": [
    "Stable resource identifiers",
    "method semantics",
    "representations",
    "pragmatic handling of domain commands."
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Web API design",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-018",
  "role_slug": "backend-developer",
  "domain": "REST API Design, Validation and Versioning",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "Where should input validation occur in a backend request?",
  "preferred_answer": "Validate transport shape at the boundary, including required fields, types, ranges and format, then enforce business invariants in the domain or application layer where all entry paths share them. Database constraints provide a final integrity barrier. Never rely only on client-side validation, and return field-level errors without exposing internal implementation details.",
  "evaluation_points": [
    "Boundary validation",
    "domain invariants",
    "database constraints",
    "server-side enforcement",
    "safe error detail."
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Web API design",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-019",
  "role_slug": "backend-developer",
  "domain": "REST API Design, Validation and Versioning",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "Compare offset pagination with cursor pagination.",
  "preferred_answer": "Offset pagination is simple and supports jumping to a page, but large offsets can be expensive and concurrent inserts or deletes can cause duplicates or skips. Cursor pagination uses a stable ordered key and continues after the last item, giving more consistent and scalable traversal. It requires deterministic ordering, a tie-breaker and opaque cursor handling.",
  "evaluation_points": [
    "Usability versus scale",
    "mutation consistency",
    "deterministic order",
    "tie-breaker",
    "opaque cursor."
  ],
  "resolution_title": "GraphQL - Pagination",
  "resolution_url": "https://graphql.org/learn/pagination/",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-020",
  "role_slug": "backend-developer",
  "domain": "REST API Design, Validation and Versioning",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "What should a production API error response contain?",
  "preferred_answer": "Return a stable machine-readable error type or code, a human-readable summary, the HTTP status, safe contextual details and a request or trace identifier. Validation errors may include field paths. Keep internal stack traces, SQL and secrets out of the response. RFC Problem Details offers a standard envelope while allowing extension members.",
  "evaluation_points": [
    "Stable code/type",
    "status",
    "safe detail",
    "trace identifier",
    "field errors",
    "no internals",
    "standard envelope."
  ],
  "resolution_title": "RFC 9457 - Problem Details for HTTP APIs",
  "resolution_url": "https://www.rfc-editor.org/rfc/rfc9457.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-021",
  "role_slug": "backend-developer",
  "domain": "REST API Design, Validation and Versioning",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "How can a POST endpoint safely handle client retries for payment or order creation?",
  "preferred_answer": "Accept an idempotency key scoped to the authenticated client and operation. Atomically reserve the key with a fingerprint of the request, persist the final result and return the same outcome for a retry. Reject reuse with materially different input, set a retention policy and ensure downstream side effects also use deduplication or transactional messaging.",
  "evaluation_points": [
    "Client-scoped key",
    "atomic reservation",
    "request fingerprint",
    "replayed result",
    "mismatch rejection",
    "downstream dedupe."
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe with idempotent APIs",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-022",
  "role_slug": "backend-developer",
  "domain": "REST API Design, Validation and Versioning",
  "difficulty": "advanced",
  "question_type": "concept",
  "prompt": "When should an API introduce a new version instead of making an additive change?",
  "preferred_answer": "Introduce a new version when a change removes or renames fields, changes meaning, alters validation or behavioural guarantees, or otherwise cannot be consumed safely by existing clients. Additive optional fields usually do not require a version. Versioning does not replace deprecation management: measure usage, publish timelines and support migration.",
  "evaluation_points": [
    "Semantic break criteria",
    "additive compatibility",
    "usage measurement",
    "deprecation and migration."
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Web API design",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-023",
  "role_slug": "backend-developer",
  "domain": "REST API Design, Validation and Versioning",
  "difficulty": "advanced",
  "question_type": "concept",
  "prompt": "How can OpenAPI improve backend development beyond generating documentation?",
  "preferred_answer": "An OpenAPI document can be the reviewed contract for request and response schemas, security requirements and error shapes. Teams can lint it, generate clients or server stubs, run compatibility checks, produce mocks, validate traffic and drive contract tests. Generated code must remain subordinate to domain design and should not encourage leaking database models directly into the public API.",
  "evaluation_points": [
    "Machine-readable contract",
    "linting",
    "generation",
    "mocking",
    "compatibility and validation",
    "avoids DB model leakage."
  ],
  "resolution_title": "OpenAPI Specification",
  "resolution_url": "https://spec.openapis.org/oas/latest.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-024",
  "role_slug": "backend-developer",
  "domain": "REST API Design, Validation and Versioning",
  "difficulty": "scenario",
  "question_type": "concept",
  "prompt": "A mobile client cannot be forced to upgrade, but a field must eventually change meaning. How would you manage the transition?",
  "preferred_answer": "Add a new field with unambiguous semantics while preserving the old one, update documentation and telemetry, migrate server and clients to write and read the new field, and publish a long deprecation window. Use capability or version signals only when needed. Remove the old behaviour after measured usage reaches an agreed threshold and rollback remains possible.",
  "evaluation_points": [
    "Parallel field",
    "preserved semantics",
    "telemetry",
    "staged client migration",
    "deprecation threshold",
    "rollback."
  ],
  "resolution_title": "OpenAPI Specification",
  "resolution_url": "https://spec.openapis.org/oas/latest.html",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-025",
  "role_slug": "backend-developer",
  "domain": "GraphQL and gRPC",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What is the purpose of a GraphQL schema?",
  "preferred_answer": "The schema is the typed contract describing available object types, fields, arguments and root operations. Clients request fields permitted by that schema, and the response shape follows the query. Strong typing enables validation and tooling, but the schema still needs deliberate authorisation, cost controls and stable domain-oriented naming.",
  "evaluation_points": [
    "Typed contract",
    "types and fields",
    "root operations",
    "validation and tooling",
    "security remains separate."
  ],
  "resolution_title": "GraphQL - Schemas and Types",
  "resolution_url": "https://graphql.org/learn/schema/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-026",
  "role_slug": "backend-developer",
  "domain": "GraphQL and gRPC",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "How does gRPC differ from a typical JSON REST API?",
  "preferred_answer": "gRPC defines services and messages, commonly with Protocol Buffers, and supports generated strongly typed clients plus unary and streaming calls over HTTP/2. It is efficient for controlled service-to-service communication, while browser and public API interoperability may favour HTTP/JSON. The choice depends on clients, tooling, compatibility and operational constraints rather than speed alone.",
  "evaluation_points": [
    "IDL and generated clients",
    "binary messages",
    "streaming",
    "HTTP/2",
    "client ecosystem and trade-offs."
  ],
  "resolution_title": "gRPC - Core concepts, architecture and lifecycle",
  "resolution_url": "https://grpc.io/docs/what-is-grpc/core-concepts/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-027",
  "role_slug": "backend-developer",
  "domain": "GraphQL and gRPC",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What causes the GraphQL N+1 problem, and how is it commonly addressed?",
  "preferred_answer": "A resolver can issue one query for a parent list and then one additional query per child, multiplying database calls. Batch and cache lookups within the request, project required fields, prefetch relationships or redesign resolver boundaries. Request-scoped loaders should not become cross-user caches, and batching must preserve result ordering and error mapping.",
  "evaluation_points": [
    "Per-item dependency calls",
    "request-scoped batching",
    "projection/prefetch",
    "ordering",
    "no unsafe global cache."
  ],
  "resolution_title": "GraphQL - Performance",
  "resolution_url": "https://graphql.org/learn/performance/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-028",
  "role_slug": "backend-developer",
  "domain": "GraphQL and gRPC",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "How should a GraphQL mutation report business validation failures?",
  "preferred_answer": "Use a stable payload that distinguishes domain validation from transport or execution failures. Return structured field or business errors that clients can act on, and reserve top-level execution errors for exceptional failures according to the server contract. The mutation should define clear idempotency and authorisation behaviour, especially for retried operations.",
  "evaluation_points": [
    "Structured business errors",
    "distinction from execution faults",
    "actionable fields",
    "idempotency",
    "authorisation."
  ],
  "resolution_title": "GraphQL - Mutations",
  "resolution_url": "https://graphql.org/learn/mutations/",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-029",
  "role_slug": "backend-developer",
  "domain": "GraphQL and gRPC",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "Why should every outbound gRPC call normally have a deadline?",
  "preferred_answer": "Without a deadline, callers can wait indefinitely, retaining threads, memory and connections while an unavailable dependency accumulates work. A deadline communicates the maximum useful wait and propagates a time budget across services. It should reflect the caller's end-to-end objective, and the server should stop work when cancellation is observed.",
  "evaluation_points": [
    "Bounded resource use",
    "caller time budget",
    "propagation",
    "cancellation-aware server",
    "avoids arbitrary default."
  ],
  "resolution_title": "gRPC - Deadlines",
  "resolution_url": "https://grpc.io/docs/guides/deadlines/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-030",
  "role_slug": "backend-developer",
  "domain": "GraphQL and gRPC",
  "difficulty": "advanced",
  "question_type": "security",
  "prompt": "How would you limit abusive or unexpectedly expensive GraphQL queries?",
  "preferred_answer": "Authenticate and authorise at field or domain boundaries, cap query depth and complexity, restrict pagination sizes, apply timeouts and rate or cost budgets, use persisted operations where appropriate, and monitor resolver latency. Disable or control introspection based on threat model, but do not treat that alone as protection. Reject before expensive execution whenever possible.",
  "evaluation_points": [
    "Authorisation",
    "depth/complexity",
    "pagination caps",
    "persisted operations",
    "budgets",
    "telemetry",
    "early rejection."
  ],
  "resolution_title": "GraphQL - Performance",
  "resolution_url": "https://graphql.org/learn/performance/",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-031",
  "role_slug": "backend-developer",
  "domain": "GraphQL and gRPC",
  "difficulty": "advanced",
  "question_type": "concept",
  "prompt": "Which gRPC failures are safe to retry?",
  "preferred_answer": "Retry only failures classified as transient and only when the operation is idempotent or protected by a deduplication mechanism. Respect deadlines, retry budgets and server guidance, use exponential backoff with jitter, and avoid retrying validation, permission or permanent not-found outcomes. A configured client policy should be explicit about status codes and attempt limits.",
  "evaluation_points": [
    "Transient classification",
    "idempotency",
    "deadlines",
    "backoff and jitter",
    "retry budget",
    "no permanent errors."
  ],
  "resolution_title": "gRPC - Retry",
  "resolution_url": "https://grpc.io/docs/guides/retry/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-032",
  "role_slug": "backend-developer",
  "domain": "GraphQL and gRPC",
  "difficulty": "scenario",
  "question_type": "concept",
  "prompt": "You need a public browser API and high-throughput internal service calls. Would you use one protocol for both?",
  "preferred_answer": "Not necessarily. A public HTTP/JSON or GraphQL interface may optimise accessibility, caching and client control, while internal gRPC can provide generated contracts and streaming. Use an adapter or gateway only when the operational benefit justifies another boundary. Avoid maintaining duplicate business logic; both protocols should call the same application use cases and share policy.",
  "evaluation_points": [
    "Client-driven choice",
    "public interoperability",
    "internal efficiency",
    "shared business logic",
    "gateway cost."
  ],
  "resolution_title": "gRPC - Core concepts, architecture and lifecycle",
  "resolution_url": "https://grpc.io/docs/what-is-grpc/core-concepts/",
  "source_tier": "B",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BST-NODE-001",
  "role_slug": "backend-developer",
  "domain": "Node.js Backend Track",
  "difficulty": "intermediate",
  "question_type": "operations",
  "prompt": "How does the Node.js event loop affect backend latency?",
  "preferred_answer": "Node.js executes JavaScript callbacks on the event-loop thread. Long synchronous CPU work or blocking APIs delay every other callback, increasing event-loop lag and tail latency. Network I/O can remain concurrent through the runtime, while CPU-heavy work should be bounded and moved to worker threads or separate processes. Measure event-loop delay rather than assuming low CPU means responsiveness.",
  "evaluation_points": [
    "Single callback thread",
    "blocking impact",
    "concurrent I/O",
    "worker/process strategy",
    "event-loop lag metric."
  ],
  "resolution_title": "Node.js - The event loop, timers and nextTick",
  "resolution_url": "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BST-PY-001",
  "role_slug": "backend-developer",
  "domain": "Python Backend Track",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "What happens when blocking code runs inside an asyncio request handler?",
  "preferred_answer": "It blocks the event-loop thread, preventing unrelated coroutines from progressing until the call returns. Use an asynchronous client where available or offload bounded blocking work to an executor. The executor itself needs limits, and cancellation may not stop an already-running blocking function. Measure loop delay and pool queueing.",
  "evaluation_points": [
    "Event-loop blockage",
    "async client/executor",
    "bounded pool",
    "cancellation limitation",
    "metrics."
  ],
  "resolution_title": "Python documentation - asyncio",
  "resolution_url": "https://docs.python.org/3/library/asyncio.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BST-JAVA-001",
  "role_slug": "backend-developer",
  "domain": "Java and Spring Backend Track",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "Why is constructor injection generally preferred in Spring services?",
  "preferred_answer": "Constructor injection makes required collaborators explicit, supports immutable fields, allows construction in plain unit tests and fails early when dependencies are missing. Field injection hides requirements and makes instances harder to create outside the container. A very large constructor can reveal that the class has too many responsibilities rather than a need to hide dependencies.",
  "evaluation_points": [
    "Explicit required dependencies",
    "immutability",
    "testability",
    "fail-fast",
    "large-constructor design signal."
  ],
  "resolution_title": "Spring Framework - Dependency Injection",
  "resolution_url": "https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BST-DOTNET-001",
  "role_slug": "backend-developer",
  "domain": "ASP.NET Core Backend Track",
  "difficulty": "intermediate",
  "question_type": "operations",
  "prompt": "Why does ASP.NET Core middleware order matter?",
  "preferred_answer": "Middleware forms an ordered request pipeline and may run work before and after the next component. Exception handling must wrap later work, routing must precede endpoint-dependent policies, and authentication must establish identity before authorisation. Incorrect order can bypass controls or omit telemetry. The order should be documented and covered by integration tests.",
  "evaluation_points": [
    "Ordered pipeline",
    "wrapping",
    "routing/auth sequence",
    "security/telemetry impact",
    "tests."
  ],
  "resolution_title": "Microsoft Learn - ASP.NET Core middleware",
  "resolution_url": "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BST-GO-001",
  "role_slug": "backend-developer",
  "domain": "Go Backend Track",
  "difficulty": "intermediate",
  "question_type": "concept",
  "prompt": "What should and should not be stored in a Go context.Context?",
  "preferred_answer": "Context carries deadlines, cancellation signals and request-scoped values that cross API boundaries, such as trace metadata. It should be passed explicitly as the first parameter and not stored in a struct for general use. Do not use it for optional function parameters, dependencies or large mutable business objects, and always call a returned cancel function.",
  "evaluation_points": [
    "Deadlines/cancellation/request metadata",
    "explicit first parameter",
    "no general storage/options",
    "call cancel."
  ],
  "resolution_title": "Go package documentation - context",
  "resolution_url": "https://pkg.go.dev/context",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-01",
  "role_slug": "backend-developer",
  "domain": "Backend Foundations and Request Lifecycle",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-01 [PRACTICAL ASSESSMENT]: API request pipeline",
  "preferred_answer": "Task: Build a small service with correlation IDs, central error handling, validation and a health endpoint. Demonstrate the middleware order and show one trace from request to database.\n\nRequired evidence: A runnable repository, architecture note, sample request/response, automated tests, trace or structured-log evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "A runnable repository",
    "architecture note",
    "sample request/response",
    "automated tests",
    "trace or structured-log evidence."
  ],
  "resolution_title": "RFC 9110 - HTTP Semantics",
  "resolution_url": "https://www.rfc-editor.org/rfc/rfc9110.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-02",
  "role_slug": "backend-developer",
  "domain": "HTTP Semantics, Headers and Caching",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-02 [PRACTICAL ASSESSMENT]: HTTP cache correctness",
  "preferred_answer": "Task: Implement a read endpoint with Cache-Control, ETag and If-None-Match. Add a personalised endpoint and prove through tests that shared caching cannot leak data between users.\n\nRequired evidence: 304 behaviour, validator tests, safe personalised-cache policy, explanation of Vary and private/no-store choices.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "304 behaviour",
    "validator tests",
    "safe personalised-cache policy",
    "explanation of Vary and private/no-store choices."
  ],
  "resolution_title": "MDN - HTTP caching",
  "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-03",
  "role_slug": "backend-developer",
  "domain": "REST API Design, Validation and Versioning",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-03 [PRACTICAL ASSESSMENT]: Versioned REST contract",
  "preferred_answer": "Task: Design an OpenAPI contract for an order service with cursor pagination, Problem Details errors, idempotent creation and a documented deprecation path.\n\nRequired evidence: OpenAPI file, lint output, example requests, compatibility note, idempotency behaviour and error catalogue.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "OpenAPI file",
    "lint output",
    "example requests",
    "compatibility note",
    "idempotency behaviour and error catalogue."
  ],
  "resolution_title": "OpenAPI Specification",
  "resolution_url": "https://spec.openapis.org/oas/latest.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-04",
  "role_slug": "backend-developer",
  "domain": "GraphQL and gRPC",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-04 [PRACTICAL ASSESSMENT]: GraphQL and gRPC boundary",
  "preferred_answer": "Task: Expose one use case through GraphQL and gRPC while sharing application logic. Add batching for a nested GraphQL field and deadlines for gRPC calls.\n\nRequired evidence: Schema/proto, shared application service, N+1 evidence before/after, deadline and error tests.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Schema/proto",
    "shared application service",
    "N+1 evidence before/after",
    "deadline and error tests."
  ],
  "resolution_title": "GraphQL - Performance",
  "resolution_url": "https://graphql.org/learn/performance/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-033",
  "role_slug": "backend-developer",
  "domain": "Language Runtime, Memory and Dependency Management",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Language Runtime, Memory and Dependency Management?",
  "preferred_answer": "Language Runtime, Memory and Dependency Management focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-034",
  "role_slug": "backend-developer",
  "domain": "Language Runtime, Memory and Dependency Management",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Language Runtime, Memory and Dependency Management in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-035",
  "role_slug": "backend-developer",
  "domain": "Language Runtime, Memory and Dependency Management",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Language Runtime, Memory and Dependency Management in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-036",
  "role_slug": "backend-developer",
  "domain": "Language Runtime, Memory and Dependency Management",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Language Runtime, Memory and Dependency Management, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-037",
  "role_slug": "backend-developer",
  "domain": "Language Runtime, Memory and Dependency Management",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Language Runtime, Memory and Dependency Management?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-038",
  "role_slug": "backend-developer",
  "domain": "Language Runtime, Memory and Dependency Management",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Language Runtime, Memory and Dependency Management to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-039",
  "role_slug": "backend-developer",
  "domain": "Language Runtime, Memory and Dependency Management",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Language Runtime, Memory and Dependency Management, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-040",
  "role_slug": "backend-developer",
  "domain": "Language Runtime, Memory and Dependency Management",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Language Runtime, Memory and Dependency Management experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-041",
  "role_slug": "backend-developer",
  "domain": "Concurrency, Asynchronous I/O and Background Work",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Concurrency, Asynchronous I/O and Background Work?",
  "preferred_answer": "Concurrency, Asynchronous I/O and Background Work focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-042",
  "role_slug": "backend-developer",
  "domain": "Concurrency, Asynchronous I/O and Background Work",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Concurrency, Asynchronous I/O and Background Work in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-043",
  "role_slug": "backend-developer",
  "domain": "Concurrency, Asynchronous I/O and Background Work",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Concurrency, Asynchronous I/O and Background Work in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-044",
  "role_slug": "backend-developer",
  "domain": "Concurrency, Asynchronous I/O and Background Work",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Concurrency, Asynchronous I/O and Background Work, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-045",
  "role_slug": "backend-developer",
  "domain": "Concurrency, Asynchronous I/O and Background Work",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Concurrency, Asynchronous I/O and Background Work?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-046",
  "role_slug": "backend-developer",
  "domain": "Concurrency, Asynchronous I/O and Background Work",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Concurrency, Asynchronous I/O and Background Work to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-047",
  "role_slug": "backend-developer",
  "domain": "Concurrency, Asynchronous I/O and Background Work",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Concurrency, Asynchronous I/O and Background Work, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-048",
  "role_slug": "backend-developer",
  "domain": "Concurrency, Asynchronous I/O and Background Work",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Concurrency, Asynchronous I/O and Background Work experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-049",
  "role_slug": "backend-developer",
  "domain": "SQL Data Modelling and Query Design",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of SQL Data Modelling and Query Design?",
  "preferred_answer": "SQL Data Modelling and Query Design focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-050",
  "role_slug": "backend-developer",
  "domain": "SQL Data Modelling and Query Design",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for SQL Data Modelling and Query Design in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-051",
  "role_slug": "backend-developer",
  "domain": "SQL Data Modelling and Query Design",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing SQL Data Modelling and Query Design in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-052",
  "role_slug": "backend-developer",
  "domain": "SQL Data Modelling and Query Design",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in SQL Data Modelling and Query Design, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-053",
  "role_slug": "backend-developer",
  "domain": "SQL Data Modelling and Query Design",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to SQL Data Modelling and Query Design?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-054",
  "role_slug": "backend-developer",
  "domain": "SQL Data Modelling and Query Design",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design SQL Data Modelling and Query Design to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-055",
  "role_slug": "backend-developer",
  "domain": "SQL Data Modelling and Query Design",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in SQL Data Modelling and Query Design, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-056",
  "role_slug": "backend-developer",
  "domain": "SQL Data Modelling and Query Design",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, SQL Data Modelling and Query Design experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-057",
  "role_slug": "backend-developer",
  "domain": "Transactions, Isolation and Locking",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Transactions, Isolation and Locking?",
  "preferred_answer": "Transactions, Isolation and Locking focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-058",
  "role_slug": "backend-developer",
  "domain": "Transactions, Isolation and Locking",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Transactions, Isolation and Locking in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-059",
  "role_slug": "backend-developer",
  "domain": "Transactions, Isolation and Locking",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Transactions, Isolation and Locking in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-060",
  "role_slug": "backend-developer",
  "domain": "Transactions, Isolation and Locking",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Transactions, Isolation and Locking, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-061",
  "role_slug": "backend-developer",
  "domain": "Transactions, Isolation and Locking",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Transactions, Isolation and Locking?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-062",
  "role_slug": "backend-developer",
  "domain": "Transactions, Isolation and Locking",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Transactions, Isolation and Locking to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-063",
  "role_slug": "backend-developer",
  "domain": "Transactions, Isolation and Locking",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Transactions, Isolation and Locking, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-064",
  "role_slug": "backend-developer",
  "domain": "Transactions, Isolation and Locking",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Transactions, Isolation and Locking experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-065",
  "role_slug": "backend-developer",
  "domain": "Indexes, Query Planning and Database Performance",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Indexes, Query Planning and Database Performance?",
  "preferred_answer": "Indexes, Query Planning and Database Performance focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-066",
  "role_slug": "backend-developer",
  "domain": "Indexes, Query Planning and Database Performance",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Indexes, Query Planning and Database Performance in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-067",
  "role_slug": "backend-developer",
  "domain": "Indexes, Query Planning and Database Performance",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Indexes, Query Planning and Database Performance in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-068",
  "role_slug": "backend-developer",
  "domain": "Indexes, Query Planning and Database Performance",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Indexes, Query Planning and Database Performance, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-069",
  "role_slug": "backend-developer",
  "domain": "Indexes, Query Planning and Database Performance",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Indexes, Query Planning and Database Performance?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-070",
  "role_slug": "backend-developer",
  "domain": "Indexes, Query Planning and Database Performance",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Indexes, Query Planning and Database Performance to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-071",
  "role_slug": "backend-developer",
  "domain": "Indexes, Query Planning and Database Performance",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Indexes, Query Planning and Database Performance, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-072",
  "role_slug": "backend-developer",
  "domain": "Indexes, Query Planning and Database Performance",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Indexes, Query Planning and Database Performance experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-073",
  "role_slug": "backend-developer",
  "domain": "NoSQL, Document Modelling and Consistency",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of NoSQL, Document Modelling and Consistency?",
  "preferred_answer": "NoSQL, Document Modelling and Consistency focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-074",
  "role_slug": "backend-developer",
  "domain": "NoSQL, Document Modelling and Consistency",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for NoSQL, Document Modelling and Consistency in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-075",
  "role_slug": "backend-developer",
  "domain": "NoSQL, Document Modelling and Consistency",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing NoSQL, Document Modelling and Consistency in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-076",
  "role_slug": "backend-developer",
  "domain": "NoSQL, Document Modelling and Consistency",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in NoSQL, Document Modelling and Consistency, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-077",
  "role_slug": "backend-developer",
  "domain": "NoSQL, Document Modelling and Consistency",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to NoSQL, Document Modelling and Consistency?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-078",
  "role_slug": "backend-developer",
  "domain": "NoSQL, Document Modelling and Consistency",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design NoSQL, Document Modelling and Consistency to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-079",
  "role_slug": "backend-developer",
  "domain": "NoSQL, Document Modelling and Consistency",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in NoSQL, Document Modelling and Consistency, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-080",
  "role_slug": "backend-developer",
  "domain": "NoSQL, Document Modelling and Consistency",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, NoSQL, Document Modelling and Consistency experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-081",
  "role_slug": "backend-developer",
  "domain": "Caching, Redis and Rate Limiting",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Caching, Redis and Rate Limiting?",
  "preferred_answer": "Caching, Redis and Rate Limiting focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-082",
  "role_slug": "backend-developer",
  "domain": "Caching, Redis and Rate Limiting",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Caching, Redis and Rate Limiting in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-083",
  "role_slug": "backend-developer",
  "domain": "Caching, Redis and Rate Limiting",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Caching, Redis and Rate Limiting in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-084",
  "role_slug": "backend-developer",
  "domain": "Caching, Redis and Rate Limiting",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Caching, Redis and Rate Limiting, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-085",
  "role_slug": "backend-developer",
  "domain": "Caching, Redis and Rate Limiting",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Caching, Redis and Rate Limiting?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-086",
  "role_slug": "backend-developer",
  "domain": "Caching, Redis and Rate Limiting",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Caching, Redis and Rate Limiting to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-087",
  "role_slug": "backend-developer",
  "domain": "Caching, Redis and Rate Limiting",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Caching, Redis and Rate Limiting, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-088",
  "role_slug": "backend-developer",
  "domain": "Caching, Redis and Rate Limiting",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Caching, Redis and Rate Limiting experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-089",
  "role_slug": "backend-developer",
  "domain": "Authentication, Authorisation and Session Security",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Authentication, Authorisation and Session Security?",
  "preferred_answer": "Authentication, Authorisation and Session Security focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-090",
  "role_slug": "backend-developer",
  "domain": "Authentication, Authorisation and Session Security",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Authentication, Authorisation and Session Security in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-091",
  "role_slug": "backend-developer",
  "domain": "Authentication, Authorisation and Session Security",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Authentication, Authorisation and Session Security in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-092",
  "role_slug": "backend-developer",
  "domain": "Authentication, Authorisation and Session Security",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Authentication, Authorisation and Session Security, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-093",
  "role_slug": "backend-developer",
  "domain": "Authentication, Authorisation and Session Security",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Authentication, Authorisation and Session Security?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-094",
  "role_slug": "backend-developer",
  "domain": "Authentication, Authorisation and Session Security",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Authentication, Authorisation and Session Security to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-095",
  "role_slug": "backend-developer",
  "domain": "Authentication, Authorisation and Session Security",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Authentication, Authorisation and Session Security, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-096",
  "role_slug": "backend-developer",
  "domain": "Authentication, Authorisation and Session Security",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Authentication, Authorisation and Session Security experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-097",
  "role_slug": "backend-developer",
  "domain": "Application and API Security",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Application and API Security?",
  "preferred_answer": "Application and API Security focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-098",
  "role_slug": "backend-developer",
  "domain": "Application and API Security",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Application and API Security in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-099",
  "role_slug": "backend-developer",
  "domain": "Application and API Security",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Application and API Security in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-100",
  "role_slug": "backend-developer",
  "domain": "Application and API Security",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Application and API Security, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-101",
  "role_slug": "backend-developer",
  "domain": "Application and API Security",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Application and API Security?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-102",
  "role_slug": "backend-developer",
  "domain": "Application and API Security",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Application and API Security to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-103",
  "role_slug": "backend-developer",
  "domain": "Application and API Security",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Application and API Security, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-104",
  "role_slug": "backend-developer",
  "domain": "Application and API Security",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Application and API Security experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-105",
  "role_slug": "backend-developer",
  "domain": "Messaging, Queues and Event-Driven Systems",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Messaging, Queues and Event-Driven Systems?",
  "preferred_answer": "Messaging, Queues and Event-Driven Systems focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-106",
  "role_slug": "backend-developer",
  "domain": "Messaging, Queues and Event-Driven Systems",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Messaging, Queues and Event-Driven Systems in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-107",
  "role_slug": "backend-developer",
  "domain": "Messaging, Queues and Event-Driven Systems",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Messaging, Queues and Event-Driven Systems in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-108",
  "role_slug": "backend-developer",
  "domain": "Messaging, Queues and Event-Driven Systems",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Messaging, Queues and Event-Driven Systems, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-109",
  "role_slug": "backend-developer",
  "domain": "Messaging, Queues and Event-Driven Systems",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Messaging, Queues and Event-Driven Systems?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-110",
  "role_slug": "backend-developer",
  "domain": "Messaging, Queues and Event-Driven Systems",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Messaging, Queues and Event-Driven Systems to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-111",
  "role_slug": "backend-developer",
  "domain": "Messaging, Queues and Event-Driven Systems",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Messaging, Queues and Event-Driven Systems, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-112",
  "role_slug": "backend-developer",
  "domain": "Messaging, Queues and Event-Driven Systems",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Messaging, Queues and Event-Driven Systems experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-113",
  "role_slug": "backend-developer",
  "domain": "Testing, Contracts and Code Quality",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Testing, Contracts and Code Quality?",
  "preferred_answer": "Testing, Contracts and Code Quality focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-114",
  "role_slug": "backend-developer",
  "domain": "Testing, Contracts and Code Quality",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Testing, Contracts and Code Quality in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-115",
  "role_slug": "backend-developer",
  "domain": "Testing, Contracts and Code Quality",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Testing, Contracts and Code Quality in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-116",
  "role_slug": "backend-developer",
  "domain": "Testing, Contracts and Code Quality",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Testing, Contracts and Code Quality, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-117",
  "role_slug": "backend-developer",
  "domain": "Testing, Contracts and Code Quality",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Testing, Contracts and Code Quality?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-118",
  "role_slug": "backend-developer",
  "domain": "Testing, Contracts and Code Quality",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Testing, Contracts and Code Quality to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-119",
  "role_slug": "backend-developer",
  "domain": "Testing, Contracts and Code Quality",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Testing, Contracts and Code Quality, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-120",
  "role_slug": "backend-developer",
  "domain": "Testing, Contracts and Code Quality",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Testing, Contracts and Code Quality experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-121",
  "role_slug": "backend-developer",
  "domain": "Reliability, Idempotency and Fault Tolerance",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Reliability, Idempotency and Fault Tolerance?",
  "preferred_answer": "Reliability, Idempotency and Fault Tolerance focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-122",
  "role_slug": "backend-developer",
  "domain": "Reliability, Idempotency and Fault Tolerance",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Reliability, Idempotency and Fault Tolerance in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-123",
  "role_slug": "backend-developer",
  "domain": "Reliability, Idempotency and Fault Tolerance",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Reliability, Idempotency and Fault Tolerance in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-124",
  "role_slug": "backend-developer",
  "domain": "Reliability, Idempotency and Fault Tolerance",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Reliability, Idempotency and Fault Tolerance, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-125",
  "role_slug": "backend-developer",
  "domain": "Reliability, Idempotency and Fault Tolerance",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Reliability, Idempotency and Fault Tolerance?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-126",
  "role_slug": "backend-developer",
  "domain": "Reliability, Idempotency and Fault Tolerance",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Reliability, Idempotency and Fault Tolerance to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-127",
  "role_slug": "backend-developer",
  "domain": "Reliability, Idempotency and Fault Tolerance",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Reliability, Idempotency and Fault Tolerance, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-128",
  "role_slug": "backend-developer",
  "domain": "Reliability, Idempotency and Fault Tolerance",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Reliability, Idempotency and Fault Tolerance experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-129",
  "role_slug": "backend-developer",
  "domain": "Observability and Production Debugging",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Observability and Production Debugging?",
  "preferred_answer": "Observability and Production Debugging focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-130",
  "role_slug": "backend-developer",
  "domain": "Observability and Production Debugging",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Observability and Production Debugging in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-131",
  "role_slug": "backend-developer",
  "domain": "Observability and Production Debugging",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Observability and Production Debugging in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-132",
  "role_slug": "backend-developer",
  "domain": "Observability and Production Debugging",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Observability and Production Debugging, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-133",
  "role_slug": "backend-developer",
  "domain": "Observability and Production Debugging",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Observability and Production Debugging?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-134",
  "role_slug": "backend-developer",
  "domain": "Observability and Production Debugging",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Observability and Production Debugging to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-135",
  "role_slug": "backend-developer",
  "domain": "Observability and Production Debugging",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Observability and Production Debugging, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-136",
  "role_slug": "backend-developer",
  "domain": "Observability and Production Debugging",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Observability and Production Debugging experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-137",
  "role_slug": "backend-developer",
  "domain": "Performance, Scalability and Distributed Systems",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Performance, Scalability and Distributed Systems?",
  "preferred_answer": "Performance, Scalability and Distributed Systems focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-138",
  "role_slug": "backend-developer",
  "domain": "Performance, Scalability and Distributed Systems",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Performance, Scalability and Distributed Systems in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-139",
  "role_slug": "backend-developer",
  "domain": "Performance, Scalability and Distributed Systems",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Performance, Scalability and Distributed Systems in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-140",
  "role_slug": "backend-developer",
  "domain": "Performance, Scalability and Distributed Systems",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Performance, Scalability and Distributed Systems, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-141",
  "role_slug": "backend-developer",
  "domain": "Performance, Scalability and Distributed Systems",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Performance, Scalability and Distributed Systems?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-142",
  "role_slug": "backend-developer",
  "domain": "Performance, Scalability and Distributed Systems",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Performance, Scalability and Distributed Systems to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-143",
  "role_slug": "backend-developer",
  "domain": "Performance, Scalability and Distributed Systems",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Performance, Scalability and Distributed Systems, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-144",
  "role_slug": "backend-developer",
  "domain": "Performance, Scalability and Distributed Systems",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Performance, Scalability and Distributed Systems experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-145",
  "role_slug": "backend-developer",
  "domain": "Deployment, Cloud Architecture and System Design",
  "difficulty": "foundation",
  "question_type": "concept",
  "prompt": "What are the core design goals and architectural constraints of Deployment, Cloud Architecture and System Design?",
  "preferred_answer": "Deployment, Cloud Architecture and System Design focuses on establishing clear boundaries, predictable resource usage, explicit error handling and verifiable invariants across production systems.",
  "evaluation_points": [
    "Clear boundaries",
    "Predictable resource usage",
    "Explicit error handling",
    "Verifiable invariants"
  ],
  "resolution_title": "Microsoft Azure Architecture Center",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-146",
  "role_slug": "backend-developer",
  "domain": "Deployment, Cloud Architecture and System Design",
  "difficulty": "foundation",
  "question_type": "operations",
  "prompt": "How do you measure and inspect health for Deployment, Cloud Architecture and System Design in a high-throughput API?",
  "preferred_answer": "Monitor request rate, tail latency, error ratios and resource saturation while establishing automated health checks that prevent cascading failures.",
  "evaluation_points": [
    "Rate and latency metrics",
    "Error ratio tracking",
    "Resource saturation",
    "Automated health checks"
  ],
  "resolution_title": "OpenTelemetry Documentation",
  "resolution_url": "https://opentelemetry.io/docs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-147",
  "role_slug": "backend-developer",
  "domain": "Deployment, Cloud Architecture and System Design",
  "difficulty": "intermediate",
  "question_type": "design",
  "prompt": "What trade-offs must be evaluated when implementing Deployment, Cloud Architecture and System Design in distributed backend microservices?",
  "preferred_answer": "Evaluate consistency versus availability, network overhead, operational complexity and failure isolation before choosing an implementation model.",
  "evaluation_points": [
    "Consistency vs availability",
    "Network overhead",
    "Operational complexity",
    "Failure isolation"
  ],
  "resolution_title": "AWS Well-Architected Framework",
  "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-148",
  "role_slug": "backend-developer",
  "domain": "Deployment, Cloud Architecture and System Design",
  "difficulty": "intermediate",
  "question_type": "troubleshooting",
  "prompt": "What are common failure modes in Deployment, Cloud Architecture and System Design, and how do you diagnose them from production logs?",
  "preferred_answer": "Triangulate correlation IDs across structured logs, metrics and traces to locate bottlenecks, connection leaks or unhandled exception paths.",
  "evaluation_points": [
    "Correlation ID tracing",
    "Structured log filtering",
    "Metric triangulation",
    "Bottleneck identification"
  ],
  "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
  "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-149",
  "role_slug": "backend-developer",
  "domain": "Deployment, Cloud Architecture and System Design",
  "difficulty": "intermediate",
  "question_type": "security",
  "prompt": "What security controls and least-privilege principles apply to Deployment, Cloud Architecture and System Design?",
  "preferred_answer": "Apply strict input validation, least-privilege identities, encrypted transport, secret redaction and auditable access controls at every service boundary.",
  "evaluation_points": [
    "Input validation",
    "Least-privilege identities",
    "Encrypted transport",
    "Secret redaction"
  ],
  "resolution_title": "OWASP API Security Top 10",
  "resolution_url": "https://owasp.org/API-Security/editions/2023/en/0x11-t10/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-150",
  "role_slug": "backend-developer",
  "domain": "Deployment, Cloud Architecture and System Design",
  "difficulty": "advanced",
  "question_type": "design",
  "prompt": "How do you design Deployment, Cloud Architecture and System Design to handle zero-downtime releases and backward compatibility?",
  "preferred_answer": "Use expand-contract schema evolution, versioned contracts, feature flags and graceful draining so old and new instances operate simultaneously.",
  "evaluation_points": [
    "Expand-contract pattern",
    "Versioned contracts",
    "Feature flags",
    "Graceful draining"
  ],
  "resolution_title": "Martin Fowler - Refactoring Databases",
  "resolution_url": "https://martinfowler.com/articles/evopatterns/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-151",
  "role_slug": "backend-developer",
  "domain": "Deployment, Cloud Architecture and System Design",
  "difficulty": "advanced",
  "question_type": "recovery",
  "prompt": "In the event of a severe outage in Deployment, Cloud Architecture and System Design, what is your automated containment and recovery sequence?",
  "preferred_answer": "Immediately shed non-essential load, open circuit breakers, activate fallback read modes, isolate failing nodes and execute a tested rollback or fix-forward plan.",
  "evaluation_points": [
    "Load shedding",
    "Circuit breakers",
    "Fallback modes",
    "Tested rollback plan"
  ],
  "resolution_title": "Amazon Builders Library - Making retries safe",
  "resolution_url": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "BED-152",
  "role_slug": "backend-developer",
  "domain": "Deployment, Cloud Architecture and System Design",
  "difficulty": "scenario",
  "question_type": "troubleshooting",
  "prompt": "SCENARIO: Under peak load, Deployment, Cloud Architecture and System Design experiences a severe bottleneck resulting in 504 timeouts. How do you resolve it?",
  "preferred_answer": "Capture live heap and CPU profiles, examine database lock contention and thread pool saturation, temporarily increase pool limits or throttle traffic, and deploy a target fix.",
  "evaluation_points": [
    "Live profiling",
    "Lock and pool inspection",
    "Traffic throttling",
    "Targeted deployment"
  ],
  "resolution_title": "Google SRE Book - Effective Troubleshooting",
  "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-05",
  "role_slug": "backend-developer",
  "domain": "Language Runtime, Memory and Dependency Management",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-05 [PRACTICAL ASSESSMENT]: Language Runtime, Memory and Dependency Management Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Language Runtime, Memory and Dependency Management.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-06",
  "role_slug": "backend-developer",
  "domain": "Concurrency, Asynchronous I/O and Background Work",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-06 [PRACTICAL ASSESSMENT]: Concurrency, Asynchronous I/O and Background Work Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Concurrency, Asynchronous I/O and Background Work.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-07",
  "role_slug": "backend-developer",
  "domain": "SQL Data Modelling and Query Design",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-07 [PRACTICAL ASSESSMENT]: SQL Data Modelling and Query Design Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of SQL Data Modelling and Query Design.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-08",
  "role_slug": "backend-developer",
  "domain": "Transactions, Isolation and Locking",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-08 [PRACTICAL ASSESSMENT]: Transactions, Isolation and Locking Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Transactions, Isolation and Locking.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-09",
  "role_slug": "backend-developer",
  "domain": "Indexes, Query Planning and Database Performance",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-09 [PRACTICAL ASSESSMENT]: Indexes, Query Planning and Database Performance Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Indexes, Query Planning and Database Performance.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-10",
  "role_slug": "backend-developer",
  "domain": "NoSQL, Document Modelling and Consistency",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-10 [PRACTICAL ASSESSMENT]: NoSQL, Document Modelling and Consistency Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of NoSQL, Document Modelling and Consistency.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-11",
  "role_slug": "backend-developer",
  "domain": "Caching, Redis and Rate Limiting",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-11 [PRACTICAL ASSESSMENT]: Caching, Redis and Rate Limiting Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Caching, Redis and Rate Limiting.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-12",
  "role_slug": "backend-developer",
  "domain": "Authentication, Authorisation and Session Security",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-12 [PRACTICAL ASSESSMENT]: Authentication, Authorisation and Session Security Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Authentication, Authorisation and Session Security.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-13",
  "role_slug": "backend-developer",
  "domain": "Application and API Security",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-13 [PRACTICAL ASSESSMENT]: Application and API Security Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Application and API Security.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-14",
  "role_slug": "backend-developer",
  "domain": "Messaging, Queues and Event-Driven Systems",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-14 [PRACTICAL ASSESSMENT]: Messaging, Queues and Event-Driven Systems Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Messaging, Queues and Event-Driven Systems.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-15",
  "role_slug": "backend-developer",
  "domain": "Testing, Contracts and Code Quality",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-15 [PRACTICAL ASSESSMENT]: Testing, Contracts and Code Quality Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Testing, Contracts and Code Quality.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-16",
  "role_slug": "backend-developer",
  "domain": "Reliability, Idempotency and Fault Tolerance",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-16 [PRACTICAL ASSESSMENT]: Reliability, Idempotency and Fault Tolerance Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Reliability, Idempotency and Fault Tolerance.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-17",
  "role_slug": "backend-developer",
  "domain": "Observability and Production Debugging",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-17 [PRACTICAL ASSESSMENT]: Observability and Production Debugging Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Observability and Production Debugging.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-18",
  "role_slug": "backend-developer",
  "domain": "Performance, Scalability and Distributed Systems",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-18 [PRACTICAL ASSESSMENT]: Performance, Scalability and Distributed Systems Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Performance, Scalability and Distributed Systems.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
},
  {
  "id": "LAB-BED-19",
  "role_slug": "backend-developer",
  "domain": "Deployment, Cloud Architecture and System Design",
  "difficulty": "scenario",
  "question_type": "practical",
  "prompt": "LAB-19 [PRACTICAL ASSESSMENT]: Deployment, Cloud Architecture and System Design Implementation Lab",
  "preferred_answer": "Task: Implement a production-grade backend service demonstrating key principles of Deployment, Cloud Architecture and System Design.\n\nRequired evidence: Runnable repository, automated test suite, architecture note, load test log, telemetry evidence.\n\nScoring rubric: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
  "evaluation_points": [
    "Runnable repository",
    "Automated test suite",
    "Architecture documentation",
    "Telemetry and performance evidence"
  ],
  "resolution_title": "Microsoft Azure Architecture Center - Best Practices",
  "resolution_url": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "source_tier": "A",
  "last_verified_at": "2026-07-28",
  "status": "published"
}
];
