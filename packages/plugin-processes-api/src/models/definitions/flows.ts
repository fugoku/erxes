import { Document, Schema } from 'mongoose';
import { field, schemaHooksWrapper } from './utils';
import { IJobRefer, jobReferSchema } from './jobs';

export interface IJob {
  id: string;
  nextJobIds: string[];
  jobRefer: IJobRefer,
  style: { type: Object },
  label: { type: String, optional: true },
  description: { type: String, optional: true },
  quantity: { type: Number }
}

export interface IFlow {
  name: String;
  categoryId: String;
  status: String;
  jobs: IJob[];
}

export interface IFlowDocument extends IFlow, Document {
  _id: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export const jobSchema = new Schema(
  {
    id: { type: String, required: true },
    nextJobIds: { type: [String] },
    style: { type: Object },
    label: { type: String, optional: true },
    description: { type: String, optional: true },

    jobRefer: { type: jobReferSchema },
    quantity: { type: Number },
    assignUserIds: { type: [String] },
    outBranchId: { type: String },
    outDepartmentId: { type: String },
    inBranchId: { type: String },
    inDepartmentId: { type: String }
  },
  { _id: false }
)

export const flowSchema = schemaHooksWrapper(
  new Schema({
    _id: field({ pkey: true }),
    name: { type: String, required: true },
    categoryId: field({ type: String, label: 'Category', index: true }),
    status: field({ type: String, label: 'Status' }),
    createdAt: { type: Date, default: new Date(), label: 'Created date' },
    createdBy: { type: String },
    updatedAt: { type: Date, default: new Date(), label: 'Updated date' },
    updatedBy: { type: String },
    jobs: field({ type: jobSchema, label: 'Jobs' }),
  }),
  'erxes_flows'
);

// for tags query. increases search speed, avoids in-memory sorting
flowSchema.index({ status: 1 });


