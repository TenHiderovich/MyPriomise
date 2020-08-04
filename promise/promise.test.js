const MyPromise = require('./promise')

describe('My Promise', () => {

  let promise
  let executorSpy

  const successResult = 42

  beforeEach(() => {
    executorSpy = jest.fn((r) => setTimeout(() => r(successResult), 150))
    promise = new MyPromise(executorSpy)
  })

  test('should exists and to be typeof function', () => {
    expect(MyPromise).toBeDefined()
    expect(typeof MyPromise).toBe('function')
  })

  test('instance should has methods then, catch and finally', () => {
    expect(promise.then).toBeDefined()
    expect(promise.catch).toBeDefined()
    expect(promise.finally).not.toBeUndefined() // в целях изучения, то же что и два предыдущих
  })

  test('should call executor function', () => {
    expect(executorSpy).toHaveBeenCalled()
  })

  test('should get data in then block and chain them', async () => {
    const result = await promise.then(num => num).then(num => num * 2)
    expect(result).toBe(successResult * 2)
  })

});
