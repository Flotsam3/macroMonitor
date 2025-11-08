import { toast, ToastOptions } from "react-toastify";

const isMobile = window.innerWidth <= 768;

const mobileToastConfig: ToastOptions = {
  position: "top-center",
  autoClose: 2000, // Shorter on mobile
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false, // Less annoying on mobile
  draggable: true,
  theme: "colored",
  style: {
    fontSize: '0.85rem',
    padding: '0.625rem 0.875rem',
    minHeight: 'auto',
    borderRadius: '6px',
    maxWidth: '90vw',
  }
};

const desktopToastConfig: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

export const showToast = {
  success: (message: string) => {
    toast.success(message, isMobile ? mobileToastConfig : desktopToastConfig);
  },
  error: (message: string) => {
    toast.error(message, isMobile ? mobileToastConfig : desktopToastConfig);
  },
  info: (message: string) => {
    toast.info(message, isMobile ? mobileToastConfig : desktopToastConfig);
  },
  warning: (message: string) => {
    toast.warning(message, isMobile ? mobileToastConfig : desktopToastConfig);
  },
};