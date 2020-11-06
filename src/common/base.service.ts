import { Types, Model, Document } from 'mongoose';

export abstract class BaseService<T extends Document> {
    protected _model: Model<T>;
    
    async findAll(filter = {}): Promise<T[]> {
        return this._model.find(filter).exec();
    }

    async findOne(filter = {}): Promise<T> {
        return this._model.findOne(filter).exec();
    }

    //ObjectIds are small, likely unique, fast to generate, and ordered. ObjectId values are 12 bytes in length, consisting of:

    //a 4-byte timestamp value, representing the ObjectId’s creation, measured in seconds since the Unix epoch
    //a 5-byte random value
    //a 3-byte incrementing counter, initialized to a random value

    //toObjectId: Converts a value to an ObjectId
    async findById(id: string): Promise<T> {
        return this._model.findById(this.toObjectId(id)).exec();
    }

    async create(item: any): Promise<T> {
        return this._model.create(item);
    }

    async delete(id: string): Promise<T> {
        return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
    }

    async update(id: string, item: any): Promise<T> {
        return this._model.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec();
    }

    async clearCollection(filter = {}): Promise<{ ok?: number; n?: number; }> {
        return this._model.deleteMany(filter).exec();
    }

    private toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }
}
