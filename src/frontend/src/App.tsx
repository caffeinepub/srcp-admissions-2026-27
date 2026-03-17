import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Award,
  BookOpen,
  CheckCircle,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Phone,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Course } from "./backend";
import { useSubmitEnquiry } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Admissions", href: "#apply" },
  { label: "Contact", href: "#contact" },
];

const COURSES = [
  {
    id: 1,
    icon: <BookOpen className="w-8 h-8" />,
    title: "B.Pharm",
    subtitle: "Bachelor of Pharmacy",
    duration: "4 Years",
    code: "Counseling Code — APEAPCET: SRCN",
    desc: "A comprehensive undergraduate program covering pharmaceutical sciences, drug formulation, and clinical pharmacy.",
    color: "from-forest-800 to-forest-700",
  },
  {
    id: 2,
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Pharm.D",
    subtitle: "Doctor of Pharmacy",
    duration: "6 Years",
    code: "Counseling Code — APEAPCET: SRCN",
    desc: "A professional doctorate focused on patient care, clinical pharmacy practice, and pharmaceutical sciences.",
    color: "from-navy-900 to-navy-800",
  },
  {
    id: 3,
    icon: <Microscope className="w-8 h-8" />,
    title: "M.Pharm",
    subtitle: "Master of Pharmacy",
    duration: "2 Years",
    code: "Counseling Code — APPGECET: SRCN1",
    desc: "Specializations in Pharmaceutics, Pharmacology, Pharmaceutical Analysis, and Pharmacognosy.",
    color: "from-forest-950 to-navy-900",
  },
];

const FEATURES = [
  {
    icon: <FlaskConical className="w-7 h-7" />,
    title: "State-of-the-Art Labs",
    desc: "Modern pharmaceutical labs equipped with advanced instruments for hands-on learning.",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Expert Faculty",
    desc: "Experienced professors, researchers, and industry professionals guiding every student.",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Strong Placements",
    desc: "Top pharma companies like Dr. Reddy's, Aurobindo, MedPlus, and IQVIA recruiting from campus.",
  },
  {
    icon: <Microscope className="w-7 h-7" />,
    title: "Research & Development",
    desc: "Active R&D programs with collaborations, publications, and innovation-driven learning.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Check Eligibility",
    desc: "Review course requirements and qualifying exam criteria.",
  },
  {
    num: "02",
    title: "Fill Enquiry Form",
    desc: "Submit your details using the online enquiry form below.",
  },
  {
    num: "03",
    title: "Get Counseling Code",
    desc: "APEAPCET: SRCN / APPGECET: SRCN1 for your chosen programme.",
  },
  {
    num: "04",
    title: "Document Verification",
    desc: "Submit required certificates and academic documents.",
  },
  {
    num: "05",
    title: "Confirm Admission",
    desc: "Complete the fee payment and secure your seat.",
  },
];

const TESTIMONIALS = [
  {
    name: "K. Yashashwini Reddy",
    role: "Technical Trainee, DMS (DocHub)",
    company: "Dr. Reddy's Laboratories, Hyderabad",
    quote:
      "My college and faculty gave me a strong foundation in pharma. Their support helped me build the right skills—crucial for my role as a Technical Trainee at Dr. Reddy's.",
    initials: "KY",
  },
  {
    name: "S. Aravind",
    role: "Operations Specialist",
    company: "IQVIA",
    quote:
      "The knowledge I gained built a strong foundation for my career in the pharma industry. It helped me develop the skills needed for my role as an Operations Specialist at IQVIA.",
    initials: "SA",
  },
  {
    name: "Kethapalli Haritha",
    role: "Drug Safety Associate",
    company: "Parexel International",
    quote:
      "The support and guidance from my faculty made a big difference in my learning. My college helped me build a strong foundation and gain the right skills for my journey.",
    initials: "KH",
  },
];

const STATS = [
  { label: "Years of Excellence", value: "17+" },
  { label: "Placements 2025-26", value: "200+" },
  { label: "Faculty Members", value: "50+" },
  { label: "Alumni Network", value: "2000+" },
];

const ABOUT_BADGES = [
  {
    icon: <Award className="w-5 h-5" />,
    text: "17+ Years of Excellence in Pharmacy Education",
  },
  {
    icon: <Star className="w-5 h-5" />,
    text: "NAAC Accredited — Quality Institution",
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    text: "PCI Approved, New Delhi",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    text: "200+ Placements in 2025-26",
  },
];

