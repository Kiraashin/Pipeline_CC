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

<<<<<<< HEAD
=======
const token = localStorage.getItem("token");

const currentUser = token
  ? JSON.parse(atob(token.split(".")[1]))
  : null;

>>>>>>> development
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
<<<<<<< HEAD
            <div className='flex flex-1 flex-col items-start'>
              <span className='text-foreground text-lg font-semibold'>John Doe</span>
              <span className='text-muted-foreground text-base'>john.doe@example.com</span>
=======
            <div className="flex flex-1 flex-col items-start">
              <span className="text-foreground text-lg font-semibold">
                {currentUser?.name || "User"}
              </span>

              <span className="text-muted-foreground text-base">
                {currentUser?.email || ""}
              </span>
>>>>>>> development
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
<<<<<<< HEAD
          <DropdownMenuItem className='gap-2 px-4 py-2.5 text-base'>
            <HugeiconsIcon icon={User02Icon} strokeWidth={2} className='text-foreground size-5' />
            <span>My account</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='gap-2 px-4 py-2.5 text-base'>
            <HugeiconsIcon icon={SettingsIcon} strokeWidth={2} className='text-foreground size-5' />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='gap-2 px-4 py-2.5 text-base'>
            <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} className='text-foreground size-5' />
            <span>Billing</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className='gap-2 px-4 py-2.5 text-base'>
            <HugeiconsIcon icon={UserMultiple03Icon} strokeWidth={2} className='text-foreground size-5' />
            <span>Manage team</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='gap-2 px-4 py-2.5 text-base'>
            <HugeiconsIcon icon={PencilEdit02Icon} strokeWidth={2} className='text-foreground size-5' />
            <span>Customization</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='gap-2 px-4 py-2.5 text-base'>
            <HugeiconsIcon icon={AddCircleIcon} strokeWidth={2} className='text-foreground size-5' />
            <span>Add team account</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem variant='destructive' className='gap-2 px-4 py-2.5 text-base'>
            <HugeiconsIcon icon={LogoutIcon} strokeWidth={2} className='size-5' />
=======
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
>>>>>>> development
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
