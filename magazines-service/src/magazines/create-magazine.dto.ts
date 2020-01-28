// ./src/magazines/dto/create-magazine.dto.ts

export class CreateMagazineDTO {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly publication: string;
  readonly author: string;
}
