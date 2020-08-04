function noop() {}

class MyPromise {
  constructor(executor) {
    this.queue = []
    this.errorHendler = noop
    this.finallyHandler = noop

    try {
      executor.call(null, this.onResolve.bind(this), this.onReject.bind(this))
    } catch (e) {
      this.errorHendler(e)
    } finally {
      this.finallyHandler()
    } 
  }

  onResolve(data) {
    this.queue.forEach(callback => {
      data = callback(data)
    })
    this.finallyHandler()
  }

  onReject(error) {
    this.errorHendler(error)
    this.finallyHandler()
  }

  then(fn) {
    this.queue.push(fn)
    return this
  }

  catch(fn) {
    this.errorHendler = fn
    return this
  }

  finally(fn) {
    this.finallyHandler = fn
    return this
  }
}

module.exports = MyPromise;
