import { Button } from "@/components/retroui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Text } from "@/components/retroui/Text";
import { Input } from "@/components/retroui/Input";
import { useQuiz } from "@/zustand/store";
import { useEffect, useState } from "react";
import { Loader } from "@/components/retroui/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog } from "@/components/retroui/Dialog";
import { useAuth } from "@/context/AuthContext";

export default function Play() {
  const { firebaseUser } = useAuth();
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { loading, fetchQuiz, quiz, activeQuestion, submitAnswer, resetQuiz } =
    useQuiz();
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchQuiz(quizId!).catch(() => navigate("/not-found"));
  }, [fetchQuiz, quizId, navigate]);

  const question = quiz[activeQuestion];

  const handleSubmit = () => {
    if (!question) return;
    const isCorrect =
      answer.trim().toLowerCase() === question.answer.toLowerCase();
    submitAnswer(isCorrect, 3, answer, firebaseUser!.uid);
    setAnswer("");
  };

  if (loading) {
    return (
      <div className="w-screen min-h-screen flex justify-center items-center">
        <Loader variant="secondary" />
      </div>
    );
  }

  if (!quiz.length || !question) return <p className="">No quiz available.</p>;

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center home-bg">
      <main className="max-w-sm w-full px-4 mx-auto flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-end">
          <Dialog>
            <Dialog.Trigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="hover:bg-red-600"
              >
                <ArrowLeft />
              </Button>
            </Dialog.Trigger>
            <Dialog.Content className="w-11/12 md:w-sm" size="sm">
              <Dialog.Header>
                <Text as="h5">Stop playing?</Text>
              </Dialog.Header>
              <section className="flex flex-col gap-4 p-4">
                <section className="text-xl">
                  <p>You’ll have to start over next time.</p>
                </section>
                <section className="flex w-full justify-end">
                  <Dialog.Trigger asChild>
                    <Button
                      onClick={() => {
                        resetQuiz();
                        navigate(-1);
                      }}
                    >
                      Confirm
                    </Button>
                  </Dialog.Trigger>
                </section>
              </section>
            </Dialog.Content>
          </Dialog>
          <div className="bg-white border-2 flex justify-center items-center px-2 py-1">
            <Text as="h4">
              {activeQuestion + 1}/{quiz.length}
            </Text>
          </div>
        </div>
        <div className="w-full bg-white p-6 border-2 mt-2 space-y-6">
          <Text as="h4" className="text-center">
            What is this puzzle saying?
          </Text>
          <div className="bg-[#ebe6e7] border-2 p-6">{question.image}</div>
          <Input
            type="text"
            placeholder="Your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></Input>
          <Button
            className="w-full flex items-center justify-center gap-1"
            onClick={() => {
              if (activeQuestion < quiz.length - 1) {
                handleSubmit();
              } else {
                handleSubmit();
                navigate("/results");
              }
            }}
          >
            {activeQuestion === quiz.length - 1 ? (
              "Finish"
            ) : (
              <>
                Next
                <ArrowRight size={20} />
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
