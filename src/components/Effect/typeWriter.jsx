import React, { useEffect, useState } from "react";
import "./effectStyle.css"

const Typewriter = ({
  strings = [],
  typingSpeed = 100,
  deletingSpeed = 50,
  pause = 1500,
}) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = strings[wordIndex % strings.length];

    let timeout;

    if (!isDeleting) {
      // Typing
      if (charIndex <= currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, charIndex));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        // Wait before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      }
    } else {
      // Deleting
      if (charIndex >= 0) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, charIndex));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        // Move to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % strings.length);
        setCharIndex(0);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    wordIndex,
    strings,
    typingSpeed,
    deletingSpeed,
    pause,
  ]);

  return (
    <span>
      {text}
      <span className="blinking-cursor">|</span>
    </span>
  );
};

export default Typewriter;
