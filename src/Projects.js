import React from 'react'

import Filter from './Filter'
import Project from './Project'

const supervisors = [
  "Jing Sun",
  "Robert Amor",
  "Seho Kim",
  "Alex Shaw",
  "Danielle Lottridge",
  "Michael Neve",
  "Aiguo Patrick Hu",
  "Waleed Abdulla",
  "Ewan Tempero",
  "Grant Covic",
  "Jackman Lin",
  "Gerald Weber",
  "Abhisek Ukil",
  "Oliver Sinnen",
  "Avinash Malik",
  "Henry Williams",
  "Reza Shahamiri",
  "Catherine Watson",
  "Zoran Salcic",
  "Robert Sheehan",
  "Kelly Blincoe",
  "Nasser Giacaman",
  "Morteza Biglari-Abhari",
  "Miao Qiao",
  "Burkhard Wuensche",
  "Craig Sutherland",
  "Bruce Sham",
  "William Lee",
  "Dariusz Kacprzak",
  "Partha Roop",
  "Udaya Madawala",
  "Nirmal Nair",
  "Kevin I-Kai Wang",
  "Ho Seok AHN",
  "Dulsha Kularatna-Abeywardana"
]

const cosupervisors = [
  "Jing Sun",
  "Robert Amor",
  "Jesin James",
  "Seho Kim",
  "Alex Shaw",
  "Nitish Patel",
  "Danielle Lottridge",
  "Aiguo Patrick Hu",
  "Grant Covic",
  "Vicente Gonzalez",
  "Jackman Lin",
  "Catherine Watson",
  "Reza Shahamiri",
  "Jongyoon Lim",
  "Nasser Giacaman",
  "Miao Qiao",
  "Bruce MacDonald",
  "Dariusz Kacprzak",
  "Christopher Lee",
  "Yun Sing Koh",
  "Udaya Madawala",
  "Andrew Austin"
]

const specialisations = [
  "Computer Systems Engineering",
  "Civil Engineering",
  "Engineering Science",
  "Software Engineering",
  "Electrical and Electronic Engineering",
  "Mechatronics Engineering"
]

const topics = [
  "Games & Education Aids 1",
  "Parallel & Cloud Computing",
  "Robotics",
  "Health & Well-being",
  "Power Electronics & Electronics Systems",
  "Space Systems",
  "Transportation Modelling",
  "Acoustics",
  "Software Development Tools and Processes 1",
  "Games & Education Aids 2",
  "Human Computer Interactions",
  "AI & Machine learning",
  "Image & Voice Processing",
  "Green Energy Technologies",
  "Signal Processing",
  "Intelligent Systems & Industrial Informatics",
  "Smart Phone & Tablet Applications",
  "Software Development Tools and Processes 2",
  "Telecommunications",
  "Embedded Systems",
  "Control Systems",
  "Operations Research",
  "Wireless Power Technologies",
  "Optimisation",
  "Power Systems",
  "Transport Technology",
  "Radio Systems",
  "Web tools and Application",
  "Machine Learning",
  "Augmented/Virtual Reality",
  "Computer Vision"
]

export default function Projects() {
  return (
    <div>
      <Filter
        supervisors={supervisors}
        cosupervisors={cosupervisors}
        specialisations={specialisations}
        topics={topics} />
      <Project />
      <Project />
      <Project />
    </div>
  )
}