"use client";

import Image from "next/image";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Database,
  Download,
  Layers3,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  achievements,
  certifications,
  currentlyLearning,
  education,
  experience,
  funFacts,
  journey,
  profile,
  projects,
  skills,
  socials,
  values,
} from "@/data/portfolio";
import { CertificationCard } from "@/components/certification-card";
import { ProjectCard } from "@/components/project-card";
import { Timeline } from "@/components/timeline";
import { Badge, Button, Card, PageHeader, Section } from "@/components/ui";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeIn}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function HomeSections() {
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];

  return (
    <>
      <HeroSection />
      <WhatIDoSection />
      <FeaturedProjectSection project={featuredProject} />
      <SkillsOverviewSection />
      <CertificationsOverviewSection />
      <JourneyPreviewSection />
      <RecruiterDashboardSection />
      <ContactCtaSection />
    </>
  );
}

export function HeroSection() {
  const heroStats = [
    { label: "Core Disciplines", value: "3", detail: "AI, data, software" },
    { label: "CGPA", value: "8.04", detail: "BTech CSE, SRM" },
    { label: "Project Areas", value: "5", detail: "ML, CV, DBMS, web, IoT" },
  ];

  return (
    <Section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-gradient-to-b from-primary/15 via-transparent to-transparent blur-3xl" />
      </div>
      <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <Reveal>
          <Badge className="mb-6">
            <MapPin className="size-3" />
            {profile.location}
          </Badge>
          <h1 className="max-w-5xl text-5xl font-bold leading-none tracking-normal text-balance sm:text-7xl lg:text-8xl">
            Building intelligent products with{" "}
            <span className="bg-gradient-cyan-violet bg-clip-text text-transparent">
              full-stack precision
            </span>
            .
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {profile.displayName} is an {profile.headline.toLowerCase()} focused on
            turning complex ideas into clean, useful, production-ready digital systems.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/projects" size="lg">
              View work
              <ArrowRight />
            </Button>
            <Button href="/resume" size="lg" variant="glass">
              <Download />
              Resume
            </Button>
            <Button href={socials.github} external size="lg" variant="outline">
              View code
              <ArrowRight />
            </Button>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat, index) => (
              <Reveal delay={index * 0.06} key={stat.label}>
                <Card className="p-5">
                  <p className="font-mono text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-semibold">{stat.label}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{stat.detail}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="relative">
          <div className="absolute -inset-12 -z-10 rounded-[2rem] bg-gradient-cyan-violet opacity-20 blur-3xl" />
          <div className="relative mx-auto max-w-md overflow-hidden rounded-[1.5rem] border border-primary/30 bg-card/50 p-1 shadow-2xl shadow-primary/20 backdrop-blur-xl">
            <Image
              src="/profile-placeholder.svg"
              alt="Stylized profile placeholder for Manamoy Banerjee"
              width={720}
              height={720}
              priority
              className="aspect-square rounded-[1.3rem] object-cover"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-xl border border-white/20 bg-background/70 p-4 shadow-xl backdrop-blur-2xl">
              <p className="text-sm font-bold">{profile.displayName}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                {profile.role}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.18} className="mt-16 flex flex-wrap justify-center gap-3">
        {skills.slice(0, 10).map((skill) => (
          <span
            className="rounded-full border border-primary/25 bg-card/60 px-4 py-2 text-xs font-semibold backdrop-blur"
            key={skill.name}
          >
            {skill.name}
          </span>
        ))}
      </Reveal>
    </Section>
  );
}

