export const portfolioData = {
  hero: {
    name: "Ilayaraja",
    title: "Full Stack Developer (React + Django)",
    subtitle: "I build real-world web applications for businesses and practical use cases.",
  },

  about: {
    description: "I am a Full Stack Developer with experience in React and Django. I focus on building practical applications that solve real-world problems, especially for small businesses. I enjoy working on end-to-end development — from frontend UI to backend APIs and deployment.",
  },

  projects: [
    {
      id: 1,
      title: "AthenaSAP System",
      category: "Enterprise Application",
      problem: "Small businesses needed an affordable ERP system with complete data isolation between companies.",
      description: "Multi-company ERP platform with isolated company data, inventory management, billing system and backend API architecture.",
      features: [
        "Multi-tenant architecture",
        "Company isolated databases",
        "Inventory tracking system",
        "Billing & invoicing",
        "Customer management",
        "Backend REST API",
      ],
      tech: ["React", "TypeScript", "Django", "PostgreSQL", "REST API"],
      deployment: "VPS",
      impact: "Manages operations for multiple companies with complete data isolation",
      github: "https://github.com/ilayarajahac/athenasap",
    },
    {
      id: 2,
      title: "Agency Management System",
      category: "Business Automation",
      problem: "Agencies were managing clients and tasks manually with no central system.",
      description: "Workflow automation platform for managing agency operations — built and deployed in 15 days.",
      features: [
        "Client tracking",
        "Task management",
        "Custom dashboards",
        "API integration",
        "Real-time updates",
      ],
      tech: ["React", "Django", "REST API", "PostgreSQL"],
      deployment: "VPS",
      timeline: "15 days",
      impact: "Streamlined agency workflow and client management",
      github: "https://github.com/ilayarajahac/agency",
      images: [
        "/images/agency/image1.png",
        "/images/agency/image2.png",
        "/images/agency/image3.png",
        "/images/agency/image4.png",
        "/images/agency/image5.png",
        "/images/agency/image6.png",
        "/images/agency/image7.png",
        "/images/agency/image8.png",
      ],
    },
    {
      id: 3,
      title: "Travel Website Builder",
      category: "SaaS Platform",
      problem: "Travel agencies needed professional websites fast without high development costs.",
      description: "Fast travel agency website builder with modern UI — each site deployed in under 4 hours.",
      features: [
        "Rapid website generation",
        "Modern responsive design",
        "SEO optimized",
        "Fast deployment",
        "Custom branding",
      ],
      tech: ["React", "Next.js", "Tailwind CSS", "Vercel"],
      link: "https://kanishka-travels.vercel.app",
      timeline: "4 hours per site",
      impact: "Built multiple travel websites with quick turnaround",
      github: "https://github.com/ilayarajahac/kanishka-travels",
    },
  ],

  skills: {
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    backend: ["Python", "Django", "Django REST Framework", "PostgreSQL", "MySQL", "API Design"],
    devops: ["Git", "Linux", "VPS", "Nginx", "Vercel", "Render"],
  },

  services: [
    { title: "Custom Business Software", description: "End-to-end development of business applications tailored to your needs" },
    { title: "Admin Dashboards", description: "Powerful dashboards for managing your business operations" },
    { title: "Full Stack Web Applications", description: "Complete web solutions from frontend to backend and deployment" },
    { title: "Deployment & Server Setup", description: "VPS configuration, domain setup, and production deployment" },
  ],

  contact: {
    email: "ilaiarajacse@gmail.com",
    github: "https://github.com/ilayarajahac",
    whatsapp: "https://wa.me/919080849708",
    linkedin: "https://www.linkedin.com/in/ilaya619",
  },
}
