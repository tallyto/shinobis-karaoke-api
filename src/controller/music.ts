
import { Music } from "src/interface/music";
import {  MusicDocument } from "src/model/music";
import { ModelType } from "dynamoose/dist/General";
import { v4 } from "uuid";

export class MusicController {
    constructor(private readonly MusicModel: ModelType<MusicDocument>) {}

    async getAll() {
        return this.MusicModel.scan().exec();
    }

    async getByPlayed(played: number) {
        return this.MusicModel.query().where("played").eq(played).exec();
    }

    async getOne(id: string) {
        return this.MusicModel.query().where("id").eq(id).exec();
    }

    async create(music: Music) {   
        return this.MusicModel.create({id: v4(), ...music});
    }

    async update(id: string, music: Music) {
       
        return this.MusicModel.update(id, {played: 1,...music})
    }

    async delete(id: string) {
        return this.MusicModel.delete(id);
    }

}
