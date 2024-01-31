import Link from "next/link";
import { Button } from "./ui/button";
import Profile from "./Profile";

export default function Navbar() {
  return (
    <div className="flex justify-between h-20 mx-3">
      <Button variant="link">
        <Link href="/">
          <h1 className="text-xl font-bold">Logo</h1>
        </Link>
      </Button>

      <Profile />
    </div>
  );
}
