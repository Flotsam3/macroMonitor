import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Balance from "./pages/Balance";
import Products from "./pages/Products";
import Archive from "./pages/Archive";
import Options from "./pages/Options";
import OptionsProvider from "./context/OptionContext";
import LandingPage from "./pages/LandingPage";
import ProtectedLayout from "./components/ProtectedLayout";
import { AuthProvider } from "./context/AuthContext";

function App() {
   return (
      <BrowserRouter>
         <AuthProvider>
            <OptionsProvider>
               <Routes>
                  <Route path="/" element={<LandingPage />} />

                  <Route element={<ProtectedLayout />}>
                     <Route path="/balance" element={<Balance />} />
                     <Route path="/products" element={<Products />} />
                     <Route path="/archive" element={<Archive />} />
                     <Route path="/options" element={<Options />} />
                  </Route>

                  <Route path="*" element={<Navigate to="/" replace />} />
               </Routes>
            </OptionsProvider>
         </AuthProvider>
      </BrowserRouter>
   );
}

export default App;
