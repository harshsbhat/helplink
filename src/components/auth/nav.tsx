import Link from "next/link";
import { FaGithub } from "react-icons/fa"; // Import the GitHub icon

export default function Navbar() {
  return (
    <nav className=" text-white p-4 fixed top-0 left-0 w-full z-50 mt-5">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Helplink Logo/Title with Gradient */}
        <div className="text-2xl font-bold bg-gradient-to-r from-zinc-500 to-zinc-100 bg-clip-text text-transparent">
          <Link href="/">
            Helplink
          </Link>
        </div>

        {/* GitHub Icon in the Right Corner */}
        <div>
          <Link href="https://github.com/grantx-dev/helplink" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl hover:text-zinc-300 transition-colors" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
