"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface SyncToastProps {
  isOpen?: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

export function SyncToast({
  isOpen = false,
  onClose,
  autoClose = true,
  autoCloseTime = 10000,
}: SyncToastProps) {
  const [isVisible, setIsVisible] = useState(isOpen);
  const t = useTranslations();

  useEffect(() => {
    setIsVisible(isOpen);

    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseTime, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-[80px] left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-center">
      <div className="bg-white rounded-full shadow-lg px-6 py-3 flex items-center gap-3 border border-green-100">
        <PlantAnimation />
        <span className="text-gray-700">{t("common.syncing")}</span>
      </div>
    </div>
  );
}

function PlantAnimation() {
  return (
    <div className="relative w-8 h-8">
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse"
      >
        {/* Pot */}
        <path
          d="M35 70 L65 70 L60 95 L40 95 Z"
          fill="#D2B48C"
          stroke="#A0522D"
          strokeWidth="2"
        />

        {/* Soil */}
        <path d="M38 70 L62 70 L62 75 L38 75 Z" fill="#5D4037" />

        {/* Plant Stem - Animated */}
        <path
          d="M50 70 L50 45"
          stroke="#4CAF50"
          strokeWidth="3"
          strokeLinecap="round"
          className="origin-bottom animate-[grow_2s_ease-out_infinite]"
          style={{
            animation: "grow 2s ease-out infinite",
          }}
        />

        {/* Leaves - Animated */}
        <path
          d="M50 60 C45 55, 40 55, 35 58"
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          className="origin-right animate-[wave_3s_ease-in-out_infinite]"
          style={{
            animation: "wave 3s ease-in-out infinite",
          }}
        />

        <path
          d="M50 55 C55 50, 60 50, 65 53"
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          className="origin-left animate-[wave_3s_ease-in-out_infinite_0.5s]"
          style={{
            animation: "wave 3s ease-in-out infinite 0.5s",
          }}
        />

        {/* Butterfly 1 - Animated */}
        <g
          className="animate-[fly_5s_ease-in-out_infinite]"
          style={{ animation: "fly 5s ease-in-out infinite" }}
        >
          <path
            d="M30 40 C25 35, 20 38, 25 45 C20 52, 25 55, 30 50 C35 55, 40 52, 35 45 C40 38, 35 35, 30 40 Z"
            fill="#FF9800"
            stroke="#E65100"
            strokeWidth="1"
          />
          <path d="M30 40 L30 50" stroke="#E65100" strokeWidth="1" />
        </g>

        {/* Butterfly 2 - Animated */}
        <g
          className="animate-[fly_5s_ease-in-out_infinite_1s]"
          style={{ animation: "fly 5s ease-in-out infinite 1s" }}
        >
          <path
            d="M70 30 C65 25, 60 28, 65 35 C60 42, 65 45, 70 40 C75 45, 80 42, 75 35 C80 28, 75 25, 70 30 Z"
            fill="#E91E63"
            stroke="#880E4F"
            strokeWidth="1"
          />
          <path d="M70 30 L70 40" stroke="#880E4F" strokeWidth="1" />
        </g>
      </svg>

      {/* Loader circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="h-5 w-5 text-green-500 animate-spin opacity-70" />
      </div>
    </div>
  );
}
