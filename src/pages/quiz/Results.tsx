import AvatarPFP from "@/components/Avatar";
import HeroText from "@/components/Hero-Text.component";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { useChallenges } from "@/zustand/store";
import { useEffect } from "react";
import { Dialog } from "@/components/retroui/Dialog";

export default function Results() {
  const navigate = useNavigate();
  const { appUser } = useAuth();
  const { score, isCompleted, resetQuiz, answers } = useChallenges();

  useEffect(() => {
    if (!isCompleted) {
      navigate("/home");
    }
  }, [isCompleted, navigate]);

  return (
    <div className="min-h-[100dvh] p-16 max-w-5xl mx-auto space-y-20">
      <div className="flex justify-center">
        <Link to={"/"} className="inline-block">
          <HeroText size="90px" />
        </Link>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarPFP size={80} />
        <h4 className="text-black font-extrabold">{appUser?.username}</h4>
        <p className="text-black font-extrabold text-3xl">{score} points</p>
        <div className="flex gap-4">
          <Button
            size={"md"}
            onClick={() => {
              resetQuiz();
              navigate("/home");
            }}
          >
            Menu
          </Button>
          <Button
            size={"md"}
            onClick={() => {
              // resetQuiz();
              // navigate("/home");
            }}
          >
            Scoreboard
          </Button>
          <Dialog>
            <Dialog.Trigger asChild>
              <Button size={"md"}>Play Again</Button>
            </Dialog.Trigger>
            <Dialog.Content className="w-11/12 md:w-sm" size="sm">
              <Dialog.Header>
                <Text as="h5">Play again?</Text>
              </Dialog.Header>
              <section className="flex flex-col gap-4 p-4">
                <section className="text-xl">
                  <p>This won't overwrite your previous score.</p>
                </section>
                <section className="flex w-full justify-end">
                  <Dialog.Trigger asChild>
                    <Button
                      onClick={() => {
                        resetQuiz();
                        navigate(-1);
                      }}
                    >
                      Play
                    </Button>
                  </Dialog.Trigger>
                </section>
              </section>
            </Dialog.Content>
          </Dialog>
        </div>
        {answers.map((ans) => (
          <div>
            <p>{ans.correctAnswer}</p>
            <p>{ans.userAnswer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
