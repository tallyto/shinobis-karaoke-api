import { model, Schema } from "dynamoose";
import { Document } from "dynamoose/dist/Document";



export interface MusicDocument extends Document {
    id: string;
    requester: string;
    music: string;
    link: string;
    played: boolean;
}



const musicSchema = new Schema({
    id: {
        type: String,
        hashKey: true,
        required: true,
    },
    requester: String,
    music: String,
    link: String,
    played: {
        type: Number,
        default: 0,
        index: {
            name: "played-index",
            global: true,
        }

    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
})

export const MusicModel = model<MusicDocument>(process.env.MUSIC_TABLE, musicSchema, {
    create: true
});
