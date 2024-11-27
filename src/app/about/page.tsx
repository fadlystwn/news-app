import Navigation from '@/components/Navigation';
import React from 'react';

export default function About() {
    return (
        <>
                <Navigation/>
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-bold">
                ABOUT THE NEWS APP
            </h1>
            <p className="mt-8 text-xl max-w-3xl text-center">
                Welcome to the News App, a project built by Fadly using cutting-edge technologies like 
                <span className=" font-semibold"> Next.js</span>, 
                <span className=" font-semibold"> Prisma</span>, and 
                <span className="font-semibold"> PostgreSQL</span>. 
                This app delivers real-time, reliable news articles with a seamless and modern user experience.
            </p>
            <p className="mt-4 max-w-3xl text-center">
                With a robust backend powered by PostgreSQL and Prisma intuitive ORM capabilities, 
                the News App ensures data integrity and scalability. Built on the versatile Next.js framework, 
                it offers blazing-fast performance and a user-friendly interface.
            </p>
            <div className="mt-12 flex gap-4">
                <button className="px-6 py-3 text-lg font-medium border">
                    Visit GitHub
                </button>
            </div>
            <footer className="absolute bottom-4 text-sm">
                © {new Date().getFullYear()} News App by Fadly. All Rights Reserved.
            </footer>
        </div>
        </>
    );
}
