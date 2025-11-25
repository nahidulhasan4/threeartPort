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
    <div>Tech</div>
  )
}

export default Tech