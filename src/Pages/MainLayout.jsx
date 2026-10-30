import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage  } from '../../components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../../components/ui/breadcrumb'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '../../components/ui/sidebar'

import LanguageDropdown from '../components/dropdown-language'
import ProfileDropdown from '../components/dropdown-profile'

import FacebookIcon from '@/assets/svg/facebook-icon'
import InstagramIcon from '@/assets/svg/instagram-icon'
import LinkedinIcon from '@/assets/svg/linkedin-icon'
import TwitterIcon from '@/assets/svg/twitter-icon'
import { LanguagesIcon } from 'lucide-react'
import { HugeiconsIcon } from '@hugeicons/react';
import { MenuSquareIcon, InternetAntenna01Icon, ListVideoIcon, TaskEdit01Icon, ComputerChartUpIcon, WorkflowSquare01Icon, Activity03Icon, CalendarClockIcon, UserMultiple02Icon, Delete02Icon, FoldersIcon } from "@hugeicons/core-free-icons";
import mainIcon from "../assets/Glimmora.png"

const MainLayout = () => {
  const navigate = useNavigate();
  return (
    <div className='flex min-h-screen w-full'>
      <SidebarProvider defaultOpen={
      document.cookie.split("; ").find((row) => row.startsWith("sidebar_state="))?.split("=")[1] !== "false"
      }>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="mt-2" render={<a href='#' />}>
                      <img src={mainIcon} className="h-10 object-contain"  />
                      <span>Glimmora</span>
                    </SidebarMenuButton>
                    {/* <SidebarMenuBadge className='bg-primary/10 top-1/2! right-2 -translate-y-1/2! rounded-full'>
                      5
                    </SidebarMenuBadge> */}
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href='#' />}>
                      <HugeiconsIcon icon={MenuSquareIcon} />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => navigate("/pipeline")}
                      tooltip="Pipeline"
                    >
                      <HugeiconsIcon icon={WorkflowSquare01Icon} />
                      <span>Pipeline</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => navigate("/channel")}
                      tooltip="Saluran"
                    >
                      <HugeiconsIcon icon={InternetAntenna01Icon} />
                      <span>Saluran</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => navigate("/content")}
                      tooltip="Konten"
                    >
                      <HugeiconsIcon icon={ListVideoIcon} />
                      <span>Konten</span>
                    </SidebarMenuButton>
                    {/* <SidebarMenuBadge className='bg-primary/10 top-1/2! right-2 -translate-y-1/2! rounded-full'>
                      3
                    </SidebarMenuBadge> */}
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href='#' />}>
                      <HugeiconsIcon icon={ComputerChartUpIcon} />
                      <span>Analisis performa</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href='#' />}>
                      <HugeiconsIcon icon={Activity03Icon} />
                      <span>Lacak konten</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Fitur yang akan datang</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href='#' />}>
                      <HugeiconsIcon icon={UserMultiple02Icon} />
                      <span>Jadwal</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => navigate("/team")}
                      tooltip="Team">
                      <HugeiconsIcon icon={UserMultiple02Icon} />
                      <span>Tim</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href='#' />}>
                      <HugeiconsIcon icon={FoldersIcon} />
                      <span>Arsip</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href='#' />}>
                      <HugeiconsIcon icon={Delete02Icon} />
                      <span>Tempat sampah</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className='flex flex-1 flex-col'>
          <header className='bg-card sticky top-0 z-50 border-b'>
            <div className='mx-auto flex items-center justify-between gap-6 py-3 max-w-screen-2xl px-4 sm:px-6 lg:px-10'>
              <div className='flex items-center gap-4'>
                <SidebarTrigger className='[&_svg]:size-5!' />
                <Separator orientation='vertical' className='hidden h-4! data-vertical:self-center sm:block' />
                <Breadcrumb className='hidden sm:block'>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className='flex items-center gap-1.5'>
                <LanguageDropdown
                  trigger={
                    <Button variant='ghost' size='icon-lg'>
                      <LanguagesIcon />
                    </Button>
                  }
                />
                <ProfileDropdown
                  trigger={
                    <Button variant='ghost' size='icon-lg'>
                      <Avatar className='size-[inherit] rounded-[inherit] after:rounded-[inherit]'>
                        <AvatarImage
                          src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'
                          className='rounded-[inherit]'
                        />
                        <AvatarFallback className='rounded-[inherit]'>JD</AvatarFallback>
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
            <div className='text-muted-foreground mx-auto flex size-full max-w-full items-center justify-between gap-3 px-4 py-8 max-sm:flex-col sm:gap-6 sm:px-64'>
              <p className='text-sm text-balance max-sm:text-center'>
                {`©${new Date().getFullYear()}`}{' '}
                <a href='#' className='text-primary'>
                  shadcn
                </a>
                , Made for better web design
              </p>
              <div className='text-muted-foreground *:hover:text-primary flex items-center gap-5'>
                <a href='#'>
                  <FacebookIcon className='size-4' />
                </a>
                <a href='#'>
                  <InstagramIcon className='size-4' />
                </a>
                <a href='#'>
                  <LinkedinIcon className='size-4' />
                </a>
                <a href='#'>
                  <TwitterIcon className='size-4' />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default MainLayout
