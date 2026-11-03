import { Outlet, useNavigate, useLocation } from "react-router-dom";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";

import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../../components/ui/sidebar";

import { SidebarTrigger } from "../../components/ui/sidebar";

import ThemeSwitcher from "../components/dropdown-language";
import ProfileDropdown from "../components/dropdown-profile";

import { LanguagesIcon } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  MenuSquareIcon,
  WorkflowSquare01Icon,
  ListVideoIcon,
  FoldersIcon,
} from "@hugeicons/core-free-icons";

import FacebookIcon from "@/assets/svg/facebook-icon";
import InstagramIcon from "@/assets/svg/instagram-icon";
import LinkedinIcon from "@/assets/svg/linkedin-icon";
import TwitterIcon from "@/assets/svg/twitter-icon";

import mainIcon from "../assets/Glimmora.png";

const EditorLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      title: "Contents",
      path: "/editor",
      icon: ListVideoIcon,
    }
  ];

  const currentPage =
    menus.find((menu) => menu.path === location.pathname)?.title ||
    "Dashboard";

  return (
    <div className="flex min-h-screen w-full">
      <SidebarProvider
        defaultOpen={
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("sidebar_state="))
            ?.split("=")[1] !== "false"
        }
      >
        <Sidebar>
          <SidebarContent>
            {/* BRAND */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="mt-2">
                      <img
                        src={mainIcon}
                        className="h-10 object-contain"
                        alt="Glimmora"
                      />
                      <span>Glimmora</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* EDITOR MENU */}
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {menus.map((menu) => (
                    <SidebarMenuItem key={menu.path}>
                      <SidebarMenuButton
                        onClick={() => navigate(menu.path)}
                        isActive={location.pathname === menu.path}
                        tooltip={menu.title}
                      >
                        <HugeiconsIcon icon={menu.icon} />
                        <span>{menu.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* MAIN CONTENT */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="bg-card sticky top-0 z-50 border-b">
            <div className="mx-auto flex items-center justify-between gap-6 py-3 max-w-screen-2xl px-4 sm:px-6 lg:px-30">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="[&_svg]:size-5!" />
              </div>

              <div className="flex items-center gap-3">
                <ThemeSwitcher
                  trigger={
                    <Button variant="ghost" size="icon-lg">
                      <LanguagesIcon />
                    </Button>
                  }
                />

                <ProfileDropdown
                  trigger={
                    <Button variant="ghost" size="icon-lg">
                      <Avatar className="size-[inherit] rounded-[inherit] after:rounded-[inherit]">
                        <AvatarImage
                          src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png"
                          className="rounded-[inherit]"
                        />
                        <AvatarFallback className="rounded-[inherit]">
                          ED
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
              </div>
            </div>
          </header>

          <main className="w-full min-w-0 flex-1">
            <Outlet />
          </main>

          <footer>
            <div className="text-muted-foreground mx-auto flex size-full max-w-full items-center justify-between gap-3 px-4 py-8 max-sm:flex-col sm:gap-6 sm:px-64">
              <p className="text-sm text-balance max-sm:text-center">
                {`©${new Date().getFullYear()}`}{" "}
                <a href="#" className="text-primary">
                  Glimmora
                </a>
                , Made for better web design
              </p>

              <div className="text-muted-foreground *:hover:text-primary flex items-center gap-5">
                <a href="#"><FacebookIcon className="size-4" /></a>
                <a href="#"><InstagramIcon className="size-4" /></a>
                <a href="#"><LinkedinIcon className="size-4" /></a>
                <a href="#"><TwitterIcon className="size-4" /></a>
              </div>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default EditorLayout;