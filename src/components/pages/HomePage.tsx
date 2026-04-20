// HPI 1.7-G
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Rocket, ChevronRight, Terminal } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  const breatherRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: breatherScroll } = useScroll({
    target: breatherRef,
    offset: ["start end", "end start"]
  });
  const breatherY = useTransform(breatherScroll, [0, 1], ["-20%", "20%"]);

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized infrastructure delivering millisecond response times for critical operations. Built for the speed of modern business.',
      metric: '< 10ms'
    },
    {
      icon: Shield,
      title: 'Military-Grade Security',
      description: 'Bank-level encryption and security protocols protecting your data 24/7. Zero-trust architecture as standard.',
      metric: 'AES-256'
    },
    {
      icon: Rocket,
      title: 'Infinite Scalability',
      description: 'Seamlessly scale from startup to enterprise without missing a beat. Auto-provisioning resources on demand.',
      metric: '99.99%'
    }
  ];

  return (
    <div className="min-h-screen bg-deep-space text-foreground font-paragraph selection:bg-primary selection:text-primary-foreground overflow-clip">
      <Header />
      
      {/* Global Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(to right, #E0E0E0 1px, transparent 1px), linear-gradient(to bottom, #E0E0E0 1px, transparent 1px)`,
        backgroundSize: '4rem 4rem'
      }} />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Dynamic Background */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-background to-deep-space" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-primary/20 rounded-full blur-[120px] opacity-50 mix-blend-screen" />
          <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-burnt-orange/20 rounded-full blur-[100px] opacity-40 mix-blend-screen" />
        </motion.div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex items-center gap-3 text-primary font-heading tracking-widest uppercase text-sm font-bold"
                >
                  <Terminal className="w-4 h-4" />
                  <span>System Initialization Sequence</span>
                </motion.div>
                
                <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.9] tracking-tighter">
                  <motion.span 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="block text-foreground"
                  >
                    Chingon
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-burnt-orange"
                  >
                    Industries
                  </motion.span>
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-lg sm:text-xl lg:text-2xl text-foreground/70 max-w-2xl leading-relaxed border-l-2 border-primary/50 pl-6"
              >
                Powering the future with cutting-edge SaaS solutions. 
                Experience enterprise-grade technology designed for the modern digital forge.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 pt-4"
              >
                <Link to="/services" className="group relative inline-flex items-center justify-center px-8 py-5 font-heading font-bold text-background bg-primary overflow-hidden transition-all hover:scale-[1.02]">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative flex items-center gap-2 uppercase tracking-wider">
                    Explore Plans
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link to="/terms" className="group inline-flex items-center justify-center px-8 py-5 font-heading font-bold text-foreground border border-foreground/20 hover:border-primary hover:text-primary transition-colors uppercase tracking-wider">
                  Terms & Policies
                </Link>
              </motion.div>
            </div>

            {/* Right Content - Abstract Tech Visual */}
            <div className="lg:col-span-5 relative hidden lg:block h-[600px]">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Core */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="relative w-96 h-96"
                >
                  <div className="absolute inset-0 border border-primary/30 rounded-full" />
                  <div className="absolute inset-4 border border-secondary/20 rounded-full border-dashed" />
                  <div className="absolute inset-12 border border-burnt-orange/40 rounded-full" />
                  
                  {/* Orbiting Elements */}
                  <motion.div 
                    className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#FF6B00]"
                    style={{ originX: 0, originY: 192 }} // 192 is half of 396 (96 * 4)
                  />
                  <motion.div 
                    className="absolute bottom-0 right-1/2 w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_#FF9F00]"
                    style={{ originX: 0, originY: -192 }}
                  />
                </motion.div>

                {/* Center Graphic */}
                <div className="absolute w-32 h-32 bg-background border border-primary/50 flex items-center justify-center rotate-45 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                  <Terminal className="w-12 h-12 text-primary -rotate-45" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-heading tracking-widest text-foreground/50 uppercase">Scroll to initialize</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* MARQUEE DIVIDER */}
      <div className="w-full py-6 bg-primary border-y border-primary/50 overflow-hidden flex items-center">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center text-background font-heading font-black text-2xl uppercase tracking-widest">
              <span className="mx-8">Chingon Industries</span>
              <span className="mx-8 opacity-50">///</span>
              <span className="mx-8">Digital Forge</span>
              <span className="mx-8 opacity-50">///</span>
              <span className="mx-8">System Active</span>
              <span className="mx-8 opacity-50">///</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* STICKY FEATURES SECTION */}
      <section id="features" className="relative w-full bg-background">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Sticky Left Column */}
            <div className="lg:w-1/3 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-20 lg:py-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-12 h-1 bg-primary mb-8" />
                <h2 className="font-heading text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
                  Built For <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Performance</span>
                </h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Enterprise-grade solutions engineered for maximum efficiency and scalability. We don't just build software; we forge digital infrastructure.
                </p>
              </motion.div>
            </div>

            {/* Scrolling Right Column */}
            <div className="lg:w-2/3 py-10 lg:py-32 space-y-8 lg:space-y-32">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6 }}
                  className="group relative bg-deep-space border border-foreground/10 p-8 md:p-12 overflow-hidden"
                >
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="shrink-0 w-20 h-20 bg-background border border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors duration-300">
                      <feature.icon className="w-10 h-10 text-primary" />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide text-foreground">
                          {feature.title}
                        </h3>
                        <span className="hidden md:block font-heading text-primary font-bold tracking-widest">
                          {feature.metric}
                        </span>
                      </div>
                      <p className="text-foreground/70 leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* VISUAL BREATHER / PARALLAX IMAGE */}
      <section ref={breatherRef} className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-deep-space border-y border-foreground/10">
        <motion.div 
          style={{ y: breatherY }}
          className="absolute inset-0 w-full h-[140%] -top-[20%]"
        >
          <Image 
            src="https://static.wixstatic.com/media/971139_237da312e3a642699724e00a8a13e638~mv2.png?originWidth=1600&originHeight=960"
            alt="High-tech server room abstract"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/50 to-transparent" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
              Engineered for the <br/>
              <span className="text-primary">Modern Digital Forge</span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-background overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.05)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 bg-primary/5 text-primary font-heading text-sm font-bold uppercase tracking-widest mb-8">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              System Ready
            </div>

            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-8">
              Ready to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-burnt-orange">Transform?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the digital revolution. Choose your plan and experience the power of next-generation SaaS architecture.
            </p>
            
            <Link to="/services" className="group relative inline-flex items-center justify-center px-12 py-6 font-heading font-black text-xl text-background bg-primary overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,107,0,0.4)]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative flex items-center gap-3 uppercase tracking-wider">
                View Subscription Plans
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}