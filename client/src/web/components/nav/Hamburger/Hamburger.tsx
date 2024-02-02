import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Hamburger.css";
import NavModal from "./NavModal";

const Hamburger: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div className="navbar-small">
      <motion.div
        className="hamburger"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => (modalOpen ? close() : open())}
      >
        <div className={modalOpen ? "line-top spin" : "line-top"}></div>
        <div className={modalOpen ? "line-bottom spin" : "line-bottom"}></div>
      </motion.div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <NavModal modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </div>
  );
};

export default Hamburger;
