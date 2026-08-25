import type {
  EducationEntry,
  ExperienceEntry,
  SkillGroup,
} from "@/types/about";

export const bio: string[] = [
  "Five years of production frontend work, all of it in fintech, all of it at ParamTech in Ankara. I joined in September 2021 straight out of a React bootcamp and left in June 2026 as a senior engineer on the team behind Kredim, a BNPL platform serving more than 100,000 members.",
  "The work covered four products on one shared architecture: a consumer BNPL panel, an embeddable checkout that runs inside partner e-commerce and banking apps, a merchant panel, and a 29-module internal admin platform. A fifth, Param Backoffice, extended the same feature-sliced React and TypeScript setup to ParamTech's flagship product.",
  "What holds my attention is the layer underneath the screens: structure that lets separate teams move without colliding, state management picked per problem instead of per habit, and build pipelines that stay fast as a codebase grows past the point where anyone holds all of it in their head. Later on that meant working with Product and Design on scope and UX decisions, not just implementing finished designs.",
  "This site runs on Next.js on purpose. Five years of Vite and Webpack left server rendering as the one real gap in an otherwise React, TypeScript, Redux, and TanStack Query background, so the case studies here are built with the framework I am closing that gap on.",
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages & Frameworks",
    skills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React 18/19",
      "React Router v7",
    ],
  },
  {
    name: "State & Data Management",
    skills: [
      "Redux Toolkit",
      "Redux-Saga",
      "RTK Query",
      "TanStack Query v5",
      "Axios",
    ],
  },
  {
    name: "Forms & Validation",
    skills: [
      "React Hook Form",
      "Zod",
      "Multi-step form architectures",
    ],
  },
  {
    name: "Build & Tooling",
    skills: [
      "Vite",
      "Next.js (in progress)",
      "Webpack 5",
      "Babel",
      "pnpm Workspaces",
      "Terser",
    ],
  },
  {
    name: "Styling",
    skills: [
      "Tailwind CSS",
      "Emotion",
      "Ant Design",
      "Less/SCSS",
      "CSS Modules",
      "PostCSS",
    ],
  },
  {
    name: "Testing & Quality",
    skills: [
      "Vitest",
      "Jest",
      "React Testing Library",
      "Mock Service Worker",
      "ESLint",
      "Prettier",
    ],
  },
  {
    name: "DevOps & Infra",
    skills: ["Docker", "Nginx", "CI/CD", "Git", "Conventional Commits"],
  },
  {
    name: "Integrations",
    skills: [
      "WebSocket",
      "i18next (i18n/RTL)",
      "Insider",
      "Google Tag Manager",
      "Adjust SDK",
    ],
  },
  {
    name: "Collaboration & Design Handoff",
    skills: ["Figma", "Jira", "Confluence"],
  },
  {
    name: "AI-Assisted Workflow",
    skills: ["Claude", "Google Antigravity", "Cursor"],
  },
  {
    name: "Spoken Languages",
    skills: ["Turkish (native)", "English (professional working proficiency)"],
  },
];

// Newest first. Two entries at one employer, one per title period.
export const experience: ExperienceEntry[] = [
  {
    role: "Senior Frontend Developer",
    employer: "ParamTech",
    period: "Jul 2024 - Jun 2026",
    description:
      "Architected Kredim Backstage, a 29-module admin platform on a pnpm monorepo, with a centralised TanStack Query data layer and a route-level permission system covering 40+ protected routes. Delivered Kredim Checkout and Kredim Merchant, and extended the same architecture to Param Backoffice.",
  },
  {
    role: "Frontend Developer",
    employer: "ParamTech",
    period: "Sep 2021 - Jul 2024",
    description:
      "Built the Kredim Member Panel, a multi-tenant BNPL application serving 100,000+ users across three modules, including its 3D Secure, card, transfer, and wallet payment flows, a hybrid Redux Toolkit and Redux-Saga state layer, a reconnecting WebSocket client, and i18next localisation with RTL support.",
  },
];

// Newest first, matching the experience order. The bootcamp runs straight into
// the first ParamTech role, so it belongs here rather than in the bio alone.
export const education: EducationEntry[] = [
  {
    institution: "Kodluyoruz",
    credential: "React Bootcamp",
    period: "Jun 2021 - Sep 2021",
  },
  {
    institution: "Çankaya University, Ankara",
    credential: "B.Sc. Electronics and Communication Engineering (English)",
    period: "2013 - 2019",
  },
];
