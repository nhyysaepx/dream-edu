import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Teachers() {
  const [activeSpecialist, setActiveSpecialist] = useState('All');

  const categories = [
    { key: 'All', label: 'All Specialists' },
    { key: 'IELTS Academic', label: 'IELTS Academic' },
    { key: 'Business English', label: 'Business English' },
    { key: 'General English', label: 'General English' },
  ];

  const teachers = [
    {
      id: 'sarah-jenkins',
      name: 'Dr. Sarah Jenkins',
      role: 'Head of IELTS',
      badge: 'IELTS 9.0 Expert',
      qualification: 'PhD Applied Linguistics',
      experience: '15+ Years',
      specialization: 'Writing Task 2',
      specialtyGroup: 'IELTS Academic',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhPoP-waErZkP6WwY4dt8GOQsxAJWuDLibJmPc4b2s_osP6ZV7j8wvC13eLW3NG9pEiN_Uhdcu0FXfDmkupG3lcHTEbiMqzW5iyUi4dwaB33lbEmLLUV9pO34ZVNlepfeiYb8tsgPbSSdtosZULqbfwBU1nBeow8C8z9Q-aPlPMs_GSB6ay2OO9u3RSihzGoPb_50NH04P3gQxy2DfcDKFVPfSNEIwnxxVIO1XyPNdsm4thWASn93aGs0SBlWUmZjh06tGU-wv_QI'
    },
    {
      id: 'james-miller',
      name: 'James Miller',
      role: 'Senior Instructor',
      badge: 'IELTS 8.5 Master',
      qualification: 'MA TESOL (Oxon)',
      experience: '12 Years',
      specialization: 'Speaking Fluency',
      specialtyGroup: 'IELTS Academic',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXAxqnZGEc_Jx9UDT0nvU6CSPmqzrblMl5agob0if-WCMDoAzpNdZaaJxOA5ey36vbdwU4R_h2BI328cyUXNyiAlW1cxM0769UJE5CryJjWt4wi87gZZVNOWZf9QgtMvfnW2LvlFbWKzMnDa_fVmN_QIdanXkD907xavD4XvC5FcnRCj5CnLDut3Ww-FSyObvgkOnOTiBola-9ETXhB_GqO2U_QxhHbfmHMuhjeLnCwFZ7_UWg5eeYOWUdNxBii78ZFk1yewNapII'
    },
    {
      id: 'elena-rodriguez',
      name: 'Elena Rodriguez',
      role: 'Language Strategist',
      badge: 'IELTS 8.5 Expert',
      qualification: 'CELTA & DELTA Certified',
      experience: '8 Years',
      specialization: 'Grammar for Writing',
      specialtyGroup: 'General English',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWuZ7KUAww7hFpUINVtc6KGY6meXowDvpog2ybNQaIgNm8NKrqnBz-6tfcJFct5JIxHjKqh24GVv8aSZOaGaJQaN2sB4pqgOrY89rxlXbnZE5w5NefzjUK5pEXX4QslmJ15yVHLZr5mY6MrT2c04mSVQkRTKj3GsH7tQ8mNbVmRU7Xw6_waTrp8FJlMXkyVZbOcfgwaB74iR_h5NGdvOCCLK0fXH96q8Ci0mfkw3PeUQxb5IIJWn7aubAwmNQ3BFAKaHLtDK42QCs'
    },
    {
      id: 'arthur-vance',
      name: 'Dr. Arthur Vance',
      role: 'Curriculum Designer',
      badge: 'IELTS 9.0 Veteran',
      qualification: 'PhD Education Policy',
      experience: '20+ Years',
      specialization: 'Exam Psychology',
      specialtyGroup: 'IELTS Academic',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPFZkYOJ2RisaGo31jI0GihaV1HlDQBNYlOZW7rTCrKfnKma4XF7TgbtuxwgAMTsDOSoIR9xuYYC2fHkuTmtxKfDA7na9vKRXwUgX9qrDGzADA-QyPwBzj4CyDytfSo26hNjkzJ9kaBL8bTGn7tCgM3sYc190C7XmxnlLNp2rk2U3VYP7anYYbWYGNvVq6cnqfDNt396mgt0iHDmkm0WsIFRv1whuANVy0Mv8MjHZ2it7vS_j-qaQ66XhGf6M-_yTuA7HVeHn0itI'
    },
    {
      id: 'sophia-chen',
      name: 'Sophia Chen',
      role: 'IELTS Coordinator',
      badge: 'IELTS 8.5 Specialist',
      qualification: 'MA English Literature',
      experience: '10 Years',
      specialization: 'Reading Strategies',
      specialtyGroup: 'General English',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHOPzGl5OG0--ro42__aXlAFjuvlFd0gK1UyTsZq4oKmeqwP9TMwgC3OEamWD8wHlPgpC2uZoWF0xydPBmP698aS8UuA9VWQIOG1bIGly8qlAKdrRzS4m1uleYufD6ax4U6uVBmkpy4sb4IPGzCJDIngPCmtwFptun-5appaa5e-9QknCYU7T6ukVFGm8dhOJJDH96mnAsWftIyOT3i40u-7zSbwc_eg2R0DYFX32rpsZNizIne0J-nCl2sHaEGcDof4n-c2291Hw'
    },
    {
      id: 'marcus-thorne',
      name: 'Marcus Thorne',
      role: 'Vocabulary Specialist',
      badge: 'IELTS 8.5 Coach',
      qualification: 'MA Applied Linguistics',
      experience: '7 Years',
      specialization: 'Academic Lexis',
      specialtyGroup: 'Business English',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEJ4RL91LrEBlk9ayqf3hJLOpbkTG-4YwN7UVQZMvjZf4j7jgeOYsOZ80N0yHBjIcHpObwp-E1z9E4qv03eEFR3ENpb5Oi2Yp6GZjaMzgkbGFyM6tLEvcXmROZDE8nYPgsNXFZ8m5DQdu7PgBngsh1J646qgAAIoEaIZK4Sc3BwvV0ZDSfPIOh7TOxL0jIiKWnQkBB5eIsfHd9kCvoT8DihNY0s93kXLGc9RHWsfiSVBX-F9VsVQb1UATWy_CXUC0lEC7uv2TGHx0'
    }
  ];

  const filteredTeachers = activeSpecialist === 'All' 
    ? teachers 
    : teachers.filter(t => t.specialtyGroup === activeSpecialist);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 text-left">
        <div className="flex flex-col md:flex-row items-center gap-gutter bg-surface-container-low rounded-3xl p-8 md:p-12">
          <div className="flex-1">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label-md text-label-md mb-4 font-semibold">
              WORLD-CLASS FACULTY
            </span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-6">
              Learn from the Architects of Academic Success
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Our educators aren't just teachers; they are industry veterans and linguistic experts with a proven track record of helping thousands reach top-tier international universities.
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-md">
            <img
              alt="Academic Excellence"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByGSOI89FWgW3bNGOEebZlrq0TFmmKor9yXiWZMsoo8HmYeRnkHvYtK6oXTsbVV2nszaahX12M0qnuoDRcWeTrKgP5CS-rWa3-vz03l0fgGbS6-FLySRd402Elg5DqqM0F5w2nGDA_2vmVFf0dNtGAfSqjajQpFONT3_l4UpT3M4EUP-fKvLq-7pdX-vPDIRogpG16vo0pcE9beMW1Cze8jf8FbWOVPKH9iYQHKPTvIVBj6LO1fhYbtvJoIqXn019MOMeR3Ltf0z4"
            />
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-md text-left">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
          <h2 className="font-headline-md text-headline-md text-primary font-bold">Our Elite Educators</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveSpecialist(cat.key)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-label-md text-label-md transition-colors cursor-pointer font-semibold ${
                  activeSpecialist === cat.key
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-outline-variant'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-surface-container-lowest rounded-xl p-6 teacher-card-shadow transition-all duration-300 hover:-translate-y-1 border border-outline-variant/20 flex flex-col h-full group"
            >
              <div className="flex items-start gap-gutter mb-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    alt={teacher.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={teacher.image}
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold">{teacher.name}</h3>
                  <p className="font-label-md text-label-md text-secondary-container bg-primary px-2 py-0.5 rounded inline-block mt-1 font-semibold">
                    {teacher.role}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-secondary">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      stars
                    </span>
                    <span className="font-label-lg text-label-lg font-bold">{teacher.badge}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Qualification</span>
                  <span className="font-label-lg text-label-lg font-bold text-primary">{teacher.qualification}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Experience</span>
                  <span className="font-label-lg text-label-lg font-bold text-primary">{teacher.experience}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Specialization</span>
                  <span className="font-label-lg text-label-lg font-bold text-primary">{teacher.specialization}</span>
                </div>
              </div>
              
              <Link
                to="/contact"
                className="w-full py-3 border-2 border-primary text-primary rounded-lg font-label-lg text-label-lg hover:bg-primary hover:text-on-primary transition-all text-center font-bold"
              >
                View Detailed Portfolio
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg text-left">
        <div className="bg-primary-container rounded-3xl p-8 md:p-12 text-center text-on-primary">
          <h2 className="font-headline-lg text-headline-lg text-on-primary mb-6 font-bold">
            Our Rigorous Selection Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-left mt-8">
            <div className="bg-surface/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <span className="material-symbols-outlined text-secondary-container text-[48px] mb-4">verified</span>
              <h4 className="font-headline-sm text-on-primary mb-2 font-bold">99th Percentile</h4>
              <p className="font-body-sm text-on-primary/80 leading-relaxed">
                Every teacher must possess an official IELTS score of 8.5 or higher before joining our elite team.
              </p>
            </div>
            <div className="bg-surface/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <span className="material-symbols-outlined text-secondary-container text-[48px] mb-4">school</span>
              <h4 className="font-headline-sm text-on-primary mb-2 font-bold">Academic Pedigree</h4>
              <p className="font-body-sm text-on-primary/80 leading-relaxed">
                90% of our staff hold Masters degrees or higher in TESOL, Linguistics, or Education from top global universities.
              </p>
            </div>
            <div className="bg-surface/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <span className="material-symbols-outlined text-secondary-container text-[48px] mb-4">clinical_notes</span>
              <h4 className="font-headline-sm text-on-primary mb-2 font-bold">Continuous Training</h4>
              <p className="font-body-sm text-on-primary/80 leading-relaxed">
                Teachers undergo 50+ hours of annual professional development to stay updated with exam changes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
