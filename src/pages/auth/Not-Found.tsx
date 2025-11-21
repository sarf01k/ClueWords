import Header from "@/components/shared/Header";
import { Text } from "@/components/retroui/Text";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        <div className="text-center">
          <Text className="text-9xl" as="p">
            404
          </Text>
          <Text className="text-5xl" as="p">
            Page Not Found
          </Text>
        </div>
      </div>
    </div>
  );
}
