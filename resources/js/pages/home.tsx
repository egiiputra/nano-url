import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <input type='text' name='long_url' placeholder='Enter your long URL'/>
            <input type='text' name='short_url' placeholder='Enter your short URL'/>
        </>

    );
}
