import People from './people.model';
import {Deserializable} from "./deserializable.model";

export default class Garden implements Deserializable  {
    _id:string;
    title: string;
    description: string;
    createdDate: Date;
    owner: People;

    constructor(
    ){
        this.title = ""
        this.description = ""
        this.createdDate = new Date()
        this.owner = new People();
    }

    deserialize(input: any): this{
        Object.assign(this, input);
        this.owner = new People().deserialize(input.owner);

        if(!this.owner){
            this.owner = new People();
        }

        return this;
      }
    
}