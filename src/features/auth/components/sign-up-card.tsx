import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { SignInFlow } from "../types";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const MIN_PASSWORD_LENGTH = 8;

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password?.length < MIN_PASSWORD_LENGTH) {
      setError(`Password should have at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    setPending(true);

    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong.");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className="flex flex-col w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        Sign up
        <CardDescription>Use email or service to continue</CardDescription>
      </CardHeader>

      {!!error && (
        <div className="max-w-[200px] bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2">
          <Input
            disabled={pending}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            type="string"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm password"
            type="password"
            required
          />

          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => onProviderSignUp("google")}
            size="lg"
            variant="outline"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3.5 left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignUp("github")}
            size="lg"
            variant="outline"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-3.5 left-2.5" />
            Continue with Github
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Already have an account ?
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer ml-1"
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
export default SignUpCard;
