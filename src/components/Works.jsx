import React from "react";
import { motion } from "framer-motion"; // অ্যানিমেশন লাইব্রেরি
import { SectionWrapper } from "../hoc"; // সেকশন র্যাপার হোক
import { Tilt } from "react-tilt"; // টিল্ট এফেক্টের জন্য লাইব্রেরি
import { github } from "../assets"; // গিথাব আইকন
import { styles } from "../styles"; // গ্লোবাল স্টাইলস
import { projects } from "../constants"; // প্রকল্পের ডেটা (projects অ্যারে)
import { fadeIn, textVariant } from "../utils/motion"; // অ্যানিমেশন ভ্যারিয়েন্ট

/**
 * Works - কাজের সেকশন কম্পোনেন্ট
 * এটি বিভিন্ন প্রকল্প বা কাজের প্রদর্শন করে
 */

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      {/* NOTE: motion.div এর জন্য initial এবং animate প্রপ যোগ করা হয়েছে
          যাতে টেক্সট অ্যানিমেশন সঠিকভাবে কাজ করে। SectionWrapper এর সাথে
          ভিতরের এনিমেশন সমন্বয় করতে এগুলো প্রয়োজন। */}
      <motion.div variants={textVariant()} initial="hidden" animate="show">
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      {/*
        NOTE: পূর্বে এখানে শুধু `flex` ব্যবহার করা ছিল, ফলে মোবাইল/ছোট স্ক্রিনে
        প্রকল্প কার্ডগুলো অনুভূমিকভাবে এক সারিতে চলে যেতে পারত এবং ভিউপোর্টের
        বাইরে চলে যাওয়ার কারণে দেখা যাচ্ছিল না। এটি ঠিক করতে responsive
        layout যোগ করা হয়েছে: ছোট স্ক্রিনে `flex-col`, বড় স্ক্রিনে `flex-row`.
      */}
      <div className="w-full flex flex-col">
        {/* NOTE: motion.p এ initial এবং animate যোগ করা হয়েছে যাতে ডেসক্রিপশন টেক্সট
            সঠিকভাবে fade-in হয়। */}
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          animate="show"
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
        <div className="mt-8 md:mt-20 flex flex-wrap gap-7">
          {projects.map((project, index) => (
            // NOTE: এখানে মূল সমস্যা ছিল - অতিরিক্ত অদ্ভুত ক্যারেক্টার (`Aå`) যা
            // JSX/প্রপ-স্প্রেডিং অংশে ঢুকে গিয়েছিল এবং সারা ব্লকটিকে সঠিকভাবে
            // কম্পাইল হতে দেয়নি -> ফলশ্রুতিতে কার্ডগুলো দেখা যেত না (বা পেজ ব্ল্যাক)।
            // সমাধান: সেই অতিরিক্ত ক্যারেক্টার সরিয়ে সাধারণভাবে প্রপ স্প্রেড করা হয়েছে
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

// Wrap Works with SectionWrapper and provide the section id 'work'
// সেকশনের id খালি রাখলে hash-span এর negative margin কারণে কন্টেন্ট লুকিয়ে যায়।
// এই সমস্যা ঠিক করতে একটি valid id 'work' দেওয়া হয়েছে যা navLinks-এর সাথে ম্যাচ করে।
const WorksSection = SectionWrapper(Works, "work");
export default WorksSection;
