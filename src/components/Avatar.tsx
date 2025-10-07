import { useAuth } from "@/context/AuthContext";
import Avatar from "boring-avatars";

interface AvatarPFPProps {
  size?: number;
}

export default function AvatarPFP({ size }: AvatarPFPProps) {
  const { appUser } = useAuth();

  return (
    <Avatar
      className="border-2 rounded-full cursor-pointer"
      name={appUser?.email}
      variant="beam"
      colors={[
        "#92A1C6",
        "#146A7C",
        "#F0AB3D",
        "#C271B4",
        "#C20D90",
        "#ff7d10",
        "#0a0310",
      ]}
      size={size ? size : 32}
    />
  );
}
