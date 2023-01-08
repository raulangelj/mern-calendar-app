import calendarAPI from "./calendarAPI"

describe('Tests on CalendarApi', () => {
  test('should return the default config', () => {
    expect(calendarAPI.defaults.baseURL).toBe(process.env.VITE_API_URL)
  })

  test('should have the x-token in the headers of all calls', async () =>{
    const mockToken = 'ABC-1234-XYZ'
    localStorage.setItem('token', mockToken)
    const response = await calendarAPI.get('/auth')
    expect(response.config.headers['x-token']).toBe(mockToken)
  })
})