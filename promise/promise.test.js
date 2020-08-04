const MyPromise = require('./promise')

describe('My Promise', () => {

  test('should exists and to be typeof function', () => {
    expect(MyPromise).toBeDefined()
    expect(typeof MyPromise).toBe('function')
  })

});
