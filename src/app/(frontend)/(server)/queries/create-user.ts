'use server'

import { payload } from '../client'

export async function createUser(data: {
  username: string
  email: string
  password: string
  authProviderId: string
}) {
  try {
    const user = await payload.create({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
        authProviderId: data.authProviderId,
      },
    })
    return user
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'An unknown error occurred',
    }
  }
}
