'use server';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)

async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key)
}

async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256']
  })
  return payload
}

export async function handleSesion(sessionData: any) {
  try {
    const encryptedSessionData = await encrypt(sessionData);

    cookies().set('session', encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    });

  } catch (error) {
    console.error('Failed to set session cookie:', error);
    throw new Error('Failed to handle login.');
  }
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null
  return await decrypt(session)
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return

  const parsed = await decrypt(session)
  const cookie = await encrypt(parsed)
  parsed.expires = new Date(Date.now() + 10 * 1000)
  const res = NextResponse.next()
  res.cookies.set({ name: 'session', value: cookie, httpOnly: true, expires: parsed.exp })

  return res;
}

