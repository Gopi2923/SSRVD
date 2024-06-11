import { Controller, Post, Response, Body, Param, Get, Delete, Query, HttpException, HttpStatus } from "@nestjs/common";
import { ResultEntity } from '@skillmine-dev-public/response-util';
import { ISubSevas } from "../model/collections/SubSevas";
import { SubSevaService } from "../Services/SubSevaSurvice";

@Controller('sub-sevas')
export class SubSevasContorller {
   
    
    @Post("/createSubSevas")
    async createNewSeva(@Response() res, @Body() body: ISubSevas) {
        try {
            const result = await SubSevaService.Instance.createNewSubSeva(body);
            return res.status(201).json({ data: result });
        } catch (error) {
            return res.status(500).json({ error: "Could not add sub seva" });
        }
    }

    /**
     * Get Sevas By ID
     */
    @Get("/:subseva_id")
    async getSevaByID(@Response() res, @Param("subseva_id") subseva_id: string) {
        try {
            const result = await SubSevaService.Instance.getSubSevaByID(subseva_id);
            if (result) {
                return res.status(200).json({ data: result });
            } else {
                return res.status(404).json({ error: 'Sub Seva not found' });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // @Get("/allSubsevas/:parentSevaRef")
    // async getAllSevas(@Response() res, @Param("parentSevaRef") parentSevaRef:string) {
    //     try {
    //         const result = await SubSevaService.Instance.getAllSubSevas(parentSevaRef);
    //         if (result) {
    //             return res.status(200).json({ data: result });
    //         } else {
    //             return res.status(404).json({ error: 'Sub Seva not found' });
    //         }
    //     } catch (error) {
    //         return res.status(500).json({ error: "Sub seva not found" });
    //     }
    // }

    @Get("/")
    async getAllSubSevas(@Query("getsubServices") getsubServices: boolean, @Query("seva_type") seva_type: number) {
        try {
            const result = await SubSevaService.Instance.getAllSubSevas(getsubServices,seva_type);
            return result;
        } catch (error) {
            throw new HttpException({
                success: false,
                error: 'Failed to get all SubSevas'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

   






}