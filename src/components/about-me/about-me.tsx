"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Linkedin, Mail, Clock, Code2, Gamepad2, BookOpen, Plane } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import XingImage from "@/assets/Images/Xing.png"

const careerPath = [
  {
    year: "2022",
    title: "Ausbildung Fachinformatiker Anwendungsentwicklung",
    description: "Fundierte Ausbildung in Softwareentwicklung mit Fokus auf moderne Webtechnologien, Datenbanken und Softwarearchitekturen",
  },
  {
    year: "2025",
    title: "Softwareentwickler",
    description: "Entwicklung skalierbarer Webanwendungen mit React, Next.js und modernen Backend-Technologien",
  },
]

const interests = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Open Source",
    description: "Beitrag zu Open-Source-Projekten",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Continuous Learning",
    description: "Ständige Weiterbildung in neuen Technologien",
  },
  {
    icon: <Gamepad2 className="h-5 w-5" />,
    title: "Gaming",
    description: "Leidenschaftlicher Gamer in der Freizeit",
  },
  {
    icon: <Plane className="h-5 w-5" />,
    title: "Reisen",
    description: "Entdeckung neuer Kulturen und Perspektiven",
  },
]

export default function AboutMe() {
  return (
    <section className="flex mx-auto px-16 py-16 min-h-screen justify-center">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
        >
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Profile picture"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">About me</h1>
            <p className="bg-gradient-to-b from-foreground to-primary bg-clip-text text-2xl font-semibold tracking-tight text-transparent mb-6">
              Software Entwickler
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Als leidenschaftlicher Softwareentwickler spezialisiere ich mich auf die Entwicklung
              moderner, skalierbarer Webanwendungen. Mit umfassender Erfahrung in Frontend- und
              Backend-Technologien bringe ich Projekte von der Konzeption bis zur Produktion.
              Meine Stärken liegen in der Entwicklung benutzerfreundlicher Interfaces, robuster APIs
              und effizienter Datenbankarchitekturen.
            </p>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" size="icon" asChild className="text-background bg-foreground">
              <Link href="https://www.xing.com/profile/Leon_Achteresch/" target="_blank">
                <Image src={XingImage} alt="Xing" width={25} height={25} />
                <span className="sr-only">GitHub Profile</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="text-background bg-foreground">
              <Link href="https://www.linkedin.com/in/leon-achteresch-b2a7472aa/" target="_blank">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn Profile</span>
              </Link>
            </Button>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6">
            <Card className="p-6 ">
              <h2 className="text-2xl font-semibold mb-4">Mein Weg</h2>
              <div className="space-y-4">
                {careerPath.map((step, index) => (
                  <motion.div
                    key={step.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="min-w-[60px]">
                      <Badge variant="success" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {step.year}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Interessen & Hobbys</h2>
              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="mb-2 text-primary">{interest.icon}</div>
                    <h3 className="font-medium mb-1">{interest.title}</h3>
                    <p className="text-sm text-muted-foreground">{interest.description}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-6 mt-6 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 border-2 border-primary/20">
            <h2 className="text-2xl font-semibold mb-4">Bereit für neue Herausforderungen</h2>
            <p className="text-muted-foreground mb-6">
              Ich suche nach spannenden Projekten und Möglichkeiten, meine Fähigkeiten einzubringen.
              Lassen Sie uns gemeinsam innovative Lösungen entwickeln.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full animate-buttonheartbeat">
                <Link href="mailto:leon.achteresch@gmail.com">Kontakt aufnehmen</Link>
              </Button>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link href="https://www.linkedin.com/in/leon-achteresch-b2a7472aa/" target="_blank">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="https://www.xing.com/profile/Leon_Achteresch/" target="_blank">
                    <Image src={XingImage} alt="Xing" width={16} height={16} className="mr-2" />
                    Xing
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
