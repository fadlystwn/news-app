'use server';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + 10 * 60 * 1000))
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error('Failed to verify JWT:', error);
    throw new Error('Invalid or expired token.');
  }
}

export async function handleSesion(sessionData: any) {
  try {
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    const encryptedSessionData = await encrypt({ sessionData, expires });

    cookies().set('session', encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

  } catch (error) {
    console.error('Failed to set session cookie:', error);
    throw new Error('Failed to handle login.');
  }
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function logout() {
  const res = NextResponse.redirect('/login');
  res.cookies.delete('session');
  return res;
}