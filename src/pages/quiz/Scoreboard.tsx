import Header from "@/components/Header";
import { Table } from "@/components/retroui/Table";
import { Text } from "@/components/retroui/Text";
import { getScoreboard } from "@/services/scoreboardService";
import type { ScoreboardEntry } from "@/types/models";
import { useEffect, useState } from "react";

export default function Scoreboard() {
  const [scoreboard, setScoreboard] = useState<ScoreboardEntry[]>([]);

  useEffect(() => {
    async function fetchScoreboard() {
      const data: ScoreboardEntry[] = await getScoreboard();
      setScoreboard(data);
    }
    fetchScoreboard();
  }, []);

  return (
    <div className="home-bg min-h-[100dvh] flex flex-col">
      <Header />
      <Table className="max-w-60 md:max-w-2xl lg:max-w-3xl mb-6 mx-auto">
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
          {scoreboard.map((entry, index) => (
            <Table.Row key={index}>
              <Table.Cell className="font-medium">{index + 1}</Table.Cell>
              <Table.Cell>topboyasantedddddd</Table.Cell>
              <Table.Cell className="text-center">
                {entry.weekCurrentScore}
              </Table.Cell>
              <Table.Cell>{entry.score}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
