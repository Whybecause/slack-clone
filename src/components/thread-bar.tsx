import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronRight } from "lucide-react";

interface ThreadBarProps {
  count?: number;
  image?: string;
  timestamp?: number;
  name?: string;
  onClick?: () => void;
}

export const ThreadBar = ({
  count,
  image,
  timestamp,
  name = "Member",
  onClick,
}: ThreadBarProps) => {
  if (!count || !timestamp) return null;
  const avatarFallback = name.charAt(0).toUpperCase();

  return (
    <button
      onClick={onClick}
      className="p-1 rounded-md hover:bg-white boder border-transparent flex items-center justify-start group/thread-bar transition max-w-[600px]"
    >
      <div className="flex items-center gap-2 overflow-hidden"></div>
      <Avatar className="size-6 shrink-0">
        <AvatarImage src={image} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

      <span className="text-xs text-sky-700 hover:underline font-bold truncate">
        {count} {count > 1 ? "replies" : "reply"}
      </span>
      <span className="text-muted-foreground text-xs truncate group/thread-bar:block">
        Last reply {formatDistanceToNow(timestamp, { addSuffix: true })}
      </span>
      <span className="text-xs text-muted-foreground truncate group/thread-bar:hidden">
        View thread
      </span>

      <ChevronRight className="size-4 text-muted-foreground ml-auto opacity-0 group-hover/thread-bar:opacity-100 transition shrink-0" />
    </button>
  );
};
