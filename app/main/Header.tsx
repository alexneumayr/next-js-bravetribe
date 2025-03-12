import { logoutUser } from '@/actions/authActions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import checkAuth from '@/util/checkAuth';

export default async function Header() {
  const user = await checkAuth();

  return (
    <header>
      <div className="bg-secondary h-3 " />
      <div className="px-5 flex gap-2 h-[110px] items-center justify-between  bg-white dark:bg-[#1C1C1C] shadow-[0px_4px_4px_0px_rgba(166,166,166,0.25)] w-full">
        <p>Logo</p>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={`${user.User.avatarImage}`} />
                <AvatarFallback>
                  {user.User.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="max-w-[425px] space-y-4">
            <DialogHeader>
              <DialogTitle className="text-center font-semibold text-2xl">
                Do you really want to log out?
              </DialogTitle>
            </DialogHeader>
            <div className="text-center text-lg text-zinc-600">
              Log out {user.User.username} from BraveTribe?
            </div>
            <DialogFooter>
              <form
                className="flex justify-around w-full gap-x-2"
                action={logoutUser}
              >
                <Button className="w-full" type="submit">
                  Logout
                </Button>
                <DialogClose asChild>
                  <Button variant="outline" className="w-full" type="button">
                    Cancel
                  </Button>
                </DialogClose>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
