import Navbar from "../components/Navbar";
import Hero from "../components//Home/Hero";
import HowItWorksSection from "../components/Home/HowItWorksSection";
import WhyRoomMatchSection from "../components/Home/WhyRoomMatchSection";
import CtaBanner from "../components/Home/CtaBanner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorksSection />
      <WhyRoomMatchSection />
      <CtaBanner />
      <Footer />
    </>
  );
}
