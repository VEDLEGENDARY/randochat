"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Download } from "lucide-react"
import Image from "next/image"
import localFont from 'next/font/local'

const sfPro = localFont({
  src: [
    {
      path: '../../public/fonts/SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Light.otf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-sf-pro',
})

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [preloaderStage, setPreloaderStage] = useState(0)
  const [showNav, setShowNav] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowNav(latest > 0.05)
  })

  useMotionValueEvent(heroScrollProgress, "change", (latest) => {
    setScrollProgress(latest)
  })

  useEffect(() => {
    document.body.style.cursor = 'none'
    
    const timer1 = setTimeout(() => setPreloaderStage(1), 300)
    const timer2 = setTimeout(() => setPreloaderStage(2), 1000)
    const timer3 = setTimeout(() => setPreloaderStage(3), 1500)
    const timer4 = setTimeout(() => setPreloaderStage(4), 2000)
    const timer5 = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    
    document.body.style.overflow = 'hidden'
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [])

  useEffect(() => {
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let ease = .2
    
    const moveCursor = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }
    
    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHoveringLink(true)
      } else {
        setIsHoveringLink(false)
      }
    }
    
    const animateCursor = () => {
      currentX += (targetX - currentX) * ease * 5
      currentY += (targetY - currentY) * ease * 5
      setCursorPosition({ x: currentX, y: currentY })
      requestAnimationFrame(animateCursor)
    }
    
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleLinkHover)
    animateCursor()
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleLinkHover)
    }
  }, [])

  useEffect(() => {
    let isWheel = false
    let targetScroll = window.scrollY
    let currentScroll = window.scrollY
    let ease = 0.2
    
    const handleWheel = (e: WheelEvent) => {
      if (isLoading) {
        e.preventDefault()
        return
      }
      isWheel = true
      targetScroll += e.deltaY * 1.2
      targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight))
      e.preventDefault()
    }
    
    const animateScroll = () => {
      if (Math.abs(targetScroll - currentScroll) > 0.5) {
        currentScroll += (targetScroll - currentScroll) * ease
        window.scrollTo(0, currentScroll)
      } else if (isWheel) {
        currentScroll = targetScroll
        window.scrollTo(0, currentScroll)
        isWheel = false
      }
      requestAnimationFrame(animateScroll)
    }
    
    window.addEventListener('wheel', handleWheel, { passive: false })
    animateScroll()
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [isLoading])

  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 3])
  const heroTranslateZ = useTransform(heroScrollProgress, [0, 1], ["0px", "500px"])
  const heroRotateX = useTransform(heroScrollProgress, [0, 1], ["0deg", "10deg"])
  const heroTextOpacity = useTransform(heroScrollProgress, [0, 0.6, 0.8], [1, 1, 0]);
  const heroTextScale = useTransform(heroScrollProgress, [0, 1], [1, 2.5])
  const heroTextY = useTransform(heroScrollProgress, [0, 1], ["0%", "20%"])
  const heroBgScale = useTransform(heroScrollProgress, [0, 1], [1, 1.5])

  const navBgOpacity = useTransform(scrollYProgress, [.01, .06], [0, 1])
  const navBgBlur = useTransform(scrollYProgress, [0.05, 0.1], [0, 12])
  const navBackdropFilter = useTransform(navBgBlur, (value) => `blur(${value}px)`)

  const aboutOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1])
  const aboutY = useTransform(scrollYProgress, [0.15, 0.25], ["50px", "0px"])

  const projects = [
    {
      title: "Neural Network Visualizer",
      description: "An interactive platform that brings machine learning to life through real-time visualization of neural network architectures and training processes.",
      tech: ["React", "D3.js", "Python", "TensorFlow"],
      image: "/nn-visualizer.jpg",
      year: "2024",
      category: "Machine Learning",
    },
    {
      title: "Campus Connect",
      description: "A comprehensive social platform designed specifically for university students to discover events, form study groups, and build meaningful connections.",
      tech: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
      image: "/campus-connect.jpg",
      year: "2024",
      category: "Full-Stack",
    },
    {
      title: "StudyMind AI",
      description: "An intelligent study companion that adapts to individual learning patterns and provides personalized recommendations for optimal academic performance.",
      tech: ["Python", "FastAPI", "OpenAI", "React"],
      image: "/studymind-ai.jpg",
      year: "2023",
      category: "AI/ML",
    },
  ]

  return (
    <>
      <motion.div
        className="fixed z-50 pointer-events-none mix-blend-difference"
        animate={{
          x: cursorPosition.x - (isHoveringLink ? 15 : 8),
          y: cursorPosition.y - (isHoveringLink ? 15 : 8),
          scale: isHoveringLink ? 1.5 : 1,
          opacity: isLoading ? 0 : 1
        }}
        transition={{ type: "spring", mass: 0.05, damping: 15 }}
      >
        <div 
          className={`rounded-full bg-white transition-all duration-150 ${isHoveringLink ? 'w-8 h-8' : 'w-4 h-4'}`}
        />
      </motion.div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
              } 
            }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            <svg className="absolute opacity-0">
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0" />
              </filter>
            </svg>

            <motion.div 
              className="h-1/3 bg-blue-200 relative"
              initial={{ x: "-100%" }}
              animate={{ 
                x: preloaderStage >= 2 ? "0%" : "-100%",
                transition: { duration:.8, ease: [0.65, 0, 0.35, 1] }
              }}
            />
            
            <motion.div 
              className="h-1/3 bg-blue-300 relative"
              initial={{ x: "100%" }}
              animate={{ 
                x: preloaderStage >= 2 ? "0%" : "100%",
                transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] }
              }}
            >
            </motion.div>
            
            <motion.div 
              className="h-1/3 bg-blue-400 relative"
              initial={{ x: "-100%" }}
              animate={{ 
                x: preloaderStage >= 2 ? "0%" : "-100%",
                transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        ref={containerRef} 
        className={`bg-black text-white relative overflow-hidden ${sfPro.variable} font-sans`}
      >
        <motion.nav 
          style={{ 
            opacity: navBgOpacity, 
            backdropFilter: navBackdropFilter,
            WebkitBackdropFilter: navBackdropFilter,
            pointerEvents: showNav ? 'auto' : 'none'
          }}
          className="fixed top-0 left-0 right-0 z-40 bg-black/50 border-b border-white/10 transition-opacity"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="text-xl font-medium"
              >
                Ved Patel
              </motion.div>
              <div className="hidden md:flex items-center space-x-8">
                <motion.a 
                  href="#work" 
                  className="text-white/70 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor-hover
                >
                  Work
                </motion.a>
                <motion.a 
                  href="#about" 
                  className="text-white/70 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor-hover
                >
                  About
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="text-white/70 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor-hover
                >
                  Contact
                </motion.a>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
              >
                <Button variant="outline" size="sm" className="border-white/20 text-black hover:bg-white hover:text-black">
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.nav>

{/* Hero Section */}{/* Hero Section */}{/* Hero Section */}{/* Hero Section */}{/* Hero Section */}{/* Hero Section */}{/* Hero Section */}{/* Hero Section */}{/* Hero Section */}{/* Hero Section */}

        <section ref={heroRef} className="relative h-[200vh] overflow-hidden z-0">
          {/* Background */}
          <motion.div
            style={{
              scale: heroBgScale,
              opacity: useTransform(heroScrollProgress, [0, .6, 1], [1, .5, 0]),
            }}
            className="absolute inset-0 bg-gradient-to-b from-blue-200 via-blue-500 to-blue-800"
          />

          {/* Hero Content - Aggressive zoom that disappears */}
          <motion.div
            style={{ 
              scale: useTransform(heroScrollProgress, [0, .4, 1], [1, 6, 27]), // Increased from 2.5 to 10
              x: useTransform(heroScrollProgress, [0, 1], ["0%", "1.7%"]), // Added downward movement
            }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center origin-center"
          >
            <motion.div className="mb-8">
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tight mb-6">
                Ved Patel
              </h1>
              <p className="text-xl md:text-2xl font-light text-white/80 mx-auto leading-relaxed">
                Computer Science Student @ UT Dallas '25
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-3 rounded-full">
                View My Work
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-black hover:bg-white/10 px-8 py-3 rounded-full"
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </section>
        
      <motion.section 
        id="about" 
        className="py-32 px-6 relative z-10 bg-black"
        style={{
          opacity: aboutOpacity,
          y: aboutY
        }}
      >
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
                  I'm a Computer Science student at The University of Texas at Dallas, passionate about creating technology that makes a difference. My work spans from machine learning research to full-stack development, always with a focus on user experience and innovation.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
                    data-cursor-hover
                  >
                    <h3 className="text-2xl font-light mb-2">Frontend</h3>
                    <p className="text-white/60">React, Next.js, TypeScript</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
                    data-cursor-hover
                  >
                    <h3 className="text-2xl font-light mb-2">Backend</h3>
                    <p className="text-white/60">Python, Node.js, PostgreSQL</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
                    data-cursor-hover
                  >
                    <h3 className="text-2xl font-light mb-2">AI/ML</h3>
                    <p className="text-white/60">TensorFlow, PyTorch, OpenAI</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
                    data-cursor-hover
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
                    src="/ved-patel.jpg"
                    alt="Ved Patel"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                    boxShadow: "inset 0 0 60px rgba(255, 255, 255, 0.1)"
                  }}></div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg"
                >
                  <span className="font-medium">UT Dallas '25</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg"
                >
                  <span className="font-medium">CS Honors</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <section id="work" className="py-32 px-6 bg-gradient-to-b from-black to-gray-950 relative">
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
                            data-cursor-hover
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-cursor-hover>
                          <Button
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white hover:text-black rounded-full"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            View Code
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-cursor-hover>
                          <Button className="bg-white text-black hover:bg-white/90 rounded-full">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                      <div className="aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 rounded-3xl overflow-hidden border border-white/10 relative">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="w-full h-full"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                          boxShadow: "inset 0 0 80px rgba(255, 255, 255, 0.05)"
                        }}></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                  
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

        <section id="contact" className="py-32 px-6 relative">
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
                  data-cursor-hover
                >
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-4 rounded-full text-lg">
                    <Mail className="w-5 h-5 mr-3" />
                    ved.patel@utdallas.edu
                  </Button>
                </motion.div>
                <div className="flex gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    data-cursor-hover
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
                    data-cursor-hover
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

        <footer className="py-12 px-6 border-t border-white/10 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.03 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
          />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/40 mb-4 md:mb-0">
                © 2024 Ved Patel. <span className="hidden sm:inline">Crafted with passion and precision.</span>
              </p>
              <div className="flex items-center gap-6">
                {["Privacy", "Terms", "Accessibility"].map((item) => (
                  <motion.a 
                    key={item}
                    href="#" 
                    className="text-white/40 hover:text-white transition-colors"
                    whileHover={{ y: -2 }}
                    data-cursor-hover
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}