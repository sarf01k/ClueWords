import Header from "@/components/Header";
import { Loader } from "@/components/retroui/Loader";
import { Table } from "@/components/retroui/Table";
import { Text } from "@/components/retroui/Text";
import { getScoreboard } from "@/services/scoreboardService";
import type { ScoreboardEntry } from "@/types/models";
import { useEffect, useState } from "react";

export default function Scoreboard() {
  const [scoreboard, setScoreboard] = useState<ScoreboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScoreboard() {
      const data: ScoreboardEntry[] = await getScoreboard();
      setScoreboard(data);
      setLoading(false);
    }
    fetchScoreboard();
  }, []);

  return (
    <div className="home-bg min-h-[100dvh] flex flex-col">
      <Header />
      <Table className="md:max-w-2xl lg:max-w-3xl mb-6 mx-auto">
        <Table.Caption className="bg-white border-2">
          <Text as="h3">Weekly Scoreboard</Text>
        </Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head className="">#</Table.Head>
            <Table.Head>Player</Table.Head>
            <Table.Head className="text-center">Challenges Played</Table.Head>
            <Table.Head>Score</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body className="bg-white">
          {loading ? (
            <Table.Row>
              <Table.Cell colSpan={4}>
                <div className="w-full py-2 flex justify-center items-center">
                  <Loader variant="secondary" size="sm" />
                </div>
              </Table.Cell>
            </Table.Row>
          ) : (
            scoreboard.map((entry, index) => (
              <Table.Row key={index}>
                <Table.Cell className="font-medium">{index + 1}</Table.Cell>
                <Table.Cell>{entry.username}</Table.Cell>
                <Table.Cell className="text-center">
                  {entry.weekChallengeCount}
                </Table.Cell>
                <Table.Cell>{entry.score}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
