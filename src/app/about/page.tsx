'use client';

import Navigation from '@/components/Navigation';
import { Shield, Sparkles, Users, Megaphone } from 'lucide-react';

const values = [
  {
    title: 'Truth First',
    description:
      'We are committed to factual, unbiased reporting. Every story is rigorously verified before publication.',
    icon: Shield,
  },
  {
    title: 'Clarity Over Noise',
    description:
      'In an age of information overload, we distill complex stories into clear, digestible journalism.',
    icon: Sparkles,
  },
  {
    title: 'Reader-Centered',
    description:
      'Our readers are our priority. We design every experience around your need for trustworthy news.',
    icon: Users,
  },
  {
    title: 'Independent Voice',
    description:
      'We maintain editorial independence, free from political or corporate influence.',
    icon: Megaphone,
  },
];

const team = [
  {
    name: 'Sarah Mitchell',
    role: 'Editor-in-Chief',
    bio: 'Award-winning journalist with 15 years of experience in investigative reporting.',
  },
  {
    name: 'David Chen',
    role: 'Head of Technology',
    bio: 'Former engineering lead passionate about building tools for modern journalism.',
  },
  {
    name: 'Amara Osei',
    role: 'Senior Correspondent',
    bio: 'Specializes in international affairs and has reported from over 30 countries.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background text-primary">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero */}
        <section className="text-center mb-16 md:mb-24 animate-fade-in">
          <p className="text-xs uppercase tracking-widest font-semibold text-muted mb-4">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 font-serif">
            Journalism for the
            <br />
            modern reader
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-secondary max-w-2xl mx-auto">
            We believe great journalism should be clear, beautiful, and accessible.
            Our mission is to cut through the noise and deliver stories that matter —
            with integrity and craft.
          </p>
        </section>

        {/* Divider */}
        <hr className="border-t border-border w-1/2 mx-auto mb-16 md:mb-24" />

        {/* Our Story */}
        <section className="mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-widest font-semibold text-muted mb-2">
            Our Story
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 font-serif">
            Built on a simple idea
          </h2>
          <div className="space-y-4 text-secondary leading-relaxed">
            <p>
              Founded in 2024, MySite started with a simple observation: the news
              experience was broken. Readers were overwhelmed by clickbait, cluttered
              layouts, and sensationalism. We set out to build something different.
            </p>
            <p>
              Our approach combines the editorial rigor of traditional journalism
              with the clarity of minimalist design. Every headline is carefully
              written, every layout intentionally crafted, and every story held to
              the highest standard of accuracy.
            </p>
            <p>
              Today, we serve readers who value substance over spectacle — people
              who want to stay informed without the noise.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-widest font-semibold text-muted mb-2">
            What We Stand For
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 font-serif">
            Our values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-surface border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
              >
                <value.icon className="w-8 h-8 mb-3 text-primary" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold mb-2 font-serif">
                  {value.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-widest font-semibold text-muted mb-2">
            The People Behind the Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 font-serif">
            Our team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-surface border border-border rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-border-strong mx-auto mb-4 flex items-center justify-center text-xl font-bold text-muted">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-base font-semibold font-serif">
                  {member.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-muted mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-secondary leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-surface rounded-2xl border border-border p-8 md:p-12 text-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-muted mb-3">
            Stay Informed
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 font-serif">
            Subscribe to our newsletter
          </h2>
          <p className="text-sm text-muted mb-6 max-w-md mx-auto leading-relaxed">
            Get the week&apos;s best stories straight to your inbox. No spam, just
            quality journalism.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
            <button className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <p className="text-center text-xs text-muted">
          © 2026 MySite. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
