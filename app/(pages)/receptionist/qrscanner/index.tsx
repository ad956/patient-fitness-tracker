import React, { useEffect, useState } from "react";
import QrScanner from "qr-scanner";

interface QRScannerProps {}

interface QRScannerState {
  scanner: QrScanner | null;
  isScanning: boolean;
  scannedData: string;
}

// const QRScanner: React.FC<QRScannerProps> = () => {
//   const [scannerState, setScannerState] = useState<QRScannerState>({
//     scanner: null,
//     isScanning: false,
//     scannedData: "",
//   });

//   useEffect(() => {
//     const initScanner = async () => {
//       try {
//         const videoElement = document.createElement("video");
//         const newScanner = new QrScanner(videoElement, (data: string) =>
//           onScan({
//             data,
//             cornerPoints: [],
//           })
//         );
//         await newScanner.start();
//         setScannerState({ ...scannerState, scanner: newScanner });
//       } catch (error) {
//         console.error("Error initializing scanner:", error);
//       }
//     };

//     const onScan = (result: QrScanner.ScanResult) => {
//       setScannerState({
//         ...scannerState,
//         isScanning: false,
//         scannedData: result.data,
//       });
//     };
//     initScanner();

//     return () => {
//       if (scannerState.scanner) {
//         scannerState.scanner.destroy();
//       }
//     };
//   }, [scannerState]);

//   useEffect(() => {
//     if (scannerState.scanner) {
//       if (scannerState.isScanning) {
//         scannerState.scanner.start();
//       } else {
//         scannerState.scanner.stop();
//       }
//     }

//     return () => {
//       if (scannerState.scanner) {
//         scannerState.scanner.stop();
//       }
//     };
//   }, [scannerState.isScanning]);

//   return (
//     <div>
//       {scannerState.isScanning ? (
//         <p>Scanning...</p>
//       ) : (
//         <button
//           onClick={() => setScannerState({ ...scannerState, isScanning: true })}
//         >
//           Start Scanning
//         </button>
//       )}
//       {scannerState.scannedData && (
//         <div>
//           <p>Scanned Data:</p>
//           <pre>{scannerState.scannedData}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

const QRScanner: React.FC<QRScannerProps> = () => {
  return <h1>HELLO</h1>;
};
export default QRScanner;
