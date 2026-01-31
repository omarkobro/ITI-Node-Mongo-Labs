import { Document, ObjectId } from 'mongoose';
import z from 'zod';

export interface postInterface {
  title: string;
  content: string;
  author: ObjectId; //check it out
  tag: string[];
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface postModelInteface extends postInterface, Document{}