export function WhatIDoSection() {
  const capabilities = [
    {
      title: "AI Product Thinking",
      description:
        "Frames AI as a product capability with useful workflows, measurable outcomes, and readable user experiences.",
      icon: Brain,
    },
    {
      title: "Full-Stack Delivery",
      description:
        "Builds across interface, server logic, data modeling, and deployment paths with production constraints in mind.",
      icon: Layers3,
    },
    {
      title: "Data Fluency",
      description:
        "Turns messy data into patterns, decisions, and visual explanations that teams can act on.",
      icon: Database,
    },
    {
      title: "Launch Discipline",
      description:
        "Values performance, SEO, accessibility, maintainability, and the small details that make products credible.",
      icon: Rocket,
    },
  ];

  return (
    <Section>
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold text-primary">What I do</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
          A builder profile shaped for modern product teams.
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          The portfolio shows not only tools, but judgment: how Manamoy scopes, builds,
          explains, and improves technical products.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {capabilities.map((capability, index) => {
          const Icon = capability.icon;

          return (
            <Reveal delay={index * 0.06} key={capability.title}>
              <Card className="h-full p-6 hover:-translate-y-1 hover:border-primary/40">
                <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{capability.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {capability.description}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export function FeaturedProjectSection({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <p className="text-sm font-semibold text-primary">Featured project</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
            {project.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.achievements.map((achievement) => (
              <Badge variant="outline" key={achievement}>
                <CheckCircle2 className="size-3" />
                {achievement}
              </Badge>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <ProjectCard project={project} />
        </Reveal>
      </div>
    </Section>
  );
}

export function SkillsOverviewSection() {
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    acc[skill.category] ??= [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <Section>
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold text-primary">Skills overview</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
          Practical range with clear strengths.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(grouped).map(([category, items], index) => (
          <Reveal delay={index * 0.04} key={category}>
            <Card className="h-full p-6">
              <h3 className="text-lg font-semibold">{category}</h3>
              <div className="mt-5 grid gap-4">
                {items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold">{skill.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {skill.signal}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-cyan-violet"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function CertificationsOverviewSection() {
  return (
    <Section>
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold text-primary">Certifications</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
          Learning tracks that support the portfolio story.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {certifications.map((certification, index) => (
          <Reveal delay={index * 0.05} key={certification.title}>
            <CertificationCard certification={certification} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function JourneyPreviewSection() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal>
          <p className="text-sm font-semibold text-primary">Journey preview</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
            From fundamentals to product-minded AI systems.
          </h2>
          <p className="mt-5 leading-8 text-muted-foreground">
            The story is intentionally simple: build computer science foundations, explore
            applied AI and data, then turn that learning into usable systems.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Timeline items={journey} />
        </Reveal>
      </div>
    </Section>
  );
}

export function RecruiterDashboardSection() {
  const dashboardItems = [
    { label: "Availability", value: "Open", detail: profile.recruiterMessage },
    {
      label: "Best fit",
      value: "AI + Product",
      detail: "Internships, junior roles, applied AI, and full-stack delivery.",
    },
    {
      label: "Proof",
      value: `${projects.length} projects`,
      detail: "Projects across ML, computer vision, databases, browser tooling, and IoT.",
    },
  ];

  return (
    <Section>
      <Card className="overflow-hidden border-primary/20 bg-card/80">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <Reveal>
            <Badge>
              <Sparkles className="size-3" />
              Recruiter dashboard
            </Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-normal sm:text-4xl">
              Fast signal for hiring conversations.
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              A compact snapshot of role fit, technical breadth, academic grounding, and
              the kind of problems Manamoy wants to work on next.
            </p>
          </Reveal>
          <div className="grid gap-4">
            {dashboardItems.map((item, index) => (
              <Reveal delay={index * 0.05} key={item.label}>
                <div className="rounded-lg border border-border/70 bg-background/50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Card>
    </Section>
  );
}

export function ContactCtaSection() {
  return (
    <Section className="pb-20">
      <Reveal>
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/80 to-accent/10 p-8 text-center shadow-2xl shadow-primary/10 backdrop-blur-xl sm:p-12">
          <p className="text-sm font-semibold text-primary">Contact CTA</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-normal sm:text-5xl">
            Recruiter-ready, product-minded, and built for the long game.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
            Explore the work, review the resume, or start a focused conversation about a
            meaningful opportunity.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Start a conversation
              <Mail />
            </Button>
            <Button href="/projects" size="lg" variant="glass">
              View projects
              <ArrowRight />
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function AboutSections() {
  return (
    <>
      <Section className="py-20">
        <PageHeader
          eyebrow="About"
          title="A practical builder connecting AI, data, and software."
          description={profile.bio}
        />
      </Section>
      <Section className="py-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="h-fit p-6">
            <h2 className="text-xl font-semibold">Education</h2>
            {education.map((item) => (
              <div className="mt-5" key={item.institution}>
                <p className="font-semibold">{item.degree}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.institution} {item.cgpa ? `/ CGPA ${item.cgpa}` : ""}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </Card>
          <div className="grid gap-6">
            <ListCard title="Values" items={values} />
            <ListCard title="Currently learning" items={currentlyLearning} />
            <ListCard title="Notes" items={funFacts} />
          </div>
        </div>
      </Section>
    </>
  );
}

export function ProjectsSections() {
  return (
    <>
      <Section className="py-20">
        <PageHeader
          eyebrow="Project showcase"
          title="Practical builds across AI, data, web, and automation."
          description="A recruiter-friendly view of Manamoy's best project directions, each framed by problem, implementation, stack, and outcome."
        />
      </Section>
      <Section className="py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      </Section>
    </>
  );
}

export function ResumeSections() {
  const primaryEducation = education[0];

  return (
    <>
      <Section className="py-20">
        <PageHeader
          eyebrow="Resume"
          title={`${profile.displayName} / ${profile.headline}`}
          description={`${primaryEducation.degree}, ${primaryEducation.institution}. CGPA ${primaryEducation.cgpa}.`}
        />
      </Section>
      <Section className="py-8">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Card className="h-fit p-6">
            <h2 className="text-xl font-semibold">Snapshot</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{profile.bio}</p>
            <div className="mt-6 grid gap-3 text-sm">
              <p>
                <span className="text-muted-foreground">Education:</span>{" "}
                {primaryEducation.degree}
              </p>
              <p>
                <span className="text-muted-foreground">Institution:</span>{" "}
                {primaryEducation.institution}
              </p>
              <p>
                <span className="text-muted-foreground">Location:</span>{" "}
                {profile.location}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Button href="/contact">
                Contact
                <ArrowRight />
              </Button>
              <Button
                href={`mailto:${profile.email}?subject=Resume request for Manamoy`}
                variant="outline"
              >
                <Download />
                Request PDF
              </Button>
            </div>
          </Card>
          <div className="grid gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold">Core skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.slice(0, 18).map((skill) => (
                  <Badge variant="outline" key={skill.name}>
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-semibold">Experience</h2>
              {experience.map((item) => (
                <div className="mt-4" key={item.company}>
                  <p className="font-semibold">{item.role}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.company} / {item.duration}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </Card>
            <Card className="p-6">
              <h2 className="text-xl font-semibold">Selected projects</h2>
              <div className="mt-4 grid gap-4">
                {projects.slice(0, 3).map((project) => (
                  <ProjectCard compact project={project} key={project.slug} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

export function ContactSections() {
  return (
    <>
      <Section className="py-20">
        <PageHeader
          eyebrow="Contact"
          title="Start a focused conversation."
          description="Use the direct details for hiring, project discussions, collaboration, or recruiter outreach."
        />
      </Section>
      <Section className="py-8">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Card className="h-fit p-6">
            <h2 className="text-xl font-semibold">Direct details</h2>
            <div className="mt-5 grid gap-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-3">
                <Mail className="size-4 text-primary" />
                {profile.email}
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" />
                {profile.location}
              </p>
            </div>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              Best for AI engineering, full-stack development, data science projects,
              internships, and junior engineer opportunities.
            </p>
          </Card>
          <Card className="p-6">
            <form
              className="grid gap-4"
              action={`mailto:${profile.email}`}
              method="post"
              encType="text/plain"
            >
              <label className="grid gap-2 text-sm font-medium">
                Name
                <input
                  className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  name="name"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Email
                <input
                  className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Message
                <textarea
                  className="min-h-36 rounded-md border border-input bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  name="message"
                  placeholder="Tell me about the opportunity or project."
                />
              </label>
              <Button type="submit" className="w-fit">
                Open email draft
                <Mail />
              </Button>
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <p className="flex gap-3 text-sm leading-7 text-muted-foreground" key={item}>
            <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
            {item}
          </p>
        ))}
      </div>
    </Card>
  );
}

export { achievements };
