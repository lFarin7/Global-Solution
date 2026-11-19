import { Routes, Route } from "react-router-dom";
import TabBar from "./components/TabBar.jsx";
import Home from "./pages/Home.jsx";
import Report from "./pages/Report.jsx";
import Nearby from "./pages/Nearby.jsx";
import Guide from "./pages/Guide.jsx";
import Contacts from "./pages/Contacts.jsx";


export default function App() {
  return (
    <>
      <main className="wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reportar" element={<Report />} />
          <Route path="/perto" element={<Nearby />} />
          <Route path="/guia" element={<Guide />} />
          <Route path="/contatos" element={<Contacts />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <TabBar />
    </>
  );
}
