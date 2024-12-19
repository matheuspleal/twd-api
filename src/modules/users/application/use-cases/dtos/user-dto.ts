export interface UserDTO {
  id: string
  fullName: string
  birthdate: Date
  email: string
  createdAt: Date
  updatedAt: Date
}

export type UserCollectionDTO = UserDTO[]
