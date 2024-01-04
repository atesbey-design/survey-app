import Backend from '@/data/Backend'

export async function verifyJwtToken (token: string) {
  try {
    const valid = await Backend.User.checkout(token)
    console.log(valid)
    return valid
  } catch (error) {
    return null
  }
}
