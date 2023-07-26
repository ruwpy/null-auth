import QrScanner from "qr-scanner";
import { useEffect, useState } from "react";

export const useScanner = (
  ref?: HTMLVideoElement | null,
  onSuccess?: (res: QrScanner.ScanResult) => void,
  onError?: () => void
) => {
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const [isScanning, setScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);

  const startScan = () => {
    scanner?.start();
    setScanning(true);
  };
  const stopScan = () => {
    scanner?.stop();
    setScanning(false);
  };

  useEffect(() => {
    const checkIfHasCamera = async () => {
      const hasCamera = await QrScanner.hasCamera().then((res) => res);
      setHasCamera(hasCamera);
    };

    if (ref && onSuccess) {
      const scanner = new QrScanner(ref, onSuccess, {
        onDecodeError: onError,
      });
      setScanner(scanner);
    }

    checkIfHasCamera();

    return () => scanner?.destroy();
  }, [ref]);

  return { scanner, hasCamera, startScan, stopScan, isScanning };
};
