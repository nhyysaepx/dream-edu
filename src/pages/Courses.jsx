import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = [
    { key: 'All', label: 'All Paths' },
    { key: 'IELTS Prep', label: 'IELTS Prep' },
    { key: 'Academic English', label: 'Academic English' },
    { key: 'Specialized', label: 'Specialized' },
  ];

  const courses = [
    {
      id: 'ielts-foundation',
      title: 'IELTS Foundation',
      category: 'IELTS Prep',
      tag: 'Beginner',
      icon: 'auto_stories',
      description: 'Build a robust linguistic base across all four skills for students starting their IELTS journey.',
      stats: [
        { label: '12 Weeks / 60 Hours', icon: 'schedule' },
        { label: 'Core Grammar & Vocabulary', icon: 'task_alt' }
      ],
      isElite: false
    },
    {
      id: 'ielts-intensive',
      title: 'IELTS Intensive',
      category: 'IELTS Prep',
      tag: 'Accelerated',
      icon: 'speed',
      description: 'A fast-track program focusing purely on exam strategies and high-frequency question patterns.',
      stats: [
        { label: '4 Weeks / Daily Sessions', icon: 'schedule' },
        { label: 'Strategic Exam Techniques', icon: 'trending_up' }
      ],
      isElite: false
    },
    {
      id: 'ielts-6-5',
      title: 'IELTS 6.5+',
      category: 'IELTS Prep',
      tag: 'Intermediate',
      icon: 'star',
      description: 'Designed for university admission requirements, focusing on academic writing and complex listening.',
      stats: [
        { label: '8 Weeks / Weekend Options', icon: 'schedule' },
        { label: 'Academic Writing Mastery', icon: 'edit_note' }
      ],
      isElite: false
    },
    {
      id: 'ielts-7-0',
      title: 'IELTS 7.0+',
      category: 'IELTS Prep',
      tag: 'Elite Selection',
      icon: 'military_tech',
      description: 'Precision training for high-level candidates aiming for postgraduate study or specialized immigration.',
      stats: [
        { label: 'Expert-Led Feedback Loops', icon: 'verified' },
        { label: 'Advanced Speaking Workshops', icon: 'forum' }
      ],
      isElite: true
    },
    {
      id: 'academic-english',
      title: 'Academic English',
      category: 'Academic English',
      tag: 'University Prep',
      icon: 'school',
      description: 'Master the art of research, referencing, and formal academic discourse for international studies.',
      stats: [
        { label: 'Research & Citation Skills', icon: 'history_edu' },
        { label: 'Critical Thinking Seminars', icon: 'psychology' }
      ],
      isElite: false
    },
    {
      id: 'public-speaking',
      title: 'Public Speaking',
      category: 'Specialized',
      tag: 'Communication',
      icon: 'record_voice_over',
      description: 'Gain the confidence to present your ideas with authority and clarity in any professional setting.',
      stats: [
        { label: 'Body Language & Projection', icon: 'mic' },
        { label: 'Live Performance Coaching', icon: 'groups' }
      ],
      isElite: false
    }
  ];

  const filteredCourses = activeFilter === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeFilter);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-12 md:py-16 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="space-y-stack-sm">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label-md text-label-md uppercase tracking-wider font-semibold">
              Academic Excellence
            </span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary leading-tight font-bold">
              Elevate Your Potential with <span className="text-secondary">Expert Instruction</span>.
            </h1>
            <p className="text-on-surface-variant font-body-lg text-body-lg max-w-lg">
              Structured curriculum designed for high achievers. From foundational IELTS to advanced Academic English, we bridge the gap between aspiration and global success.
            </p>
          </div>
          <div className="relative hidden lg:block h-[400px] rounded-xl overflow-hidden shadow-xl">
            <img
              alt="Education Success"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNAnodpyFDI7O8GlSbCL-OfEvYPPJlXD8mCqSHNULThjnZGh5SB1h26nqzMHvuGMEVsB0IGW6g_stnWYKgNWTv43mrtr4ET19jC9VBK7WTvTXputnNU9JkD6hq34FdCGl81oKED8fhBtN3RaIdryRRpnjprm3-AHeleOSQUayHJu87D4lDQb1qMAre7CuQmheSwp-EnBgcR0N8huvMoDSly89GKp7Cvk4Lwt-c8EO6mLm8Tp1xQCUAm-O_E031EIK4ReCwPK3bIDw"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>
        </div>
      </section>

      {/* Course Filters & Bento Grid */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop pb-stack-lg text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter mb-stack-md">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold mb-2">Our Curated Courses</h2>
            <p className="text-on-surface-variant">Select the path that matches your current proficiency and goal.</p>
          </div>
          
          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer font-semibold ${
                  activeFilter === cat.key
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`p-6 rounded-xl border card-shadow flex flex-col justify-between transition-all duration-300 ${
                course.isElite
                  ? 'bg-primary-container text-on-primary border-primary/20 hover:scale-[1.02]'
                  : 'bg-surface-container-lowest border-outline-variant/30 hover:scale-[1.02] hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-3 py-1 rounded-full font-label-md text-label-md font-bold ${
                      course.isElite
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-secondary-container text-on-secondary-container'
                    }`}
                  >
                    {course.tag}
                  </span>
                  <span
                    className={`material-symbols-outlined ${
                      course.isElite ? 'text-secondary-fixed text-3xl' : 'text-secondary text-3xl'
                    }`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {course.icon}
                  </span>
                </div>
                <h3 className={`font-headline-sm text-headline-sm font-bold mb-4 ${
                  course.isElite ? 'text-on-primary' : 'text-primary'
                }`}>
                  {course.title}
                </h3>
                <p className={`text-body-sm font-body-sm mb-6 leading-relaxed ${
                  course.isElite ? 'text-primary-fixed-dim' : 'text-on-surface-variant'
                }`}>
                  {course.description}
                </p>
                <div className="space-y-4 mb-8">
                  {course.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-[20px] ${
                        course.isElite ? 'text-secondary-fixed' : 'text-primary'
                      }`}>
                        {stat.icon}
                      </span>
                      <span className="text-label-lg font-label-lg font-semibold">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Link
                to="/contact"
                className={`w-full py-3 rounded-lg font-label-lg text-label-lg text-center font-bold transition-all ${
                  course.isElite
                    ? 'bg-secondary-container text-on-secondary-container hover:bg-white hover:text-primary'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
              >
                Enroll Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop pb-stack-lg text-left">
        <div className="bg-primary p-8 md:p-12 rounded-2xl relative overflow-hidden text-center lg:text-left lg:flex lg:items-center lg:justify-between gap-gutter text-on-primary">
          <div className="relative z-10">
            <h2 className="font-headline-lg text-headline-lg text-on-primary font-bold mb-4">Not sure which path is yours?</h2>
            <p className="text-primary-fixed-dim font-body-lg text-body-lg max-w-xl">
              Our expert consultants provide a comprehensive diagnostic placement test to find your exact proficiency level.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 relative z-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/contact"
              className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-label-lg text-label-lg font-bold hover:scale-105 transition-all text-center"
            >
              Book Placement Test
            </Link>
            <Link
              to="/contact"
              className="border-2 border-primary-fixed-dim text-on-primary px-8 py-4 rounded-full font-label-lg text-label-lg hover:bg-white/10 transition-all font-bold text-center"
            >
              Talk to an Advisor
            </Link>
          </div>
          <div className="absolute right-0 top-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </section>

      {/* Floating Action Button for Contact (Zalo/Messenger mockup) */}
      <div className="fixed bottom-8 right-8 z-40 hidden md:block">
        <Link
          to="/contact"
          className="bg-secondary-container text-on-secondary-container p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group border border-secondary/10"
        >
          <span className="material-symbols-outlined text-2xl">support_agent</span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-label-lg text-label-lg pr-2 font-bold">
            Chat with an Advisor
          </span>
        </Link>
      </div>
    </div>
  );
}
