import { AtachmentDTO } from './AtachmentDTO'

export type UserDTO = {
  id: string
  name: string
  phone: string
  email: string
  avatar: AtachmentDTO
}
