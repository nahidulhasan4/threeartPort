import React, {useState, useRef} from 'react';
import {motion} from 'framer-motion';
// import emailjs from '@emailjs/browser';


/**
 * Contact - যোগাযোগ সেকশন যা ব্যবহারকারীদের মেসেজ পাঠানোর ফর্ম প্রদান করে
 */


const Contact = () => {
  return (
    <div> 
      <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Contact.</h2>
      <p className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
        I am available for freelance work.
        <br />
        Feel free to reach out to me using the form below.
      </p>  
    </div>
  )
}

export default Contact