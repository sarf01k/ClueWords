import { Link, useNavigate } from "react-router-dom";
import HeroText from "./Hero-Text.component";
import { Text } from "@/components/retroui/Text";
import { Menu } from "./retroui/Menu";
import AvatarPFP from "./Avatar";
import { User, Trophy, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { appUser, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-primary py-4 px-2 border-b-2">
      <div className="max-w-5xl mx-auto flex justify-between">
        <Link to={"/home"} className="">
          <HeroText size="90px" />
        </Link>
        <div className="gap-2 flex justify-end items-end">
          <Text as="h4" className="text-white custom-shadow">
            {appUser?.username}
          </Text>
          <Menu>
            <Menu.Trigger>
              <AvatarPFP />
            </Menu.Trigger>
            <Menu.Content className="min-w-36">
              <Menu.Item
                className="gap-2"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <User size={18} color="#000000" />
                Profile
              </Menu.Item>
              <Menu.Item className="gap-2">
                <Trophy size={18} color="#000000" />
                Scoreboard
              </Menu.Item>
              <Menu.Item className="gap-2" onClick={signOut}>
                <LogOut size={18} color="#C62828 " />
                Log out
              </Menu.Item>
            </Menu.Content>
          </Menu>
        </div>
      </div>
    </header>
  );
}
