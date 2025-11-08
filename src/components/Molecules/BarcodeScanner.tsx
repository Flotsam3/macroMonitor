import { useEffect } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats, Html5QrcodeScanType } from "html5-qrcode";
import { ScanBarcode, X } from "lucide-react"; // You can also try: Barcode, Scan, QrCode
import styles from "./BarcodeScanner.module.scss";

interface BarcodeScannerProps {
   onScan: (barcode: string) => void;
   isScanning: boolean;
   setIsScanning: (value: boolean) => void;
}

const scannerStyles = `
  #barcode-reader__dashboard {
    background-color: #2d3748 !important;
    border-radius: 12px !important;
  }
  
  #barcode-reader__dashboard_section {
    color: #ffffff !important;
    font-size: 1rem !important;
  }
  
  #barcode-reader__dashboard_section_csr button {
    background: #639E61 !important;
    color: white !important;
    border: none !important;
    padding: 0.875rem 1rem !important;
    border-radius: 8px !important;
    font-size: 0.9rem !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    margin-top: 0.75rem !important;
    margin-bottom: 1rem !important;
  }
  
  #barcode-reader__dashboard_section_csr span {
    color: #ffffff !important;
    font-size: 1rem !important;
  }
  
  #barcode-reader__camera_selection {
    background-color: #374151 !important;
    color: white !important;
    border: 1px solid #4b5563 !important;
    padding: 0.625rem !important;
    border-radius: 6px !important;
  }
`;

export default function BarcodeScanner({ onScan, isScanning, setIsScanning }: BarcodeScannerProps) {
   useEffect(() => {
      const styleEl = document.createElement("style");
      styleEl.innerHTML = scannerStyles;
      document.head.appendChild(styleEl);

      return () => {
         document.head.removeChild(styleEl);
      };
   }, []);

   useEffect(() => {
      if (isScanning) {
         const scanner = new Html5QrcodeScanner(
            "barcode-reader",
            {
               fps: 20,
               qrbox: function (viewfinderWidth, viewfinderHeight) {
                  // Responsive box that adapts to screen
                  const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
                  return {
                     width: minEdge * 0.8,
                     height: minEdge * 0.4, // Wide for barcodes
                  };
               },
               aspectRatio: 2.0,
               // Only the most common formats (order matters - most common first!)
               formatsToSupport: [
                  Html5QrcodeSupportedFormats.EAN_13, // Most common in Europe
                  Html5QrcodeSupportedFormats.UPC_A, // Most common in USA
                  Html5QrcodeSupportedFormats.EAN_8,
                  Html5QrcodeSupportedFormats.CODE_128,
                  Html5QrcodeSupportedFormats.QR_CODE,
               ],
               rememberLastUsedCamera: true,
               showTorchButtonIfSupported: true,
               supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
               disableFlip: true, // Disable flip for faster processing
            },
            false // Verbose logging OFF for speed
         );

         scanner.render(
            (decodedText) => {
               onScan(decodedText);
               scanner.clear();
               setIsScanning(false);
            },
            () => {
               // Silent - no logging for speed
            }
         );

         return () => {
            scanner.clear().catch(console.error);
         };
      }
   }, [isScanning, onScan, setIsScanning]);

   return (
      <>
         {/* Icon-only button */}
         <button
            className={styles.scanIconButton}
            onClick={() => setIsScanning(true)}
            title="Scan barcode to auto-fill product data"
            type="button"
            aria-label="Scan barcode"
         >
            <ScanBarcode size={24} />
         </button>

         {/* Scanner Modal */}
         {isScanning && (
            <div className={styles.scannerModal}>
               <div className={styles.scannerOverlay} onClick={() => setIsScanning(false)} />
               <div className={styles.scannerContent}>
                  <div className={styles.scannerHeader}>
                     <h3>Scan Barcode</h3>
                     <button
                        onClick={() => setIsScanning(false)}
                        className={styles.closeButton}
                        aria-label="Close scanner"
                        type="button"
                     >
                        <X size={24} />
                     </button>
                  </div>
                  <div id="barcode-reader" className={styles.reader}></div>
                  <p className={styles.instruction}>Position the barcode within the frame</p>
               </div>
            </div>
         )}
      </>
   );
}
