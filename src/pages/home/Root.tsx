import { Button } from "@/components/retroui/Button";
import HeroText from "../../components/shared/Logo";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <div className="h-screen flex flex-col justify-center items-center home-bg">
      <main className="max-w-5xl mx-auto flex flex-col justify-center items-center p-10 bg-white border-4">
        <HeroText />
        <div className="flex flex-col items-center gap-4 mt-8">
          <Link to={"/sign-in"}>
            <Button className="mb-4">LOG IN</Button>
          </Link>
          <Button className="text-outlined" variant="link">
            HOW TO PLAY?
          </Button>
        </div>
      </main>
    </div>
  );
}
