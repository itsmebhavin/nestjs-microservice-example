import { MAGAZINES } from './magazines.mocks';
import { Injectable, HttpException } from '@nestjs/common';
@Injectable()
export class MagazinesService {
  magazines = MAGAZINES;

  getMagazines(): Promise<any> {
    return new Promise(resolve => {
      resolve(this.magazines);
    });
  }

  getMagazine(magazineID): Promise<any> {
    const id = Number(magazineID);
    return new Promise(resolve => {
      const magazine = this.magazines.find($magazine => $magazine.id === id);
      if (!magazine) {
        throw new HttpException('Magazine does not exist!', 404);
      }
      resolve(magazine);
    });
  }

  addMagazine(magazine): Promise<any> {
    return new Promise(resolve => {
      magazine.id = Number(magazine.id);
      this.magazines.push(magazine);
      resolve(this.magazines);
    });
  }

  deleteMagazine(magazineID): Promise<any> {
    const id = Number(magazineID);
    return new Promise(resolve => {
      const index = this.magazines.findIndex($magazine => $magazine.id === id);
      if (index === -1) {
        throw new HttpException('Magazine does not exist!', 404);
      }
      this.magazines.splice(index, 1);
      resolve(this.magazines);
    });
  }
}
