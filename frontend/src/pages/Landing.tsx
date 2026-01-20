import { Navbar } from "@/components/LandingPage/Navbar";
import { Hero } from "@/components/LandingPage/Hero";
import { About } from "@/components/LandingPage/About";
import { Features } from "@/components/LandingPage/Features";
import { HowItWorks } from "@/components/LandingPage/HowItWorks";
import { Footer } from "@/components/LandingPage/Footer";




function LandingPage() {
    return(
        <div>
            <Navbar />
            <Hero />
            <About />
            <Features />
            <HowItWorks />
            <Footer />
            
        </div>
    )
}
export default LandingPage;