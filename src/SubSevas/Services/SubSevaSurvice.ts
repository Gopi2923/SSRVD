import { RequestContext } from "@skillmine-dev-public/auth-utils";
import { ErrorEntity, HttpStatus } from "@skillmine-dev-public/response-util";
import { DbContext } from "../../../database/DBContext";
import { ISubSevas } from "../model/collections/SubSevas";



export class SubSevaService {
    private static _instance: SubSevaService;
    static get Instance() {
        if (!this._instance) {
            this._instance = new SubSevaService();
        }
        return this._instance;
    }

    /**
     * Create New SubSeva
     */
    async createNewSubSeva( subSevas: ISubSevas): Promise<ISubSevas> {
        try {
            const dbContext = await DbContext.getContextByConfig();
            const newSubSeva = new dbContext.SubSevas();
            Object.assign(newSubSeva, <ISubSevas>subSevas);
            let saved = await newSubSeva.save();
            return Promise.resolve(saved);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async getSubSevaByID(subSevaId: string) {
        try {
            const dbContext = await DbContext.getContextByConfig();
            const savedSubSevas = await dbContext.SubSevas.find({ _id: subSevaId });
            if (!savedSubSevas) {
                throw new ErrorEntity({ http_code: HttpStatus.CONFLICT, error: "Not found", error_description: "Seva Not found"  });
            }
            return Promise.resolve(savedSubSevas);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    /**
    * Get All Sub Sevas
    */
    async getAllSubSevas(parentSevaRef: string) {
        try {
            const dbContext = await DbContext.getContextByConfig();
            const savedSubSevas = await dbContext.SubSevas.find({parentSevaRef: parentSevaRef});
            if (!savedSubSevas) {
                throw new ErrorEntity({ http_code: HttpStatus.CONFLICT, error: "Not found", error_description: "Seva Not found"  });
            }
            return Promise.resolve(savedSubSevas);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }






   

}