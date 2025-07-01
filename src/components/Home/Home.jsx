import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';
import Footer from './../Footer/Footer';
import NavBar from './../NavBar/NavBar';
import { FaArrowRight, FaChalkboardTeacher, FaStar, FaLanguage, FaUsers } from 'react-icons/fa';

const languageCategories = [
    { title: 'English', icon: '🇬🇧', slug: 'english', code: 'US', color: 'bg-blue-500' },
    { title: 'Spanish', icon: '🇪🇸', slug: 'spanish', code: 'ES', color: 'bg-red-500' },
    { title: 'French', icon: '🇫🇷', slug: 'french', code: 'FR', color: 'bg-indigo-500' },
    { title: 'German', icon: '🇩🇪', slug: 'german', code: 'DE', color: 'bg-yellow-400' },
    { title: 'Chinese', icon: '🇨🇳', slug: 'chinese', code: 'CN', color: 'bg-red-600' },
    { title: 'Japanese', icon: '🇯🇵', slug: 'japanese', code: 'JP', color: 'bg-pink-400' },
    { title: 'Arabic', icon: '🇸🇦', slug: 'arabic', code: 'AR', color: 'bg-green-600' },
    { title: 'Russian', icon: '🇷🇺', slug: 'russian', code: 'RU', color: 'bg-blue-800' },
    { title: 'Italian', icon: '🇮🇹', slug: 'italian', code: 'IT', color: 'bg-green-500' },
];

const bannerSlides = [
    {
        image: "https://i.postimg.cc/bJMdq82B/istockphoto-1444142886-612x612.jpg",
        headline: <>Learn Languages with <span className="text-blue-400">Expert Tutors</span></>,
        subtitle: "Connect with certified native speakers and master any language in a friendly, supportive environment.",
    },
    {
        image: "https://i.postimg.cc/j5ChSzMd/istockphoto-1570178815-612x612-1.jpg",
        headline: <>Achieve Fluency with <span className="text-blue-400">Personalized Lessons</span></>,
        subtitle: "Tailored sessions to fit your goals, schedule, and learning style.",
    },
    {
        image: "https://i.postimg.cc/VkBgGsS1/istockphoto-1593774374-612x612.jpg",
        headline: <>Join a <span className="text-blue-400">Global Community</span></>,
        subtitle: "Meet learners and tutors from around the world and grow together.",
    },
];

