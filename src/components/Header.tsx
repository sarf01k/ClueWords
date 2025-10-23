import { Link, useNavigate } from "react-router-dom";
import HeroText from "./Hero-Text.component";
import { Text } from "@/components/retroui/Text";
import { Menu } from "./retroui/Menu";
import AvatarPFP from "./Avatar";
import { User, Trophy, LogOut, PersonStanding, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Dialog } from "@/components/retroui/Dialog";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";

export default function Header() {
  const { appUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-primary py-4 px-2 border-b-2">
      <div className="max-w-5xl mx-auto flex justify-between">
        <Link to={"/"}>
          <HeroText size="90px" />
        </Link>

        <div className="gap-2 flex justify-end items-end">
          <Text as="h4" className="text-white custom-shadow">
            {localStorage.getItem("username")}
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

              <Menu.Item
                className="gap-2"
                onClick={() => navigate("/scoreboard")}
              >
                <Trophy size={18} color="#000000" />
                Scoreboard
              </Menu.Item>

              <Menu.Item className="gap-2" onClick={signOut}>
                <LogOut size={18} color="#C62828" />
                Log out
              </Menu.Item>
            </Menu.Content>
          </Menu>

          {/* Profile Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <Dialog.Content size="sm">
              <Dialog.Header>
                <Text as="h5">Profile</Text>
              </Dialog.Header>

              <div className="flex flex-col py-4 px-4 gap-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={20} />
                    <Text as="h4">{localStorage.getItem("username")!}</Text>
                  </div>
                  <AvatarPFP size={80} />
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4">
                    <h5 className="text-center font-semibold">CURRENT WEEK</h5>
                    <p className="font-medium">Score</p>
                    <p>{appUser?.weekCurrentScore}</p>
                    <p className="font-medium">Challenges Played</p>
                    <p>{appUser?.weekChallengeCount}</p>
                    <p></p>
                  </div>
                  <div className="border-l px-4">
                    <h5 className="text-center font-semibold">
                      OVERALL TOTALS
                    </h5>
                    <p className="font-medium">Score</p>
                    <p>{appUser?.overallCurrentScore}</p>
                    <p className="font-medium">Challenges Played</p>
                    <p>{appUser?.overallChallengeCount}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-6 text-sm">
                  <Calendar size={20} />
                  <h5>
                    Joined:{" "}
                    {appUser?.joinedAt instanceof Timestamp
                      ? appUser.joinedAt.toDate().toLocaleDateString("en-UK", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"}
                  </h5>
                </div>
              </div>
            </Dialog.Content>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
