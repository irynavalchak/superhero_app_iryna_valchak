import mongoose, { Schema, Document } from "mongoose"

export interface ISuperhero extends Document {
    nickname: string,
    real_name: string,
    origin_description: string,
    superpowers: string[],
    catch_phrase: string,
    images: string[]
}


const SuperheroSchema: Schema = new Schema ({
    nickname: { type: String, required: true },
    real_name: {type: String, required: true},
    origin_description: {type: String, required: true},
    superpowers: [{type: String}],
    catch_phrase: { type: String },
    images: [{ type: String }]
})

export default mongoose.model<ISuperhero>("Superhero", SuperheroSchema);
