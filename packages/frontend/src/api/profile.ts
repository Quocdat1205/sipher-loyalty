import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_ATHER_SOCIAL_URL ?? "https://api-ather-social.sipher.gg/api"

export interface ProfileInput {
  name: string
  bio: string
  email: string
  avatarImageId: string
  phone: string
}

export interface ProfileOutput {
  id: string
  email: string
  name: string
  cognitoSub: string
  phone: string
  bio: string
  avatarImage: string
  isVerified: boolean
  isBanned: boolean
  subscribeEmail: boolean
  createdAt: number
  updatedAt: number
}

const fetcher = axios.create({ baseURL })

export const updateProfile = async (input: Partial<ProfileInput>, token: string) => {
  const { data } = await fetcher.put("/user", input, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}

export const getProfile = async (token: string): Promise<{ user: ProfileOutput; connections: any[] }> => {
  const { data } = await fetcher.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}

export interface Avatar {
  id: string
  imageUrl: string
  imageThumbnailUrl: string
}

export const getAvailableAvatars = async (
  token: string,
  from = 0,
  take = 20,
): Promise<{ data: Avatar[]; total: number }> => {
  const { data } = await fetcher.get(`/user/available-avatars?from=${from}&take=${take}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
