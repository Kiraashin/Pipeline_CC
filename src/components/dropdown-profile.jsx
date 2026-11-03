import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../components/ui/dropdown-menu'
import { HugeiconsIcon } from "@hugeicons/react"
import { User02Icon, SettingsIcon, CreditCardIcon, UserMultiple03Icon, PencilEdit02Icon, AddCircleIcon, LogoutIcon } from "@hugeicons/core-free-icons"

const token = localStorage.getItem("token");

const currentUser = token
  ? JSON.parse(atob(token.split(".")[1]))
  : null;

const ProfileDropdown = ({
  trigger,
  defaultOpen,
  align = 'end'
}) => {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent className='w-80' align={align || 'end'}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className='flex items-center gap-4 px-4 py-2.5 font-normal'>
            <div className='relative'>
              <Avatar size='lg'>
                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' alt='John Doe' />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className='ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2' />
            </div>
            <div className="flex flex-1 flex-col items-start">
              <span className="text-foreground text-lg font-semibold">
                {currentUser?.name || "User"}
              </span>

              <span className="text-muted-foreground text-base">
                {currentUser?.email || ""}
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="gap-2 px-4 py-2.5 text-base"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <HugeiconsIcon
              icon={LogoutIcon}
              strokeWidth={2}
              className="size-5"
            />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
