import { User } from '../auth/user.model';

export interface Book {
  id: number;
  title: string;
  genre: Genre[];
  author: string[];
  publisher: Publisher;
  image: string;
  description: string;
  price: number;
  quantity: number;
  orderedQuantity: number;
  inventoryStatus: InventoryStatus;
  language: Language;
  releaseDate: number;
  numberOfPages: number;
  binding: BookBinding;
  overallRating: number;
  comments: Comment[];
}

export interface Comment {
  customer: User;
  customerRating: number;
  comment: string;
}

export enum InventoryStatus {
  InStock = 'Na stanju',
  OutOfStock = 'Nije na stanju',
}

export enum Publisher {
  Laguna = 'Laguna',
  Vulkan = 'Vulkan izdavaštvo',
  KBB = 'Kompjuter biblioteka - Beograd',
  Hodder = 'Hodder',
}

export enum BookBinding {
  Hardcover = 'Tvrd',
  Paperback = 'Mek',
}

export enum Language {
  Serbian = 'Srpski',
  English = 'Engleski',
  Spanish = 'Španski',
  French = ' Francuski',
  German = ' Nemački',
}

export enum Genre {
  History = ' Istorija',
  ComputerScience = ' Informatika',
  Drama = ' Drama',
  EBooks = ' E-knjige',
  Nonfiction = ' Publicistika',
  PopularScience = ' Popularna nauka',
  Comedy = ' Komedija',
  Autobiography = ' Autobiografija',
  ClassicalLiterature = ' Klasična književnost',
}
