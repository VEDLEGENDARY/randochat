"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Download } from "lucide-react"
import Image from "next/image"

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Fixed navigation effects
  const navBgOpacity = useTransform(heroProgress, [0, 0.1], [0, 1])
  const navBgBlur = useTransform(heroProgress, [0, 0.1], [0, 8])
  const navBackdropFilter = useTransform(navBgBlur, (value) => `blur(${value}px)`)

  // Enhanced animations
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(heroProgress, [0, 0.7, 1], [1, 0.5, 0])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.2])
  const heroTextScale = useTransform(heroProgress, [0, 1], [1, 0.95])
  
  // Parallax effects for project sections
  const project1Y = useTransform(scrollYProgress, [0.2, 0.4], ["0%", "-10%"])
  const project2Y = useTransform(scrollYProgress, [0.5, 0.7], ["0%", "-10%"])
  const project3Y = useTransform(scrollYProgress, [0.8, 1], ["0%", "-10%"])
  
  // Apple-like sticky section headers
  const sectionHeaderOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0.5, 1])
  const sectionHeaderY = useTransform(scrollYProgress, [0, 0.2], ["50px", "0px"])

  const projects = [
    {
      title: "Neural Network Visualizer",
      description: "An interactive platform that brings machine learning to life through real-time visualization of neural network architectures and training processes.",
      tech: ["React", "D3.js", "Python", "TensorFlow"],
      image: "/placeholder.svg",
      year: "2024",
      category: "Machine Learning",
    },
    {
      title: "Campus Connect",
      description: "A comprehensive social platform designed specifically for university students to discover events, form study groups, and build meaningful connections.",
      tech: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
      image: "/placeholder.svg",
      year: "2024",
      category: "Full-Stack",
    },
    {
      title: "StudyMind AI",
      description: "An intelligent study companion that adapts to individual learning patterns and provides personalized recommendations for optimal academic performance.",
      tech: ["Python", "FastAPI", "OpenAI", "React"],
      image: "/placeholder.svg",
      year: "2023",
      category: "AI/ML",
    },
  ]

  // Apple-like smooth scrolling behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <div ref={containerRef} className="bg-black text-white relative overflow-hidden">
      {/* Navigation with Apple-like blur effect */}
      <motion.nav 
        style={{ 
          opacity: navBgOpacity, 
          backdropFilter: navBackdropFilter,
          WebkitBackdropFilter: navBackdropFilter 
        }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="text-xl font-medium"
            >
              Alex Chen
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              <motion.a 
                href="#work" 
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Work
              </motion.a>
              <motion.a 
                href="#about" 
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                About
              </motion.a>
              <motion.a 
                href="#contact" 
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.a>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white hover:text-black">
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Apple-like parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="text-center z-10 max-w-5xl mx-auto px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
            style={{ scale: heroTextScale }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Alex Chen
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl font-light text-white/80 max-w-3xl mx-auto leading-relaxed">
              Computer Science Student crafting digital experiences that bridge innovation and human connection
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-3 rounded-full">
                View My Work
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Apple-like gradient background with animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
          
          {/* Animated particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: `${Math.random() * 100 - 50}vw`,
                y: `${Math.random() * 100 - 50}vh`,
                opacity: 0
              }}
              animate={{ 
                x: `${Math.random() * 100 - 50}vw`,
                y: `${Math.random() * 100 - 50}vh`,
                opacity: 0.2
              }}
              transition={{
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              className="absolute rounded-full bg-white"
              style={{
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section with Apple-like reveal animation */}
      <section id="about" className="py-32 px-6 relative">
        {/* Sticky section header */}
        <motion.div 
          style={{ 
            opacity: sectionHeaderOpacity, 
            y: sectionHeaderY 
          }}
          className="sticky top-24 z-10 mb-16"
        >
          <h2 className="text-xs uppercase tracking-widest text-white/50">About</h2>
          <div className="w-16 h-px bg-white/30 mt-2"></div>
        </motion.div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 100 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight">
                Driven by
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  curiosity
                </span>
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                I'm a Computer Science student at UC Berkeley, passionate about creating technology that makes a
                difference. My work spans from machine learning research to full-stack development, always with a focus
                on user experience and innovation.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
                >
                  <h3 className="text-2xl font-light mb-2">Frontend</h3>
                  <p className="text-white/60">React, Next.js, TypeScript</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
                >
                  <h3 className="text-2xl font-light mb-2">Backend</h3>
                  <p className="text-white/60">Python, Node.js, PostgreSQL</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
                >
                  <h3 className="text-2xl font-light mb-2">AI/ML</h3>
                  <p className="text-white/60">TensorFlow, PyTorch, OpenAI</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
                >
                  <h3 className="text-2xl font-light mb-2">Design</h3>
                  <p className="text-white/60">Figma, Framer, Principle</p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 100 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10 overflow-hidden">
                <Image
                  src="/placeholder.svg"
                  alt="Alex Chen"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-2xl"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                  boxShadow: "inset 0 0 60px rgba(255, 255, 255, 0.1)"
                }}></div>
              </div>
              
              {/* Floating tech badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg"
              >
                <span className="font-medium">5+ Years Experience</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg"
              >
                <span className="font-medium">Full-Stack</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section with Apple-like parallax */}
      <section id="work" className="py-32 px-6 bg-gradient-to-b from-black to-gray-950 relative">
        {/* Sticky section header */}
        <motion.div 
          style={{ 
            opacity: sectionHeaderOpacity, 
            y: sectionHeaderY 
          }}
          className="sticky top-24 z-10 mb-16"
        >
          <h2 className="text-xs uppercase tracking-widest text-white/50">Work</h2>
          <div className="w-16 h-px bg-white/30 mt-2"></div>
        </motion.div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Work</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              A collection of projects that showcase my passion for creating meaningful digital experiences
            </p>
          </motion.div>

          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 100, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative"
              >
                <div
                  className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <Badge variant="outline" className="border-white/20 text-white/60 bg-transparent">
                        {project.category}
                      </Badge>
                      <span className="text-white/40">{project.year}</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-light mb-6 tracking-tight group-hover:text-white/80 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-lg text-white/70 leading-relaxed mb-8">{project.description}</p>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.tech.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/60"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white hover:text-black rounded-full"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-white text-black hover:bg-white/90 rounded-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <motion.div 
                      style={{ 
                        y: index === 0 ? project1Y : 
                           index === 1 ? project2Y : 
                           project3Y 
                      }}
                      className="relative group-hover:scale-[1.02] transition-transform duration-700"
                    >
                      <div className="aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 rounded-3xl overflow-hidden border border-white/10 relative">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                          boxShadow: "inset 0 0 80px rgba(255, 255, 255, 0.05)"
                        }}></div>
                        {/* Reflection effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Apple-like background number */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.02 }}
                  className="absolute -z-10 text-[20vw] font-bold tracking-tighter"
                  style={{
                    top: "50%",
                    left: index % 2 === 0 ? "70%" : "10%",
                    transform: "translate(-50%, -50%)",
                    WebkitTextStroke: "1px white"
                  }}
                >
                  {index + 1}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Apple-like reveal */}
      <section id="contact" className="py-32 px-6 relative">
        {/* Sticky section header */}
        <motion.div 
          style={{ 
            opacity: sectionHeaderOpacity, 
            y: sectionHeaderY 
          }}
          className="sticky top-24 z-10 mb-16"
        >
          <h2 className="text-xs uppercase tracking-widest text-white/50">Contact</h2>
          <div className="w-16 h-px bg-white/30 mt-2"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight">
              Let's create something
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                extraordinary
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto">
              I'm always excited to collaborate on innovative projects and connect with fellow creators, researchers,
              and visionaries.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-4 rounded-full text-lg">
                  <Mail className="w-5 h-5 mr-3" />
                  alex.chen@berkeley.edu
                </Button>
              </motion.div>
              <div className="flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full p-4"
                  >
                    <Github className="w-5 h-5" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full p-4"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Floating contact elements */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-10 left-10 bg-white/5 border border-white/10 rounded-full p-4 backdrop-blur-sm"
        >
          <Mail className="w-6 h-6 text-white/80" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute top-20 right-20 bg-white/5 border border-white/10 rounded-full p-4 backdrop-blur-sm"
        >
          <Linkedin className="w-6 h-6 text-white/80" />
        </motion.div>
      </section>

      {/* Footer with Apple-like subtlety */}
      <footer className="py-12 px-6 border-t border-white/10 relative overflow-hidden">
        {/* Animated gradient background */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.03 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
        />
        
      
      </footer>
    </div>
  )
}