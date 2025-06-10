'use server'

import { payload } from '@/app/(frontend)/(server)/client'
import { cookies, headers } from 'next/headers'

export const loginPayload = async (data: { email: string; password: string }) => {
  try {
    const res = await payload.login({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
      },
    })
    if (res.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', res.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })
      return { success: true }
    }
    return { success: false, message: 'Invalid email or password' }
  } catch (error) {
    const e = error as Error
    return { success: false, message: e.message }
  }
}

export async function signUp(data: { email: string; password: string; username: string }) {
  try {
    const res = await payload.create({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
        username: data.username,
        role: 'runner',
      },
    })
    return { success: true, message: 'Inscription réussie', data: res }
  } catch (error) {
    const e = error as Error
    return { success: false, message: e.message }
  }
}

export async function getUser() {
  const headersList = await headers()
  const { user } = await payload.auth({
    headers: headersList,
  })
  return user
}

export async function logout() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('payload-token')
    return { success: true }
  } catch (error) {
    const e = error as Error
    return { success: false, message: e.message }
  }
}

// export const signIn = async (data: { email: string; password: string }) => {
//   try {
//     await auth.api.signInEmail({
//       body: {
//         email: data.email,
//         password: data.password,
//       },
//     })
//     return {
//       success: true,
//       message: 'Signed in successfully',
//     }
//   } catch (error) {
//     const e = error as Error
//     console.error(error)
//     return {
//       success: false,
//       message: { error: e.message || 'An unknown error occurred' },
//     }
//   }
// }

// export const signUp = async (data: { email: string; password: string; username: string }) => {
//   try {
//     const res = await auth.api.signUpEmail({
//       body: {
//         email: data.email,
//         password: data.password,
//         name: data.username,
//       },
//     })
//     return {
//       success: true,
//       message: 'Signed up successfully',
//       data: res.user,
//     }
//   } catch (error) {
//     const e = error as Error
//     return {
//       success: false,
//       message: { error: e.message || 'An unknown error occurred' },
//     }
//   }
// }
