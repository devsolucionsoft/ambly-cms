import React from "react";
import styles from "./GButton.module.scss";
import { motion } from "framer-motion";

const GButton = ({ text, onClick, type, secondary }) => {
  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
      <div className={styles.btnContainer}>
        <button
          type={type}
          className={`${styles.gButton} ${secondary && styles.secodary}`}
          onClick={onClick}
        >
          {text}{" "}
        </button>
      </div>
    </motion.div>
  );
};

export default GButton;
