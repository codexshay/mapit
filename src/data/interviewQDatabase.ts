export interface InterviewQItem {
  id: string;
  role_slug: string;
  domain: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced' | 'scenario' | string;
  question_type: string;
  prompt: string;
  preferred_answer: string;
  evaluation_points: string[];
  resolution_title: string;
  resolution_url: string;
  source_tier: 'A' | 'B' | 'C' | string;
  last_verified_at: string;
  status: 'published' | 'draft' | string;
}

export const interviewQDatabase: InterviewQItem[] = [
  {
    "id": "DVO-001",
    "role_slug": "devops-engineer",
    "domain": "DevOps Principles and Delivery Performance",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "What is DevOps, and why is it not simply a job title or a collection of tools?",
    "preferred_answer": "DevOps is an operating approach that joins software development and operations through shared  ownership, fast feedback, automation and continuous improvement. Tools enable the approach, but the outcome is a safer  and faster flow of changes from idea to production, with reliability treated as a product responsibility.",
    "evaluation_points": [
      "Shared responsibility",
      "flow and feedback",
      "automation",
      "measurable delivery and reliability outcomes."
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
    "preferred_answer": "Continuous integration means developers merge small changes frequently and validate them  automatically. Continuous delivery keeps every validated change in a deployable state but may retain a manual production  decision. Continuous deployment automatically releases every change that passes the defined controls.",
    "evaluation_points": [
      "Correct separation of integration",
      "deployability and automatic production release",
      "no claim that CD always  means automatic deployment."
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
    "preferred_answer": "A strong answer covers deployment frequency, change lead time, change failure rate, failed deployment  recovery time and deployment rework rate. Together they reveal throughput, speed, instability, recovery capability and the  amount of avoidable repair work. They should be used for system improvement, not individual ranking.",
    "evaluation_points": [
      "Names the current DORA measures",
      "connects each metric to a behaviour",
      "warns against weaponising  metrics."
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
    "preferred_answer": "Smaller changes reduce review scope, merge risk and the number of variables involved when something  fails. They produce faster feedback, make rollback or fix-forward easier and help teams release more frequently without  necessarily increasing risk. Small batches require good test automation and deployment discipline.",
    "evaluation_points": [
      "Reduced risk and diagnostic scope",
      "faster feedback",
      "easier recovery",
      "recognises enabling practices."
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
    "preferred_answer": "Infrastructure as code expresses desired infrastructure in versioned, reviewable definitions rather than  relying on undocumented manual changes. It improves repeatability, auditability, peer review, environment consistency and  disaster recovery. It does not remove the need for testing, state protection or change controls.",
    "evaluation_points": [
      "Versioning and repeatability",
      "review/audit",
      "drift reduction",
      "realistic limitations."
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
    "question_type": "reliability",
    "prompt": "How does an error budget help balance release velocity and reliability?",
    "preferred_answer": "An error budget is the amount of unreliability permitted by an agreed service level objective. When the  service is comfortably within budget, the team can take more delivery risk; when the budget is exhausted, reliability work and  tighter change controls take priority. It converts a subjective argument into a shared product decision.",
    "evaluation_points": [
      "Links error budget to SLO",
      "explains decision use",
      "avoids treating it as a target for downtime."
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
    "preferred_answer": "Toil is repetitive, manual, operational work that is automatable, tactical, has little enduring value and  tends to grow with service scale. Teams should measure recurring effort, prioritise high-frequency or high-risk tasks and  automate where the lifecycle benefit exceeds the build and maintenance cost. Not every manual task is toil.",
    "evaluation_points": [
      "Accurate definition",
      "prioritisation by frequency/risk/value",
      "recognises automation cost."
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
    "question_type": "diagnosis",
    "prompt": "A team deploys once a month, changes often fail, and recovery takes hours. What improvement  sequence would you propose?",
    "preferred_answer": "First map the delivery value stream and establish trustworthy baseline metrics. Reduce batch size, add  fast automated tests and reproducible builds, standardise environments, introduce progressive delivery and create a tested  rollback or fix-forward path. Improve observability and post-incident learning before trying to increase deployment frequency  aggressively.",
    "evaluation_points": [
      "Baseline first",
      "bottleneck-oriented sequence",
      "testing and reproducibility",
      "safe release and recovery",
      "no  single-tool answer."
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
    "preferred_answer": "A process has its own virtual address space and operating-system resources, while threads within a  process share most of that process memory and resources. Threads are lighter to create and communicate through shared  memory, but a fault or unsafe shared-state change can affect the whole process.",
    "evaluation_points": [
      "Separate process address spaces",
      "shared thread resources",
      "performance and isolation trade-off."
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
    "preferred_answer": "systemd provides a declared unit, dependency ordering, controlled startup and shutdown, restart policy,  status tracking and centralised logs. A daemon launched manually may not be known to systemd, so service status, restart  and boot-time behaviour become unreliable or inconsistent.",
    "evaluation_points": [
      "Lifecycle supervision",
      "dependencies and restart",
      "boot persistence",
      "status/log integration."
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
    "question_type": "command line",
    "prompt": "Explain the meaning of file modes 644 and 755.",
    "preferred_answer": "Mode 644 gives the owner read and write permissions, while group and others receive read only. Mode  755 gives the owner read, write and execute, while group and others receive read and execute. Directory execute permission  controls traversal, so the effect differs from an ordinary file.",
    "evaluation_points": [
      "Correct owner/group/other mapping",
      "octal interpretation",
      "directory traversal nuance."
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
    "question_type": "filesystem",
    "prompt": "How do hard links and symbolic links differ?",
    "preferred_answer": "A hard link is another directory entry for the same inode and normally cannot cross filesystems or link  directories. A symbolic link stores a path to another object, can cross filesystems and can become dangling if the target  moves or disappears. Deleting one hard-link name does not remove the data while another link remains.",
    "evaluation_points": [
      "Inode versus path",
      "filesystem limitation",
      "dangling symlink",
      "deletion behaviour."
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
    "preferred_answer": "Confirm whether the load is CPU pressure, runnable tasks or uninterruptible I/O wait. Inspect CPU  utilisation, run queue, memory and swap pressure, disk latency, blocked processes, recent deployments and application-level  saturation. High load alone does not prove CPU shortage.",
    "evaluation_points": [
      "Separates CPU from I/O and blocked tasks",
      "checks memory/disk/processes",
      "correlates with change  history."
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
    "prompt": "The filesystem is full according to df, but du cannot account for the used space. What is a likely  cause?",
    "preferred_answer": "A common cause is a large file that was deleted from the directory tree but is still open by a running  process. The blocks remain allocated until the process closes the file or restarts. Check open deleted files, confirm the  owning process, then rotate or restart safely rather than deleting more files blindly.",
    "evaluation_points": [
      "Identifies deleted-but-open file",
      "explains block retention",
      "proposes safe verification and remediation."
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
    "preferred_answer": "SIGTERM requests graceful termination and allows an application to flush buffers, close connections and  release resources. SIGKILL cannot be caught or handled and should be a last resort when the process cannot terminate  normally. A production stop procedure should allow a bounded grace period before escalation.",
    "evaluation_points": [
      "Graceful handling versus forced termination",
      "data/connection implications",
      "bounded escalation."
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
    "question_type": "diagnosis",
    "prompt": "A custom service runs when started manually but fails after reboot. How would you diagnose it?",
    "preferred_answer": "Inspect the systemd unit, status and journal for the boot attempt. Verify the executable path, user,  working directory, environment variables, file permissions, dependencies and network readiness; then use explicit unit  directives rather than shell-profile assumptions. Reload units, enable the service and retest through a controlled reboot.",
    "evaluation_points": [
      "Uses systemctl/journalctl",
      "checks environment and permissions",
      "dependencies/order",
      "daemon reload and  enable."
    ],
    "resolution_title": "Red Hat Enterprise Linux - Working with systemd Unit Files",
    "resolution_url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/using_systemd_unit_files_to_customize_and_optimize_your_system/assembly_working-with-systemd-unit-files_working-with-systemd",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-017",
    "role_slug": "devops-engineer",
    "domain": "Networking, DNS, HTTP and TLS",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "Describe the main steps that occur when a client resolves a domain name.",
    "preferred_answer": "The client checks local and operating-system caches, then asks a recursive resolver. If the answer is not  cached, the resolver follows the DNS hierarchy through root, top-level-domain and authoritative name servers, returns the  record and caches it according to its TTL. Exact behaviour can vary with local resolvers and record types.",
    "evaluation_points": [
      "Cache",
      "recursive resolver",
      "hierarchical lookup",
      "authoritative answer",
      "TTL."
    ],
    "resolution_title": "Cloudflare Learning Center - What is DNS?",
    "resolution_url": "https://www.cloudflare.com/learning/dns/what-is-dns/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-018",
    "role_slug": "devops-engineer",
    "domain": "Networking, DNS, HTTP and TLS",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "When would you choose TCP instead of UDP?",
    "preferred_answer": "TCP is appropriate when ordered, reliable delivery and congestion control matter, such as HTTP over  TCP or database sessions. UDP has lower protocol overhead and supports latency-sensitive or application-managed  reliability use cases, such as DNS queries, streaming or real-time traffic. The application requirements decide the trade-off.",
    "evaluation_points": [
      "Reliability/order versus lower overhead",
      "practical examples",
      "avoids claiming UDP is always faster."
    ],
    "resolution_title": "MDN Web Docs - HTTP Overview",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-019",
    "role_slug": "devops-engineer",
    "domain": "Networking, DNS, HTTP and TLS",
    "difficulty": "intermediate",
    "question_type": "troubleshooting",
    "prompt": "What do HTTP 502, 503 and 504 usually indicate in a reverse-proxy architecture?",
    "preferred_answer": "A 502 generally means the proxy received an invalid response from an upstream. A 503 means the  service is unavailable, overloaded, intentionally drained or has no healthy backends. A 504 means the proxy timed out  waiting for an upstream response. The exact meaning should be confirmed in the proxy and application logs.",
    "evaluation_points": [
      "Correct distinction",
      "upstream perspective",
      "checks logs and health rather than relying only on status code."
    ],
    "resolution_title": "MDN Web Docs - HTTP Overview",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-020",
    "role_slug": "devops-engineer",
    "domain": "Networking, DNS, HTTP and TLS",
    "difficulty": "intermediate",
    "question_type": "operations",
    "prompt": "How do you determine whether a Linux service is listening on the expected interface and port?",
    "preferred_answer": "Inspect listening sockets and the owning process, then verify whether the socket is bound to loopback, a  specific address or all interfaces. Test locally and from the required network path, and check host firewall, cloud security rules  and container or Kubernetes port mappings. A listening process alone does not prove end-to-end reachability.",
    "evaluation_points": [
      "Socket/process check",
      "bind address",
      "local versus remote test",
      "firewall and network-layer checks."
    ],
    "resolution_title": "Red Hat Enterprise Linux - Troubleshooting with Log Files",
    "resolution_url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/assembly_troubleshooting-problems-using-log-files_configuring-basic-system-settings",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-021",
    "role_slug": "devops-engineer",
    "domain": "Networking, DNS, HTTP and TLS",
    "difficulty": "intermediate",
    "question_type": "security",
    "prompt": "What does a TLS handshake establish before application data is exchanged?",
    "preferred_answer": "The handshake negotiates protocol parameters and cryptographic algorithms, authenticates the server  through its certificate chain, establishes shared session keys and verifies handshake integrity. Client authentication may also  occur. Certificate validity, hostname matching and trust-chain verification are essential checks.",
    "evaluation_points": [
      "Negotiation",
      "authentication",
      "key establishment",
      "certificate/hostname trust."
    ],
    "resolution_title": "MDN Web Docs - Transport Layer Security",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-022",
    "role_slug": "devops-engineer",
    "domain": "Networking, DNS, HTTP and TLS",
    "difficulty": "advanced",
    "question_type": "architecture",
    "prompt": "Why can a load balancer mark an instance unhealthy even though the application process is  running?",
    "preferred_answer": "The health-check path may return an error, time out, use the wrong port or protocol, depend on an  unavailable downstream service, or be blocked by security rules. The process may also be alive but not ready to serve traffic.  Compare load-balancer health-check settings with application readiness and inspect target logs and network paths.",
    "evaluation_points": [
      "Process health versus service readiness",
      "path/port/protocol",
      "dependencies",
      "security and logs."
    ],
    "resolution_title": "AWS - Elastic Load Balancing with Auto Scaling",
    "resolution_url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-023",
    "role_slug": "devops-engineer",
    "domain": "Networking, DNS, HTTP and TLS",
    "difficulty": "advanced",
    "question_type": "containers",
    "prompt": "How does container networking change the meaning of localhost?",
    "preferred_answer": "Inside a container, localhost normally refers to that container's own network namespace, not the host or  another container. Services communicate through published host ports, user-defined network DNS names or orchestration  Services. Binding only to 127.0.0.1 inside the container can prevent traffic from reaching the application through the container  interface.",
    "evaluation_points": [
      "Network namespace",
      "service discovery/published ports",
      "bind-address consequence."
    ],
    "resolution_title": "Docker Docs - Networking Overview",
    "resolution_url": "https://docs.docker.com/engine/network/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-024",
    "role_slug": "devops-engineer",
    "domain": "Networking, DNS, HTTP and TLS",
    "difficulty": "scenario",
    "question_type": "diagnosis",
    "prompt": "An API responds to curl on localhost but is unreachable from another machine. Give a diagnostic  order.",
    "preferred_answer": "Confirm the application bind address and listening port, then test the host's private address locally. Check  the host firewall, cloud security group or network ACL, route and load-balancer listener, followed by DNS and TLS settings if  a hostname is used. Use packet capture or connection logs only after the simpler layers are verified.",
    "evaluation_points": [
      "Layered order",
      "bind address first",
      "host/cloud controls",
      "routing and LB",
      "DNS/TLS",
      "evidence-based  escalation."
    ],
    "resolution_title": "AWS - Elastic Load Balancing with Auto Scaling",
    "resolution_url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-025",
    "role_slug": "devops-engineer",
    "domain": "Git and Collaborative Version Control",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "What is the difference between merging and rebasing a branch?",
    "preferred_answer": "Merge combines histories and normally creates a merge commit when the branches have diverged.  Rebase reapplies commits onto a new base, creating new commit identities and a linear-looking history. Rebasing private  work can simplify history, but rebasing published shared commits can disrupt collaborators.",
    "evaluation_points": [
      "History combination versus commit replay",
      "commit identity changes",
      "shared-history warning."
    ],
    "resolution_title": "Git Documentation - git rebase",
    "resolution_url": "https://git-scm.com/docs/git-rebase",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-026",
    "role_slug": "devops-engineer",
    "domain": "Git and Collaborative Version Control",
    "difficulty": "foundation",
    "question_type": "recovery",
    "prompt": "When should git revert be preferred over git reset?",
    "preferred_answer": "Use revert to undo a change in shared history because it creates a new commit that records the inverse  change. Reset moves a branch reference and may also change the index and working tree, so it is better suited to local or  deliberately rewritten history. The chosen reset mode determines what is preserved.",
    "evaluation_points": [
      "Shared-safe revert",
      "history-moving reset",
      "mode awareness."
    ],
    "resolution_title": "Git Documentation - git revert",
    "resolution_url": "https://git-scm.com/docs/git-revert",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-027",
    "role_slug": "devops-engineer",
    "domain": "Git and Collaborative Version Control",
    "difficulty": "intermediate",
    "question_type": "concept",
    "prompt": "What does detached HEAD mean?",
    "preferred_answer": "Detached HEAD means HEAD points directly to a commit rather than a named branch. New commits can  be created, but they may become difficult to find if no branch or tag is created before moving away. It is useful for inspection  and temporary experimentation when handled deliberately.",
    "evaluation_points": [
      "Direct commit reference",
      "risk to new commits",
      "safe recovery by creating a branch."
    ],
    "resolution_title": "Git Documentation - git reset",
    "resolution_url": "https://git-scm.com/docs/git-reset",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-028",
    "role_slug": "devops-engineer",
    "domain": "Git and Collaborative Version Control",
    "difficulty": "intermediate",
    "question_type": "operations",
    "prompt": "When is cherry-pick appropriate, and what is its main trade-off?",
    "preferred_answer": "Cherry-pick applies the change introduced by selected commits onto the current branch. It is useful for  targeted backports or urgent fixes, but creates new commit identities and can duplicate logical changes across branches,  which may complicate later merges. It should not replace a clear branching and release strategy.",
    "evaluation_points": [
      "Targeted commit application",
      "new identity/duplication",
      "sensible use cases."
    ],
    "resolution_title": "Git Documentation - git cherry-pick",
    "resolution_url": "https://git-scm.com/docs/git-cherry-pick",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-029",
    "role_slug": "devops-engineer",
    "domain": "Git and Collaborative Version Control",
    "difficulty": "intermediate",
    "question_type": "troubleshooting",
    "prompt": "How should a merge conflict be resolved safely?",
    "preferred_answer": "Understand the intent of both sides before editing conflict markers, then build and test the integrated  result rather than accepting one side mechanically. Stage only the resolved files, review the diff and complete the merge or  rebase. If the resolution becomes unsafe, abort and return to the pre-operation state.",
    "evaluation_points": [
      "Intent-based resolution",
      "test integrated result",
      "staged review",
      "abort path."
    ],
    "resolution_title": "Git Documentation - git merge",
    "resolution_url": "https://git-scm.com/docs/git-merge",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-030",
    "role_slug": "devops-engineer",
    "domain": "Git and Collaborative Version Control",
    "difficulty": "advanced",
    "question_type": "diagnosis",
    "prompt": "How does git bisect help locate a regression?",
    "preferred_answer": "git bisect performs a binary search across commit history. Mark a known good and known bad commit,  test the midpoint and continue classifying commits until Git identifies the first bad change. Automating the test command  makes the search repeatable, but the test must reliably distinguish good from bad.",
    "evaluation_points": [
      "Binary search",
      "good/bad boundaries",
      "automation",
      "test reliability."
    ],
    "resolution_title": "Git Documentation - git bisect",
    "resolution_url": "https://git-scm.com/docs/git-bisect",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-031",
    "role_slug": "devops-engineer",
    "domain": "Git and Collaborative Version Control",
    "difficulty": "advanced",
    "question_type": "governance",
    "prompt": "What can Git hooks enforce, and why should they not be the only control?",
    "preferred_answer": "Hooks can run checks such as formatting, tests, commit-message validation or secret detection at  lifecycle points. Client-side hooks can be bypassed or may not be installed, so critical policies must also run in central CI and  protected-branch controls. Server-side hooks are stronger but still need maintainable policy design.",
    "evaluation_points": [
      "Examples",
      "bypass/installation limitation",
      "central enforcement."
    ],
    "resolution_title": "Git Documentation - githooks",
    "resolution_url": "https://git-scm.com/docs/githooks",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-032",
    "role_slug": "devops-engineer",
    "domain": "Git and Collaborative Version Control",
    "difficulty": "scenario",
    "question_type": "security",
    "prompt": "A secret was committed and pushed to a public repository. What actions are required?",
    "preferred_answer": "Revoke or rotate the credential immediately because removing the text does not invalidate copies.  Assess access logs and downstream exposure, remove the secret from current and historical repository data where justified,  coordinate force-push implications, and add preventive scanning and least-privilege credentials. Treat history rewriting as  cleanup, not containment.",
    "evaluation_points": [
      "Rotate first",
      "investigate exposure",
      "history cleanup",
      "collaborator coordination",
      "prevention."
    ],
    "resolution_title": "GitHub Docs - Removing Sensitive Data from a Repository",
    "resolution_url": "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-033",
    "role_slug": "devops-engineer",
    "domain": "CI/CD Architecture and Release Strategies",
    "difficulty": "foundation",
    "question_type": "design",
    "prompt": "What stages belong in a production-ready CI/CD pipeline?",
    "preferred_answer": "A typical pipeline includes source validation, dependency resolution, build, unit tests, static checks,  security checks, packaging, artefact publication, environment deployment, integration or acceptance tests and production  promotion. The exact sequence depends on risk, but failures should be fast, evidence should be retained and the same  artefact should move forward.",
    "evaluation_points": [
      "Fast feedback",
      "testing/security",
      "immutable artefact",
      "environment promotion",
      "retained evidence."
    ],
    "resolution_title": "AWS Well-Architected - Operational Excellence Pillar",
    "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-034",
    "role_slug": "devops-engineer",
    "domain": "CI/CD Architecture and Release Strategies",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "Why is build once, deploy many a useful principle?",
    "preferred_answer": "The pipeline creates one versioned artefact and promotes that exact artefact through environments. This  avoids environment-specific rebuild differences, improves traceability and makes rollback deterministic. Runtime  configuration should be separated from the artefact and controlled independently.",
    "evaluation_points": [
      "Same artefact",
      "traceability",
      "no rebuild drift",
      "configuration separation."
    ],
    "resolution_title": "DORA - Continuous Delivery Capability",
    "resolution_url": "https://dora.dev/capabilities/continuous-delivery/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-035",
    "role_slug": "devops-engineer",
    "domain": "CI/CD Architecture and Release Strategies",
    "difficulty": "intermediate",
    "question_type": "design",
    "prompt": "Compare rolling, blue-green and canary deployment strategies.",
    "preferred_answer": "Rolling deployment gradually replaces old instances with new ones and is resource-efficient but  temporarily runs mixed versions. Blue-green maintains two complete environments and switches traffic, enabling fast rollback  at higher cost. Canary exposes a small traffic segment first and expands based on health signals, requiring strong routing  and observability.",
    "evaluation_points": [
      "Correct mechanism",
      "rollback and cost trade-offs",
      "mixed-version concern",
      "observability for canary."
    ],
    "resolution_title": "Argo Rollouts Docs - Concepts",
    "resolution_url": "https://argo-rollouts.readthedocs.io/en/stable/concepts/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-036",
    "role_slug": "devops-engineer",
    "domain": "CI/CD Architecture and Release Strategies",
    "difficulty": "intermediate",
    "question_type": "recovery",
    "prompt": "When should a team roll back versus fix forward?",
    "preferred_answer": "Rollback is preferred when a known-good artefact can safely restore service and data or schema  changes remain compatible. Fix forward may be better when rollback is unsafe, state has already changed or a small  correction is faster. Both paths should be tested, time-bounded and guided by customer impact rather than pride in the  release.",
    "evaluation_points": [
      "Data/schema compatibility",
      "tested paths",
      "time and impact based decision."
    ],
    "resolution_title": "Kubernetes Docs - Deployments",
    "resolution_url": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-037",
    "role_slug": "devops-engineer",
    "domain": "CI/CD Architecture and Release Strategies",
    "difficulty": "intermediate",
    "question_type": "quality",
    "prompt": "What makes a quality gate useful rather than bureaucratic?",
    "preferred_answer": "A useful gate evaluates automated, risk-relevant evidence such as test results, vulnerability severity,  policy compliance, reliability checks and deployment readiness. It is fast, transparent, versioned and has a clear exception  path. A gate that produces frequent false failures or requires manual approval without information becomes a queue rather  than a control.",
    "evaluation_points": [
      "Risk-linked evidence",
      "automation",
      "transparency",
      "exception policy",
      "false-positive awareness."
    ],
    "resolution_title": "AWS Well-Architected - Operational Excellence Pillar",
    "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-038",
    "role_slug": "devops-engineer",
    "domain": "CI/CD Architecture and Release Strategies",
    "difficulty": "advanced",
    "question_type": "governance",
    "prompt": "How should production approvals be designed?",
    "preferred_answer": "Approvals should protect genuinely high-risk transitions, use named environments and least-privilege  reviewers, expose the artefact and test evidence, and be auditable. They should not compensate for weak automation or  require a broad committee for routine low-risk changes. Progressive delivery and policy-as-code can reduce unnecessary  manual waiting.",
    "evaluation_points": [
      "Risk-based",
      "evidence-rich",
      "least privilege",
      "audit",
      "avoids blanket manual gates."
    ],
    "resolution_title": "GitHub Docs - Managing Deployment Environments",
    "resolution_url": "https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-039",
    "role_slug": "devops-engineer",
    "domain": "CI/CD Architecture and Release Strategies",
    "difficulty": "advanced",
    "question_type": "reliability",
    "prompt": "How do feature flags reduce deployment risk, and what new risks do they introduce?",
    "preferred_answer": "Feature flags separate code deployment from feature exposure, enable gradual rollout and provide a fast  disable path. They also add configuration complexity, stale branches, test combinations and potential access-control  mistakes. Flags need ownership, expiry, observability and secure evaluation.",
    "evaluation_points": [
      "Deployment-release separation",
      "gradual exposure",
      "kill switch",
      "lifecycle and complexity risks."
    ],
    "resolution_title": "DORA - Continuous Delivery Capability",
    "resolution_url": "https://dora.dev/capabilities/continuous-delivery/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-040",
    "role_slug": "devops-engineer",
    "domain": "CI/CD Architecture and Release Strategies",
    "difficulty": "scenario",
    "question_type": "diagnosis",
    "prompt": "A pipeline passes consistently, but production failures remain frequent. What would you examine?",
    "preferred_answer": "Check whether tests represent real production behaviour, whether the deployed artefact is identical to the  tested one, and whether configuration, data migrations, dependencies and infrastructure changes are validated. Examine  flaky or ignored tests, observability gaps, release size and incident patterns. Passing checks only prove the conditions the  pipeline actually evaluates.",
    "evaluation_points": [
      "Test realism",
      "artefact identity",
      "config/schema/dependency checks",
      "release size",
      "incident feedback loop."
    ],
    "resolution_title": "DORA - Software Delivery Performance Metrics",
    "resolution_url": "https://dora.dev/guides/dora-metrics/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-041",
    "role_slug": "devops-engineer",
    "domain": "Jenkins Pipelines",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "What is the difference between Declarative and Scripted Jenkins Pipeline?",
    "preferred_answer": "Declarative Pipeline provides a structured, opinionated syntax with standard directives and easier  validation. Scripted Pipeline uses Groovy flow control directly and offers more flexibility at the cost of complexity and weaker  guardrails. Many teams use Declarative syntax and isolate complex reusable logic in shared libraries.",
    "evaluation_points": [
      "Structure versus flexibility",
      "maintainability trade-off",
      "sensible reuse pattern."
    ],
    "resolution_title": "Jenkins Documentation - Pipeline Syntax",
    "resolution_url": "https://www.jenkins.io/doc/book/pipeline/syntax/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-042",
    "role_slug": "devops-engineer",
    "domain": "Jenkins Pipelines",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "What is a Jenkins agent, and why should builds not all run on the controller?",
    "preferred_answer": "An agent provides an execution environment for pipeline work. Keeping heavy builds off the controller  improves security, stability and scalability because the controller should coordinate jobs rather than execute untrusted or  resource-intensive workloads. Agents should be isolated, reproducible and labelled by capability.",
    "evaluation_points": [
      "Execution role",
      "controller protection",
      "scalability",
      "reproducible agents."
    ],
    "resolution_title": "Jenkins Documentation - Using a Jenkinsfile",
    "resolution_url": "https://www.jenkins.io/doc/book/pipeline/jenkinsfile/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-043",
    "role_slug": "devops-engineer",
    "domain": "Jenkins Pipelines",
    "difficulty": "intermediate",
    "question_type": "design",
    "prompt": "How do stages, steps and post conditions work in a Declarative Pipeline?",
    "preferred_answer": "Stages group meaningful phases such as build, test and deploy; steps are the actual operations inside a  stage. Post conditions run actions based on outcomes such as success, failure or always, which is useful for cleanup, reports  and notifications. A good pipeline makes stage boundaries and failure ownership visible.",
    "evaluation_points": [
      "Correct hierarchy",
      "outcome-based post actions",
      "operational visibility."
    ],
    "resolution_title": "Jenkins Documentation - Pipeline Syntax",
    "resolution_url": "https://www.jenkins.io/doc/book/pipeline/syntax/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-044",
    "role_slug": "devops-engineer",
    "domain": "Jenkins Pipelines",
    "difficulty": "intermediate",
    "question_type": "security",
    "prompt": "How should credentials be used in a Jenkinsfile?",
    "preferred_answer": "Store credentials in Jenkins credential storage and bind them only to the minimum scope and duration  required by a step. Avoid hard-coding, echoing or exposing secrets through command arguments, archived files or logs.  Restrict who can configure credentials and prefer short-lived identities where integrations support them.",
    "evaluation_points": [
      "Credential store",
      "minimal scope",
      "masking is not enough",
      "permissions and short-lived credentials."
    ],
    "resolution_title": "Jenkins Documentation - Using Credentials",
    "resolution_url": "https://www.jenkins.io/doc/book/using/using-credentials/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-045",
    "role_slug": "devops-engineer",
    "domain": "Jenkins Pipelines",
    "difficulty": "intermediate",
    "question_type": "artifacts",
    "prompt": "What is the difference between stashing files and archiving artefacts in Jenkins?",
    "preferred_answer": "Stash and unstash are primarily for transferring files between stages or agents within the same pipeline  run. Archiving preserves selected build outputs for later retrieval and traceability after the run. Large binary distribution should  generally use a dedicated artefact repository rather than Jenkins controller storage.",
    "evaluation_points": [
      "In-run transfer versus retained output",
      "scope/lifetime",
      "external repository for scale."
    ],
    "resolution_title": "Jenkins Documentation - Using a Jenkinsfile",
    "resolution_url": "https://www.jenkins.io/doc/book/pipeline/jenkinsfile/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-046",
    "role_slug": "devops-engineer",
    "domain": "Jenkins Pipelines",
    "difficulty": "advanced",
    "question_type": "performance",
    "prompt": "When is parallel execution appropriate in a Jenkins pipeline?",
    "preferred_answer": "Parallel stages are useful when tasks are independent, such as test suites across platforms. They can  reduce lead time, but require enough agent capacity, isolated workspaces, deterministic tests and sensible failure behaviour.  Parallelising a bottleneck that depends on a shared mutable resource can make the pipeline less reliable.",
    "evaluation_points": [
      "Independence",
      "capacity",
      "isolation",
      "deterministic tests",
      "shared-resource warning."
    ],
    "resolution_title": "Jenkins Documentation - Pipeline Syntax",
    "resolution_url": "https://www.jenkins.io/doc/book/pipeline/syntax/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-047",
    "role_slug": "devops-engineer",
    "domain": "Jenkins Pipelines",
    "difficulty": "advanced",
    "question_type": "maintainability",
    "prompt": "What belongs in a Jenkins Shared Library?",
    "preferred_answer": "A shared library should contain stable, reusable pipeline capabilities such as standard build steps, policy  checks, deployment functions and organisational defaults. Application-specific decisions and hidden business logic should  remain visible near the application pipeline. Libraries need versioning, tests, documentation and controlled changes.",
    "evaluation_points": [
      "Reusable standards",
      "avoids hiding app-specific logic",
      "version/test/documentation."
    ],
    "resolution_title": "Jenkins Documentation - Using a Jenkinsfile",
    "resolution_url": "https://www.jenkins.io/doc/book/pipeline/jenkinsfile/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-048",
    "role_slug": "devops-engineer",
    "domain": "Jenkins Pipelines",
    "difficulty": "scenario",
    "question_type": "diagnosis",
    "prompt": "Jobs remain queued even though Jenkins is online. How would you investigate?",
    "preferred_answer": "Inspect queue reasons, node status, executor availability, labels, offline causes and resource limits.  Verify that the pipeline agent expression matches an available node and that cloud or ephemeral agents can provision. Then  check controller logs, plugin failures, workspace locks and external capacity quotas before increasing executors blindly.",
    "evaluation_points": [
      "Queue reason first",
      "labels/executors",
      "provisioning",
      "logs/plugins/quotas",
      "no blind scaling."
    ],
    "resolution_title": "Jenkins Documentation - Using a Jenkinsfile",
    "resolution_url": "https://www.jenkins.io/doc/book/pipeline/jenkinsfile/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-049",
    "role_slug": "devops-engineer",
    "domain": "GitHub Actions",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "How are workflows, jobs and steps related in GitHub Actions?",
    "preferred_answer": "A workflow is an automated process defined in YAML and triggered by repository events, schedules or  manual input. It contains one or more jobs, and each job runs as a sequence of steps on a runner unless job dependencies  or matrices create parallel execution. Steps can run shell commands or reusable actions.",
    "evaluation_points": [
      "Correct hierarchy",
      "triggers",
      "runner execution",
      "commands/actions."
    ],
    "resolution_title": "GitHub Actions Documentation",
    "resolution_url": "https://docs.github.com/actions",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-050",
    "role_slug": "devops-engineer",
    "domain": "GitHub Actions",
    "difficulty": "foundation",
    "question_type": "design",
    "prompt": "What is a matrix strategy used for?",
    "preferred_answer": "A matrix generates multiple job variations from combinations such as operating system, runtime version  or configuration. It is useful for compatibility testing and controlled parallelism. Include or exclude rules and fail-fast behaviour  should be designed to avoid unnecessary cost and confusing failures.",
    "evaluation_points": [
      "Variation generation",
      "compatibility use",
      "include/exclude",
      "cost/failure behaviour."
    ],
    "resolution_title": "GitHub Docs - Workflow Syntax for GitHub Actions",
    "resolution_url": "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-051",
    "role_slug": "devops-engineer",
    "domain": "GitHub Actions",
    "difficulty": "intermediate",
    "question_type": "artifacts",
    "prompt": "Differentiate workflow artefacts from dependency caches.",
    "preferred_answer": "Artefacts preserve build outputs, reports or files for sharing between jobs and later retrieval. Caches  speed repeated workflows by reusing dependencies or generated data, but the workflow must still succeed on a cache miss.  Treating a cache as the authoritative build artefact weakens reproducibility.",
    "evaluation_points": [
      "Retention/sharing versus acceleration",
      "cache miss tolerance",
      "reproducibility."
    ],
    "resolution_title": "GitHub Docs - Workflow Artifacts",
    "resolution_url": "https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-052",
    "role_slug": "devops-engineer",
    "domain": "GitHub Actions",
    "difficulty": "intermediate",
    "question_type": "security",
    "prompt": "When should OIDC be preferred over a stored cloud access key?",
    "preferred_answer": "OIDC allows a workflow to exchange a short-lived identity token for cloud credentials based on a  configured trust relationship. It avoids long-lived cloud secrets in the repository and can restrict access by repository, branch,  environment or workflow claims. The cloud role and GitHub token permissions still require least-privilege design.",
    "evaluation_points": [
      "Short-lived federation",
      "no stored key",
      "claim-based trust",
      "least privilege."
    ],
    "resolution_title": "GitHub Docs - OpenID Connect for Cloud Providers",
    "resolution_url": "https://docs.github.com/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-cloud-providers",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-053",
    "role_slug": "devops-engineer",
    "domain": "GitHub Actions",
    "difficulty": "intermediate",
    "question_type": "governance",
    "prompt": "What protection can GitHub deployment environments provide?",
    "preferred_answer": "Environments can scope deployment secrets and variables, restrict deployment branches and require  reviewers or protection rules before a job proceeds. They create a named, auditable boundary around deployment. They  should be combined with minimal token permissions and trustworthy artefacts rather than used as the only security control.",
    "evaluation_points": [
      "Scoped secrets",
      "branch/reviewer controls",
      "audit boundary",
      "layered controls."
    ],
    "resolution_title": "GitHub Docs - Managing Deployment Environments",
    "resolution_url": "https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-054",
    "role_slug": "devops-engineer",
    "domain": "GitHub Actions",
    "difficulty": "advanced",
    "question_type": "security",
    "prompt": "Why should GITHUB_TOKEN permissions be declared explicitly?",
    "preferred_answer": "Explicit permissions make the workflow's authority visible and reduce the impact of a compromised step  or third-party action. Grant only the read or write scopes required by each job, and avoid broad repository write access by  default. Untrusted pull-request workflows require especially restrictive design.",
    "evaluation_points": [
      "Visibility",
      "least privilege",
      "job-level scope",
      "untrusted PR awareness."
    ],
    "resolution_title": "GitHub Docs - GITHUB_TOKEN Authentication",
    "resolution_url": "https://docs.github.com/actions/reference/authentication-in-a-workflow",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-055",
    "role_slug": "devops-engineer",
    "domain": "GitHub Actions",
    "difficulty": "advanced",
    "question_type": "operations",
    "prompt": "How does concurrency protect deployment workflows?",
    "preferred_answer": "A concurrency group limits overlapping jobs or workflow runs that could compete for the same  environment. A new run can queue or cancel an in-progress run depending on configuration. The grouping expression should  represent the real shared resource, such as production or a specific branch, not an arbitrary label.",
    "evaluation_points": [
      "Mutual exclusion",
      "cancellation/queue behaviour",
      "correct resource-scoped grouping."
    ],
    "resolution_title": "GitHub Docs - Workflow Concurrency",
    "resolution_url": "https://docs.github.com/en/actions/concepts/workflows-and-actions/concurrency",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-056",
    "role_slug": "devops-engineer",
    "domain": "GitHub Actions",
    "difficulty": "scenario",
    "question_type": "security",
    "prompt": "A pull request from a fork needs tests, but the workflow also has deployment secrets. How should it  be designed?",
    "preferred_answer": "Run untrusted code in a workflow context that does not expose deployment secrets or write-capable  tokens. Separate build/test from privileged deployment, require review before privileged execution, pin or trust actions  carefully and avoid patterns that check out attacker-controlled code in a secret-bearing context. Use environments and OIDC  only after trust is established.",
    "evaluation_points": [
      "Privilege separation",
      "no secrets to untrusted code",
      "review boundary",
      "action trust",
      "safe OIDC timing."
    ],
    "resolution_title": "GitHub Docs - Using Secrets in GitHub Actions",
    "resolution_url": "https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-057",
    "role_slug": "devops-engineer",
    "domain": "Docker and Docker Compose",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "What is the difference between a Docker image and a container?",
    "preferred_answer": "An image is an immutable, layered package containing an application and its filesystem requirements. A  container is a runtime instance of an image with its own writable layer, process isolation and configured resources.  Containers can be replaced while persistent data is kept outside the writable layer.",
    "evaluation_points": [
      "Immutable template versus runtime instance",
      "writable layer",
      "external persistence."
    ],
    "resolution_title": "Docker Docs - Get Started",
    "resolution_url": "https://docs.docker.com/get-started/docker-overview/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-058",
    "role_slug": "devops-engineer",
    "domain": "Docker and Docker Compose",
    "difficulty": "foundation",
    "question_type": "build",
    "prompt": "How do Dockerfile layers affect build caching?",
    "preferred_answer": "Each build instruction can create a cacheable layer. When an instruction or its inputs change, that layer  and later dependent layers are rebuilt. Put stable dependency steps before frequently changing source code, keep the build  context small and use a suitable .dockerignore to improve speed and reproducibility.",
    "evaluation_points": [
      "Cache invalidation chain",
      "ordering",
      "build context",
      ".dockerignore."
    ],
    "resolution_title": "Docker Docs - Build Best Practices",
    "resolution_url": "https://docs.docker.com/build/building/best-practices/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-059",
    "role_slug": "devops-engineer",
    "domain": "Docker and Docker Compose",
    "difficulty": "intermediate",
    "question_type": "runtime",
    "prompt": "Differentiate CMD and ENTRYPOINT.",
    "preferred_answer": "ENTRYPOINT defines the executable that the container is intended to run, while CMD supplies default  arguments or a default command when ENTRYPOINT is absent. Runtime arguments normally replace CMD but append to  an exec-form ENTRYPOINT. Exec form is preferred for clearer signal handling and argument behaviour.",
    "evaluation_points": [
      "Executable versus defaults",
      "override behaviour",
      "exec form and signals."
    ],
    "resolution_title": "Docker Docs - Dockerfile Reference",
    "resolution_url": "https://docs.docker.com/reference/dockerfile/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-060",
    "role_slug": "devops-engineer",
    "domain": "Docker and Docker Compose",
    "difficulty": "intermediate",
    "question_type": "storage",
    "prompt": "When should you use a named volume instead of a bind mount?",
    "preferred_answer": "Use a named volume for container-managed persistent data that should be portable across host directory  layouts and managed through Docker. Use a bind mount when a specific host path must be exposed, such as source code  during development or controlled configuration. Bind mounts couple the container to host structure and permissions.",
    "evaluation_points": [
      "Managed portability versus explicit host path",
      "dev use",
      "coupling/permissions."
    ],
    "resolution_title": "Docker Docs - Volumes",
    "resolution_url": "https://docs.docker.com/engine/storage/volumes/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-061",
    "role_slug": "devops-engineer",
    "domain": "Docker and Docker Compose",
    "difficulty": "intermediate",
    "question_type": "networking",
    "prompt": "How do services discover each other in Docker Compose?",
    "preferred_answer": "Compose creates a default network unless configured otherwise, and services on that network can  resolve each other by service name. Containers should connect to the service's container port, not the host-published port.  Named networks can separate tiers and control which services can communicate.",
    "evaluation_points": [
      "Service-name DNS",
      "container port",
      "default/named network segmentation."
    ],
    "resolution_title": "Docker Docs - Docker Compose",
    "resolution_url": "https://docs.docker.com/compose/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-062",
    "role_slug": "devops-engineer",
    "domain": "Docker and Docker Compose",
    "difficulty": "advanced",
    "question_type": "build",
    "prompt": "Why are multi-stage builds valuable?",
    "preferred_answer": "Multi-stage builds separate compilation and tooling from the final runtime image. The final stage copies  only required artefacts, reducing image size, attack surface and unnecessary dependencies. Reproducible builds still require  pinned dependencies, controlled base images and retained provenance.",
    "evaluation_points": [
      "Builder/runtime separation",
      "size and attack surface",
      "reproducibility controls."
    ],
    "resolution_title": "Docker Docs - Multi-stage Builds",
    "resolution_url": "https://docs.docker.com/build/building/multi-stage/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-063",
    "role_slug": "devops-engineer",
    "domain": "Docker and Docker Compose",
    "difficulty": "advanced",
    "question_type": "security",
    "prompt": "What are practical steps for running a container with least privilege?",
    "preferred_answer": "Use a minimal trusted base, run as a non-root user, drop unnecessary Linux capabilities, make  filesystems read-only where possible, avoid privileged mode, limit resources and expose only required ports. Scan and sign  images, protect the daemon socket and keep secrets outside image layers and environment logs.",
    "evaluation_points": [
      "Non-root",
      "capabilities/privileged mode",
      "resource/network limits",
      "image and secret controls."
    ],
    "resolution_title": "Docker Docs - Security",
    "resolution_url": "https://docs.docker.com/engine/security/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-064",
    "role_slug": "devops-engineer",
    "domain": "Docker and Docker Compose",
    "difficulty": "scenario",
    "question_type": "diagnosis",
    "prompt": "A container starts and exits immediately with code 0. What does that usually mean?",
    "preferred_answer": "A container lives while its main process runs. Exit code 0 usually means that process completed  successfully, which often happens when the image launches a short command or a daemon backgrounds itself. Inspect the  configured command, logs and image metadata, then run the service in the foreground as PID 1.",
    "evaluation_points": [
      "PID 1 lifecycle",
      "successful completion",
      "command/log inspection",
      "foreground process."
    ],
    "resolution_title": "Docker Docs - Get Started",
    "resolution_url": "https://docs.docker.com/get-started/docker-overview/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-065",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Core Concepts",
    "difficulty": "foundation",
    "question_type": "architecture",
    "prompt": "Name the main Kubernetes control-plane and node components and their roles.",
    "preferred_answer": "The API server exposes the cluster API; etcd stores cluster state; the scheduler assigns unscheduled  Pods; controller managers reconcile desired and actual state. On nodes, kubelet manages Pod execution, the container  runtime runs containers and kube-proxy or an equivalent data plane supports Service networking.",
    "evaluation_points": [
      "API server",
      "etcd",
      "scheduler",
      "controllers",
      "kubelet/runtime/networking",
      "reconciliation concept."
    ],
    "resolution_title": "Kubernetes Docs - Cluster Components",
    "resolution_url": "https://kubernetes.io/docs/concepts/overview/components/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-066",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Core Concepts",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "Why is a Pod the smallest deployable unit rather than a single container?",
    "preferred_answer": "A Pod groups one or more tightly coupled containers that share network identity and can share storage  and lifecycle. The common case is one application container, with sidecars only when processes genuinely need Pod-level  co-location. Pods are replaceable units and should not be treated as durable servers.",
    "evaluation_points": [
      "Shared network/storage/lifecycle",
      "sidecar judgement",
      "replaceability."
    ],
    "resolution_title": "Kubernetes Docs - Pods",
    "resolution_url": "https://kubernetes.io/docs/concepts/workloads/pods/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-067",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Core Concepts",
    "difficulty": "intermediate",
    "question_type": "workloads",
    "prompt": "When should a StatefulSet be used instead of a Deployment?",
    "preferred_answer": "Use a StatefulSet when replicas require stable identities, ordered deployment or scaling, or stable  storage association. Use a Deployment for stateless, interchangeable replicas. StatefulSets do not automatically make the  application highly available; the data system still needs correct replication and recovery design.",
    "evaluation_points": [
      "Stable identity/order/storage",
      "stateless Deployment contrast",
      "no automatic HA claim."
    ],
    "resolution_title": "Kubernetes Docs - StatefulSets",
    "resolution_url": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-068",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Core Concepts",
    "difficulty": "intermediate",
    "question_type": "networking",
    "prompt": "What problem does a Kubernetes Service solve?",
    "preferred_answer": "A Service provides a stable virtual address and discovery name for a changing set of Pods selected by  labels. ClusterIP exposes inside the cluster, NodePort exposes a port on nodes, and LoadBalancer integrates with an  external load balancer where supported. Services route traffic; they do not create application readiness by themselves.",
    "evaluation_points": [
      "Stable discovery over ephemeral Pods",
      "selector",
      "service types",
      "readiness distinction."
    ],
    "resolution_title": "Kubernetes Docs - Services",
    "resolution_url": "https://kubernetes.io/docs/concepts/services-networking/service/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-069",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Core Concepts",
    "difficulty": "intermediate",
    "question_type": "configuration",
    "prompt": "How do ConfigMaps and Secrets differ?",
    "preferred_answer": "Both decouple configuration from container images, but Secrets are intended for sensitive values and  receive specialised handling. Secret data is not automatically encrypted merely because the object type is Secret, so  encryption at rest, RBAC, external secret management and careful mounting remain important.",
    "evaluation_points": [
      "Purpose difference",
      "decoupling",
      "base64 is not encryption",
      "access/storage controls."
    ],
    "resolution_title": "Kubernetes Docs - Secrets",
    "resolution_url": "https://kubernetes.io/docs/concepts/configuration/secret/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-070",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Core Concepts",
    "difficulty": "advanced",
    "question_type": "capacity",
    "prompt": "Explain CPU and memory requests and limits.",
    "preferred_answer": "Requests influence scheduling and reserve expected capacity; limits cap allowed use. CPU over a limit is  throttled, while memory over a hard limit can lead to termination by the kernel and an OOMKilled container. Bad requests  cause poor packing or Pending Pods, and missing limits can allow noisy-neighbour impact.",
    "evaluation_points": [
      "Scheduling versus enforcement",
      "CPU throttle",
      "memory OOM",
      "operational trade-offs."
    ],
    "resolution_title": "Kubernetes Docs - Resource Management for Pods and Containers",
    "resolution_url": "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-071",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Core Concepts",
    "difficulty": "advanced",
    "question_type": "health",
    "prompt": "Differentiate liveness, readiness and startup probes.",
    "preferred_answer": "Liveness decides when a stuck container should be restarted. Readiness decides whether the Pod  should receive traffic. A startup probe protects slow-starting applications by delaying liveness and readiness evaluation until  startup succeeds. Poor probes can cause restart loops or send traffic too early.",
    "evaluation_points": [
      "Restart versus traffic",
      "startup protection",
      "failure modes."
    ],
    "resolution_title": "Kubernetes Docs - Liveness, Readiness and Startup Probes",
    "resolution_url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-072",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Core Concepts",
    "difficulty": "scenario",
    "question_type": "security",
    "prompt": "A developer needs to view Pods in one namespace but must not modify them. How would you grant  access?",
    "preferred_answer": "Create or reuse a Role with only the required read verbs on the necessary resources in that namespace,  then bind it to the user or group with a RoleBinding. Avoid broad ClusterRoleBinding, test the effective permissions and use  short-lived identity integration where possible.",
    "evaluation_points": [
      "Namespaced Role",
      "get/list/watch only",
      "RoleBinding",
      "avoid cluster-wide privilege",
      "test access."
    ],
    "resolution_title": "Kubernetes Docs - RBAC Authorization",
    "resolution_url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-073",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Operations and Helm",
    "difficulty": "foundation",
    "question_type": "troubleshooting",
    "prompt": "What does CrashLoopBackOff mean, and what should be checked first?",
    "preferred_answer": "It means a container repeatedly starts, fails and is being restarted with increasing delay. Check Pod  events, current and previous container logs, exit reason and code, command, configuration, mounted files, probes and  resource limits. The backoff is a symptom, not the root cause.",
    "evaluation_points": [
      "Events/logs including previous",
      "exit reason",
      "config/probes/resources",
      "symptom distinction."
    ],
    "resolution_title": "Kubernetes Docs - Debug Running Pods",
    "resolution_url": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-074",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Operations and Helm",
    "difficulty": "foundation",
    "question_type": "troubleshooting",
    "prompt": "Why can a Pod remain Pending?",
    "preferred_answer": "Common causes include insufficient requested resources, unsatisfied node selectors or affinity, taints  without tolerations, an unbound persistent volume claim, scheduling constraints or admission failures. Describe the Pod and  inspect scheduler events before changing the manifest.",
    "evaluation_points": [
      "Multiple scheduling/storage causes",
      "events first",
      "no blind resource increase."
    ],
    "resolution_title": "Kubernetes Docs - Debug Pods",
    "resolution_url": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-075",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Operations and Helm",
    "difficulty": "intermediate",
    "question_type": "recovery",
    "prompt": "How do you inspect and undo a failed Deployment rollout?",
    "preferred_answer": "Check rollout status, Deployment conditions, ReplicaSets, Pod events and logs to identify whether the  failure is image, readiness, configuration or capacity related. If a known-good revision exists and rollback is safe, use rollout  undo; otherwise fix forward. Validate service health after the action.",
    "evaluation_points": [
      "Status and dependent objects",
      "root-cause categories",
      "safe rollback/fix-forward",
      "post-check."
    ],
    "resolution_title": "Kubernetes Docs - Performing a Rolling Update",
    "resolution_url": "https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-076",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Operations and Helm",
    "difficulty": "intermediate",
    "question_type": "scaling",
    "prompt": "How does the Horizontal Pod Autoscaler decide replica count?",
    "preferred_answer": "The HPA periodically compares observed metrics with configured targets and adjusts the desired replicas  of a scalable workload. Resource-based scaling depends on meaningful requests and available metrics. Stabilisation and  scaling policies help prevent rapid oscillation; scaling Pods cannot solve a saturated external dependency.",
    "evaluation_points": [
      "Observed/target ratio",
      "requests/metrics",
      "stabilisation",
      "downstream bottleneck caveat."
    ],
    "resolution_title": "Kubernetes Docs - Horizontal Pod Autoscaling",
    "resolution_url": "https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-077",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Operations and Helm",
    "difficulty": "intermediate",
    "question_type": "storage",
    "prompt": "How do PersistentVolumes and PersistentVolumeClaims relate?",
    "preferred_answer": "A PersistentVolume represents storage capacity available to the cluster, while a PersistentVolumeClaim  is a user request for storage characteristics. A StorageClass can dynamically provision a matching volume. Access modes  and reclaim policy must match workload and data-lifecycle needs.",
    "evaluation_points": [
      "Supply versus claim",
      "dynamic provisioning",
      "access/reclaim considerations."
    ],
    "resolution_title": "Kubernetes Docs - Persistent Volumes",
    "resolution_url": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-078",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Operations and Helm",
    "difficulty": "advanced",
    "question_type": "packaging",
    "prompt": "What are a Helm chart and a Helm release?",
    "preferred_answer": "A chart is a versioned package of templates, default values, metadata and optional dependencies. A  release is an installed instance of a chart with a specific set of values and revision history in a cluster. The same chart can  produce multiple releases for different environments or tenants.",
    "evaluation_points": [
      "Package versus installed instance",
      "values",
      "revision",
      "multiple releases."
    ],
    "resolution_title": "Helm Docs - Charts",
    "resolution_url": "https://helm.sh/docs/topics/charts/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-079",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Operations and Helm",
    "difficulty": "advanced",
    "question_type": "validation",
    "prompt": "What can helm template and helm lint prove, and what can they not prove?",
    "preferred_answer": "helm lint checks chart structure and common issues, while helm template renders manifests locally for  review and testing. They do not fully validate admission policies, cluster capabilities, runtime behaviour or external  dependencies. Add schema validation, server-side dry runs, policy tests and environment checks.",
    "evaluation_points": [
      "Local structural/render validation",
      "cluster/runtime limits",
      "layered validation."
    ],
    "resolution_title": "Helm Docs - helm template",
    "resolution_url": "https://helm.sh/docs/helm/helm_template/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-080",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Operations and Helm",
    "difficulty": "scenario",
    "question_type": "recovery",
    "prompt": "A Helm upgrade partially fails. How would you respond?",
    "preferred_answer": "Inspect release status, history, hook Jobs, rendered manifests and Kubernetes events. Determine  whether rollback is safe for application and data changes; use rollback-on-failure or an explicit rollback where appropriate,  then correct the chart or values. Hooks need deletion and idempotency policies so retries do not create additional damage.",
    "evaluation_points": [
      "History/status/hooks/events",
      "data compatibility",
      "rollback decision",
      "idempotent hooks."
    ],
    "resolution_title": "Helm Docs - helm upgrade",
    "resolution_url": "https://helm.sh/docs/helm/helm_upgrade/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-081",
    "role_slug": "devops-engineer",
    "domain": "Terraform and Infrastructure as Code",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "Why does Terraform need state?",
    "preferred_answer": "State maps configuration addresses to real infrastructure objects, stores metadata and helps Terraform  calculate changes efficiently. It is operationally sensitive because it may contain resource details or secrets and controls  future actions. Teams should use protected remote state, access control, backups and locking where supported.",
    "evaluation_points": [
      "Mapping and diff role",
      "sensitivity",
      "remote protection and locking."
    ],
    "resolution_title": "HashiCorp Terraform Docs - State",
    "resolution_url": "https://developer.hashicorp.com/terraform/language/state",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-082",
    "role_slug": "devops-engineer",
    "domain": "Terraform and Infrastructure as Code",
    "difficulty": "foundation",
    "question_type": "workflow",
    "prompt": "What is the difference between terraform plan and terraform apply?",
    "preferred_answer": "Plan creates an execution plan showing proposed changes without applying them. Apply executes a  saved plan or creates and confirms a new plan before changing infrastructure. In automation, save and review the exact plan  that will be applied so approval evidence cannot diverge from execution.",
    "evaluation_points": [
      "Preview versus execution",
      "saved plan",
      "automation integrity."
    ],
    "resolution_title": "HashiCorp Terraform Docs - terraform plan",
    "resolution_url": "https://developer.hashicorp.com/terraform/cli/commands/plan",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-083",
    "role_slug": "devops-engineer",
    "domain": "Terraform and Infrastructure as Code",
    "difficulty": "intermediate",
    "question_type": "state",
    "prompt": "What does a Terraform backend do?",
    "preferred_answer": "A backend defines where Terraform stores state and, depending on the backend, how operations and  state locking are handled. Remote backends improve collaboration and reduce local-file risk, but access to backend storage  must be tightly controlled. Backend configuration itself should not expose credentials.",
    "evaluation_points": [
      "State location",
      "locking/operations",
      "collaboration",
      "credential hygiene."
    ],
    "resolution_title": "HashiCorp Terraform Docs - Backend Configuration",
    "resolution_url": "https://developer.hashicorp.com/terraform/language/backend",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-084",
    "role_slug": "devops-engineer",
    "domain": "Terraform and Infrastructure as Code",
    "difficulty": "intermediate",
    "question_type": "design",
    "prompt": "What makes a good Terraform module?",
    "preferred_answer": "A good module groups a coherent capability behind a small, stable interface of typed inputs and useful  outputs. It hides repetitive implementation without hiding important operational choices, pins compatible provider  expectations, includes validation and documentation, and is versioned and tested before broad reuse.",
    "evaluation_points": [
      "Cohesive scope",
      "stable interface",
      "not over-abstracted",
      "version/test/docs."
    ],
    "resolution_title": "HashiCorp Terraform Docs - Modules Overview",
    "resolution_url": "https://developer.hashicorp.com/terraform/language/modules",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-085",
    "role_slug": "devops-engineer",
    "domain": "Terraform and Infrastructure as Code",
    "difficulty": "intermediate",
    "question_type": "language",
    "prompt": "Differentiate variables, local values and outputs.",
    "preferred_answer": "Input variables parameterise a module from outside. Local values name and reuse expressions inside a  module. Outputs expose selected values to callers, automation or other configurations. Sensitive markings reduce accidental  display but do not remove values from state.",
    "evaluation_points": [
      "External inputs",
      "internal expressions",
      "exposed outputs",
      "sensitive-state caveat."
    ],
    "resolution_title": "HashiCorp Terraform Docs - Values, Variables and Outputs",
    "resolution_url": "https://developer.hashicorp.com/terraform/language/values",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-086",
    "role_slug": "devops-engineer",
    "domain": "Terraform and Infrastructure as Code",
    "difficulty": "advanced",
    "question_type": "language",
    "prompt": "What is the difference between a resource and a data source?",
    "preferred_answer": "A resource declares an object Terraform should create or manage, while a data source reads information  from an existing system without owning its lifecycle. Excessive cross-stack data lookups can create hidden coupling, so  stable outputs, provider-specific lookups and clear ownership boundaries are important.",
    "evaluation_points": [
      "Managed lifecycle versus read-only lookup",
      "ownership/coupling awareness."
    ],
    "resolution_title": "HashiCorp Terraform Docs - Data Sources",
    "resolution_url": "https://developer.hashicorp.com/terraform/language/data-sources",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-087",
    "role_slug": "devops-engineer",
    "domain": "Terraform and Infrastructure as Code",
    "difficulty": "advanced",
    "question_type": "lifecycle",
    "prompt": "When should lifecycle meta-arguments be used cautiously?",
    "preferred_answer": "Options such as create_before_destroy, prevent_destroy and ignore_changes alter normal lifecycle  behaviour. They can protect availability or critical resources, but may create capacity conflicts, block legitimate updates or  hide unmanaged drift. Their operational effect should be documented and tested, not used to silence a confusing plan.",
    "evaluation_points": [
      "Examples",
      "benefit and risk",
      "no drift-hiding shortcut."
    ],
    "resolution_title": "HashiCorp Terraform Docs - Meta-arguments",
    "resolution_url": "https://developer.hashicorp.com/terraform/language/meta-arguments",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-088",
    "role_slug": "devops-engineer",
    "domain": "Terraform and Infrastructure as Code",
    "difficulty": "scenario",
    "question_type": "state recovery",
    "prompt": "Two engineers apply from local state and create conflicting infrastructure. How would you correct  the process?",
    "preferred_answer": "Stop concurrent changes, identify the authoritative real resources and state, back up all state files and  reconcile ownership through import, state move or controlled removal. Move to a protected remote backend with locking, role- based access and CI execution. Review the final plan carefully before any apply or destructive cleanup.",
    "evaluation_points": [
      "Freeze and backup",
      "reconcile state to reality",
      "remote locking",
      "controlled CI",
      "cautious plan."
    ],
    "resolution_title": "HashiCorp Terraform Docs - Import Existing Resources",
    "resolution_url": "https://developer.hashicorp.com/terraform/cli/import",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-089",
    "role_slug": "devops-engineer",
    "domain": "Ansible and Configuration Management",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "How do inventory, play, task and module relate in Ansible?",
    "preferred_answer": "Inventory defines managed hosts and groups. A play maps selected hosts to an ordered set of tasks, and  each task invokes a module or action with parameters. A playbook contains one or more plays and can also include  variables, roles and handlers.",
    "evaluation_points": [
      "Correct object hierarchy",
      "hosts-to-tasks mapping",
      "module role."
    ],
    "resolution_title": "Ansible Docs - Basic Concepts",
    "resolution_url": "https://docs.ansible.com/projects/ansible/latest/getting_started/basic_concepts.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-090",
    "role_slug": "devops-engineer",
    "domain": "Ansible and Configuration Management",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "What does idempotency mean in configuration management?",
    "preferred_answer": "An idempotent task converges a system to the desired state and reports no change when that state is  already satisfied. Repeated runs therefore produce the same final state. Not every module or shell command is automatically  idempotent, so task design and change detection matter.",
    "evaluation_points": [
      "Convergence",
      "repeated result",
      "changed status",
      "command/module caveat."
    ],
    "resolution_title": "Ansible Docs - Playbooks",
    "resolution_url": "https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-091",
    "role_slug": "devops-engineer",
    "domain": "Ansible and Configuration Management",
    "difficulty": "intermediate",
    "question_type": "operations",
    "prompt": "Why are handlers useful?",
    "preferred_answer": "Handlers run only when notified by a task that reports a change, commonly to restart or reload a service  after configuration changes. Multiple notifications can be consolidated so the handler runs once at the appropriate point. This  avoids unnecessary restarts and improves idempotent behaviour.",
    "evaluation_points": [
      "Notify-on-change",
      "consolidation",
      "service restart example",
      "efficiency."
    ],
    "resolution_title": "Ansible Docs - Handlers",
    "resolution_url": "https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_handlers.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-092",
    "role_slug": "devops-engineer",
    "domain": "Ansible and Configuration Management",
    "difficulty": "intermediate",
    "question_type": "design",
    "prompt": "When should Ansible roles be used?",
    "preferred_answer": "Roles organise reusable tasks, handlers, defaults, variables, templates and files in a standard structure.  Use them for coherent capabilities reused across hosts or projects, with clear inputs and supported platforms. Avoid turning a  role into an opaque collection of unrelated system changes.",
    "evaluation_points": [
      "Standard structure",
      "reuse and inputs",
      "coherent scope."
    ],
    "resolution_title": "Ansible Docs - Roles",
    "resolution_url": "https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_reuse_roles.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-093",
    "role_slug": "devops-engineer",
    "domain": "Ansible and Configuration Management",
    "difficulty": "intermediate",
    "question_type": "security",
    "prompt": "How should secrets be handled in Ansible?",
    "preferred_answer": "Use Ansible Vault or an integrated secret manager, restrict access to vault identities and decrypt only  during the required execution. Avoid committing plaintext secrets, printing them in logs or embedding them in templates  without secure permissions. no_log can reduce output exposure but is not a complete secret-management strategy.",
    "evaluation_points": [
      "Vault/external manager",
      "access control",
      "log/template exposure",
      "no_log limitation."
    ],
    "resolution_title": "Ansible Docs - Vault",
    "resolution_url": "https://docs.ansible.com/projects/ansible/latest/vault_guide/index.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-094",
    "role_slug": "devops-engineer",
    "domain": "Ansible and Configuration Management",
    "difficulty": "advanced",
    "question_type": "validation",
    "prompt": "What do check mode and diff mode provide?",
    "preferred_answer": "Check mode asks supported modules to predict changes without applying them, while diff mode displays  before-and-after information for supported tasks. They improve review and testing but are not perfect simulations because  some modules lack support and runtime dependencies may behave differently during a real change.",
    "evaluation_points": [
      "Dry-run and diff purposes",
      "module support limitations",
      "not full simulation."
    ],
    "resolution_title": "Ansible Docs - Check Mode and Diff Mode",
    "resolution_url": "https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_checkmode.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-095",
    "role_slug": "devops-engineer",
    "domain": "Ansible and Configuration Management",
    "difficulty": "advanced",
    "question_type": "scale",
    "prompt": "Why use dynamic inventory in cloud environments?",
    "preferred_answer": "Dynamic inventory discovers hosts from cloud or platform APIs and groups them using metadata rather  than maintaining a stale static list. It improves scale and accuracy, but API credentials, caching, filters and naming  conventions must be controlled so automation targets exactly the intended systems.",
    "evaluation_points": [
      "API discovery",
      "metadata groups",
      "credential/filter/caching safety."
    ],
    "resolution_title": "Ansible Docs - Building Inventories",
    "resolution_url": "https://docs.ansible.com/projects/ansible/latest/inventory_guide/intro_inventory.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-096",
    "role_slug": "devops-engineer",
    "domain": "Ansible and Configuration Management",
    "difficulty": "scenario",
    "question_type": "idempotency",
    "prompt": "A shell task reports changed on every run and restarts a service each time. How would you improve  it?",
    "preferred_answer": "Replace the shell command with an idempotent module where possible. If a command is required, add  reliable creates, removes, changed_when or conditional checks based on actual state, then notify a handler only when a  meaningful configuration change occurs. Verify the task in check mode and repeated runs.",
    "evaluation_points": [
      "Prefer module",
      "explicit change detection",
      "handler",
      "repeated-run validation."
    ],
    "resolution_title": "Ansible Docs - Playbooks",
    "resolution_url": "https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-097",
    "role_slug": "devops-engineer",
    "domain": "AWS and Cloud Architecture",
    "difficulty": "foundation",
    "question_type": "architecture",
    "prompt": "What is the difference between an AWS Region and an Availability Zone?",
    "preferred_answer": "A Region is a separate geographic area, while an Availability Zone is an isolated location within a Region  made up of one or more data centres. Multi-AZ design protects against a single-AZ failure; multi-Region design addresses  larger failures and latency or regulatory needs but adds complexity and cost.",
    "evaluation_points": [
      "Geographic versus isolated zone",
      "multi-AZ purpose",
      "multi-Region trade-off."
    ],
    "resolution_title": "AWS - Regions and Availability Zones",
    "resolution_url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-098",
    "role_slug": "devops-engineer",
    "domain": "AWS and Cloud Architecture",
    "difficulty": "foundation",
    "question_type": "security",
    "prompt": "Why should workloads use IAM roles instead of long-lived access keys?",
    "preferred_answer": "Roles provide temporary credentials to trusted workloads or identities and can be scoped to the required  actions and resources. Long-lived keys are harder to rotate and are more damaging when leaked. Roles still need least- privilege policies, controlled trust relationships and monitoring.",
    "evaluation_points": [
      "Temporary credentials",
      "leak/rotation benefit",
      "policy and trust controls."
    ],
    "resolution_title": "AWS IAM - Best Practices",
    "resolution_url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-099",
    "role_slug": "devops-engineer",
    "domain": "AWS and Cloud Architecture",
    "difficulty": "intermediate",
    "question_type": "scaling",
    "prompt": "How do a load balancer and an Auto Scaling group work together?",
    "preferred_answer": "The load balancer distributes requests across healthy registered targets, while the Auto Scaling group  adjusts instance capacity and replaces unhealthy instances. Health checks, warm-up time, scaling metrics and connection  draining must be coordinated so capacity changes do not send traffic to unready or terminating instances.",
    "evaluation_points": [
      "Traffic distribution versus capacity lifecycle",
      "health/warm-up/draining coordination."
    ],
    "resolution_title": "AWS - Elastic Load Balancing with Auto Scaling",
    "resolution_url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-100",
    "role_slug": "devops-engineer",
    "domain": "AWS and Cloud Architecture",
    "difficulty": "intermediate",
    "question_type": "observability",
    "prompt": "Differentiate CloudWatch and CloudTrail.",
    "preferred_answer": "CloudWatch collects and acts on operational metrics, logs, alarms and events. CloudTrail records AWS  API activity for governance, audit and security investigation. They complement each other: one focuses on workload and  service behaviour, the other on who or what changed AWS resources.",
    "evaluation_points": [
      "Operational telemetry versus API audit",
      "complementary use."
    ],
    "resolution_title": "AWS CloudTrail User Guide",
    "resolution_url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-101",
    "role_slug": "devops-engineer",
    "domain": "AWS and Cloud Architecture",
    "difficulty": "intermediate",
    "question_type": "reliability",
    "prompt": "What does immutable infrastructure mean in a cloud deployment?",
    "preferred_answer": "Instead of modifying long-lived servers in place, build a versioned image or artefact, launch replacement  capacity and retire the old instances after validation. This reduces configuration drift and improves rollback and  reproducibility. Data, secrets and stateful services still require separate lifecycle design.",
    "evaluation_points": [
      "Replace rather than patch",
      "versioned image",
      "drift/rollback",
      "state exception."
    ],
    "resolution_title": "AWS Well-Architected - Operational Excellence Pillar",
    "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-102",
    "role_slug": "devops-engineer",
    "domain": "AWS and Cloud Architecture",
    "difficulty": "advanced",
    "question_type": "recovery",
    "prompt": "Explain RTO and RPO.",
    "preferred_answer": "Recovery Time Objective is the maximum acceptable time to restore a service after disruption. Recovery  Point Objective is the maximum acceptable amount of data loss measured in time. Architecture, backup frequency,  replication and recovery testing should be selected from business impact, not copied from a generic template.",
    "evaluation_points": [
      "Time to restore versus data-loss window",
      "business-driven architecture",
      "testing."
    ],
    "resolution_title": "AWS Well-Architected - Plan for Disaster Recovery",
    "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-103",
    "role_slug": "devops-engineer",
    "domain": "AWS and Cloud Architecture",
    "difficulty": "advanced",
    "question_type": "architecture",
    "prompt": "Why is automatic scaling not the same as high availability?",
    "preferred_answer": "Scaling changes capacity in response to demand or schedules, while high availability requires  redundancy, fault isolation, health detection and successful traffic failover. A service can scale many instances in one failure  domain and still be unavailable. Dependencies and data tiers must also be resilient.",
    "evaluation_points": [
      "Capacity versus fault tolerance",
      "failure domains",
      "dependency/data resilience."
    ],
    "resolution_title": "AWS Well-Architected - Reliability Pillar",
    "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-104",
    "role_slug": "devops-engineer",
    "domain": "AWS and Cloud Architecture",
    "difficulty": "scenario",
    "question_type": "diagnosis",
    "prompt": "Instances are healthy in EC2 but unhealthy behind the load balancer. What would you check?",
    "preferred_answer": "Compare the target group protocol, port, health path, expected response code and timeout with the  application. Verify security groups in both directions, listener and target registration, application bind address, startup time  and dependency readiness. Use target-health reason codes and application logs before replacing instances.",
    "evaluation_points": [
      "Health configuration",
      "security",
      "registration/bind",
      "startup/dependencies",
      "reason codes/logs."
    ],
    "resolution_title": "AWS - Elastic Load Balancing with Auto Scaling",
    "resolution_url": "https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-105",
    "role_slug": "devops-engineer",
    "domain": "Observability and Site Reliability Engineering",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "How do metrics, logs and traces complement each other?",
    "preferred_answer": "Metrics provide efficient numerical trends and alert signals, logs record discrete events with context, and  traces follow a request across distributed components. Metrics show that a problem exists, traces help locate the path and  logs often explain local detail. Correlation identifiers and consistent labels make the three signals more useful together.",
    "evaluation_points": [
      "Distinct strengths",
      "diagnostic sequence",
      "correlation."
    ],
    "resolution_title": "Grafana Docs - Fundamentals",
    "resolution_url": "https://grafana.com/docs/grafana/latest/fundamentals/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-106",
    "role_slug": "devops-engineer",
    "domain": "Observability and Site Reliability Engineering",
    "difficulty": "foundation",
    "question_type": "reliability",
    "prompt": "Differentiate SLI, SLO and SLA.",
    "preferred_answer": "An SLI is a measured indicator of service behaviour, such as successful request ratio or latency. An SLO  is the internal target for that indicator over a defined window. An SLA is a customer-facing agreement that may include  consequences. Good SLOs reflect user experience and are usually stricter than contractual thresholds.",
    "evaluation_points": [
      "Measure",
      "target",
      "agreement",
      "window/user relevance",
      "consequence distinction."
    ],
    "resolution_title": "Google SRE Book - Service Level Objectives",
    "resolution_url": "https://sre.google/sre-book/service-level-objectives/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-107",
    "role_slug": "devops-engineer",
    "domain": "Observability and Site Reliability Engineering",
    "difficulty": "intermediate",
    "question_type": "monitoring",
    "prompt": "What are the four golden signals?",
    "preferred_answer": "Latency, traffic, errors and saturation are a practical starting point for monitoring user-facing services.  They reveal how long work takes, how much demand exists, how often it fails and how close constrained resources are to  their limits. They should be adapted to the service rather than collected mechanically.",
    "evaluation_points": [
      "All four signals",
      "meaning",
      "service-specific adaptation."
    ],
    "resolution_title": "Google SRE Book - Monitoring Distributed Systems",
    "resolution_url": "https://sre.google/sre-book/monitoring-distributed-systems/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-108",
    "role_slug": "devops-engineer",
    "domain": "Observability and Site Reliability Engineering",
    "difficulty": "intermediate",
    "question_type": "prometheus",
    "prompt": "What are the four core Prometheus metric types?",
    "preferred_answer": "Counter represents a value that normally only increases, gauge can rise or fall, histogram counts  observations in buckets and provides sum and count, and summary calculates client-side quantiles with sum and count.  Choose types based on query and aggregation needs, especially because summaries are difficult to aggregate across  instances.",
    "evaluation_points": [
      "Correct four types",
      "behavioural distinctions",
      "aggregation trade-off."
    ],
    "resolution_title": "Prometheus Docs - Metric Types",
    "resolution_url": "https://prometheus.io/docs/concepts/metric_types/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-109",
    "role_slug": "devops-engineer",
    "domain": "Observability and Site Reliability Engineering",
    "difficulty": "intermediate",
    "question_type": "prometheus",
    "prompt": "Why is high label cardinality dangerous?",
    "preferred_answer": "Every unique label set creates a separate time series. Unbounded values such as user IDs, request IDs  or raw URLs can cause excessive memory, storage and query cost. Keep labels bounded and meaningful, move event detail  to logs or traces and monitor series growth.",
    "evaluation_points": [
      "Unique series mechanism",
      "unbounded examples",
      "alternative telemetry",
      "monitor growth."
    ],
    "resolution_title": "Prometheus Docs - Data Model",
    "resolution_url": "https://prometheus.io/docs/concepts/data_model/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-110",
    "role_slug": "devops-engineer",
    "domain": "Observability and Site Reliability Engineering",
    "difficulty": "advanced",
    "question_type": "prometheus",
    "prompt": "When should a recording rule be used?",
    "preferred_answer": "Recording rules precompute frequently used or expensive PromQL expressions into new time series.  They improve dashboard and alert query performance and standardise derived metrics, but consume storage and can hide  mistakes if naming and ownership are poor. Rules should be tested and version controlled.",
    "evaluation_points": [
      "Precomputation",
      "performance/standardisation",
      "storage and correctness trade-off."
    ],
    "resolution_title": "Prometheus Docs - Recording Rules",
    "resolution_url": "https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-111",
    "role_slug": "devops-engineer",
    "domain": "Observability and Site Reliability Engineering",
    "difficulty": "advanced",
    "question_type": "alerting",
    "prompt": "What should page an on-call engineer?",
    "preferred_answer": "A page should represent an urgent, actionable threat to user-visible service objectives that requires  human attention now. Alert on symptoms and sustained impact, include useful context and runbook links, and route lower- urgency diagnostic signals to tickets or dashboards. Frequent non-actionable pages train responders to ignore alerts.",
    "evaluation_points": [
      "Urgent/actionable/user impact",
      "symptom-based",
      "context/runbook",
      "severity routing."
    ],
    "resolution_title": "Prometheus Docs - Alerting Best Practices",
    "resolution_url": "https://prometheus.io/docs/practices/alerting/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-112",
    "role_slug": "devops-engineer",
    "domain": "Observability and Site Reliability Engineering",
    "difficulty": "scenario",
    "question_type": "reliability",
    "prompt": "A service meets infrastructure health checks but violates its latency SLO. How would you  investigate?",
    "preferred_answer": "Start with the affected user journey and SLI breakdown by endpoint, region, dependency and percentile.  Correlate traffic, errors and saturation with traces, deployment changes and dependency latency; avoid relying on averages.  Mitigate impact first, then document the causal chain and improve alerts or capacity models.",
    "evaluation_points": [
      "User SLI first",
      "dimensional breakdown",
      "percentiles",
      "telemetry correlation",
      "mitigate then learn."
    ],
    "resolution_title": "Google SRE Book - Effective Troubleshooting",
    "resolution_url": "https://sre.google/sre-book/effective-troubleshooting/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-113",
    "role_slug": "devops-engineer",
    "domain": "DevSecOps and Incident Response",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "What does shift left mean in DevSecOps, and what does it not mean?",
    "preferred_answer": "Shift left means introducing security feedback earlier in design, coding and build stages so issues are  cheaper to prevent or fix. It does not mean moving all responsibility to developers or replacing runtime controls and security  expertise. Security remains a shared, continuous lifecycle responsibility.",
    "evaluation_points": [
      "Earlier feedback",
      "shared responsibility",
      "runtime/security-team controls remain."
    ],
    "resolution_title": "Red Hat - What is DevSecOps?",
    "resolution_url": "https://www.redhat.com/en/topics/devops/what-is-devsecops",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-114",
    "role_slug": "devops-engineer",
    "domain": "DevSecOps and Incident Response",
    "difficulty": "foundation",
    "question_type": "security",
    "prompt": "Why are CI/CD systems high-value attack targets?",
    "preferred_answer": "They often hold credentials, can modify source or artefacts and have direct paths to production. A  compromised runner, action, plugin or pipeline definition can therefore become a software-supply-chain attack. Strong  identity, isolation, reviewed changes, trusted dependencies and detailed audit logs are essential.",
    "evaluation_points": [
      "Privilege and production path",
      "supply-chain impact",
      "layered controls."
    ],
    "resolution_title": "OWASP - Top 10 CI/CD Security Risks",
    "resolution_url": "https://owasp.org/www-project-top-10-ci-cd-security-risks/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-115",
    "role_slug": "devops-engineer",
    "domain": "DevSecOps and Incident Response",
    "difficulty": "intermediate",
    "question_type": "credentials",
    "prompt": "What is good pipeline credential hygiene?",
    "preferred_answer": "Use short-lived identities, least-privilege scopes and separate credentials by environment and function.  Prevent secrets from entering source, images, command output, caches or artefacts; rotate on exposure and monitor use.  Secret masking reduces accidental display but cannot make an unsafe workflow safe.",
    "evaluation_points": [
      "Short-lived/least privilege",
      "environment separation",
      "leak surfaces",
      "rotation/monitoring",
      "masking limit."
    ],
    "resolution_title": "OWASP CI/CD Risk - Insufficient Credential Hygiene",
    "resolution_url": "https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-06-Insufficient-Credential-Hygiene",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-116",
    "role_slug": "devops-engineer",
    "domain": "DevSecOps and Incident Response",
    "difficulty": "intermediate",
    "question_type": "supply chain",
    "prompt": "How should a team protect artefact integrity between build and deployment?",
    "preferred_answer": "Create artefacts in a controlled build, assign immutable identifiers, generate provenance and checksums  or signatures, store them in an access-controlled repository and verify integrity before deployment. Rebuilding later from the  same source is not equivalent to promoting the exact tested artefact.",
    "evaluation_points": [
      "Controlled build",
      "immutable identity",
      "provenance/signature",
      "verify at deploy",
      "no rebuild substitution."
    ],
    "resolution_title": "OWASP CI/CD Risk - Improper Artifact Integrity Validation",
    "resolution_url": "https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-09-Improper-Artifact-Integrity-Validation",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-117",
    "role_slug": "devops-engineer",
    "domain": "DevSecOps and Incident Response",
    "difficulty": "intermediate",
    "question_type": "identity",
    "prompt": "How does OIDC reduce cloud-deployment credential risk?",
    "preferred_answer": "The workflow obtains a short-lived token whose claims are evaluated by the cloud identity provider, then  receives temporary credentials for an allowed role. This removes stored long-lived cloud keys and allows trust to be limited to  a repository, branch, tag or environment. Misconfigured trust policies can still grant excessive access.",
    "evaluation_points": [
      "Federation flow",
      "temporary credentials",
      "claim restrictions",
      "trust-policy risk."
    ],
    "resolution_title": "GitHub Docs - OpenID Connect for Cloud Providers",
    "resolution_url": "https://docs.github.com/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-cloud-providers",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-118",
    "role_slug": "devops-engineer",
    "domain": "DevSecOps and Incident Response",
    "difficulty": "advanced",
    "question_type": "threat modelling",
    "prompt": "What is poisoned pipeline execution?",
    "preferred_answer": "It is the abuse of a pipeline's ability to run attacker-controlled code, often through modified pipeline  configuration, source files executed by build logic or unsafe pull-request workflows. Defences include protected pipeline  definitions, privilege separation, isolated ephemeral runners, trusted dependencies and no production credentials in untrusted  contexts.",
    "evaluation_points": [
      "Attacker-controlled execution path",
      "examples",
      "protected definitions",
      "isolation and privilege separation."
    ],
    "resolution_title": "OWASP CI/CD Risk - Poisoned Pipeline Execution",
    "resolution_url": "https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-04-Poisoned-Pipeline-Execution",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-119",
    "role_slug": "devops-engineer",
    "domain": "DevSecOps and Incident Response",
    "difficulty": "advanced",
    "question_type": "incident management",
    "prompt": "What roles and practices make a major incident response effective?",
    "preferred_answer": "Assign a clear incident commander, operations responders, communications owner and subject-matter  support. Maintain a shared timeline, prioritise mitigation over speculative root cause, communicate at a predictable cadence  and preserve evidence. After recovery, run a blameless review with owned, tracked corrective actions.",
    "evaluation_points": [
      "Role clarity",
      "mitigation first",
      "timeline/comms",
      "evidence",
      "blameless tracked follow-up."
    ],
    "resolution_title": "Google SRE Book - Managing Incidents",
    "resolution_url": "https://sre.google/sre-book/managing-incidents/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "DVO-120",
    "role_slug": "devops-engineer",
    "domain": "DevSecOps and Incident Response",
    "difficulty": "scenario",
    "question_type": "security incident",
    "prompt": "A self-hosted CI runner is suspected to be compromised after a production deployment. What are  the first actions?",
    "preferred_answer": "Stop or quarantine the runner and suspend privileged workflows, then rotate or revoke credentials and  tokens that could have been exposed. Preserve logs, runner state and artefact provenance, identify builds and deployments  produced during the suspected window, verify or replace affected artefacts, and restore service from a trusted build  environment. Communicate impact and document the investigation timeline.",
    "evaluation_points": [
      "Containment",
      "credential revocation",
      "evidence preservation",
      "affected-build scope",
      "trusted rebuild/recovery",
      "communications."
    ],
    "resolution_title": "OWASP CI/CD Risk - Insufficient Logging and Visibility",
    "resolution_url": "https://owasp.org/www-project-top-10-ci-cd-security-risks/CICD-SEC-10-Insufficient-Logging-And-Visibility",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-01",
    "role_slug": "devops-engineer",
    "domain": "DevOps Principles and Delivery Performance",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] Delivery metrics baseline: Calculate deployment frequency, change lead time, change failure rate and failed deployment recovery time from a  supplied month of deployment records. Explain one limitation in each measure and recommend one improvement  experiment.",
    "preferred_answer": "Expected Evidence: A one-page metric sheet with definitions, calculations, assumptions and an experiment linked to a bottleneck.",
    "evaluation_points": [
      "A one-page metric sheet with definitions",
      "calculations",
      "assumptions and an experiment linked to a bottleneck."
    ],
    "resolution_title": "DORA - Software Delivery Performance Metrics",
    "resolution_url": "https://dora.dev/guides/dora-metrics/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-02",
    "role_slug": "devops-engineer",
    "domain": "Linux Administration and Shell Automation",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] Linux service recovery: Create a systemd service for a simple application, intentionally break its environment or permissions, then diagnose  the boot-time failure using status and journal evidence.",
    "preferred_answer": "Expected Evidence: A corrected unit file, command transcript, root-cause statement and safe restart validation.",
    "evaluation_points": [
      "A corrected unit file",
      "command transcript",
      "root-cause statement and safe restart validation."
    ],
    "resolution_title": "Red Hat Enterprise Linux - Working with systemd Unit Files",
    "resolution_url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/using_systemd_unit_files_to_customize_and_optimize_your_system/assembly_working-with-systemd-unit-files_working-with-systemd",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-03",
    "role_slug": "devops-engineer",
    "domain": "Networking, DNS, HTTP and TLS",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] DNS and TLS diagnosis: Trace a request from DNS resolution through TCP connection and TLS certificate verification. Introduce one wrong  DNS record or hostname mismatch and document the evidence.",
    "preferred_answer": "Expected Evidence: A layer-by-layer diagnostic record showing where the failure occurs and how it was confirmed.",
    "evaluation_points": [
      "A layer-by-layer diagnostic record showing where the failure occurs and how it was confirmed."
    ],
    "resolution_title": "MDN Web Docs - Transport Layer Security",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-04",
    "role_slug": "devops-engineer",
    "domain": "Git and Collaborative Version Control",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] Git regression recovery: Create a repository with a known-good commit, introduce a regression, identify it with bisect and produce a safe revert  on a shared branch.",
    "preferred_answer": "Expected Evidence: Commit graph, bisect log, identified bad commit, revert commit and test evidence.",
    "evaluation_points": [
      "Commit graph",
      "bisect log",
      "identified bad commit",
      "revert commit and test evidence."
    ],
    "resolution_title": "Git Documentation - git bisect",
    "resolution_url": "https://git-scm.com/docs/git-bisect",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-05",
    "role_slug": "devops-engineer",
    "domain": "CI/CD Architecture and Release Strategies",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] Release strategy design: Design a deployment pipeline for a customer-facing API using build-once promotion, automated gates and either blue- green or canary release.",
    "preferred_answer": "Expected Evidence: Pipeline diagram, artefact identity, gate criteria, rollback/fix-forward decision and observability signals.",
    "evaluation_points": [
      "Pipeline diagram",
      "artefact identity",
      "gate criteria",
      "rollback/fix-forward decision and observability signals."
    ],
    "resolution_title": "Argo Rollouts Docs - Concepts",
    "resolution_url": "https://argo-rollouts.readthedocs.io/en/stable/concepts/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-06",
    "role_slug": "devops-engineer",
    "domain": "Jenkins Pipelines",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] Jenkinsfile implementation: Write a Declarative Jenkinsfile that checks out code, builds in an isolated agent, runs tests in parallel, archives reports  and requires a protected production input.",
    "preferred_answer": "Expected Evidence: Valid Jenkinsfile, credential handling notes, failure/post actions and evidence of an agent-safe design.",
    "evaluation_points": [
      "Valid Jenkinsfile",
      "credential handling notes",
      "failure/post actions and evidence of an agent-safe design."
    ],
    "resolution_title": "Jenkins Documentation - Using a Jenkinsfile",
    "resolution_url": "https://www.jenkins.io/doc/book/pipeline/jenkinsfile/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-07",
    "role_slug": "devops-engineer",
    "domain": "GitHub Actions",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] GitHub Actions secure deployment: Create a workflow with a test matrix, dependency caching, artefact upload, protected environment and OIDC-based  cloud authentication.",
    "preferred_answer": "Expected Evidence: Workflow YAML plus a short permission and trust-policy explanation.",
    "evaluation_points": [
      "Workflow YAML plus a short permission and trust-policy explanation."
    ],
    "resolution_title": "GitHub Docs - Workflow Syntax for GitHub Actions",
    "resolution_url": "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-08",
    "role_slug": "devops-engineer",
    "domain": "Docker and Docker Compose",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] Container build hardening: Containerise an application using a multi-stage Dockerfile, non-root runtime user, health check, minimal context and  named volume where required.",
    "preferred_answer": "Expected Evidence: Dockerfile, image-size comparison, vulnerability or package review, run command and persistence test.",
    "evaluation_points": [
      "Dockerfile",
      "image-size comparison",
      "vulnerability or package review",
      "run command and persistence test."
    ],
    "resolution_title": "Docker Docs - Multi-stage Builds",
    "resolution_url": "https://docs.docker.com/build/building/multi-stage/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-09",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Core Concepts",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] Kubernetes application deployment: Deploy an application with a Deployment, Service, ConfigMap, Secret reference, requests/limits and all three probe  types. Trigger a bad configuration and recover it.",
    "preferred_answer": "Expected Evidence: Manifests, rollout evidence, failure diagnosis and restored service verification.",
    "evaluation_points": [
      "Manifests",
      "rollout evidence",
      "failure diagnosis and restored service verification."
    ],
    "resolution_title": "Kubernetes Docs - Liveness, Readiness and Startup Probes",
    "resolution_url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-10",
    "role_slug": "devops-engineer",
    "domain": "Kubernetes Operations and Helm",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] Helm packaging and rollback: Package the Kubernetes application as a Helm chart with values for two environments, lint and render it, perform an  upgrade and test rollback behaviour.",
    "preferred_answer": "Expected Evidence: Chart structure, rendered diff, release history and rollback validation.",
    "evaluation_points": [
      "Chart structure",
      "rendered diff",
      "release history and rollback validation."
    ],
    "resolution_title": "Helm Docs - Charts",
    "resolution_url": "https://helm.sh/docs/topics/charts/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-11",
    "role_slug": "devops-engineer",
    "domain": "Terraform and Infrastructure as Code",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] Terraform team workflow: Create a reusable module and a root configuration using remote state and locking. Produce a saved plan in  automation and demonstrate import of one existing resource.",
    "preferred_answer": "Expected Evidence: Module interface, backend design, saved-plan evidence, import steps and final no-op plan.",
    "evaluation_points": [
      "Module interface",
      "backend design",
      "saved-plan evidence",
      "import steps and final no-op plan."
    ],
    "resolution_title": "HashiCorp Terraform Docs - Running Terraform in Automation",
    "resolution_url": "https://developer.hashicorp.com/terraform/tutorials/automation/automate-terraform",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-12",
    "role_slug": "devops-engineer",
    "domain": "Ansible and Configuration Management",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] Ansible idempotent role: Build a role that installs and configures a service, uses a template and handler, protects a secret and produces no  changes on a second run.",
    "preferred_answer": "Expected Evidence: Role tree, playbook, first/second-run output, check-mode result and secret-handling note.",
    "evaluation_points": [
      "Role tree",
      "playbook",
      "first/second-run output",
      "check-mode result and secret-handling note."
    ],
    "resolution_title": "Ansible Docs - Roles",
    "resolution_url": "https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_reuse_roles.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-13",
    "role_slug": "devops-engineer",
    "domain": "AWS and Cloud Architecture",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] AWS resilient web tier: Design a Multi-AZ web tier with load balancing, Auto Scaling, least-privilege role, CloudWatch alarms and a recovery  objective.",
    "preferred_answer": "Expected Evidence: Architecture diagram, health/scaling rules, IAM summary, RTO/RPO and failure test plan.",
    "evaluation_points": [
      "Architecture diagram",
      "health/scaling rules",
      "IAM summary",
      "RTO/RPO and failure test plan."
    ],
    "resolution_title": "AWS Well-Architected - Reliability Pillar",
    "resolution_url": "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-14",
    "role_slug": "devops-engineer",
    "domain": "Observability and Site Reliability Engineering",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] SLO and alerting: Define an availability or latency SLI/SLO, instrument a Prometheus metric, create a recording rule and an actionable  alert routed through Alertmanager or Grafana.",
    "preferred_answer": "Expected Evidence: SLI formula, SLO window, PromQL, alert rule, runbook link and false-positive review.",
    "evaluation_points": [
      "SLI formula",
      "SLO window",
      "PromQL",
      "alert rule",
      "runbook link and false-positive review."
    ],
    "resolution_title": "Prometheus Docs - Alerting Rules",
    "resolution_url": "https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-15",
    "role_slug": "devops-engineer",
    "domain": "DevSecOps and Incident Response",
    "difficulty": "scenario",
    "question_type": "practical",
    "prompt": "[PRACTICAL LAB] CI/CD threat model and incident drill: Threat-model a pipeline using the OWASP CI/CD risks, then run a tabletop exercise for a compromised runner or  dependency.",
    "preferred_answer": "Expected Evidence: Trust-boundary diagram, prioritised risks, controls, incident roles, containment steps and postmortem actions.",
    "evaluation_points": [
      "Trust-boundary diagram",
      "prioritised risks",
      "controls",
      "incident roles",
      "containment steps and postmortem actions."
    ],
    "resolution_title": "OWASP - Top 10 CI/CD Security Risks",
    "resolution_url": "https://owasp.org/www-project-top-10-ci-cd-security-risks/",
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
