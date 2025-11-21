import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="bg-primary py-4 px-2 border-b-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to={"/"}>
          <Logo size="sm" />
        </Link>
      </div>
    </header>
  );
}
