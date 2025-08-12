import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import VenuesPage from "@/react-app/pages/Venues";
import VenuePage from "@/react-app/pages/Venue";
import EventsPage from "@/react-app/pages/Events";
import EventPage from "@/react-app/pages/Event";
import AdminPage from "@/react-app/pages/Admin";
import AboutPage from "@/react-app/pages/About";
import WorkWithUsPage from "@/react-app/pages/WorkWithUs";
import VideosPage from "@/react-app/pages/Videos";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="/venues/:id" element={<VenuePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work-with-us" element={<WorkWithUsPage />} />
        <Route path="/videos" element={<VideosPage />} />
      </Routes>
    </Router>
  );
}
