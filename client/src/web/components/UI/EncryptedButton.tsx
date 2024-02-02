import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface EncryptButtonProps {
  text: string;
  route: any;
}

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";
// const CHARS = "abcdefghijklmnopqrstuvwxyz";

const EncryptButton: React.FC<EncryptButtonProps> = ({
  text: TARGET_TEXT,
  route,
}) => {
  const intervalRef = useRef<number | null>(null);

  const [text, setText] = useState<string>(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = window.setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    window.clearInterval(intervalRef.current || undefined);

    setText(TARGET_TEXT);
  };

  return (
    <motion.span
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className=" relative overflow-hidden"
    >
      <Link
        className="relative z-10 flex items-center gap-2"
        to={route}
        aria-label={text}
      >
        <span>{text}</span>
      </Link>
    </motion.span>
  );
};

export default EncryptButton;
