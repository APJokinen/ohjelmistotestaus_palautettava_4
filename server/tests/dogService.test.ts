import { describe,expect, test,vi, beforeEach, afterEach } from "vitest"
import * as dogService from "../services/dogService"


vi.stubGlobal("fetch", vi.fn())

const mockedFetch = vi.mocked(fetch)
const mockFetchResponse = {
            message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
            status: 'success'
         }

describe('dogService',() => {

     beforeEach(() => { 
    vi.clearAllMocks(); 
  }); 
 
  afterEach(() => { 
    vi.resetAllMocks(); 
  });

    test('Should return valid image url', async() => {
        
         mockedFetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockFetchResponse)
         } as Response)
        
        const response = await dogService.getRandomDogImage()
        expect(response.imageUrl).toEqual(mockFetchResponse.message)
        expect(response.status).toBe('success')
        expect(mockedFetch).toHaveBeenCalledOnce()
    })

    test('Should return error with invalid values', async() => {
        mockedFetch.mockResolvedValueOnce({
            ok: false,
            status: 500
         } as Response)

        
         expect(dogService.getRandomDogImage).rejects.toThrow("Dog API returned status 500")
        

    })

})
