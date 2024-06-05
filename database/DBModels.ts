import * as mongoose from "mongoose";

//#region start-db-import
//Sevas
import * as Sevas from "../src/Sevas/model/collections/Sevas";

export class DBModels {
   //#region start-db-model-declaration

   public Sevas: mongoose.Model<Sevas.ISevas>;
  

   //#endregion start-db-model-declaration
   constructor(dbC: mongoose.Connection) {


      //Sevas
      this.Sevas = dbC.model<Sevas.ISevas>(
         Sevas.CollectionName,
         Sevas.ISevaSchema,
         Sevas.CollectionName
      );

   }
}
