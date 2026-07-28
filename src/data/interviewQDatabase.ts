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
  // =========================================================================
  // DOMAIN 1: DEVOPS PRINCIPLES AND DELIVERY PERFORMANCE (DVO-001 TO DVO-008)
  // =========================================================================
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

  // =========================================================================
  // DOMAIN 2: LINUX ADMINISTRATION AND SHELL AUTOMATION (DVO-009 TO DVO-016)
  // =========================================================================
  {
    id: "DVO-009",
    role_slug: "devops-engineer",
    domain: "Linux Administration and Shell Automation",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "What is the practical difference between a process and a thread?",
    preferred_answer: "A process has its own virtual address space and operating-system resources, while threads within a process share most of that process memory and resources. Threads are lighter to create and communicate through shared memory, but a fault or unsafe shared-state change can affect the whole process.",
    evaluation_points: ["Separate process address spaces", "Shared thread resources", "Performance and isolation trade-off"],
    resolution_title: "Linux man-pages - proc(5)",
    resolution_url: "https://man7.org/linux/man-pages/man5/proc.5.html",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-010",
    role_slug: "devops-engineer",
    domain: "Linux Administration and Shell Automation",
    difficulty: "foundation",
    question_type: "operations",
    prompt: "Why should a Linux service be managed by systemd instead of starting its daemon manually?",
    preferred_answer: "systemd provides a declared unit, dependency ordering, controlled startup and shutdown, restart policy, status tracking and centralised logs. A daemon launched manually may not be known to systemd, so service status, restart and boot-time behaviour become unreliable or inconsistent.",
    evaluation_points: ["Lifecycle supervision", "Dependencies and restart", "Boot persistence", "Status/log integration"],
    resolution_title: "Red Hat Enterprise Linux - Managing systemd",
    resolution_url: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/managing-systemd_configuring-basic-system-settings",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-011",
    role_slug: "devops-engineer",
    domain: "Linux Administration and Shell Automation",
    difficulty: "intermediate",
    question_type: "operations",
    prompt: "Explain the meaning of file modes 644 and 755.",
    preferred_answer: "Mode 644 gives the owner read and write permissions, while group and others receive read only. Mode 755 gives the owner read, write and execute, while group and others receive read and execute. Directory execute permission controls traversal, so the effect differs from an ordinary file.",
    evaluation_points: ["Correct owner/group/other mapping", "Octal interpretation", "Directory traversal nuance"],
    resolution_title: "Red Hat Enterprise Linux - Managing File System Permissions",
    resolution_url: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/managing-file-system-permissions_configuring-basic-system-settings",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-012",
    role_slug: "devops-engineer",
    domain: "Linux Administration and Shell Automation",
    difficulty: "intermediate",
    question_type: "concept",
    prompt: "How do hard links and symbolic links differ?",
    preferred_answer: "A hard link is another directory entry for the same inode and normally cannot cross filesystems or link directories. A symbolic link stores a path to another object, can cross filesystems and can become dangling if the target moves or disappears. Deleting one hard-link name does not remove the data while another link remains.",
    evaluation_points: ["Inode versus path", "Filesystem limitation", "Dangling symlink", "Deletion behaviour"],
    resolution_title: "Red Hat Enterprise Linux - Managing File System Permissions",
    resolution_url: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/managing-file-system-permissions_configuring-basic-system-settings",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-013",
    role_slug: "devops-engineer",
    domain: "Linux Administration and Shell Automation",
    difficulty: "intermediate",
    question_type: "troubleshooting",
    prompt: "A host has high load average. What would you inspect before adding CPU?",
    preferred_answer: "Confirm whether the load is CPU pressure, runnable tasks or uninterruptible I/O wait. Inspect CPU utilisation, run queue, memory and swap pressure, disk latency, blocked processes, recent deployments and application-level saturation. High load alone does not prove CPU shortage.",
    evaluation_points: ["Separates CPU from I/O and blocked tasks", "Checks memory/disk/processes", "Correlates with change history"],
    resolution_title: "Linux man-pages - proc(5)",
    resolution_url: "https://man7.org/linux/man-pages/man5/proc.5.html",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-014",
    role_slug: "devops-engineer",
    domain: "Linux Administration and Shell Automation",
    difficulty: "advanced",
    question_type: "troubleshooting",
    prompt: "The filesystem is full according to df, but du cannot account for the used space. What is a likely cause?",
    preferred_answer: "A common cause is a large file that was deleted from the directory tree but is still open by a running process. The blocks remain allocated until the process closes the file or restarts. Check open deleted files, confirm the owning process, then rotate or restart safely rather than deleting more files blindly.",
    evaluation_points: ["Identifies deleted-but-open file", "Explains block retention", "Proposes safe verification and remediation"],
    resolution_title: "Red Hat Enterprise Linux - Troubleshooting with Log Files",
    resolution_url: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/assembly_troubleshooting-problems-using-log-files_configuring-basic-system-settings",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-015",
    role_slug: "devops-engineer",
    domain: "Linux Administration and Shell Automation",
    difficulty: "advanced",
    question_type: "operations",
    prompt: "When should SIGTERM be used instead of SIGKILL?",
    preferred_answer: "SIGTERM requests graceful termination and allows an application to flush buffers, close connections and release resources. SIGKILL cannot be caught or handled and should be a last resort when the process cannot terminate normally. A production stop procedure should allow a bounded grace period before escalation.",
    evaluation_points: ["Graceful handling versus forced termination", "Data/connection implications", "Bounded escalation"],
    resolution_title: "Linux man-pages - signal(7)",
    resolution_url: "https://man7.org/linux/man-pages/man7/signal.7.html",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-016",
    role_slug: "devops-engineer",
    domain: "Linux Administration and Shell Automation",
    difficulty: "scenario",
    question_type: "troubleshooting",
    prompt: "A custom service runs when started manually but fails after reboot. How would you diagnose it?",
    preferred_answer: "Inspect the systemd unit, status and journal for the boot attempt. Verify the executable path, user, working directory, environment variables, file permissions, dependencies and network readiness; then use explicit unit directives rather than shell-profile assumptions. Reload units, enable the service and retest through a controlled reboot.",
    evaluation_points: ["Uses systemctl/journalctl", "Checks environment and permissions", "Dependencies/order", "Daemon reload and enable"],
    resolution_title: "Red Hat Enterprise Linux - Working with systemd Unit Files",
    resolution_url: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/using_systemd_unit_files_to_customize_and_optimize_your_system/assembly_working-with-systemd-unit-files_working-with-systemd",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 3: NETWORKING, DNS, HTTP AND TLS (DVO-017 TO DVO-024)
  // =========================================================================
  {
    id: "DVO-017",
    role_slug: "devops-engineer",
    domain: "Networking, DNS, HTTP and TLS",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "Describe the main steps that occur when a client resolves a domain name.",
    preferred_answer: "The client checks local and operating-system caches, then asks a recursive resolver. If the answer is not cached, the resolver follows the DNS hierarchy through root, top-level-domain and authoritative name servers, returns the record and caches it according to its TTL. Exact behaviour can vary with local resolvers and record types.",
    evaluation_points: ["Cache", "Recursive resolver", "Hierarchical lookup", "Authoritative answer", "TTL"],
    resolution_title: "Cloudflare Learning Center - What is DNS?",
    resolution_url: "https://www.cloudflare.com/learning/dns/what-is-dns/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-018",
    role_slug: "devops-engineer",
    domain: "Networking, DNS, HTTP and TLS",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "When would you choose TCP instead of UDP?",
    preferred_answer: "TCP is appropriate when ordered, reliable delivery and congestion control matter, such as HTTP over TCP or database sessions. UDP has lower protocol overhead and supports latency-sensitive or application-managed reliability use cases, such as DNS queries, streaming or real-time traffic. The application requirements decide the trade-off.",
    evaluation_points: ["Reliability/order versus lower overhead", "Practical examples", "Avoids claiming UDP is always faster"],
    resolution_title: "MDN Web Docs - HTTP Overview",
    resolution_url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-019",
    role_slug: "devops-engineer",
    domain: "Networking, DNS, HTTP and TLS",
    difficulty: "intermediate",
    question_type: "troubleshooting",
    prompt: "What do HTTP 502, 503 and 504 usually indicate in a reverse-proxy architecture?",
    preferred_answer: "A 502 generally means the proxy received an invalid response from an upstream. A 503 means the service is unavailable, overloaded, intentionally drained or has no healthy backends. A 504 means the proxy timed out waiting for an upstream response. The exact meaning should be confirmed in the proxy and application logs.",
    evaluation_points: ["Correct distinction", "Upstream perspective", "Checks logs and health rather than relying only on status code"],
    resolution_title: "MDN Web Docs - HTTP Overview",
    resolution_url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-020",
    role_slug: "devops-engineer",
    domain: "Networking, DNS, HTTP and TLS",
    difficulty: "intermediate",
    question_type: "operations",
    prompt: "How do you determine whether a Linux service is listening on the expected interface and port?",
    preferred_answer: "Inspect listening sockets and the owning process, then verify whether the socket is bound to loopback, a specific address or all interfaces. Test locally and from the required network path, and check host firewall, cloud security rules and container or Kubernetes port mappings. A listening process alone does not prove end-to-end reachability.",
    evaluation_points: ["Socket/process check", "Bind address", "Local versus remote test", "Firewall and network-layer checks"],
    resolution_title: "Red Hat Enterprise Linux - Troubleshooting with Log Files",
    resolution_url: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/assembly_troubleshooting-problems-using-log-files_configuring-basic-system-settings",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-021",
    role_slug: "devops-engineer",
    domain: "Networking, DNS, HTTP and TLS",
    difficulty: "intermediate",
    question_type: "security",
    prompt: "What does a TLS handshake establish before application data is exchanged?",
    preferred_answer: "The handshake negotiates protocol parameters and cryptographic algorithms, authenticates the server through its certificate chain, establishes shared session keys and verifies handshake integrity. Client authentication may also occur. Certificate validity, hostname matching and trust-chain verification are essential checks.",
    evaluation_points: ["Negotiation", "Authentication", "Key establishment", "Certificate/hostname trust"],
    resolution_title: "MDN Web Docs - Transport Layer Security",
    resolution_url: "https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-022",
    role_slug: "devops-engineer",
    domain: "Networking, DNS, HTTP and TLS",
    difficulty: "advanced",
    question_type: "design",
    prompt: "Why can a load balancer mark an instance unhealthy even though the application process is running?",
    preferred_answer: "The health-check path may return an error, time out, use the wrong port or protocol, depend on an unavailable downstream service, or be blocked by security rules. The process may also be alive but not ready to serve traffic. Compare load-balancer health-check settings with application readiness and inspect target logs and network paths.",
    evaluation_points: ["Process health versus service readiness", "Path/port/protocol", "Dependencies", "Security and logs"],
    resolution_title: "AWS - Elastic Load Balancing with Auto Scaling",
    resolution_url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-023",
    role_slug: "devops-engineer",
    domain: "Networking, DNS, HTTP and TLS",
    difficulty: "advanced",
    question_type: "concept",
    prompt: "How does container networking change the meaning of localhost?",
    preferred_answer: "Inside a container, localhost normally refers to that container's own network namespace, not the host or another container. Services communicate through published host ports, user-defined network DNS names or orchestration Services. Binding only to 127.0.0.1 inside the container can prevent traffic from reaching the application through the container interface.",
    evaluation_points: ["Network namespace", "Service discovery/published ports", "Bind-address consequence"],
    resolution_title: "Docker Docs - Networking Overview",
    resolution_url: "https://docs.docker.com/engine/network/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-024",
    role_slug: "devops-engineer",
    domain: "Networking, DNS, HTTP and TLS",
    difficulty: "scenario",
    question_type: "troubleshooting",
    prompt: "An API responds to curl on localhost but is unreachable from another machine. Give a diagnostic order.",
    preferred_answer: "Confirm the application bind address and listening port, then test the host's private address locally. Check the host firewall, cloud security group or network ACL, route and load-balancer listener, followed by DNS and TLS settings if a hostname is used. Use packet capture or connection logs only after the simpler layers are verified.",
    evaluation_points: ["Layered order", "Bind address first", "Host/cloud controls", "Routing and LB", "DNS/TLS", "Evidence-based escalation"],
    resolution_title: "AWS - Elastic Load Balancing with Auto Scaling",
    resolution_url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 4: GIT AND COLLABORATIVE VERSION CONTROL (DVO-025 TO DVO-032)
  // =========================================================================
  {
    id: "DVO-025",
    role_slug: "devops-engineer",
    domain: "Git and Collaborative Version Control",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "What is the difference between merging and rebasing a branch?",
    preferred_answer: "Merge combines histories and normally creates a merge commit when the branches have diverged. Rebase reapplies commits onto a new base, creating new commit identities and a linear-looking history. Rebasing private work can simplify history, but rebasing published shared commits can disrupt collaborators.",
    evaluation_points: ["History combination versus commit replay", "Commit identity changes", "Shared-history warning"],
    resolution_title: "Git Documentation - git rebase",
    resolution_url: "https://git-scm.com/docs/git-rebase",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-026",
    role_slug: "devops-engineer",
    domain: "Git and Collaborative Version Control",
    difficulty: "foundation",
    question_type: "recovery",
    prompt: "When should git revert be preferred over git reset?",
    preferred_answer: "Use revert to undo a change in shared history because it creates a new commit that records the inverse change. Reset moves a branch reference and may also change the index and working tree, so it is better suited to local or deliberately rewritten history. The chosen reset mode determines what is preserved.",
    evaluation_points: ["Shared-safe revert", "History-moving reset", "Mode awareness"],
    resolution_title: "Git Documentation - git revert",
    resolution_url: "https://git-scm.com/docs/git-revert",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-027",
    role_slug: "devops-engineer",
    domain: "Git and Collaborative Version Control",
    difficulty: "intermediate",
    question_type: "concept",
    prompt: "What does detached HEAD mean?",
    preferred_answer: "Detached HEAD means HEAD points directly to a commit rather than a named branch. New commits can be created, but they may become difficult to find if no branch or tag is created before moving away. It is useful for inspection and temporary experimentation when handled deliberately.",
    evaluation_points: ["Direct commit reference", "Risk to new commits", "Safe recovery by creating a branch"],
    resolution_title: "Git Documentation - git reset",
    resolution_url: "https://git-scm.com/docs/git-reset",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-028",
    role_slug: "devops-engineer",
    domain: "Git and Collaborative Version Control",
    difficulty: "intermediate",
    question_type: "operations",
    prompt: "When is cherry-pick appropriate, and what is its main trade-off?",
    preferred_answer: "Cherry-pick applies the change introduced by selected commits onto the current branch. It is useful for targeted backports or urgent fixes, but creates new commit identities and can duplicate logical changes across branches, which may complicate later merges. It should not replace a clear branching and release strategy.",
    evaluation_points: ["Targeted commit application", "New identity/duplication", "Sensible use cases"],
    resolution_title: "Git Documentation - git cherry-pick",
    resolution_url: "https://git-scm.com/docs/git-cherry-pick",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-029",
    role_slug: "devops-engineer",
    domain: "Git and Collaborative Version Control",
    difficulty: "intermediate",
    question_type: "troubleshooting",
    prompt: "How should a merge conflict be resolved safely?",
    preferred_answer: "Understand the intent of both sides before editing conflict markers, then build and test the integrated result rather than accepting one side mechanically. Stage only the resolved files, review the diff and complete the merge or rebase. If the resolution becomes unsafe, abort and return to the pre-operation state.",
    evaluation_points: ["Intent-based resolution", "Test integrated result", "Staged review", "Abort path"],
    resolution_title: "Git Documentation - git merge",
    resolution_url: "https://git-scm.com/docs/git-merge",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-030",
    role_slug: "devops-engineer",
    domain: "Git and Collaborative Version Control",
    difficulty: "advanced",
    question_type: "troubleshooting",
    prompt: "How does git bisect help locate a regression?",
    preferred_answer: "git bisect performs a binary search across commit history. Mark a known good and known bad commit, test the midpoint and continue classifying commits until Git identifies the first bad change. Automating the test command makes the search repeatable, but the test must reliably distinguish good from bad.",
    evaluation_points: ["Binary search", "Good/bad boundaries", "Automation", "Test reliability"],
    resolution_title: "Git Documentation - git bisect",
    resolution_url: "https://git-scm.com/docs/git-bisect",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-031",
    role_slug: "devops-engineer",
    domain: "Git and Collaborative Version Control",
    difficulty: "advanced",
    question_type: "security",
    prompt: "What can Git hooks enforce, and why should they not be the only control?",
    preferred_answer: "Hooks can run checks such as formatting, tests, commit-message validation or secret detection at lifecycle points. Client-side hooks can be bypassed or may not be installed, so critical policies must also run in central CI and protected-branch controls. Server-side hooks are stronger but still need maintainable policy design.",
    evaluation_points: ["Examples", "Bypass/installation limitation", "Central enforcement"],
    resolution_title: "Git Documentation - githooks",
    resolution_url: "https://git-scm.com/docs/githooks",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-032",
    role_slug: "devops-engineer",
    domain: "Git and Collaborative Version Control",
    difficulty: "scenario",
    question_type: "security",
    prompt: "A secret was committed and pushed to a public repository. What actions are required?",
    preferred_answer: "Revoke or rotate the credential immediately because removing the text does not invalidate copies. Assess access logs and downstream exposure, remove the secret from current and historical repository data where justified, coordinate force-push implications, and add preventive scanning and least-privilege credentials. Treat history rewriting as cleanup, not containment.",
    evaluation_points: ["Rotate first", "Investigate exposure", "History cleanup", "Collaborator coordination", "Prevention"],
    resolution_title: "GitHub Docs - Removing Sensitive Data from a Repository",
    resolution_url: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 5: CI/CD ARCHITECTURE AND RELEASE STRATEGIES (DVO-033 TO DVO-040)
  // =========================================================================
  {
    id: "DVO-033",
    role_slug: "devops-engineer",
    domain: "CI/CD Architecture and Release Strategies",
    difficulty: "foundation",
    question_type: "design",
    prompt: "What stages belong in a production-ready CI/CD pipeline?",
    preferred_answer: "A typical pipeline includes source validation, dependency resolution, build, unit tests, static checks, security checks, packaging, artefact publication, environment deployment, integration or acceptance tests and production promotion. The exact sequence depends on risk, but failures should be fast, evidence should be retained and the same artefact should move forward.",
    evaluation_points: ["Fast feedback", "Testing/security", "Immutable artefact", "Environment promotion", "Retained evidence"],
    resolution_title: "AWS Well-Architected - Operational Excellence Pillar",
    resolution_url: "https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-034",
    role_slug: "devops-engineer",
    domain: "CI/CD Architecture and Release Strategies",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "Why is build once, deploy many a useful principle?",
    preferred_answer: "The pipeline creates one versioned artefact and promotes that exact artefact through environments. This avoids environment-specific rebuild differences, improves traceability and makes rollback deterministic. Runtime configuration should be separated from the artefact and controlled independently.",
    evaluation_points: ["Same artefact", "Traceability", "No rebuild drift", "Configuration separation"],
    resolution_title: "DORA - Continuous Delivery Capability",
    resolution_url: "https://dora.dev/capabilities/continuous-delivery/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-035",
    role_slug: "devops-engineer",
    domain: "CI/CD Architecture and Release Strategies",
    difficulty: "intermediate",
    question_type: "design",
    prompt: "Compare rolling, blue-green and canary deployment strategies.",
    preferred_answer: "Rolling deployment gradually replaces old instances with new ones and is resource-efficient but temporarily runs mixed versions. Blue-green maintains two complete environments and switches traffic, enabling fast rollback at higher cost. Canary exposes a small traffic segment first and expands based on health signals, requiring strong routing and observability.",
    evaluation_points: ["Correct mechanism", "Rollback and cost trade-offs", "Mixed-version concern", "Observability for canary"],
    resolution_title: "Argo Rollouts Docs - Concepts",
    resolution_url: "https://argo-rollouts.readthedocs.io/en/stable/concepts/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },
  {
    id: "DVO-036",
    role_slug: "devops-engineer",
    domain: "CI/CD Architecture and Release Strategies",
    difficulty: "intermediate",
    question_type: "recovery",
    prompt: "When should a team roll back versus fix forward?",
    preferred_answer: "Rollback is preferred when a known-good artefact can safely restore service and data or schema changes remain compatible. Fix forward may be better when rollback is unsafe, state has already changed or a small correction is faster. Both paths should be tested, time-bounded and guided by customer impact rather than pride in the release.",
    evaluation_points: ["Data/schema compatibility", "Tested paths", "Time and impact based decision"],
    resolution_title: "Kubernetes Docs - Deployments",
    resolution_url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 6: JENKINS PIPELINES (DVO-041 TO DVO-048)
  // =========================================================================
  {
    id: "DVO-041",
    role_slug: "devops-engineer",
    domain: "Jenkins Pipelines",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "What is the difference between Declarative and Scripted Jenkins Pipeline?",
    preferred_answer: "Declarative Pipeline provides a structured, opinionated syntax with standard directives and easier validation. Scripted Pipeline uses Groovy flow control directly and offers more flexibility at the cost of complexity and weaker guardrails. Many teams use Declarative syntax and isolate complex reusable logic in shared libraries.",
    evaluation_points: ["Structure versus flexibility", "Maintainability trade-off", "Sensible reuse pattern"],
    resolution_title: "Jenkins Documentation - Pipeline Syntax",
    resolution_url: "https://www.jenkins.io/doc/book/pipeline/syntax/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 7: GITHUB ACTIONS (DVO-049 TO DVO-056)
  // =========================================================================
  {
    id: "DVO-049",
    role_slug: "devops-engineer",
    domain: "GitHub Actions",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "How are workflows, jobs and steps related in GitHub Actions?",
    preferred_answer: "A workflow is an automated process defined in YAML and triggered by repository events, schedules or manual input. It contains one or more jobs, and each job runs as a sequence of steps on a runner unless job dependencies or matrices create parallel execution. Steps can run shell commands or reusable actions.",
    evaluation_points: ["Correct hierarchy", "Triggers", "Runner execution", "Commands/actions"],
    resolution_title: "GitHub Actions Documentation",
    resolution_url: "https://docs.github.com/actions",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 8: DOCKER AND DOCKER COMPOSE (DVO-057 TO DVO-064)
  // =========================================================================
  {
    id: "DVO-057",
    role_slug: "devops-engineer",
    domain: "Docker and Docker Compose",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "What is the difference between a Docker image and a container?",
    preferred_answer: "An image is an immutable, layered package containing an application and its filesystem requirements. A container is a runtime instance of an image with its own writable layer, process isolation and configured resources. Containers can be replaced while persistent data is kept outside the writable layer.",
    evaluation_points: ["Immutable template versus runtime instance", "Writable layer", "External persistence"],
    resolution_title: "Docker Docs - Get Started",
    resolution_url: "https://docs.docker.com/get-started/docker-overview/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 9: KUBERNETES CORE CONCEPTS (DVO-065 TO DVO-072)
  // =========================================================================
  {
    id: "DVO-065",
    role_slug: "devops-engineer",
    domain: "Kubernetes Core Concepts",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "Name the main Kubernetes control-plane and node components and their roles.",
    preferred_answer: "The API server exposes the cluster API; etcd stores cluster state; the scheduler assigns unscheduled Pods; controller managers reconcile desired and actual state. On nodes, kubelet manages Pod execution, the container runtime runs containers and kube-proxy or an equivalent data plane supports Service networking.",
    evaluation_points: ["API server, etcd, scheduler, controllers", "kubelet/runtime/networking", "Reconciliation concept"],
    resolution_title: "Kubernetes Docs - Cluster Components",
    resolution_url: "https://kubernetes.io/docs/concepts/overview/components/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 10: KUBERNETES OPERATIONS AND HELM (DVO-073 TO DVO-080)
  // =========================================================================
  {
    id: "DVO-073",
    role_slug: "devops-engineer",
    domain: "Kubernetes Operations and Helm",
    difficulty: "foundation",
    question_type: "troubleshooting",
    prompt: "What does CrashLoopBackOff mean, and what should be checked first?",
    preferred_answer: "It means a container repeatedly starts, fails and is being restarted with increasing delay. Check Pod events, current and previous container logs, exit reason and code, command, configuration, mounted files, probes and resource limits. The backoff is a symptom, not the root cause.",
    evaluation_points: ["Events/logs including previous", "Exit reason", "Config/probes/resources", "Symptom distinction"],
    resolution_title: "Kubernetes Docs - Debug Running Pods",
    resolution_url: "https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 11: TERRAFORM AND INFRASTRUCTURE AS CODE (DVO-081 TO DVO-088)
  // =========================================================================
  {
    id: "DVO-081",
    role_slug: "devops-engineer",
    domain: "Terraform and Infrastructure as Code",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "Why does Terraform need state?",
    preferred_answer: "State maps configuration addresses to real infrastructure objects, stores metadata and helps Terraform calculate changes efficiently. It is operationally sensitive because it may contain resource details or secrets and controls future actions. Teams should use protected remote state, access control, backups and locking where supported.",
    evaluation_points: ["Mapping and diff role", "Sensitivity", "Remote protection and locking"],
    resolution_title: "HashiCorp Terraform Docs - State",
    resolution_url: "https://developer.hashicorp.com/terraform/language/state",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 12: ANSIBLE AND CONFIGURATION MANAGEMENT (DVO-089 TO DVO-096)
  // =========================================================================
  {
    id: "DVO-089",
    role_slug: "devops-engineer",
    domain: "Ansible and Configuration Management",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "How do inventory, play, task and module relate in Ansible?",
    preferred_answer: "Inventory defines managed hosts and groups. A play maps selected hosts to an ordered set of tasks, and each task invokes a module or action with parameters. A playbook contains one or more plays and can also include variables, roles and handlers.",
    evaluation_points: ["Correct object hierarchy", "Hosts-to-tasks mapping", "Module role"],
    resolution_title: "Ansible Docs - Basic Concepts",
    resolution_url: "https://docs.ansible.com/projects/ansible/latest/getting_started/basic_concepts.html",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 13: AWS AND CLOUD ARCHITECTURE (DVO-097 TO DVO-104)
  // =========================================================================
  {
    id: "DVO-097",
    role_slug: "devops-engineer",
    domain: "AWS and Cloud Architecture",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "What is the difference between an AWS Region and an Availability Zone?",
    preferred_answer: "A Region is a separate geographic area, while an Availability Zone is an isolated location within a Region made up of one or more data centres. Multi-AZ design protects against a single-AZ failure; multi-Region design addresses larger failures and latency or regulatory needs but adds complexity and cost.",
    evaluation_points: ["Geographic versus isolated zone", "Multi-AZ purpose", "Multi-Region trade-off"],
    resolution_title: "AWS - Regions and Availability Zones",
    resolution_url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 14: OBSERVABILITY AND SITE RELIABILITY ENGINEERING (DVO-105 TO DVO-112)
  // =========================================================================
  {
    id: "DVO-105",
    role_slug: "devops-engineer",
    domain: "Observability and Site Reliability Engineering",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "How do metrics, logs and traces complement each other?",
    preferred_answer: "Metrics provide efficient numerical trends and alert signals, logs record discrete events with context, and traces follow a request across distributed components. Metrics show that a problem exists, traces help locate the path and logs often explain local detail. Correlation identifiers and consistent labels make the three signals more useful together.",
    evaluation_points: ["Distinct strengths", "Diagnostic sequence", "Correlation"],
    resolution_title: "Grafana Docs - Fundamentals",
    resolution_url: "https://grafana.com/docs/grafana/latest/fundamentals/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // DOMAIN 15: DEVSECOPS AND INCIDENT RESPONSE (DVO-113 TO DVO-120)
  // =========================================================================
  {
    id: "DVO-113",
    role_slug: "devops-engineer",
    domain: "DevSecOps and Incident Response",
    difficulty: "foundation",
    question_type: "concept",
    prompt: "What does shift left mean in DevSecOps, and what does it not mean?",
    preferred_answer: "Shift left means introducing security feedback earlier in design, coding and build stages so issues are cheaper to prevent or fix. It does not mean moving all responsibility to developers or replacing runtime controls and security expertise. Security remains a shared, continuous lifecycle responsibility.",
    evaluation_points: ["Earlier feedback", "Shared responsibility", "Runtime/security-team controls remain"],
    resolution_title: "Red Hat - What is DevSecOps?",
    resolution_url: "https://www.redhat.com/en/topics/devops/what-is-devsecops",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // SECTION: 15 PRACTICAL ASSESSMENT LABS (LAB-01 TO LAB-15)
  // =========================================================================
  {
    id: "LAB-001",
    role_slug: "devops-engineer",
    domain: "DevOps Principles and Delivery Performance",
    difficulty: "scenario",
    question_type: "practical",
    prompt: "LAB-01 [PRACTICAL ASSESSMENT]: Delivery metrics baseline calculation and improvement experiment.",
    preferred_answer: "Task: Calculate deployment frequency, change lead time, change failure rate and failed deployment recovery time from a supplied month of deployment records. Explain one limitation in each measure and recommend one improvement experiment.\n\nExpected evidence: A one-page metric sheet with definitions, calculations, assumptions and an experiment linked to a bottleneck.\n\nScoring recommendation: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
    evaluation_points: ["Metric sheet with definitions & calculations", "Limitation stated per metric", "Experiment linked to identified bottleneck"],
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
    prompt: "LAB-02 [PRACTICAL ASSESSMENT]: Linux service recovery and systemd debugging.",
    preferred_answer: "Task: Create a systemd service for a simple application, intentionally break its environment or permissions, then diagnose the boot-time failure using status and journal evidence.\n\nExpected evidence: A corrected unit file, command transcript, root-cause statement and safe restart validation.\n\nScoring recommendation: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
    evaluation_points: ["Corrected unit file", "Command transcript & journalctl logs", "Root-cause statement", "Safe restart validation"],
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
    prompt: "LAB-03 [PRACTICAL ASSESSMENT]: DNS and TLS end-to-end diagnosis.",
    preferred_answer: "Task: Trace a request from DNS resolution through TCP connection and TLS certificate verification. Introduce one wrong DNS record or hostname mismatch and document the evidence.\n\nExpected evidence: A layer-by-layer diagnostic record showing where the failure occurs and how it was confirmed.\n\nScoring recommendation: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
    evaluation_points: ["Layer-by-layer diagnostic record", "Failure location confirmation", "Certificate verification logs"],
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
    preferred_answer: "Task: Create a repository with a known-good commit, introduce a regression, identify it with bisect and produce a safe revert on a shared branch.\n\nExpected evidence: Commit graph, bisect log, identified bad commit, revert commit and test evidence.\n\nScoring recommendation: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
    evaluation_points: ["Commit graph & bisect log", "Identified bad commit hash", "Safe revert commit on shared branch"],
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
    prompt: "LAB-05 [PRACTICAL ASSESSMENT]: Production release strategy design.",
    preferred_answer: "Task: Design a deployment pipeline for a customer-facing API using build-once promotion, automated gates and either blue-green or canary release.\n\nExpected evidence: Pipeline diagram, artefact identity, gate criteria, rollback/fix-forward decision and observability signals.\n\nScoring recommendation: 40% working outcome, 25% diagnostic evidence, 20% security/reliability judgement, 15% clarity and reproducibility.",
    evaluation_points: ["Pipeline diagram", "Artefact promotion identity", "Quality gate criteria", "Rollback/fix-forward decision tree"],
    resolution_title: "Argo Rollouts Docs - Concepts",
    resolution_url: "https://argo-rollouts.readthedocs.io/en/stable/concepts/",
    source_tier: "A",
    last_verified_at: "2026-07-28",
    status: "published"
  },

  // =========================================================================
  // OTHER CORE ROLES (FRONTEND, BACKEND, CYBERSECURITY, AI/DATA)
  // =========================================================================
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
