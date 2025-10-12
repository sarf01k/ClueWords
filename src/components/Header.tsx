import { Link, useNavigate } from "react-router-dom";
import HeroText from "./Hero-Text.component";
import { Text } from "@/components/retroui/Text";
import { Menu } from "./retroui/Menu";
import AvatarPFP from "./Avatar";
import { User, Trophy, LogOut, PersonStanding } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Dialog } from "@/components/retroui/Dialog";
import { useState } from "react";

export default function Header() {
  const { appUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
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
              {/* Profile opens Dialog */}
              <Menu.Item
                className="gap-2"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <PersonStanding size={18} color="#000000" />
                Profile
              </Menu.Item>

              <Menu.Item className="gap-2" onClick={() => navigate("/account")}>
                <User size={18} color="#000000" />
                Account
              </Menu.Item>

              <Menu.Item className="gap-2">
                <Trophy size={18} color="#000000" />
                Scoreboard
              </Menu.Item>

              <Menu.Item className="gap-2" onClick={signOut}>
                <LogOut size={18} color="#C62828" />
                Log out
              </Menu.Item>
            </Menu.Content>
          </Menu>

          <Dialog open={open} onOpenChange={setOpen}>
            <Dialog.Content className="w-11/12 md:w-sm" size="sm">
              <Dialog.Header>
                <Text as="h5">Profile</Text>
              </Dialog.Header>

              <div className="flex flex-col py-4 px-12 gap-4">
                <div className="flex flex-col items-center gap-4">
                  <Text as="h4">{appUser?.username}</Text>
                  <AvatarPFP size={120} />
                </div>
                <div className="font-bold text-lg">
                  <p>Score: {appUser?.currentScore}</p>
                  <p>Challenges played: {appUser?.challengesCount}</p>
                </div>
              </div>
            </Dialog.Content>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
