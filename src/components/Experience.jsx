// আমদানি করা লাইব্রেরি এবং মডিউলগুলি
import React from "react";
import { motion } from "framer-motion"; // অ্যানিমেশন লাইব্রেরি
import { SectionWrapper } from "../hoc"; // সেকশন র্যাপার হোক

// ভার্টিকাল টাইমলাইন কম্পোনেন্ট আমদানি করা
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css"; // টাইমলাইন স্টাইল
import { styles } from "../styles"; // গ্লোবাল স্টাইলস
import { experiences } from "../constants"; // অভিজ্ঞতার ডেটা
import { textVariant } from "../utils/motion"; // টেক্সট অ্যানিমেশন ভ্যারিয়েন্ট

/**
 * ExperienceCard - প্রতিটি কাজের অভিজ্ঞতা কার্ড তৈরি করে
 * এটি একটি একক অভিজ্ঞতা (কোম্পানি, পদ, তারিখ ইত্যাদি) প্রদর্শন করে
 */
// ExperienceCard কম্পোনেন্ট - প্রতিটি অভিজ্ঞতা আইটেম রেন্ডার করে
// প্যারামিটার: experience অবজেক্ট (title, company_name, date, icon, iconBg, points)
const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    // টাইমলাইন কার্ডের ব্যাকগ্রাউন্ড রঙ এবং টেক্সট রঙ সেট করা হয়েছে
    contentStyle={{ background: "#1d1836", color: "#fff" }}
    // টাইমলাইন এলিমেন্টের এরো স্টাইল সেট করা
    contentArrowStyle={{ borderRight: "7px solid #232631" }}
    // কাজের তারিখ প্রদর্শন করা হয় (যেমন: "March 2020 - April 2021")
    date={experience.date}
    // আইকনের ব্যাকগ্রাউন্ড রঙ সেট করা
    iconStyle={{ background: experience.iconBg }}
    // কোম্পানির আইকন ছবি দেখায়
    icon={
      <div className="flex justify-center items-center w-full h-full ">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-[60%] h-[60%] object-contain"
        />
      </div>
    }
  >
    {/* কার্ডের মূল কন্টেন্ট - চাকরির শিরোনাম এবং কোম্পানির নাম */}
    <div>
      {/* চাকরির পদের নাম প্রদর্শন করা */}
      <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
      {/* কোম্পানির নাম প্রদর্শন করা */}
      <p
        className="text-secondary text-[16px] font-semibold"
        style={{ margin: 0 }}
      >
        {experience.company_name}
      </p>
    </div>
    {/* কাজের দায়িত্ব এবং অর্জনের তালিকা */}
    <ul className="mt-5 list-disc ml-5 space-y-2 ">
      {/* experience.points অ্যারে থেকে প্রতিটি পয়েন্ট লিস্ট আইটেম হিসেবে দেখায় */}
      {experience.points.map((point, index) => (
        <li
          key={index}
          className="text-white-100 text-[14px] pl-1 tracking-wider "
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

// Experience কম্পোনেন্ট - সম্পূর্ণ কাজের অভিজ্ঞতা সেকশন রেন্ডার করে
// এই কম্পোনেন্ট সমস্ত অভিজ্ঞতা কার্ড একটি ভার্টিকাল টাইমলাইনে প্রদর্শন করে
const Experience = () => {
  return (
    // motion.div - Framer Motion দিয়ে অ্যানিমেশন যোগ করা হয়েছে
    // variants={textVariant()} - টেক্সটের জন্য অ্যানিমেশন ভ্যারিয়েন্ট
    // initial="hidden" - শুরুতে লুকানো থাকবে
    // animate="show" - দৃশ্যমান হলে প্রদর্শিত হবে
    <motion.div variants={textVariant()} initial="hidden" animate="show">
      {/* সেকশনের শিরোনাম - "What I have done so far" টেক্সট */}
      <p className={styles.sectionSubText}>What I have done so far</p>

      {/* সেকশনের প্রধান শিরোনাম - "Work Experience." */}
      <h2 className={styles.sectionHeadText}>Work Experience.</h2>

      {/* ভার্টিকাল টাইমলাইন কন্টেইনার - সমস্ত অভিজ্ঞতা কার্ড প্রদর্শনের জন্য */}
      <div className="mt-20 flex flex-col">
        {/* VerticalTimeline - react-vertical-timeline-component থেকে */}
        {/* এটি একটি টাইমলাইন লেআউট প্রদান করে */}
        <VerticalTimeline>
          {/* experiences সেকশনগুলি ম্যাপ করা - constants/index.js থেকে আসা ডেটা */}
          {/* প্রতিটি অভিজ্ঞতার জন্য একটি ExperienceCard কম্পোনেন্ট তৈরি করা হয় */}
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </motion.div>
  );
};

// SectionWrapper - Experience কম্পোনেন্টকে একটি সেকশন র‍্যাপারে মোড়ানো হয়েছে
// প্রথম প্যারামিটার: Experience কম্পোনেন্ট
// দ্বিতীয় প্যারামিটার: "work" - এটি সেকশনের আইডি হিসেবে ব্যবহৃত হয় (নেভিগেশনের জন্য)
export default SectionWrapper(Experience, "work");
