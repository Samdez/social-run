'use server'

import { auth } from '@/auth'

export const signIn = async (data: { email: string; password: string }) => {
  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    })
    return {
      success: true,
      message: 'Signed in successfully',
    }
  } catch (error) {
    const e = error as Error
    console.error(error)
    return {
      success: false,
      message: { error: e.message || 'An unknown error occurred' },
    }
  }
}

export const signUp = async (data: { email: string; password: string; username: string }) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.username,
      },
    })
    return {
      success: true,
      message: 'Signed up successfully',
    }
  } catch (error) {
    const e = error as Error
    return {
      success: false,
      message: { error: e.message || 'An unknown error occurred' },
    }
  }
}
