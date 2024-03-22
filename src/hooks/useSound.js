import { useEffect, useState } from "react";

export function useSound() {
  const [sound, setSound] = useState(() => {
    const soundStorage = localStorage.getItem("sound");
    return soundStorage ? JSON.parse(soundStorage) : true;
  });

  const updateSound = () => setSound(!sound);

  useEffect(() => {
    localStorage.setItem("sound", JSON.stringify(sound));
  }, [sound]);

  return { sound, updateSound };
}
