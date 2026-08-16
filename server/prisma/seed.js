const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for Leul Mengesha Portfolio CMS...');

  // 1. Create Admin Account
  const adminPassword = await bcrypt.hash('AdminPassword123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@leulmengesha.com' },
    update: { password: adminPassword },
    create: {
      name: 'Leul Mengesha',
      email: 'admin@leulmengesha.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  });
  console.log('✅ Admin user created: admin@leulmengesha.com / AdminPassword123!');

  // 2. Create Site Settings
  const siteConfig = {
    name: 'Leul Mengesha',
    title: 'Computer Science Student & Software Developer',
    bio: 'Computer Science student and full-stack software developer passionate about building resilient distributed systems, modern web applications, and intuitive user experiences. Experienced in React, Node.js, PostgreSQL, Cloud Native DevOps, and Algorithmic problem solving.',
    email: 'leul.mengesha.dev@gmail.com',
    phone: '+1 (206) 555-0199',
    location: 'Seattle, Washington',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    github: 'https://github.com/leulmengesha',
    linkedin: 'https://linkedin.com/in/leulmengesha',
    twitter: 'https://twitter.com/leulmengesha_dev',
    websiteLogo: 'LM.',
    themePrimaryColor: '#06b6d4',
    seoMetaTitle: 'Leul Mengesha - CS Student & Software Developer Portfolio',
    seoMetaDescription: 'Portfolio of Leul Mengesha - Computer Science Student, Full Stack Developer, and Algorithmic Systems Engineer.',
    googleAnalyticsId: 'G-LEUL2026CMS'
  };

  await prisma.setting.upsert({
    where: { key: 'site_config' },
    update: { value: JSON.stringify(siteConfig) },
    create: { key: 'site_config', value: JSON.stringify(siteConfig) }
  });
  console.log('✅ Site settings configured');

  // 3. Clear & Seed Projects
  await prisma.project.deleteMany();

  const projectsData = [
    {
      title: 'DevPulse - Distributed Microservices Telemetry System',
      slug: 'devpulse-distributed-microservices-telemetry',
      shortDescription: 'High-throughput real-time distributed telemetry collector & metric visualization suite built for cloud microservices.',
      fullDescription: `### Overview

**DevPulse** is a production-grade distributed telemetry and observability platform engineered to collect metrics, logs, and trace events from containerized cloud services in real-time.

### Key Architecture
- **Ingestion Pipeline**: Processes over 50,000 events/sec via Express WebSocket stream handlers & Redis queue buffers.
- **Persistent Storage**: Utilizes PostgreSQL with time-series partitioned indexing for fast multi-dimensional queries.
- **Frontend Dashboard**: Built with React, Tailwind CSS, and Recharts, offering real-time streaming dashboards, alert notifications, and topology visualizers.

### Key Achievements
- Reduced telemetry processing latency by **42%** through optimized async batch insertions.
- Achieved **99.9% uptime** during simulated cluster failure load tests.`,
      bannerUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop'
      ]),
      features: JSON.stringify([
        'Real-time WebSocket metric streaming with automatic reconnects',
        'Multi-tenant role-based access control (RBAC)',
        'Custom alert threshold configuration with Slack & Email webhook triggers',
        'Time-series aggregation for weekly and monthly latency trends'
      ]),
      challenges: JSON.stringify([
        'Handling high-frequency WebSocket socket congestion during peak server bursts',
        'Optimizing PostgreSQL queries for large-scale time-series analytics without slowing down dashboard rendering'
      ]),
      lessonsLearned: JSON.stringify([
        'Implemented sliding-window rate limiters to decouple ingestion workers from database persistence queues',
        'Mastered advanced PostgreSQL indexing strategies (BRIN & GIN indexes for JSON payload metrics)'
      ]),
      githubUrl: 'https://github.com/leulmengesha/devpulse-telemetry',
      liveUrl: 'https://devpulse-demo.leulmengesha.com',
      category: 'Cloud & Systems',
      featured: true,
      hidden: false,
      orderIndex: 1,
      technologies: JSON.stringify(['Node.js', 'Express', 'React', 'PostgreSQL', 'Redis', 'Docker', 'WebSockets', 'Tailwind CSS']),
      viewsCount: 248,
      githubClicks: 64,
      liveClicks: 92
    },
    {
      title: 'Algorithmic Code Visualizer',
      slug: 'algorithmic-code-visualizer',
      shortDescription: 'Interactive 3D and step-by-step algorithm animation platform for Data Structures and Graph Algorithms.',
      fullDescription: `### Overview

An interactive educational platform designed to help computer science students visualize complex algorithms including Dijkstra, A* Pathfinding, AVL Tree Rotations, and Sorting Algorithms.

### Highlights
- Step-by-step state playback with variable speed controls (0.25x to 4x).
- Custom maze generation and custom graph node creator.
- Real-time time & space complexity analysis based on input sizes.`,
      bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop'
      ]),
      features: JSON.stringify([
        'Interactive grid & graph builder with obstacle draw mode',
        'Code syntax highlighting side-by-side with execution pointers',
        'Export visualization steps as GIF/Video animation'
      ]),
      challenges: JSON.stringify([
        'Maintaining 60 FPS smooth canvas animations while computing pathfinding nodes dynamically'
      ]),
      lessonsLearned: JSON.stringify([
        'Utilized Web Workers for heavy graph calculation offloading off the main UI thread'
      ]),
      githubUrl: 'https://github.com/leulmengesha/algo-visualizer',
      liveUrl: 'https://algo-visualizer.leulmengesha.com',
      category: 'Web Development',
      featured: true,
      hidden: false,
      orderIndex: 2,
      technologies: JSON.stringify(['React', 'TypeScript', 'Canvas API', 'Tailwind CSS', 'Framer Motion']),
      viewsCount: 185,
      githubClicks: 41,
      liveClicks: 58
    },
    {
      title: 'CogniNote - AI Powered Knowledge Graph',
      slug: 'cogninote-ai-knowledge-graph',
      shortDescription: 'AI-assisted note-taking app that dynamically connects ideas into an interactive neural graph network.',
      fullDescription: `### Overview

**CogniNote** reimagines personal knowledge management by combining markdown editing with automated vector embeddings to connect related thoughts automatically.`,
      bannerUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
      ]),
      features: JSON.stringify([
        'Bidirectional Markdown linking with [[WikiLink]] syntax',
        'Semantic search using vector similarity embeddings',
        'Graph visualizer with node sizing based on centrality'
      ]),
      challenges: JSON.stringify([
        'Optimizing vector embedding generation without blocking markdown editor typing flow'
      ]),
      lessonsLearned: JSON.stringify([
        'Implemented optimistic UI updates combined with debounced background synchronization'
      ]),
      githubUrl: 'https://github.com/leulmengesha/cogninote',
      liveUrl: 'https://cogninote.leulmengesha.com',
      category: 'AI & Machine Learning',
      featured: true,
      hidden: false,
      orderIndex: 3,
      technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'OpenAI API']),
      viewsCount: 142,
      githubClicks: 32,
      liveClicks: 49
    },
    {
      title: 'NexusCommerce - Full-Stack E-Commerce Engine',
      slug: 'nexuscommerce-e-commerce-engine',
      shortDescription: 'Scalable e-commerce platform with real-time inventory management, Stripe integration, and admin portal.',
      fullDescription: `### Overview

A comprehensive e-commerce platform featuring dynamic product cataloging, cart state management, automated receipt generation, and admin inventory analytics.`,
      bannerUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop'
      ]),
      features: JSON.stringify([
        'Secure Stripe Checkout session handling',
        'Real-time inventory deduction with transaction safety',
        'Order status tracker with email notifications'
      ]),
      challenges: JSON.stringify([
        'Ensuring idempotent transaction processing for webhooks under concurrent checkout requests'
      ]),
      lessonsLearned: JSON.stringify([
        'Mastered database ACID transactions in PostgreSQL using Prisma interactive transactions'
      ]),
      githubUrl: 'https://github.com/leulmengesha/nexuscommerce',
      liveUrl: 'https://nexuscommerce.leulmengesha.com',
      category: 'Web Development',
      featured: false,
      hidden: false,
      orderIndex: 4,
      technologies: JSON.stringify(['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe API', 'Tailwind CSS']),
      viewsCount: 96,
      githubClicks: 19,
      liveClicks: 27
    }
  ];

  for (const proj of projectsData) {
    await prisma.project.create({ data: proj });
  }
  console.log('✅ 4 Showcase Projects seeded');

  // 4. Clear & Seed Skills
  await prisma.skill.deleteMany();

  const skillsData = [
    { name: 'JavaScript / ES6+', category: 'Frontend', percentage: 95, icon: 'code', orderIndex: 1 },
    { name: 'React.js & Next.js', category: 'Frontend', percentage: 92, icon: 'react', orderIndex: 2 },
    { name: 'TypeScript', category: 'Frontend', percentage: 88, icon: 'file-code', orderIndex: 3 },
    { name: 'Tailwind CSS', category: 'Frontend', percentage: 94, icon: 'layout', orderIndex: 4 },
    { name: 'Framer Motion', category: 'Frontend', percentage: 85, icon: 'sparkles', orderIndex: 5 },

    { name: 'Node.js & Express.js', category: 'Backend', percentage: 90, icon: 'server', orderIndex: 1 },
    { name: 'Python & FastAPI', category: 'Backend', percentage: 85, icon: 'cpu', orderIndex: 2 },
    { name: 'RESTful API & WebSockets', category: 'Backend', percentage: 92, icon: 'network', orderIndex: 3 },
    { name: 'GraphQL', category: 'Backend', percentage: 80, icon: 'git-branch', orderIndex: 4 },

    { name: 'PostgreSQL & Prisma', category: 'Database', percentage: 90, icon: 'database', orderIndex: 1 },
    { name: 'MongoDB & Mongoose', category: 'Database', percentage: 88, icon: 'database', orderIndex: 2 },
    { name: 'Redis Caching', category: 'Database', percentage: 82, icon: 'layers', orderIndex: 3 },

    { name: 'Docker & Kubernetes', category: 'Cloud & DevOps', percentage: 82, icon: 'box', orderIndex: 1 },
    { name: 'AWS (S3, EC2, Lambda)', category: 'Cloud & DevOps', percentage: 80, icon: 'cloud', orderIndex: 2 },
    { name: 'Git & GitHub Actions CI/CD', category: 'Cloud & DevOps', percentage: 90, icon: 'terminal', orderIndex: 3 },

    { name: 'Data Structures & Algorithms', category: 'CS Fundamentals', percentage: 94, icon: 'binary', orderIndex: 1 },
    { name: 'System Design & Architecture', category: 'CS Fundamentals', percentage: 86, icon: 'cpu', orderIndex: 2 }
  ];

  for (const sk of skillsData) {
    await prisma.skill.create({ data: sk });
  }
  console.log('✅ 16 Technical Skills seeded');

  // 5. Clear & Seed Experience
  await prisma.experience.deleteMany();

  await prisma.experience.create({
    data: {
      role: 'Full-Stack Software Engineering Intern',
      company: 'CloudScale Technologies',
      location: 'Seattle, WA',
      startDate: 'Jun 2025',
      endDate: 'Sep 2025',
      current: false,
      description: JSON.stringify([
        'Engineered responsive React component modules and Express API endpoints serving over 100k daily active users.',
        'Optimized PostgreSQL query performance, reducing database response time by 35% through indexing and caching strategies.',
        'Collaborated in an Agile Scrum environment, participating in daily standups, code reviews, and sprint planning.'
      ]),
      technologies: JSON.stringify(['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']),
      orderIndex: 1
    }
  });

  await prisma.experience.create({
    data: {
      role: 'Undergraduate Computer Science Teaching Assistant',
      company: 'University School of Computer Science',
      location: 'Seattle, WA',
      startDate: 'Sep 2024',
      endDate: 'Present',
      current: true,
      description: JSON.stringify([
        'Conduct weekly lab sessions and office hours for 120+ students in Data Structures and Object-Oriented Programming (Java/C++).',
        'Grade programming assignments, unit tests, and design code refactoring feedback for student submissions.'
      ]),
      technologies: JSON.stringify(['Java', 'C++', 'Algorithms', 'Data Structures', 'Git']),
      orderIndex: 2
    }
  });
  console.log('✅ Work Experiences seeded');

  // 6. Clear & Seed Education
  await prisma.education.deleteMany();

  await prisma.education.create({
    data: {
      institution: 'University of Washington',
      degree: 'Bachelor of Science (B.S.)',
      fieldOfStudy: 'Computer Science',
      location: 'Seattle, WA',
      startDate: 'Sep 2022',
      endDate: 'Expected Jun 2026',
      gpa: '3.88 / 4.00',
      description: 'Dean’s Honor List. Active member of ACM Student Chapter and Software Engineering Club.',
      courses: JSON.stringify([
        'Data Structures & Algorithms',
        'Operating Systems',
        'Database Management Systems',
        'Computer Networks',
        'Software Engineering Principles',
        'Distributed Systems'
      ]),
      orderIndex: 1
    }
  });
  console.log('✅ Education record seeded');

  // 7. Clear & Seed Certificates
  await prisma.certificate.deleteMany();

  await prisma.certificate.create({
    data: {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      date: 'Aug 2025',
      credentialUrl: 'https://aws.amazon.com/verification',
      imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=400&auto=format&fit=crop',
      description: 'Validated foundational cloud knowledge, security compliance, AWS core services, and architectural best practices.'
    }
  });

  await prisma.certificate.create({
    data: {
      title: 'Meta Full-Stack Developer Professional Certificate',
      issuer: 'Meta / Coursera',
      date: 'Jan 2025',
      credentialUrl: 'https://coursera.org/verify/meta-fullstack',
      imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=400&auto=format&fit=crop',
      description: 'Completed hands-on capstone projects covering React, Node.js, REST APIs, Git workflows, and database architecture.'
    }
  });
  console.log('✅ Certificates seeded');

  // 8. Clear & Seed Services
  await prisma.service.deleteMany();

  const servicesData = [
    {
      title: 'Full-Stack Web Development',
      description: 'Building modern, fast, responsive, and scalable web applications with React, Node.js, Express, and PostgreSQL.',
      icon: 'code',
      features: JSON.stringify(['Custom Frontend UI/UX', 'RESTful API Integration', 'Responsive Design & Animations', 'SEO & Performance Optimization']),
      orderIndex: 1
    },
    {
      title: 'Backend & REST API Design',
      description: 'Designing robust server-side systems, database schemas, authentication middleware, and API integrations.',
      icon: 'server',
      features: JSON.stringify(['Database Modeling (PostgreSQL/MongoDB)', 'JWT Authentication & Security', 'Rate Limiting & Input Sanitization', 'Swagger API Documentation']),
      orderIndex: 2
    },
    {
      title: 'Database Architecture & Tuning',
      description: 'Optimizing relational database schemas, query performance, indexing, and data migrations.',
      icon: 'database',
      features: JSON.stringify(['Prisma / Mongoose ORM Setup', 'Query Optimization & Indexing', 'Data Backup & Migration Scripts']),
      orderIndex: 3
    }
  ];

  for (const s of servicesData) {
    await prisma.service.create({ data: s });
  }
  console.log('✅ Services seeded');

  // 9. Initial Messages
  await prisma.message.deleteMany();
  await prisma.message.create({
    data: {
      name: 'Sarah Jenkins',
      email: 'sjenkins@techrecruiter.com',
      subject: 'Software Engineering Opportunity at CloudCore',
      message: 'Hi Leul! We came across your portfolio and were really impressed by your DevPulse project. We would love to schedule an introductory call to discuss full-stack opportunities.',
      read: false,
      archived: false
    }
  });
  console.log('✅ Sample Message seeded');

  console.log('🎉 Database seeding completed successfully for Leul Mengesha!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
