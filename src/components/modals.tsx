"use client";

import { useEffect, useState } from "react";

import CreateWorkspaceModal from "@/features/workspaces/components/create-workspace-modal";
import CreateChannelModal from "@/features/channels/components/create-channel-modal";

export const Modals = () => {
  // Prevent hydration error: Make sure modal only show when client side rendering is done
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <CreateChannelModal />
      <CreateWorkspaceModal />
    </>
  );
};
