/* =========================================================================
 *  ❤️  NIKKI'S BIRTHDAY — YOUR ONE AND ONLY CONFIG FILE
 * =========================================================================
 *  Everything on the website comes from this file.
 *  Change the text here and the site updates. No other file needed.
 *
 *  WHERE TO PUT FILES
 *  ------------------
 *  Photos  ->  src/assets/images/    then use  "/src/assets/images/x.jpg"
 *              (easiest: drop them into  public/images/  and use "/images/x.jpg")
 *  Videos  ->  public/videos/        then use  "/videos/x.mp4"
 *  Music   ->  public/music/         then use  "/music/song.mp3"
 *  Files   ->  public/documents/     then use  "/documents/x.pdf"
 *
 *  Anything left empty just shows a beautiful placeholder — nothing breaks.
 * ========================================================================= */

const birthdayData = {
  // ---- THE BASICS -------------------------------------------------------
  name: "Nikki",
  from: "Suryadev Your truely loved one",
  birthday: "2026-09-12", // YYYY-MM-DD  (used by the countdown)

  // ---- CINEMATIC OPENING (each line appears one by one) -----------------
  intro: [
    "Hey meri jaan... ❤️",
    "Aaj ka din thoda extra special hai... ✨",
    "Kyuki aaj meri sabse pyaari princess ka birthday hai. 👑",
  ],
  enterButton: "Enter Your Birthday Surprise ❤️",

  // ---- CAKE CEREMONY ----------------------------------------------------
  cake: {
    lines: [
      "Sab surprises shuru karne se pehle...",
      "Ek chhota sa birthday ritual baaki hai. 🎂",
      "Chalo meri princess, cake cut karte hain. ❤️",
    ],
    blowHint: "Tap each candle to blow it out 🕯️",
    cutHint: "Now take the knife and cut the cake 🔪",
    wishNote: "Close your eyes. Make a wish. I hope it comes true.",
    afterCelebration: "Okay... now your actual surprises begin. 👀❤️",
  },

  // ---- THE LETTER -------------------------------------------------------
  letter: {
    greeting: "Dear Nikki,",
    // Each string is a paragraph. Add as many as you like.
    paragraphs: [
      "Nikki, aaj tumhara birthday hai, aur sach bolun toh mujhe samajh hi nahi aa raha ki kahan se start karun. Tum mere liye sirf ek person nahi ho jise main birthday wish kar raha hoon, tum woh ho jiske hone se meri life thodi aur beautiful lagti hai. I love you, and maybe words will never be enough to explain just how much.",

  "Tumhare saath bitaya hua har little moment mere liye special hai. Chahe hum kitni bhi random baatein karein, bina kisi reason ke hasein, ek dusre ko pagal karein, ya phir kisi chhoti si baat par lad padein — I still wouldn't change any of it. Kyunki mere liye tumhare saath guzra hua time kabhi ordinary nahi hota. Tum ho, isliye woh moment special ban jaata hai.",

  "I want to thank you for being you. Thank you meri life mein aane ke liye, mujhe samajhne ke liye, meri stupid baatein tolerate karne ke liye, aur un countless little things ke liye jo tum karti ho aur shayad tumhe khud bhi realize nahi hota. Tumhari smile, tumhari laugh, tumhara care karna — I genuinely love all of it. And more than anything, I love the way you make me feel just by being around.",

  "Aaj main tumhare liye sirf ek happy birthday nahi kehna chahta. Main chahta hoon ki tumhari life ka ye naya year tumhare liye sabse beautiful ho. Tumhare saare dreams poore hon, tum hamesha smile karo, tumhe har woh happiness mile jo tum deserve karti ho, aur jab bhi life difficult ho, tumhe kabhi ye feel na ho ki tum alone ho. I'll always want to see you happy, because your happiness genuinely means a lot to me.",

  "Happy Birthday meri Nikki, meri Princess Baby. ❤️ I love you more than I can put into words, and I'm so lucky that I get to call you mine. Bas aaj ke din ek promise karna — khud ko kabhi kam mat samajhna, because for me, you are one of the most precious people in this world. I hope this birthday becomes the beginning of the most beautiful chapter of your life. Happy Birthday, my love. ❤️"
    ],
    signOff: "With love ❤️",
  },

  // ---- MEMORY GALLERY ---------------------------------------------------
  // image: leave "" for an elegant placeholder, or "/images/one.jpg"
  memories: [
    { image: "", title: "First Memory ❤️", caption: "Where all of this quietly began.", date: "The beginning" },
    { image: "", title: "That One Day", caption: "We laughed until nothing else mattered.", date: "Unforgettable" },
    { image: "", title: "Golden Hour", caption: "You, the light, and my favourite silence.", date: "Evening" },
    { image: "", title: "Little Things", caption: "The tiny moments nobody else would notice.", date: "Always" },
    { image: "", title: "Your Smile", caption: "The reason my worst days got better.", date: "Every day" },
    { image: "", title: "More To Come", caption: "This gallery is nowhere near finished.", date: "The future" },
  ],

  // ---- TIMELINE ---------------------------------------------------------
  timeline: [
    { title: "The day we met", text: "I had no idea how much was about to change." },
    { title: "The first real talk", text: "Hours disappeared and neither of us noticed." },
    { title: "The day it became something", text: "Some feelings stop asking for permission." },
    { title: "Today", text: "Celebrating you, exactly as you are." },
    { title: "Everything after this", text: "Still unwritten. Still yours." },
  ],

  // ---- VIDEOS -----------------------------------------------------------
  // Put files in public/videos/ and use the path here.
  videos: [
    {
      src: "/videos/for-nikki.mp4",
      poster: "",
      title: "For Nikki ❤️",
      description: "A little Birthday Video made for you.",
    },
    {
      src: "/videos/for-nikki2.mp4",
      poster: "",
      title: "My Princess👑",
      description: " I made a cute video and the song I add dedicated to you",
    },
  ],
  videoIntro: "There's something I made for you...",

  // ---- SURPRISE BOXES ---------------------------------------------------
  surprises: [
    { icon: "🎁", title: "Open Me", message: "You opened it. Of course you did. That curiosity is one of my favourite things about you." },
    { icon: "💌", title: "A Secret Message", message: "I think about you far more often than I ever admit out loud." },
    { icon: "🌙", title: "Read This When You Miss Me", message: "Wherever you are right now — I'm somewhere thinking about you too. Always." },
    { icon: "✨", title: "One Little Thing", message: "Your laugh. That's it. That's the whole message." },
    { icon: "❤️", title: "Something I've Never Said", message: "You changed the way I look at ordinary life, and you did it without even trying." },
    { icon: "☕", title: "For A Bad Day", message: "Bad days end. You don't. Breathe — I've got you." },
    { icon: "🎧", title: "Our Song", message: "Every time it plays, it's you. That's not a coincidence anymore." },
    { icon: "🌻", title: "A Promise", message: "I'll keep choosing you on the easy days and the difficult ones." },
  ],

  // ---- GIFTS ------------------------------------------------------------
  // type: "message" | "image" | "video" | "link" | "song" | "download" | "birthday-card" | "favorite-person"
  gifts: [
    { icon: "🎵", title: "A Song For You", teaser: "Press play later.", type: "song", content: "", link: "" },
    { icon: "🖼️", title: "A Picture", teaser: "Framed and waiting.", type: "image", content: "/images/your-picture.jpg" },
    { icon: "🥰", title: "Your Favourite Gift", teaser: "Open me and choose carefully...", type: "favorite-person", content: "/images/favorite-gift.jpg" },
    { icon: "💌", title: "Your Birthday Card", teaser: "A little something for you 💖", type: "birthday-card" },
  ],

  // ---- INTERACTIVE BIRTHDAY CARD ---------------------------------------
  // Replace these five paths with the images you upload.
  birthdayCard: {
    cardPage1: "/images/card-page-1.jpg",
    cardPage2: "/images/card-page-2.jpg",
    cardPage3: "/images/card-page-3.jpg",
    cardPage4: "/images/card-page-4.jpg",
    cardPage5: "/images/card-page-5.jpg",
    song: "/music/song.mp3",
    pdf: "/documents/nikki-birthday-card.pdf",
  },

  // ---- THINGS I LOVE ABOUT YOU -----------------------------------------
  reasons: [
    "Tumhari woh real smile, jo poori duniya se zyada beautiful hai. 😊",
    "Jab tum kisi cheez ko lekar excited hoti ho, tumhara woh cute sa way of talking. ✨",
    "Tum ordinary moments ko bhi itna special bana deti ho ki woh memories ban jaate hain. 💕",
    "Tumhari kindness, even un logon ke liye jo uske deserve bhi nahi karte. 🌸",
    "Tumhari presence se room hi nahi, mera poora mood change ho jaata hai. ❤️",
    "Simply... tum. Aur honestly, mujhe kisi aur reason ki zaroorat bhi nahi. 👑",
  ],

  // ---- INTERACTIVE FLOATING MESSAGES -----------------------------------
  floatingMessages: [
    { icon: "❤️", message: "Kyuki tum mere ordinary days ko bhi better bana deti ho." },
    { icon: "✨", message: "Kyuki tumhari presence hi kuch alag special feel hoti hai." },
    { icon: "🌙", message: "Kyuki tum jaisi koi aur hai hi nahi, aur kabhi ho bhi nahi sakti." },
    { icon: "⭐", message: "Kyuki tum mujhe hamesha yaad dilati ho ki main better deserve karta hoon." },
    { icon: "🌸", message: "Kyuki tumhare saath silence bhi comfortable aur beautiful lagta hai." },
    { icon: "💫", message: "Kyuki tum meri ordinary life ka sabse beautiful part ho." },
    { icon: "🕯️", message: "Kyuki tumhare andar ek light hai jo shayad tum khud bhi notice nahi karti." },
    { icon: "🎀", message: "Kyuki tum bilkul one of one ho. Truly, nobody quite like you." },
  ],

  // ---- FINAL SURPRISE ---------------------------------------------------
  final: {
    tease: "You've reached the end...",
    tease2: "But I saved one last thing for you.",
    button: "Open Your Last Message From  ❤️",
    // Each line reveals slowly, one after another.
    message: [
      "Nikki,",
      "I hope today reminds you of just how special you are For me Gudiya.",
      "Not because of what you do for anyone.",
      "But simply because you exist and loved  me and Haan Next Birthday apke sath hi manunga main.😘😭❤️",
      "Happy Birthday Once again my Birthday Girl. ❤️",
      
    ],
  },

  // ---- EASTER EGGS ------------------------------------------------------
  easterEggs: {
    heartFiveClicks: "You clicked it five times. You really are curious 👀 — okay, here's a secret: I reallly Want  to Hugggg right now Babyyyy 🫂❤️and I am so much  addicted to You apke bin nhi lagta man mera I dont want to loose u in any cost because I only want You and You only You my Princess. Next Birthday Main Apke sath Hi manunga😭❤️",
    longPress: "Long press? Impressive 🕵️ Secret unlocked: Waah yeh kase khula yeh mushkil hai doondhna ager khol diya hai to matlab kammal ho vase bhi ho yaar aap kamal dhamaal So Secret kya hai jannene aye Happy Birthday Baby 😘 and Love You so much yaaar❤️😘AAP hi ho mere dost pyaar hamsafar sab kuch tum se hi shuru hua hai or khatam bhi Love You till my last breath Baby and I dont wanna Loose You because I am deeply In love With You😭❤️😘.",
    konami: "Okay legend 🎮 You found the hidden one. I love you.",
  },

  // ---- MUSIC ------------------------------------------------------------
  // Put files in public/music/ and list them here. Empty list = no player.
  music: [
    { title: "Our Song", src: "/music/our-song.mp3" },
  ],

  // ---- SIGNATURE --------------------------------------------------------
  signature: "Made with ❤️ heart Thankyou Love. ",
};

export default birthdayData;
