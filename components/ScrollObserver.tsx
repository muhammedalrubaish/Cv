'use client'
import { useEffect } from 'react'

export default function ScrollObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          } else {
            // Only remove when element is below viewport (user scrolled up before seeing it)
            if (entry.boundingClientRect.top > window.innerHeight * 0.5) {
              entry.target.classList.remove('in-view')
            }
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    const elements = document.querySelectorAll('.section-animate, .animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
