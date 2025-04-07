'use server';

import {cookies} from "next/headers";

export async function getSession() {
    const cookie = cookies().get('auth')?.value;

    if (cookie) {
        return cookie;
    }
    return undefined;
}

export async function setSession(secretToken: any) {
    cookies().set(
        'auth', 
        secretToken, 
        {
            sameSite: 'strict',
            httpOnly: true,
        }
    );
}

export async function clearSession() {
    cookies().delete('auth');
}