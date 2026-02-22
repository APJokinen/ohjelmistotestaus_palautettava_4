import { describe,expect, test,vi, beforeEach, afterEach } from "vitest"
//import * as dogRoutes from "../routes/dogRoutes"
import * as dogController from "../controllers/dogController"
import { Request, Response } from 'express'
import request from "supertest"
import app  from '../index' 



vi.mock("../controllers/dogController")

describe("dogRoute",() => {
     beforeEach(() => { 
    vi.clearAllMocks(); 
  }); 
 
  afterEach(() => { 
    vi.resetAllMocks(); 
  });
    test("valid dogRoute response with valid dogController return", async() => {

      const controllerMock = {
    "success":true,
    "data": {
        "imageUrl":"https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
        "status":"success"
    }
}


        vi.mocked(dogController.getDogImage).mockImplementation( 
      async (req: Request, res: Response) => { 
        res.json(controllerMock) 
    })

    

    const response = await request(app)
    .get('/api/dogs/random')

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.imageUrl).toBe(controllerMock.data.imageUrl)

    })
    
    test("invalid dogRoute resonse with invalid dogController return", async() => {

        const controllerMock = {
    "success":false,
    "error":"Failed to fetch dog image: Network error"
      }

      vi.mocked(dogController.getDogImage).mockImplementation( 
      async (req: Request, res: Response) => { 
        res.status(500).json(controllerMock) 
    })

    const response = await request(app)
    .get('/api/dogs/random')

      expect(response.status).toBe(500)
      expect(response.body.error).toBeDefined() 
    })
})