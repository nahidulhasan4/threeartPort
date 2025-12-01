import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { toast } from 'react-toastify';
import {sectionWrapper} from '../hoc';
import emailjs from '@emailjs/browser';
import { div } from 'framer-motion/client';
import { EarthCanvas } from './canvas';


/**
 * Contact - যোগাযোগ সেকশন যা ব্যবহারকারীদের মেসেজ পাঠানোর ফর্ম প্রদান করে
 */


const Contact = () => {
const formRef = useRef();
const [form, setForm] = useState({
  name: '',
  email: '',
  message: '',
});
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  emailjs.send(
    'service_id',
    'template_id',
    {
      from_name: form.name,
      to_name: 'Your Name',
      from_email: form.email,
      to_email: '
      message: form.message,
    },
    'public_key'
  )
  .then(() => {
    setLoading(false);
    toast.success('Thank you. I will get back to you as soon as possible.');

    setForm({
      name: '',
      email: '',
      message: '',
    });
  }, (error) => {
    setLoading(false);
    console.error(error);
    toast.error('Ahh, something went wrong. Please try again.');
  });
};    



  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
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
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        {/* এখানে একটি 3D মডেল বা অন্য কোন ভিজ্যুয়াল উপাদান যোগ করা যেতে পারে */}
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default sectionWrapper(Contact, "contact");