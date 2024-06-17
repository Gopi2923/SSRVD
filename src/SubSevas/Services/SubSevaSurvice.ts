import { RequestContext } from "@skillmine-dev-public/auth-utils";
import { ErrorEntity, HttpStatus } from "@skillmine-dev-public/response-util";
import { DbContext } from "../../../database/DBContext";
import { ISubSevas } from "../model/collections/SubSevas";
import axios from "axios";
import { HttpException } from "@nestjs/common";



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
    async getAllSubSevas(getsubServices: boolean, seva_type: number) {
        try {
            let body = {
                "getsubServices": getsubServices,
                "seva_type": seva_type

               
            }
            let url = "https://bhadradritemple.telangana.gov.in/apis/api.php";
            let method = "GET";
            let headers = {
                'Apikey': 'a9e0f8a33497dbe0de8ea0e154d2a090',
                'Content-Type': 'application/json',
                'Ver': '1.0'
            };
            const axiosConfig = {
                headers: headers,
                method: method,
                url: url,
                data: body

            };

            const savedSubSevas = await axios(axiosConfig);
            return savedSubSevas.data;
            
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Failed to get all SubSevas', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





   

}