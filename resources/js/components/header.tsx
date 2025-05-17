import { Link } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { UserInfo } from '@/components/user-info';
import { ChevronsUpDown } from 'lucide-react';

type User = {
    created_at: string;
    email: string;
    email_verified_at: string | null,
    id: number;
    name: string;
    updated_at: string;
}

type Auth = {
    user: User;
}
type Props = {
    auth: Auth;
}
export default function Header({ auth }: Props) {
    // const auth = useContext(AuthContext)
    return (
        <header className="w-full text-sm shadow-lg">
            <div className="flex flex-row justify-between items-center lg:w-8/10 h-20 mx-auto">
                <div className="text-2xl font-semibold text-gray-800">Nano URL</div>
                <nav className="flex items-center justify-end gap-4">
                {auth.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex flex-row gap-4 items-center">
                            <UserInfo user={auth.user} />
                            <ChevronsUpDown className="ml-auto size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                            align="end"
                            side='bottom'
                        >
                        <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                ):(
                    <>
                    <Link
                        href={route('login')}
                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                    >
                        Log in
                    </Link>
                    <Link
                        href={route('register')}
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                        Register
                    </Link>
                    </>
                )}
                </nav>
            </div>
        </header>
    )
}