const Home = () => {
    const navigate = useNavigate();
    const [tutors, setTutors] = useState([]);
    const [stats, setStats] = useState({
        tutorCount: 0,
        reviewCount: 0,
        languageCount: 0,
        userCount: 0,
    });
    const [isLight, setIsLight] = useState(() => {
        return document.documentElement.getAttribute('data-theme') === 'light';
    });

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        fetch('https://tutor-connect-backend-zoji.onrender.com/api/tutorials')
            .then(res => res.json())
            .then(data => setTutors(data))
            .catch(() => setTutors([]));

        fetch('https://tutor-connect-backend-zoji.onrender.com/api/stats')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(() => setStats({
                tutorCount: 0,
                reviewCount: 0,
                languageCount: 0,
                userCount: 0,
            }));
    }, []);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const tutorCountsByLanguage = languageCategories.reduce((acc, cat) => {
        acc[cat.slug] = tutors.filter(
            t => t.language && t.language.toLowerCase() === cat.slug
        ).length;
        return acc;
    }, {});

    return (
        <div className={isLight ? "bg-white root min-h-screen" : "bg-[#0f172a] root min-h-screen"}>
            <NavBar />
            <div className="mt-16 px-4 md:px-10">
                {/* Banner/Carousel Section */}
                <section className="relative mb-10">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop
                        className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
                    >
                        {bannerSlides.map((slide, idx) => (
                            <SwiperSlide key={idx}>
                                <div
                                    className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[750px]"
                                    style={{
                                        backgroundImage: `url('${slide.image}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="absolute"></div>
                                    <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
                                        <h1 className={isLight ? "text-4xl md:text-6xl font-bold text-black text-center mb-4" : "text-4xl md:text-6xl font-bold text-white text-center mb-4"}>
                                            {slide.headline}
                                        </h1>
                                        <p className={isLight ? "text-lg md:text-2xl text-black text-center mb-8 max-w-2xl" : "text-lg md:text-2xl text-white text-center mb-8 max-w-2xl"}>
                                            {slide.subtitle}
                                        </p>
                                        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition"
                                                onClick={() => navigate('/findtutor')}
                                            >
                                                Find Your Tutor &rarr;
                                            </button>
                                            <button
                                                className={isLight ? "bg-gray-900 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition" : "bg-white hover:bg-gray-200 text-gray-900 font-semibold px-8 py-3 rounded-lg text-lg shadow transition"}
                                                onClick={() => navigate('/addtutor')}
                                            >
                                                Become a Tutor
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
                {/* Stats Section */}
                <section className="mb-16">
                    <div className="w-full flex flex-col items-center">
                        <div className={isLight ? "w-full max-w-8xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-2xl py-10 px-2 md:px-8 shadow-lg" : "w-full max-w-8xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl py-10 px-2 md:px-8 shadow-lg"}>
                            <div className="flex flex-col items-center">
                                <div className="bg-blue-400 bg-opacity-30 rounded-full p-4 mb-2">
                                    <FaUsers className="text-4xl text-white" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white">
                                    {stats.tutorCount}
                                </div>
                                <div className="text-white text-lg mt-1">Tutors Available</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-blue-400 bg-opacity-30 rounded-full p-4 mb-2">
                                    <FaStar className="text-4xl text-white" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white">{stats.reviewCount}</div>
                                <div className="text-white text-lg mt-1">Happy Reviews</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-blue-400 bg-opacity-30 rounded-full p-4 mb-2">
                                    <FaLanguage className="text-4xl text-white" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white">9</div>
                                <div className="text-white text-lg mt-1">Languages</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-blue-400 bg-opacity-30 rounded-full p-4 mb-2">
                                    <FaChalkboardTeacher className="text-4xl text-white" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white">{stats.userCount}</div>
                                <div className="text-white text-lg mt-1">Students</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Language Category Section */}
                <section className={isLight ? "mb-16 bg-white py-16" : "mb-16 bg-[#111827] py-16"}>
                    <h2 className={isLight ? "text-4xl font-bold text-center text-black mb-3" : "text-4xl font-bold text-center text-white mb-3"}>Choose Your Language</h2>
                    <p className={isLight ? "text-center text-gray-700 text-lg mb-12" : "text-center text-gray-300 text-lg mb-12"}>
                        Explore our wide range of languages and start your learning journey today
                    </p>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                        {languageCategories.map(cat => (
                            <div
                                key={cat.slug}
                                className={isLight ? "bg-white border-1 border-black hover:shadow-lg transition cursor-pointer rounded-2xl p-6 flex items-center justify-between shadow flex-1" : "bg-[#111827] border-1 border-white hover:shadow-lg transition cursor-pointer rounded-2xl p-6 flex items-center justify-between shadow flex-1"}
                                onClick={() => navigate(`/findtutor?language=${cat.slug}`)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`${cat.color} text-white font-bold rounded-full w-14 h-14 flex items-center justify-center text-xl shadow`}>
                                        {cat.code}
                                    </div>
                                    <div>
                                        <span className={isLight ? "block text-xl text-black font-semibold" : "block text-xl text-white font-semibold"}>{cat.title}</span>
                                        <span className={isLight ? "block text-gray-700 text-sm" : "block text-gray-500 text-sm"}>
                                            {tutorCountsByLanguage[cat.slug] || 0} tutors available
                                        </span>
                                    </div>
                                </div>
                                <span className={isLight ? "text-gray-700 text-2xl ml-2" : "text-gray-400 text-2xl ml-2"}>&rarr;</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Choose TutorConnect Section */}
                <section className={isLight ? "mb-16 bg-white py-16" : "mb-16 bg-[#111827] py-16"}>
                    <h2 className={isLight ? "text-4xl font-bold text-center text-black mb-3" : "text-4xl font-bold text-center text-white mb-3"}>Why Choose TutorConnect?</h2>
                    <p className={isLight ? "text-center text-gray-700 text-lg mb-12" : "text-center text-gray-300 text-lg mb-12"}>
                        We make language learning accessible, effective, and enjoyable
                    </p>
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full p-5 mb-4">
                                <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
                                    <path d="M12 7v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className={isLight ? "text-xl font-semibold text-black mb-2" : "text-xl font-semibold text-white mb-2"}>Flexible Scheduling</h3>
                            <p className={isLight ? "text-gray-700" : "text-gray-400"}>Book lessons at your convenience with 24/7 availability</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full p-5 mb-4">
                                <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
                                    <path d="M12 16l-3-4h6l-3 4z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="12" cy="10" r="1" fill="#fff" />
                                </svg>
                            </div>
                            <h3 className={isLight ? "text-xl font-semibold text-black mb-2" : "text-xl font-semibold text-white mb-2"}>Certified Tutors</h3>
                            <p className={isLight ? "text-gray-700" : "text-gray-400"}>Learn from qualified native speakers and language experts</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full p-5 mb-4">
                                <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
                                    <path d="M8 16l4-8 4 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className={isLight ? "text-xl font-semibold text-black mb-2" : "text-xl font-semibold text-white mb-2"}>Track Progress</h3>
                            <p className={isLight ? "text-gray-700" : "text-gray-400"}>Monitor your learning journey with detailed progress reports</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className={isLight ? "mb-16 bg-white py-16" : "mb-16 bg-[#111827] py-16"}>
                    <h2 className={isLight ? "text-4xl font-bold text-center text-black mb-3" : "text-4xl font-bold text-center text-white mb-3"}>What Our Students Say</h2>
                    <p className={isLight ? "text-center text-gray-700 text-lg mb-12" : "text-center text-gray-300 text-lg mb-12"}>
                        Real stories from real students who achieved their language goals
                    </p>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className={isLight ? "bg-white border-1 text-black border-black rounded-2xl shadow p-8 flex flex-col" : "bg-[#111827] border-1 text-white border-white rounded-2xl shadow p-8 flex flex-col"}>
                            <div className="flex items-center mb-4">
                                <span className="text-yellow-400 text-xl mr-1">★</span>
                                <span className="text-yellow-400 text-xl mr-1">★</span>
                                <span className="text-yellow-400 text-xl mr-1">★</span>
                                <span className="text-yellow-400 text-xl mr-1">★</span>
                                <span className="text-yellow-400 text-xl">★</span>
                            </div>
                            <p className={isLight ? "italic text-gray-700 mb-6" : "italic text-gray-400 mb-6"}>
                                "Amazing platform! My Spanish improved dramatically in just 3 months."
                            </p>
                            <div className="flex items-center mt-auto">
                                <img
                                    src="https://randomuser.me/api/portraits/women/44.jpg"
                                    alt="Sarah Johnson"
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className={isLight ? "font-bold text-black" : "font-bold text-white"}>Sarah Johnson</p>
                                    <p className={isLight ? "text-gray-700 text-sm" : "text-gray-500 text-sm"}>Learning Spanish</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className={isLight ? "bg-white border-1 text-black border-black rounded-2xl shadow p-8 flex flex-col" : "bg-[#111827] border-1 text-white border-white rounded-2xl shadow p-8 flex flex-col"}>
                            <div className="flex items-center mb-4">
                                <span className="text-yellow-400 text-xl mr-1">★</span>
                                <span className="text-yellow-400 text-xl mr-1">★</span>
                                <span className="text-yellow-400 text-xl mr-1">★</span>
                                <span className="text-yellow-400 text-xl mr-1">★</span>
                                <span className="text-yellow-400 text-xl">★</span>
                            </div>
                            <p className={isLight ? "italic text-gray-700 mb-6" : "italic text-gray-400 mb-6"}>
                                "The tutors are professional and the booking system is so easy to use."
                            </p>
                            <div className="flex items-center mt-auto">
                                <img
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                    alt="Mike Chen"
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className={isLight ? "font-bold text-black" : "font-bold text-white"}>Mike Chen</p>
                                    <p className={isLight ? "text-gray-700 text-sm" : "text-gray-500 text-sm"}>Learning French</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 3 */}
                        <div className={isLight ? "bg-white border-1 text-black border-black rounded-2xl shadow p-8 flex flex-col" : "bg-[#111827] border-1 text-white border-white rounded-2xl shadow p-8 flex flex-col"}>
                            <div className="flex items-center mb-4">
                                <span className="text-yellow-400 text-xl mr-1">★</span>
                                <span className="text-yellow-400 text-xl mr-1">★</span>
                                <span className="text-yellow-400 text-xl mr-1">★</span>
                                <span className="text-yellow-400 text-xl mr-1">★</span>
                                <span className="text-yellow-400 text-xl">★</span>
                            </div>
                            <p className={isLight ? "italic text-gray-700 mb-6" : "italic text-gray-400 mb-6"}>
                                "Perfect for busy professionals. I can learn at my own pace."
                            </p>
                            <div className="flex items-center mt-auto">
                                <img
                                    src="https://randomuser.me/api/portraits/women/65.jpg"
                                    alt="Emma Davis"
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className={isLight ? "font-bold text-black" : "font-bold text-white"}>Emma Davis</p>
                                    <p className={isLight ? "text-gray-700 text-sm" : "text-gray-500 text-sm"}>Learning German</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    );
};

export default Home;