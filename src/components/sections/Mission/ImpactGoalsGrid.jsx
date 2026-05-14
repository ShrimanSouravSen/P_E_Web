import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  ChartNoAxesCombined,
  HeartPulse,
  Leaf,
  Landmark,
  UsersRound,
} from 'lucide-react'

const MotionDiv = motion.div

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const shineVariants = {
  hidden: {
    x: '-120%',
    opacity: 0,
  },
  show: {
    x: '140%',
    opacity: [0, 0.32, 0],
    transition: {
      duration: 0.85,
      ease: 'easeOut',
      delay: 0.18,
    },
  },
}

const iconShakeVariants = {
  idle: {
    rotate: 0,
    x: 0,
  },
  hover: {
    rotate: [0, -4, 4, -3, 3, 0],
    x: [0, -1, 1, -1, 1, 0],
    transition: {
      duration: 1.25,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 0.1,
    },
  },
}

const hoverShineVariants = {
  idle: {
    x: '-135%',
    y: 0,
    opacity: 0,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    x: '135%',
    y: 0,
    opacity: [0, 0.4, 0.18],
    transition: {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      times: [0, 0.45, 1],
    },
  },
}

const cardIcons = [
  Leaf,
  UsersRound,
  ChartNoAxesCombined,
  Landmark,
  BriefcaseBusiness,
  HeartPulse,
]

function CardIcon({ index, className = 'h-10 w-10 text-white md:h-10 md:w-10' }) {
  const Icon = cardIcons[index]

  return (
    <Icon
      className={className}
      strokeWidth={2.6}
      aria-hidden="true"
    />
  )
}

export default function ImpactGoalsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const boxes = [
    {
      background: 'linear-gradient(135deg, #2E7D32 0%, #43A047 100%)',
      text: 'GREEN INDUSTRY',
    },
    {
      background: 'linear-gradient(135deg, #0D3B66 0%, #1E5A8A 100%)',
      text: 'QUALITY OF LIFE',
    },
    {
      background: 'linear-gradient(135deg, #0F7C8A 0%, #1CA7B8 100%)',
      text: 'ECONOMIC GROWTH',
    },
    {
      background: 'linear-gradient(135deg, #0B6E7A 0%, #1597A5 100%)',
      text: 'CAPITAL DEVELOPMENT',
    },
    {
      background: 'linear-gradient(135deg, #388E3C 0%, #66BB6A 100%)',
      text: 'EMPLOYMENT CREATION',
    },
    {
      background: 'linear-gradient(135deg, #0B3C6D 0%, #1F5F9B 100%)',
      text: 'HEALTH & WELLNESS',
    },
  ]

  return (
    <MotionDiv
      className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {boxes.map((box, index) => (
        <MotionDiv
          key={box.text}
          className="relative h-[90px] overflow-hidden md:h-[105px]"
          variants={cardVariants}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            background: box.background,
          }}
          aria-label={`Impact goal box ${index + 1}`}
        >
          <MotionDiv
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent"
            variants={shineVariants}
          />
          <MotionDiv
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[55%] -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[1px]"
            variants={hoverShineVariants}
            initial="idle"
            animate={hoveredIndex === index ? 'hover' : 'idle'}
          />
          <MotionDiv
            className="pointer-events-none absolute left-0 top-0 z-30 h-px w-[55%] bg-gradient-to-r from-transparent via-white/90 to-transparent"
            variants={hoverShineVariants}
            initial="idle"
            animate={hoveredIndex === index ? 'hover' : 'idle'}
          />
          <MotionDiv
            className="pointer-events-none absolute bottom-0 left-0 z-30 h-px w-[55%] bg-gradient-to-r from-transparent via-white/90 to-transparent"
            variants={hoverShineVariants}
            initial="idle"
            animate={hoveredIndex === index ? 'hover' : 'idle'}
          />
          <div className="flex h-full w-full py-3">
            <div
              className="flex h-full w-[35%] items-center justify-center p-1 md:p-2"
              style={{
                borderRight: '1px solid #ffffff',
                boxSizing: 'border-box',
              }}
            >
              <MotionDiv
                variants={iconShakeVariants}
                initial="idle"
                animate={hoveredIndex === index ? 'hover' : 'idle'}
              >
                <CardIcon index={index} />
              </MotionDiv>
            </div>
            <div
              className="relative flex h-full w-[65%] flex-col justify-between overflow-hidden p-1 text-white"
              style={{
                borderLeft: '1px solid #ffffff',
                boxSizing: 'border-box',
              }}
            >
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-end opacity-5">
                <CardIcon index={index} className="h-16 w-16 translate-x-5 text-black md:h-20 md:w-20 md:translate-x-6" />
              </div>
              <div className="relative z-10 flex flex-1 items-start px-1">
                <span className="text-3xl font-bold leading-none">
                  0{index + 1}
                </span>
              </div>
              <div className="relative z-10 flex flex-1 items-end px-1">
                <span className="text-sm font-bold uppercase leading-tight">
                  {box.text}
                </span>
              </div>
            </div>
          </div>
        </MotionDiv>
      ))}
    </MotionDiv>
  )
}
