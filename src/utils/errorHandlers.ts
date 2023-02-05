import {
  NotFoundException,
  ForbiddenException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Entity } from 'src/Interfaces/interfaces';

export const handleNotFound = async (data: Entity) => {
  if (!data) {
    throw new NotFoundException(`Item not found`);
  }
};

export const handleUnprocessable = async (data: Entity) => {
  if (!data) {
    throw new UnprocessableEntityException(`Item not found`);
  }
};

export const handleWrongPassword = async (oldPass: string, newPass: string) => {
  if (oldPass !== newPass) {
    throw new ForbiddenException('Current password is incorrect');
  }
};
