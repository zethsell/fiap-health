import * as mongoose from 'mongoose';

export const scheduleSchema = new mongoose.Schema(
  {
    date: Date,
    status: String,
    type: String,
    content: Object,
  },
  {
    timestamps: true,
    collection: 'schedules',
  },
);
