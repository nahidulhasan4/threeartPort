import React from 'react'
 import {motion} from 'framer-motion';
import { SectionWrapper } from '../hoc';

import{ VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css' ;
import { styles } from '../styles';
import { experiences } from '../constants';
import { textVariant } from '../utils/motion';    


const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
  contentStyle={{ background: '#1d1836', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #232631' }}
    date={experience.date}
    iconStyle={{ background: experience.iconBg }}
    icon={
      <div className='flex justify-center items-center w-full h-full ' >
        <img
          src={experience.icon}
          alt={experience.company_name}
          className='w-[60%] h-[60%] object-contain'
        />
      </div>
    }
  >
    <div>
      <h3 className='text-white text-[24px] font-bold' >{experience.title}</h3>
      <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }} >{experience.company_name}</p>
    </div>
    <ul className='mt-5 list-disc ml-5 space-y-2 ' >
      {experience.points.map((point, index) => (
        <li
          key={index}
          className='text-white-100 text-[14px] pl-1 tracking-wider '
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience = () => {
  return (
    <motion.div 
      variants={textVariant()} 
      initial="hidden"
      animate="show"
    >
      {/* NOTE: Section title - displays work experience heading */}
      <p className={styles.sectionSubText}>What I have done so far</p>
      <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      
      {/* NOTE: Vertical timeline container showing all experience cards */}
      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {/* NOTE: Map through experiences array from constants - if empty, nothing renders */}
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>    
    </motion.div>
  )
}


export default SectionWrapper(Experience, "work");