import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema(
    {
        user_id: {
            type: String,
            required: [true, "User ID is required"],
            index: true
        },
        meetingCode: {
            type: String,
            required: [true, "Meeting code is required"],
            trim: true,
            index: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Meeting = mongoose.model("Meeting", meetingSchema);
export default Meeting;