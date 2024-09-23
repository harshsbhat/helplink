'use client';
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "~/components/auth/nav";
import { supabase } from "~/lib/supabaseClient";
import { useToast } from "~/hooks/use-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    setLoading(false);

    if (error) {
      toast({
        title: `Failed to sign in with ${provider}`,
        description: error.message,
      });
    } else {
      router.push("/"); // Redirect to the home page or another route after successful sign-in
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}`,
      },
    });
    setLoading(false);

    if (error) {
      if (error.message === "Signups not allowed for otp") {
        toast({
          title: "Email doesn't exist",
          description: "Try signing up instead",
        });
      } else {
        toast({
          title: "Error",
          description: error.message,
        });
      }
    } else {
      toast({
        title: "Success",
        description: "Check your email for the magic link",
      });
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-10 mb-10">
      <Navbar />
      <div className="flex justify-between w-full max-w-6xl">
        {/* Left Side - Signup Form */}
        <Card className="w-[500px] my-8 border-none shadow-none">
          <CardHeader className="mb-4">
            <CardTitle className="text-2xl">
              <h2 className="mt-10 scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0 bg-gradient-to-r from-zinc-500 to-zinc-100 bg-clip-text text-transparent">
                Create new account
              </h2>
            </CardTitle>
            <CardDescription>
              New to Helplink?{" "}
              <Link className="text-blue-400" href={"/auth/signup"}>
                Sign Up
              </Link>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-2 mb-6">
              <Button
                className="w-full mb-2"
                variant="outline"
                onClick={() => handleOAuthLogin('github')}
                disabled={loading}
              >
                <FaGithub className="inline mr-2" /> GitHub
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleOAuthLogin('google')}
                disabled={loading}
              >
                <FaGoogle className="inline mr-2" /> Google
              </Button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 mb-4 text-zinc-400">
                  <Label htmlFor="email" className="font-normal mb-2">
                    Email:
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hey@harshbhat.me"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-4"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex mt-4">
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Processing..." : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Side - Empty Card with rainbow effect */}
        <Card className="w-[500px] my-8 border-none shadow-none hidden md:block">
          <CardContent className="flex justify-center items-center h-full">
            <p className="text-gray-400">Empty Card</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
