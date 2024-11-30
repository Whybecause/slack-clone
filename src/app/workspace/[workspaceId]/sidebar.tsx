import { usePathname } from "next/navigation";

import UserButton from "@/features/auth/components/user-button";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import SidebarButton from "./sidebar-button";
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4">
      <WorkspaceSwitcher />
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/workspace")}
      />
      <SidebarButton
        icon={MessageSquare}
        label="DMs"
        isActive={pathname.includes("/dms")}
      />
      <SidebarButton
        icon={Bell}
        label="Activity"
        isActive={pathname.includes("/activity")}
      />
      <SidebarButton
        icon={MoreHorizontal}
        label="More"
        isActive={pathname.includes("/more")}
      />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
export default Sidebar;
