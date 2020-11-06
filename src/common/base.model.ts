import { ApiPropertyOptional } from '@nestjs/swagger';
import { SchemaOptions } from 'mongoose';
import { Document } from 'mongoose';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class BaseModelDTO {

    @ApiPropertyOptional()
    @Expose()
    id?: string;

    @Expose()
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    createdAt?: Date;

    @ApiPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    updatedAt?: Date;
    
}

export abstract class BaseModel<T> extends Document {
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    createdAt: Date;

    @ApiPropertyOptional({ type: String, format: 'date-time' })
    updatedAt: Date;

    @ApiPropertyOptional()
    id: string;
}

export const schemaOptions: SchemaOptions = {
    timestamps: true,
    //If you use toJSON() or toObject() mongoose will not include virtuals by default. 
    //This includes the output of calling JSON.stringify() on a Mongoose document, because JSON.stringify() calls toJSON(). 
    //Pass { virtuals: true } to either toObject() or toJSON().
    toJSON: {
        virtuals: true, 
        //Virtuals are document properties that you can get and set but that do not get persisted to MongoDB. 
        //The getters are useful for formatting or combining fields, 
        //while setters are useful for de-composing a single value into multiple values for storage.
        getters: true,
    },
};