const CONTACT_ITEMS = [
  {
    icon: <MapPin className="w-7 h-7" />,
    title: "Address",
    lines: ["NH-40, Nandyala,", "Andhra Pradesh 518112"],
  },
  {
    icon: <Phone className="w-7 h-7" />,
    title: "Phone",
    lines: ["+91 9866308468"],
  },
  {
    icon: <Mail className="w-7 h-7" />,
    title: "Email",
    lines: ["srcp07hc@gmail.com", "principal.hc@jntua.ac.in"],
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "" as Course | "",
    city: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitEnquiry = useSubmitEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.course) return;
    try {
      await submitEnquiry.mutateAsync({
        applicantName: form.name,
        email: form.email,
        phone: form.phone,
        courseOfInterest: form.course as Course,
        cityState: form.city,
        message: form.message,
      });
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        course: "",
        city: "",
        message: "",
      });
    } catch {
      // error handled via submitEnquiry.isError
    }
  };

  const scrollToApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Sticky Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-forest-950/95 backdrop-blur-md shadow-lg"
            : "bg-forest-950"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/srcp-logo-transparent.dim_200x200.png"
                alt="SRCP Logo"
                className="h-12 w-12 object-contain rounded-full"
              />
              <div>
                <p className="text-white font-display font-bold text-sm md:text-base leading-tight">
                  SANTHIRAM COLLEGE OF PHARMACY
                </p>
                <p className="text-gold-400 text-xs hidden sm:block">
                  Nandyal, Andhra Pradesh
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid="nav.link"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={scrollToApply}
                data-ocid="nav.primary_button"
                className="ml-4 bg-gold-500 hover:bg-gold-400 text-forest-950 font-semibold"
              >
                Apply Now
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-forest-950 border-t border-white/10"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    data-ocid="nav.link"
                    className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  onClick={() => {
                    scrollToApply();
                    setMobileMenuOpen(false);
                  }}
                  data-ocid="nav.primary_button"
                  className="mt-2 bg-gold-500 hover:bg-gold-400 text-forest-950 font-semibold"
                >
                  Apply Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
        style={{
          backgroundImage: `url('/assets/uploads/image-2-1.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950/90 via-navy-950/80 to-forest-950/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                {[
                  "AUTONOMOUS",
                  "NAAC Accredited",
                  "PCI Approved",
                  "Affiliated to JNTUA",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="bg-gold-500/20 border border-gold-500/40 text-gold-400 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                Admissions Open
                <span className="block text-gold-400">2026-27</span>
              </h1>

              <p className="text-white/80 text-lg md:text-xl mb-2">
                Santhiram College of Pharmacy, Nandyal
              </p>
              <p className="text-white/60 text-sm md:text-base mb-10">
                NH-40, Nandyala, Andhra Pradesh — Shaping Tomorrow's
                Pharmaceutical Leaders
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Button
                  size="lg"
                  onClick={scrollToApply}
                  data-ocid="hero.primary_button"
                  className="bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-lg px-8 py-6 shadow-pharma-lg"
                >
                  Apply Online <ChevronRight className="ml-1 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  data-ocid="hero.secondary_button"
                  className="border-white/60 text-black hover:bg-white/10 text-lg px-8 py-6"
                  asChild
                >
                  <a href="#about">Know More</a>
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3"
              >
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  >
                    <p className="font-display text-2xl font-bold text-gold-400">
                      {stat.value}
                    </p>
                    <p className="text-white/70 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Graduation Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-gold-500/20 rounded-3xl blur-xl" />
                <img
                  src="/assets/uploads/image-2-1.png"
                  alt="SRCP Graduation Ceremony"
                  className="relative rounded-2xl shadow-2xl w-full max-w-lg object-cover border-2 border-gold-500/30"
                />
                <div className="absolute -bottom-4 -left-4 bg-forest-800 text-white rounded-xl px-5 py-3 shadow-lg border border-gold-500/30">
                  <p className="font-display text-lg font-bold text-gold-400">
                    Convocation 2024
                  </p>
                  <p className="text-xs text-white/70">
                    Celebrating Our Graduates
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="bg-forest-800 py-3 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {["a", "b"].map((key) => (
            <span
              key={key}
              className="text-white text-sm font-medium px-4 inline-block"
            >
              🎓 Campus Placements 2025-26: &nbsp;
              <span className="text-gold-400 font-bold">Lionix LLP – 99</span>{" "}
              &nbsp;|&nbsp;
              <span className="text-gold-400 font-bold">Aurobindo – 24</span>{" "}
              &nbsp;|&nbsp;
              <span className="text-gold-400 font-bold">MedPlus – 25</span>{" "}
              &nbsp;|&nbsp;
              <span className="text-gold-400 font-bold">Indian BPO – 17</span>{" "}
              &nbsp;|&nbsp;
              <span className="text-gold-400 font-bold">Sutherland – 12</span>{" "}
              &nbsp;|&nbsp;
              <span className="text-gold-400 font-bold">Chrome Labs – 8</span>{" "}
              &nbsp;|&nbsp;
              <span className="text-gold-400 font-bold">Spica Labs – 9</span>{" "}
              &nbsp;|&nbsp;
              <span className="text-gold-400 font-bold">Shodhana Labs – 7</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img
                src="/assets/generated/pharmacy-lab.dim_600x400.jpg"
                alt="Pharmacy Laboratory"
                className="rounded-2xl shadow-pharma-lg w-full object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-forest-800 text-white rounded-2xl px-6 py-4 shadow-lg">
                <p className="font-display text-3xl font-bold text-gold-400">
                  2007
                </p>
                <p className="text-xs text-white/80">Year Established</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-forest-700 font-semibold text-sm uppercase tracking-widest">
                About Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-forest-950 mt-2 mb-6">
                About Santhiram College of Pharmacy
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Sri Shiridi Sai Educational Academy, Nandyal, established in
                2007, sponsors a group of educational institutions. Santhiram
                College of Pharmacy, established in 2007-08, offers B.Pharm,
                Pharm.D, and various M.Pharm specializations with
                state-of-the-art infrastructure and a vibrant learning
                environment. With a commitment to excellence, the college
                consistently delivers quality pharmaceutical education and
                service to society.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ABOUT_BADGES.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 bg-forest-50 rounded-xl p-4"
                  >
                    <span className="text-forest-700 mt-0.5 flex-shrink-0">
                      {item.icon}
                    </span>
                    <p className="text-forest-950 text-sm font-medium">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section
        id="courses"
        className="py-20 bg-gradient-to-br from-forest-950 to-navy-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest">
              Academics
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-2">
              Programmes Offered
            </h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">
              Choose from our PCI-approved programmes designed to shape the next
              generation of pharmaceutical professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {COURSES.map((course, idx) => (
              <motion.div
                key={course.id}
                data-ocid={`courses.item.${idx + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all"
              >
                <div
                  className={`bg-gradient-to-br ${course.color} p-8 text-white`}
                >
                  <div className="mb-4 text-gold-400">{course.icon}</div>
                  <h3 className="font-display text-3xl font-bold">
                    {course.title}
                  </h3>
                  <p className="text-white/80 mt-1">{course.subtitle}</p>
                  <span className="inline-block mt-3 bg-gold-500/20 border border-gold-500/40 text-gold-400 text-xs px-3 py-1 rounded-full">
                    {course.duration}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-white/70 text-sm mb-4">{course.desc}</p>
                  <p className="text-gold-400 text-xs font-semibold bg-gold-500/10 rounded-lg px-3 py-2">
                    {course.code}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-5 w-full border-white/20 text-white hover:bg-white/10"
                    onClick={scrollToApply}
                  >
                    Apply for {course.title}{" "}
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SRCP */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-forest-700 font-semibold text-sm uppercase tracking-widest">
              Our Strengths
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-forest-950 mt-2">
              Why Choose SRCP?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-2xl border-2 border-forest-100 hover:border-forest-600 hover:bg-forest-50 transition-all"
              >
                <div className="w-14 h-14 bg-forest-100 group-hover:bg-forest-700 group-hover:text-white text-forest-700 rounded-xl flex items-center justify-center mb-5 transition-all">
                  {f.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-forest-950 mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-gradient-to-br from-forest-50 to-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-forest-700 font-semibold text-sm uppercase tracking-widest">
              How to Apply
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-forest-950 mt-2">
              Admission Process
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-white rounded-2xl p-6 shadow-pharma text-center"
              >
                <div className="w-12 h-12 bg-forest-800 text-white rounded-full flex items-center justify-center text-lg font-bold font-display mx-auto mb-4">
                  {step.num}
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-6 h-0.5 bg-forest-300 z-10" />
                )}
                <h3 className="font-display font-bold text-forest-950 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              size="lg"
              onClick={scrollToApply}
              className="bg-forest-800 hover:bg-forest-700 text-white font-semibold px-10 py-6"
            >
              Start Your Application <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest">
              Alumni Stories
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-2">
              What Our Alumni Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.name}
                data-ocid={`testimonials.item.${idx + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-gold-500/30 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-forest-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gold-400 text-xs">{t.role}</p>
                    <p className="text-white/50 text-xs">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Enquiry Form */}
      <section
        id="apply"
        className="py-20 bg-gradient-to-br from-forest-950 to-forest-900"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest">
              Enroll Today
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">
              Apply for Admissions 2026-27
            </h2>
            <p className="text-white/60 mt-3">
              Fill in your details and our admissions team will get in touch
              with you.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-pharma-lg p-8 md:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  data-ocid="form.success_state"
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-forest-700" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-forest-950 mb-3">
                    Enquiry Submitted!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for your interest in Santhiram College of
                    Pharmacy. Our admissions team will contact you within 24–48
                    hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-forest-800 hover:bg-forest-700 text-white"
                  >
                    Submit Another Enquiry
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-forest-950 font-medium"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        required
                        data-ocid="form.input"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="border-gray-200 focus:border-forest-600 focus:ring-forest-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-forest-950 font-medium"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        data-ocid="form.input"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="border-gray-200 focus:border-forest-600"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="phone"
                        className="text-forest-950 font-medium"
                      >
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        required
                        data-ocid="form.input"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="border-gray-200 focus:border-forest-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="course"
                        className="text-forest-950 font-medium"
                      >
                        Course of Interest *
                      </Label>
                      <Select
                        required
                        value={form.course}
                        onValueChange={(v) =>
                          setForm({ ...form, course: v as Course })
                        }
                      >
                        <SelectTrigger
                          data-ocid="form.select"
                          className="border-gray-200"
                        >
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Course.bPharm}>
                            B.Pharm (4 Years)
                          </SelectItem>
                          <SelectItem value={Course.pharmD}>
                            Pharm.D (6 Years)
                          </SelectItem>
                          <SelectItem value={Course.mPharm}>
                            M.Pharm (2 Years)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="city"
                      className="text-forest-950 font-medium"
                    >
                      City / State
                    </Label>
                    <Input
                      id="city"
                      data-ocid="form.input"
                      placeholder="e.g., Hyderabad, Telangana"
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      className="border-gray-200 focus:border-forest-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="message"
                      className="text-forest-950 font-medium"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      data-ocid="form.textarea"
                      placeholder="Any questions or additional information..."
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="border-gray-200 focus:border-forest-600"
                    />
                  </div>

                  {submitEnquiry.isError && (
                    <div
                      data-ocid="form.error_state"
                      className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>
                        Something went wrong. Please try again or call us at +91
                        9866308468.
                      </span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    data-ocid="form.submit_button"
                    disabled={submitEnquiry.isPending}
                    className="w-full bg-forest-800 hover:bg-forest-700 text-white font-bold py-6 text-base"
                  >
                    {submitEnquiry.isPending ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Enquiry <ChevronRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-gray-400 text-xs">
                    By submitting, you agree to be contacted by our admissions
                    team regarding your enquiry.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-forest-700 font-semibold text-sm uppercase tracking-widest">
              Get In Touch
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-forest-950 mt-2">
              Contact Us
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {CONTACT_ITEMS.map((c, idx) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-forest-50 border-2 border-forest-100 hover:border-forest-600 transition-all"
              >
                <div className="w-14 h-14 bg-forest-800 text-white rounded-xl flex items-center justify-center mb-4">
                  {c.icon}
                </div>
                <h3 className="font-display font-bold text-forest-950 text-lg mb-2">
                  {c.title}
                </h3>
                {c.lines.map((l) => (
                  <p key={l} className="text-gray-600 text-sm">
                    {l}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/generated/srcp-logo-transparent.dim_200x200.png"
                  alt="SRCP Logo"
                  className="h-12 w-12 object-contain rounded-full"
                />
                <div>
                  <p className="font-display font-bold text-white text-sm leading-tight">
                    SANTHIRAM COLLEGE OF PHARMACY
                  </p>
                  <p className="text-gold-400 text-xs">
                    Nandyal, Andhra Pradesh
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Shaping the future of pharmaceutical education since 2007 with
                excellence, innovation, and integrity.
              </p>
            </div>

            <div>
              <h4 className="font-display font-bold text-gold-400 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-gold-400 mb-4">
                Programmes
              </h4>
              <ul className="space-y-2">
                {[
                  "B.Pharm (4 Years)",
                  "Pharm.D (6 Years)",
                  "M.Pharm (2 Years)",
                ].map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={scrollToApply}
                      className="text-white/60 hover:text-white text-sm transition-colors text-left"
                    >
                      {c}
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <p className="text-white/60 text-xs">
                    Counseling: APEAPCET: SRCN
                  </p>
                  <p className="text-white/60 text-xs">APPGECET: SRCN1</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/50 text-xs">
              © {new Date().getFullYear()} Santhiram College of Pharmacy. All
              rights reserved. | Affiliated to JNTUA | Approved by PCI
            </p>
            <p className="text-white/40 text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-300 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
