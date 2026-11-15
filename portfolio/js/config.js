/* ===== EDIT YOUR CONTENT HERE =====
   Replace files (keep the names):
   - Photo       : assets/profile/dhrubajyoti.png
   - Logos       : assets/logos/webli.png | pageexplorer.png | studytracker.png
   - Screenshots : add assets/projects/project-01.png ... then set hasImage:true on that project
*/
window.SITE = {
  name: "Dhrubajyoti Sharma",
  location: "Maynaguri, West Bengal, India",
  email: "hello@yourdomain.com",              // TODO: your professional email
  phone: "+91 00000 00000", showPhone: false, // phone stays hidden unless showPhone: true
  links: { linkedin: "", github: "", instagram: "",   // "" = shown as "coming soon"
           fiverr: "https://www.fiverr.com/users/dev_dhrubajyoti/portfolio" },
  // Contact form endpoint (Formspree, Web3Forms, etc.). Empty = form honestly reports "not connected".
  formEndpoint: "",
  intro: "I build digital experiences, develop technology products and explore new possibilities through code.",
  skills: [
    ["Development", ["Website Development","Frontend Development","Backend Development","Application Development","Responsive Design"]],
    ["Modern Development", ["Vibe Coding","AI-Assisted Development","Code Architecture","Software Development","API Integration"]],
    ["Database & Infrastructure", ["Database Design","Database Management","Database Analysis","Authentication","Data Integration"]],
    ["Integrations", ["AI Integrations","Payment Gateway Integration","Google Integrations","Third-Party APIs","Backend Services"]],
    ["Business & Entrepreneurship", ["Product Thinking","Business Development","Startup Building","Problem Solving","Creative Thinking"]]
  ],
  companies: [
    { name:"Webli Pvt Limited", logo:"assets/logos/webli.png", role:"Founder", category:"Website Development Agency",
      headline:"Building the Digital Foundation of Businesses.",
      desc:"Webli is a website development agency focused on building professional websites and modern web experiences for businesses.",
      involvement:"I founded Webli and lead both its development work and its business operations.",
      services:["Business websites","Responsive design","Web applications","Integrations"], tech:[] },
    { name:"PageExplorer", logo:"assets/logos/pageexplorer.png", role:"CEO", category:"E-book Marketplace",
      headline:"Turning Digital Knowledge Into Accessible Experiences.",
      desc:"PageExplorer is an independent digital platform that brings readers and digital publications together through an e-book marketplace.",
      involvement:"As CEO, I lead the product direction and the development of the platform.",
      services:["E-book browsing","Digital publishing","Product development"], tech:["Vanilla JavaScript","Supabase","Razorpay","Cloudflare"] },
    { name:"StudyTrack", logo:"assets/logos/studytracker.png", role:"App Developer", category:"Education Tracking Application",
      headline:"Building Better Systems for Smarter Learning.",
      desc:"StudyTrack is an education-focused app that helps students organise study sessions, track progress, build consistency and understand their learning habits.",
      involvement:"I plan and develop the application, from product direction to the app itself.",
      services:["Study session tracking","Progress statistics","Consistency building"], tech:["Flutter","Android"] }
  ],
  // Selected works. After adding assets/projects/<img>, set hasImage:true.
  projects: [
    { title:"Doctors Website", category:"Demo Website · Healthcare", desc:"A demo website concept for a doctor's practice.", contribution:"Design and development", tech:[], status:"Live demo", url:"https://demowebsite-lxtazu5iw-dhrubajyoti-sharma.vercel.app/", img:"project-01.png", hasImage:false },
    { title:"Dentist Website", category:"Demo Website · Healthcare", desc:"A demo website concept for a dental clinic.", contribution:"Design and development", tech:[], status:"Live demo", url:"https://dentaldemowebsite.lovable.app", img:"project-02.png", hasImage:false },
    { title:"Gym Website", category:"Demo Website · Fitness", desc:"A demo website concept for a gym.", contribution:"Design and development", tech:[], status:"Live demo", url:"https://gym-demo.alpha-dhrubajyoti.workers.dev", img:"project-03.png", hasImage:false },
    { title:"Restaurant Website", category:"Demo Website · Food & Hospitality", desc:"A demo website concept for a restaurant.", contribution:"Design and development", tech:[], status:"Live demo", url:"https://resturant-demo.alpha-dhrubajyoti.workers.dev/", img:"project-04.png", hasImage:false },
    { title:"Savoria Restaurant", category:"Demo Website · Food & Hospitality", desc:"A second restaurant website concept with its own visual direction.", contribution:"Design and development", tech:[], status:"Live demo", url:"https://savoria-mmyya34.public.builtwithrocket.new", img:"project-05.png", hasImage:false },
    { title:"LuxStay Hotel", category:"Demo Website · Hospitality", desc:"A demo website concept for a hotel.", contribution:"Design and development", tech:[], status:"Live demo", url:"https://luxstay-pgn3i45.public.builtwithrocket.new", img:"project-06.png", hasImage:false },
    { title:"Fiverr Portfolio", category:"Freelance Profile", desc:"My freelance portfolio on Fiverr, with more of my website work.", contribution:"Profile owner", tech:[], status:"Active", url:"https://www.fiverr.com/users/dev_dhrubajyoti/portfolio", img:"project-07.png", hasImage:false }
  ]
};
