import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import FunFact from "./components/FunFact";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import {
  getSiteContent,
  getServices,
  getPortfolio,
  getTestimonials,
} from "./lib/api";

export default async function Home() {
  // Fetch all data in parallel for maximum performance
  const [siteContent, services, portfolio, testimonials] = await Promise.all([
    getSiteContent(),
    getServices(),
    getPortfolio(),
    getTestimonials(),
  ]);

  return (
    <>
      <Navbar contactInfo={siteContent?.contactInfo} />
      <main>
        <Hero data={siteContent?.hero} />
        <FunFact data={siteContent?.funFact} />
        <Services data={services} />
        <Portfolio data={portfolio} />
        <About data={siteContent?.about} />
        <Testimonials data={testimonials} />
        <Contact contactInfo={siteContent?.contactInfo} />
      </main>
      <Footer data={siteContent?.footer} contactInfo={siteContent?.contactInfo} />
    </>
  );
}
