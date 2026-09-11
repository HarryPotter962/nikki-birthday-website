import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "../data/birthdayData.js";
import WelcomeScreen from "./WelcomeScreen.jsx";
import CakeCeremony from "./CakeCeremony.jsx";
import BirthdayCelebration from "./BirthdayCelebration.jsx";
import Navigation from "./Navigation.jsx";
import LetterSection from "./LetterSection.jsx";
import VideoSection from "./VideoSection.jsx";
import GiftsSection from "./GiftsSection.jsx";
import LoveReasons from "./LoveReasons.jsx";
import InteractiveReasons from "./InteractiveReasons.jsx";
import ForeverSurprise from "./ForeverSurprise.jsx";
import FinalSurprise from "./FinalSurprise.jsx";
import MusicPlayer from "./MusicPlayer.jsx";
import { FloatingHearts, ClientOnly } from "./FX.jsx";
import { useEasterEggs, EasterEggModal } from "./EasterEggs.jsx";

export default function BirthdayExperience() {
  const [stage, setStage] = useState("welcome"); // welcome | cake | journey
  const [musicRequest, setMusicRequest] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const eggs = useEasterEggs();

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [stage]);

  return (
    <main className="relative min-h-[100svh]">
      <AnimatePresence mode="wait">
        {stage === "welcome" && <WelcomeScreen key="welcome" onEnter={() => setStage("cake")} />}
        {stage === "cake" && (
          <CakeCeremony
            key="cake"
            musicPlaying={musicPlaying}
            onRequestMusic={() => setMusicRequest((request) => request + 1)}
            onDone={() => setStage("journey")}
          />
        )}
        {stage === "journey" && (
          <motion.div
            key="journey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="journey-content relative overflow-hidden"
          >
            <ClientOnly>
              <FloatingHearts count={8} />
            </ClientOnly>
            <Navigation />
            <BirthdayCelebration
              onSecret={eggs.clickHeart}
              onSecretHoldStart={eggs.startLongPress}
              onSecretHoldEnd={eggs.cancelLongPress}
            />
            <LetterSection />
            <VideoSection />
            <GiftsSection />
            <LoveReasons />
            <InteractiveReasons />
            <ForeverSurprise />
            <FinalSurprise />
            <footer className="relative z-10 px-5 pt-16 pb-32 text-center lg:pb-16">
              <div className="mx-auto mb-5 flex max-w-xs items-center justify-center gap-3 text-gold/70">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
                <span>✦</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
              </div>
              <p className="script text-2xl text-rose/90">Always, {data.name}</p>
              <p className="mt-3 text-[11px] tracking-wide text-muted-foreground/70">{data.signature}</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "cake" && (
        <MusicPlayer
          autoStart={false}
          playRequest={musicRequest}
          onPlayingChange={setMusicPlaying}
        />
      )}
      <EasterEggModal message={eggs.message} onClose={eggs.close} />
    </main>
  );
}
