import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser"; // NOTE: এটি default export, named import নয়
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { toast } from "react-toastify"; // ব্যবহারকারীর জন্য পপ-আপ নোটিফিকেশন
import { SectionWrapper } from "../hoc"; // ঠিকভাবে HOC নাম (capital S) ব্যবহার করা প্রয়োজন
import { EarthCanvas } from "./canvas";

/**
 * Contact - যোগাযোগ সেকশন যা ব্যবহারকারীদের মেসেজ পাঠানোর ফর্ম প্রদান করে
 */

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Ensure emailjs is initialized (public key). This helps when the
    // send method is called without the user param or if init wasn't
    // called elsewhere in the app.
    try {
      // send returns a Promise
      emailjs
        .send(
          "service_3we9ssj",
          "template_hrlng7p",
          {
            from_name: form.name,
            to_name: "Nahid Hasan",
            from_email: form.email,
            to_email: "nahidhasan4836@gmail.com",
            message: form.message,
          },
          "TDNg6Ix4xCJrX9Hwq"
        )
        .then(() => {
          setLoading(false);
          toast.success(
            "Thank you. I will get back to you as soon as possible."
          );
          setForm({ name: "", email: "", message: "" });
        })
        .catch((error) => {
          setLoading(false);
          console.error("EmailJS error:", error);
          toast.error("Ahh, something went wrong. Please try again.");
        });
    } catch (err) {
      setLoading(false);
      console.error("Unexpected error sending email:", err);
      toast.error("Unexpected error. Please try again later.");
    }
  };

  // Initialize emailjs once (helps if not initialized elsewhere).
  useEffect(() => {
    try {
      emailjs.init("TDNg6Ix4xCJrX9Hwq");
    } catch (err) {
      // init may throw if key is invalid; log for debugging
      console.warn("emailjs.init warning:", err);
    }
  }, []);

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        {/* এখানে একটি 3D মডেল বা অন্য কোন ভিজ্যুয়াল উপাদান যোগ করা যেতে পারে */}
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

// সমস্যা এবং সমাধান নোট (বাংলা):
// 1. প্রথমে এখানে HOC-র নাম ভুলভাবে small-case `sectionWrapper` ব্যবহার করা হচ্ছিল,
//    ফলে এটি undefined হয়ে যাচ্ছিল এবং সেকশন রেন্ডার হচ্ছিল না — পরিবর্তে
//    সঠিকভাবে `SectionWrapper` (capital S) ইমপোর্ট এবং ব্যবহার করা হয়েছে।
// 2. `react-toastify` ইমপোর্ট আগে কমেন্ট আউট ছিল; আমরা এটি সক্রিয় করেছি যাতে
//    ফর্ম সাবমিশন সফল/অসফল হওয়ার সময় ব্যবহারকারীকে ফিডব্যাক দেখানো যায়।
// 3. অপ্রয়োজনীয়/ভুল ইমপোর্ট (যেমন `div` from framer-motion/client) সরানো হয়েছে।

const ContactSection = SectionWrapper(Contact, "contact");
export default ContactSection;
