import { animate, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '~/contexts/ThemeContext';

type SkillItem = {
  title: string;
  icon: string;
  skills: string[];
  description: string;
}

export default function RadialSkills() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [addedSkills, setAddedSkills] = useState<SkillItem[]>([]);

  const skillFlow = t('skillFlow', { returnObjects: true }) as SkillItem[];

  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (index * (360 / total)) - 90;
    const radian = angle * (Math.PI / 180);
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius
    };
  };

  const addSkills = () => {
    if (addedSkills.length < 5) setAddedSkills([...addedSkills, skillFlow[addedSkills.length]])
  }

  return (
    <section className="relative overflow-hidden" id="skills">
      <div className="max-w-4xl mx-auto px-4 text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-clip-text mb-4"
        >
          {t('skillFlowTitle')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg"
        >
          {t('skillFlowSubtitle')}
        </motion.p>
      </div>

      <div className="relative h-[800px] w-full">
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 -mt-16 -ml-16 
          rounded-full bg-amber-50 shadow-xl border-2 border-amber-100 flex 
          items-center justify-center z-10"
        >
          <button className='text-5xl absolute -z-10 cursor-pointer'>❤️</button>
          <motion.button drag={addedSkills.length === 5} onClick={addSkills}
            className={`w-24 h-24 rounded-full bg-amber-900 flex items-center
           justify-center text-amber-200 text-3xl cursor-pointer
           ${addedSkills.length < 5 && 'animate-pulse'}
           `}
            whileHover={{ scale: 1.05 }}
          >
            {addedSkills.length < 5 ? 'Click Me' : '✨'}
          </motion.button>
        </div>

        {addedSkills.map((skill, index) => {
          const pos = getPosition(index, skillFlow.length, 300);
          return (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: 1,
                x: pos.x,
                y: pos.y,
                transition: {
                  type: "spring",
                  stiffness: 50,
                  damping: 10,
                  delay: index * 0.1 + 0.4
                }
              }}
              whileHover={{ scale: 1.05 }}
              className={`absolute top-1/2 left-1/2 w-64 p-6
               rounded-xl z-10 shadow-md border -mt-24 -ml-32
               ${theme === "dark" ? "bg-gray-950" : "bg-[#e4d8b4]"}
               `}
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{skill.icon}</span>
                <h3 className="text-xl font-semibold">{skill.title}</h3>
              </div>

              <p className="text-sm mb-4">{skill.description}</p>

              <div className="flex flex-wrap gap-2">
                {skill.skills.map(item => (
                  <span
                    key={item}
                    className="px-3 py-1 text-xs font-medium border rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {addedSkills.map((_, index) => {
            const pos = getPosition(index, skillFlow.length, 200);
            return (
              <motion.line
                key={`line-${index}`}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${pos.x}px)`}
                y2={`calc(50% + ${pos.y}px)`}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="100%"
                initial={{ strokeDashoffset: "100%" }}
                animate={{ strokeDashoffset: "0%" }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                className={`${theme === "dark" ? "text-amber-200" : "text-amber-950"}`}
              />
            );
          })}
        </svg>
      </div>
    </section>
  );
}