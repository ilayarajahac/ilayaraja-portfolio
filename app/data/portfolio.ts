export const portfolioData = {
  hero: {
    name: "Ilayaraja",
    title: "Full Stack Developer",
    subtitle: "I build scalable business applications using React, TypeScript and Django",
    stats: [
      { label: "Production Projects", value: "3+" },
      { label: "Years Experience", value: "2+" },
      { label: "Technologies", value: "15+" }
    ]
  },

  about: {
    title: "About Me",
    description: "I'm a self-taught full stack developer who focuses on building practical business software. I have built multi-tenant systems, automation tools and custom dashboards for businesses. My strength is designing backend architecture and delivering complete working systems from scratch."
  },

  projects: [
    {
      id: 1,
      title: "AthenaSAP System",
      category: "Enterprise Application",
      description: "Multi-company ERP style platform with isolated company data, inventory management, billing system and backend API architecture.",
      features: [
        "Company isolated databases",
        "Inventory tracking system",
        "Billing & invoicing",
        "Customer management",
        "Backend API architecture",
        "Multi-tenant architecture"
      ],
      tech: ["React", "TypeScript", "Django", "PostgreSQL", "REST API"],
      deployment: "VPS",
      impact: "Manages operations for multiple companies with complete data isolation"
    },
    {
      id: 2,
      title: "Agency Management System",
      category: "Business Automation",
      description: "Workflow automation platform for managing agency operations, built in 15 days.",
      features: [
        "Client tracking",
        "Task management",
        "API integration",
        "Custom dashboards",
        "Real-time updates"
      ],
      tech: ["React", "Django", "REST API", "PostgreSQL"],
      deployment: "VPS",
      timeline: "15 days",
      impact: "Streamlined agency workflow and client management"
    },
    {
      id: 3,
      title: "Travel Website Builder",
      category: "SaaS Platform",
      description: "Fast travel agency website builder with modern UI, deployed on Vercel.",
      features: [
        "Rapid website generation",
        "Modern responsive design",
        "SEO optimized",
        "Fast deployment",
        "Custom branding"
      ],
      tech: ["React", "Next.js", "Tailwind CSS", "Vercel"],
      link: "https://kanishka-travels.vercel.app",
      timeline: "4 hours per site",
      impact: "Built multiple travel websites with quick turnaround"
    }
  ],

  skills: {
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Three.js", "GSAP", "Framer Motion", "Tailwind CSS"],
    backend: ["Python", "Django", "Django REST Framework", "PostgreSQL", "SQLite", "API Design"],
    devops: ["Linux", "VPS Deployment", "Hostinger", "Nginx", "Domain Configuration", "Git"]
  },

  services: [
    {
      title: "Custom Business Software",
      description: "End-to-end development of business applications tailored to your needs"
    },
    {
      title: "Admin Dashboards",
      description: "Powerful dashboards for managing your business operations"
    },
    {
      title: "Full Stack Web Applications",
      description: "Complete web solutions from frontend to backend and deployment"
    },
    {
      title: "Deployment & Server Setup",
      description: "VPS configuration, domain setup, and production deployment"
    }
  ],

  contact: {
    email: "ilaiarajacse@gmail.com",
    github: "https://github.com/ilayarajahac",
    whatsapp: "https://wa.me/919080849708"
  }
}
