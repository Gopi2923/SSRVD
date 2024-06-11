import { RequestContext } from "@skillmine-dev-public/auth-utils";
import { ErrorEntity, HttpStatus } from "@skillmine-dev-public/response-util";
import { DbContext } from "../../../database/DBContext";
import { ISevas } from "../model/collections/Sevas";
import axios from 'axios';
import { HttpException } from "@nestjs/common";

export class SevaService {
    private static _instance: SevaService;
    static get Instance() {
        if (!this._instance) {
            this._instance = new SevaService();
        }
        return this._instance;
    }

    /**
     * Create New ContactUs
     */
    async createNewSeva( sevas: ISevas): Promise<ISevas> {
        try {
            const dbContext = await DbContext.getContextByConfig();
            const newSeva = new dbContext.Sevas();
            Object.assign(newSeva, <ISevas>sevas);
            let saved = await newSeva.save();
            return Promise.resolve(saved);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    async getSevaByID(seva_id: string): Promise<ISevas> {
        try {
            const dbContext = await DbContext.getContextByConfig();
            const savedSevas = await dbContext.Sevas.findOne({ _id: seva_id });
            if (!savedSevas) {
                throw new ErrorEntity({ http_code: HttpStatus.CONFLICT, error: "Not found", error_description: "Seva Not found"  });
            }
            return Promise.resolve(savedSevas);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    /**
    * Get All Sevas
    */
    async getAllSevas(getServices: boolean) {
        try {
            const dbContext = await DbContext.getContextByConfig();
            let body = {
                "getServices": getServices,
               
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

            const savedSevas = await axios(axiosConfig);
            console.log("savedSevas",savedSevas.data)
            return savedSevas.data;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Failed to get all Sevas', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }






   

}