import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center overflow-hidden bg-primary-container text-left">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUuQt2q5nn4flcHGBCxE_8_gOh73XJgDxvqkhjWJ4oaq5_RE1cT82S0ii7N1Gs7aIacUYJAlukpRdGwDIwH6pbFkNN8oxok-tL_NfJ67lImcOx0KwYmWxHEWE1e-K9On_af04-AdYwK3HhttFjdkFP4AJ4_sIdjtN4jcjr4owq-fV_DQp7QyZh7-XcFsgspHGuB7uaiY3WyzaPDyCwi4oW3RNgEsy-EjqE8lLHN_jTt5kXo1szHAQ0O_o6h2nnLrBj8qHtZNoXTZs"
            alt="University Library Background"
          />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full text-on-primary">
          <div className="max-w-2xl">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-md text-label-md mb-4 uppercase tracking-widest font-semibold">
              Since 2008
            </span>
            <h1 className="font-display-lg text-display-lg text-on-primary mb-6">
              Bridging Dreams to International Realities.
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed">
              We provide world-class linguistic preparation for the next generation of global leaders, scholars, and professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Bento Grid */}
      <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="md:col-span-2 bg-surface-container-lowest p-8 md:p-10 rounded-xl tonal-card border border-outline-variant/30 relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '40px' }}>
                visibility
              </span>
              <h2 className="font-headline-md text-headline-md text-primary mb-4">Our Vision</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                To become the world’s most trusted bridge for international education, empowering students to cross linguistic borders and unlock their fullest potential in any academic or professional environment.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: '240px' }}>
                language
              </span>
            </div>
          </div>
          
          <div className="bg-primary p-8 md:p-10 rounded-xl tonal-card text-on-primary flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-secondary-container mb-4" style={{ fontSize: '40px' }}>
                flag
              </span>
              <h2 className="font-headline-sm text-headline-sm mb-4">Our Mission</h2>
              <p className="font-body-md text-body-md opacity-90 leading-relaxed">
                Delivering excellence through rigorous IELTS preparation, expert-led English immersion, and comprehensive academic placement services.
              </p>
            </div>
            <Link
              to="/courses"
              className="mt-8 flex items-center gap-2 font-label-lg text-label-lg text-secondary-container hover:underline w-fit"
            >
              View our courses <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter mt-gutter">
          <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/50">
            <span className="material-symbols-outlined text-primary mb-2 text-3xl">school</span>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Integrity</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Unwavering commitment to academic honesty and ethical guidance.
            </p>
          </div>
          <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/50">
            <span className="material-symbols-outlined text-primary mb-2 text-3xl">star</span>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Excellence</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Striving for the highest standards in teaching and student support.
            </p>
          </div>
          <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/50">
            <span className="material-symbols-outlined text-primary mb-2 text-3xl">groups</span>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Diversity</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Celebrating cultural exchange as the heart of modern learning.
            </p>
          </div>
          <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/50">
            <span className="material-symbols-outlined text-primary mb-2 text-3xl">psychology</span>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Innovation</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Utilizing cutting-edge pedagogy to accelerate language acquisition.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-stack-lg bg-surface-container-lowest text-left">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Our Growth Story</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              From a small tutoring center to a leading international education consultancy.
            </p>
          </div>
          
          <div className="relative timeline-line space-y-16">
            {/* 2008 */}
            <div className="flex flex-col md:flex-row items-center gap-gutter relative">
              <div className="md:w-1/2 md:text-right">
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold">The Inception</h4>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Dream Education opened its doors with a single classroom and a vision for quality IELTS prep.
                </p>
              </div>
              <div className="z-10 w-12 h-12 rounded-full bg-secondary-container border-4 border-white shadow-md flex items-center justify-center font-bold text-on-secondary-container shrink-0">
                2008
              </div>
              <div className="md:w-1/2 w-full">
                <img
                  className="rounded-lg shadow-sm w-full h-48 object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5lRzX3OiraHAtHuNoVfj33OHDLIxV1XkBrtLWPERPZ31GqjqyibkUErMdYsz-pB-C3OX1CjmB-b4HdYIn3OiTbz7z7bbFUzI1BDTXzOIC-dFm_75ciizJiG-tu2k4nvQO0maQho3nwUIgydBGHNPNMM7Qr9WwnA2og9F8MEVTm9Gc6-1T-Y5kuMf7gc0rBDwIjqyi3teYtbbpNL2z4BqTipOkYM-J4MVMlpMeHlLhHqwnnLXmGAfypseYtTHAF8O2rVZVWP5mU6E"
                  alt="Humble classroom beginnings"
                />
              </div>
            </div>

            {/* 2014 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-gutter relative">
              <div className="md:w-1/2 text-left">
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Global Partnership</h4>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Secured official partnerships with top UK and Australian universities for direct placements.
                </p>
              </div>
              <div className="z-10 w-12 h-12 rounded-full bg-primary border-4 border-white shadow-md flex items-center justify-center font-bold text-on-primary shrink-0">
                2014
              </div>
              <div className="md:w-1/2 w-full">
                <img
                  className="rounded-lg shadow-sm w-full h-48 object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL2MvouZNwLimg_KQvNZP2LBATH2wkoMTXsEbAM23ForoudVOXaNeu1gipjbMjy3cCu7fhGeGmr2rdwgv9wQ6gtRBve477HtEAkbkywUySAo0VZD6CuXYypBZe0VAGDazjCKPGIIeEJwT3wWTo0ac3Bad_MR6n91G7LsUJ4iSXH3xTvlTVHAkT2diI3-z28lTAM17DLHxhkeqotB-dAtfJCc8QA96YFhge8jEfhTOliC6pYym-nnRCX862feznjLTRb0zQj1Y_77E"
                  alt="Business partnership handshake"
                />
              </div>
            </div>

            {/* 2024 */}
            <div className="flex flex-col md:flex-row items-center gap-gutter relative">
              <div className="md:w-1/2 md:text-right">
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold">The Modern Era</h4>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Launching our fully integrated digital learning platform, serving students across 15 countries.
                </p>
              </div>
              <div className="z-10 w-12 h-12 rounded-full bg-secondary-container border-4 border-white shadow-md flex items-center justify-center font-bold text-on-secondary-container shrink-0">
                2024
              </div>
              <div className="md:w-1/2 w-full">
                <img
                  className="rounded-lg shadow-sm w-full h-48 object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj4Kl34SxD6OjbHayVzdt58ygr4Ccyo6l5MHaAVUG8wqy6VQJvPP-_nIia7kDWxRB74p53qLJnfrMrlPM63_hCazW1pSpF4MjOlUVlh_CxBVDCrlj2VSH_1Rn0-csB9a2c8tri3yPF46ZfI9TQTBEEBIhw0TgEN1iwUboSU8NT8oR3DnBHVCeOu-gwqRl0diwf5gYJRguEede7zMKHvWUn8nrEGtfw7WS5CyJxnWHDKG4JC1-oPsX3edcIJ8wIwCkkgXKfuGzIn-w"
                  alt="Digital learning setup"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-left">
        <div className="flex flex-col md:flex-row gap-stack-lg items-center">
          <div className="md:w-1/2 space-y-6">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-8 leading-tight">
              Why the World's Brightest Students Choose Us
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
                <div className="w-12 h-12 shrink-0 rounded-full bg-secondary-fixed/20 flex items-center justify-center text-secondary group-hover:bg-secondary-fixed group-hover:text-on-secondary-fixed transition-all">
                  <span className="material-symbols-outlined">record_voice_over</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1 font-bold">Native Instructors</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Learn with educators from the UK, USA, and Australia to master authentic accents and idioms.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
                <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <span className="material-symbols-outlined">emoji_events</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1 font-bold">Academic Excellence</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Our curriculum is designed by Oxford alumni, ensuring rigor and result-oriented learning.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
                <div className="w-12 h-12 shrink-0 rounded-full bg-secondary-fixed/20 flex items-center justify-center text-secondary group-hover:bg-secondary-fixed group-hover:text-on-secondary-fixed transition-all">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1 font-bold">Guaranteed Scores</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    94% of our students achieve their target band score within their first attempt.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square border-8 border-white shadow-xl">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbpAObe_kru6dEmoJYNXxXZrFSF2sWGYvubA4OTlgK9orCxxxmayCMksLTrLSbxa7SMxN1Y70hDroWkvjd7QOC67qQhMST9m5XUAGErnr3YWfkO35y8MkEldbyGRKGwiVNebdttQeq1E9zkyOWgJWPwWa62tVUj1-RG8LA_65kjL43kZYgF_UZX6I2KKZ5k_XgPUVvI9yBN53qqeyjxNX3HKclazrXni6wPA3ks5A3FNlC2ucGXgkP0iX_amwPrLFrmYYP8VDwIY"
                alt="Students collaborating"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary-container p-6 rounded-xl shadow-lg max-w-[200px] text-center">
              <p className="font-display-lg text-headline-lg text-on-secondary-container font-bold">15k+</p>
              <p className="font-label-md text-label-md text-on-secondary-container uppercase font-semibold">Alumni Globally</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-primary-container rounded-3xl p-12 text-center relative overflow-hidden text-on-primary">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-6 h-full">
              <div className="border-r border-on-primary"></div>
              <div className="border-r border-on-primary"></div>
              <div className="border-r border-on-primary"></div>
              <div className="border-r border-on-primary"></div>
              <div className="border-r border-on-primary"></div>
              <div className="border-r border-on-primary"></div>
            </div>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-primary mb-6 font-bold">Ready to start your journey?</h2>
          <p className="font-body-lg text-body-lg text-on-primary-container mb-8 max-w-2xl mx-auto">
            Join the ranks of thousands who have realized their international dreams with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-label-lg text-label-lg hover:shadow-lg transition-all transform hover:-translate-y-1 font-bold text-center"
            >
              Enroll Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-on-primary text-on-primary px-8 py-4 rounded-full font-label-lg text-label-lg hover:bg-white/10 transition-all font-bold text-center"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
