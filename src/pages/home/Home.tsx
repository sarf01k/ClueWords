import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useChallenges } from "@/zustand/store";
import { Loader } from "@/components/retroui/Loader";
import Header from "./../../components/Header";
import PlayAgainDialog from "@/components/Play-Again-Dialog";

export default function Home() {
  const { appUser } = useAuth();
  const navigate = useNavigate();
  const { fetchChallenges, challenges, loading, resetQuiz } = useChallenges();

  useEffect(() => {
    resetQuiz();
    fetchChallenges();
  }, [resetQuiz, fetchChallenges]);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 w-full flex justify-center items-center">
            <Loader variant="secondary" />
          </div>
        ) : (
          <div className="home-bg flex-1">
            <main className="h-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 p-8">
              {Object.entries(challenges).map(([id, challenge]) => {
                const playedChallenge = appUser?.playedChallenges?.[id];
                const hasPlayed = !!playedChallenge;
                const score = playedChallenge?.score;

                return (
                  <div
                    key={id}
                    className="bg-white border-4 transition hover:-translate-y-1 hover:shadow-md cursor-default"
                  >
                    <div className="bg-blue-400 border-b-4">
                      <img
                        src={challenge.image}
                        alt=""
                        width={220}
                        height={220}
                        className="mx-auto"
                      />
                    </div>
                    <div className="flex items-end justify-between p-4">
                      <div className="font-bold text-lg">
                        <p>Challenge #{challenge.no}</p>
                        <p>Score: {hasPlayed ? score : "-"}</p>
                      </div>
                      {hasPlayed ? (
                        <PlayAgainDialog
                          trigger={
                            <Button size="sm" variant="outline">
                              Replay
                            </Button>
                          }
                          onConfirm={() => navigate(`/play?challenge=${id}`)}
                        />
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => navigate(`/play?challenge=${id}`)}
                        >
                          Play
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </main>
            <div className="flex justify-center my-16">
              <div className="border-2 bg-white w-[90%] md:w-2/3 text-center py-8 px-4">
                <Text as="h5">more challenges soon...</Text>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
