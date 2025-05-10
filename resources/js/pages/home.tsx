import { Head, useForm } from '@inertiajs/react';
// import { type SharedData } from '@/types';
// import { usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';


type createShortUrlForm = {
    long_url: string;
    short_url: string;
};

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors, reset } = useForm<Required<createShortUrlForm>>({
        long_url: '',
        short_url: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('link.create'), {
            // onFinish: () => console.log(l)
                //reset('password', 'password_confirmation'),
        });
    };

    return (
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
                <Button type="submit" className="mt-2 w-full" tabIndex={3} disabled={processing}>
                    {/* {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} */}
                    Create short URL
                </Button>
            </div>
        </form>
    );
}
