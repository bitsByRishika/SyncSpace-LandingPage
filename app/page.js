"use client";

import React, { useEffect, useLayoutEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Home.module.css';
import Image from 'next/image';
// import Lenis from '@studio-freight/lenis';
import NextImage from 'next/image';
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger);

// ... (right after your `gsap.registerPlugin` line)

/**
 * --- Dummy Data ---
 */
const reviews = [
  { id: 1, name: 'Alex Johnson', title: 'CEO, PixelPerfect', review: "This service completely transformed our workflow. The efficiency gains are off the charts. Highly recommended!", imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, name: 'Sarah Chen', title: 'CTO, DataDrive', review: "Incredible attention to detail and outstanding support. The team went above and beyond our expectations.", imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, name: 'David Lee', title: 'Founder, EcoVate', review: "A game-changer for our sustainable sourcing. The platform is intuitive, and the impact is real.", imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, name: 'Emily R.', title: 'Marketing Head, Vibe', review: "The creative vision and execution were flawless. Our campaign was a massive success thanks to this team.", imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, name: 'Marcus Cole', title: 'Lead Developer, Innovate', review: "Technically brilliant. They solved complex problems that our previous three vendors couldn't.", imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 6, name: 'Julia Gomez', title: 'Product Manager, CloudNet', review: "From concept to launch in record time. The communication was clear and the process was seamless.", imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=400&h=400&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

/**
 * --- ReviewCard Component ---
 * This component now uses CSS Modules (styles.) instead of Tailwind
 */
const ReviewCard = ({ review, name, title, imageUrl }) => {
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    gsap.set(image, { yPercent: -100 });

    const onMouseEnter = () => {
      gsap.to(image, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(image, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', onMouseEnter);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className={styles.reviewCard}>
      <div className={styles.reviewCardImageContainer}>
        <p ref={textRef} className={styles.reviewCardText}>
          {review}
        </p>
        <Image
          ref={imageRef}
          src={imageUrl}
          alt={name}
          width={400}
          height={400}
          className={styles.reviewCardImage}
        />
      </div>
      <div className={styles.reviewCardFooter}>
        <h3 className={styles.reviewCardName}>{name}</h3>
        <p className={styles.reviewCardTitle}>{title}</p>
      </div>
    </div>
  );
};

export default function Home() {
  // All our refs
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const hamburgerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const shadowRef = useRef(null);
  const navRef = useRef(null);
  const heroContentRef = useRef(null);
  const cursorRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const challengeSectionRef = useRef(null);
  const robotSideRef = useRef(null);
  const humanSideRef = useRef(null);
  const solutionTextRef = useRef(null);
  const challengeTextRef = useRef(null);
  const reviewsSectionRef = useRef(null);
  const footerSectionRef = useRef(null);

  // Sidebar toggle function
  const toggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeSidebar = () => {
    setIsMenuOpen(false);
  };

  // Initialize sidebar position (closed)
  useEffect(() => {
    if (sidebarRef.current) {
      gsap.set(sidebarRef.current, { x: '100%' });
    }
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { opacity: 0, pointerEvents: 'none' });
    }
  }, []);

  // Sidebar animation effect
  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    if (isMenuOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Create a timeline for synchronized animations
      const tl = gsap.timeline();
      
      // Open sidebar
      tl.to(sidebarRef.current, {
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, 0);
      
      // Animate overlay
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'auto',
      }, 0);
      
      // Hide logInButton when sidebar opens
      const logInButton = navRef.current?.querySelector(`.${styles.logInButton}`);
      if (logInButton) {
        tl.to(logInButton, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power2.out',
        }, 0);
      }
      
      // Animate navbar: reduce opacity, scale down, add blur, and slight movement
      // But keep hamburger at full opacity
      if (navRef.current) {
        tl.to(navRef.current, {
          opacity: 0.3,
          scale: 0.85,
          filter: 'blur(4px)',
          y: -10,
          duration: 0.4,
          ease: 'power2.out',
        }, 0);
      }
      
      // Keep hamburger at full opacity and visible - counter the navbar opacity
      if (hamburgerRef.current) {
        const hamburger = hamburgerRef.current;
        const height = hamburger.offsetHeight;
        const centerOffset = height / 2 - hamburger.children[0].offsetHeight / 2;
        
        // Set hamburger to full opacity to override navbar opacity
        tl.set(hamburger, {
          opacity: 1,
        }, 0);
        
        // Animate hamburger to X
        tl.to(hamburger.children[0], {
          rotation: 45,
          y: centerOffset,
          duration: 0.3,
          ease: 'power2.out',
        }, 0.1);
        tl.to(hamburger.children[1], {
          opacity: 0,
          duration: 0.2,
        }, 0.1);
        tl.to(hamburger.children[2], {
          rotation: -45,
          y: -centerOffset,
          duration: 0.3,
          ease: 'power2.out',
        }, 0.1);
      }
    } else {
      // Unlock body scroll
      document.body.style.overflow = '';
      
      // Create a timeline for synchronized animations
      const tl = gsap.timeline();
      
      // Close sidebar
      tl.to(sidebarRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power2.in',
      }, 0);
      
      // Animate overlay
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'none',
      }, 0);
      
      // Restore logInButton when sidebar closes
      const logInButton = navRef.current?.querySelector(`.${styles.logInButton}`);
      if (logInButton) {
        tl.to(logInButton, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.3,
          ease: 'power2.out',
        }, 0.1);
      }
      
      // Restore navbar: bring back opacity, scale, remove blur, and restore position
      if (navRef.current) {
        tl.to(navRef.current, {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        }, 0);
      }
      
      // Animate hamburger back
      if (hamburgerRef.current) {
        tl.to(hamburgerRef.current.children[0], {
          rotation: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        }, 0.1);
        tl.to(hamburgerRef.current.children[1], {
          opacity: 1,
          duration: 0.2,
          delay: 0.1,
        }, 0.2);
        tl.to(hamburgerRef.current.children[2], {
          rotation: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        }, 0.1);
      }
    }

    // Cleanup: restore body scroll on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {

    let ctx = gsap.context(() => {
      const lenis = new Lenis();
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // lenis uses milliseconds
      });
      gsap.ticker.lagSmoothing(0);
      // --- Fluid Cursor Logic (No changes) ---
      const cursor = cursorRef.current;
      const heroSection = heroSectionRef.current;
      const heroContent = heroContentRef.current;
      const navItems = gsap.utils.toArray([`.${styles.logInButton}`, `.${styles.hamburger}`]);
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      // const reviewsSection = reviewsSectionRef.current;
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });
      const onMouseMove = (e) => { xTo(e.clientX); yTo(e.clientY); };
      const onHeroEnter = () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      const onHeroLeave = () => gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
      window.addEventListener("mousemove", onMouseMove);
      heroSection.addEventListener("mouseenter", onHeroEnter);
      heroSection.addEventListener("mouseleave", onHeroLeave);
      const onHoverGrow = () => gsap.to(cursor, { scale: 4, duration: 0.3 });
      const onHoverShrink = () => gsap.to(cursor, { scale: 1, duration: 0.3 });
      heroContent.addEventListener("mouseenter", onHoverGrow);
      heroContent.addEventListener("mouseleave", onHoverShrink);
      navItems.forEach(item => {
        item.addEventListener("mouseenter", onHoverGrow);
        item.addEventListener("mouseleave", onHoverShrink);
      });
      // --- End of Cursor Logic ---

      // --- Hero Scroll Timeline (No changes) ---
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top", end: "+=100%",
          scrub: true, pin: true, pinSpacing: false,
        }
      });
      // heroTimeline.to(heroSectionRef.current, { scale: 0.8, opacity: 0, ease: "power1.in" }, 0);
      heroTimeline.fromTo(shadowRef.current, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "power1.out" }, 0);
      heroTimeline.to(navRef.current, { scale: 0.8, ease: "power1.out" }, 0);
      heroTimeline.to(heroContentRef.current, { scale: 0, yPercent: -50, ease: "power1.in" }, 0);
      // --- End of Hero Timeline ---

      // --- "About Us" Text Reveal (No changes) ---
      gsap.fromTo(
        gsap.utils.toArray(`.${styles.aboutLine}`),
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0, opacity: 1, ease: "power1.out",
          duration: 1, stagger: 0.2,
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 60%",
          }
        }
      );
      // --- End of About Us Reveal ---

      // --- NEW: "WHAT'S IN" Title Reveal (Updated) ---
      gsap.fromTo(
        `.${styles.whatsInTitle}`,
        { 
          xPercent: -100,
          opacity: 0 
        },
        {
          xPercent: 0,
          opacity: 1,
          ease: "none", // Use "none" for a linear scrub
          scrollTrigger: {
            trigger: `.${styles.whatsInSection}`,
            
            // This is the "zone" for your animation:
            start: "top bottom", // Start when the section top hits the viewport bottom
            end: "top top",    // End when the section top hits viewport bottom

            scrub: 1 // Ties animation to scrollbar (1-second "lag" for smoothness)
            // You can also use scrub: true for an instant, 1-to-1 scrub
          }
        }
      );
      // --- End of "WHAT'S IN" Reveal ---

      // --- Horizontal Scroll Animations (UPDATED) ---
      const scrollTrack = scrollTrackRef.current;
      const horizontalSection = horizontalSectionRef.current;

      // --- 1. NEW: Entry Animation ---
      gsap.from(scrollTrack, {
        xPercent: 100,
        yPercent: -10,
        scale: 0.8,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: horizontalSection,
          start: "top 100%",
          end: "top -20%",
          scrub: -2
        }
      });

      // --- 2. EXISTING: Horizontal Scroll Animation (This is correct) ---
      gsap.to(scrollTrack, {
        x: () => -(scrollTrack.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSection,
          start: "top top",
          end: "+=1500", // <-- Pin for 3000px of scrolling
          pin: true,
          scrub: true,
          invalidateOnRefresh: true
        }
      });
      // --- End of Horizontal Scroll ---

      // --- 2. ADD NEW: Challenge/Solution Section Animations ---
      const challengeSection = challengeSectionRef.current;

      // Animation 1: The two images flying in (plays once)
      gsap.from(robotSideRef.current, {
        xPercent: -100, // from x -80
        yPercent: 40, // from y -40
        opacity: 0.5,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: challengeSection,
          start: "top 70%", // Starts when section is 30% in view
          end:"top -20%",
          toggleActions: "play none none none",
          scrub: true
        }
      });

      gsap.from(humanSideRef.current, {
        xPercent: 100,  // from x 80
        yPercent: 40, // from y -40
        opacity: 0.5,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: challengeSection,
          start: "top 70%",
          end: "top -20%",
          toggleActions: "play none none none",
          scrub: true
        }
      });

      // Animation 2: The text parallax (scrubbed)
      gsap.from(solutionTextRef.current, {
        xPercent: -60, // Animates from x -60
        ease: "none",
        scrollTrigger: {
          trigger: challengeSection,
          start: "top bottom", // Starts as soon as section enters
          end: "top 0%", // Ends when section leaves
          scrub: true
        }
      });

      gsap.from(challengeTextRef.current, {
        xPercent: 60, // Animates from x 60
        ease: "none",
        scrollTrigger: {
          trigger: challengeSection,
          start: "top bottom",
          end: "top 0%",
          scrub: true
        }
      });
      const reviewsSection = reviewsSectionRef.current;
      gsap.timeline({
        scrollTrigger: {
          trigger: challengeSectionRef.current, // <-- THIS IS THE PROBLEM
          start: "top top",
          endTrigger: reviewsSection, // The Reviews section unpins it
          end: "top top",           // Unpins when the top of Reviews hits the top of the screen
          pin: true,
          pinSpacing: false, // This is crucial for the overlap effect
          scrub: true,
        }
      });// --- End of Pin Challenge Section ---

    }); // --- End of GSAP Context ---

    return () => ctx.revert();

  }, []); // End of useEffect

  return (
    <main>

      <div ref={cursorRef} className={styles.customCursor}></div>

      <nav ref={navRef} className={styles.navbar}>
        <button className={styles.logInButton}>log in</button>
        <div 
          ref={hamburgerRef}
          className={styles.hamburger}
          onClick={toggleSidebar}
        >
          <div /><div /><div />
        </div >
      </nav>

      {/* Sidebar Overlay */}
      <div 
        ref={overlayRef}
        className={styles.sidebarOverlay}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <div ref={sidebarRef} className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <nav className={styles.sidebarNav}>
            <a href="#home" className={styles.sidebarMenuItem} onClick={closeSidebar}>
              Home
            </a>
            <a href="#dashboard" className={styles.sidebarMenuItem} onClick={closeSidebar}>
              Dashboard
            </a>
            <a href="#profile" className={styles.sidebarMenuItem} onClick={closeSidebar}>
              Profile
            </a>
            <a href="#settings" className={styles.sidebarMenuItem} onClick={closeSidebar}>
              Settings
            </a>
            <a href="#analytics" className={styles.sidebarMenuItem} onClick={closeSidebar}>
              Analytics
            </a>
            <a href="#projects" className={styles.sidebarMenuItem} onClick={closeSidebar}>
              Projects
            </a>
            <a href="#team" className={styles.sidebarMenuItem} onClick={closeSidebar}>
              Team
            </a>
          </nav>
          <button className={styles.sidebarDownloadButton} onClick={closeSidebar}>
            Download
          </button>
        </div>
      </div>

      {/* --- SECTION 1: HERO --- */}
      <section
        ref={heroSectionRef}
        className={`${styles.section} ${styles.heroSection}`}
      >
        <div ref={heroContentRef} className={styles.heroContent}>
          <h1>SyncSpace</h1>
        </div>
        <div ref={shadowRef} className={styles.scrollShadow} />
        <div className={styles.bottomFadeMask} />
      </section>

      {/* --- SECTION 2: ABOUT US --- */}
      <section
        ref={aboutSectionRef}
        className={`${styles.section} ${styles.aboutSection}`}
      >
        <div className={styles.aboutContent}>
          <p className={styles.aboutSubtitle}>About Us</p>
          <h2 className={styles.aboutTitle}>
            <div className={styles.lineWrapper}><span className={styles.aboutLine}>Stop switching,</span></div>
            <div className={styles.lineWrapper}><span className={styles.aboutLine}>start syncing.</span></div>
            <div className={styles.lineWrapper}><span className={styles.aboutLine}>SyncSpace is the unified hub for developers.</span></div>
            <div className={styles.lineWrapper}><span className={styles.aboutLine}>Code, meet, chat, and build</span></div>
            <div className={styles.lineWrapper}><span className={styles.aboutLine}>your next big project</span></div>
            <div className={styles.lineWrapper}><span className={styles.aboutLine}>all under one roof.</span></div>
          </h2>
        </div>
      </section>

      {/* NEW "WHAT'S IN" SECTION */}
      <section className={styles.whatsInSection}>
          <h2 className={styles.whatsInTitle}>WHAT&apos;S IN</h2>
      </section>

      {/* --- SECTION 3: HORIZONTAL SCROLL --- */}
      <section
        ref={horizontalSectionRef}
        className={styles.horizontalScrollSection}
      >
        {/* We animate this track */}
        <div ref={scrollTrackRef} className={styles.scrollTrack}>

          <div className={`${styles.scrollCard} ${styles.cardStagger1}`}>
            <NextImage src="/coding.png" alt="Collaborative Coding" width={500} height={300} className={styles.cardImage} />
            <h3>Collaborative Coding</h3>
            <p>Real-time shared editor.</p>
          </div>

          <div className={`${styles.scrollCard} ${styles.cardStagger2}`}>
            <NextImage src="/meeting.png" alt="Integrated Meetings" width={500} height={300} className={styles.cardImage} />
            <h3>Integrated Meetings</h3>
            <p>Video chat without leaving your file.</p>
          </div>

          <div className={`${styles.scrollCard} ${styles.cardStagger3}`}>
            <NextImage src="/tasks.png" alt="Project Management" width={500} height={300} className={styles.cardImage} />
            <h3>Project Management</h3>
            <p>Kanban boards and tasks.</p>
          </div>

          <div className={`${styles.scrollCard} ${styles.cardStagger4}`}>
            <NextImage src="/chat.png" alt="Team Chat" width={500} height={300} className={styles.cardImage} />
            <h3>Team Chat</h3>
            <p>Persistent channels and DMs.</p>
          </div>

        </div>
      </section>

      {/*SECTION 4. chllenge solution section---*/}
      <section
        ref={challengeSectionRef}
        className={`${styles.section} ${styles.challengeSection}`}
      >
        {/* Images (Positioned) */}
        <div ref={robotSideRef} className={styles.robotImageContainer}>
          <NextImage
            src="/robotSide.png"
            alt="Robot"
            width={500}
            height={700}
            className={styles.sideImage}
          />
        </div>
        <div ref={humanSideRef} className={styles.humanImageContainer}>
          <NextImage
            src="/humanSide.png"
            alt="Human"
            width={500}
            height={700}
            className={styles.sideImage}
          />
        </div>

        {/* Text (Centered) */}
        <div className={styles.challengeTextContainer}>
          <div ref={solutionTextRef} className={styles.solutionText}>
            <h2>The<br/>Sync</h2>
            <p>A unified space for code, chat, and deployment.</p>
          </div>
          <div ref={challengeTextRef} className={styles.challengeText}>
            <h2>The<br/>Chaos</h2>
            <p>Scattered tools, broken workflows, and constant context-switching.</p>
          </div>
        </div>
      </section>
      {/* --- SECTION 5: REVIEWS --- */}
      <section ref={reviewsSectionRef} className={styles.reviewsSection}>
        <div className={styles.reviewsContainer}>
          <h2 className={styles.reviewsTitle}>
            System Echoes
          </h2>
          <div className={styles.reviewsGrid}>
            {reviews.map((item) => (
              <ReviewCard
                key={item.id}
                review={item.review}
                name={item.name}
                title={item.title}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
      {/* --- END OF REVIEWS SECTION --- */}

      {/* --- 6. NEW: SECTION 5: FOOTER --- */}
      <section ref={footerSectionRef} className={`${styles.section} ${styles.footerSection}`}>
        
        {/* Top-Left Site Name */}
        <div className={styles.footerSiteName}>
          SyncSpace
        </div>

        {/* Background Text */}
        <h2 className={styles.footerBackgroundText}>
          SYNC. BUILD.<br/>REPEAT.
        </h2>

        {/* "Thank You" Text */}
        <h3 className={styles.footerThankYou}>
          Thank You
        </h3>

        {/* Robot Image */}
        <div className={styles.footerRobotImage}>
          <NextImage
            src="/robot.png" // Assumes you have 'robot.png' in your /public folder
            alt="SyncSpace Robot"
            width={800}
            height={800}
            className={styles.robotImageFooter}
          />
        </div>

        {/* Pages Links (like Lando site) */}
        <nav className={styles.footerPagesNav}>
          <h4>PAGES</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>

        {/* Social Links (like Lando site) */}
        <nav className={styles.footerSocialsNav}>
          <h4>FOLLOW ON</h4>
          <ul>
            <li><a href="#">GITHUB</a></li>
            <li><a href="#">LINKEDIN</a></li>
            <li><a href="#">X (TWITTER)</a></li>
            <li><a href="#">DISCORD</a></li>
          </ul>
        </nav>

        {/* Bottom Bar */}
        <div className={styles.footerBottomBar}>
          <span>© 2025 SyncSpace. All rights reserved</span>
          <span>Privacy Policy</span>
        </div>
        
      </section>
    </main>
  );
}