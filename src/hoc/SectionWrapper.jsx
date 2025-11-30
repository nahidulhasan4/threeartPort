import React from "react";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";

const SectionWrapper = (Component, idName) => {
  function WrappedSection() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.55 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        id={idName || undefined}
      >
        {/* render offset anchor only when an idName is provided */}
        {idName ? (
          <span className="hash-span" id={idName}>
            &nbsp;
          </span>
        ) : null}
        <Component />
      </motion.section>
    );
  }

  WrappedSection.displayName = `SectionWrapper(${
    Component.displayName || Component.name || "Component"
  })`;
  return WrappedSection;
};

export default SectionWrapper;
