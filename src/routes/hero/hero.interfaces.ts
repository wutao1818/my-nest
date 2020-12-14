import { Document } from 'mongoose';

export interface ResponseDto extends Document {
  readonly code: number;
  readonly data: any;
  readonly msg: string;
}
