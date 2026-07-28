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
  },
  {
    "id": "FED-001",
    "role_slug": "frontend-developer",
    "domain": "Web Platform and Browser Rendering",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "What happens from entering a URL until a page becomes visible?",
    "preferred_answer": "A strong answer traces DNS and connection establishment, the HTTP request and response, HTML parsing into the DOM, CSS parsing into the CSSOM, render-tree construction, style calculation, layout, paint and compositing. JavaScript can alter or block parts of that work. The exact pipeline is browser-dependent, so the useful focus is dependencies, critical resources and when the user can see and interact with meaningful content.",
    "evaluation_points": [
      "Network and response phase",
      "DOM and CSSOM construction",
      "Layout, paint and compositing",
      "JavaScript and critical-resource effects"
    ],
    "resolution_title": "MDN - How Browsers Work",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-002",
    "role_slug": "frontend-developer",
    "domain": "Web Platform and Browser Rendering",
    "difficulty": "foundation",
    "question_type": "architecture",
    "prompt": "Differentiate the DOM, CSSOM and render tree.",
    "preferred_answer": "The DOM represents document nodes and structure. The CSSOM represents parsed styles and cascade results. The render tree combines visible DOM content with computed styles for layout and painting; it normally excludes non-rendered nodes such as metadata and elements hidden with display none. They are related but not identical, and changing one can trigger style, layout or paint work depending on the property and element.",
    "evaluation_points": [
      "DOM structure",
      "CSSOM style representation",
      "Render-tree purpose",
      "Visibility and update consequences"
    ],
    "resolution_title": "MDN - How Browsers Work",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-003",
    "role_slug": "frontend-developer",
    "domain": "Web Platform and Browser Rendering",
    "difficulty": "intermediate",
    "question_type": "performance",
    "prompt": "What is the difference between layout, paint and compositing work?",
    "preferred_answer": "Layout calculates geometry and positions. Paint records the visual appearance of elements into drawing commands or layers. Compositing assembles already painted layers, often using the GPU, into the final frame. A change to width may require layout and paint, while transform or opacity can often be handled by compositing. Promotion is not free because layers consume memory and can create additional management cost.",
    "evaluation_points": [
      "Geometry versus pixels versus layer assembly",
      "Property-dependent invalidation",
      "Transform and opacity nuance",
      "Layer-memory trade-off"
    ],
    "resolution_title": "Chrome DevTools - Performance",
    "resolution_url": "https://developer.chrome.com/docs/devtools/performance",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-004",
    "role_slug": "frontend-developer",
    "domain": "Web Platform and Browser Rendering",
    "difficulty": "intermediate",
    "question_type": "diagnosis",
    "prompt": "Why can JavaScript block first rendering even when it does not change the page?",
    "preferred_answer": "Classic parser-inserted scripts can pause HTML parsing while they are fetched and executed because the browser must assume they may inspect or modify the document. Large execution tasks also occupy the main thread, delaying style, layout and paint. Use deferred or module scripts when ordering permits, reduce critical code and measure the dependency chain rather than assuming that moving a script to the bottom solves every case.",
    "evaluation_points": [
      "Parser blocking",
      "Main-thread execution",
      "Appropriate defer or module use",
      "Measurement of dependency chain"
    ],
    "resolution_title": "MDN - How Browsers Work",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-005",
    "role_slug": "frontend-developer",
    "domain": "Web Platform and Browser Rendering",
    "difficulty": "intermediate",
    "question_type": "architecture",
    "prompt": "What is progressive rendering, and how should a frontend support it?",
    "preferred_answer": "Progressive rendering lets useful structure and content become available before every resource or data dependency is complete. Support it with semantic server or static HTML, prioritised critical assets, reserved media dimensions, streaming or staged UI, and loading states that preserve layout. Avoid hiding the entire application behind one global spinner or requiring a large client bundle before any meaningful content can be read.",
    "evaluation_points": [
      "Useful content before full completion",
      "Critical-resource prioritisation",
      "Stable staged UI",
      "Avoid all-or-nothing boot"
    ],
    "resolution_title": "web.dev - Optimize Largest Contentful Paint",
    "resolution_url": "https://web.dev/articles/optimize-lcp",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-006",
    "role_slug": "frontend-developer",
    "domain": "Web Platform and Browser Rendering",
    "difficulty": "advanced",
    "question_type": "performance",
    "prompt": "How do synchronous layout reads and writes create layout thrashing?",
    "preferred_answer": "Writing style or DOM geometry invalidates layout. Reading measurements such as offsetHeight may then force the browser to calculate layout immediately. Repeating read-write-read cycles in a loop prevents batching and can consume a frame budget. Group reads before writes, use requestAnimationFrame for visual updates, prefer observers when appropriate and profile the actual call stacks before introducing abstractions.",
    "evaluation_points": [
      "Invalidation and forced layout",
      "Alternating read/write pattern",
      "Batching and frame scheduling",
      "Profiler-led remediation"
    ],
    "resolution_title": "Chrome DevTools - Performance",
    "resolution_url": "https://developer.chrome.com/docs/devtools/performance",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-007",
    "role_slug": "frontend-developer",
    "domain": "Web Platform and Browser Rendering",
    "difficulty": "advanced",
    "question_type": "architecture",
    "prompt": "When should work move from the main thread to a Web Worker?",
    "preferred_answer": "Move CPU-heavy, independently serialisable work that would otherwise create long tasks, such as parsing, transformation or computation. Workers cannot directly manipulate the DOM and communication copies or transfers data, so frequent fine-grained messaging can erase the benefit. Measure main-thread blocking, design a clear message protocol, use transferable objects when appropriate and keep accessibility and UI state on the main thread.",
    "evaluation_points": [
      "CPU-heavy main-thread work",
      "No direct DOM access",
      "Messaging and transfer cost",
      "Measured boundary and protocol"
    ],
    "resolution_title": "MDN - JavaScript Execution Model",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-008",
    "role_slug": "frontend-developer",
    "domain": "Web Platform and Browser Rendering",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "A page paints quickly but remains unresponsive for four seconds. How would you investigate?",
    "preferred_answer": "Capture a performance trace on a representative device, identify long tasks and their initiating scripts, separate download, parse, compile and execution cost, and inspect hydration or startup work. Correlate the trace with INP and user actions. Reduce or defer non-critical JavaScript, split work into smaller tasks, remove duplicate initialization and verify that the improvement holds in field data rather than only on a fast developer laptop.",
    "evaluation_points": [
      "Performance trace and long tasks",
      "Startup/hydration attribution",
      "Work reduction or scheduling",
      "Representative and field validation"
    ],
    "resolution_title": "web.dev - Optimize Long Tasks",
    "resolution_url": "https://web.dev/articles/optimize-long-tasks",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-009",
    "role_slug": "frontend-developer",
    "domain": "Semantic HTML and Forms",
    "difficulty": "foundation",
    "question_type": "semantics",
    "prompt": "Why does semantic HTML matter when CSS can make any element look correct?",
    "preferred_answer": "Semantic elements expose meaning and relationships to browsers, assistive technology, search systems and maintainers. Native elements also provide established keyboard, focus, form and interaction behaviour. CSS controls presentation but does not supply the complete semantics or behaviour of a button, heading, landmark or form control. Start with the correct element, then style it, and use ARIA only to fill a genuine semantic gap.",
    "evaluation_points": [
      "Meaning beyond appearance",
      "Native behaviour",
      "Maintenance and interoperability",
      "Correct-element-first principle"
    ],
    "resolution_title": "MDN - Semantics",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-010",
    "role_slug": "frontend-developer",
    "domain": "Semantic HTML and Forms",
    "difficulty": "foundation",
    "question_type": "forms",
    "prompt": "How should a label be associated with a form control?",
    "preferred_answer": "Use a label element with a for value matching the control id, or wrap the control with its label when suitable. The accessible name should describe the requested value, not only its visual position. Placeholder text is not a replacement for a persistent label. Group related choices with fieldset and legend, and connect help or error text using the appropriate accessible description mechanism.",
    "evaluation_points": [
      "Programmatic label association",
      "Persistent meaningful name",
      "Placeholder limitation",
      "Group and description handling"
    ],
    "resolution_title": "W3C WAI - Forms Tutorial",
    "resolution_url": "https://www.w3.org/WAI/tutorials/forms/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-011",
    "role_slug": "frontend-developer",
    "domain": "Semantic HTML and Forms",
    "difficulty": "intermediate",
    "question_type": "validation",
    "prompt": "What should client-side form validation do, and what must remain on the server?",
    "preferred_answer": "Client validation should give timely, specific feedback, prevent avoidable submissions and preserve entered data. Use native constraints where they fit and add custom checks for business rules. The server must independently validate every value because browser checks can be bypassed. Error messages should identify the field and correction, be programmatically associated and support a summary or focus strategy for complex forms.",
    "evaluation_points": [
      "Immediate user feedback",
      "Native and custom constraints",
      "Independent server validation",
      "Accessible error recovery"
    ],
    "resolution_title": "WHATWG HTML - Forms",
    "resolution_url": "https://html.spec.whatwg.org/multipage/forms.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-012",
    "role_slug": "frontend-developer",
    "domain": "Semantic HTML and Forms",
    "difficulty": "intermediate",
    "question_type": "content",
    "prompt": "When should an image use alt text, an empty alt attribute or a caption?",
    "preferred_answer": "Provide concise alt text when the image communicates information, describing its purpose in context rather than every pixel. Use alt empty for purely decorative images so assistive technology can ignore them. Use a visible caption when the explanation benefits everyone or when attribution and surrounding interpretation matter. Complex charts may need a short alt plus nearby data, description or table.",
    "evaluation_points": [
      "Purpose-based alternative text",
      "Decorative empty alt",
      "Caption use",
      "Complex-image alternative"
    ],
    "resolution_title": "MDN - HTML Images",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_images",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-013",
    "role_slug": "frontend-developer",
    "domain": "Semantic HTML and Forms",
    "difficulty": "intermediate",
    "question_type": "responsive media",
    "prompt": "How do srcset and sizes help the browser choose an image?",
    "preferred_answer": "srcset offers candidate resources with width or density descriptors. sizes describes the expected rendered width under layout conditions, allowing the browser to choose an appropriate candidate using viewport, device density and other factors. The browser makes the choice, so sizes must reflect the real layout. Use picture when art direction or format-specific source selection is required, not merely for every responsive image.",
    "evaluation_points": [
      "Candidate resources",
      "Rendered-size hint",
      "Browser selection",
      "Picture for art direction or formats"
    ],
    "resolution_title": "MDN - Responsive Images",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-014",
    "role_slug": "frontend-developer",
    "domain": "Semantic HTML and Forms",
    "difficulty": "advanced",
    "question_type": "architecture",
    "prompt": "What problems arise from building a custom button out of a div?",
    "preferred_answer": "A div lacks button semantics, keyboard activation, focus behaviour, disabled semantics and form integration. Recreating these correctly requires role, tabindex, key handling, focus styling, state exposure and careful event behaviour, and still risks incompatibility. Use a native button unless the platform cannot express the control. Styling limitations are rarely sufficient justification for discarding built-in behaviour.",
    "evaluation_points": [
      "Missing semantics",
      "Keyboard and focus gaps",
      "Form and disabled behaviour",
      "Native-first decision"
    ],
    "resolution_title": "W3C - ARIA Authoring Practices Guide",
    "resolution_url": "https://www.w3.org/WAI/ARIA/apg/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-015",
    "role_slug": "frontend-developer",
    "domain": "Semantic HTML and Forms",
    "difficulty": "advanced",
    "question_type": "data presentation",
    "prompt": "How should a complex data table be made understandable?",
    "preferred_answer": "Use table markup only for genuine row-and-column relationships. Provide a caption, identify header cells with th, and use scope for straightforward associations. Complex spanning headers may require explicit id and headers relationships or a simplified presentation. Ensure keyboard users can reach interactive controls, preserve header context during responsive transformations, and offer alternate views rather than converting structured data into an unreadable card maze.",
    "evaluation_points": [
      "Genuine tabular use",
      "Caption and header associations",
      "Complex-header strategy",
      "Responsive and interactive usability"
    ],
    "resolution_title": "MDN - HTML Table Basics",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_table_basics",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-016",
    "role_slug": "frontend-developer",
    "domain": "Semantic HTML and Forms",
    "difficulty": "scenario",
    "question_type": "review",
    "prompt": "A checkout form uses placeholders as labels, clears all values after an error and shows only a red border. What would you change?",
    "preferred_answer": "Add persistent programmatic labels, preserve valid user input, display specific text errors connected to each control and provide an error summary for the failed submission. Move focus deliberately without trapping it, identify required fields and formats before submission, and use colour as only one signal. Keep server validation authoritative and avoid announcing errors repeatedly on every keystroke.",
    "evaluation_points": [
      "Persistent labels",
      "Preserved input",
      "Specific associated errors",
      "Focus, colour and server-validation considerations"
    ],
    "resolution_title": "W3C - Web Content Accessibility Guidelines 2.2",
    "resolution_url": "https://www.w3.org/TR/WCAG22/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-017",
    "role_slug": "frontend-developer",
    "domain": "CSS Cascade, Layout and Responsive Design",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "How does the CSS cascade decide which declaration wins?",
    "preferred_answer": "The cascade first considers relevance and origin, then importance, cascade layer, selector specificity and source order, with scoping proximity also relevant in scoped styles. Inheritance supplies some values only when no declaration wins for the element. A good answer distinguishes the cascade from specificity: specificity is one comparison stage, not the whole mechanism.",
    "evaluation_points": [
      "Origin and importance",
      "Layers and specificity",
      "Source order or scope",
      "Cascade versus inheritance distinction"
    ],
    "resolution_title": "MDN - CSS Cascade",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-018",
    "role_slug": "frontend-developer",
    "domain": "CSS Cascade, Layout and Responsive Design",
    "difficulty": "foundation",
    "question_type": "layout",
    "prompt": "When should Flexbox be chosen over Grid?",
    "preferred_answer": "Flexbox is primarily one-dimensional and is strong for distributing and aligning items along a row or column where content drives the other axis. Grid is two-dimensional and is strong for explicit rows and columns, page sections and component layouts with shared tracks. They are complementary: Grid can define macro structure while Flexbox aligns content inside a grid area.",
    "evaluation_points": [
      "One-dimensional Flexbox",
      "Two-dimensional Grid",
      "Content versus track control",
      "Complementary use"
    ],
    "resolution_title": "MDN - CSS Flexible Box Layout",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-019",
    "role_slug": "frontend-developer",
    "domain": "CSS Cascade, Layout and Responsive Design",
    "difficulty": "intermediate",
    "question_type": "sizing",
    "prompt": "Why does width: 100% sometimes overflow its container?",
    "preferred_answer": "With the default content-box model, declared width covers only the content box, so padding and border add to the rendered size. Margins, intrinsic minimum sizes, long unbreakable content or viewport units can also overflow. Use box-sizing border-box where appropriate, inspect the containing block and min-width behaviour, and fix the actual sizing constraint rather than hiding overflow globally.",
    "evaluation_points": [
      "Content-box calculation",
      "Other intrinsic overflow causes",
      "Containing-block inspection",
      "No blanket overflow hiding"
    ],
    "resolution_title": "MDN - CSS Box Model",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-020",
    "role_slug": "frontend-developer",
    "domain": "CSS Cascade, Layout and Responsive Design",
    "difficulty": "intermediate",
    "question_type": "responsive design",
    "prompt": "How do container queries differ from media queries?",
    "preferred_answer": "Media queries respond mainly to viewport or device conditions. Container queries let a component respond to the size or style context of an ancestor containment box. They make reusable components less dependent on where the page places them. The design still needs sensible intrinsic sizing, fallbacks and testing across nested containers; container queries do not replace all global breakpoints.",
    "evaluation_points": [
      "Viewport versus container context",
      "Component reuse",
      "Containment requirement",
      "Complementary use with media queries"
    ],
    "resolution_title": "MDN - CSS Container Queries",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-021",
    "role_slug": "frontend-developer",
    "domain": "CSS Cascade, Layout and Responsive Design",
    "difficulty": "intermediate",
    "question_type": "maintainability",
    "prompt": "What problems do excessive specificity and !important create?",
    "preferred_answer": "They make overrides depend on selector escalation, source order accidents and hidden coupling, so local changes become risky. Prefer a clear layering strategy, low-specificity component selectors, design tokens and documented utility behaviour. !important can be appropriate for tightly controlled utilities or user-origin accessibility needs, but should not be the default escape from an unclear cascade.",
    "evaluation_points": [
      "Override escalation",
      "Hidden coupling",
      "Low-specificity architecture",
      "Narrow legitimate important use"
    ],
    "resolution_title": "MDN - CSS Specificity",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-022",
    "role_slug": "frontend-developer",
    "domain": "CSS Cascade, Layout and Responsive Design",
    "difficulty": "advanced",
    "question_type": "internationalisation",
    "prompt": "Why are logical properties useful in a design system?",
    "preferred_answer": "Logical properties describe block and inline dimensions and start/end edges, allowing layouts to adapt to writing mode and text direction without duplicating left/right rules. They reduce assumptions about English horizontal layout. Components must still be tested with real RTL content, bidirectional text, long translations and vertical writing because direction-aware properties alone do not guarantee correct typography or interaction order.",
    "evaluation_points": [
      "Block and inline axes",
      "Writing-mode adaptation",
      "Reduced directional assumptions",
      "Real localisation testing"
    ],
    "resolution_title": "MDN - CSS Logical Properties",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-023",
    "role_slug": "frontend-developer",
    "domain": "CSS Cascade, Layout and Responsive Design",
    "difficulty": "advanced",
    "question_type": "debugging",
    "prompt": "Why can an element with a very large z-index still appear behind another element?",
    "preferred_answer": "z-index is compared within stacking contexts, not as one global number. Properties such as positioned elements with z-index, transforms, opacity, isolation and certain containment values can create new contexts. A child cannot escape its ancestor's context by increasing its own z-index. Inspect the stacking-context tree and simplify unnecessary contexts instead of adding larger arbitrary numbers.",
    "evaluation_points": [
      "Stacking-context scope",
      "Context-creating properties",
      "Child cannot escape ancestor",
      "Inspect and simplify"
    ],
    "resolution_title": "MDN - Stacking Context",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-024",
    "role_slug": "frontend-developer",
    "domain": "CSS Cascade, Layout and Responsive Design",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "A card grid works at desktop widths but overflows in a narrow embedded panel. How would you fix it?",
    "preferred_answer": "Inspect intrinsic minimum sizes, fixed widths, long content and the actual container rather than only the viewport. Use minmax with a zero or suitable minimum, allow text and media to shrink, define aspect ratios, and apply a container query for component-level changes. Verify keyboard order and content priority when columns collapse; do not solve overflow by clipping essential content.",
    "evaluation_points": [
      "Intrinsic-size diagnosis",
      "Flexible track and content rules",
      "Container-aware adaptation",
      "Usability after collapse"
    ],
    "resolution_title": "MDN - CSS Grid Layout",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-025",
    "role_slug": "frontend-developer",
    "domain": "JavaScript Language and Asynchronous Execution",
    "difficulty": "foundation",
    "question_type": "language",
    "prompt": "Differentiate var, let and const.",
    "preferred_answer": "var is function-scoped, is hoisted with an initial undefined value and can be redeclared in the same scope. let and const are block-scoped and remain in the temporal dead zone until their declaration is evaluated. const prevents rebinding, not mutation of an object. Prefer const by default and let for intentional reassignment; avoid var in modern application code unless interoperating with legacy patterns.",
    "evaluation_points": [
      "Function versus block scope",
      "Hoisting and temporal dead zone",
      "Const rebinding nuance",
      "Practical declaration choice"
    ],
    "resolution_title": "ECMAScript Language Specification",
    "resolution_url": "https://tc39.es/ecma262/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-026",
    "role_slug": "frontend-developer",
    "domain": "JavaScript Language and Asynchronous Execution",
    "difficulty": "foundation",
    "question_type": "asynchrony",
    "prompt": "What is the relationship between the call stack, task queue and microtask queue?",
    "preferred_answer": "JavaScript runs one stack of synchronous execution per agent. Browser tasks include events and timers; after a task completes and the stack is empty, the runtime drains queued microtasks such as promise reactions before the next task and rendering opportunity. A long synchronous task or an endless chain of microtasks can delay input and paint even though individual callbacks are asynchronous.",
    "evaluation_points": [
      "Single execution stack",
      "Tasks versus microtasks",
      "Drain ordering",
      "Starvation and rendering effect"
    ],
    "resolution_title": "MDN - JavaScript Execution Model",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-027",
    "role_slug": "frontend-developer",
    "domain": "JavaScript Language and Asynchronous Execution",
    "difficulty": "intermediate",
    "question_type": "language",
    "prompt": "What is a closure, and where can it cause a frontend bug?",
    "preferred_answer": "A closure is a function together with access to the lexical environment in which it was created. It enables private state, callbacks and factories. Bugs arise when a callback captures stale values, loop variables are scoped incorrectly, or retained closures keep large objects and DOM nodes alive. The fix depends on intended lifetime: update dependencies, pass current values, narrow captured state or release listeners.",
    "evaluation_points": [
      "Lexical environment",
      "Useful patterns",
      "Stale capture or retention bugs",
      "Lifetime-aware remediation"
    ],
    "resolution_title": "MDN - Closures",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-028",
    "role_slug": "frontend-developer",
    "domain": "JavaScript Language and Asynchronous Execution",
    "difficulty": "intermediate",
    "question_type": "data",
    "prompt": "Why is object equality often surprising in JavaScript UI code?",
    "preferred_answer": "Objects and arrays are compared by reference, not structural content. Two separately created objects with equal fields are not strictly equal, while mutating one object preserves its reference. UI libraries and memoisation frequently use reference equality, so immutable updates can make changes observable. Deep comparison is not universally better because it can be expensive and may conceal unclear state ownership.",
    "evaluation_points": [
      "Reference equality",
      "Mutation preserves identity",
      "Immutable update significance",
      "Deep-comparison trade-off"
    ],
    "resolution_title": "ECMAScript Language Specification",
    "resolution_url": "https://tc39.es/ecma262/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-029",
    "role_slug": "frontend-developer",
    "domain": "JavaScript Language and Asynchronous Execution",
    "difficulty": "intermediate",
    "question_type": "promises",
    "prompt": "What is the difference between returning a promise and awaiting it inside an async function?",
    "preferred_answer": "An async function always returns a promise. Returning an existing promise adopts its eventual state; awaiting pauses that function, unwraps the value or throws locally, and lets try/catch/finally handle the failure at that point. Await can also affect stack traces and sequencing. Avoid unnecessary serial awaits when operations are independent, but do not parallelise actions that require ordering or shared mutation.",
    "evaluation_points": [
      "Async return contract",
      "Await local control flow",
      "Error handling",
      "Serial versus parallel judgement"
    ],
    "resolution_title": "MDN - Using Promises",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-030",
    "role_slug": "frontend-developer",
    "domain": "JavaScript Language and Asynchronous Execution",
    "difficulty": "advanced",
    "question_type": "architecture",
    "prompt": "How should cancellation be designed for a search-as-you-type interface?",
    "preferred_answer": "Associate each request with an AbortController or library cancellation mechanism, cancel superseded work, and ensure only the latest request may update visible state. Debouncing reduces request volume but does not itself prevent stale responses. Treat abort as an expected state, clean up on unmount or route change, and make server work idempotent or independently cancellable where possible.",
    "evaluation_points": [
      "Abort superseded requests",
      "Latest-result ownership",
      "Debounce versus cancellation",
      "Cleanup and expected abort state"
    ],
    "resolution_title": "MDN - AbortController",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-031",
    "role_slug": "frontend-developer",
    "domain": "JavaScript Language and Asynchronous Execution",
    "difficulty": "advanced",
    "question_type": "modules",
    "prompt": "What makes an ES module graph suitable for static analysis and tree shaking?",
    "preferred_answer": "Static import and export declarations make dependencies and exported bindings discoverable before execution. This allows bundlers to trace unused exports, but actual removal depends on side-effect analysis, package metadata and code patterns. Dynamic import creates asynchronous split points. Tree shaking is not guaranteed simply because ESM syntax is present; top-level side effects and CommonJS boundaries can retain code.",
    "evaluation_points": [
      "Static imports and exports",
      "Bundler graph analysis",
      "Dynamic import split points",
      "Side-effect and interoperability limits"
    ],
    "resolution_title": "MDN - JavaScript Modules",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-032",
    "role_slug": "frontend-developer",
    "domain": "JavaScript Language and Asynchronous Execution",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "A typeahead occasionally shows results for an older query after the user has typed a newer one. What is happening and how do you fix it?",
    "preferred_answer": "The requests are completing out of order, so an earlier response overwrites newer state. Give each request a cancellation signal or monotonically increasing request token, ignore stale completions, and define loading and error state per active query. Test slow and reordered network responses. Debouncing may reduce frequency but cannot by itself guarantee response ordering.",
    "evaluation_points": [
      "Race-condition identification",
      "Cancellation or sequence token",
      "Active-query state",
      "Reordered-network testing"
    ],
    "resolution_title": "MDN - AbortController",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-033",
    "role_slug": "frontend-developer",
    "domain": "TypeScript for Frontend Applications",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "What does TypeScript guarantee, and what does it not guarantee at runtime?",
    "preferred_answer": "TypeScript checks program structure at development or build time and then erases most types from emitted JavaScript. It can prevent many invalid property, call and assignment patterns when types are accurate. It does not validate network responses, local storage, user input or untyped third-party values at runtime. Those boundaries need parsing or validation before the data is trusted.",
    "evaluation_points": [
      "Compile-time checking",
      "Type erasure",
      "Useful defect prevention",
      "Runtime boundary validation"
    ],
    "resolution_title": "TypeScript Handbook - Everyday Types",
    "resolution_url": "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-034",
    "role_slug": "frontend-developer",
    "domain": "TypeScript for Frontend Applications",
    "difficulty": "foundation",
    "question_type": "types",
    "prompt": "Why is unknown safer than any?",
    "preferred_answer": "any disables type checking for operations performed on the value and can spread unsafety through the codebase. unknown accepts any incoming value but requires narrowing before properties are read or methods are called. It is therefore suitable for caught errors, parsed external values and uncertain APIs. The goal is not to cast unknown away immediately, but to establish evidence for a narrower type.",
    "evaluation_points": [
      "Any disables checking",
      "Unknown requires narrowing",
      "Boundary use cases",
      "Evidence before assertion"
    ],
    "resolution_title": "TypeScript Handbook - Narrowing",
    "resolution_url": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-035",
    "role_slug": "frontend-developer",
    "domain": "TypeScript for Frontend Applications",
    "difficulty": "intermediate",
    "question_type": "modelling",
    "prompt": "When is a discriminated union better than several optional boolean flags?",
    "preferred_answer": "A discriminated union represents each valid state as a separate object with a shared literal tag, such as loading, success or error. This prevents impossible combinations and enables exhaustive narrowing. Multiple flags can express contradictory states and distribute related fields across optionals. Use a union when state transitions and per-state data matter, while keeping the variants small and aligned with real domain behaviour.",
    "evaluation_points": [
      "Explicit valid states",
      "Impossible-state prevention",
      "Exhaustive narrowing",
      "Domain-aligned variants"
    ],
    "resolution_title": "TypeScript Handbook - Narrowing",
    "resolution_url": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-036",
    "role_slug": "frontend-developer",
    "domain": "TypeScript for Frontend Applications",
    "difficulty": "intermediate",
    "question_type": "generics",
    "prompt": "What makes a useful generic component API?",
    "preferred_answer": "A generic should preserve meaningful relationships between inputs and outputs that would otherwise be lost, such as a table column key matching the row type. Add constraints only for operations the implementation requires. Avoid a type parameter used once, over-general APIs or casts inside the component that hide an unsound design. Inference should handle the common case, with explicit type arguments available for ambiguous cases.",
    "evaluation_points": [
      "Preserves type relationships",
      "Minimal constraints",
      "Avoid meaningless generics",
      "Useful inference"
    ],
    "resolution_title": "TypeScript Handbook - Generics",
    "resolution_url": "https://www.typescriptlang.org/docs/handbook/2/generics.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-037",
    "role_slug": "frontend-developer",
    "domain": "TypeScript for Frontend Applications",
    "difficulty": "intermediate",
    "question_type": "configuration",
    "prompt": "Why should strict compiler options be enabled deliberately rather than adding casts until the build passes?",
    "preferred_answer": "Strict checks expose nullable paths, implicit any values, unsafe indexed access and function variance issues that often reflect real assumptions. Turning them on may require staged migration, boundary adapters and clearer models. Broad type assertions merely silence the compiler without proving the value. Record temporary exceptions, constrain their scope and remove them as the source or runtime validation improves.",
    "evaluation_points": [
      "Strict checks reveal assumptions",
      "Staged migration",
      "Assertion is not proof",
      "Scoped temporary exceptions"
    ],
    "resolution_title": "TypeScript TSConfig Reference",
    "resolution_url": "https://www.typescriptlang.org/tsconfig/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-038",
    "role_slug": "frontend-developer",
    "domain": "TypeScript for Frontend Applications",
    "difficulty": "advanced",
    "question_type": "libraries",
    "prompt": "How should a frontend package publish JavaScript and type declarations for different consumers?",
    "preferred_answer": "Publish declarations that match the actual runtime entry points, use package exports to define supported import paths, and test ESM and any supported CommonJS conditions. Ensure typesVersions or conditional types are used only when required, and do not expose internal files accidentally. Consumer tests should verify editor resolution, emitted imports and tree-shaking behaviour across the supported toolchain matrix.",
    "evaluation_points": [
      "Declarations match runtime",
      "Controlled export map",
      "ESM/CommonJS compatibility",
      "Consumer resolution tests"
    ],
    "resolution_title": "TypeScript Handbook - Type Declarations",
    "resolution_url": "https://www.typescriptlang.org/docs/handbook/2/type-declarations",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-039",
    "role_slug": "frontend-developer",
    "domain": "TypeScript for Frontend Applications",
    "difficulty": "advanced",
    "question_type": "architecture",
    "prompt": "When should runtime schema validation be paired with inferred TypeScript types?",
    "preferred_answer": "Use it at untrusted boundaries such as API responses, browser storage, messages and configuration. A schema can validate runtime data and often generate or infer a static type, reducing duplication. The schema still needs versioning, error policy and performance consideration. Internal objects already created by typed code usually do not need repeated validation unless they cross a trust or persistence boundary.",
    "evaluation_points": [
      "Untrusted-boundary use",
      "Static and runtime alignment",
      "Version and failure policy",
      "Avoid redundant internal validation"
    ],
    "resolution_title": "TypeScript Handbook - Everyday Types",
    "resolution_url": "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-040",
    "role_slug": "frontend-developer",
    "domain": "TypeScript for Frontend Applications",
    "difficulty": "scenario",
    "question_type": "refactoring",
    "prompt": "A codebase uses any for every API response and has frequent production crashes on missing fields. How would you migrate it?",
    "preferred_answer": "Inventory high-impact endpoints, replace any with unknown at the client boundary, add runtime parsers and explicit success/error models, then expose typed domain objects to components. Enable stricter compiler checks in stages and use generated contract types where trustworthy. Track parser failures and server drift. Avoid a mass cast to interfaces, which would preserve the same runtime risk under cleaner-looking syntax.",
    "evaluation_points": [
      "Prioritised endpoint inventory",
      "Unknown plus runtime parsing",
      "Typed domain boundary",
      "Staged strictness without mass casting"
    ],
    "resolution_title": "TypeScript Handbook - Narrowing",
    "resolution_url": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-041",
    "role_slug": "frontend-developer",
    "domain": "DOM, Events and Browser APIs",
    "difficulty": "foundation",
    "question_type": "dom",
    "prompt": "What is the DOM, and why is it not the original HTML source?",
    "preferred_answer": "The DOM is the browser's live object model of the parsed document. Parsing can repair invalid markup, scripts can add or remove nodes, and browser features may reflect state that was not present in the original response. Developer tools commonly show the current DOM, not the untouched source. Frontend code should reason about the live tree and avoid assuming source text and runtime structure are always identical.",
    "evaluation_points": [
      "Live object model",
      "Parser repair",
      "Script-driven mutation",
      "Source versus runtime distinction"
    ],
    "resolution_title": "MDN - Document Object Model",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-042",
    "role_slug": "frontend-developer",
    "domain": "DOM, Events and Browser APIs",
    "difficulty": "foundation",
    "question_type": "events",
    "prompt": "Explain event capture, target and bubble phases.",
    "preferred_answer": "An event travels from the window toward the target during capture, reaches the target, and then usually bubbles back through ancestors. Listeners can be registered for capture or bubble. Propagation and default browser behaviour are separate concepts: stopPropagation affects traversal, while preventDefault requests cancellation of a cancelable default action. Use both sparingly because global interruption can break composition and accessibility.",
    "evaluation_points": [
      "Three phases",
      "Listener phase choice",
      "Propagation versus default action",
      "Cautious interruption"
    ],
    "resolution_title": "WHATWG DOM Standard",
    "resolution_url": "https://dom.spec.whatwg.org/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-043",
    "role_slug": "frontend-developer",
    "domain": "DOM, Events and Browser APIs",
    "difficulty": "intermediate",
    "question_type": "patterns",
    "prompt": "When is event delegation useful?",
    "preferred_answer": "Delegation places one listener on a stable ancestor and uses the event target or composed path to identify matching descendants. It is useful for dynamic lists and large groups of similar controls, reducing listener setup and simplifying lifecycle management. It needs careful selector checks, keyboard-equivalent behaviour and awareness of non-bubbling events and shadow DOM boundaries.",
    "evaluation_points": [
      "Ancestor listener",
      "Dynamic-list and scale benefit",
      "Target matching",
      "Non-bubbling and shadow-boundary limits"
    ],
    "resolution_title": "MDN - Introduction to Events",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-044",
    "role_slug": "frontend-developer",
    "domain": "DOM, Events and Browser APIs",
    "difficulty": "intermediate",
    "question_type": "observers",
    "prompt": "When would you use IntersectionObserver instead of a scroll handler?",
    "preferred_answer": "IntersectionObserver asynchronously reports visibility relationships between a target and a root without requiring repeated geometry reads on every scroll event. It is useful for lazy work, exposure measurement and infinite loading. It does not provide pixel-perfect continuous animation data, and thresholds, root margins, unobserving and loading guards must be designed to prevent duplicate or premature work.",
    "evaluation_points": [
      "Asynchronous intersection reporting",
      "Lazy and exposure use",
      "Not continuous animation telemetry",
      "Threshold and cleanup design"
    ],
    "resolution_title": "MDN - Intersection Observer API",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-045",
    "role_slug": "frontend-developer",
    "domain": "DOM, Events and Browser APIs",
    "difficulty": "intermediate",
    "question_type": "storage",
    "prompt": "How do localStorage, sessionStorage and IndexedDB differ?",
    "preferred_answer": "localStorage is synchronous string storage scoped to an origin and persists beyond a session. sessionStorage is also synchronous and string-based but scoped to a tab session. IndexedDB is asynchronous, transactional and suitable for larger structured data. None should be treated as a trusted secret store, and synchronous storage can block the main thread. Choose based on data size, lifetime, access pattern and sensitivity.",
    "evaluation_points": [
      "Lifetime distinction",
      "Synchronous string storage",
      "IndexedDB capabilities",
      "Security and main-thread limits"
    ],
    "resolution_title": "MDN - Storage API",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/Storage_API",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-046",
    "role_slug": "frontend-developer",
    "domain": "DOM, Events and Browser APIs",
    "difficulty": "advanced",
    "question_type": "architecture",
    "prompt": "What risks arise when a component attaches global event listeners or observers?",
    "preferred_answer": "Listeners can outlive the component, retain closures, fire multiple times after remounting and respond in the wrong route or state. Observers can keep targets reachable and perform unnecessary work. Register only when needed, use stable handlers, remove or abort subscriptions during cleanup, and test strict or repeated mount cycles. Centralised listeners should have explicit ownership rather than relying on page reload to clear them.",
    "evaluation_points": [
      "Lifetime and memory risk",
      "Duplicate behaviour",
      "Cleanup or abort",
      "Explicit ownership and remount testing"
    ],
    "resolution_title": "MDN - Introduction to Events",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-047",
    "role_slug": "frontend-developer",
    "domain": "DOM, Events and Browser APIs",
    "difficulty": "advanced",
    "question_type": "web components",
    "prompt": "How does event propagation interact with shadow DOM?",
    "preferred_answer": "Events may be retargeted so outside code sees the custom element rather than internal nodes, protecting encapsulation. Only composed events cross a shadow boundary, and bubbling remains a separate property. Component authors should expose deliberate high-level events with stable detail, avoid leaking internal implementation and ensure accessible semantics are represented on the host or through supported relationships.",
    "evaluation_points": [
      "Retargeting",
      "Composed versus bubbling",
      "Stable public events",
      "Encapsulation and accessibility"
    ],
    "resolution_title": "WHATWG DOM Standard",
    "resolution_url": "https://dom.spec.whatwg.org/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-048",
    "role_slug": "frontend-developer",
    "domain": "DOM, Events and Browser APIs",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "After navigating between routes several times, each click triggers the same action four times. How would you diagnose it?",
    "preferred_answer": "Confirm duplicate listener execution in the debugger, inspect component mount and cleanup paths, and identify whether anonymous handlers, subscriptions or delegated roots are re-registered. Add an abort signal or deterministic unsubscribe, use stable ownership and verify that route transitions remove previous listeners. Also check development strict-mode behaviour separately from a production leak so the fix addresses the real lifecycle issue.",
    "evaluation_points": [
      "Duplicate-listener confirmation",
      "Mount/cleanup inspection",
      "Deterministic unsubscribe",
      "Development versus production distinction"
    ],
    "resolution_title": "MDN - Introduction to Events",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-049",
    "role_slug": "frontend-developer",
    "domain": "Accessibility and Inclusive UI",
    "difficulty": "foundation",
    "question_type": "principles",
    "prompt": "What do the four WCAG principles mean for frontend implementation?",
    "preferred_answer": "Content should be perceivable through alternatives and adaptable presentation, operable with keyboard and sufficient time, understandable in language and interaction, and robust across browsers and assistive technologies. The principles guide outcomes rather than prescribing one framework. A strong implementation combines semantic HTML, visual design, interaction design, content and testing instead of treating accessibility as an automated audit score.",
    "evaluation_points": [
      "Perceivable",
      "Operable",
      "Understandable",
      "Robust and outcome-focused"
    ],
    "resolution_title": "W3C - Web Content Accessibility Guidelines 2.2",
    "resolution_url": "https://www.w3.org/TR/WCAG22/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-050",
    "role_slug": "frontend-developer",
    "domain": "Accessibility and Inclusive UI",
    "difficulty": "foundation",
    "question_type": "keyboard",
    "prompt": "What makes a custom interactive widget keyboard accessible?",
    "preferred_answer": "It must be reachable in a logical focus order, expose the correct role, name, state and value, support the expected keyboard pattern, show visible focus and preserve escape or exit behaviour. Prefer a native control first. For composite widgets, follow an established APG pattern and manage internal focus deliberately rather than placing every descendant in the tab order.",
    "evaluation_points": [
      "Logical focusability",
      "Role/name/state",
      "Expected keyboard interaction",
      "Native-first and composite focus pattern"
    ],
    "resolution_title": "W3C - ARIA Authoring Practices Guide",
    "resolution_url": "https://www.w3.org/WAI/ARIA/apg/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-051",
    "role_slug": "frontend-developer",
    "domain": "Accessibility and Inclusive UI",
    "difficulty": "intermediate",
    "question_type": "focus",
    "prompt": "When should an application move focus after a UI update?",
    "preferred_answer": "Move focus when the user's context changes and the next action would otherwise be unclear, such as opening a modal, navigating to a new view or submitting a form with errors. Do not move focus for routine background updates. Focus the most useful semantic target, preserve return focus when a temporary surface closes and announce dynamic status separately when focus movement would be disruptive.",
    "evaluation_points": [
      "Context-change trigger",
      "No unnecessary movement",
      "Useful semantic target",
      "Return focus and status announcement"
    ],
    "resolution_title": "W3C - Understanding Focus Visible",
    "resolution_url": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-052",
    "role_slug": "frontend-developer",
    "domain": "Accessibility and Inclusive UI",
    "difficulty": "intermediate",
    "question_type": "aria",
    "prompt": "What is the first rule of ARIA, and why does it matter?",
    "preferred_answer": "Use native HTML semantics and behaviour when they meet the requirement rather than replacing them with ARIA. ARIA can expose roles, states and relationships but does not add keyboard interaction, focus management or visual behaviour. Incorrect ARIA can override useful native semantics and make a control less accessible, so every added attribute needs a clear purpose and tested interaction model.",
    "evaluation_points": [
      "Native HTML first",
      "ARIA does not add behaviour",
      "Incorrect ARIA risk",
      "Purpose and testing"
    ],
    "resolution_title": "W3C - WAI-ARIA Overview",
    "resolution_url": "https://www.w3.org/WAI/standards-guidelines/aria/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-053",
    "role_slug": "frontend-developer",
    "domain": "Accessibility and Inclusive UI",
    "difficulty": "intermediate",
    "question_type": "dynamic content",
    "prompt": "How should asynchronous status messages be announced?",
    "preferred_answer": "Use an appropriate live region or status role for concise, meaningful changes that users need without moving focus. Insert or update the message in a way assistive technology can detect, avoid repeatedly announcing every loading tick and do not hide the text visually unless the design has an equivalent visible status. Errors requiring action may need focus or an error summary in addition to a live announcement.",
    "evaluation_points": [
      "Appropriate live region",
      "Concise meaningful update",
      "Avoid announcement noise",
      "Actionable errors may need focus"
    ],
    "resolution_title": "W3C - ARIA Authoring Practices Guide",
    "resolution_url": "https://www.w3.org/WAI/ARIA/apg/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-054",
    "role_slug": "frontend-developer",
    "domain": "Accessibility and Inclusive UI",
    "difficulty": "advanced",
    "question_type": "names",
    "prompt": "How are an accessible name and an accessible description different?",
    "preferred_answer": "The accessible name identifies the control or region and is the primary label announced by assistive technology. The description supplies supplementary help, format or consequence. Names can come from native labels, text content, aria-label or aria-labelledby according to naming rules; descriptions may use aria-describedby or native relationships. Avoid replacing visible labels with hidden names that differ unexpectedly.",
    "evaluation_points": [
      "Primary identity versus supplementary help",
      "Naming sources",
      "Description relationships",
      "Visible and accessible label consistency"
    ],
    "resolution_title": "W3C APG - Names and Descriptions",
    "resolution_url": "https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-055",
    "role_slug": "frontend-developer",
    "domain": "Accessibility and Inclusive UI",
    "difficulty": "advanced",
    "question_type": "testing",
    "prompt": "Why is passing an automated accessibility scan insufficient?",
    "preferred_answer": "Automated tools can detect many syntax, contrast and relationship issues but cannot reliably judge meaningful alternative text, logical reading order, keyboard workflow, focus management, understandable errors or whether a task is usable. Combine automated checks with keyboard testing, accessibility-tree inspection, screen-reader checks and user research where possible. Treat failures as product defects and test complete flows, not isolated components only.",
    "evaluation_points": [
      "Automation coverage limit",
      "Manual keyboard and AT testing",
      "Complete-task testing",
      "Product-defect framing"
    ],
    "resolution_title": "W3C - Web Content Accessibility Guidelines 2.2",
    "resolution_url": "https://www.w3.org/TR/WCAG22/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-056",
    "role_slug": "frontend-developer",
    "domain": "Accessibility and Inclusive UI",
    "difficulty": "scenario",
    "question_type": "review",
    "prompt": "A modal looks correct but keyboard focus moves behind it and Escape does nothing. What needs to change?",
    "preferred_answer": "Move focus into the modal when it opens, keep tab navigation within the active dialog, mark or make background content inert, provide an accessible name and close control, support Escape unless the action would be unsafe, and return focus to the invoking control. Preserve scroll and announce validation errors inside the dialog. Use a tested native or framework dialog implementation rather than hand-building partial focus trapping.",
    "evaluation_points": [
      "Initial and contained focus",
      "Background inactivity",
      "Name, close and Escape",
      "Return focus and tested implementation"
    ],
    "resolution_title": "W3C - ARIA Authoring Practices Guide",
    "resolution_url": "https://www.w3.org/WAI/ARIA/apg/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-057",
    "role_slug": "frontend-developer",
    "domain": "Performance and Core Web Vitals",
    "difficulty": "foundation",
    "question_type": "metrics",
    "prompt": "What do LCP, INP and CLS measure?",
    "preferred_answer": "Largest Contentful Paint measures loading of the largest relevant content element, Interaction to Next Paint measures responsiveness across user interactions, and Cumulative Layout Shift measures unexpected visual movement. They represent different user experiences and should be assessed in field data at an appropriate percentile, segmented by device and page type. A single Lighthouse run is diagnostic evidence, not the whole user population.",
    "evaluation_points": [
      "LCP loading",
      "INP responsiveness",
      "CLS stability",
      "Field percentile and lab distinction"
    ],
    "resolution_title": "web.dev - Web Vitals",
    "resolution_url": "https://web.dev/articles/vitals",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-058",
    "role_slug": "frontend-developer",
    "domain": "Performance and Core Web Vitals",
    "difficulty": "foundation",
    "question_type": "measurement",
    "prompt": "What is the difference between lab and field performance data?",
    "preferred_answer": "Lab data is collected in a controlled environment and is useful for reproducible debugging and regression testing. Field data reflects real users, devices, networks, caches and interactions, making it essential for impact and distribution. Lab results can explain a trace; field results reveal who is affected. Use both, align page and release dimensions, and avoid comparing tools with different conditions as if they were identical.",
    "evaluation_points": [
      "Controlled lab",
      "Real-user field",
      "Diagnostic versus population value",
      "Condition-aware comparison"
    ],
    "resolution_title": "Chrome for Developers - Lighthouse",
    "resolution_url": "https://developer.chrome.com/docs/lighthouse/overview",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-059",
    "role_slug": "frontend-developer",
    "domain": "Performance and Core Web Vitals",
    "difficulty": "intermediate",
    "question_type": "lcp",
    "prompt": "What are the main parts of LCP time, and how can each be improved?",
    "preferred_answer": "LCP can be decomposed into time to first byte, resource load delay, resource load duration and element render delay. Improve server response and caching, discover and prioritise the LCP resource early, reduce its transfer cost, and remove CSS, font, JavaScript or rendering work that delays presentation. First identify which part dominates; optimising image compression will not solve a late-discovered or client-rendered element.",
    "evaluation_points": [
      "LCP subparts",
      "Early discovery and priority",
      "Transfer efficiency",
      "Render-delay diagnosis"
    ],
    "resolution_title": "web.dev - Optimize Largest Contentful Paint",
    "resolution_url": "https://web.dev/articles/optimize-lcp",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-060",
    "role_slug": "frontend-developer",
    "domain": "Performance and Core Web Vitals",
    "difficulty": "intermediate",
    "question_type": "inp",
    "prompt": "How do long tasks affect interaction responsiveness?",
    "preferred_answer": "A long main-thread task prevents the browser from processing input, running handlers and presenting the next frame promptly. Break large work into smaller scheduled tasks, reduce script and rendering cost, avoid unnecessary synchronous work in handlers and provide immediate visual feedback where appropriate. Measure the full interaction, including input delay, handler time and presentation delay, rather than only timing the event callback.",
    "evaluation_points": [
      "Main-thread blocking",
      "Task splitting and reduction",
      "Handler and render cost",
      "Full interaction phases"
    ],
    "resolution_title": "web.dev - Optimize Interaction to Next Paint",
    "resolution_url": "https://web.dev/articles/optimize-inp",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-061",
    "role_slug": "frontend-developer",
    "domain": "Performance and Core Web Vitals",
    "difficulty": "intermediate",
    "question_type": "images",
    "prompt": "How should image loading be prioritised on a content page?",
    "preferred_answer": "Serve responsive dimensions and efficient formats, reserve width and height or aspect ratio, load the likely LCP image eagerly and make it discoverable in the initial markup, and lazy-load genuinely offscreen images. Do not lazy-load the above-the-fold hero by default. Use fetch priority only as a measured hint, and confirm that CDN, cache and transformation behaviour match the rendered size.",
    "evaluation_points": [
      "Responsive efficient delivery",
      "Reserved space",
      "Eager LCP and lazy offscreen",
      "Measured priority hint"
    ],
    "resolution_title": "web.dev - Image Performance",
    "resolution_url": "https://web.dev/learn/performance/image-performance",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-062",
    "role_slug": "frontend-developer",
    "domain": "Performance and Core Web Vitals",
    "difficulty": "advanced",
    "question_type": "architecture",
    "prompt": "Why can code splitting improve load time but harm navigation?",
    "preferred_answer": "Smaller initial bundles reduce unused download and execution, but too many tiny chunks create request overhead, duplicated dependencies and late loading when a route or interaction needs code. Split at meaningful route or feature boundaries, prefetch likely next work under suitable conditions and analyse actual chunk graphs. Optimise both initial and subsequent navigation, including cache behaviour and low-bandwidth devices.",
    "evaluation_points": [
      "Initial-payload benefit",
      "Chunk overhead and late loading",
      "Meaningful boundaries",
      "Navigation and cache measurement"
    ],
    "resolution_title": "web.dev - Reduce JavaScript Payloads with Code Splitting",
    "resolution_url": "https://web.dev/articles/reduce-javascript-payloads-with-code-splitting",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-063",
    "role_slug": "frontend-developer",
    "domain": "Performance and Core Web Vitals",
    "difficulty": "advanced",
    "question_type": "cls",
    "prompt": "What causes layout shifts after initial paint, and how should they be prevented?",
    "preferred_answer": "Common causes include media without reserved dimensions, ads or embeds inserted above content, late font metric changes and animations that affect layout. Reserve space, use stable placeholders, append dynamic content without moving the user's current context, choose font-loading strategies with compatible metrics and animate transforms rather than geometry. Distinguish expected shifts caused by recent input from unexpected instability.",
    "evaluation_points": [
      "Media and embed causes",
      "Space reservation",
      "Font and animation handling",
      "Expected versus unexpected shifts"
    ],
    "resolution_title": "web.dev - Optimize Cumulative Layout Shift",
    "resolution_url": "https://web.dev/articles/optimize-cls",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-064",
    "role_slug": "frontend-developer",
    "domain": "Performance and Core Web Vitals",
    "difficulty": "scenario",
    "question_type": "performance",
    "prompt": "Field INP is poor on low-end Android devices, but desktop Lighthouse is good. What is your plan?",
    "preferred_answer": "Segment field data by device, route and interaction, reproduce with CPU throttling and representative network conditions, then capture traces around the slow interactions. Identify third-party work, long handlers, framework rendering and layout cost. Reduce main-thread JavaScript, virtualise or simplify heavy UI, schedule non-critical work and ship a measurable experiment. Keep monitoring the field percentile after release because laboratory success may not reach affected users.",
    "evaluation_points": [
      "Field segmentation",
      "Representative reproduction",
      "Interaction trace attribution",
      "Measured release and field follow-up"
    ],
    "resolution_title": "web.dev - Optimize Interaction to Next Paint",
    "resolution_url": "https://web.dev/articles/optimize-inp",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-065",
    "role_slug": "frontend-developer",
    "domain": "HTTP, Networking, Caching and Data Transfer",
    "difficulty": "foundation",
    "question_type": "http",
    "prompt": "What is the practical difference between GET, POST, PUT, PATCH and DELETE?",
    "preferred_answer": "GET retrieves a representation and should be safe. POST submits a request whose semantics are defined by the resource and is often used to create or trigger processing. PUT replaces or creates the state at a known target and is normally idempotent. PATCH applies a partial modification. DELETE requests removal and is also defined as idempotent, although repeated responses may differ. Client behaviour should follow the API contract rather than method names alone.",
    "evaluation_points": [
      "Safe GET",
      "POST processing",
      "PUT/PATCH distinction",
      "Idempotency and contract nuance"
    ],
    "resolution_title": "MDN - HTTP Overview",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-066",
    "role_slug": "frontend-developer",
    "domain": "HTTP, Networking, Caching and Data Transfer",
    "difficulty": "foundation",
    "question_type": "fetch",
    "prompt": "Why does fetch not reject its promise for an HTTP 404 or 500 response?",
    "preferred_answer": "Fetch rejects for network-level failures, aborted requests and some policy errors, but an HTTP error is still a successfully received Response. Application code must inspect response.ok or status and parse an expected error body safely. This separation lets clients handle redirects, validation errors and server failures explicitly. Parsing can also fail independently, so transport, HTTP status and body decoding should be represented as distinct failure states.",
    "evaluation_points": [
      "Network versus HTTP failure",
      "Explicit status check",
      "Error-body handling",
      "Separate parsing failure"
    ],
    "resolution_title": "MDN - Using the Fetch API",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-067",
    "role_slug": "frontend-developer",
    "domain": "HTTP, Networking, Caching and Data Transfer",
    "difficulty": "intermediate",
    "question_type": "caching",
    "prompt": "Differentiate freshness caching and validation caching.",
    "preferred_answer": "Freshness directives such as max-age allow a stored response to be reused without contacting the server until it becomes stale. Validation uses a validator such as ETag or Last-Modified so the client can ask whether the representation changed and receive a 304 response. Use immutable long-lived caching for content-addressed assets and controlled revalidation for changing resources; do not apply one cache policy to every response.",
    "evaluation_points": [
      "Fresh reuse",
      "Conditional validation",
      "ETag or Last-Modified",
      "Resource-specific policy"
    ],
    "resolution_title": "MDN - HTTP Caching",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-068",
    "role_slug": "frontend-developer",
    "domain": "HTTP, Networking, Caching and Data Transfer",
    "difficulty": "intermediate",
    "question_type": "cors",
    "prompt": "What does a CORS preflight check, and why is it not an authentication mechanism?",
    "preferred_answer": "For a non-simple cross-origin request, the browser can send an OPTIONS request describing the intended method and headers. The server responds with the origins, methods, headers and credential policy it permits. This controls whether browser JavaScript may make and read the request. It does not authenticate the user, protect non-browser clients or replace server-side authorisation.",
    "evaluation_points": [
      "OPTIONS permission check",
      "Origin/method/header response",
      "Browser enforcement",
      "Not authentication or authorisation"
    ],
    "resolution_title": "MDN - Cross-Origin Resource Sharing",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-069",
    "role_slug": "frontend-developer",
    "domain": "HTTP, Networking, Caching and Data Transfer",
    "difficulty": "intermediate",
    "question_type": "cookies",
    "prompt": "Which cookie attributes matter for a frontend authentication session?",
    "preferred_answer": "Secure restricts transmission to HTTPS, HttpOnly prevents JavaScript access, SameSite influences cross-site sending, Path and Domain define scope, and expiry controls lifetime. Session identifiers should usually be opaque, narrowly scoped and rotated. The frontend must still implement CSRF protections where cookies authenticate requests, avoid exposing tokens in URLs or logs and coordinate logout with server-side invalidation.",
    "evaluation_points": [
      "Secure and HttpOnly",
      "SameSite and scope",
      "Opaque rotated session",
      "CSRF and invalidation"
    ],
    "resolution_title": "MDN - Using HTTP Cookies",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-070",
    "role_slug": "frontend-developer",
    "domain": "HTTP, Networking, Caching and Data Transfer",
    "difficulty": "advanced",
    "question_type": "performance",
    "prompt": "When should preload or fetch priority be used?",
    "preferred_answer": "Use preload when a critical resource is known from the initial document but would otherwise be discovered late, and ensure the as type, credentials mode and URL match the eventual request so the resource is reused. Fetch priority is a hint to adjust relative priority, not a command. Overuse competes with truly critical assets and can waste bandwidth, so verify the request waterfall and LCP effect.",
    "evaluation_points": [
      "Late-discovered critical resource",
      "Matching request attributes",
      "Priority as hint",
      "Overuse and measurement"
    ],
    "resolution_title": "MDN - rel=preload",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-071",
    "role_slug": "frontend-developer",
    "domain": "HTTP, Networking, Caching and Data Transfer",
    "difficulty": "advanced",
    "question_type": "reliability",
    "prompt": "How should a frontend retry failed requests?",
    "preferred_answer": "Retry only failures that are plausibly transient and only when the operation is safe or idempotency is guaranteed. Use bounded exponential backoff with jitter, respect server guidance such as Retry-After, stop on abort or permanent client errors and avoid multiplying retries across several layers. Mutations may require idempotency keys or explicit user confirmation. Surface state clearly rather than leaving the interface indefinitely loading.",
    "evaluation_points": [
      "Transient failure classification",
      "Bounded backoff and jitter",
      "Idempotency for mutations",
      "Layering and user-state clarity"
    ],
    "resolution_title": "MDN - HTTP Overview",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-072",
    "role_slug": "frontend-developer",
    "domain": "HTTP, Networking, Caching and Data Transfer",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "An API works in a command-line client but fails in the browser with a CORS message. What do you inspect?",
    "preferred_answer": "Compare origins including scheme, host and port, inspect the preflight request and response, and verify allowed origin, method, headers and credential settings. Check redirects because a preflight or credentialed request may behave differently, and confirm that the server returns headers on error responses too. Do not use no-cors as a fix because it produces an opaque response and does not grant access to the data.",
    "evaluation_points": [
      "Exact origin comparison",
      "Preflight inspection",
      "Credentials and redirects",
      "Reject no-cors workaround"
    ],
    "resolution_title": "MDN - Cross-Origin Resource Sharing",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-073",
    "role_slug": "frontend-developer",
    "domain": "Frontend Security",
    "difficulty": "foundation",
    "question_type": "xss",
    "prompt": "What is cross-site scripting, and what is the primary defence in frontend code?",
    "preferred_answer": "XSS occurs when attacker-controlled data is interpreted as executable browser content in another user's origin. The primary defence is context-appropriate safe rendering: use framework text bindings, safe DOM APIs and output encoding for the destination context rather than concatenating HTML, JavaScript, CSS or URLs. Input validation and CSP add layers but do not replace correct output handling.",
    "evaluation_points": [
      "Untrusted data becomes executable",
      "Context-aware output handling",
      "Safe framework and DOM APIs",
      "Validation/CSP as layers"
    ],
    "resolution_title": "OWASP - Cross Site Scripting Prevention Cheat Sheet",
    "resolution_url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-074",
    "role_slug": "frontend-developer",
    "domain": "Frontend Security",
    "difficulty": "foundation",
    "question_type": "origins",
    "prompt": "What does the same-origin policy protect?",
    "preferred_answer": "It limits how documents and scripts from one origin can read or manipulate resources from another origin, where origin is defined by scheme, host and port. It helps isolate data and DOM state between sites. Explicit mechanisms such as CORS, postMessage and certain embedded-resource rules allow controlled interaction. It is a browser boundary, not a substitute for authentication, authorisation or server validation.",
    "evaluation_points": [
      "Scheme-host-port origin",
      "Cross-origin read isolation",
      "Explicit sharing mechanisms",
      "Not a server-security substitute"
    ],
    "resolution_title": "MDN - Same-Origin Policy",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-075",
    "role_slug": "frontend-developer",
    "domain": "Frontend Security",
    "difficulty": "intermediate",
    "question_type": "csp",
    "prompt": "How does Content Security Policy reduce XSS risk?",
    "preferred_answer": "CSP lets a site restrict permitted script, style, frame and other resource sources, and stronger policies can use nonces or hashes to avoid broad inline execution. It can block or report injected code that violates the policy. A weak allow-list, unsafe-inline or compromised allowed host can undermine it. Deploy in report-only mode, analyse violations and retain safe rendering as the primary defence.",
    "evaluation_points": [
      "Resource and script restrictions",
      "Nonce/hash policy",
      "Weak-policy limitations",
      "Report-only rollout and defence in depth"
    ],
    "resolution_title": "MDN - Content Security Policy",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-076",
    "role_slug": "frontend-developer",
    "domain": "Frontend Security",
    "difficulty": "intermediate",
    "question_type": "csrf",
    "prompt": "When is CSRF a risk for a single-page application?",
    "preferred_answer": "CSRF matters when the browser automatically attaches ambient credentials such as cookies to a state-changing request that an attacker can trigger cross-site. Defend with SameSite cookies, anti-CSRF tokens or origin verification, safe method semantics and re-authentication for sensitive operations. Storing a bearer token in JavaScript may change the CSRF model but can increase token theft impact under XSS.",
    "evaluation_points": [
      "Ambient credential condition",
      "SameSite/token/origin controls",
      "Safe method use",
      "XSS trade-off of JS tokens"
    ],
    "resolution_title": "OWASP - Cross-Site Request Forgery Prevention Cheat Sheet",
    "resolution_url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-077",
    "role_slug": "frontend-developer",
    "domain": "Frontend Security",
    "difficulty": "intermediate",
    "question_type": "storage",
    "prompt": "Why should sensitive tokens generally not be stored in localStorage?",
    "preferred_answer": "Any script executing in the origin can read localStorage, so an XSS vulnerability or compromised third-party script can extract a long-lived bearer token. The storage is also persistent and lacks cookie protections such as HttpOnly. Prefer secure session architecture using narrowly scoped HttpOnly cookies or short-lived in-memory tokens where suitable, and design for rotation, revocation and CSRF protection.",
    "evaluation_points": [
      "Origin-script readability",
      "XSS and third-party exposure",
      "Persistence and no HttpOnly",
      "Safer session lifecycle"
    ],
    "resolution_title": "OWASP - HTML5 Security Cheat Sheet",
    "resolution_url": "https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-078",
    "role_slug": "frontend-developer",
    "domain": "Frontend Security",
    "difficulty": "advanced",
    "question_type": "supply chain",
    "prompt": "How should third-party JavaScript risk be managed?",
    "preferred_answer": "Inventory every script and the data and privileges it receives, remove unused vendors, load from controlled origins, pin versions, use Subresource Integrity for immutable cross-origin assets where workable, restrict execution with CSP and isolate high-risk content in sandboxed frames. Review change and incident processes because third-party code executes with the page's authority and can bypass application-level abstractions.",
    "evaluation_points": [
      "Inventory and privilege review",
      "Pinning and integrity",
      "CSP or sandbox isolation",
      "Lifecycle and incident process"
    ],
    "resolution_title": "OWASP - Third Party JavaScript Management Cheat Sheet",
    "resolution_url": "https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_JavaScript_Management_Cheat_Sheet.html",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-079",
    "role_slug": "frontend-developer",
    "domain": "Frontend Security",
    "difficulty": "advanced",
    "question_type": "dom security",
    "prompt": "What problem do Trusted Types address?",
    "preferred_answer": "Trusted Types can require dangerous DOM injection sinks to receive values created by approved policies rather than arbitrary strings. This helps centralise and audit HTML or script creation and can prevent many DOM XSS paths when combined with CSP enforcement. A permissive policy that simply returns input defeats the control, and it does not remove the need to minimise dangerous sinks and sanitise permitted markup.",
    "evaluation_points": [
      "Dangerous sink protection",
      "Approved policy objects",
      "CSP integration",
      "Policy quality and sanitisation limits"
    ],
    "resolution_title": "MDN - Trusted Types API",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-080",
    "role_slug": "frontend-developer",
    "domain": "Frontend Security",
    "difficulty": "scenario",
    "question_type": "incident",
    "prompt": "A marketing widget loaded from a third party begins injecting pop-ups and reading form fields. What is your response?",
    "preferred_answer": "Disable or block the script at the delivery and CSP layers, preserve evidence and identify pages, users and data exposed. Revoke vendor credentials, inspect network requests and determine whether the supplier, CDN or integration was compromised. Notify incident and privacy owners, deploy a safe replacement only after validation, and redesign the integration with least data, isolated execution, version control and monitoring.",
    "evaluation_points": [
      "Immediate script containment",
      "Evidence and scope",
      "Credential/vendor investigation",
      "Isolated least-privilege redesign"
    ],
    "resolution_title": "OWASP - Third Party JavaScript Management Cheat Sheet",
    "resolution_url": "https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_JavaScript_Management_Cheat_Sheet.html",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-081",
    "role_slug": "frontend-developer",
    "domain": "State Management and Server Data",
    "difficulty": "foundation",
    "question_type": "state",
    "prompt": "What is the difference between local UI state and server state?",
    "preferred_answer": "Local UI state is owned by the client interaction, such as whether a panel is open or the current draft input. Server state is remote, shared, asynchronous and can become stale independently of the component. It needs fetching, caching, invalidation, background updates and error handling. Treating all server data as ordinary global state often recreates cache logic poorly and makes freshness unclear.",
    "evaluation_points": [
      "Client-owned interaction state",
      "Remote shared state",
      "Freshness and cache concerns",
      "Avoid undifferentiated global store"
    ],
    "resolution_title": "TanStack Query - Important Defaults",
    "resolution_url": "https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-082",
    "role_slug": "frontend-developer",
    "domain": "State Management and Server Data",
    "difficulty": "foundation",
    "question_type": "modelling",
    "prompt": "Why should derived values usually not be stored separately?",
    "preferred_answer": "If a value can be calculated from current props or state, storing another copy creates multiple sources of truth and synchronisation bugs. Compute it during rendering or memoise only when measurement shows meaningful cost. Store the minimal state needed to represent user intent and external facts. An exception may exist when the derived result is an independently versioned snapshot or expensive process output with explicit ownership.",
    "evaluation_points": [
      "Single source of truth",
      "Compute from current state",
      "Memoise based on cost",
      "Explicit exception criteria"
    ],
    "resolution_title": "React - Managing State",
    "resolution_url": "https://react.dev/learn/managing-state",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-083",
    "role_slug": "frontend-developer",
    "domain": "State Management and Server Data",
    "difficulty": "intermediate",
    "question_type": "architecture",
    "prompt": "When is a global state store justified?",
    "preferred_answer": "Use one when state is genuinely shared across distant features, has complex transitions, must be inspected or persisted consistently, or benefits from central middleware and tooling. Do not globalise transient form fields or component-only state simply to avoid passing props. Define ownership, serialisability, reset rules and selectors, and separate server cache from client state unless the chosen library deliberately integrates both.",
    "evaluation_points": [
      "Genuinely shared or complex state",
      "Avoid globalising local state",
      "Ownership and reset rules",
      "Server-cache separation"
    ],
    "resolution_title": "Redux Toolkit - Getting Started",
    "resolution_url": "https://redux-toolkit.js.org/introduction/getting-started",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-084",
    "role_slug": "frontend-developer",
    "domain": "State Management and Server Data",
    "difficulty": "intermediate",
    "question_type": "caching",
    "prompt": "What do stale time and garbage-collection time represent in a server-state cache?",
    "preferred_answer": "Stale time defines how long cached data is considered fresh before normal triggers may refetch it. Garbage-collection time controls how long inactive cached data is retained before removal. They solve different problems: freshness and memory/reuse. Values should reflect how quickly the resource changes, user expectations and navigation patterns, not a single application-wide default copied without analysis.",
    "evaluation_points": [
      "Freshness window",
      "Inactive retention",
      "Different concerns",
      "Resource-specific configuration"
    ],
    "resolution_title": "TanStack Query - Important Defaults",
    "resolution_url": "https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-085",
    "role_slug": "frontend-developer",
    "domain": "State Management and Server Data",
    "difficulty": "intermediate",
    "question_type": "mutations",
    "prompt": "How should a successful mutation update visible data?",
    "preferred_answer": "The client can replace or patch known cached data from the authoritative response, invalidate related queries for refetch, or use an optimistic update with rollback. Choose based on response completeness, consistency needs and latency. Optimistic updates need a deterministic rollback and conflict policy. Broad invalidation is simple but may cause unnecessary traffic; manual cache editing can drift if every dependent view is not considered.",
    "evaluation_points": [
      "Response update or invalidation",
      "Optimistic rollback",
      "Consistency and latency trade-off",
      "Dependent-cache awareness"
    ],
    "resolution_title": "TanStack Query - Mutations",
    "resolution_url": "https://tanstack.com/query/latest/docs/framework/react/guides/mutations",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-086",
    "role_slug": "frontend-developer",
    "domain": "State Management and Server Data",
    "difficulty": "advanced",
    "question_type": "concurrency",
    "prompt": "How do optimistic updates fail under concurrent mutations?",
    "preferred_answer": "Several pending mutations may update the same cached entity, responses can arrive out of order and a rollback can accidentally erase a later valid change. Track mutation identity and previous state carefully, reconcile with authoritative server versions and limit optimism for high-conflict operations. Some interfaces should display pending states or use server-provided version checks rather than pretending success immediately.",
    "evaluation_points": [
      "Concurrent cache conflict",
      "Out-of-order responses",
      "Versioned reconciliation",
      "When not to use optimism"
    ],
    "resolution_title": "TanStack Query - Mutations",
    "resolution_url": "https://tanstack.com/query/latest/docs/framework/react/guides/mutations",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-087",
    "role_slug": "frontend-developer",
    "domain": "State Management and Server Data",
    "difficulty": "advanced",
    "question_type": "architecture",
    "prompt": "What makes a state machine useful for complex frontend flows?",
    "preferred_answer": "A state machine defines allowed states, events, transitions and side effects explicitly, preventing impossible combinations and making recovery paths testable. It is valuable for authentication, checkout, uploads or multi-step workflows with cancellation and retries. It adds modelling overhead, so small independent toggles may not need one. The machine should separate pure transition logic from external effects.",
    "evaluation_points": [
      "Explicit states and transitions",
      "Impossible-state prevention",
      "Complex-flow use cases",
      "Pure transitions versus effects"
    ],
    "resolution_title": "React - Extracting State Logic into a Reducer",
    "resolution_url": "https://react.dev/learn/extracting-state-logic-into-a-reducer",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-088",
    "role_slug": "frontend-developer",
    "domain": "State Management and Server Data",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "After editing a record, one page shows the new value while another shows the old value until refresh. How do you fix it?",
    "preferred_answer": "Map every cache key and local copy that represents the entity, confirm the mutation response and identify whether a stale query remains active. Establish a canonical key strategy, update or invalidate all affected views and remove duplicated server data from local stores. Test navigation, background refetch and concurrent edits. If the server is eventually consistent, communicate pending state and reconcile using versions or timestamps.",
    "evaluation_points": [
      "Cache-key and duplicate-state inventory",
      "Canonical update/invalidation",
      "Navigation and concurrency tests",
      "Eventual-consistency handling"
    ],
    "resolution_title": "TanStack Query - Query Invalidation",
    "resolution_url": "https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-089",
    "role_slug": "frontend-developer",
    "domain": "React Engineering",
    "difficulty": "foundation",
    "question_type": "rendering",
    "prompt": "What triggers a React component to render, and does every render change the DOM?",
    "preferred_answer": "Initial mounting, state updates, parent rendering and consumed context changes can trigger rendering. React calls components to calculate the next UI, then commits only the required host changes. Rendering is not itself a DOM mutation, and a render may produce no visible change. Component render logic must remain pure because React may call it more than once or abandon work.",
    "evaluation_points": [
      "Common render triggers",
      "Render versus commit",
      "No guaranteed DOM change",
      "Pure render requirement"
    ],
    "resolution_title": "React - Render and Commit",
    "resolution_url": "https://react.dev/learn/render-and-commit",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-090",
    "role_slug": "frontend-developer",
    "domain": "React Engineering",
    "difficulty": "foundation",
    "question_type": "state",
    "prompt": "Why should React state be treated as immutable?",
    "preferred_answer": "React state represents a snapshot for a render. Creating a new object or array lets React and memoisation logic detect a changed reference and preserves previous snapshots for concurrent or queued updates. Mutating existing state can produce stale UI, skipped updates and difficult debugging. Use functional updates when the next value depends on the previous value.",
    "evaluation_points": [
      "State as snapshot",
      "Reference change",
      "Mutation failure modes",
      "Functional update use"
    ],
    "resolution_title": "React - Managing State",
    "resolution_url": "https://react.dev/learn/managing-state",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-091",
    "role_slug": "frontend-developer",
    "domain": "React Engineering",
    "difficulty": "intermediate",
    "question_type": "effects",
    "prompt": "When is useEffect appropriate, and when is it a code smell?",
    "preferred_answer": "Use an Effect to synchronise a rendered component with an external system such as a subscription, browser API or non-React widget. It is often unnecessary for deriving values, responding to a specific user event or resetting state that can be modelled through keys or ownership. Effects need complete dependencies and cleanup. Adding Effects to coordinate internal state frequently creates loops and timing bugs.",
    "evaluation_points": [
      "External-system synchronisation",
      "Not for derivation or event logic",
      "Dependencies and cleanup",
      "Internal-state coordination smell"
    ],
    "resolution_title": "React - Synchronizing with Effects",
    "resolution_url": "https://react.dev/learn/synchronizing-with-effects",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-092",
    "role_slug": "frontend-developer",
    "domain": "React Engineering",
    "difficulty": "intermediate",
    "question_type": "composition",
    "prompt": "When should context be used instead of props?",
    "preferred_answer": "Context is useful for values needed by many descendants, such as a theme, authenticated user or scoped service, where passing through unrelated layers adds noise. It should not become an unstructured global store. Split contexts by change frequency and responsibility, keep provider values stable and preserve component reuse through composition when only a small subtree needs the data.",
    "evaluation_points": [
      "Widely needed descendant value",
      "Avoid unstructured global state",
      "Split by responsibility",
      "Stable provider and composition"
    ],
    "resolution_title": "React - Passing Data Deeply with Context",
    "resolution_url": "https://react.dev/learn/passing-data-deeply-with-context",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-093",
    "role_slug": "frontend-developer",
    "domain": "React Engineering",
    "difficulty": "intermediate",
    "question_type": "performance",
    "prompt": "When do memo, useMemo and useCallback help?",
    "preferred_answer": "They help when a measured expensive calculation or component render can be skipped because inputs retain stable identity, or when stable function identity is required by a memoised child or external subscription. They also add comparison, memory and dependency complexity and can be defeated by always-new props. Fix state placement and render scope first, then profile before adding memoisation broadly.",
    "evaluation_points": [
      "Measured skip opportunity",
      "Stable identity requirement",
      "Overhead and invalidation",
      "Profile and fix architecture first"
    ],
    "resolution_title": "React - memo",
    "resolution_url": "https://react.dev/reference/react/memo",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-094",
    "role_slug": "frontend-developer",
    "domain": "React Engineering",
    "difficulty": "advanced",
    "question_type": "async ui",
    "prompt": "What does Suspense coordinate, and what does it not automatically solve?",
    "preferred_answer": "Suspense coordinates a fallback boundary while supported code or data dependencies are not ready and can integrate with streaming and selective hydration. It lets designers place loading boundaries around meaningful UI regions. It does not by itself fetch arbitrary data, define cache semantics, handle event-handler errors or guarantee a good skeleton. The framework or data layer must integrate with the suspension mechanism.",
    "evaluation_points": [
      "Fallback boundary",
      "Code/data integration",
      "Streaming potential",
      "Not fetching/cache/error solution by itself"
    ],
    "resolution_title": "React - Suspense",
    "resolution_url": "https://react.dev/reference/react/Suspense",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-095",
    "role_slug": "frontend-developer",
    "domain": "React Engineering",
    "difficulty": "advanced",
    "question_type": "reliability",
    "prompt": "What can an error boundary catch, and where are additional error paths needed?",
    "preferred_answer": "An error boundary catches rendering and lifecycle errors in its descendant component tree and can show fallback UI and report diagnostics. It does not catch event-handler exceptions, arbitrary asynchronous callbacks, server failures or errors inside the boundary itself. Those paths need explicit try/catch, request error states or global reporting. Boundaries should be placed at recovery units rather than only once around the entire application.",
    "evaluation_points": [
      "Descendant render/lifecycle coverage",
      "Uncovered event and async paths",
      "Explicit error handling",
      "Recovery-unit placement"
    ],
    "resolution_title": "React - Error Boundaries",
    "resolution_url": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-096",
    "role_slug": "frontend-developer",
    "domain": "React Engineering",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "A React page repeatedly fetches the same endpoint and sometimes enters an effect loop. How would you debug it?",
    "preferred_answer": "Inspect the Effect dependencies and identify values recreated on every render, state updates performed by the Effect and whether fetching belongs in a framework data layer. Stabilise only necessary dependencies, move event-triggered work to handlers, abort superseded requests and remove derived state updates. Use React profiling and network traces to confirm the loop and test development strict-mode remount behaviour without masking a real production issue.",
    "evaluation_points": [
      "Dependency and recreated-value inspection",
      "Effect-to-handler or data-layer redesign",
      "Abort and derived-state removal",
      "Profiler and strict-mode distinction"
    ],
    "resolution_title": "React - Synchronizing with Effects",
    "resolution_url": "https://react.dev/learn/synchronizing-with-effects",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-097",
    "role_slug": "frontend-developer",
    "domain": "Angular Engineering",
    "difficulty": "foundation",
    "question_type": "architecture",
    "prompt": "What role does dependency injection play in Angular?",
    "preferred_answer": "Angular dependency injection supplies services and other dependencies from a hierarchy of injectors rather than requiring components to construct them directly. This supports substitution, configuration, testing and lifecycle scoping. Provider placement determines whether an instance is application-wide, route-scoped or component-scoped. Overusing injection for arbitrary state can hide ownership, so service boundaries should represent clear capabilities.",
    "evaluation_points": [
      "Hierarchical injector",
      "Substitution and testing",
      "Provider scope",
      "Clear service ownership"
    ],
    "resolution_title": "Angular - Dependency Injection",
    "resolution_url": "https://angular.dev/guide/di",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-098",
    "role_slug": "frontend-developer",
    "domain": "Angular Engineering",
    "difficulty": "foundation",
    "question_type": "reactivity",
    "prompt": "What are Angular signals, computed signals and effects?",
    "preferred_answer": "A writable signal holds reactive state, a computed signal derives a memoised value from dependencies and an effect runs side-effecting work when tracked dependencies change. Templates can read signals and Angular tracks those dependencies. Prefer computed for derived state and use effects for external synchronisation, not for copying values between signals. Equality and update patterns affect whether dependants are notified.",
    "evaluation_points": [
      "Writable signal",
      "Computed derivation",
      "Effect for side effects",
      "Dependency tracking and equality"
    ],
    "resolution_title": "Angular - Signals",
    "resolution_url": "https://angular.dev/guide/signals",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-099",
    "role_slug": "frontend-developer",
    "domain": "Angular Engineering",
    "difficulty": "intermediate",
    "question_type": "change detection",
    "prompt": "How does OnPush change detection improve performance, and what assumptions does it require?",
    "preferred_answer": "OnPush lets Angular skip a component subtree unless relevant inputs, events, signals or explicit marks indicate work. It is effective when data flows through immutable references and component responsibilities are clear. Mutating an input object without changing its reference can leave a view stale. OnPush is not a magic switch; profile the application and avoid manual change-detection calls that hide unclear state flow.",
    "evaluation_points": [
      "Subtree skipping",
      "Relevant triggers",
      "Immutable input assumption",
      "Profiling and no manual-patch dependence"
    ],
    "resolution_title": "Angular - Skipping Component Subtrees",
    "resolution_url": "https://angular.dev/best-practices/skipping-subtrees",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-100",
    "role_slug": "frontend-developer",
    "domain": "Angular Engineering",
    "difficulty": "intermediate",
    "question_type": "routing",
    "prompt": "What should route guards and resolvers be responsible for?",
    "preferred_answer": "Guards decide whether navigation may proceed or redirect, but client guards are not a server security boundary. Resolvers can obtain data needed before route activation, improving consistency for some views and SSR. Avoid making every route wait on non-critical data; use loading states and streaming or incremental patterns where suitable. Cancellation and error navigation should be explicit.",
    "evaluation_points": [
      "Navigation control",
      "No server-authorisation claim",
      "Resolver purpose",
      "Critical-data and error judgement"
    ],
    "resolution_title": "Angular - Routing",
    "resolution_url": "https://angular.dev/guide/routing",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-101",
    "role_slug": "frontend-developer",
    "domain": "Angular Engineering",
    "difficulty": "intermediate",
    "question_type": "forms",
    "prompt": "When should template-driven or reactive forms be chosen?",
    "preferred_answer": "Template-driven forms suit smaller forms where declarative template binding is sufficient. Reactive forms expose the form model in code and are better for complex validation, dynamic controls, reusable logic and detailed tests. The choice is about complexity and ownership, not form size alone. Both still need accessible labels, server validation and deliberate error presentation.",
    "evaluation_points": [
      "Template-driven suitability",
      "Reactive model strengths",
      "Complexity-based choice",
      "Accessibility and server validation"
    ],
    "resolution_title": "Angular - Forms",
    "resolution_url": "https://angular.dev/guide/forms",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-102",
    "role_slug": "frontend-developer",
    "domain": "Angular Engineering",
    "difficulty": "advanced",
    "question_type": "http",
    "prompt": "How should cross-cutting HTTP behaviour be implemented without hiding request semantics?",
    "preferred_answer": "Interceptors can add authentication, correlation, telemetry, retry policy or common error mapping, but each should be narrowly scoped and ordered deliberately. Do not retry unsafe mutations blindly or convert all failures into one generic shape that removes status and context. Components or domain services should still control business-specific caching, cancellation and user recovery.",
    "evaluation_points": [
      "Narrow interceptor responsibilities",
      "Ordering",
      "Safe retry and preserved context",
      "Business behaviour remains explicit"
    ],
    "resolution_title": "Angular - HTTP Client",
    "resolution_url": "https://angular.dev/guide/http",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-103",
    "role_slug": "frontend-developer",
    "domain": "Angular Engineering",
    "difficulty": "advanced",
    "question_type": "ssr",
    "prompt": "What can cause Angular hydration mismatches?",
    "preferred_answer": "Hydration expects the client to reconcile with server-produced DOM. Direct DOM mutation, browser-only values during server rendering, non-deterministic output, invalid HTML or different data can make the structures disagree. Use platform-aware APIs, transfer or reproduce data consistently and avoid changing DOM before hydration. Diagnose with hydration tooling rather than disabling hydration across the application.",
    "evaluation_points": [
      "Server/client structural agreement",
      "Browser-only and non-deterministic risks",
      "Data consistency",
      "Targeted diagnosis"
    ],
    "resolution_title": "Angular - Hydration",
    "resolution_url": "https://angular.dev/guide/hydration",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-104",
    "role_slug": "frontend-developer",
    "domain": "Angular Engineering",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "An Angular list does not update after an item property is mutated under OnPush. What is the cause and repair?",
    "preferred_answer": "The object and list references may be unchanged, so the OnPush component has no relevant signal that its input changed. Replace the item and collection immutably or update a signal through its API, and keep mutation ownership clear. Verify track expressions and avoid forcing global change detection as a workaround. Add a component test that reproduces the actual input transition.",
    "evaluation_points": [
      "Unchanged reference",
      "Immutable or signal update",
      "Track expression awareness",
      "No global force-detection workaround"
    ],
    "resolution_title": "Angular - Skipping Component Subtrees",
    "resolution_url": "https://angular.dev/best-practices/skipping-subtrees",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-105",
    "role_slug": "frontend-developer",
    "domain": "Vue Engineering",
    "difficulty": "foundation",
    "question_type": "reactivity",
    "prompt": "How do ref and reactive differ in Vue?",
    "preferred_answer": "ref wraps a value in an object whose value property is reactive and works with primitives or objects. reactive returns a proxy for an object and tracks property access. Templates unwrap refs in common cases, while JavaScript code must respect the APIs. Destructuring a reactive object can lose the property access that drives tracking unless helpers or refs preserve it.",
    "evaluation_points": [
      "Ref wrapper",
      "Reactive proxy",
      "Template unwrapping",
      "Destructuring caveat"
    ],
    "resolution_title": "Vue - Reactivity Fundamentals",
    "resolution_url": "https://vuejs.org/guide/essentials/reactivity-fundamentals.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-106",
    "role_slug": "frontend-developer",
    "domain": "Vue Engineering",
    "difficulty": "foundation",
    "question_type": "components",
    "prompt": "How should props and emitted events define a Vue component boundary?",
    "preferred_answer": "Props provide parent-owned input and should be treated as read-only. Emitted events communicate requested changes or domain events upward without the child mutating parent state. Define names and payloads clearly, validate or type them, and avoid implicit coupling through global objects. Two-way binding can be convenient but should still represent an explicit model contract.",
    "evaluation_points": [
      "Read-only props",
      "Events communicate changes",
      "Typed payload contract",
      "Avoid implicit global coupling"
    ],
    "resolution_title": "Vue - Component Basics",
    "resolution_url": "https://vuejs.org/guide/essentials/component-basics.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-107",
    "role_slug": "frontend-developer",
    "domain": "Vue Engineering",
    "difficulty": "intermediate",
    "question_type": "composition",
    "prompt": "What problem does the Composition API solve compared with organising logic only by component options?",
    "preferred_answer": "It lets related state, computed values, lifecycle hooks and effects be grouped by feature and extracted into reusable composables, which helps large components where one concern is scattered across several options. It also improves type inference. The benefit depends on disciplined naming and lifecycle cleanup; moving every line into a composable can create indirect code without a reusable concern.",
    "evaluation_points": [
      "Feature-oriented organisation",
      "Reusable composables",
      "Type inference",
      "Avoid needless extraction"
    ],
    "resolution_title": "Vue - Composition API FAQ",
    "resolution_url": "https://vuejs.org/guide/extras/composition-api-faq",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-108",
    "role_slug": "frontend-developer",
    "domain": "Vue Engineering",
    "difficulty": "intermediate",
    "question_type": "reactivity",
    "prompt": "When should computed be used instead of watch?",
    "preferred_answer": "Use computed for a value that is purely derived from reactive dependencies and can be cached. Use watch or watchEffect for side effects such as network synchronisation, persistence or integration with non-Vue systems. A watcher that copies one reactive value into another often creates redundant state and timing problems. Watchers require cleanup or invalidation when asynchronous work can outlive the current dependency value.",
    "evaluation_points": [
      "Computed for pure derivation",
      "Watch for side effects",
      "Avoid copied state",
      "Async invalidation and cleanup"
    ],
    "resolution_title": "Vue - Reactivity Fundamentals",
    "resolution_url": "https://vuejs.org/guide/essentials/reactivity-fundamentals.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-109",
    "role_slug": "frontend-developer",
    "domain": "Vue Engineering",
    "difficulty": "intermediate",
    "question_type": "state",
    "prompt": "When should Pinia or another store be introduced?",
    "preferred_answer": "Introduce a store when state and actions are shared across distant components, need devtools inspection, persistence or explicit domain ownership. Keep component-local interaction state local. In SSR, create state per request rather than sharing a singleton between users. Define actions and derived getters around domain behaviour instead of exposing one broad mutable object to every component.",
    "evaluation_points": [
      "Shared domain state use",
      "Local state remains local",
      "Per-request SSR state",
      "Actions and getters as boundary"
    ],
    "resolution_title": "Vue - State Management",
    "resolution_url": "https://vuejs.org/guide/scaling-up/state-management",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-110",
    "role_slug": "frontend-developer",
    "domain": "Vue Engineering",
    "difficulty": "advanced",
    "question_type": "performance",
    "prompt": "How can deep reactivity become expensive in Vue?",
    "preferred_answer": "Large nested structures create proxy access and dependency-tracking overhead when many properties are read. If a large value is treated as immutable or managed by another system, shallowRef or shallowReactive can keep only the root reactive. This shifts responsibility to replacing the root when data changes. Measure component updates and payload size before opting out, because shallow state can surprise code expecting deep tracking.",
    "evaluation_points": [
      "Proxy and tracking overhead",
      "Shallow escape hatch",
      "Root replacement responsibility",
      "Measure and document semantics"
    ],
    "resolution_title": "Vue - Performance",
    "resolution_url": "https://vuejs.org/guide/best-practices/performance",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-111",
    "role_slug": "frontend-developer",
    "domain": "Vue Engineering",
    "difficulty": "advanced",
    "question_type": "ssr",
    "prompt": "What application state must be isolated per request in Vue SSR?",
    "preferred_answer": "Stores, router state, request-specific data and mutable service instances must not be shared across requests because one user's state could leak to another. Create the application and stores through a factory for each request, serialise only safe initial state and escape it before embedding. Hydration also requires deterministic markup and compatible data between server and client.",
    "evaluation_points": [
      "Per-request stores and router",
      "No cross-user singleton",
      "Safe state serialisation",
      "Deterministic hydration"
    ],
    "resolution_title": "Vue - Server-Side Rendering",
    "resolution_url": "https://vuejs.org/guide/scaling-up/ssr",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-112",
    "role_slug": "frontend-developer",
    "domain": "Vue Engineering",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "A Vue component stops updating after properties are destructured from a reactive object. Why?",
    "preferred_answer": "The destructured variables are ordinary values and no longer perform property access through the reactive proxy, so Vue cannot track subsequent updates. Read from the reactive object directly, use toRefs or create explicit refs or computed values for the required properties. Add a focused test and avoid fixing the symptom with a watcher that duplicates the state.",
    "evaluation_points": [
      "Proxy access lost",
      "Direct access or refs",
      "Computed alternative",
      "No duplicating watcher"
    ],
    "resolution_title": "Vue - Reactivity Fundamentals",
    "resolution_url": "https://vuejs.org/guide/essentials/reactivity-fundamentals.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-113",
    "role_slug": "frontend-developer",
    "domain": "SSR, Hydration and Next.js",
    "difficulty": "foundation",
    "question_type": "rendering",
    "prompt": "Differentiate client-side rendering, server-side rendering and static generation.",
    "preferred_answer": "Client-side rendering sends an application shell and renders most content after JavaScript runs in the browser. Server-side rendering produces HTML per request. Static generation produces HTML ahead of requests, commonly at build time or through regeneration. Each can still hydrate interactive client code. Choose per route based on freshness, personalisation, latency, operational cost and cacheability rather than one application-wide ideology.",
    "evaluation_points": [
      "CSR definition",
      "SSR definition",
      "Static generation definition",
      "Route-specific trade-off"
    ],
    "resolution_title": "Next.js - Server and Client Components",
    "resolution_url": "https://nextjs.org/docs/app/getting-started/server-and-client-components",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-114",
    "role_slug": "frontend-developer",
    "domain": "SSR, Hydration and Next.js",
    "difficulty": "foundation",
    "question_type": "boundaries",
    "prompt": "When does a Next.js component need the use client directive?",
    "preferred_answer": "It is needed at an entry boundary for components that require client state, event handlers, effects or browser-only APIs. Imports below that boundary become part of the client module graph, so placing it high can enlarge the client bundle. Server-rendered UI can still be passed as children into client components. Keep data access and non-interactive rendering on the server when practical.",
    "evaluation_points": [
      "Interactive/browser API need",
      "Client module graph boundary",
      "Composition with server children",
      "Minimise client bundle"
    ],
    "resolution_title": "Next.js - Server and Client Components",
    "resolution_url": "https://nextjs.org/docs/app/getting-started/server-and-client-components",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-115",
    "role_slug": "frontend-developer",
    "domain": "SSR, Hydration and Next.js",
    "difficulty": "intermediate",
    "question_type": "hydration",
    "prompt": "What is a hydration mismatch?",
    "preferred_answer": "It occurs when client rendering expects a different structure or content from the server HTML. Causes include timestamps, random values, browser-only conditions, invalid nesting, differing data or DOM mutation before hydration. It can produce warnings, discarded work or incorrect event attachment. Make initial output deterministic, pass consistent data and isolate browser-dependent content behind an intentional client boundary.",
    "evaluation_points": [
      "Server/client output difference",
      "Common non-deterministic causes",
      "Consequences",
      "Deterministic and boundary-based repair"
    ],
    "resolution_title": "Next.js - Server and Client Components",
    "resolution_url": "https://nextjs.org/docs/app/getting-started/server-and-client-components",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-116",
    "role_slug": "frontend-developer",
    "domain": "SSR, Hydration and Next.js",
    "difficulty": "intermediate",
    "question_type": "caching",
    "prompt": "Why must Next.js caching behaviour be treated as part of application correctness?",
    "preferred_answer": "Rendering and data caches affect when users see updates, whether requests are deduplicated and how invalidation propagates. A page can be technically correct but operationally stale if the cache lifetime or tags do not match the data. Define freshness per resource, use explicit revalidation after mutations, test dynamic and static paths, and document version-specific framework behaviour rather than assuming every fetch has browser-like semantics.",
    "evaluation_points": [
      "Caching affects correctness",
      "Resource freshness",
      "Explicit revalidation",
      "Version-aware testing"
    ],
    "resolution_title": "Next.js - Caching and Revalidating",
    "resolution_url": "https://nextjs.org/docs/app/getting-started/caching-and-revalidating",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-117",
    "role_slug": "frontend-developer",
    "domain": "SSR, Hydration and Next.js",
    "difficulty": "intermediate",
    "question_type": "streaming",
    "prompt": "What benefit do Suspense boundaries provide in server rendering?",
    "preferred_answer": "They let the server send a useful shell and completed regions while slower dependencies continue, reducing the need to wait for the slowest data before displaying anything. Boundaries should match meaningful visual and recovery units. Too many small fallbacks create flicker and complexity; one large boundary recreates all-or-nothing loading. The client bundle and hydration work still determine when interactive regions become usable.",
    "evaluation_points": [
      "Progressive streamed UI",
      "Meaningful boundary placement",
      "Granularity trade-off",
      "Hydration still matters"
    ],
    "resolution_title": "React - Suspense",
    "resolution_url": "https://react.dev/reference/react/Suspense",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-118",
    "role_slug": "frontend-developer",
    "domain": "SSR, Hydration and Next.js",
    "difficulty": "advanced",
    "question_type": "architecture",
    "prompt": "How should secrets and privileged data access be protected across Server and Client Components?",
    "preferred_answer": "Keep credentials, database access and privileged decisions in server-only modules and avoid passing secrets or excessive records as serialised props. A Client Component boundary causes its imported code to enter the client graph, so review imports and build output. Server rendering does not automatically authorise actions; mutations and route handlers must validate identity, permission and input on the server.",
    "evaluation_points": [
      "Server-only secret logic",
      "Minimal serialised data",
      "Client import-graph awareness",
      "Server authorisation for actions"
    ],
    "resolution_title": "React - Server Components",
    "resolution_url": "https://react.dev/reference/rsc/server-components",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-119",
    "role_slug": "frontend-developer",
    "domain": "SSR, Hydration and Next.js",
    "difficulty": "advanced",
    "question_type": "navigation",
    "prompt": "How can prefetching improve and harm a routed application?",
    "preferred_answer": "Prefetching can load route code or data before navigation, reducing perceived wait. It can also consume bandwidth, server work and cache space for routes the user never opens, especially on constrained devices or large lists of links. Use framework defaults deliberately, limit speculative work by likelihood and network conditions, and measure navigation success rather than enabling aggressive prefetch everywhere.",
    "evaluation_points": [
      "Perceived navigation benefit",
      "Bandwidth and server cost",
      "Likelihood/network policy",
      "Measured outcome"
    ],
    "resolution_title": "Next.js - Linking and Navigating",
    "resolution_url": "https://nextjs.org/docs/app/getting-started/linking-and-navigating",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-120",
    "role_slug": "frontend-developer",
    "domain": "SSR, Hydration and Next.js",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "A Next.js product page shows old inventory after an admin updates it. How do you diagnose the stale path?",
    "preferred_answer": "Trace the mutation, server data source, fetch or component cache, route output and CDN or browser cache. Identify which layer owns freshness and whether revalidation tags or paths are triggered after the update. Verify that the admin response reflects committed state and test multiple regions or sessions. Do not disable all caching until the stale layer is proven; use targeted invalidation with observability.",
    "evaluation_points": [
      "End-to-end cache-layer trace",
      "Freshness ownership",
      "Targeted revalidation",
      "Cross-session verification"
    ],
    "resolution_title": "Next.js - Caching and Revalidating",
    "resolution_url": "https://nextjs.org/docs/app/getting-started/caching-and-revalidating",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-121",
    "role_slug": "frontend-developer",
    "domain": "Testing Strategy and Automation",
    "difficulty": "foundation",
    "question_type": "strategy",
    "prompt": "Differentiate unit, component, integration and end-to-end tests.",
    "preferred_answer": "Unit tests isolate small logic units. Component tests render a UI component with realistic interaction around its public contract. Integration tests verify several modules or boundaries together, often including routing or data. End-to-end tests drive a deployed or production-like application through the browser and backend. The labels are less important than the boundary, confidence gained, speed, determinism and failure diagnosis.",
    "evaluation_points": [
      "Four test scopes",
      "Public behaviour",
      "Confidence and speed trade-off",
      "Boundary clarity"
    ],
    "resolution_title": "Vue - Testing",
    "resolution_url": "https://vuejs.org/guide/scaling-up/testing.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-122",
    "role_slug": "frontend-developer",
    "domain": "Testing Strategy and Automation",
    "difficulty": "foundation",
    "question_type": "principles",
    "prompt": "What does it mean to test a UI the way a user uses it?",
    "preferred_answer": "Select elements by accessible role, name and visible text, perform real interactions and assert observable outcomes rather than component internals, implementation classes or framework state. This makes tests more resilient and also rewards accessible markup. Some low-level logic still deserves direct unit tests, but interaction tests should avoid reaching into private methods simply because the test framework allows it.",
    "evaluation_points": [
      "Accessible user-facing queries",
      "Real interactions",
      "Observable outcomes",
      "Avoid private implementation coupling"
    ],
    "resolution_title": "Testing Library - Guiding Principles",
    "resolution_url": "https://testing-library.com/docs/guiding-principles/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-123",
    "role_slug": "frontend-developer",
    "domain": "Testing Strategy and Automation",
    "difficulty": "intermediate",
    "question_type": "mocking",
    "prompt": "When should network requests be mocked at the service-worker or protocol layer?",
    "preferred_answer": "Protocol-level mocks let application code use its real fetch client while tests control responses, latency and failures. This avoids mocking every internal function and can be reused across browser and test environments. Contract fixtures still need validation against the real API, and critical end-to-end paths should run against integrated services. Mock only external uncertainty, not the behaviour being tested.",
    "evaluation_points": [
      "Real client path",
      "Controlled network scenarios",
      "Contract drift risk",
      "Do not mock subject under test"
    ],
    "resolution_title": "Mock Service Worker - Documentation",
    "resolution_url": "https://mswjs.io/docs/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-124",
    "role_slug": "frontend-developer",
    "domain": "Testing Strategy and Automation",
    "difficulty": "intermediate",
    "question_type": "flakiness",
    "prompt": "Why are fixed sleeps a poor end-to-end waiting strategy?",
    "preferred_answer": "A fixed delay is either too short under load or wastes time when the condition is ready early. It also hides what the test expects. Use locators and assertions that retry until a user-visible condition is met, or wait for a specific request, URL or state transition. If the interface has no stable observable signal, improve the product or testability rather than increasing timeouts indefinitely.",
    "evaluation_points": [
      "Timing variability",
      "Wasted or insufficient delay",
      "Condition-based waiting",
      "Improve observable state"
    ],
    "resolution_title": "Playwright - Auto-waiting",
    "resolution_url": "https://playwright.dev/docs/actionability",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-125",
    "role_slug": "frontend-developer",
    "domain": "Testing Strategy and Automation",
    "difficulty": "intermediate",
    "question_type": "coverage",
    "prompt": "Why is line coverage not a sufficient quality target?",
    "preferred_answer": "Line coverage shows that code executed, not that assertions checked meaningful behaviour, edge cases or failure modes. A test can touch every line while accepting the wrong result. Use coverage to find untested areas, then prioritise risk-based scenarios, branch behaviour, state transitions, accessibility and production incidents. Mutation testing or defect escape trends can provide stronger evidence than a single percentage target.",
    "evaluation_points": [
      "Execution versus assertion",
      "Risk-based scenarios",
      "Branches and failures",
      "Coverage as diagnostic, not goal"
    ],
    "resolution_title": "Vitest - Guide",
    "resolution_url": "https://vitest.dev/guide/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-126",
    "role_slug": "frontend-developer",
    "domain": "Testing Strategy and Automation",
    "difficulty": "advanced",
    "question_type": "architecture",
    "prompt": "How should visual regression testing be used without producing constant noise?",
    "preferred_answer": "Capture stable component or page states with deterministic data, fonts, viewport and animation settings. Review intentional changes through a controlled baseline process and keep thresholds narrow enough to catch real regressions. Visual tests complement, not replace, semantic and behavioural assertions. Focus on high-value design-system primitives and critical layouts rather than screenshotting every transient state.",
    "evaluation_points": [
      "Deterministic capture",
      "Controlled baseline review",
      "Complement to behaviour tests",
      "High-value scope"
    ],
    "resolution_title": "Storybook - Testing",
    "resolution_url": "https://storybook.js.org/docs/writing-tests",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-127",
    "role_slug": "frontend-developer",
    "domain": "Testing Strategy and Automation",
    "difficulty": "advanced",
    "question_type": "e2e",
    "prompt": "What should an end-to-end suite avoid owning?",
    "preferred_answer": "It should not duplicate every unit and component case, create all test data through slow UI flows or depend on unrelated third-party systems. Keep a thin set of critical journeys, use APIs or fixtures for setup, isolate accounts and make cleanup deterministic. Run cross-browser tests where browser behaviour is a risk, and collect traces, screenshots and logs so failures are diagnosable.",
    "evaluation_points": [
      "Thin critical journeys",
      "Efficient setup",
      "Isolation and cleanup",
      "Cross-browser risk and diagnostics"
    ],
    "resolution_title": "Playwright - Assertions",
    "resolution_url": "https://playwright.dev/docs/test-assertions",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-128",
    "role_slug": "frontend-developer",
    "domain": "Testing Strategy and Automation",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "A browser test fails only in CI with 'element not clickable'. How would you investigate?",
    "preferred_answer": "Use the CI trace, screenshot and video to inspect whether the element was covered, moving, disabled, outside the viewport or replaced during rendering. Prefer a role-based locator and an auto-waiting action, remove fixed sleeps and wait for the actual readiness condition. Reproduce with CI viewport and resources. Do not force the click unless the test intentionally validates behaviour through an obstruction.",
    "evaluation_points": [
      "Trace and visual evidence",
      "Actionability cause",
      "Stable locator and readiness",
      "No force workaround without intent"
    ],
    "resolution_title": "Playwright - Auto-waiting",
    "resolution_url": "https://playwright.dev/docs/actionability",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-129",
    "role_slug": "frontend-developer",
    "domain": "Build Tooling, Modules and Package Management",
    "difficulty": "foundation",
    "question_type": "tooling",
    "prompt": "Why does a modern frontend use a development server and a production build?",
    "preferred_answer": "A development server prioritises fast startup, module updates, source maps and diagnostics, often serving native or transformed modules on demand. A production build optimises delivery through bundling, minification, asset hashing, code splitting and target transforms. Development behaviour is not proof of production correctness, so the exact production output must be built and tested before release.",
    "evaluation_points": [
      "Development feedback goals",
      "Production optimisation goals",
      "Different execution paths",
      "Production build verification"
    ],
    "resolution_title": "Vite - Why Vite",
    "resolution_url": "https://vite.dev/guide/why",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-130",
    "role_slug": "frontend-developer",
    "domain": "Build Tooling, Modules and Package Management",
    "difficulty": "foundation",
    "question_type": "modules",
    "prompt": "What is the difference between a default export and a named export?",
    "preferred_answer": "A module can expose one default binding and any number of named bindings. Importers can choose any local name for the default, while named imports identify the exported name unless explicitly aliased. Named exports often improve discoverability and refactoring, but neither style determines runtime performance by itself. Consistency and a clear public API matter more than a universal rule.",
    "evaluation_points": [
      "One default versus named bindings",
      "Import naming",
      "API and refactoring implications",
      "No automatic performance claim"
    ],
    "resolution_title": "MDN - JavaScript Modules",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-131",
    "role_slug": "frontend-developer",
    "domain": "Build Tooling, Modules and Package Management",
    "difficulty": "intermediate",
    "question_type": "optimisation",
    "prompt": "What is tree shaking, and why may unused code remain in a bundle?",
    "preferred_answer": "Tree shaking is static analysis that removes exports proven unused from the final module graph. Unused code can remain because a package uses CommonJS, has top-level side effects, marks side effects incorrectly, creates dynamic access patterns or is imported through an entry that executes registration code. Inspect the bundle graph and package metadata rather than assuming an unused source-level import is always removed.",
    "evaluation_points": [
      "Static unused-export removal",
      "ESM and side-effect requirements",
      "Common retention causes",
      "Bundle inspection"
    ],
    "resolution_title": "webpack - Tree Shaking",
    "resolution_url": "https://webpack.js.org/guides/tree-shaking/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-132",
    "role_slug": "frontend-developer",
    "domain": "Build Tooling, Modules and Package Management",
    "difficulty": "intermediate",
    "question_type": "dependencies",
    "prompt": "How should dependencies and devDependencies be classified?",
    "preferred_answer": "Dependencies are needed by the published package or deployed runtime under its documented installation model. devDependencies support building, testing, linting or local tooling. Frontend applications may bundle runtime libraries during build, but package libraries must classify what consumers need carefully. Misclassification can break installs or inflate production environments. Verify with a clean production installation and published-package test.",
    "evaluation_points": [
      "Runtime/consumer dependencies",
      "Development tooling",
      "Application versus library nuance",
      "Clean-install verification"
    ],
    "resolution_title": "npm - package.json",
    "resolution_url": "https://docs.npmjs.com/cli/v11/configuring-npm/package-json",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-133",
    "role_slug": "frontend-developer",
    "domain": "Build Tooling, Modules and Package Management",
    "difficulty": "intermediate",
    "question_type": "compatibility",
    "prompt": "How do browser targets affect a frontend build?",
    "preferred_answer": "Targets guide syntax transforms, polyfill strategy and CSS or JavaScript compatibility assumptions. Supporting older browsers can increase bundle size and constrain modern APIs. Define targets from user evidence and organisational policy, publish them through shared configuration such as Browserslist, and test the actual browsers. A transpiler can transform syntax but cannot automatically emulate every missing web API correctly.",
    "evaluation_points": [
      "Transforms and compatibility",
      "Bundle-size trade-off",
      "Evidence-based target policy",
      "Syntax versus API polyfills"
    ],
    "resolution_title": "Browserslist",
    "resolution_url": "https://github.com/browserslist/browserslist",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-134",
    "role_slug": "frontend-developer",
    "domain": "Build Tooling, Modules and Package Management",
    "difficulty": "advanced",
    "question_type": "packages",
    "prompt": "What problems do package exports solve?",
    "preferred_answer": "An exports map defines the supported public entry points and can provide different conditions for import, require, browser or types. It prevents consumers from depending on private internal files and makes refactoring safer. Incorrect conditional mappings can create duplicate module instances or type/runtime disagreement. Test each supported consumer environment and avoid exposing every file as a public contract.",
    "evaluation_points": [
      "Controlled public entry points",
      "Conditional resolution",
      "Encapsulation benefit",
      "Duplicate and type/runtime risks"
    ],
    "resolution_title": "Node.js - Packages",
    "resolution_url": "https://nodejs.org/api/packages.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-135",
    "role_slug": "frontend-developer",
    "domain": "Build Tooling, Modules and Package Management",
    "difficulty": "advanced",
    "question_type": "build reliability",
    "prompt": "What makes a frontend build reproducible?",
    "preferred_answer": "Use a committed lockfile, controlled runtime and package-manager versions, deterministic generated inputs, pinned external assets, stable environment configuration and a clean build process. Record provenance and artifact hashes. Reproducibility can still be affected by native binaries, timestamps or remote downloads, so build in an isolated CI environment and compare outputs. Avoid depending on an uncommitted developer machine cache.",
    "evaluation_points": [
      "Lockfile and tool versions",
      "Controlled inputs",
      "Isolated clean CI",
      "Artifact comparison and provenance"
    ],
    "resolution_title": "npm - Semantic Versioning",
    "resolution_url": "https://docs.npmjs.com/about-semantic-versioning",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-136",
    "role_slug": "frontend-developer",
    "domain": "Build Tooling, Modules and Package Management",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "A library works in the Vite dev server but fails after production build with an undefined import. What do you inspect?",
    "preferred_answer": "Reproduce using the production preview, inspect the emitted chunks and source maps, and check ESM/CommonJS interop, conditional exports, default-versus-named import assumptions and side-effect removal. Verify the package's supported entry point and browser target. Do not disable minification or tree shaking permanently until the failing transformation or incorrect package metadata is identified.",
    "evaluation_points": [
      "Production reproduction",
      "Emitted chunk and map inspection",
      "Interop/export analysis",
      "Targeted fix rather than disabling optimisation"
    ],
    "resolution_title": "Vite - Building for Production",
    "resolution_url": "https://vite.dev/guide/build",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-137",
    "role_slug": "frontend-developer",
    "domain": "Component Architecture, Design Systems and Web Components",
    "difficulty": "foundation",
    "question_type": "components",
    "prompt": "What makes a UI component reusable rather than merely repeated?",
    "preferred_answer": "A reusable component has a clear responsibility, stable input and event contract, sensible defaults, accessible behaviour and styling boundaries that work in more than one context. It avoids embedding page-specific data access or business decisions unless that is its declared domain purpose. Reuse should reduce duplication without producing an option-heavy component that attempts to represent every possible design.",
    "evaluation_points": [
      "Clear responsibility",
      "Stable contract",
      "Accessible contextual behaviour",
      "Avoid over-generalisation"
    ],
    "resolution_title": "Storybook - Documentation",
    "resolution_url": "https://storybook.js.org/docs",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-138",
    "role_slug": "frontend-developer",
    "domain": "Component Architecture, Design Systems and Web Components",
    "difficulty": "foundation",
    "question_type": "tokens",
    "prompt": "What is a design token?",
    "preferred_answer": "A design token is a named design decision such as a colour, spacing value, type scale, radius or motion duration represented in a format that tools and platforms can consume. Tokens separate semantic intent from raw values and support themes and cross-platform delivery. They should have ownership, naming rules, aliases and versioning; replacing every number with an arbitrary variable does not create a coherent token system.",
    "evaluation_points": [
      "Named design decision",
      "Semantic abstraction",
      "Cross-platform/theme use",
      "Governance and naming"
    ],
    "resolution_title": "Design Tokens Community Group - Format Module",
    "resolution_url": "https://www.designtokens.org/tr/drafts/format/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-139",
    "role_slug": "frontend-developer",
    "domain": "Component Architecture, Design Systems and Web Components",
    "difficulty": "intermediate",
    "question_type": "api design",
    "prompt": "When should a component use composition instead of many configuration props?",
    "preferred_answer": "Composition is preferable when consumers need to supply meaningful regions, content or subcomponents that cannot be represented cleanly by a small set of options. It keeps the primitive flexible without adding flags for every combination. The component should still constrain structure where accessibility or interaction requires it. Use explicit slots, children or templates with documented responsibilities and test common combinations.",
    "evaluation_points": [
      "Flexible content regions",
      "Avoid flag explosion",
      "Necessary structural constraints",
      "Documented slot responsibilities"
    ],
    "resolution_title": "Storybook - Documentation",
    "resolution_url": "https://storybook.js.org/docs",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-140",
    "role_slug": "frontend-developer",
    "domain": "Component Architecture, Design Systems and Web Components",
    "difficulty": "intermediate",
    "question_type": "theming",
    "prompt": "How should a design system support themes without leaking implementation detail?",
    "preferred_answer": "Expose semantic tokens such as surface, text and accent roles rather than component consumers choosing raw palette values. Apply theme values through a controlled scope, validate contrast and state combinations, and define fallback behaviour. Components should consume stable semantic contracts while the theme maps those contracts to actual values. Avoid coupling public component props to internal token file paths or one specific CSS implementation.",
    "evaluation_points": [
      "Semantic token roles",
      "Scoped theme mapping",
      "Contrast and state validation",
      "Public contract independent of implementation"
    ],
    "resolution_title": "MDN - CSS Custom Properties",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-141",
    "role_slug": "frontend-developer",
    "domain": "Component Architecture, Design Systems and Web Components",
    "difficulty": "intermediate",
    "question_type": "web components",
    "prompt": "What are custom elements and shadow DOM intended to provide?",
    "preferred_answer": "Custom elements define reusable HTML element behaviour with lifecycle callbacks and a registered name. Shadow DOM provides a scoped tree and style boundary with slots for composition. Together they can support framework-independent components. They do not automatically provide accessibility, server rendering or form integration; authors must expose semantics, events, properties, attributes and styling hooks deliberately.",
    "evaluation_points": [
      "Registered custom element",
      "Shadow encapsulation and slots",
      "Cross-framework potential",
      "Accessibility and integration not automatic"
    ],
    "resolution_title": "MDN - Web Components",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/Web_components",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-142",
    "role_slug": "frontend-developer",
    "domain": "Component Architecture, Design Systems and Web Components",
    "difficulty": "advanced",
    "question_type": "styling",
    "prompt": "How should a Web Component expose styling customisation?",
    "preferred_answer": "Prefer stable semantic custom properties for values and named parts for selected internal elements that consumers genuinely need to style. Keep internal structure private and avoid exposing every node, which freezes implementation. Document inheritance, defaults and theme scope, and verify forced-colour and high-contrast behaviour. Styling APIs are public contracts and require versioning like JavaScript properties and events.",
    "evaluation_points": [
      "Custom properties and parts",
      "Minimal deliberate exposure",
      "Accessibility modes",
      "Versioned styling contract"
    ],
    "resolution_title": "MDN - ::part()",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::part",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-143",
    "role_slug": "frontend-developer",
    "domain": "Component Architecture, Design Systems and Web Components",
    "difficulty": "advanced",
    "question_type": "governance",
    "prompt": "How should breaking changes be managed in a design system?",
    "preferred_answer": "Define what is public across component props, DOM, events, tokens, CSS parts and visual behaviour. Use semantic versioning, migration guides, codemods where reliable, deprecation periods and usage telemetry. Visual changes can be breaking even when types compile. Test consuming applications and coordinate design and engineering decisions. Avoid permanent compatibility flags that make every component carry several historical behaviours.",
    "evaluation_points": [
      "Broad public-contract definition",
      "Versioning and migration",
      "Visual breakage awareness",
      "Consumer testing and controlled deprecation"
    ],
    "resolution_title": "npm - Semantic Versioning",
    "resolution_url": "https://docs.npmjs.com/about-semantic-versioning",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-144",
    "role_slug": "frontend-developer",
    "domain": "Component Architecture, Design Systems and Web Components",
    "difficulty": "scenario",
    "question_type": "architecture",
    "prompt": "Teams have created six slightly different button components. How would you consolidate them?",
    "preferred_answer": "Inventory use cases and differences, identify which variations express real semantic or interaction needs and which are styling drift, then define one accessible base contract with a small variant model. Preserve specialised controls when their behaviour differs, provide migration examples or codemods, and run visual and interaction tests across consumers. Do not merge everything into one component with dozens of boolean props.",
    "evaluation_points": [
      "Usage inventory",
      "Semantic versus visual distinction",
      "Small accessible contract",
      "Migration without prop explosion"
    ],
    "resolution_title": "Storybook - Documentation",
    "resolution_url": "https://storybook.js.org/docs",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-145",
    "role_slug": "frontend-developer",
    "domain": "Progressive Web Apps, Offline and Service Workers",
    "difficulty": "foundation",
    "question_type": "concept",
    "prompt": "What makes a web application a progressive web app?",
    "preferred_answer": "A PWA uses web-platform capabilities to provide reliable, installable and app-like experiences while remaining accessible through the web. Common pieces include a secure origin, manifest, service worker and responsive design, but the product outcome matters more than a badge. It should progressively enhance: core content or tasks should not become less usable when installation, push or offline capabilities are unavailable.",
    "evaluation_points": [
      "Reliable and installable experience",
      "Manifest and service worker",
      "Outcome over badge",
      "Progressive enhancement"
    ],
    "resolution_title": "web.dev - Learn PWA",
    "resolution_url": "https://web.dev/learn/pwa/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-146",
    "role_slug": "frontend-developer",
    "domain": "Progressive Web Apps, Offline and Service Workers",
    "difficulty": "foundation",
    "question_type": "service worker",
    "prompt": "Where does a service worker run, and what can it control?",
    "preferred_answer": "A service worker runs in a worker context separate from the page and can intercept requests within its registration scope, respond from caches or the network and handle background events. It has no direct DOM access and is event-driven. It can outlive a page, so code must be resilient to termination and restart and store durable state in appropriate browser storage.",
    "evaluation_points": [
      "Separate worker context",
      "Scoped request interception",
      "No DOM access",
      "Event-driven restart-safe design"
    ],
    "resolution_title": "MDN - Service Worker API",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-147",
    "role_slug": "frontend-developer",
    "domain": "Progressive Web Apps, Offline and Service Workers",
    "difficulty": "intermediate",
    "question_type": "caching",
    "prompt": "Compare cache-first, network-first and stale-while-revalidate strategies.",
    "preferred_answer": "Cache-first returns a cached response when available and is suitable for versioned static assets. Network-first prefers fresh data but falls back to cache, useful for changing content where offline access matters. Stale-while-revalidate returns cached content immediately and updates it in the background. Strategy must be selected per resource, with expiry, versioning and error behaviour; caching authenticated or personalised responses requires particular care.",
    "evaluation_points": [
      "Three strategy mechanisms",
      "Resource-specific suitability",
      "Expiry/versioning",
      "Personalised-data caution"
    ],
    "resolution_title": "Chrome for Developers - Workbox",
    "resolution_url": "https://developer.chrome.com/docs/workbox/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-148",
    "role_slug": "frontend-developer",
    "domain": "Progressive Web Apps, Offline and Service Workers",
    "difficulty": "intermediate",
    "question_type": "updates",
    "prompt": "Why can a newly deployed service worker fail to control existing tabs immediately?",
    "preferred_answer": "The new worker normally installs and waits while an older active worker controls open clients, preventing two versions from unexpectedly managing the same page. It becomes active when old clients close or through an explicit update flow. skipWaiting and clientsClaim can accelerate activation but may create version mismatch between cached assets and running pages. Design a user-safe update prompt or compatible rollout.",
    "evaluation_points": [
      "Install/wait/activate lifecycle",
      "Existing client control",
      "Forced activation risk",
      "Compatible or user-prompted update"
    ],
    "resolution_title": "MDN - Service Worker API",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-149",
    "role_slug": "frontend-developer",
    "domain": "Progressive Web Apps, Offline and Service Workers",
    "difficulty": "intermediate",
    "question_type": "offline data",
    "prompt": "How should an application handle a mutation created while offline?",
    "preferred_answer": "Persist the user's intent and enough metadata to replay it, show a clear pending state, preserve operation order where required and retry when connectivity returns. The server must support idempotency or conflict detection because the resource may have changed. Provide a visible failure or conflict resolution path rather than silently discarding the action or claiming success before synchronisation.",
    "evaluation_points": [
      "Durable queued intent",
      "Pending user state",
      "Idempotency/conflict handling",
      "Visible failure and resolution"
    ],
    "resolution_title": "web.dev - Learn PWA",
    "resolution_url": "https://web.dev/learn/pwa/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-150",
    "role_slug": "frontend-developer",
    "domain": "Progressive Web Apps, Offline and Service Workers",
    "difficulty": "advanced",
    "question_type": "security",
    "prompt": "What risks come with caching application responses in a service worker?",
    "preferred_answer": "Sensitive or personalised responses can persist beyond logout, be returned to the wrong application state or remain stale after permissions change. Cache keys may ignore headers or user context. Define explicit allow-lists, separate public assets from private data, clear relevant caches on identity changes, honour response policy and test shared-device scenarios. The Cache API does not enforce HTTP cache semantics automatically for application-created entries.",
    "evaluation_points": [
      "Sensitive persistence",
      "Identity and key mismatch",
      "Explicit allow-list and clearing",
      "Cache API semantics awareness"
    ],
    "resolution_title": "MDN - Cache API",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/Cache",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-151",
    "role_slug": "frontend-developer",
    "domain": "Progressive Web Apps, Offline and Service Workers",
    "difficulty": "advanced",
    "question_type": "architecture",
    "prompt": "How do you version a service-worker cache safely?",
    "preferred_answer": "Use content hashes or an explicit cache version, populate required assets during install only when the set is valid, delete superseded caches during activation and keep runtime caches under separate policies. Do not delete data needed by an active older client before compatibility is assured. Monitor quota and failed installs, and make the application able to recover from a partially populated or corrupted cache.",
    "evaluation_points": [
      "Versioned cache names",
      "Validated install population",
      "Safe activation cleanup",
      "Compatibility and recovery"
    ],
    "resolution_title": "MDN - Service Worker API",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-152",
    "role_slug": "frontend-developer",
    "domain": "Progressive Web Apps, Offline and Service Workers",
    "difficulty": "scenario",
    "question_type": "troubleshooting",
    "prompt": "Users continue seeing an old JavaScript bundle after a release, but hard refresh fixes it. What do you inspect?",
    "preferred_answer": "Inspect the service-worker version and lifecycle, cache keys, fetch handler order, HTML cache policy and whether the old page references hashed assets. Determine whether a waiting worker or stale HTML is serving the outdated graph. Implement compatible activation and cache cleanup, avoid cache-first for unversioned HTML without revalidation, and test upgrade paths from several previous deployed versions.",
    "evaluation_points": [
      "Worker lifecycle inspection",
      "HTML versus hashed asset policy",
      "Compatible activation and cleanup",
      "Multi-version upgrade testing"
    ],
    "resolution_title": "MDN - Service Worker API",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-153",
    "role_slug": "frontend-developer",
    "domain": "Debugging, Observability and Frontend Reliability",
    "difficulty": "foundation",
    "question_type": "debugging",
    "prompt": "What is a useful first sequence when a frontend bug cannot be reproduced immediately?",
    "preferred_answer": "Clarify the exact user action, environment, account state and expected versus actual result; collect console, network and application telemetry; then narrow the smallest reproducible path. Check recent releases and feature flags before changing code. State assumptions and preserve evidence. Random edits based on a generic error message often remove the signal needed to identify a race, data condition or browser-specific cause.",
    "evaluation_points": [
      "Precise reproduction context",
      "Console/network/telemetry evidence",
      "Recent-change correlation",
      "Hypothesis before edits"
    ],
    "resolution_title": "Chrome for Developers - DevTools",
    "resolution_url": "https://developer.chrome.com/docs/devtools/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-154",
    "role_slug": "frontend-developer",
    "domain": "Debugging, Observability and Frontend Reliability",
    "difficulty": "foundation",
    "question_type": "source maps",
    "prompt": "What problem do source maps solve in production debugging?",
    "preferred_answer": "Production code is commonly bundled, minified and transformed, so stack traces reference generated files. A source map maps generated positions back to original source and symbols, enabling useful error reports and debugging. Maps may expose source content and must be uploaded or served under a deliberate access policy. The deployed bundle and map must match exactly, usually through a release identifier or hash.",
    "evaluation_points": [
      "Generated-to-original mapping",
      "Useful stack traces",
      "Source exposure policy",
      "Exact release matching"
    ],
    "resolution_title": "MDN - Source Map",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Glossary/Source_map",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-155",
    "role_slug": "frontend-developer",
    "domain": "Debugging, Observability and Frontend Reliability",
    "difficulty": "intermediate",
    "question_type": "errors",
    "prompt": "What context should a frontend error report include?",
    "preferred_answer": "Include release, route, browser and device, error type and stack, relevant user action, correlation or trace identifier, feature flags and safe application state needed to reproduce. Avoid collecting passwords, tokens, full form values or excessive personal data. Grouping should preserve distinct root causes. User identity, if included, needs consent, access controls and retention appropriate to the application.",
    "evaluation_points": [
      "Release and environment",
      "Action and trace context",
      "Sensitive-data minimisation",
      "Useful grouping and governance"
    ],
    "resolution_title": "Sentry - JavaScript Documentation",
    "resolution_url": "https://docs.sentry.io/platforms/javascript/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-156",
    "role_slug": "frontend-developer",
    "domain": "Debugging, Observability and Frontend Reliability",
    "difficulty": "intermediate",
    "question_type": "memory",
    "prompt": "How do you diagnose a browser memory leak?",
    "preferred_answer": "Reproduce a repeated workflow such as route navigation, watch heap and node counts, take comparable heap snapshots and inspect retained objects and dominator paths. Common causes are global listeners, timers, detached DOM trees, caches and subscriptions. Confirm that memory remains reachable after expected cleanup, fix ownership and repeat the same cycle. A large heap alone is not proof of a leak if it is stable and collectible.",
    "evaluation_points": [
      "Repeated workflow",
      "Heap snapshots and retained paths",
      "Common ownership causes",
      "Stability versus leak distinction"
    ],
    "resolution_title": "Chrome DevTools - Memory Problems",
    "resolution_url": "https://developer.chrome.com/docs/devtools/memory-problems",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-157",
    "role_slug": "frontend-developer",
    "domain": "Debugging, Observability and Frontend Reliability",
    "difficulty": "intermediate",
    "question_type": "tracing",
    "prompt": "How can frontend traces connect a user interaction to backend work?",
    "preferred_answer": "Create or continue a trace context for a navigation or important request, record spans for fetch, rendering or application stages and propagate the trace headers to supporting services where policy permits. Attach route, release and outcome attributes without high-cardinality or sensitive values. Sampling must preserve enough failing and slow traces. Correlation helps explain latency but should not turn every UI operation into excessive telemetry.",
    "evaluation_points": [
      "Trace-context propagation",
      "Frontend and backend spans",
      "Attribute and sampling discipline",
      "Telemetry-volume control"
    ],
    "resolution_title": "OpenTelemetry JavaScript - Browser",
    "resolution_url": "https://opentelemetry.io/docs/languages/js/getting-started/browser/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-158",
    "role_slug": "frontend-developer",
    "domain": "Debugging, Observability and Frontend Reliability",
    "difficulty": "advanced",
    "question_type": "reliability",
    "prompt": "How should a frontend recover when one dashboard widget fails?",
    "preferred_answer": "Contain the failure at the widget or data-boundary level, preserve the rest of the dashboard, show a clear fallback with retry or alternative action, report diagnostics and avoid repeating a destructive request. Shared dependencies may require a broader boundary. Recovery UI should maintain layout and accessibility. A global blank error page is appropriate only when the application cannot safely continue.",
    "evaluation_points": [
      "Local failure containment",
      "User recovery action",
      "Diagnostic reporting",
      "Boundary based on shared dependency"
    ],
    "resolution_title": "React - Error Boundaries",
    "resolution_url": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-159",
    "role_slug": "frontend-developer",
    "domain": "Debugging, Observability and Frontend Reliability",
    "difficulty": "advanced",
    "question_type": "metrics",
    "prompt": "How should client-side reliability be measured?",
    "preferred_answer": "Track successful completion of important journeys, JavaScript error-free sessions, failed request rates, abandoned states, performance distributions and recovery success by release and environment. Raw error count can rise with traffic and duplicate reports. Connect technical signals to user impact, define service-level indicators where useful and use release health to stop or roll back a harmful deployment.",
    "evaluation_points": [
      "Journey success",
      "Normalised error and request measures",
      "User-impact linkage",
      "Release health and rollback"
    ],
    "resolution_title": "Sentry - JavaScript Documentation",
    "resolution_url": "https://docs.sentry.io/platforms/javascript/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-160",
    "role_slug": "frontend-developer",
    "domain": "Debugging, Observability and Frontend Reliability",
    "difficulty": "scenario",
    "question_type": "incident",
    "prompt": "A new release causes a sharp increase in checkout failures only on Safari. What is your response sequence?",
    "preferred_answer": "Confirm the release and browser segmentation, pause or roll back the affected change, preserve error, network and trace evidence, and reproduce on the supported Safari versions. Inspect compatibility transforms, browser APIs, storage and payment integration behaviour. Deploy a guarded fix, add a regression test in a real browser engine and monitor conversion and error rates before completing the rollout.",
    "evaluation_points": [
      "Segment and contain",
      "Evidence preservation",
      "Browser-specific reproduction",
      "Guarded fix, real-engine test and monitoring"
    ],
    "resolution_title": "Chrome for Developers - DevTools",
    "resolution_url": "https://developer.chrome.com/docs/devtools/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-161",
    "role_slug": "frontend-developer",
    "domain": "Frontend System Design, Delivery and Product Judgement",
    "difficulty": "foundation",
    "question_type": "system design",
    "prompt": "What questions should be answered before choosing a frontend framework?",
    "preferred_answer": "Clarify product interaction complexity, rendering and SEO needs, team skills, accessibility requirements, browser support, deployment environment, ecosystem maturity, long-term maintenance and integration constraints. Compare a framework with simpler platform or server-rendered options. A popular tool is not automatically the lowest-risk choice. Prototype the highest-uncertainty requirement and record the decision and exit conditions.",
    "evaluation_points": [
      "Product and rendering needs",
      "Team and lifecycle",
      "Simpler alternatives",
      "Risk prototype and decision record"
    ],
    "resolution_title": "WHATWG HTML Living Standard",
    "resolution_url": "https://html.spec.whatwg.org/multipage/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-162",
    "role_slug": "frontend-developer",
    "domain": "Frontend System Design, Delivery and Product Judgement",
    "difficulty": "foundation",
    "question_type": "architecture",
    "prompt": "What is a frontend boundary or vertical slice?",
    "preferred_answer": "A boundary groups UI, state, data access and tests around a cohesive user or domain capability with a clear public contract. It reduces unrelated coupling and lets teams change a feature without understanding the whole application. Boundaries should not duplicate shared platform concerns or create a micro-frontend for every screen. Use dependency direction and ownership, not folder names alone, to enforce them.",
    "evaluation_points": [
      "Cohesive capability",
      "Clear public contract",
      "Reduced coupling",
      "Avoid over-fragmentation"
    ],
    "resolution_title": "webpack - Concepts",
    "resolution_url": "https://webpack.js.org/concepts/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-163",
    "role_slug": "frontend-developer",
    "domain": "Frontend System Design, Delivery and Product Judgement",
    "difficulty": "intermediate",
    "question_type": "architecture",
    "prompt": "When are micro-frontends justified?",
    "preferred_answer": "They can help independently owned domains release on different schedules, isolate technology migrations or scale large organisations where coordination is the bottleneck. They add runtime integration, duplicate dependencies, inconsistent UX, observability, routing, security and testing complexity. Use them only when organisational autonomy benefits exceed those costs, and define shell, identity, design-system and failure contracts before splitting.",
    "evaluation_points": [
      "Organisational autonomy use",
      "Runtime and UX costs",
      "Benefit-versus-complexity decision",
      "Shared contracts"
    ],
    "resolution_title": "webpack - Concepts",
    "resolution_url": "https://webpack.js.org/concepts/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-164",
    "role_slug": "frontend-developer",
    "domain": "Frontend System Design, Delivery and Product Judgement",
    "difficulty": "intermediate",
    "question_type": "delivery",
    "prompt": "What belongs in a frontend CI quality gate?",
    "preferred_answer": "Run deterministic type checks, linting, unit and component tests, selected end-to-end journeys, production build validation, dependency or security checks and measured accessibility or performance budgets. Gates should be fast enough for normal delivery, risk-based and backed by diagnostic artefacts. Avoid blocking on flaky tests or a single universal Lighthouse score; maintain exception ownership and expiry.",
    "evaluation_points": [
      "Layered deterministic checks",
      "Production build",
      "Risk-based budgets",
      "Flake and exception governance"
    ],
    "resolution_title": "GitHub Actions Documentation",
    "resolution_url": "https://docs.github.com/actions",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-165",
    "role_slug": "frontend-developer",
    "domain": "Frontend System Design, Delivery and Product Judgement",
    "difficulty": "intermediate",
    "question_type": "migration",
    "prompt": "How should a large legacy frontend be modernised without a rewrite freeze?",
    "preferred_answer": "Establish tests and observability around critical journeys, create a stable integration seam and migrate vertical slices incrementally. Share design tokens and contracts, route traffic gradually and remove old paths as slices prove stable. A full rewrite delays value and may reproduce unknown behaviour. Track compatibility debt, duplicate runtime cost and a clear completion plan so the strangler pattern does not become permanent duplication.",
    "evaluation_points": [
      "Baseline tests and observability",
      "Incremental vertical slices",
      "Gradual traffic and removal",
      "Control temporary duplication"
    ],
    "resolution_title": "webhint Documentation",
    "resolution_url": "https://webhint.io/docs/user-guide/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-166",
    "role_slug": "frontend-developer",
    "domain": "Frontend System Design, Delivery and Product Judgement",
    "difficulty": "advanced",
    "question_type": "performance governance",
    "prompt": "How should performance budgets be set and enforced?",
    "preferred_answer": "Set budgets from user outcomes and representative field baselines, covering JavaScript and CSS bytes, image weight, request count, LCP, INP or route-specific measures. Apply them by page type and device class, enforce meaningful regressions in CI and review exceptions with owners and expiry. A budget should guide trade-offs, not reward gaming one metric while user experience declines elsewhere.",
    "evaluation_points": [
      "User-outcome basis",
      "Multiple resource and UX measures",
      "Page/device segmentation",
      "Owned exceptions and anti-gaming"
    ],
    "resolution_title": "Lighthouse CI",
    "resolution_url": "https://github.com/GoogleChrome/lighthouse-ci",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-167",
    "role_slug": "frontend-developer",
    "domain": "Frontend System Design, Delivery and Product Judgement",
    "difficulty": "advanced",
    "question_type": "product judgement",
    "prompt": "How do you decide whether to build a complex client interaction or simplify the product flow?",
    "preferred_answer": "Start with the user goal, frequency, failure cost and accessibility needs. Estimate client complexity, data consistency, offline and device constraints, support burden and measurable benefit. Prototype and test the smallest flow that solves the need. A technically impressive interaction may be the wrong choice if it increases confusion, JavaScript cost or operational risk without improving task success.",
    "evaluation_points": [
      "User goal and failure cost",
      "Complexity and device constraints",
      "Smallest useful prototype",
      "Measured task success over novelty"
    ],
    "resolution_title": "W3C - Web Content Accessibility Guidelines 2.2",
    "resolution_url": "https://www.w3.org/TR/WCAG22/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "FED-168",
    "role_slug": "frontend-developer",
    "domain": "Frontend System Design, Delivery and Product Judgement",
    "difficulty": "scenario",
    "question_type": "architecture",
    "prompt": "You must design a high-traffic commerce frontend for slow mobile networks, frequent catalogue updates and multiple product teams. Outline the approach.",
    "preferred_answer": "Define route-specific rendering: cacheable server or static product content with targeted revalidation, small interactive client islands, responsive media and progressive loading. Establish domain boundaries, shared accessible components and contracts, server-state caching with explicit freshness, observability and Core Web Vitals budgets. Use gradual delivery, feature flags and rollback. Validate on representative devices and keep checkout dependencies isolated from optional personalisation and third parties.",
    "evaluation_points": [
      "Route-specific rendering and freshness",
      "Small client surface and media optimisation",
      "Team/domain contracts",
      "Observability, safe delivery and dependency isolation"
    ],
    "resolution_title": "web.dev - Web Vitals",
    "resolution_url": "https://web.dev/articles/vitals",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-01",
    "role_slug": "frontend-developer",
    "domain": "Web Platform and Browser Rendering",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Browser rendering trace: Instrument a deliberately slow page and identify its critical request chain, parser blocking, long tasks, layout and paint costs.",
    "preferred_answer": "Expected Evidence & Deliverables:\nPerformance trace, waterfall, annotated main-thread timeline, three ranked causes, code changes and before/after measurements.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "Chrome DevTools - Performance",
    "resolution_url": "https://developer.chrome.com/docs/devtools/performance",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-02",
    "role_slug": "frontend-developer",
    "domain": "Semantic HTML and Forms",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Accessible native form: Build a multi-step account form using semantic HTML, native controls and progressive enhancement, then introduce and repair validation failures.",
    "preferred_answer": "Expected Evidence & Deliverables:\nMarkup, keyboard transcript, accessibility-tree screenshots, server-validation contract, error-state tests and mobile layout evidence.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "W3C WAI - Forms Tutorial",
    "resolution_url": "https://www.w3.org/WAI/tutorials/forms/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-03",
    "role_slug": "frontend-developer",
    "domain": "CSS Cascade, Layout and Responsive Design",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Responsive component under constraint: Build a reusable dashboard card collection that works in full-page, sidebar and embedded-panel containers with LTR and RTL content.",
    "preferred_answer": "Expected Evidence & Deliverables:\nCSS architecture, container-query states, overflow tests, RTL screenshots, reduced-motion behaviour and browser support notes.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "MDN - CSS Container Queries",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-04",
    "role_slug": "frontend-developer",
    "domain": "JavaScript Language and Asynchronous Execution",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Asynchronous UI race laboratory: Implement a search interface with simulated latency, failure and out-of-order responses, then make its result ownership and cancellation deterministic.",
    "preferred_answer": "Expected Evidence & Deliverables:\nSequence diagram, implementation, aborted-request handling, automated race tests and before/after behaviour recording.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "MDN - AbortController",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-05",
    "role_slug": "frontend-developer",
    "domain": "TypeScript for Frontend Applications",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Typed API boundary migration: Migrate an untyped data-driven interface to strict TypeScript with runtime validation and explicit loading, success and error states.",
    "preferred_answer": "Expected Evidence & Deliverables:\nBefore/after types, schemas, invalid-payload tests, compiler settings, migration notes and production-observability plan.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "TypeScript Handbook - Narrowing",
    "resolution_url": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-06",
    "role_slug": "frontend-developer",
    "domain": "DOM, Events and Browser APIs",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Browser API lifecycle integration: Build an infinite-loading list using event delegation, IntersectionObserver and abortable network requests, then prove cleanup across route changes.",
    "preferred_answer": "Expected Evidence & Deliverables:\nImplementation, lifecycle diagram, observer/listener counts, cancellation tests, memory snapshot and keyboard interaction record.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "MDN - Intersection Observer API",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-07",
    "role_slug": "frontend-developer",
    "domain": "Accessibility and Inclusive UI",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Accessible interaction audit: Audit and repair a modal, menu, data table and multi-step form against keyboard and screen-reader interaction expectations.",
    "preferred_answer": "Expected Evidence & Deliverables:\nIssue log mapped to WCAG, repaired code, keyboard scripts, accessibility-tree captures, screen-reader notes and regression tests.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "W3C - Web Content Accessibility Guidelines 2.2",
    "resolution_url": "https://www.w3.org/TR/WCAG22/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-08",
    "role_slug": "frontend-developer",
    "domain": "Performance and Core Web Vitals",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Core Web Vitals optimisation: Profile a media-heavy application, establish LCP, INP and CLS baselines, implement targeted changes and verify lab and simulated field impact.",
    "preferred_answer": "Expected Evidence & Deliverables:\nLighthouse and performance traces, metric decomposition, bundle and image reports, before/after runs and regression budgets.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "web.dev - Web Vitals",
    "resolution_url": "https://web.dev/articles/vitals",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-09",
    "role_slug": "frontend-developer",
    "domain": "HTTP, Networking, Caching and Data Transfer",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Network and cache behaviour lab: Build a data client that handles HTTP errors, conditional requests, aborts, credentialed CORS and bounded retry behaviour against a controlled test API.",
    "preferred_answer": "Expected Evidence & Deliverables:\nWaterfalls, request/response headers, cache-hit proof, failure-state matrix, retry tests and security notes.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "MDN - HTTP Caching",
    "resolution_url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-10",
    "role_slug": "frontend-developer",
    "domain": "Frontend Security",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Browser security hardening: Harden a deliberately vulnerable frontend against DOM XSS, CSRF and compromised third-party code using safe rendering, CSP and isolation controls.",
    "preferred_answer": "Expected Evidence & Deliverables:\nThreat model, exploit demonstrations in a sandbox, patched code, CSP reports, security tests and residual-risk notes.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "OWASP - Cross Site Scripting Prevention Cheat Sheet",
    "resolution_url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-11",
    "role_slug": "frontend-developer",
    "domain": "State Management and Server Data",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Consistent server-state workflow: Implement list, detail and edit views with caching, invalidation, cancellation and an optimistic update that safely rolls back under failure.",
    "preferred_answer": "Expected Evidence & Deliverables:\nState ownership map, cache keys, mutation timeline, concurrency tests, network trace and user-facing error/recovery states.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "TanStack Query - Query Invalidation",
    "resolution_url": "https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-12",
    "role_slug": "frontend-developer",
    "domain": "React Engineering",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] React render and recovery audit: Refactor a React dashboard with unnecessary Effects, unstable context values and expensive re-renders, then add appropriate loading and error boundaries.",
    "preferred_answer": "Expected Evidence & Deliverables:\nProfiler captures, render-count comparison, dependency analysis, refactored components, failure tests and user-recovery flow.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "React - Render and Commit",
    "resolution_url": "https://react.dev/learn/render-and-commit",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-13",
    "role_slug": "frontend-developer",
    "domain": "Angular Engineering",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Angular reactive application: Build an Angular feature with signals, routed data, reactive forms, typed HTTP handling, OnPush components and SSR-compatible rendering.",
    "preferred_answer": "Expected Evidence & Deliverables:\nArchitecture diagram, provider scopes, form and route tests, change-detection profile, SSR output and hydration verification.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "Angular - Signals",
    "resolution_url": "https://angular.dev/guide/signals",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-14",
    "role_slug": "frontend-developer",
    "domain": "Vue Engineering",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Vue composition and SSR lab: Build a Vue feature using composables, typed component contracts, shared state and an SSR-safe application factory, then profile reactivity updates.",
    "preferred_answer": "Expected Evidence & Deliverables:\nComponent contracts, composable tests, store scope proof, SSR hydration run, update profile and performance notes.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "Vue - Server-Side Rendering",
    "resolution_url": "https://vuejs.org/guide/scaling-up/ssr",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-15",
    "role_slug": "frontend-developer",
    "domain": "SSR, Hydration and Next.js",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Hybrid rendering application: Build a small Next.js catalogue using server and client components, streaming, route-level rendering choices and mutation-driven cache revalidation.",
    "preferred_answer": "Expected Evidence & Deliverables:\nBoundary map, bundle report, cache rules, hydration tests, stale-data test, navigation trace and recovery states.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "Next.js - Server and Client Components",
    "resolution_url": "https://nextjs.org/docs/app/getting-started/server-and-client-components",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-16",
    "role_slug": "frontend-developer",
    "domain": "Testing Strategy and Automation",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Frontend test pyramid implementation: Create unit, component, network-integration and end-to-end tests for one user journey, including accessibility and failure paths.",
    "preferred_answer": "Expected Evidence & Deliverables:\nTest-boundary rationale, deterministic fixtures, coverage analysis, CI trace, flaky-test controls and defect-to-test mapping.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "Testing Library - Guiding Principles",
    "resolution_url": "https://testing-library.com/docs/guiding-principles/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-17",
    "role_slug": "frontend-developer",
    "domain": "Build Tooling, Modules and Package Management",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Production bundle and package audit: Configure a frontend build with code splitting, target policy, bundle analysis and a small published component package with correct exports and declarations.",
    "preferred_answer": "Expected Evidence & Deliverables:\nBuild configuration, bundle graph, browser target rationale, clean-install test, package export matrix and reproducible-build record.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "Vite - Building for Production",
    "resolution_url": "https://vite.dev/guide/build",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-18",
    "role_slug": "frontend-developer",
    "domain": "Component Architecture, Design Systems and Web Components",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Design system component package: Create a small accessible component library with semantic tokens, documented variants, visual tests and one cross-framework custom element.",
    "preferred_answer": "Expected Evidence & Deliverables:\nPublic API, token files, Storybook documentation, accessibility tests, visual baselines, package exports and migration policy.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "Design Tokens Community Group - Format Module",
    "resolution_url": "https://www.designtokens.org/tr/drafts/format/",
    "source_tier": "B",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-19",
    "role_slug": "frontend-developer",
    "domain": "Progressive Web Apps, Offline and Service Workers",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Offline-first PWA upgrade lab: Add installability, offline reading, queued mutations and a safe service-worker update flow to an existing application.",
    "preferred_answer": "Expected Evidence & Deliverables:\nManifest, cache strategy matrix, offline recordings, conflict tests, update-state screenshots, storage audit and rollback plan.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "web.dev - Learn PWA",
    "resolution_url": "https://web.dev/learn/pwa/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-20",
    "role_slug": "frontend-developer",
    "domain": "Debugging, Observability and Frontend Reliability",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Frontend production diagnostics: Instrument a sample application with error reporting, traces, Web Vitals and release metadata, then diagnose an injected memory leak and browser-specific failure.",
    "preferred_answer": "Expected Evidence & Deliverables:\nTelemetry schema, privacy review, source-map setup, trace screenshots, heap analysis, incident timeline and verified repair.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "OpenTelemetry JavaScript - Browser",
    "resolution_url": "https://opentelemetry.io/docs/languages/js/getting-started/browser/",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  },
  {
    "id": "LAB-21",
    "role_slug": "frontend-developer",
    "domain": "Frontend System Design, Delivery and Product Judgement",
    "difficulty": "scenario",
    "question_type": "practical_lab",
    "prompt": "[PRACTICAL ASSESSMENT LAB] Frontend architecture and delivery review: Design a production frontend for a high-traffic marketplace, including rendering, boundaries, state, accessibility, performance, security, testing and release controls.",
    "preferred_answer": "Expected Evidence & Deliverables:\nArchitecture diagrams, decision records, request and cache flows, component strategy, quality budgets, CI plan, failure scenarios and phased delivery roadmap.",
    "evaluation_points": [
      "Working Outcome (40%)",
      "Diagnostic & Assurance Evidence (25%)",
      "Safety, Security & Reliability Judgement (20%)",
      "Clarity & Reproducibility (15%)"
    ],
    "resolution_title": "GitHub Actions Documentation",
    "resolution_url": "https://docs.github.com/actions",
    "source_tier": "A",
    "last_verified_at": "2026-07-28",
    "status": "published"
  }
];
