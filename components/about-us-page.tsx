"use client"

import { useTranslation } from "react-i18next"
import { Github, Linkedin, ExternalLink } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Vrushabh Hirap",
    role: "Lead Frontend Developer",
    description: "Passionate about creating beautiful, user-friendly interfaces and leading the development of modern web applications.",
    github: "https://github.com/VrushabhHirapOfficial",
    linkedin: "https://www.linkedin.com/in/vrushabh-hirap-2ba0a9280/",
    avatar: "/placeholder-user.jpg",
    avatarType: "image",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    id: 2,
    name: "Manthan Marathe",
    role: "Lead Backend Developer",
    description: "Expert in building scalable backend systems and APIs, specializing in data processing and machine learning integration for agricultural applications.",
    github: "https://github.com/ManthanMarathe223?tab=overview&from=2025-08-01&to=2025-08-22",
    linkedin: "https://www.linkedin.com/in/manthanmarathe",
    avatar: "/manthan.jpg",
    avatarType: "image",
    skills: ["Node.js", "Python", "Machine Learning", "API Design", "Database Management"]
  },
  {
    id: 3,
    name: "Harshvardhan Bavle",
    role: "Backend Developer",
    description: "Developing and maintaining robust backend systems, focusing on API development, database management, and ensuring seamless data integration.",
    github: "",
    linkedin: "https://www.linkedin.com/in/harshwardhan-bavale-86007032b",
    avatar: "/harshvardhan.jpg",
    avatarType: "image",
    skills: ["API Development", "Database Management", "Python", "Data Integration"]
  },
  {
    id: 4,
    name: "Hrishikesh Bhande",
    role: "Team Member",
    description: "Contributing to the development and success of Indra Dhanu with dedication and technical expertise.",
    github: "https://github.com/HrishikeshBhande06",
    linkedin: "http://www.linkedin.com/in/hrishikesh-bhande-b26407252",
    avatar: "/hrishi.jpg",
    avatarType: "image",
    skills: ["Testing", "Documentation", "Market Research", "Social Media Content"]
  }
]

export default function AboutUsPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-background dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent dark:from-green-400 dark:via-yellow-400 dark:to-blue-400">
            {t("about_us_title")}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("about_us_description")}
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 animate-slide-up text-foreground dark:text-white">
            {t("our_team")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 text-center animate-scale-in hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-6 glass-card dark:bg-white/20 flex items-center justify-center text-3xl overflow-hidden rounded-full">
                  {member.avatarType === "image" ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    member.avatar
                  )}
                </div>

                {/* Name and Role */}
                <h3 className="text-2xl font-bold mb-2 text-foreground dark:text-gray-200">{member.name}</h3>
                <p className="text-primary dark:text-green-400 font-semibold mb-4">{member.role}</p>

                {/* Description */}
                <p className="text-muted-foreground dark:text-gray-400 mb-6 leading-relaxed">
                  {member.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-primary/10 dark:bg-green-500/20 text-primary dark:text-green-300 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-button dark:bg-white/10 dark:border dark:border-white/20 p-3 hover:bg-primary/20 dark:hover:bg-green-500/20 transition-colors duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button dark:bg-white/10 dark:border dark:border-white/20 p-3 hover:bg-primary/20 dark:hover:bg-green-500/20 transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="glass-card dark:bg-white/10 dark:backdrop-blur-lg dark:border dark:border-white/20 p-8 sm:p-12 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground dark:text-gray-200">{t("our_mission")}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground dark:text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            {t("mission_description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 glass-card dark:bg-white/20 flex items-center justify-center text-2xl">
                🌱
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground dark:text-gray-200">{t("innovation")}</h3>
              <p className="text-muted-foreground dark:text-gray-400">
                {t("innovation_description")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 glass-card dark:bg-white/20 flex items-center justify-center text-2xl">
                🤝
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground dark:text-gray-200">{t("accessibility")}</h3>
              <p className="text-muted-foreground dark:text-gray-400">
                {t("accessibility_description")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 glass-card dark:bg-white/20 flex items-center justify-center text-2xl">
                🌍
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground dark:text-gray-200">{t("sustainability")}</h3>
              <p className="text-muted-foreground dark:text-gray-400">
                {t("sustainability_description")}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground dark:text-white">{t("get_in_touch")}</h2>
          <p className="text-muted-foreground dark:text-gray-300 mb-8">
            {t("contact_description")}
          </p>
          <a
            href="mailto:contact@indradhanu.com"
            className="glass-button-primary dark:bg-white/15 dark:backdrop-blur-lg dark:border dark:border-green-500/30 px-8 py-4 text-lg font-semibold inline-flex items-center gap-2 hover:bg-primary/20 dark:hover:bg-green-500/20 transition-colors duration-300"
          >
            <ExternalLink className="w-5 h-5" />
            {t("contact_us")}
          </a>
        </div>
      </div>
    </div>
  )
}
