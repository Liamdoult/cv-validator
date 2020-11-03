export const obj = {
  cvs: "1.0.0",
  info: {
    version: "1.0.1",
  },
  person: {
    firstname: "Ben",
    surname: "Miller",
    middle: "Andrew David",
    preferred: "Andrew",
  },
  contact: {
    email: ["ben.miller@gmail.com"],
    mobile: ["+44000000000"],
  },
  links: {
    youtube: "benmiller",
    github: "https://www.github.com/benmiller",
    linkedin: "benmiller",
    twitter: "benmiller",
    website: "http://www.benmiller.com/",
  },
  education: [
    {
      school: "Bayes Water High",
      type: "highschool",
      epoch: {
        start: {
          m: 0,
          y: 2010,
        },
        end: {
          m: 12,
          y: 2014,
        },
      },
      complete: true,
      location: "London, UK",
    },
    {
      school: "University of London",
      type: "university",
      epoch: {
        start: {
          m: 0,
          y: 2015,
        },
        end: {
          m: 11,
          y: 2017,
        },
      },
      complete: false,
      course: "BSc Computer Science",
      location: "London, UK",
    },
  ],
  workExperience: [
    {
      company: "Ben & Jerries",
      position: "Senior Ice-cream taster",
      epoch: {
        start: {
          m: 4,
          y: 2018,
        },
        end: {
          m: 8,
          y: 2020,
        },
      },
      location: "London, UK",
    },
  ],
  achievements: [
    {
      name: "Best taster",
      received: {
        d: 10,
        m: 10,
        y: 2019,
      },
      location: "London, UK",
    },
  ],
};
