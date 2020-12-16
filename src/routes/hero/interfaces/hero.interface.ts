import { Document } from 'mongoose';

export interface Response extends Document {
  readonly code: number;
  readonly data: any;
  readonly msg: string;
}
