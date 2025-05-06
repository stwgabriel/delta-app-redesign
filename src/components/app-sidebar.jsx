"use client";
import {
  Book,
  Calendar,
  ChevronsUpDown,
  ClipboardPlus,
  LogOut,
  Settings,
  User,
  User2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useAPIContext } from "@/contexts/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/utils/variables";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Doutor",
      url: "#",
      items: [
        {
          title: "Prontuários",
          url: "#",
          icon: <ClipboardPlus size={16} />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const router = useRouter();
  const {
    isTokenLoaded,
    isLoggedConsultor,
    isLoggedHospital,
    isLoggedDoctor,
    logout,
    isAdmin,
    get_me,
  } = useAPIContext();

  const [user, setUser] = useState(null);

  const { open } = useSidebar();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await get_me();
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <Sidebar
      className="w-64 !border-none !bg-gray-100"
      {...props}
      collapsible="icon"
    >
      <SidebarHeader className="!p-4 !pt-6">
        <SidebarMenu>
          <SidebarMenuItem className="!flex !flex-row !justify-between">
            <Image
              src="/logo.png"
              alt="logo"
              className="!object-contain"
              width={40}
              height={40}
            />

            {open && <SidebarTrigger />}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="!flex-1 !overflow-auto">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="!text-sm !font-medium !text-black/60">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} className="w-full">
                    <SidebarMenuButton
                      isActive={item?.isActive}
                      tooltip={item.title}
                      className="w-full"
                      href={item.url}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="!pb-4">
        <DropdownMenu className="w-full">
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip={user?.name}
              className="w-full !py-2 !h-fit"
            >
              <User className="!size-4" />

              <div className="!flex !flex-col !gap-2 !leading-none">
                <span className="!font-semibold">
                  Dr(a), {user?.name} {user?.surname}
                </span>
                <span className="!text-black/60">CRM: {user?.crm_number}</span>
              </div>
              <ChevronsUpDown className="!ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[250px]" align="top">
            {isAdmin && (
              <DropdownMenuItem asChild>
                <Link
                  className="!d-flex !material-icons !fs-1 !text-decoration-none !text-body"
                  style={{ cursor: "pointer" }}
                  href={ROUTES.ADMIN.ADMIN_PAGE}
                >
                  <Settings size={8} /> Configurações
                </Link>
              </DropdownMenuItem>
            )}

            {isLoggedConsultor && (
              <DropdownMenuItem asChild>
                <Link href={ROUTES.CONSULTOR.SCHEDULER_PAGE}>
                  <Calendar size={8} /> Agendamentos
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="w-full !flex !items-center !justify-start"
                asChild
              >
                <Link href={ROUTES.USER.SETTINGS_PAGE_USER}>
                  <User2 size={8} /> Meu Perfil
                </Link>
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="w-full !flex !items-center !justify-start"
                onClick={logout}
              >
                <LogOut size={8} /> Sair
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
