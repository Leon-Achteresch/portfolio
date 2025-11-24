"use client"

import { motion } from "framer-motion"
import HeroTitle from "../hero-title/hero-title"
import SparklesBackground from "../sparkles-background/sparkles-background"
import { Button } from "../ui/button"
import { ArrowDown, Download } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const scrollToSkills = () => {
    const skillsSection = document.getElementById("skills")
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      className="flex h-screen flex-col items-center justify-center overflow-hidden
      bg-background text-foreground relative"
    >
      <article className="relative z-10 flex flex-col items-center gap-8 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeroTitle />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl"
        >
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Leidenschaftlicher Softwareentwickler mit Fokus auf moderne Webtechnologien,
            skalierbare Architekturen und benutzerfreundliche Lösungen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button
            onClick={scrollToSkills}
            size="lg"
            className="gap-2"
          >
            Meine Skills
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Link href="/CV.pdf" target="_blank" download>
              <Download className="h-4 w-4" />
              Lebenslauf
            </Link>
          </Button>
        </motion.div>
      </article>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={scrollToSkills}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.div>

      <SparklesBackground />
    </section>
  )
}
