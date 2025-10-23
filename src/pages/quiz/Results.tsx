import AvatarPFP from "@/components/Avatar";
import HeroText from "@/components/Hero-Text.component";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/retroui/Button";
import { useChallenges } from "@/zustand/store";
import { useEffect } from "react";
import PlayAgainDialog from "@/components/Play-Again-Dialog";
import { Check, X } from "lucide-react";

export default function Results() {
  const navigate = useNavigate();
  const { appUser } = useAuth();
  const { score, isCompleted, resetQuiz, challenge, answers } = useChallenges();

  useEffect(() => {
    if (!isCompleted) {
      navigate("/");
    }
  }, [isCompleted, navigate]);

  return (
    <div className="home-bg">
      <div className="bg-white min-h-[100dvh] py-16 px-4 max-w-4xl mx-auto space-y-20 border-x-4">
        <div className="flex justify-center">
          <Link to={"/"} className="inline-block">
            <HeroText size="90px" />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AvatarPFP size={80} />
          <h4 className="text-black font-extrabold">{appUser?.username}</h4>
          <p className="text-black font-extrabold text-3xl">{score} points</p>
          <div className="grid grid-cols-2 md:flex justify-center items-center gap-2 md:gap-4 text-center">
            <Button
              size="md"
              className="justify-center"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>

            <Button
              size="md"
              onClick={() => {
                navigate("/scoreboard");
              }}
            >
              Scoreboard
            </Button>

            <PlayAgainDialog
              trigger={
                <div className="col-span-2 flex justify-center">
                  <Button>Play again</Button>
                </div>
              }
              onConfirm={() => {
                resetQuiz();
                navigate(-1);
              }}
            />
          </div>
          <div className="mt-6">
            {answers.map((ans, i) => (
              <div key={i} className="flex not-md:flex-col items-center mb-6">
                <img
                  className="border-2 scale-75 shadow-md"
                  src={challenge?.questions[i].image}
                  alt="puzzle"
                />
                <div>
                  <p className="text-lg font-medium flex items-center gap-1">
                    Your answer: {ans.userAnswer}
                    {ans.isCorrect ? (
                      <Check color="#016630" strokeWidth={2.75} size={18} />
                    ) : (
                      <X color="#e7000b" strokeWidth={2.75} size={18} />
                    )}
                  </p>
                  <p className="text-lg font-medium">
                    Correct answer: {ans.correctAnswer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
