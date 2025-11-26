import React from 'react'
import { BallCanvas } from './canvas'; // বল ক্যানভাস কম্পোনেন্ট আমদানি করা
import { motion } from "framer-motion"; // অ্যানিমেশন লাইব্রেরি
import { SectionWrapper } from "../hoc"; // সেকশন র্যাপার হোক    
import { styles } from "../styles"; // গ্লোবাল স্টাইলস
import { technologies } from "../constants"; // প্রযুক্তির ডেটা
import { fadeIn, textVariant } from "../utils/motion"; // অ্যানিমেশন ভ্যারিয়েন্ট

/**
 * Tech - প্রযুক্তি সেকশন কম্পোনেন্ট
 * এটি বিভিন্ন প্রযুক্তির আইকন এবং নাম প্রদর্শন করে
 */

const Tech = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-10 overflow-hidden">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Skills</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </motion.div>
      
      <div className="mt-20 flex flex-wrap gap-10 justify-center xl:justify-start"> 
        {technologies.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default SectionWrapper(Tech, "");

// SectionWrapper - Tech কম্পোনেন্টকে একটি সেকশন র‍্যাপারে মোড়ানো হয়েছে
// প্রথম প্যারামিটার: Tech কম্পোনেন্ট
// দ্বিতীয় প্যারামিটার: "" - এটি সেকশনের আইডি হিসেবে ব্যবহৃত হয় (নেভিগেশনের জন্য)