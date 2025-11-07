import { useEffect } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { ScanBarcode, X } from "lucide-react"; // You can also try: Barcode, Scan, QrCode
import styles from "./BarcodeScanner.module.scss";

interface BarcodeScannerProps {
   onScan: (barcode: string) => void;
   isScanning: boolean;
   setIsScanning: (value: boolean) => void;
}

export default function BarcodeScanner({ onScan, isScanning, setIsScanning }: BarcodeScannerProps) {
   useEffect(() => {
  if (isScanning) {
    const scanner = new Html5QrcodeScanner(
      "barcode-reader",
      {
        fps: 10,
        qrbox: { width: 300, height: 150 },
        aspectRatio: 2.0,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.QR_CODE,
        ],
        rememberLastUsedCamera: true,
        showTorchButtonIfSupported: true,
        disableFlip: false,
      },
      false // Disable verbose logging
    );

    scanner.render(
      (decodedText, decodedResult) => {
        console.log("Scanned:", decodedText, decodedResult.result.format?.formatName);
        
        onScan(decodedText);
        scanner.clear();
        setIsScanning(false);
      },
      (errorMessage) => {
        // Silent - errors are normal during scanning
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
