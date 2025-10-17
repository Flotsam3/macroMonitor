import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Balance from "./pages/Balance";
import Products from "./pages/Products";
import Archive from "./pages/Archive";
import Options from "./pages/Options";
import OptionsProvider from "./context/OptionContext";
import MobileMenu from "./components/Organisms/MobileMenu";
import LandingPage from "./pages/LandingPage";

function App() {
   return (
      <>
         <BrowserRouter>
            <OptionsProvider>
               <MobileMenu />
               <Routes>
                  <Route path="/login" element={<LandingPage />}/>
                  <Route path="/balance" element={<Balance />} />
                  <Route path="/" element={<Products />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/options" element={<Options />} />
               </Routes>
            </OptionsProvider>
         </BrowserRouter>
      </>
   );
}

export default App;
