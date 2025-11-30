import React from "react";
import { motion } from "framer-motion"; // অ্যানিমেশন লাইব্রেরি
import { SectionWrapper } from "../hoc"; // সেকশন র্যাপার হোক
import { fadeIn, textVariant } from "../utils/motion"; // অ্যানিমেশন ভ্যারিয়েন্ট
import { styles } from "../styles"; // গ্লোবাল স্টাইলস
import { testimonials } from "../constants"; // টেস্টিমোনিয়াল ডেটা

/**
 * Feedbacks - গ্রাহক/ক্লায়েন্টদের রিভিউ এবং টেস্টিমোনিয়াল সেকশন প্রদর্শন করে
 * এটি একটি সুন্দর কার্ড লেআউটে সমস্ত টেস্টিমোনিয়াল দেখায়
 */
const Feedbacks = () => {
  return (
    // বাহ্যিক কন্টেইনার - গাঢ় ব্যাকগ্রাউন্ড এবং রাউন্ড কর্নার
    <div className="mt-12 bg-black-100 rounded-[20px]">
      {/* অভ্যন্তরীণ কন্টেইনার - টার্শিয়ারি ব্যাকগ্রাউন্ড এবং প্যাডিং */}
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        {/* সেকশন হেডার - অ্যানিমেশন সহ */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>

        {/* টেস্টিমোনিয়াল কার্ডের কন্টেইনার - ফ্লেক্সিবল লেআউটে সমস্ত কার্ড প্রদর্শন করে */}
        <div className="mt-20 pb-14 flex flex-wrap gap-7 justify-center">
          {/* testimonials অ্যারে ম্যাপ করে প্রতিটি টেস্টিমোনিয়ালের জন্য একটি কার্ড তৈরি করে */}
          {testimonials.map((testimonial, index) => (
            // motion.div - প্রতিটি কার্ড অ্যানিমেট হয় (fade-in ইফেক্ট সহ)
            <motion.div
              key={testimonial.name}
              variants={fadeIn("up", "spring", index * 0.5, 0.75)}
              className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
            >
              {/* উদ্ধৃতি চিহ্ন */}
              <p className="text-white font-black text-[48px]">"</p>
              <div className="mt-1">
                {/* টেস্টিমোনিয়ালের মূল পাঠ্য */}
                <p className="text-white tracking-wider text-[18px]">
                  {testimonial.testimonial}
                </p>

                {/* কার্ডের নিচে - ব্যক্তির নাম, পদবী, কোম্পানি এবং ছবি */}
                <div className="mt-7 flex justify-between items-center gap-1">
                  {/* ব্যক্তির তথ্য সেকশন */}
                  <div className="flex-1 flex flex-col">
                    {/* নাম (নীল গ্র্যাডিয়েন্ট সহ @) */}
                    <p className="text-white font-medium text-[16px]">
                      <span className="blue-text-gradient">@</span>{" "}
                      {testimonial.name}
                    </p>
                    {/* পদবী এবং কোম্পানি */}
                    <p className="mt-1 text-secondary text-[12px]">
                      {testimonial.designation} of {testimonial.company}
                    </p>
                  </div>
                  {/* ব্যক্তির প্রোফাইল ছবি */}
                  <img
                    src={testimonial.image}
                    alt={`feedback_by-${testimonial.name}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// NOTE: SectionWrapper empty id দিলে hash-span এর negative margin কারণে সেকশন লুকিয়ে যায়।
// এটি ঠিক করতে একটি valid id "feedback" দেওয়া হয়েছে।
// Feedbacks সেকশনকে SectionWrapper এ মোড়ানো হয়েছে নেভিগেশন এবং অ্যানিমেশনের জন্য।
const FeedbacksSection = SectionWrapper(Feedbacks, "feedback");
export default FeedbacksSection;
