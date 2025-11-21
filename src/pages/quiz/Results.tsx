import Logo from "@/components/shared/Logo";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/retroui/Button";
import { useChallenges } from "@/zustand/store";
import { useEffect } from "react";
import PlayAgainDialog from "@/components/shared/Play-Again-Dialog";

export default function Results() {
  const navigate = useNavigate();
  const { score, isCompleted, resetQuiz, challenge, answers } = useChallenges();

  useEffect(() => {
    if (!isCompleted) {
      navigate("/");
    }
  }, [isCompleted, navigate]);

  return (
    <div className="home-bg">
      <div className="bg-white py-16 px-4 max-w-4xl mx-auto space-y-20 border-x-4">
        <div className="flex justify-center">
          <Link to={"/"} className="inline-block">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-black font-extrabold">
            <span className=" text-5xl">{score}</span>
            &nbsp;
            <span className="text-3xl">points</span>
          </div>
          <div className="flex gap-4 mt-4">
            <Button
              size="md"
              className="justify-center"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
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
          <div className="mt-14 space-y-8">
            {answers.map((ans, i) => (
              <div
                key={i}
                className="flex not-md:flex-col not-md:items-center gap-6"
              >
                <div className="relative">
                  <img
                    className="border-2 shadow-md"
                    src={challenge?.questions[i].image}
                    alt="puzzle"
                  />
                  <div className="bg-black absolute -top-3 -left-3 text-white py-1 px-3">
                    {i + 1}
                  </div>
                </div>
                <div className="flex flex-col justify-between lg:py-4">
                  <div className="flex flex-col">
                    <div>
                      <span className="text-sm text-gray-600">
                        Your answer: &nbsp;
                      </span>
                      {ans.isCorrect ? (
                        <span className="font-bold text-[#4ADE80]">
                          {ans.userAnswer} ✓
                        </span>
                      ) : (
                        <span className="font-bold text-red-500">
                          {ans.userAnswer} ✖
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Correct answer: &nbsp;
                      </span>
                      <span className="text-md font-bold">
                        {ans.correctAnswer.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
