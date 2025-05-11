import { Head, Link, useForm } from '@inertiajs/react';
// import { type SharedData } from '@/types';
// import { usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler, useEffect } from 'react';


type createShortUrlForm = {
    long_url: string;
    short_url: string;
};

type Props = {
    app_url: string;
}

export default function Home({ app_url }: Props) {
    // const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors, reset } = useForm<Required<createShortUrlForm>>({
        long_url: '',
        short_url: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('link.create'), {
            // onFinish: () => reset('long_url', 'short_url'),
        });
    };

    return (
        <>
            <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                <nav className="flex items-center justify-end gap-4">
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
                </nav>
            </header>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
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
                    <Button type="submit" className="mt-2 w-full" tabIndex={3} disabled={processing}>
                        {/* {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} */}
                        Create short URL
                    </Button>
                </div>
            </form>
        </>
    );
}
