export interface CourseDescriptionDetails {
  includes: string[];
  prerequisites: string[];
  objectives: string[];
  certificationRequirements: string[];
  purchase: string[];
}

export interface CourseDescription {
  description: string;
  details: CourseDescriptionDetails;
}

export const courseDescriptions: Record<string, CourseDescription> = {
  "basic-water-safety": {
    description: "The Lifeguard Training Academy Basic Water Safety course is designed to enhance public aquatic safety and reduce drowning incidents worldwide. Offered in all 50 states and over 30 countries, this essential certification trains candidates to promote, practice, and enforce safe behavior in aquatic environments and respond appropriately to water emergencies.",
    details: {
      includes: [
        "Basic water safety principles and practices",
        "Emergency response techniques for aquatic environments",
        "Safety promotion and hazard identification skills",
        "Comprehensive training materials and certification"
      ],
      prerequisites: [
        "Minimum 10 years of age before completion of the certification course"
      ],
      objectives: [
        "Competently promote, practice, and enforce safe behavior in and around aquatic environments",
        "Safely respond to aquatic emergencies",
        "Understand the critical importance of protecting non-swimmers, weak swimmers, children, and at-risk individuals in aquatic settings",
        "Apply water safety principles in various aquatic environments"
      ],
      certificationRequirements: [
        "Complete the Lifeguard Training Academy Basic Water Safety Home-Study Course (including textbooks, videos, exams, and forms)",
        "Successfully participate in a Basic Water Safety In-Person Training Session led by an authorized Lifeguard Training Academy Water Safety Swim Instructor",
        "Submit the Lifeguard Training Academy Basic Water Safety Certification Request Form with appropriate signatures"
      ],
      purchase: [
        "Lifeguard Training Academy Basic Water Safety Manual",
        "Lifeguard Training Academy Basic Water Safety Exam",
        "Lifeguard Training Academy Basic Water Safety Certification Request Form with Skills Verification Checklist",
        "Official Lifeguard Training Academy certification"
      ]
    }
  },
  
  "basic-water-safety-recert": {
    description: "The Basic Water Safety Recertification Course is designed for individuals seeking to renew their Basic Water Safety certification. This renewal process maintains and refreshes your water safety knowledge and skills, ensuring continued competence in aquatic safety practices.",
    details: {
      includes: [
        "Updated basic water safety principles and practices",
        "Refresher on emergency response techniques", 
        "Review of safety promotion and hazard identification skills",
        "Renewed certification materials"
      ],
      prerequisites: [
        "Current or recently expired Basic Water Safety certification (within 30 days)",
        "Minimum 10 years of age"
      ],
      objectives: [
        "Maintain competency in promoting and enforcing safe behavior in aquatic environments",
        "Review and refresh skills for responding to aquatic emergencies",
        "Update knowledge of current water safety practices and standards",
        "Ensure continuous protection of swimmers and aquatic facility patrons"
      ],
      certificationRequirements: [
        "Complete the Lifeguard Training Academy Basic Water Safety Home-Study Course",
        "Attend a 1-day Instructor-Led Training with an authorized Lifeguard Training Academy Instructor",
        "Submit the properly signed Certification Request Form verifying successful completion"
      ],
      purchase: [
        "Home-Study Course materials",
        "Access to updated training content",
        "Instructor-Led Training session",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  },
  "lifeguard-shallow-pool": {
    description: "This certification course will prepare you to oversee a swimming pool with a maximum depth of 5 feet. It's worth noting that more than 80% of swimming pools have a maximum depth of 5 feet or less. For expanded job possibilities, you might consider upgrading to the Lifeguard-Swimming Pool (max 12' depth) certification, though be aware that this requires meeting more challenging swimming requirements.",
    details: {
      includes: [
        "Lifeguard-Shallow Pool (max depth 5 ft.)",
        "CPR – BLS for the Healthcare Provider",
        "First Aid"
      ],
      prerequisites: [
        "15 Years of age or older (with minors consent form for those under 18)",
        "Ability to swim 100 meters (125 yards) without stopping (no time limit)",
        "Ability to tread water for three minutes",
        "Ability to dive to a depth of one and a half meters (5-feet)"
      ],
      objectives: [
        "Safely supervise a swimming pool (max depth 5 ft.)",
        "Identify and appropriately respond to a victim in distress in and around the water",
        "Recognize and appropriately respond to hazards in and around the water, and take the appropriate action to safeguard patrons, while taking into account the Lifeguard's personal ability, environmental factors, and all prevailing safety procedures",
        "Effectively perform all the basic water assists and rescues for a swimming pool with a maximum depth of 5-feet"
      ],
      certificationRequirements: [
        "Purchase this Home-Study Course from Lifeguard Training Academy",
        "Successfully complete this Home-Study Course",
        "Attend and successfully complete instructor-led training with a Lifeguard Training Academy certified Instructor"
      ],
      purchase: [
        "Lifeguard-Shallow Pool (max depth 5 ft.)",
        "CPR – BLS for Healthcare Provider",
        "First Aid"
      ]
    }
  },

  "lifeguard-swimming-pool": {
    description: "This certification will equip you to supervise a swimming pool of 12-feet depth or less. It's important to note that approximately 99% of all swimming pools worldwide are 12-feet deep or less, making this our most sought-after lifeguard training course.",
    details: {
      includes: [
        "Lifeguard-Shallow Pool (max depth 5 ft.)",
        "Lifeguard-Swimming Pool (max depth 12 ft.)",
        "CPR – BLS for the Healthcare Provider",
        "First Aid"
      ],
      prerequisites: [
        "15 Years of age or older (with minors consent form for those under 18)",
        "Ability to swim 300 meters (325 yards) without stopping (there is no time limit)",
        "Ability to tread water for three minutes",
        "Ability to dive to a depth of four meters (12-feet)"
      ],
      objectives: [
        "Safely supervise a swimming pool (max depth 12 ft.)",
        "Identify and appropriately respond to a victim in distress in and around the water",
        "Recognize and appropriately respond to hazards in and around the water, and take the appropriate action to safeguard patrons, while taking into account the Lifeguard's personal ability, environmental factors, and all prevailing safety procedures",
        "Effectively perform all the basic water assists and rescues for a swimming pool with a maximum depth of 12-feet"
      ],
      certificationRequirements: [
        "Purchase this Home-Study Course from Lifeguard Training Academy",
        "Successfully complete this Home-Study Course",
        "Attend and successfully complete instructor-led training with a Lifeguard Training Academy certified Instructor"
      ],
      purchase: [
        "Lifeguard-Shallow Pool (max depth 5 ft.)",
        "Lifeguard-Swimming Pool (max depth 12 ft.)",
        "CPR – BLS for Healthcare Provider",
        "First Aid"
      ]
    }
  },

  "lifeguard-deep-pool": {
    description: "This comprehensive certification course will prepare you to supervise a swimming pool with a maximum depth of 20-feet. Nearly all swimming pools around the world fall within this depth range, giving you extensive employment opportunities in a variety of aquatic facilities.",
    details: {
      includes: [
        "Lifeguard-Shallow Pool (max depth 5 ft.)",
        "Lifeguard-Swimming Pool (max depth 12 ft.)",
        "Lifeguard-Deep Pool (max depth 20 ft.)",
        "CPR – BLS for Healthcare Provider",
        "First Aid"
      ],
      prerequisites: [
        "15 Years of age or older (with minors consent form for those under 18)",
        "Ability to swim 500 meters (550 yards) without stopping (there is no time limit)",
        "Ability to tread water for five minutes",
        "Ability to dive to a depth of six meters (20-feet)"
      ],
      objectives: [
        "Safely supervise a swimming pool with a maximum depth of 20 feet",
        "Identify and appropriately respond to a victim in distress in and around the water",
        "Recognize and appropriately respond to hazards in and around the water, and take the appropriate action to safeguard patrons, while taking into account the Lifeguard's personal ability, environmental factors, and all prevailing safety procedures",
        "Effectively perform all the basic water assists and rescues for a swimming pool with a maximum depth of 20-feet"
      ],
      certificationRequirements: [
        "Purchase this Home-Study Course from Lifeguard Training Academy",
        "Successfully complete this Home-Study Course",
        "Attend and successfully complete instructor-led training with a Lifeguard Training Academy certified Instructor"
      ],
      purchase: [
        "Lifeguard-Shallow Pool (max depth 5 ft.)",
        "Lifeguard-Swimming Pool (max depth 12 ft.)",
        "Lifeguard-Deep Pool (max depth 20 ft.)",
        "CPR – BLS for Healthcare Provider",
        "First Aid"
      ]
    }
  },

  "lifeguard-waterfront": {
    description: "This specialized certification course will prepare you to supervise swimming pools of 20-feet depth or less, as well as non-surf waterfront swimming areas, such as lakes, ponds, rivers, quarries, and bays. While this course doesn't include surf training, it's often required by employers of oceanfront/surf Lifeguards as a prerequisite, with additional oceanfront/surf training provided by the employer.",
    details: {
      includes: [
        "Lifeguard-Shallow Pool (max depth 5 ft.)",
        "Lifeguard-Swimming Pool (max depth 12 ft.)",
        "Lifeguard-Deep Pool (max depth 20 ft.)",
        "Lifeguard-Waterfront",
        "CPR – BLS for Healthcare Provider",
        "First Aid"
      ],
      prerequisites: [
        "15 Years of age or older (with minors consent form for those under 18)",
        "Ability to swim 500 meters (550 yards) without stopping (there is no time limit)",
        "Ability to tread water for five minutes",
        "Ability to dive to a depth of six meters (20-feet)"
      ],
      objectives: [
        "Safely supervise a waterfront swimming area (max 20' depth)",
        "Identify and appropriately respond to a victim in distress in and around the water",
        "Recognize and appropriately respond to hazards in and around the water, and take the appropriate action to safeguard patrons, while taking into account the Lifeguard's personal ability, environmental factors, and all prevailing safety procedures",
        "Effectively perform all of the basic water assists and rescues for a swimming pool with a maximum depth of 20-feet and waterfront swimming area"
      ],
      certificationRequirements: [
        "Purchase this Home-Study Course from Lifeguard Training Academy",
        "Successfully complete this Home-Study Course",
        "Attend and successfully complete instructor-led training with a Lifeguard Training Academy certified Instructor"
      ],
      purchase: [
        "Lifeguard-Shallow Pool (max depth 5 ft.)",
        "Lifeguard-Swimming Pool (max depth 12 ft.)",
        "Lifeguard-Deep Pool (max depth 20 ft.)",
        "Lifeguard-Waterfront",
        "CPR – BLS for Healthcare Provider",
        "First Aid"
      ]
    }
  },

  "lifeguard-youth-camp": {
    description: "This adaptable certification course will train you to supervise a youth camp swimming pool of 12-feet depth or less. Upon request, this course can be easily upgraded to prepare you for supervising a youth camp facility swimming pool of 20-feet depth or less and/or youth camp waterfront (non-surf) environment. This certification may also qualify you to apply for some positions as an oceanfront beach/surf Lifeguard, although additional employer-provided training may be required.",
    details: {
      includes: [
        "Lifeguard-Shallow Pool (max depth 5 ft.)",
        "Lifeguard-Swimming Pool (max depth 12 ft.)",
        "Lifeguard-Swimming Pool (max depth 20 ft.)",
        "Lifeguard-Youth Camp",
        "CPR – BLS for Healthcare Provider",
        "First Aid"
      ],
      prerequisites: [
        "15 Years of age or older (with minors consent form for those under 18)",
        "Ability to swim 500 meters (555 yards) without stopping (there is no time limit)",
        "Ability to tread water for five minutes",
        "Ability to dive to a depth of six meters (20-feet)"
      ],
      objectives: [
        "Safely supervise a youth camp swimming environment (pool and waterfront) with a maximum depth of 20-feet",
        "Identify and appropriately respond to a victim in distress in and around the water",
        "Recognize and appropriately respond to hazards in and around the water, and take the appropriate action to safeguard patrons, while taking into account the Lifeguard's personal ability, environmental factors, and all prevailing safety procedures",
        "Effectively perform all the basic water assists and rescues for a youth camp swimming environment (pool and waterfront) with a maximum depth of 20-feet"
      ],
      certificationRequirements: [
        "Purchase this Home-Study Course from Lifeguard Training Academy",
        "Successfully complete this Home-Study Course",
        "Attend and successfully complete instructor-led training with a Lifeguard Training Academy certified Instructor"
      ],
      purchase: [
        "Lifeguard-Shallow Pool (max depth 5 ft.)",
        "Lifeguard-Swimming Pool (max depth 12 ft.)",
        "Lifeguard-Youth Camp",
        "CPR – BLS for Healthcare Provider",
        "First Aid"
      ]
    }
  },

  "lifeguard-water-park": {
    description: "This specialized certification course will prepare you to supervise a swimming pool of 12-feet depth or less, as well as common water park attraction rides. The training provides comprehensive knowledge for ensuring safety in the unique environment of water parks with their specialized attractions and higher visitor volume.",
    details: {
      includes: [
        "Lifeguard-Shallow Pool (max depth 5 ft.)",
        "Lifeguard-Swimming Pool (max depth 12 ft.)",
        "Lifeguard-Water Park",
        "CPR – BLS for Healthcare Provider",
        "First Aid"
      ],
      prerequisites: [
        "15 Years of age or older (with minors consent form for those under 18)",
        "Ability to swim 500 meters (550 yards) without stopping (there is no time limit)",
        "Ability to tread water for five minutes",
        "Ability to dive to a depth of four meters (12-feet)"
      ],
      objectives: [
        "Safely supervise a swimming pool (max 12' depth)",
        "Identify and appropriately respond to a victim in distress in and around the water",
        "Recognize and appropriately respond to hazards in and around the water, and take the appropriate action to safeguard patrons, while taking into account the Lifeguard's personal ability, environmental factors, and all prevailing safety procedures",
        "Effectively perform all the basic water assist and rescues for a swimming pool with a maximum depth of 12-feet, and common water park attraction rides"
      ],
      certificationRequirements: [
        "Purchase this Home-Study Course from Lifeguard Training Academy",
        "Successfully complete this Home-Study Course",
        "Attend and successfully complete instructor-led training with a Lifeguard Training Academy certified Instructor"
      ],
      purchase: [
        "Lifeguard-Shallow Pool (max depth 5 ft.)",
        "Lifeguard-Swimming Pool (max depth 12 ft.)",
        "Lifeguard-Water Park",
        "CPR – BLS for Healthcare Provider",
        "First Aid"
      ]
    }
  },

  "lifeguard-all-specialties": {
    description: "This comprehensive certification program provides training for all lifeguard specialties, including shallow pool, swimming pool, deep pool, waterfront, youth camp, and water park environments. This all-inclusive certification offers maximum employment flexibility across all aquatic facility types.",
    details: {
      includes: [
        "Lifeguard certification for all specialties: shallow pool, swimming pool, deep pool, waterfront, youth camp, and water park",
        "CPR - BLS for Healthcare Provider certification",
        "First Aid certification",
        "AED certification",
        "All course materials and certification fees"
      ],
      prerequisites: [
        "Minimum 15 years of age (with parent/guardian consent for minors)",
        "Ability to swim 500 meters (550 yards) without stopping",
        "Ability to tread water for 5 minutes",
        "Ability to dive to a depth of 20 feet and retrieve an object",
        "Ability to perform surface dives and specialized rescue techniques"
      ],
      objectives: [
        "Safely supervise all types of aquatic environments and facilities",
        "Identify and respond to victims in distress across various water environments",
        "Perform specialized rescue techniques for all types of aquatic settings",
        "Administer CPR, First Aid, and AED in aquatic emergency situations",
        "Recognize and respond to hazards specific to each type of aquatic environment"
      ],
      certificationRequirements: [
        "Complete the comprehensive Home-Study Course (online components)",
        "Attend and successfully complete extended in-person training sessions",
        "Pass both written and practical skills assessments for all specialties",
        "Demonstrate proficiency in all required rescue techniques for each specialty"
      ],
      purchase: [
        "Complete online Home-Study course with digital materials for all specialties",
        "Extended in-person training with certified Lifeguard Training Academy Instructor",
        "All certifications across all lifeguard specialties"
      ]
    }
  },

  "water-safety-swim-instructor": {
    description: "The purpose of the Lifeguard Training Academy Water Safety Swim Instructor course is to encourage better public safety in and around aquatic environments and to create competent Swim Instructors to teach the public how to swim well enough to ensure their own safety in the water. This certification is offered in all 50 states in the United States and over 30 countries worldwide, meaningfully helping reduce the number of drowning deaths globally.",
    details: {
      includes: [
        "Basic Water Safety training",
        "Six stages of progressive swimming lessons training",
        "Mechanics of major swim strokes training",
        "Aquatic survival skills training",
        "Swim lesson organization and management"
      ],
      prerequisites: [
        "Minimum 16 years of age before completion of the certification course"
      ],
      objectives: [
        "Competently promote, practice, and enforce safe behavior in and around aquatic environments",
        "Safely and competently teach six incrementally progressive stages of basic learn-to-swim lessons",
        "Master the mechanics of each major swim stroke, aquatic survival skills, and associated practice drills",
        "Function as a safe, responsible, and accountable Instructor",
        "Organize and conduct swim lessons with attention to safety, effectiveness, and time-management",
        "Effectively communicate students' swimming ability progress",
        "Understand the importance of guarding the safety of swim students in your care"
      ],
      certificationRequirements: [
        "Complete the Lifeguard Training Academy Home-Study Course (textbooks, videos, lesson plans, exams, and forms)",
        "Complete an In-Person Training Session conducted by an authorized Instructor Trainer",
        "Complete the Certification Request Form, signed by the candidate and authorized Instructor Trainer"
      ],
      purchase: [
        "Basic Water Safety Manual",
        "Basic Water Safety Exam",
        "Water Safety Swim Instructor Manual",
        "Water Safety Swim Instructor Lesson Plans",
        "Water Safety Swim Instructor Exam",
        "Water Safety Swim Instructor Certification Request Form with Skills Verification Checklist"
      ]
    }
  },

  "water-safety-swim-instructor-recert": {
    description: "This course is designed for Water Safety Swim Instructors who need to recertify or renew their certification. The process is identical to the original certification where once the online Home-Study Course is complete, the candidate meets with their local Instructor Trainer for the 1-day Instructor-Led Training. However, the time required to complete the recertification is much less since you already have a solid foundation of knowledge from your previous certification.",
    details: {
      includes: [
        "Refresher training on Basic Water Safety",
        "Review of six stages of progressive swimming lessons",
        "Updates on swim instruction best practices",
        "Recertification of aquatic survival skills"
      ],
      prerequisites: [
        "Current or recently expired Water Safety Swim Instructor certification",
        "Minimum 16 years of age"
      ],
      objectives: [
        "Refresh knowledge of safe practices in aquatic environments",
        "Update skills for teaching progressive swimming lessons",
        "Review current swim instruction techniques and methodologies",
        "Maintain qualification as a certified Swim Instructor"
      ],
      certificationRequirements: [
        "Complete the Home-Study Course refresher materials",
        "Complete a condensed In-Person Training Session with an authorized Instructor Trainer",
        "Complete and submit the Certification Request Form"
      ],
      purchase: [
        "Water Safety Swim Instructor Recertification Materials",
        "Access to updated teaching methodologies and safety standards",
        "Certification renewal for an additional period"
      ]
    }
  },

  "water-safety-swim-instructor-trainer": {
    description: "In order for a Water Safety Swim Instructor to receive their certification, they must attend Instructor-Led training conducted by someone with a higher level of training. The Water Safety Swim Instructor Trainer is qualified to certify individuals or groups of Water Safety Swim Instructors. This certification is particularly beneficial for businesses that certify multiple Swim Instructors regularly, allowing them to reduce training costs by establishing their own In-House Instructor Trainers.",
    details: {
      includes: [
        "Advanced Water Safety training methodologies",
        "Instructor assessment and evaluation techniques",
        "Training program development and management",
        "Advanced teaching methodology"
      ],
      prerequisites: [
        "Current Water Safety Swim Instructor certification",
        "Minimum 18 years of age",
        "Demonstrated teaching experience"
      ],
      objectives: [
        "Train and certify Water Safety Swim Instructors",
        "Evaluate instructor candidates' skills and knowledge",
        "Develop comprehensive training programs for swim instructors",
        "Maintain quality and consistency in swimming instruction standards",
        "Promote water safety education at an organizational level"
      ],
      certificationRequirements: [
        "Complete the Instructor Trainer Home-Study Course",
        "Attend and successfully complete Instructor-Led training with an authorized Instructor Trainer Director",
        "Demonstrate ability to effectively train and assess instructor candidates"
      ],
      purchase: [
        "Water Safety Swim Instructor Trainer Manual",
        "Assessment materials for instructor candidates",
        "Program development resources",
        "Certification authority for Water Safety Swim Instructors"
      ]
    }
  },

  "water-safety-swim-instructor-trainer-recert": {
    description: "This course is designed for Water Safety Swim Instructor Trainers who need to recertify or renew their certification. The recertification process is identical to the original certification where the candidate completes the online Home-Study Course and meets with their local Instructor Trainer Director for the 1-day Instructor-Led Training. The time required is less for recertification since you already have a foundation of knowledge from your initial certification.",
    details: {
      includes: [
        "Updates on instructor training methodologies",
        "Refresher on assessment techniques",
        "Review of program management best practices",
        "Updates on water safety standards and teaching techniques"
      ],
      prerequisites: [
        "Current or recently expired Water Safety Swim Instructor Trainer certification",
        "Minimum 18 years of age"
      ],
      objectives: [
        "Maintain qualification to train and certify Water Safety Swim Instructors",
        "Update knowledge of current assessment practices",
        "Review instructor training methodologies",
        "Stay current with industry standards and best practices"
      ],
      certificationRequirements: [
        "Complete the Home-Study Course refresher materials",
        "Attend a condensed Instructor-Led training session with an authorized Instructor Trainer Director",
        "Complete and submit necessary recertification documentation"
      ],
      purchase: [
        "Water Safety Swim Instructor Trainer Recertification Materials",
        "Access to updated teaching and assessment methodologies",
        "Continued certification authority for an additional period"
      ]
    }
  },

  "water-safety-swim-instructor-trainer-director": {
    description: "In order for a Water Safety Swim Instructor Trainer to receive their certification, they must attend the Instructor-Led training by someone with a higher level of training than themselves. The aquatics professional who is qualified to certify either an individual, or a group of Water Safety Swim Instructor Trainers is none other than the Water Safety Swim Instructor Trainer Director. This means the prerequisite to become a Water Safety Swim Instructor Trainer Director is of course the Water Safety Swim Instructor Trainer course. Oftentimes businesses with multiple locations in different counties, states, and even different countries benefit greatly from a financial and a control standpoint by having one Instructor Trainer Director to manage all the training and compliance for their network of Water Safety Swim Instructor Trainers. This certification is not for small businesses with only one aquatic facility and only a few Swim Instructors working for them.",
    details: {
      includes: [],
      prerequisites: [
        "Current Water Safety Swim Instructor Trainer certification"
      ],
      objectives: [],
      certificationRequirements: [
        "Complete the Water Safety Swim Instructor Trainer Director Home-Study Course",
        "Attend Instructor-Led Training with an authorized Instructor Trainer Director Manager",
        "Submit completed certification documentation"
      ],
      purchase: [
        "Water Safety Swim Instructor Trainer Director certification materials",
        "Qualification to certify Water Safety Swim Instructor Trainers",
        "Official Lifeguard Training Academy certification"
      ]
    }
  },

  "water-safety-swim-instructor-trainer-director-recert": {
    description: "This course is designed for Water Safety Swim Instructor Trainer Directors who need to recertify or renew their certification. The process to recertify is identical to the original certification process where once the online Home-Study Course is complete, the candidate meets with their local Instructor Trainer Director Manager for the 1-day Instructor-Led Training. The only difference is the amount of time required to complete the recertification process is much less for a recertification course since you already have a solid foundation of knowledge from your previous certification. It is recommended that you register for your recertification course no less than 30 days prior to your current certification expiration date to avoid any lapses in coverage and liability protection for yourself and your employer (if you have one).",
    details: {
      includes: [],
      prerequisites: [
        "Current or recently expired Water Safety Swim Instructor Trainer Director certification"
      ],
      objectives: [],
      certificationRequirements: [
        "Complete the Water Safety Swim Instructor Trainer Director Recertification Home-Study Course",
        "Attend condensed Instructor-Led Training with an authorized Instructor Trainer Director Manager",
        "Submit completed recertification documentation"
      ],
      purchase: [
        "Water Safety Swim Instructor Trainer Director recertification materials",
        "Continued qualification to certify Water Safety Swim Instructor Trainers",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  },

  "cpr-first-aid": {
    description: "This comprehensive certification combines CPR and First Aid training in one complete course. The CPR component delivers the CPR – BLS (Basic Life Support) for the Healthcare Provider training, teaching professional-level CPR techniques for adults, children, and infants. The First Aid component covers response and care for common injuries. This certification satisfies requirements for many professions including lifeguards, emergency medical technicians, boat captains, dive masters, personal trainers, physical therapists, sports coaches, camp counselors, teachers, home healthcare aides, and dental hygienists.",
    details: {
      includes: [
        "CPR – BLS for Healthcare Provider training (6.0 hrs)",
        "First Aid training (4.0 hrs)",
        "Bloodborne Pathogens awareness"
      ],
      prerequisites: [
        "No specific age or swimming prerequisites required"
      ],
      objectives: [
        "Individually provide lifesaving CPR to victims of different ages",
        "Effectively utilize AEDs, pocket breathing masks, and other safety equipment",
        "Perform various lifesaving CPR-related skills",
        "Provide vital First Aid care to injured persons",
        "Effectively utilize bandages, slings, safety gloves, and other first aid supplies",
        "Perform essential First Aid Basics related skills"
      ],
      certificationRequirements: [
        "Purchase this Home-Study Course from Lifeguard Training Academy",
        "Successfully complete the Home-Study Course",
        "Attend and successfully complete instructor-led training with a certified Instructor"
      ],
      purchase: [
        "CPR – BLS for Healthcare Provider materials",
        "First Aid training materials",
        "Access to certification exams"
      ]
    }
  },

  "cpr-first-aid-recert": {
    description: "This recertification course refreshes CPR and First Aid skills and knowledge, updating providers on the latest techniques and protocols. Lifeguard Training Academy requires CPR & First Aid certifications to be renewed regularly to ensure every provider keeps their safety knowledge fresh and lifesaving skills sharp. This requirement promotes better preparedness for emergency situations.",
    details: {
      includes: [
        "CPR – BLS for Healthcare Provider renewal training",
        "First Aid renewal training",
        "Updates on the latest emergency response protocols"
      ],
      prerequisites: [
        "Current or recently expired CPR & First Aid certification"
      ],
      objectives: [
        "Refresh CPR skills for adult, child, and infant victims",
        "Update knowledge of AED usage and emergency breathing techniques",
        "Review and practice current First Aid protocols",
        "Learn any changes or updates to emergency response best practices",
        "Maintain emergency response readiness"
      ],
      certificationRequirements: [
        "Complete the CPR & First Aid recertification Home-Study Course",
        "Successfully demonstrate required skills during instructor assessment",
        "Pass the recertification examination"
      ],
      purchase: [
        "CPR – BLS for Healthcare Provider recertification materials",
        "First Aid recertification materials",
        "Access to updated protocols and techniques"
      ]
    }
  },

  "cpr-first-aid-instructor": {
    description: "This certification qualifies you to teach and certify students in CPR – BLS for The Healthcare Provider, CPR for Adults/Children/Infants (in various combinations), Community CPR / Friends & Family CPR, First Aid, and Bloodborne Pathogens. This instructor-level certification enables you to conduct professional training courses and issue valid certifications to your students, expanding your professional capabilities and impact on community safety.",
    details: {
      includes: [
        "CPR – BLS for Healthcare Provider Instructor training",
        "First Aid Instructor training",
        "Bloodborne Pathogens Instructor training"
      ],
      prerequisites: [
        "18 Years of age or older",
        "Ability to organize and teach groups of students",
        "Current valid CPR & First Aid certification"
      ],
      objectives: [
        "Safely and effectively conduct CPR – BLS for Healthcare Provider & First Aid certification training courses",
        "Correctly demonstrate all course skills for students",
        "Effectively communicate required course knowledge to students",
        "Teach students all required knowledge and skills in a time-efficient manner",
        "Correctly and expeditiously process all student certifications"
      ],
      certificationRequirements: [
        "Purchase the Home-Study Course from Lifeguard Training Academy",
        "Successfully complete and submit the Home-Study Course",
        "Attend and successfully complete Instructor-Led training with a certified Instructor Trainer"
      ],
      purchase: [
        "CPR – BLS for Healthcare Provider Instructor materials",
        "First Aid Instructor materials",
        "Bloodborne Pathogens Instructor materials",
        "Teaching methodology resources",
        "Certification processing guidelines"
      ]
    }
  },

  "cpr-first-aid-instructor-recert": {
    description: "This certification will renew your CPR – BLS for Healthcare Provider Instructor and First Aid Instructor certifications, authorizing you to continue teaching and certifying students in a variety of CPR and First Aid courses. Lifeguard Training Academy will renew instructor certifications from any nationally recognized certification agency, provided you satisfy all certification requirements.",
    details: {
      includes: [
        "CPR – BLS for Healthcare Providers Instructor recertification training",
        "First Aid Instructor recertification training",
        "Bloodborne Pathogens Instructor recertification training"
      ],
      prerequisites: [
        "18 Years of age or older",
        "Current valid CPR – BLS for Healthcare Provider Instructor & First Aid Instructor certification from Lifeguard Training Academy or another nationally recognized agency"
      ],
      objectives: [
        "Update knowledge and skills for conducting CPR, First Aid, and Bloodborne Pathogens certification courses",
        "Review and refresh demonstration techniques for all course skills",
        "Update teaching methodologies and communication strategies",
        "Review current certification processing procedures"
      ],
      certificationRequirements: [
        "Purchase the Home-Study Course from Lifeguard Training Academy",
        "Successfully complete the Home-Study Course",
        "Have taught at least one full CPR & First Aid certification course for a minimum of one student during the current certification period"
      ],
      purchase: [
        "Instructor recertification materials",
        "Access to updated teaching methodologies",
        "Continued certification authority for additional period"
      ]
    }
  },

  "lifeguard-instructor": {
    description: "This certification qualifies you to teach and certify students in Lifeguard courses, CPR courses, Basic First Aid, Blood Bourne Pathogens, Swim Coach Safety Training, and Workplace Safety Training. This instructor-level certification provides a comprehensive teaching qualification that enables you to conduct professional training across multiple safety disciplines.",
    details: {
      includes: [
        "Lifeguard Instructor training",
        "CPR Instructor training",
        "Basic First Aid Instructor training",
        "Blood Bourne Pathogens Instructor training",
        "Workplace Safety Training Instructor training"
      ],
      prerequisites: [
        "18 Years of age or older",
        "Ability to speak publicly with confidence and clarity",
        "Administrative competency in scheduling training classes, completing required documentation, and meeting deadlines",
        "Current valid Lifeguard certification (with CPR & First Aid) from Lifeguard Training Academy or another nationally recognized certification agency"
      ],
      objectives: [
        "Safely and effectively conduct certification training courses",
        "Correctly demonstrate all course skills for students",
        "Effectively communicate all required course knowledge to students",
        "Teach students all course required knowledge and skills in a time-efficient manner",
        "Correctly and expeditiously process all student certifications"
      ],
      certificationRequirements: [
        "Purchase the Home-Study Course from Lifeguard Training Academy",
        "Successfully complete and submit the Home-Study Course",
        "Attend and successfully complete Instructor-Led training with a certified Instructor"
      ],
      purchase: [
        "Lifeguard Instructor Course materials",
        "CPR/AED Instructor Course materials",
        "First Aid Basics Instructor Course materials",
        "Blood Bourne Pathogens Instructor Course materials"
      ]
    }
  },

  "lifeguard-instructor-recert": {
    description: "This course is designed for Lifeguard Instructors who need to recertify or renew their certification. There are two methods for recertification: 1) Teach one full Lifeguard certification course where you certify at least one Lifeguard during your current certification period and pay the recertification fee, or 2) Complete the online Home-Study Course and meet with a local Instructor Trainer Director for a 1-day Instructor-Led Training if you haven't conducted any certification courses during your current certification period.",
    details: {
      includes: [
        "Refresher on Lifeguard Instruction techniques",
        "Updates on CPR and First Aid training protocols",
        "Review of certification processes and requirements"
      ],
      prerequisites: [
        "Current or recently expired Lifeguard Instructor certification",
        "18 Years of age or older"
      ],
      objectives: [
        "Maintain qualification to train and certify Lifeguards",
        "Update knowledge of current Lifeguard training methods",
        "Review instructor assessment techniques",
        "Stay current with water safety practices and standards"
      ],
      certificationRequirements: [
        "Option 1: Teach one full Lifeguard certification course certifying at least one Lifeguard during current certification period and pay recertification fee",
        "Option 2: Complete Home-Study Course and attend Instructor-Led training (if no certification courses were taught)"
      ],
      purchase: [
        "Lifeguard Instructor recertification materials",
        "Access to updated teaching methodologies and safety standards",
        "Recertification processing"
      ]
    }
  },

  "lifeguard-instructor-trainer": {
    description: "In order for a Lifeguard Instructor to receive their certification, they must attend Instructor-Led training conducted by someone with a higher level of training. The Lifeguard Instructor Trainer is qualified to certify individuals or groups of Lifeguard Instructors. This certification is ideal for businesses with multiple locations or many Lifeguard Instructors, allowing better financial control and standardization across their safety training programs.",
    details: {
      includes: [
        "Lifeguard Instructor training",
        "CPR Instructor training",
        "Basic First Aid Instructor training",
        "Blood Bourne Pathogens Instructor training",
        "Swim Coach Safety Training Instructor training",
        "Workplace Safety Training Instructor training"
      ],
      prerequisites: [
        "18 Years of age or older",
        "Ability to swim 500 meters (550 yards) without stopping (no time limit)",
        "Ability to tread water for five minutes",
        "Ability to dive to a depth of six meters (20 feet)",
        "Current valid Lifeguard certification (with CPR & First Aid)"
      ],
      objectives: [
        "Train and certify Lifeguard Instructors",
        "Safely and effectively conduct instructor certification training courses",
        "Correctly demonstrate all course skills for instructor candidates",
        "Effectively communicate required knowledge to instructor candidates",
        "Oversee and manage certification processes across multiple locations or facilities"
      ],
      certificationRequirements: [
        "Purchase the Home-Study Course from Lifeguard Training Academy",
        "Successfully complete and submit the Home-Study Course",
        "Attend and successfully complete Instructor-Led training with a certified Lifeguard Training Academy Instructor"
      ],
      purchase: [
        "Lifeguard Instructor Course materials",
        "CPR/AED Instructor Course materials",
        "First Aid Basics Instructor Course materials",
        "Blood Bourne Pathogens Instructor Course materials",
        "Instructor Trainer specific materials"
      ]
    }
  },

  "lifeguard-instructor-trainer-recert": {
    description: "This course is designed for Lifeguard Instructor Trainers who need to recertify or renew their certification. There are two options for recertification: 1) Certify at least one Lifeguard after completing a full certification course and pay the recertification fee of $199, or 2) Complete the online Home-Study Course and meet with a local Instructor Trainer Director for a 1-day Instructor-Led Training if you were unable to conduct any certification courses during your current certification period.",
    details: {
      includes: [
        "Updates on instructor training methodologies",
        "Review of assessment techniques for instructor candidates",
        "Refresher on certification standards and procedures"
      ],
      prerequisites: [
        "Current or recently expired Lifeguard Instructor Trainer certification",
        "18 Years of age or older"
      ],
      objectives: [
        "Maintain qualification to train and certify Lifeguard Instructors",
        "Stay current with lifeguard instruction best practices",
        "Review assessment and evaluation techniques",
        "Update knowledge of certification standards and procedures"
      ],
      certificationRequirements: [
        "Option 1: Certify at least one Lifeguard during current certification period and pay recertification fee",
        "Option 2: Complete Home-Study Course and attend Instructor-Led training with an Instructor Trainer Director (if no certification courses were conducted)"
      ],
      purchase: [
        "Lifeguard Instructor Trainer recertification materials",
        "Access to updated teaching methodologies and safety standards",
        "Continued certification authority for an additional period"
      ]
    }
  },

  "certified-pool-operator": {
    description: "This is a comprehensive, two-day online CPO Instructor-Led class covering all aspects of managing and operating commercial or residential swimming pools, spas or water parks. The course topics include Facility Management, Codes and Regulations, Essential Calculations, Contaminations, Disinfectants, Water Balance, Circulation, Filtration, Heating and Air, Spas and Therapy Pools, Facility Safety, Troubleshooting, and Maintenance. The Pool and Hot Tub Alliance Certified Pool/Spa Operator® Certification is recognized nationally.",
    details: {
      includes: [
        "Facility Management training",
        "Codes and Regulations instruction",
        "Water chemistry and balance",
        "Circulation and filtration systems",
        "Heating, ventilation, and air conditioning systems",
        "Spa and therapy pool operations",
        "Safety and risk management",
        "Troubleshooting and maintenance procedures"
      ],
      prerequisites: [
        "No specific prerequisites, though facility management experience is helpful"
      ],
      objectives: [
        "Manage and operate commercial or residential aquatic facilities according to industry standards",
        "Understand and apply relevant codes and regulations",
        "Properly maintain water chemistry and balance",
        "Operate circulation, filtration, and HVAC systems efficiently",
        "Implement effective safety and risk management protocols",
        "Troubleshoot common pool and spa issues",
        "Develop maintenance schedules and procedures"
      ],
      certificationRequirements: [
        "Attend the 2-day virtual class with instructor",
        "Successfully complete the PHTA CPO exam",
        "Meet participation requirements"
      ],
      purchase: [
        "PHTA CPO Handbook (hard copy)",
        "Class handouts and worksheets",
        "PHTA CPO examination",
        "Certification issued by the Pool and Hot Tub Alliance"
      ]
    }
  },

  "bloodborne-pathogens": {
    description: "This program on bloodborne pathogens (BBP) educates participants on health issues by identifying and managing infectious agents in human blood. This instruction is mandated by the U.S. Occupational and Safety Health Administration (OSHA) for certain industries. We demonstrate methods to recognize BBPs and take appropriate action to assist those in need without putting oneself at risk.",
    details: {
      includes: [
        "Exposure control plan (ECP) overview",
        "Categorization of various bloodborne pathogens",
        "Four principal steps for reacting to pathogen exposure",
        "Universal safety measures and hygiene practices",
        "OSHA compliance information"
      ],
      prerequisites: [
        "No specific prerequisites required",
        "Recommended for healthcare professionals and those in laboratory or medical settings"
      ],
      objectives: [
        "Understand bloodborne pathogens and their transmission methods",
        "Learn protective strategies that shield against BBP transmission",
        "Examine suitable personal protective equipment (PPE)",
        "Master secure disposal of 'sharps' such as needles and scalpels",
        "Implement essential practices for cleanup of blood and bodily fluids",
        "Minimize disease spread during professional duties"
      ],
      certificationRequirements: [
        "Complete all course modules",
        "Pass the final assessment with the required minimum score",
        "Demonstrate understanding of safety protocols and procedures"
      ],
      purchase: [
        "Comprehensive bloodborne pathogens training program",
        "OSHA-compliant certification",
        "Access to updated protocols and safety information",
        "Official Lifeguard Training Academy certification"
      ]
    }
  },

  "oxygen-administrator": {
    description: "This Oxygen (O2) Administrator course is designed to provide candidates with the competency required to administer oxygen correctly and safely. When oxygen is administered promptly by trained rescuers in an emergency situation, it can be the difference between life and death for a person in need. This program covers equipment and procedures for administering oxygen as an emergency procedure, including equipment selection and use for various emergency scenarios, along with practical components to train a well-rounded rescuer.",
    details: {
      includes: [
        "Equipment selection and usage training",
        "Proper oxygen storage and handling procedures",
        "Administration techniques for various emergency scenarios",
        "Safety protocols and risk management",
        "OSHA and ILCOR compliant certification"
      ],
      prerequisites: [
        "Minimum age 18",
        "Minors aged 10 and above must have written parental/guardian consent"
      ],
      objectives: [
        "Identify a person suffering from lack of oxygen",
        "Promptly and properly activate EMS",
        "Properly administer oxygen to both a breathing and a non-breathing person",
        "Obtain an OSHA and ILCOR compliant certification",
        "Safely handle and store oxygen equipment"
      ],
      certificationRequirements: [
        "Part 1: Complete the online Home-Study Course (HSC) at your own pace",
        "Part 2: Attend a half-day Instructor-Led Training (ILT) with your local Instructor in a classroom setting",
        "Successfully demonstrate all required skills"
      ],
      purchase: [
        "Access to online Home-Study Course materials",
        "Half-day Instructor-Led Training session",
        "OSHA and ILCOR compliant certification",
        "Official Lifeguard Training Academy certification"
      ]
    }
  },

  "oxygen-administrator-instructor": {
    description: "This certification qualifies you to train and certify others as Oxygen Administrators. The course is ideal for employers who need to certify multiple staff members and for safety training centers serving various clients. By becoming an Oxygen Administrator Instructor, you'll be prepared to effectively teach others the proper handling, storage, and administration of oxygen in emergency situations.",
    details: {
      includes: [
        "Oxygen Administrator Instructor training materials",
        "Teaching methodologies for oxygen administration",
        "Assessment techniques for student certification",
        "Program management resources",
        "Authorization to certify students as Oxygen Administrators"
      ],
      prerequisites: [
        "Minimum 18 years of age",
        "Current Oxygen Administrator certification",
        "Teaching aptitude and communication skills"
      ],
      objectives: [
        "Effectively teach oxygen administration techniques to others",
        "Properly assess student competency in oxygen handling and administration",
        "Demonstrate correct equipment setup and usage for instructional purposes",
        "Manage certification programs for Oxygen Administrator students",
        "Ensure compliance with OSHA and ILCOR standards in training programs"
      ],
      certificationRequirements: [
        "Complete the Oxygen Administrator Instructor Home-Study Course",
        "Attend Instructor-Led Training with an authorized Instructor Trainer",
        "Demonstrate proficiency in teaching and assessing oxygen administration skills",
        "Submit completed certification documentation"
      ],
      purchase: [
        "Oxygen Administrator Instructor certification materials",
        "Teaching resources and assessment tools",
        "Authorization to certify students as Oxygen Administrators",
        "Official Lifeguard Training Academy certification"
      ]
    }
  },

  "oxygen-administrator-instructor-recert": {
    description: "This course is designed for Oxygen Administrator Instructors who need to recertify or renew their certification. To qualify for recertification, instructors must have taught at least one Oxygen Administrator certification course where they certified at least one student during their current certification period and pay the recertification fee. If this teaching requirement hasn't been met, instructors will need to complete a process similar to the original certification but with a shorter timeframe due to their prior experience.",
    details: {
      includes: [
        "Updates on oxygen administration equipment and techniques",
        "Refresher on teaching methodologies",
        "Review of assessment standards and procedures",
        "Updated certification materials"
      ],
      prerequisites: [
        "Current or recently expired Oxygen Administrator Instructor certification",
        "Minimum 18 years of age",
        "Must have taught at least one certification course during current certification period"
      ],
      objectives: [
        "Maintain qualification to train and certify Oxygen Administrators",
        "Update knowledge of current oxygen administration protocols",
        "Refresh teaching and assessment techniques",
        "Stay current with OSHA and ILCOR standards"
      ],
      certificationRequirements: [
        "Option 1: Verify teaching of at least one Oxygen Administrator certification course during current certification period and pay recertification fee",
        "Option 2: Complete refresher Home-Study Course and attend abbreviated Instructor-Led Training (if teaching requirement not met)"
      ],
      purchase: [
        "Updated instructor certification materials",
        "Access to current teaching resources",
        "Continued authorization to certify students",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  },

  "lifeguard": {
    description: "This course is a full Lifeguard certification course (estimated 27.0 hours) which includes all the skills and techniques required to protect and safeguard patrons of public swimming facilities. This complete certification provides the most comprehensive lifeguard training available and meets or exceeds national standards.",
    details: {
      includes: [
        "Lifeguard certification for pools up to 20 feet deep",
        "CPR - BLS for Healthcare Provider certification",
        "First Aid certification",
        "AED (Automated External Defibrillator) certification",
        "All course materials and certification fees"
      ],
      prerequisites: [
        "Minimum 15 years of age (with parent/guardian consent for minors)",
        "Ability to swim 500 meters (550 yards) without stopping",
        "Ability to tread water for 5 minutes",
        "Ability to dive to a depth of 20 feet and retrieve an object"
      ],
      objectives: [
        "Safely supervise a swimming pool with depths up to 20 feet",
        "Identify and respond appropriately to distressed swimmers and drowning victims",
        "Perform water rescues using various techniques and equipment",
        "Administer CPR, First Aid, and AED in aquatic emergency situations",
        "Prevent and respond to spinal injuries in aquatic environments"
      ],
      certificationRequirements: [
        "Complete the Home-Study Course (online components)",
        "Attend and successfully complete in-person training sessions",
        "Pass both written and practical skills assessments",
        "Demonstrate proficiency in all required rescue techniques"
      ],
      purchase: [
        "Complete online Home-Study course with digital materials",
        "In-person training with certified Lifeguard Training Academy Instructor",
        "All certifications: Lifeguard, CPR/BLS, First Aid, and AED",
        "Official Lifeguard Training Academy certification"
      ]
    }
  },

  "lifeguard-renewal": {
    description: "This Lifeguard Recertification/Renewal course refreshes and updates the skills of currently certified lifeguards. The course ensures lifeguards maintain current knowledge of rescue techniques, emergency procedures, and safety protocols.",
    details: {
      includes: [
        "Renewal of Lifeguard certification",
        "Renewal of CPR - BLS for Healthcare Provider certification",
        "Renewal of First Aid certification",
        "Renewal of AED certification",
        "Updated course materials"
      ],
      prerequisites: [
        "Current or recently expired Lifeguard certification (within 30 days)",
        "Minimum 15 years of age",
        "Ability to swim 300 meters without stopping",
        "Ability to tread water for 2 minutes"
      ],
      objectives: [
        "Review and practice essential lifeguarding skills",
        "Update knowledge on current rescue techniques and protocols",
        "Refresh CPR, First Aid, and AED skills",
        "Review facility safety management techniques",
        "Learn any new standards or procedures implemented since initial certification"
      ],
      certificationRequirements: [
        "Complete the abbreviated Home-Study Course review",
        "Attend and successfully complete an abbreviated in-person training session",
        "Pass both written and practical skills assessments",
        "Demonstrate continued proficiency in all required rescue techniques"
      ],
      purchase: [
        "Abbreviated online Home-Study course with digital materials",
        "In-person recertification training (shorter than initial certification)",
        "Renewal of all certifications: Lifeguard, CPR/BLS, First Aid, and AED",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  },

  "shallow-water-lifeguard": {
    description: "This certification course will prepare you to oversee a swimming pool with a maximum depth of 5 feet. The course covers essential rescue techniques, safety protocols, and emergency response procedures specifically tailored for shallow water environments. Perfect for those working at water parks, hotel pools, and facilities without deep water.",
    details: {
      includes: [
        "Shallow Water Lifeguard certification (for pools up to 5 feet deep)",
        "CPR - BLS for Healthcare Provider certification",
        "First Aid certification",
        "AED certification",
        "All course materials and certification fees"
      ],
      prerequisites: [
        "Minimum 15 years of age (with parent/guardian consent for minors)",
        "Ability to swim 100 meters (125 yards) without stopping",
        "Ability to tread water for 3 minutes",
        "Ability to dive to a depth of 5 feet and retrieve an object"
      ],
      objectives: [
        "Safely supervise a shallow water swimming pool (max depth 5 feet)",
        "Identify and respond to victims in distress in shallow water environments",
        "Perform appropriate rescue techniques for shallow water situations",
        "Administer CPR, First Aid, and AED in aquatic emergency situations",
        "Recognize and respond to hazards specific to shallow water facilities"
      ],
      certificationRequirements: [
        "Complete the Home-Study Course (online components)",
        "Attend and successfully complete in-person training sessions",
        "Pass both written and practical skills assessments",
        "Demonstrate proficiency in all required shallow water rescue techniques"
      ],
      purchase: [
        "Complete online Home-Study course with digital materials",
        "In-person training with certified Lifeguard Training Academy Instructor",
        "All certifications: Shallow Water Lifeguard, CPR/BLS, First Aid, and AED",
        "Official Lifeguard Training Academy certification"
      ]
    }
  },

  "shallow-water-lifeguard-renewal": {
    description: "This recertification course updates your Shallow Water Lifeguard credentials and refreshes your knowledge of the latest safety protocols and rescue techniques for shallow water environments.",
    details: {
      includes: [
        "Renewal of Shallow Water Lifeguard certification",
        "Renewal of CPR - BLS for Healthcare Provider certification",
        "Renewal of First Aid certification",
        "Renewal of AED certification",
        "Updated course materials"
      ],
      prerequisites: [
        "Current or recently expired Shallow Water Lifeguard certification (within 30 days)",
        "Minimum 15 years of age",
        "Ability to swim 100 meters without stopping",
        "Ability to tread water for 2 minutes"
      ],
      objectives: [
        "Review and practice essential shallow water lifeguarding skills",
        "Update knowledge on current rescue techniques and protocols for shallow water",
        "Refresh CPR, First Aid, and AED skills",
        "Review facility safety management techniques for shallow water environments",
        "Learn any new standards or procedures implemented since initial certification"
      ],
      certificationRequirements: [
        "Complete the abbreviated Home-Study Course review",
        "Attend and successfully complete an abbreviated in-person training session",
        "Pass both written and practical skills assessments",
        "Demonstrate continued proficiency in all required shallow water rescue techniques"
      ],
      purchase: [
        "Abbreviated online Home-Study course with digital materials",
        "In-person recertification training (shorter than initial certification)",
        "Renewal of all certifications: Shallow Water Lifeguard, CPR/BLS, First Aid, and AED",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  },

  "waterfront-lifeguard": {
    description: "Designed specifically for natural water environments, this certification prepares lifeguards for the unique challenges of lakes, rivers, and beachfront settings. The course covers specialized rescue techniques, surveillance strategies, and emergency response procedures for open water environments.",
    details: {
      includes: [
        "Waterfront Lifeguard certification",
        "CPR - BLS for Healthcare Provider certification",
        "First Aid certification",
        "AED certification",
        "All course materials and certification fees"
      ],
      prerequisites: [
        "Minimum 15 years of age (with parent/guardian consent for minors)",
        "Ability to swim 500 meters (550 yards) without stopping",
        "Ability to tread water for 5 minutes",
        "Ability to perform a surface dive and swim underwater for 15 yards",
        "Ability to retrieve multiple objects from the bottom in various depths"
      ],
      objectives: [
        "Safely supervise waterfront swimming areas (lakes, rivers, beaches)",
        "Identify and respond to victims in distress in natural water environments",
        "Perform specialized rescue techniques for open water settings",
        "Administer CPR, First Aid, and AED in waterfront emergency situations",
        "Recognize and respond to hazards specific to natural water environments"
      ],
      certificationRequirements: [
        "Complete the Home-Study Course (online components)",
        "Attend and successfully complete in-person training sessions",
        "Pass both written and practical skills assessments",
        "Demonstrate proficiency in all required waterfront rescue techniques"
      ],
      purchase: [
        "Complete online Home-Study course with digital materials",
        "In-person training with certified Lifeguard Training Academy Instructor",
        "All certifications: Waterfront Lifeguard, CPR/BLS, First Aid, and AED",
        "Official Lifeguard Training Academy certification"
      ]
    }
  },

  "waterfront-lifeguard-renewal": {
    description: "Update your Waterfront Lifeguard certification with this renewal course covering the latest techniques and protocols for natural water environments. This recertification ensures you maintain current skills for effectively managing safety at lakes, rivers, and beaches.",
    details: {
      includes: [
        "Renewal of Waterfront Lifeguard certification",
        "Renewal of CPR - BLS for Healthcare Provider certification",
        "Renewal of First Aid certification",
        "Renewal of AED certification",
        "Updated course materials"
      ],
      prerequisites: [
        "Current or recently expired Waterfront Lifeguard certification (within 30 days)",
        "Minimum 15 years of age",
        "Ability to swim 350 meters without stopping",
        "Ability to tread water for 3 minutes",
        "Ability to perform a surface dive and retrieve objects from the bottom"
      ],
      objectives: [
        "Review and practice essential waterfront lifeguarding skills",
        "Update knowledge on current rescue techniques and protocols for natural water settings",
        "Refresh CPR, First Aid, and AED skills",
        "Review waterfront safety management techniques",
        "Learn any new standards or procedures implemented since initial certification"
      ],
      certificationRequirements: [
        "Complete the abbreviated Home-Study Course review",
        "Attend and successfully complete an abbreviated in-person training session",
        "Pass both written and practical skills assessments",
        "Demonstrate continued proficiency in all required waterfront rescue techniques"
      ],
      purchase: [
        "Abbreviated online Home-Study course with digital materials",
        "In-person recertification training (shorter than initial certification)",
        "Renewal of all certifications: Waterfront Lifeguard, CPR/BLS, First Aid, and AED",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  },

  "junior-lifeguard": {
    description: "This program introduces young participants (ages 10-15) to the fundamentals of water safety, basic rescue techniques, and the responsibilities of professional lifeguards. The Junior Lifeguard course builds confidence, teamwork skills, and a foundation for possible future certification as a professional lifeguard.",
    details: {
      includes: [
        "Junior Lifeguard training certification",
        "Basic CPR and First Aid awareness training",
        "Water safety education",
        "Introduction to rescue equipment and techniques",
        "All course materials and certification fees"
      ],
      prerequisites: [
        "Age 10-15 years (with parent/guardian consent)",
        "Ability to swim 100 meters (4 lengths of a standard pool) without stopping",
        "Ability to tread water for 1 minute",
        "Comfort in deep water and ability to submerge completely"
      ],
      objectives: [
        "Learn basic water safety principles and rules",
        "Develop swimming endurance and water confidence",
        "Practice basic rescue techniques with and without equipment",
        "Understand the role and responsibilities of professional lifeguards",
        "Build teamwork skills through group activities and scenarios"
      ],
      certificationRequirements: [
        "Complete the Junior Lifeguard training curriculum",
        "Attend all required in-person training sessions",
        "Pass basic written and practical skills assessments",
        "Demonstrate improvement in swimming ability and water safety knowledge"
      ],
      purchase: [
        "Junior Lifeguard course materials",
        "In-person training with certified Lifeguard Training Academy Instructor",
        "Junior Lifeguard certification",
        "Official Lifeguard Training Academy certification"
      ]
    }
  },

  "lifeguard-shallow-pool-renewal": {
    description: "This recertification course updates your Shallow Water Lifeguard credentials and refreshes your knowledge of the latest safety protocols and rescue techniques for shallow water environments.",
    details: {
      includes: [
        "Renewal of Shallow Water Lifeguard certification",
        "Renewal of CPR - BLS for Healthcare Provider certification",
        "Renewal of First Aid certification",
        "Renewal of AED certification",
        "Updated course materials"
      ],
      prerequisites: [
        "Current or recently expired Shallow Water Lifeguard certification (within 30 days)",
        "Minimum 15 years of age",
        "Ability to swim 100 meters without stopping",
        "Ability to tread water for 2 minutes"
      ],
      objectives: [
        "Review and practice essential shallow water lifeguarding skills",
        "Update knowledge on current rescue techniques and protocols for shallow water",
        "Refresh CPR, First Aid, and AED skills",
        "Review facility safety management techniques for shallow water environments",
        "Learn any new standards or procedures implemented since initial certification"
      ],
      certificationRequirements: [
        "Complete the abbreviated Home-Study Course review",
        "Attend and successfully complete an abbreviated in-person training session",
        "Pass both written and practical skills assessments",
        "Demonstrate continued proficiency in all required shallow water rescue techniques"
      ],
      purchase: [
        "Abbreviated online Home-Study course with digital materials",
        "In-person recertification training (shorter than initial certification)",
        "Renewal of all certifications: Shallow Water Lifeguard, CPR/BLS, First Aid, and AED",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  },

  "lifeguard-waterfront-renewal": {
    description: "Update your Waterfront Lifeguard certification with this renewal course covering the latest techniques and protocols for natural water environments. This recertification ensures you maintain current skills for effectively managing safety at lakes, rivers, and beaches.",
    details: {
      includes: [
        "Renewal of Waterfront Lifeguard certification",
        "Renewal of CPR - BLS for Healthcare Provider certification",
        "Renewal of First Aid certification",
        "Renewal of AED certification",
        "Updated course materials"
      ],
      prerequisites: [
        "Current or recently expired Waterfront Lifeguard certification (within 30 days)",
        "Minimum 15 years of age",
        "Ability to swim 350 meters without stopping",
        "Ability to tread water for 3 minutes",
        "Ability to perform a surface dive and retrieve objects from the bottom"
      ],
      objectives: [
        "Review and practice essential waterfront lifeguarding skills",
        "Update knowledge on current rescue techniques and protocols for natural water settings",
        "Refresh CPR, First Aid, and AED skills",
        "Review waterfront safety management techniques",
        "Learn any new standards or procedures implemented since initial certification"
      ],
      certificationRequirements: [
        "Complete the abbreviated Home-Study Course review",
        "Attend and successfully complete an abbreviated in-person training session",
        "Pass both written and practical skills assessments",
        "Demonstrate continued proficiency in all required waterfront rescue techniques"
      ],
      purchase: [
        "Abbreviated online Home-Study course with digital materials",
        "In-person recertification training (shorter than initial certification)",
        "Renewal of all certifications: Waterfront Lifeguard, CPR/BLS, First Aid, and AED",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  },
  
  "lifeguard-swimming-pool-renewal": {
    description: "This renewal course refreshes your Swimming Pool Lifeguard skills and updates your knowledge of the latest techniques and protocols for pool environments up to 12 feet in depth.",
    details: {
      includes: [
        "Renewal of Swimming Pool Lifeguard certification",
        "Renewal of CPR - BLS for Healthcare Provider certification",
        "Renewal of First Aid certification",
        "Renewal of AED certification",
        "Updated course materials"
      ],
      prerequisites: [
        "Current or recently expired Swimming Pool Lifeguard certification (within 30 days)",
        "Minimum 15 years of age",
        "Ability to swim 200 meters without stopping",
        "Ability to tread water for 2 minutes",
        "Ability to dive to a depth of 12 feet and retrieve an object"
      ],
      objectives: [
        "Review and practice essential swimming pool lifeguarding skills",
        "Update knowledge on current rescue techniques and protocols for pool environments",
        "Refresh CPR, First Aid, and AED skills",
        "Review facility safety management techniques",
        "Learn any new standards or procedures implemented since initial certification"
      ],
      certificationRequirements: [
        "Complete the abbreviated Home-Study Course review",
        "Attend and successfully complete an abbreviated in-person training session",
        "Pass both written and practical skills assessments",
        "Demonstrate continued proficiency in all required swimming pool rescue techniques"
      ],
      purchase: [
        "Abbreviated online Home-Study course with digital materials",
        "In-person recertification training (shorter than initial certification)",
        "Renewal of all certifications: Swimming Pool Lifeguard, CPR/BLS, First Aid, and AED",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  },
  
  "lifeguard-deep-pool-renewal": {
    description: "This recertification course updates your Deep Pool Lifeguard credentials and ensures you maintain proficiency in all aspects of lifeguarding for facilities with depths up to 20 feet.",
    details: {
      includes: [
        "Renewal of Deep Pool Lifeguard certification",
        "Renewal of CPR - BLS for Healthcare Provider certification",
        "Renewal of First Aid certification",
        "Renewal of AED certification",
        "Updated course materials"
      ],
      prerequisites: [
        "Current or recently expired Deep Pool Lifeguard certification (within 30 days)",
        "Minimum 15 years of age",
        "Ability to swim 300 meters without stopping",
        "Ability to tread water for 3 minutes",
        "Ability to dive to a depth of 15 feet and retrieve an object"
      ],
      objectives: [
        "Review and practice essential deep pool lifeguarding skills",
        "Update knowledge on current rescue techniques and protocols for deep water environments",
        "Refresh CPR, First Aid, and AED skills",
        "Review facility safety management techniques for deep pool settings",
        "Learn any new standards or procedures implemented since initial certification"
      ],
      certificationRequirements: [
        "Complete the abbreviated Home-Study Course review",
        "Attend and successfully complete an abbreviated in-person training session",
        "Pass both written and practical skills assessments",
        "Demonstrate continued proficiency in all required deep pool rescue techniques"
      ],
      purchase: [
        "Abbreviated online Home-Study course with digital materials",
        "In-person recertification training (shorter than initial certification)",
        "Renewal of all certifications: Deep Pool Lifeguard, CPR/BLS, First Aid, and AED",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  },
  
  "lifeguard-youth-camp-renewal": {
    description: "This renewal course refreshes your Youth Camp Lifeguard certification and updates your knowledge on the latest safety protocols specific to camp aquatic environments.",
    details: {
      includes: [
        "Renewal of Youth Camp Lifeguard certification",
        "Renewal of CPR - BLS for Healthcare Provider certification",
        "Renewal of First Aid certification",
        "Renewal of AED certification",
        "Updated course materials"
      ],
      prerequisites: [
        "Current or recently expired Youth Camp Lifeguard certification (within 30 days)",
        "Minimum 15 years of age",
        "Ability to swim 300 meters without stopping",
        "Ability to tread water for 3 minutes",
        "Ability to perform appropriate rescue techniques for youth camp settings"
      ],
      objectives: [
        "Review and practice essential youth camp lifeguarding skills",
        "Update knowledge on current rescue techniques and protocols for camp environments",
        "Refresh CPR, First Aid, and AED skills",
        "Review facility safety management techniques specific to youth camp settings",
        "Learn any new standards or procedures implemented since initial certification"
      ],
      certificationRequirements: [
        "Complete the abbreviated Home-Study Course review",
        "Attend and successfully complete an abbreviated in-person training session",
        "Pass both written and practical skills assessments",
        "Demonstrate continued proficiency in all required youth camp rescue techniques"
      ],
      purchase: [
        "Abbreviated online Home-Study course with digital materials",
        "In-person recertification training (shorter than initial certification)",
        "Renewal of all certifications: Youth Camp Lifeguard, CPR/BLS, First Aid, and AED",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  },
  
  "lifeguard-water-park-renewal": {
    description: "This recertification course updates your Water Park Lifeguard credentials and refreshes your knowledge of the latest safety protocols for water park attractions and pools.",
    details: {
      includes: [
        "Renewal of Water Park Lifeguard certification",
        "Renewal of CPR - BLS for Healthcare Provider certification",
        "Renewal of First Aid certification",
        "Renewal of AED certification",
        "Updated course materials"
      ],
      prerequisites: [
        "Current or recently expired Water Park Lifeguard certification (within 30 days)",
        "Minimum 15 years of age",
        "Ability to swim 300 meters without stopping",
        "Ability to tread water for 3 minutes",
        "Ability to perform appropriate rescue techniques for water park settings"
      ],
      objectives: [
        "Review and practice essential water park lifeguarding skills",
        "Update knowledge on current rescue techniques and protocols for water park environments",
        "Refresh CPR, First Aid, and AED skills",
        "Review facility safety management techniques specific to water park attractions",
        "Learn any new standards or procedures implemented since initial certification"
      ],
      certificationRequirements: [
        "Complete the abbreviated Home-Study Course review",
        "Attend and successfully complete an abbreviated in-person training session",
        "Pass both written and practical skills assessments",
        "Demonstrate continued proficiency in all required water park rescue techniques"
      ],
      purchase: [
        "Abbreviated online Home-Study course with digital materials",
        "In-person recertification training (shorter than initial certification)",
        "Renewal of all certifications: Water Park Lifeguard, CPR/BLS, First Aid, and AED",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  },
  
  "lifeguard-all-specialties-renewal": {
    description: "This comprehensive renewal course updates your All Specialties Lifeguard certification and ensures you maintain proficiency across all aquatic facility types.",
    details: {
      includes: [
        "Renewal of All Specialties Lifeguard certification",
        "Renewal of CPR - BLS for Healthcare Provider certification",
        "Renewal of First Aid certification",
        "Renewal of AED certification",
        "Updated course materials for all specialties"
      ],
      prerequisites: [
        "Current or recently expired All Specialties Lifeguard certification (within 30 days)",
        "Minimum 15 years of age",
        "Ability to swim 400 meters without stopping",
        "Ability to tread water for 4 minutes",
        "Ability to perform appropriate rescue techniques for all aquatic settings"
      ],
      objectives: [
        "Review and practice essential lifeguarding skills for all aquatic environments",
        "Update knowledge on current rescue techniques and protocols across all specialties",
        "Refresh CPR, First Aid, and AED skills",
        "Review facility safety management techniques for various aquatic settings",
        "Learn any new standards or procedures implemented since initial certification"
      ],
      certificationRequirements: [
        "Complete the abbreviated comprehensive Home-Study Course review",
        "Attend and successfully complete an extended in-person training session",
        "Pass both written and practical skills assessments for all specialties",
        "Demonstrate continued proficiency in all required rescue techniques"
      ],
      purchase: [
        "Abbreviated online Home-Study course with digital materials for all specialties",
        "Extended in-person recertification training (shorter than initial certification)",
        "Renewal of all certifications across all specialties",
        "Official Lifeguard Training Academy certification renewal"
      ]
    }
  }
};