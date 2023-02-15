import {
  NotFoundException,
  ForbiddenException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Entity } from 'src/Interfaces/interfaces';

export const handleNotFound = async (data: Entity) => {
  if (!data) {
    new NotFoundException(`Item not found`);
  }
};

export const handleUnprocessable = async (data: Entity) => {
  if (!data) {
    throw new UnprocessableEntityException(`Item not found`);
  }
};
