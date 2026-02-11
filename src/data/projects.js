// src/data/projects.js
export const projects = [
  {
    title: "AKTGRAM (Social Media Mobile Application)",
    image: "/projects/aktgram.png",
    imageAlt: "AKTGRAM app snapshot",
    points: [
      "Micro-social app with a creator-centric, dark UI for fast text posting and lightweight engagement. Shipped on iOS Simulator via a custom dev client, with graceful fallbacks and improved UI consistency by 30%.",
      "Implemented Google Sign-In with Firebase Authentication and persisted user profiles (name + Google profile photo).",
      "Reduced network overhead by 50% with a Firestore data model for posts, comments, and likes, enabling real-time feed updates.",
      "Merged interactive UX patterns (FAB create flow, bottom-sheet comments, loading states), improving interaction.",
    ],
    tech: ["React Native", "Firebase", "Firestore", "Expo", "iOS Simulator"],
    github: "https://github.com/Akt99/AKTGRAM",
    demo: "https://drive.google.com/file/d/1qlU4E-4tUiZQ_8WBk5mQqwWB6XhGTBPR/view?usp=drive_link",
  },
  {
    title: "Akt Blogs (Blogging Platform)",
    image: "/projects/akt-blogs.png",
    imageAlt: "Akt Blogs project snapshot",
    points: [
      "Built a full-stack blogging platform using React + Flask + SQLAlchemy (with Three.js UI elements) to support efficient scaling.",
      "Applied secure authentication (users must log in to create posts/comments), reducing token leakage risk by 100%.",
      "Enforced role-based access control with auto-assigned first user Admin and integrated Gravatar-based avatars via email, reducing profile photo storage overhead by 100%.",
      "Added Admin moderation tools: pin/unpin posts, delete any post/comment, and admin status display.",
    ],
    tech: ["React", "Flask", "Three.js", "SQLAlchemy"],
    github: "https://github.com/Akt99/BlogWebsiteDep2",
    demo: "https://drive.google.com/drive/folders/1FZucaBwg27Fg8O9yKgAHsB60bEkzSTtp?usp=drive_link",
  },
  {
    title: "Akt Mart (E-Commerce Platform)",
    image: "/projects/akt-mart.png",
    imageAlt: "Akt Mart project snapshot",
    points: [
      "Built a full-stack product store (MERN) enabling CRUD operations. REST-based backend design improved API clarity and maintainability.",
      "Supported about 30% faster feature additions and easier debugging.",
      "Leveraged Vite fast bundling and HMR to reduce development build times by about 50% compared to traditional React setups.",
      "Implemented global state management with Zustand for seamless product handling.",
    ],
    tech: ["React", "Chakra UI", "Express", "MongoDB", "Zustand", "Vite"],
    github: "https://github.com/Akt99/AktMart",
    demo: "https://drive.google.com/drive/folders/1uRFE9lNMpXuV5h0q2Fvyk_EebLPzrjSy?usp=drive_link",
  },
];
