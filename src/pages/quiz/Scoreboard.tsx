import Header from "@/components/Header";
import { Table } from "@/components/retroui/Table";
import { Text } from "@/components/retroui/Text";
import { useEffect } from "react";

const invoices = [
  {
    invoice: "INV001",
    customer: "John Doe",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    customer: "Jane Doe",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    customer: "Mark Doe",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    customer: "Robert Doe",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    customer: "Isabella Doe",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    customer: "Mrs. Doe",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    customer: "Mr. Doe",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function Scoreboard() {
  useEffect(() => {}, []);

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
          {invoices.map((invoice) => (
            <Table.Row key={invoice.invoice}>
              <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
              <Table.Cell>{invoice.customer}</Table.Cell>
              <Table.Cell className="text-center">1</Table.Cell>
              <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
