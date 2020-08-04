function noop() {}

class MyPromise {
  constructor(executor) {
    this.queue = []
    this.errorHendler = noop

    try {
      executor.call(null, this.onResolve.bind(this), this.onReject.bind(this))
    } catch (e) {
      this.errorHendler(e)
    }
  }

  onResolve(data) {
    this.queue.forEach(callback => {
      data = callback(data)
    })
  }

  onReject(error) {
    this.errorHendler(error)
  }

  then(fn) {
    this.queue.push(fn)
    return this
  }

  catch(fn) {
    this.errorHendler = fn
    return this
  }

  finally(fn) {}
}

module.exports = MyPromise;
