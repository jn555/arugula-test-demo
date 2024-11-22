import mongoose, { Document, Schema } from "mongoose";

interface IBoard extends Document {
  name: string;
  description: string;
}

const boardSchema = new Schema<IBoard>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const Board = mongoose.model<IBoard>("Board", boardSchema);

export default Board;
