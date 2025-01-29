import React, { useState } from 'react';
import {
    Book,
    Upload,
    FileText,
    Code,
    Image,
    LogIn,
    UserPlus
} from 'lucide-react';
import {Link} from "react-router-dom";
import {FaGithub, FaLinkedin, FaTwitter} from "react-icons/fa";
import AuthForm from "@/components/loginReg/AuthForm.jsx";

const BlogLandingPage = () => {
    const [activeTab, setActiveTab] = useState('features');

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Navigation */}
            <nav className=" top-0 z-50 bg-gradient-to-tr from-gray-900 to-gray-800 shadow-md">
                <div className="container mx-auto px-4 py-4 flex flex-row justify-between items-center">
                    <div className="sm:flex-col flex items-center">
                        <Link to={'/'} className="sm:flex-col flex items-center">
                        <img
                            src="/pngwing.com%20(1).png"
                            alt="Webterm" className="h-10 w-10"/>
                        <h1 className="text-small font-bold text-white">Threaded</h1>
                        <h1 className="text-small font-bold text-white">Stories</h1>
                        </Link>
                    </div>

                    <div>
                        <Link to={"/"} className="text-white hover:text-blue-600 mr-4">Explore</Link>

                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                    Your Stories, <span className="text-blue-600">Beautifully Crafted</span>
                </h2>
                <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                    ThreadedStories empowers writers with seamless Markdown editing, instant photo uploads,
                    and a clean, intuitive writing experience.
                </p>
                <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        onClick={() => document.getElementById('auth-section').scrollIntoView()}
                    >
                        Login To Access More Features
                    </button>
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        onClick={() => document.getElementById('auth-section').scrollIntoView()}
                    >
                        Start Writing Now
                    </button>
                    <Link to={"/"}>
                        <button
                            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
                        >
                            Find an entertaining read
                        </button>
                    </Link>
                </div>
            </header>

            {/* Two Column Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="relative space-y-6 mr-0 md:mr-12 mb-8 md:mb-0 text-center md:text-left"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-white">
                            Take your blogging to the next level
                        </h1>
                        <p className="text-base md:text-lg text-gray-400">
                            Our blogging app provides a seamless and powerful platform to help
                            you grow your audience and share your ideas with the world.
                        </p>
                        <div className="space-x-4 pt-4">
                            {/**<Link
                                to="/register"
                                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 inline-block"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/features"
                                className="text-gray-400 hover:text-gray-300 inline-block"
                            >
                                What's New
                            </Link>*/}
                        </div>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1674230271219-834162b9a998?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Blogging App Hero"
                        className="w-full md:w-2/5 rounded-lg shadow-lg"
                    />
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="container mx-auto px-4 py-16 bg-gray-800 rounded-2xl">
                <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Powerful Blogging Features
                    </h3>
                    <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                        ThreadedStories isn't just another blogging platform. It's a powerful tool designed
                        for writers who demand flexibility and simplicity.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-700 p-6 rounded-lg text-center">
                        <FileText className="mx-auto text-blue-600 mb-4" size={48}/>
                        <h4 className="text-xl font-semibold mb-2 text-white">Markdown Support</h4>
                        <p className="text-gray-400">
                            Write with the power of Markdown. Format your text with ease and focus on your content.
                        </p>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg text-center">
                        <Image className="mx-auto text-blue-600 mb-4" size={48}/>
                        <h4 className="text-xl font-semibold mb-2 text-white">Easy Photo Upload</h4>
                        <p className="text-gray-400">
                            Instantly upload and embed images directly into your blog posts with drag-and-drop.
                        </p>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg text-center">
                        <Code className="mx-auto text-blue-600 mb-4" size={48}/>
                        <h4 className="text-xl font-semibold mb-2 text-white">Code Syntax Highlighting</h4>
                        <p className="text-gray-400">
                            Share code snippets with beautiful syntax highlighting for developers.
                        </p>
                    </div>
                </div>
            </section>

            {/* Authentication Section */}
            <div id={"auth-section"}>
                <AuthForm/>
            </div>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-800">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="text-2xl font-bold text-white">
                            Blogging App
                        </Link>
                        <p className="text-gray-400 mt-2">
                            &copy; 2024 Blogging App. All rights reserved.
                        </p>
                    </div>
                    <div className="space-x-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-300 inline-block"
                        >
                            <FaGithub className="w-6 h-6 inline"/>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-300 inline-block"
                        >
                            <FaTwitter className="w-6 h-6 inline"/>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-300 inline-block"
                        >
                            <FaLinkedin className="w-6 h-6 inline"/>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BlogLandingPage;