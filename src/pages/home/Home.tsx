import { Button } from "@/components/retroui/Button";
import { LogOut, Play, Trophy, User } from "lucide-react";
import HeroText from "../../components/Hero-Text.component";
import { Text } from "@/components/retroui/Text";
import { Menu } from "@/components/retroui/Menu";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AvatarPFP from "./../../components/Avatar";

export default function Home() {
  const { appUser, signOut } = useAuth();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col home-bg">
      <header className="bg-primary py-4 px-2 border-b-2">
        <div className="max-w-5xl mx-auto flex justify-between">
          <Link to={"/home"}>
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
                <Menu.Item className="gap-2">
                  <User size={18} color="#000000" />
                  Profile
                </Menu.Item>
                <Menu.Item className="gap-2" onClick={logOut}>
                  <LogOut size={18} color="#C62828 " />
                  Log out
                </Menu.Item>
              </Menu.Content>
            </Menu>
          </div>
        </div>
      </header>
      <div className="flex-1 flex justify-center items-center">
        <main className="max-w-5xl mx-auto flex flex-col justify-center items-center p-10 bg-white border-2">
          <HeroText />
          <div className="flex flex-col items-center gap-4 mt-8">
            <Button
              size={"md"}
              onClick={() => navigate(`/play/${appUser?.quizCount}`)}
            >
              <Play className="mr-2" size={20} />
              PLAY
            </Button>
            <Button>
              <Trophy className="mr-2" size={20} />
              SCOREBOARD
            </Button>
            <Button className="text-outlined" variant="link">
              HOW TO PLAY?
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
