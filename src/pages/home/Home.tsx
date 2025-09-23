import { Button } from "@/components/retroui/Button";
import { Play, Trophy } from "lucide-react";
import HeroText from '../../components/Hero-Text.component';

export default function Home() {
  return (
    <div className="h-screen home-bg">
      <div className="h-full max-w-5xl mx-auto">
        <header></header>
        <main className="h-full flex flex-col justify-center items-center">
          <div className="fade py-20 px-24 md:px-32">
            <HeroText />
          </div>
          <Button size={"md"}><Play className="mr-2" size={20} />PLAY</Button>
          <Button className="my-4"><Trophy className="mr-2" size={20} />LEADERBOARD</Button>
          <Button className="text-outlined" variant="link">HOW TO PLAY?</Button>
        </main>
      </div>
    </div >
  )
}