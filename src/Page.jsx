import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import TaskBoard from "./tasks/TaskBoard";

export default function Page() {
  return (
    <>
      <Header />
      <HeroSection />
      <TaskBoard />
      <Footer />
    </>
  );
}
