export interface Course {
  id: string;
  title: string;
  description?: string;
}

export interface CourseCategory {
  id: string;
  title: string;
  icon: string;
  iconBgColor: string;
  courses: Course[];
}

export const courseCategories: CourseCategory[] = [
  {
    id: "lifeguard",
    title: "Lifeguard Certification Courses",
    icon: "https://i.imgur.com/cakFGEn.jpg",
    iconBgColor: "bg-primary",
    courses: [
      {
        id: "lifeguard-shallow-pool",
        title: "Shallow Pool Lifeguard (max depth 5 ft.)",
        description: "This certification course will prepare you to oversee a swimming pool with a maximum depth of 5 feet. The course covers essential rescue techniques, safety protocols, and emergency response procedures specifically tailored for shallow water environments. Perfect for those working at water parks, hotel pools, and facilities without deep water."
      },
      {
        id: "lifeguard-swimming-pool",
        title: "Swimming Pool Lifeguard (max depth 12 ft.)",
        description: "This certification will equip you to supervise a swimming pool of 12-feet depth or less. It's important to note that approximately 99% of all swimming pools worldwide are 12-feet deep or less, making this our most sought-after lifeguard training course."
      },
      {
        id: "lifeguard-deep-pool",
        title: "Deep Pool Lifeguard (max depth 20 ft.)",
        description: "This comprehensive certification course will prepare you to supervise a swimming pool with a maximum depth of 20-feet. Nearly all swimming pools around the world fall within this depth range, giving you extensive employment opportunities in a variety of aquatic facilities."
      },
      {
        id: "lifeguard-waterfront",
        title: "Waterfront Lifeguard",
        description: "This specialized certification course will prepare you to supervise swimming pools of 20-feet depth or less, as well as non-surf waterfront swimming areas, such as lakes, ponds, rivers, quarries, and bays."
      },
      {
        id: "lifeguard-youth-camp",
        title: "Youth Camp Lifeguard",
        description: "This adaptable certification course will train you to supervise a youth camp swimming pool of 12-feet depth or less. Upon request, this course can be easily upgraded to prepare you for supervising a youth camp facility swimming pool of 20-feet depth or less and/or youth camp waterfront environments."
      },
      {
        id: "lifeguard-water-park",
        title: "Water Park Lifeguard",
        description: "This specialized certification course will prepare you to supervise a swimming pool of 12-feet depth or less, as well as common water park attraction rides. The training provides comprehensive knowledge for ensuring safety in the unique environment of water parks with their specialized attractions and higher visitor volume."
      },
      {
        id: "lifeguard-all-specialties",
        title: "All Specialties Lifeguard",
        description: "This comprehensive certification program provides training for all lifeguard specialties, including shallow pool, swimming pool, deep pool, waterfront, youth camp, and water park environments. This all-inclusive certification offers maximum employment flexibility across all aquatic facility types."
      },
      {
        id: "junior-lifeguard",
        title: "Junior Lifeguard",
        description: "This program introduces young participants (ages 10-15) to the fundamentals of water safety, basic rescue techniques, and the responsibilities of professional lifeguards. The Junior Lifeguard course builds confidence, teamwork skills, and a foundation for possible future certification as a professional lifeguard."
      },
      {
        id: "lifeguard-renewal",
        title: "Lifeguard Renewal / Recertification",
        description: "Keep your lifeguard certification current with this renewal course that covers updates in lifeguarding protocols and techniques. Required every two years to maintain valid certification status and ensure your skills remain sharp for emergency situations."
      },
      {
        id: "lifeguard-shallow-pool-renewal",
        title: "Shallow Pool Lifeguard Renewal / Recertification",
        description: "This recertification course updates your Shallow Water Lifeguard credentials and refreshes your knowledge of the latest safety protocols and rescue techniques for shallow water environments. Required every two years to maintain certification validity."
      },
      {
        id: "lifeguard-swimming-pool-renewal",
        title: "Swimming Pool Lifeguard Renewal / Recertification",
        description: "This renewal course refreshes your Swimming Pool Lifeguard skills and updates your knowledge of the latest techniques and protocols for pool environments up to 12 feet in depth. Required every two years to maintain certification validity."
      },
      {
        id: "lifeguard-deep-pool-renewal",
        title: "Deep Pool Lifeguard Renewal / Recertification",
        description: "This recertification course updates your Deep Pool Lifeguard credentials and ensures you maintain proficiency in all aspects of lifeguarding for facilities with depths up to 20 feet. Required every two years to maintain certification validity."
      },
      {
        id: "lifeguard-waterfront-renewal",
        title: "Waterfront Lifeguard Renewal / Recertification",
        description: "Update your Waterfront Lifeguard certification with this renewal course covering the latest techniques and protocols for natural water environments. This recertification ensures you maintain current skills for effectively managing safety at lakes, rivers, and beaches."
      },
      {
        id: "lifeguard-youth-camp-renewal",
        title: "Youth Camp Lifeguard Renewal / Recertification",
        description: "This renewal course refreshes your Youth Camp Lifeguard certification and updates your knowledge on the latest safety protocols specific to camp aquatic environments. Required every two years to maintain certification validity."
      },
      {
        id: "lifeguard-water-park-renewal",
        title: "Water Park Lifeguard Renewal / Recertification",
        description: "This recertification course updates your Water Park Lifeguard credentials and refreshes your knowledge of the latest safety protocols for water park attractions and pools. Required every two years to maintain certification validity."
      },
      {
        id: "lifeguard-all-specialties-renewal",
        title: "All Specialties Lifeguard Renewal / Recertification",
        description: "This comprehensive renewal course updates your All Specialties Lifeguard certification and ensures you maintain proficiency across all aquatic facility types. Required every two years to maintain certification validity."
      }
    ]
  },
  {
    id: "lifeguard-instructor",
    title: "Lifeguard Instructor Certification Courses",
    icon: "https://i.imgur.com/9Aw9QLi.jpg",
    iconBgColor: "bg-primary-dark",
    courses: [
      {
        id: "lifeguard-instructor",
        title: "Lifeguard Instructor",
        description: "The Lifeguard Instructor Certification enables you to teach lifeguard certification courses to new candidates. This program focuses on teaching methodologies, assessment techniques, and program administration. You'll learn to effectively train the next generation of professional lifeguards."
      },
      {
        id: "lifeguard-instructor-recert",
        title: "Lifeguard Instructor Renewal / Recertification",
        description: "This renewal course allows current Lifeguard Instructors to update their certification and learn about the latest techniques and protocols in lifeguard training. Required every two years to maintain your ability to certify lifeguards and keep your teaching skills current."
      },
      {
        id: "lifeguard-instructor-trainer",
        title: "Lifeguard Instructor Trainer",
        description: "The Lifeguard Instructor Trainer certification allows you to train and certify new Lifeguard Instructors, representing the highest level of lifeguard education leadership. This elite certification enables you to shape lifeguard education standards and training methodologies."
      },
      {
        id: "lifeguard-instructor-trainer-recert",
        title: "Lifeguard Instructor Trainer Renewal / Recertification",
        description: "Maintain your Lifeguard Instructor Trainer certification with this renewal course, which covers updated training methodologies and organizational standards. This recertification is required every two years to keep your credentials active."
      }
    ]
  },

  {
    id: "swim-instructor",
    title: "Water Safety Swim Instructor Certification Courses",
    icon: "https://i.imgur.com/daaMvmD.jpg",
    iconBgColor: "bg-primary",
    courses: [
      {
        id: "basic-water-safety",
        title: "Basic Water Safety",
        description: "The Lifeguard Training Academy Basic Water Safety course trains candidates to promote and enforce safe behavior in aquatic environments. Offered in all 50 states and over 30 countries, this certification helps reduce drowning incidents worldwide by teaching proper response to aquatic emergencies. Candidates must be at least 15 years old and will receive training from authorized Lifeguard Training Academy Water Safety Swim Instructors."
      },
      {
        id: "basic-water-safety-recert",
        title: "Basic Water Safety Renewal / Recertification",
        description: "When your Basic Water Safety certification is 12 months old, it's time to renew. The recertification process follows the same format as your initial certification: complete the online Home-Study Course, then attend a 1-day Instructor-Led Training with your local Instructor. Because you already have knowledge from your original certification, the recertification process takes significantly less time. We recommend registering at least 30 days before your current certification expires to prevent any gaps in coverage and maintain liability protection for yourself and your employer (if applicable). For complete details, refer to the Basic Water Safety course information."
      },
      {
        id: "water-safety-swim-instructor",
        title: "Water Safety Swim Instructor",
        description: "Our Water Safety Swim Instructor certification provides comprehensive training on how to teach swimming to people of all ages, with emphasis on proper technique and water safety education. This certification enables you to work at aquatic facilities as a qualified swim instructor."
      },
      {
        id: "water-safety-swim-instructor-recert",
        title: "Water Safety Swim Instructor Renewal / Recertification",
        description: "This renewal course ensures that Water Safety Swim Instructors stay current with the latest teaching methodologies and safety practices in swim instruction. The recertification is required every two years to maintain your teaching credentials and stay updated with evolving standards."
      }
    ]
  },
  {
    id: "swim-instructor-trainer",
    title: "Water Safety Swim Instructor Trainer Certification Courses",
    icon: "https://i.imgur.com/R2XaEM5.jpg",
    iconBgColor: "bg-primary-dark",
    courses: [
      {
        id: "water-safety-swim-instructor-trainer",
        title: "Water Safety Swim Instructor Trainer",
        description: "This certification prepares you to train and certify new Water Safety Swim Instructors, focusing on advanced teaching methodologies and assessment techniques. You'll gain the skills to mentor new instructors and help shape the next generation of water safety professionals."
      },
      {
        id: "water-safety-swim-instructor-trainer-recert",
        title: "Water Safety Swim Instructor Trainer Renewal / Recertification",
        description: "Maintain your Instructor Trainer certification with this renewal course that covers the latest updates in swim instruction teaching methodologies. This course ensures you remain current with evolving safety standards and teaching best practices."
      },
      {
        id: "water-safety-swim-instructor-trainer-director",
        title: "Water Safety Swim Instructor Trainer Director",
        description: "The Water Safety Swim Instructor Trainer Director certification qualifies professionals to certify Water Safety Swim Instructor Trainers. This high-level qualification requires a prerequisite Water Safety Swim Instructor Trainer certification and is ideal for organizations with multiple locations across different regions. This specialized role helps businesses manage training and compliance for their network of trainers, providing both financial benefits and enhanced quality control."
      },
      {
        id: "water-safety-swim-instructor-trainer-director-recert",
        title: "Water Safety Swim Instructor Trainer Director Recertification / Renewal",
        description: "This recertification course renews the Water Safety Swim Instructor Trainer Director qualification, allowing professionals to continue certifying Water Safety Swim Instructor Trainers. The renewal process includes updated materials and a condensed training format, requiring less time than the original certification while ensuring continued compliance with current standards and best practices."
      }
    ]
  },
  {
    id: "cpr",
    title: "CPR & First Aid Certification Courses",
    icon: "https://i.imgur.com/k9b2jwM.jpg",
    iconBgColor: "bg-primary",
    courses: [
      {
        id: "cpr-first-aid",
        title: "CPR & First Aid",
        description: "Our CPR & First Aid certification provides comprehensive training in life-saving techniques, including CPR, AED use, and basic first aid for a variety of emergency situations. This widely-recognized certification is essential for anyone responsible for the safety of others."
      },
      {
        id: "cpr-first-aid-recert",
        title: "CPR & First Aid Renewal / Recertification",
        description: "This renewal course refreshes CPR and First Aid skills and knowledge, updating providers on the latest techniques and protocols. The recertification is typically required every two years to ensure responders maintain current life-saving skills."
      },
      {
        id: "bloodborne-pathogens",
        title: "Bloodborne Pathogens",
        description: "This program on bloodborne pathogens (BBP) educates participants on health issues by identifying and managing infectious agents in human blood. This instruction is mandated yearly across certain industries by the U.S. Occupational and Safety Health Administration (OSHA). We demonstrate methods to recognize BBPs and take appropriate action to assist those in need without putting oneself at risk. The program details exposure control plans, protective strategies, and proper handling of biological materials to safeguard healthcare workers."
      },
      {
        id: "oxygen-administrator",
        title: "Oxygen Administrator",
        description: "The Oxygen Administrator certification equips professionals with the knowledge and skills to administer oxygen correctly and safely in emergency situations. The course covers equipment selection, handling procedures, and administration techniques for various scenarios. This critical certification is essential for boat captains, scuba diving professionals, athletic event organizers, and anyone seeking to provide this potentially life-saving intervention."
      }
    ]
  },
  {
    id: "cpr-instructor",
    title: "CPR & First Aid Instructor Certification Courses",
    icon: "https://i.imgur.com/k9b2jwM.jpg",
    iconBgColor: "bg-primary-dark",
    courses: [
      {
        id: "cpr-first-aid-instructor",
        title: "CPR & First Aid Instructor",
        description: "The CPR & First Aid Instructor certification enables you to teach CPR and First Aid courses to others, focusing on effective teaching methods and assessment techniques. This certification allows you to help build a safer community by training others in life-saving skills."
      },
      {
        id: "cpr-first-aid-instructor-recert",
        title: "CPR & First Aid Instructor Renewal / Recertification",
        description: "Keep your instructor certification current with this renewal course that covers updates in CPR and First Aid protocols and teaching methodologies. Recertification is required every two years to maintain active instructor status and teach the latest life-saving techniques."
      },
      {
        id: "oxygen-administrator-instructor",
        title: "Oxygen Administrator Instructor",
        description: "This certification qualifies you to train and certify others as Oxygen Administrators. Ideal for employers needing to certify multiple staff members and safety training centers serving diverse clients, this course prepares you to effectively teach the proper handling, storage, and administration of oxygen in emergency situations. Candidates must be at least 18 years old and hold a current Oxygen Administrator certification."
      },
      {
        id: "oxygen-administrator-instructor-recert",
        title: "Oxygen Administrator Instructor Recertification",
        description: "This recertification course renews an Oxygen Administrator Instructor's credentials after 12 months. Requirements include having taught at least one certification course during the previous certification period and paying the recertification fee. If this teaching requirement hasn't been met, instructors must complete a process similar to the original certification but with a shorter timeframe due to prior experience."
      }
    ]
  },
  {
    id: "pool-operator",
    title: "Certified Pool Operator Certification Courses",
    icon: "https://i.imgur.com/CP8REHO.jpg",
    iconBgColor: "bg-blue-400",
    courses: [
      {
        id: "certified-pool-operator",
        title: "Certified Pool Operator",
        description: "The Certified Pool Operator course provides comprehensive training in pool operation, maintenance, water chemistry, and safety regulations to ensure safe and clean aquatic facilities. This certification is recognized nationwide and meets local health department requirements."
      }
    ]
  }
];
