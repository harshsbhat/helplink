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
import Nav from "~/components/auth/nav";
import { supabase } from "~/lib/supabaseClient";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Spinner icon

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      setError(`Failed to login with ${provider}. ${error.message}`);
    } else {
      router.push('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false); // Stop loading if there's an error
    } else {
      setIsMagicLinkSent(true);
      setError(null);
      setLoading(false); // Stop loading when successful
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-10 mb-10">
      <Nav />
      <div className="flex justify-between w-full max-w-6xl">
        <Card className="w-[500px] my-8 border-none shadow-none">
          <CardHeader className="mb-4">
            <CardTitle className="text-2xl">
              <h2 className="mt-10 scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0 bg-gradient-to-r from-zinc-500 to-zinc-100 bg-clip-text text-transparent">
                Create new account
              </h2>
            </CardTitle>
            <CardDescription>
              Sign up to Helplink or?{" "}
              <Link className="text-blue-400" href={"/auth/signin"}>
                Sign in
              </Link>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-2 mb-4">
              <Button className="w-full mb-2" variant="outline" onClick={() => handleOAuthLogin('github')}>
                <FaGithub className="inline mr-2" /> GitHub
              </Button>
              <Button className="w-full" variant="outline" onClick={() => handleOAuthLogin('google')}>
                <FaGoogle className="inline mr-2" /> Google
              </Button>
            </div>

            <div className="flex items-center justify-center my-6">
              <div className="border-t border-gray-700 w-1/4 my-5"></div>
              <span className="text-zinc-400 mx-3 my-5 text-center">
                or continue using email
              </span>
              <div className="border-t border-gray-700 w-1/4 my-5"></div>
            </div>

            {!isMagicLinkSent ? (
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex space-x-4 mb-4">
                    <div className="flex flex-col w-full text-zinc-400">
                      <Label htmlFor="firstName" className="font-normal mb-2">
                        First Name:
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Jonny"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="p-4"
                        required
                      />
                    </div>
                    <div className="flex flex-col w-full text-zinc-400">
                      <Label htmlFor="lastName" className="font-normal mb-2">
                        Last Name:
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Sins"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="p-4"
                        required
                      />
                    </div>
                  </div>
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
                    />
                  </div>

                  {error && <p className="text-red-500">{error}</p>}
                </div>

                <div className="flex mt-4">
                  <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? (
                      <AiOutlineLoading3Quarters className="animate-spin inline mr-2" />
                    ) : (
                      'Send Magic Link'
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-green-500">Magic link sent! Please check your email.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="w-[500px] my-8 border-none shadow-none hidden md:block">
          <CardContent className="flex justify-center items-center h-full">
            <p className="text-gray-400">Empty Card</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
