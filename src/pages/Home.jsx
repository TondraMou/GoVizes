import Banner from "../components/Banner";
import BlogsSection from "../components/BlogsSection";
import FeatureSection from "../components/FeatureSection";
import LatestVisas from "../components/LatestVisas";
import Testimonials from "../components/Testimonials";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <LatestVisas></LatestVisas>
            <BlogsSection></BlogsSection>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;