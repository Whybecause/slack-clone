import { Button } from "@/components/ui/button";
import { Info, Search } from "lucide-react";
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useRouter } from "next/navigation";

const Toolbar = () => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });
  const { data: channels } = useGetChannels({ workspaceId });
  const { data: members } = useGetMembers({ workspaceId });

  const [open, setOpen] = useState(false);

  const onChannelClick = (channelId: string) => {
    setOpen(false);

    router.push(`/workspace/${workspaceId}/channel/${channelId}`);
  };
  const onMemberClick = (memberId: string) => {
    setOpen(false);

    router.push(`/workspace/${workspaceId}/member/${memberId}`);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <nav className="bg-[#481349] flex items-center justify-between p-1.5 h-10">
      <div className="flex-1">
        <div className="min-w-[280px] max-[642] grow-[2] srink">
          <Button
            onClick={() => setOpen(true)}
            size="sm"
            className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
          >
            <Search className="size-4 text-white mr-2" />
            <div className="items-center flex flex-row w-full justify-between ">
              <span className="text-wite text-xs">Search {data?.name}</span>
              <p className="text-xs text-slate-400">
                Press{" "}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px]">
                  <span>⌘</span>k
                </kbd>
              </p>
            </div>
          </Button>

          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found</CommandEmpty>

              <CommandGroup heading="Channels">
                {channels?.map((channel) => (
                  <CommandItem
                    key={channel._id}
                    onSelect={() => onChannelClick(channel._id)}
                  >
                    {channel.name}
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Members">
                {members?.map((member) => (
                  <CommandItem
                    key={member._id}
                    onSelect={() => onMemberClick(member._id)}
                  >
                    {member.user.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
export default Toolbar;
