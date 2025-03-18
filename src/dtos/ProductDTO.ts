import { AtachmentDTO } from './AtachmentDTO'
import { CategoryDTO } from './CategoryDTO'
import { UserDTO } from './UserDTO'

enum Status {
  available,
  sold,
  canceled,
}

export type ProductDTO = {
  id: string
  title: string
  description: string
  priceInCents: number
  status?: Status
  owner?: UserDTO
  category?: CategoryDTO
  attachments?: [AtachmentDTO]
}
