import * as dogService from '../services/dogService';
import * as dogController from '../controllers/dogController';
import { describe,expect, test,vi } from "vitest"


const controllerMock = {
    imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
    status: 'success'
}

const createMockResponse = () => { 
const res: any = {} 
res.status = vi.fn().mockReturnThis() 
res.json = vi.fn() 
return res 
} 


//vi.mock('../services/dogService')

describe('dogController',() => {
    test("valid response with valid dogData", async() => {
        vi.spyOn(dogService, "getRandomDogImage").mockResolvedValue(controllerMock)
        const req: any = {}
        const res = createMockResponse()
        await dogController.getDogImage(req,res)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            "data": controllerMock
        }))
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            "success":true
        }))
        
    })
})