import { useState, useEffect } from "react";
import { playLevelUpFanfare } from "@/lib/rpgSound";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onSuccess?: () => void) {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI_CODE[index].length === 1 ? KONAMI_CODE[index].toLowerCase() : KONAMI_CODE[index];

      if (key === expected) {
        index++;
        if (index === KONAMI_CODE.length) {
          setTriggered(true);
          playLevelUpFanfare();
          if (onSuccess) onSuccess();
          index = 0;
          setTimeout(() => setTriggered(false), 7000);
        }
      } else {
        // Reset or restart from beginning if first key matches
        index = key === (KONAMI_CODE[0].length === 1 ? KONAMI_CODE[0].toLowerCase() : KONAMI_CODE[0]) ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSuccess]);

  return { triggered, reset: () => setTriggered(false) };
}
