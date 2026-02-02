import mongoose, { Document, ObjectId } from 'mongoose';
import z from 'zod';

export interface postInterface {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId; 
  tag: string[];
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface postModelInteface extends postInterface, Document{}
