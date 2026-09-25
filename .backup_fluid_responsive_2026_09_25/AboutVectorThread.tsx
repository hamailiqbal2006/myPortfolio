'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import styles from './AboutLanding.module.css';

function createSpline(points: { x: number; y: number }[]): string {
  if (points.length < 2) return '';
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export function AboutVectorThread() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pointerRef = useRef<SVGGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const svg = svgRef.current;
    const path = pathRef.current;
    const pointer = pointerRef.current;
    const root = document.querySelector<HTMLElement>('[data-about-depth]');
    if (!svg || !path || !root) return;

    let totalLength = 0;
    let triggerInstance: ScrollTrigger | null = null;
    let raf = 0;

    const applyProgress = (progress: number) => {
      if (!path || totalLength === 0) return;

      const isMobile = window.innerWidth <= 700;
      const isTablet = window.innerWidth > 700 && window.innerWidth <= 1024;
      const currentLength = totalLength * progress;

      path.style.strokeDashoffset = `${totalLength - currentLength}`;

      if (pointer) {
        if (currentLength <= 2) {
          pointer.style.opacity = '0';
        } else {
          pointer.style.opacity = '1';
          const delta = 3.0;
          const pAhead = path.getPointAtLength(Math.min(totalLength, currentLength + delta));
          const pBehind = path.getPointAtLength(Math.max(0, currentLength - delta));
          const angle = Math.atan2(pAhead.y - pBehind.y, pAhead.x - pBehind.x) * (180 / Math.PI);
          const scale = isMobile ? 0.70 : isTablet ? 0.85 : 1.0;
          const p = path.getPointAtLength(currentLength);
          pointer.setAttribute(
            'transform',
            `translate(${p.x.toFixed(2)}, ${p.y.toFixed(2)}) rotate(${angle.toFixed(2)}) scale(${scale})`
          );
        }
      }
    };

    const rebuildGeometry = () => {
      const rootRect = root.getBoundingClientRect();
      const width = root.clientWidth;
      const height = root.scrollHeight;
      const isMobile = window.innerWidth <= 700;
      const isTablet = window.innerWidth > 700 && window.innerWidth <= 1024;

      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svg.setAttribute('width', `${width}`);
      svg.setAttribute('height', `${height}`);
      svg.style.height = `${height}px`;

      const relativeTop = (id: string, fallbackRatio: number) => {
        const el = document.getElementById(id);
        if (!el) return height * fallbackRatio;
        return el.getBoundingClientRect().top - rootRect.top;
      };

      const heroTop = relativeTop('about-hero', 0.0);
      const whoTop = relativeTop('who-i-am', 0.14);
      const learningTop = relativeTop('always-learning', 0.28);
      const howTop = relativeTop('how-i-work', 0.42);
      const websiteTop = relativeTop('website-experience', 0.57);
      const shopifyTop = relativeTop('shopify', 0.71);
      const buildForTop = relativeTop('who-i-build-for', 0.85);
      const contactTop = relativeTop('contact', 0.95);

      const footerNav = document.getElementById('about-footer-nav');
      // Final arrow tip gap: 1px-4px before visual leading edge of navigation group without overlapping HOME
      const arrowGap = isMobile ? 2.5 : isTablet ? 3.0 : 3.0;

      let navTargetX: number;
      let navTargetY: number;

      if (footerNav) {
        // Measure footerNav in its true unscaled, untransformed focal layout coordinates.
        // Contact scene content has 3D scale and perspective translation applied at scroll 0,
        // so temporarily setting transform: 'none' measures the exact focal layout coordinates
        // that match the rendered position when scrolled to the bottom.
        const contactSection = document.getElementById('contact');
        const contactContent = contactSection?.querySelector<HTMLElement>('[data-depth-content]');
        const savedTransform = contactContent ? contactContent.style.transform : '';
        if (contactContent) {
          contactContent.style.transform = 'none';
        }

        const navRect = footerNav.getBoundingClientRect();
        navTargetX = navRect.left - rootRect.left - arrowGap;
        navTargetY = navRect.top - rootRect.top + navRect.height / 2;

        if (contactContent) {
          contactContent.style.transform = savedTransform;
        }
      } else {
        navTargetX = width * (isMobile ? 0.45 : isTablet ? 0.65 : 0.72);
        navTargetY = height - 65;
      }

      let points: { x: number; y: number }[] = [];

      if (isMobile) {
        // Mobile: mostly vertical route along outer right margin avoiding headlines & CTA,
        // then smoothly curving inward toward footer navigation with horizontal approach
        const marginX = width * 0.93;
        points = [
          { x: marginX, y: heroTop + 120 },
          { x: marginX, y: whoTop + 50 },
          { x: marginX, y: learningTop + 50 },
          { x: marginX, y: howTop + 50 },
          { x: marginX, y: websiteTop + 50 },
          { x: marginX, y: shopifyTop + 50 },
          { x: marginX, y: buildForTop + 50 },
          { x: marginX, y: contactTop + 90 },
          { x: marginX, y: contactTop + (navTargetY - contactTop) * 0.55 },
          { x: Math.max(navTargetX - 80, width * 0.35), y: navTargetY - 18 },
          { x: Math.max(navTargetX - 45, width * 0.40), y: navTargetY - 5 },
          { x: navTargetX - 22, y: navTargetY },
          { x: navTargetX - 10, y: navTargetY },
          { x: navTargetX, y: navTargetY },
        ];
      } else if (isTablet) {
        // Tablet: outer right margin route, curving into footer navigation with horizontal approach
        const marginX = width * 0.91;
        points = [
          { x: marginX, y: heroTop + 140 },
          { x: width * 0.92, y: whoTop + 80 },
          { x: width * 0.89, y: learningTop + 80 },
          { x: width * 0.92, y: howTop + 80 },
          { x: width * 0.89, y: websiteTop + 80 },
          { x: width * 0.92, y: shopifyTop + 80 },
          { x: width * 0.91, y: buildForTop + 80 },
          { x: width * 0.85, y: contactTop + 120 },
          { x: width * 0.87, y: contactTop + (navTargetY - contactTop) * 0.55 },
          { x: Math.max(navTargetX - 120, width * 0.45), y: navTargetY - 24 },
          { x: Math.max(navTargetX - 60, width * 0.50), y: navTargetY - 6 },
          { x: navTargetX - 30, y: navTargetY },
          { x: navTargetX - 12, y: navTargetY },
          { x: navTargetX, y: navTargetY },
        ];
      } else {
        // Desktop: architectural pathway traveling through right-side negative space
        // through every scene and leveling out horizontally toward footer navigation group
        points = [
          { x: width * 0.88, y: heroTop + 160 },
          { x: width * 0.91, y: heroTop + (whoTop - heroTop) * 0.65 },
          { x: width * 0.88, y: whoTop + 240 },
          { x: width * 0.92, y: whoTop + (learningTop - whoTop) * 0.75 },
          { x: width * 0.89, y: learningTop + 200 },
          { x: width * 0.93, y: learningTop + (howTop - learningTop) * 0.75 },
          { x: width * 0.88, y: howTop + 220 },
          { x: width * 0.92, y: howTop + (websiteTop - howTop) * 0.75 },
          { x: width * 0.87, y: websiteTop + 240 },
          { x: width * 0.92, y: websiteTop + (shopifyTop - websiteTop) * 0.75 },
          { x: width * 0.88, y: shopifyTop + 240 },
          { x: width * 0.92, y: shopifyTop + (buildForTop - shopifyTop) * 0.75 },
          { x: width * 0.89, y: buildForTop + 220 },
          { x: width * 0.92, y: buildForTop + (contactTop - buildForTop) * 0.75 },
          { x: width * 0.85, y: contactTop + 140 },
          { x: width * 0.87, y: contactTop + (navTargetY - contactTop) * 0.55 },
          { x: Math.max(navTargetX - 140, width * 0.55), y: navTargetY - 28 },
          { x: Math.max(navTargetX - 70, width * 0.60), y: navTargetY - 8 },
          { x: navTargetX - 35, y: navTargetY },
          { x: navTargetX - 14, y: navTargetY },
          { x: navTargetX, y: navTargetY },
        ];
      }

      const pathData = createSpline(points);
      path.setAttribute('d', pathData);

      totalLength = path.getTotalLength();
      path.style.strokeDasharray = `${totalLength}`;

      applyProgress(triggerInstance?.progress ?? 0);
    };

    const scheduleGeometryUpdate = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        rebuildGeometry();
      });
    };

    // Initial measurement
    rebuildGeometry();

    // Create ONE single ScrollTrigger instance for the entire lifecycle
    triggerInstance = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate(self) {
        applyProgress(self.progress);
      },
      onRefreshInit() {
        rebuildGeometry();
      },
      onRefresh(self) {
        applyProgress(self.progress);
      },
    });

    // Handle layout shifts, font loads, and resizes without recreating ScrollTrigger
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        scheduleGeometryUpdate();
      });
      resizeObserver.observe(root);
    }

    window.addEventListener('resize', scheduleGeometryUpdate);

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        scheduleGeometryUpdate();
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      triggerInstance?.kill();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', scheduleGeometryUpdate);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={styles.vectorThreadSvg}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. Primary architectural vector spline - 1.6px stroke width, 0.53 opacity neutral tone */}
      <path
        ref={pathRef}
        className={styles.vectorThreadPath}
        stroke="rgba(155, 153, 148, 0.53)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. Directional pointer situated exactly at live tip of line (7px arrow, 0.88 opacity neutral tone) */}
      <g
        ref={pointerRef}
        className={styles.vectorPointer}
        aria-hidden="true"
        style={{ opacity: 0, willChange: 'transform' }}
      >
        <polygon
          points="-7,-3.5 0,0 -7,3.5"
          fill="rgba(165, 163, 158, 0.88)"
        />
      </g>
    </svg>
  );
}
