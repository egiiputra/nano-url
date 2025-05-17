import Header from '@/components/header';
import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


type createShortUrlForm = {
    user_id: number | null;
    long_url: string;
    short_url: string;
    expired: number;
};

type Props = {
    app_url: string;
}

type UrlData = {
    short_url: string;
    long_url: string;
    expired_at: string;
}
export default function Home({ app_url }: Props) {
    const params = new URLSearchParams(window.location.search)
    const [page, setPage] = useState(parseInt(params.get('page') ?? '1'))
    const [urlData, setUrlData] = useState<UrlData[]>([])

    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors, reset } = useForm<Required<createShortUrlForm>>({
        user_id: auth.user ? auth.user.id:null,
        long_url: '',
        short_url: '',
        expired: 10,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('link.create'), {
            onFinish: () => reset('short_url', 'long_url'),
        });
    };

    let [countPages, setCountPages] = useState(0);
    useEffect(() => {
        fetch('/api/links/count')
            .then((res) => res.json())
            .then((data) => {
                setCountPages(Math.ceil(data.data/10))
            })

        fetch(`api/links?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                setUrlData(data)
            })
    }, [])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        params.set('page', page.toString())

        fetch(`api/links?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                setUrlData(data)
            })
    }, [page])

    // TODO: Add Toast notif when creating success
    return (
        <>
        <Head title="Home"/>
        <Header auth={auth}/>
        <div className="flex flex-col items-center justify-center bg-sidebar py-10">
            <div className="w-full bg-white flex flex-row lg:w-8/10 gap-6 space-between shadow-lg rounded-xl p-10">
                <div className="flex flex-3 flex-col gap-6">
                    {auth.user ? (
                        <>
                        <h1 className="text-xl font-semibold text-gray-800">Your short URL</h1>
                        {/* <table>
                            <tbody> */}
                        <ul>
                            {urlData.map((url, index) =>
                                <li key={index} className="flex flex-row gap-2 border-y border-gray-400 -m-px">
                                    <div className="grow">
                                        <p>{url.short_url}</p>
                                        <a href={url.long_url} className="block overflow-hidden text-ellipsis text-gray-600 underline">{url.long_url}</a>
                                    </div>
                                    <div className="flex items-center">
                                        <button className="rounded-sm bg-blue-500 py-1 px-2 text-white">
                                            <a href={`/${url.short_url}/analytic`}>
                                                analytic
                                            </a>
                                        </button>
                                    </div>
                                    <div className="flex items-center">
                                        <button className="bg-amber-500 py-1 px-2 rounded-sm text-white">edit</button>
                                    </div>
                                    <div className="flex items-center">
                                        <button className="bg-red-500 py-1 px-2 rounded-sm text-white">delete</button>
                                    </div>
                                </li>
                            )}
                        </ul>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        href="#" 
                                        onClick={() => {
                                            if (page > 1) {
                                                setPage(page - 1)
                                            }
                                        }}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink 
                                        href="#" 
                                        isActive={page==1}
                                        onClick={() => setPage(1)}
                                    >
                                        1
                                    </PaginationLink>
                                </PaginationItem>
                                {(page > 2) && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                                {(page > 1 && page < countPages) && (
                                    <PaginationItem>
                                        <PaginationLink 
                                            href="#" 
                                            isActive={true}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}
                                {(page < (countPages - 1)) && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                                {(countPages > 1) && (
                                    <PaginationItem>
                                        <PaginationLink 
                                            href="#" 
                                            isActive={page==countPages}
                                            onClick={() => setPage(countPages)}
                                        >
                                            {countPages}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    <PaginationNext 
                                        href="#" 
                                        onClick={() => {
                                            if (page < countPages) {
                                                setPage(page + 1)
                                            }
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                        </>
                    ):(
                        <>
                        <h1 className="text-black-900">Create short URL as guest</h1>
                        <ul>
                            <li>Expired in 10 day</li>
                            <li>No analytic feature</li>
                            <li>No QR code feature</li>
                            <li>No edit feature</li>
                        </ul>
                        <p>Login to get full feature and expired short URL up to 60 days</p>
                        </>
                    )}
                </div>
                <form className="flex flex-2 flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        {/* <input name='user_id' value={(data.user_id ?? '').toString()} type='hidden'/> */}
                        <Input 
                            type='text'
                            autoFocus
                            name='long_url'
                            disabled={processing}
                            tabIndex={1}
                            value={data.long_url}
                            placeholder='Enter your long URL'
                            onChange={(e) => setData('long_url', e.target.value)}
                            required
                        />
                        {/* <p>{errors.long_url}</p> */}
                        <small className="text-sm font-medium leading-none text-red-700">{errors.long_url}</small>
                        {/* <p className=''>The long url field must be a valid URL</p> */}
                        <div className="flex items-center space-x-2">
                            <Label htmlFor='short_url'>{app_url}/</Label>
                            <Input 
                                type='text'
                                name='short_url'
                                tabIndex={2}
                                disabled={processing}
                                value={data.short_url}
                                placeholder='Enter your short URL'
                                onChange={(e) => setData('short_url', e.target.value)}
                                required
                            />
                        </div>
                        <small className="text-sm font-medium leading-none text-red-700">{errors.short_url}</small>
                        {auth.user && (
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="short_url">Expired in{' '}</Label>
                                <Select 
                                    name="expired" 
                                    defaultValue="10" 
                                    onValueChange={(val) => setData('expired', parseInt(val))}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {[10, 30, 60].map((val) => 
                                                <SelectItem value={val.toString()}>{val} days</SelectItem>
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <Button type="submit" className="mt-2 w-full" tabIndex={3} disabled={processing}>
                            Create short URL
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}