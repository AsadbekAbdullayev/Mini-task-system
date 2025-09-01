import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trackify from '@/logos/trackify.png';
import calendar from '@/logos/calendar.png';
import google from '@/logos/google.png';
import trello from '@/logos/trello.png';
import sheets from '@/logos/sheets.png';
import { motion } from 'framer-motion';
import asana from '@/logos/asana.png';
import jira from '@/logos/jira.png';
import {
	DashboardOutlined,
	CheckCircleOutlined,
	BarChartOutlined,
} from '@ant-design/icons';

const Home: React.FC = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const navbarRef = useRef<HTMLElement>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const handleScroll = () => {
			if (navbarRef.current && window.scrollY > 50) {
				navbarRef.current.classList.add('scrolled');
			} else if (navbarRef.current) {
				navbarRef.current.classList.remove('scrolled');
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		if (mobileMenuRef.current) {
			if (mobileMenuOpen) {
				mobileMenuRef.current.style.height = `${mobileMenuRef.current.scrollHeight}px`;
				mobileMenuRef.current.classList.add('open');
			} else {
				mobileMenuRef.current.style.height = '0';
				mobileMenuRef.current.classList.remove('open');
			}
		}
	}, [mobileMenuOpen]);

	return (
		<div className="bg-black text-white font-['Space_Grotesk'] overflow-x-hidden scroll-smooth">
			{/* Background animation */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
				<motion.div
					animate={{ scale: [1, 1.2, 1] }}
					transition={{ duration: 6, repeat: Infinity }}
					className="absolute top-20 left-10 w-96 h-96 bg-[#30F2F2]/20 rounded-full blur-3xl"
				/>
				<motion.div
					animate={{ scale: [1.2, 1, 1.2] }}
					transition={{ duration: 8, repeat: Infinity }}
					className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
				/>
			</div>

			{/* Navbar */}
			<nav
				ref={navbarRef}
				className="fixed top-0 left-0 right-0 bg-gray-900/70 backdrop-blur-lg border-b border-cyan-500/30 z-50 transition-all duration-300"
			>
				<div className="container mx-auto px-6 py-3 flex items-center justify-end relative">
					<img
						src={trackify}
						alt="logo"
						className="w-[200px] absolute left-0"
					/>

					<div className="hidden md:flex items-center gap-6">
						<a href="#home" className="hover:text-[#30F2F2]">
							Home
						</a>
						<a href="#about" className="hover:text-[#30F2F2]">
							About
						</a>
						<a href="#services" className="hover:text-[#30F2F2]">
							Services
						</a>
						<a href="#features" className="hover:text-[#30F2F2]">
							Features
						</a>
						<a href="#contact" className="hover:text-[#30F2F2]">
							Contact
						</a>
					</div>

					<button
						onClick={toggleMobileMenu}
						className="md:hidden text-[#30F2F2]"
					>
						☰
					</button>
				</div>

				{/* Mobile menu */}
				<div
					ref={mobileMenuRef}
					className="md:hidden h-0 overflow-hidden transition-all duration-300"
				>
					<div className="flex flex-col px-6 py-4 space-y-2">
						<a href="#home" className="hover:text-[#30F2F2]">
							Home
						</a>
						<a href="#about" className="hover:text-[#30F2F2]">
							About
						</a>
						<a href="#services" className="hover:text-[#30F2F2]">
							Services
						</a>
						<a href="#portfolio" className="hover:text-[#30F2F2]">
							Portfolio
						</a>
						<a href="#contact" className="hover:text-[#30F2F2]">
							Contact
						</a>
					</div>
				</div>
			</nav>

			{/* Hero */}
			<section
				id="home"
				className="min-h-screen flex flex-col items-center justify-center text-center relative z-10 px-4"
			>
				<h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#30F2F2] via-indigo-400 to-purple-500 bg-clip-text text-transparent">
					Take Control of Your Work & Money
				</h1>
				<p className="mt-4 text-lg text-gray-300 max-w-2xl">
					Trackify — the all-in-one platform to manage tasks, monitor your
					income and expenses, and stay productive.
				</p>
				<div className="mt-6 flex gap-4">
					<button
						onClick={() => navigate('/login')}
						className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#30F2F2] to-indigo-500 text-black font-semibold hover:scale-105 transition"
					>
						Get Started
					</button>
				</div>
			</section>

			{/* About */}
			<section id="about" className="py-20 relative z-10">
				<div className="container mx-auto px-6 text-center flex justify-center flex-col items-center">
					<h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#30F2F2] to-purple-400 bg-clip-text text-transparent">
						About Trackify
					</h2>
					<p className="text-gray-300 max-w-3xl mx-auto mb-10">
						Trackify takes inspiration from the simplicity of{' '}
						<span className="text-[#30F2F2]">Trello</span>, the structure of{' '}
						<span className="text-[#30F2F2]">Jira</span>, the flexibility of{' '}
						<span className="text-[#30F2F2]">Asana</span>, the clarity of{' '}
						<span className="text-[#30F2F2]">Notion</span>, and the
						collaboration of{' '}
						<span className="text-[#30F2F2]">Google Workspace</span>. <br />
					</p>

					<div className="relative max-w-[500px] overflow-hidden">
						{/* Fade overlay chap */}
						<div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#000] to-transparent z-10 pointer-events-none"></div>
						{/* Fade overlay o‘ng */}
						<div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#000] to-transparent z-10 pointer-events-none"></div>

						<motion.div
							className="flex gap-10"
							animate={{ x: ['0%', '-50%'] }}
							transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
						>
							{[...Array(2)].map((_, i) =>
								[jira, trello, sheets, asana, google, calendar].map(
									(logo, idx) => (
										<img
											key={`${i}-${idx}`}
											src={logo}
											alt="logo"
											className="min-w-[60px] h-12 opacity-80 hover:opacity-100 transition"
										/>
									),
								),
							)}
						</motion.div>
					</div>
				</div>
			</section>

			{/* Services */}
			<section id="services" className="py-20 relative z-10 bg-gray-900/40">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-[#30F2F2] to-purple-400 bg-clip-text text-transparent">
						Our Services
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="p-6 bg-gray-800 rounded-lg border border-[#30F2F2]/30 hover:scale-105 transition">
							<h3 className="text-2xl font-semibold text-[#30F2F2] mb-3">
								Financial Tracking
							</h3>
							<p className="text-gray-300">
								Track income and expenses effortlessly. Get smart analytics on
								your cash flow and make better financial decisions.
							</p>
						</div>
						<div className="p-6 bg-gray-800 rounded-lg border border-purple-400/30 hover:scale-105 transition">
							<h3 className="text-2xl font-semibold text-purple-400 mb-3">
								Task Management
							</h3>
							<p className="text-gray-300">
								Organize your tasks into boards, manage priorities, and stay
								productive with a system built for teams and individuals.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section id="features" className="py-20 relative z-10">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-[#30F2F2] to-purple-400 bg-clip-text text-transparent">
						Features
					</h2>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="bg-gray-800 rounded-lg p-8 shadow-lg hover:scale-105 transition flex flex-col items-center text-center">
							<div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-[#30F2F2] to-cyan-400 mb-4">
								<DashboardOutlined className="text-3xl text-black" />
							</div>
							<h3 className="text-lg font-semibold text-[#30F2F2]">
								Smart Dashboard
							</h3>
							<p className="text-gray-400 mt-2">
								All your tasks and finances in one clean, intuitive dashboard.
							</p>
						</div>

						<div className="bg-gray-800 rounded-lg p-8 shadow-lg hover:scale-105 transition flex flex-col items-center text-center">
							<div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
								<CheckCircleOutlined className="text-3xl text-white" />
							</div>
							<h3 className="text-lg font-semibold text-purple-400">
								Task Management
							</h3>
							<p className="text-gray-400 mt-2">
								Organize, prioritize, and track your tasks effortlessly.
							</p>
						</div>

						<div className="bg-gray-800 rounded-lg p-8 shadow-lg hover:scale-105 transition flex flex-col items-center text-center">
							<div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-400 to-blue-500 mb-4">
								<BarChartOutlined className="text-3xl text-white" />
							</div>
							<h3 className="text-lg font-semibold text-indigo-400">
								Analytics
							</h3>
							<p className="text-gray-400 mt-2">
								Powerful insights into your income, expenses, and productivity.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Contact */}
			<section
				id="contact"
				className="py-20 relative z-10 bg-gray-900/50 text-center"
			>
				<div className="container mx-auto px-6">
					<h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#30F2F2] to-purple-400 bg-clip-text text-transparent">
						Contact Us
					</h2>
					<p className="text-gray-300 mb-6">
						Have questions? Get in touch with the Trackify team today.
					</p>
					<form className="max-w-lg mx-auto space-y-4">
						<input
							type="text"
							placeholder="Your Name"
							className="w-full px-4 py-2 rounded bg-gray-800 border border-[#30F2F2]/30 focus:outline-none"
						/>
						<input
							type="email"
							placeholder="Your Email"
							className="w-full px-4 py-2 rounded bg-gray-800 border border-[#30F2F2]/30 focus:outline-none"
						/>
						<textarea
							placeholder="Message"
							rows={4}
							className="w-full px-4 py-2 rounded bg-gray-800 border border-[#30F2F2]/30 focus:outline-none"
						></textarea>
						<button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#30F2F2] to-purple-500 text-black font-semibold hover:scale-105 transition">
							Send Message
						</button>
					</form>
				</div>
			</section>
		</div>
	);
};

export default Home;
