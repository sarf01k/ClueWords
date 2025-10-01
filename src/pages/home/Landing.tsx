import { Button } from "@/components/retroui/Button";
import HeroText from "../../components/Hero-Text.component";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="h-screen flex flex-col home-bg">
      {/* <header className="bg-primary py-4 border-b-2">
        <div className="max-w-5xl mx-auto">
          <div className="gap-2 flex justify-end items-end">
            <Button className="bg-white" variant="outline">
              Log in
            </Button>
          </div>
        </div>
      </header> */}
      <div className="flex-1 max-w-5xl mx-auto">
        <main className="h-full flex flex-col justify-center items-center">
          <div className="fade py-20 px-24 md:px-32">
            <HeroText />
          </div>
          <Link to={"/sign-in"}>
            <Button className="mb-8">LOG IN</Button>
          </Link>
          <Button className="text-outlined" variant="link">
            HOW TO PLAY?
          </Button>
        </main>
      </div>
    </div>
  );
}
