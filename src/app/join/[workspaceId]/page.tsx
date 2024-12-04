"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import OtpInput from "react-otp-input";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useJoin } from "@/features/workspaces/api/use-join";
import { cn } from "@/lib/utils";

const JoinPage = () => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useJoin();
  const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });

  const [code, setCode] = useState("");
  const JOIN_CODE_LENGTH = 6;

  const isMember = useMemo(() => data?.isMember, [data?.isMember]);

  const handleComplete = (value: string) => {
    mutate(
      { workspaceId, joinCode: value },
      {
        onSuccess: (id) => {
          router.replace(`/workspace/${id}`);
          toast.success("Workspace joined");
        },
        onError: (error) => {
          toast.error("Failed to join workspace");
        },
      }
    );
  };

  useEffect(() => {
    if (isMember) {
      console.log('IS MEMBER');
      router.push(`/workspace/${workspaceId}`);
    }
  }, [isMember, router, workspaceId]);

  useEffect(() => {
    if (code.length !== JOIN_CODE_LENGTH) {
      return;
    }

    return handleComplete(code);
  }, [code]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-between">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-mb">
      <Image src="/logo.svg" width={60} height={60} alt="Logo" />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join {data?.name}</h1>
          <p className="text-mb text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>

        <OtpInput
          value={code}
          numInputs={6}
          shouldAutoFocus
          containerStyle={cn(
            "flex gap-x-2",
            isPending && "opacity-50 cursor-not-allowed"
          )}
          inputStyle="uppercase h-auto rounded-md border border-gray-300 items-center justify-center text-xl font-medium text-gray-500"
          inputType="text"
          onChange={setCode}
          renderInput={(props) => <input {...props} />}
        />
      </div>

      <div className="flex gap-y-4">
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};
export default JoinPage;
