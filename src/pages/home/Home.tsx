import { Button } from "@/components/retroui/Button";
import { LogOut, Play, Trophy, User } from "lucide-react";
import HeroText from "../../components/Hero-Text.component";
import Avatar from "boring-avatars";
import { Text } from "@/components/retroui/Text";
import { Menu } from "@/components/retroui/Menu";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { appUser, signOut } = useAuth();

  const logOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col home-bg">
      <header className="bg-primary py-4 px-2 border-b-2">
        <div className="max-w-5xl mx-auto">
          <div className="gap-2 flex justify-end items-end">
            <Text as="h5" className="text-white custom-shadow">
              {appUser?.username}
            </Text>
            <Menu>
              <Menu.Trigger asChild>
                <Avatar
                  className="border-2 rounded-full cursor-pointer"
                  name="isaacsarfo2004@gmail.com"
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
                  size={32}
                />
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
            <Button size={"md"}>
              <Play className="mr-2" size={20} />
              PLAY
            </Button>
            <Button>
              <Trophy className="mr-2" size={20} />
              LEADERBOARD
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
