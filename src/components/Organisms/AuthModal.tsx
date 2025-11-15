import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../Atoms/Button";
import FormField from "../Molecules/FormField";
import styles from "./AuthModal.module.scss";

type AuthModalProps = {
   isOpen: boolean;
   onClose: () => void;
   initialMode?: "login" | "register";
};

export default function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
   const navigate = useNavigate();
   const { login, register } = useAuth();
   const [mode, setMode] = useState<"login" | "register">(initialMode);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
   });
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);

   if (!isOpen) return null;

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
         if (mode === "login") {
            await login(formData.email, formData.password);
         } else {
            await register(formData.email, formData.password, formData.name);
         }

         console.log("Authentication successful");

         onClose();
         navigate("/products");
      } catch (err: any) {
         console.error("Auth error:", err);

         // Extract actual error message from API response
         let errorMessage = "Authentication failed. Please try again.";

         if (err.response?.data?.message) {
            // Most common: { message: "Invalid credentials" }
            errorMessage = err.response.data.message;
         } else if (err.response?.data?.error) {
            // Alternative: { error: "User not found" }
            errorMessage = err.response.data.error;
         } else if (err.message) {
            // Fallback: err.message
            errorMessage = err.message;
         }

         setError(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
      if (error) setError(null);
   };

   const toggleMode = () => {
      setMode(mode === "login" ? "register" : "login");
      setError(null);
      setFormData({ name: "", email: "", password: "" });
   };

   return (
      <div className={styles.overlay}>
         <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={onClose}>
               ✕
            </button>

            <div className={styles.header}>
               <h2 className={styles.title}>
                  {mode === "login" ? "Welcome Back!" : "Create Account"}
               </h2>
               <p className={styles.subtitle}>
                  {mode === "login"
                     ? "Login to continue tracking your nutrition"
                     : "Start your nutrition tracking journey today"}
               </p>
            </div>

            <form onSubmit={handleSubmit}>
               <div className={styles.errorContainer}>
                  {error && <div className={styles.error}>{error}</div>}
               </div>

               {mode === "register" && (
                  <FormField
                     label="Full Name"
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     required
                     disabled={loading}
                  />
               )}
               <FormField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
               />
               <FormField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  minLength={6}
               />

               <div className={styles.submitBtn}>
                  <Button
                     label={loading ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
                     type="submit"
                     appearance="typeA"
                     disabled={loading}
                  />
               </div>
            </form>

            <div className={styles.toggle}>
               <p>
                  {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                  <span onClick={toggleMode}>{mode === "login" ? "Sign Up" : "Login"}</span>
               </p>
            </div>
         </div>
      </div>
   );
}
