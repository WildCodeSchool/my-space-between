import { useEffect } from "react";

interface UseShakeOptions {
  threshold?: number;
  timeout?: number;
  onShake: () => void;
}

export function useShake({
  threshold = 15,
  timeout = 1000,
  onShake,
}: UseShakeOptions) {
  useEffect(() => {
    alert(
      `useShake hook initialized with options: threshold=${threshold}, timeout=${timeout}`
    );

    let lastTime = new Date().getTime();
    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastZ: number | null = null;

    const handleMotion = (e: DeviceMotionEvent) => {
      alert(`lets go`);

      if (!e.accelerationIncludingGravity) {
        alert("No accelerationIncludingGravity data available.");
        return;
      }

      const { x, y, z } = e.accelerationIncludingGravity;
      if (x === null || y === null || z === null) return;

      alert(`Motion detected: x=${x}, y=${y}, z=${z}`);

      const currentTime = new Date().getTime();
      const timeDifference = currentTime - lastTime;

      if (timeDifference > timeout) {
        const deltaX = Math.abs((lastX ?? 0) - x);
        const deltaY = Math.abs((lastY ?? 0) - y);
        const deltaZ = Math.abs((lastZ ?? 0) - z);

        alert(
          `Delta values: deltaX=${deltaX}, deltaY=${deltaY}, deltaZ=${deltaZ}`
        );

        if (Math.max(deltaX, deltaY, deltaZ) > threshold) {
          alert("Shake detected!");
          onShake();
          lastTime = currentTime;
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    const enableMotion = async () => {
      alert("Attempting to enable motion detection...");
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function"
      ) {
        try {
          alert("Requesting DeviceMotionEvent permission...");
          const permission = await (
            DeviceMotionEvent as any
          ).requestPermission();
          alert(`Permission status: ${permission}`);
          if (permission === "granted") {
            alert("Permission granted. Adding event listener.");
            window.addEventListener("devicemotion", handleMotion, false);
          } else {
            alert("Permission denied for DeviceMotion.");
          }
        } catch (error) {
          alert(`Error requesting DeviceMotion permission: ${error}`);
        }
      } else {
        alert("DeviceMotion permission not required on this device.");
        window.addEventListener("devicemotion", handleMotion, false);
      }
    };

    enableMotion();

    return () => {
      alert("Removing devicemotion event listener.");
      window.removeEventListener("devicemotion", handleMotion, false);
    };
  }, [threshold, timeout, onShake]);
}
