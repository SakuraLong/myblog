class Event {
  constructor() {
    this.eventMap = new Map()
  }

  addEventListener(eventName, func, context = null, meta) {
    if (!this.eventMap.has(eventName)) this.eventMap.set(eventName, [])
    this.eventMap.get(eventName).push([func, context, meta])
  }

  removeEventListener(eventName, func, context = null) {
    if (this.eventMap.has(eventName)) {
      this.eventMap.set(eventName,
        this.eventMap.get(eventName)
          .filter((f) => f[0] !== func || f[1] !== context))
    }
  }

  trigger(eventName, ...params) {
    if (this.eventMap.has(eventName)) {
      this.eventMap.get(eventName).forEach((func) => {
        if (func[1]) {
          if (func[2] !== undefined) func[0].apply(func[1], [...params, func[2]])
          else func[0].apply(func[1], params)
        } else {
          if (func[2] !== undefined) func[0](params, func[2])
          else func[0](params)
        }
      })
    }
  }

  destroy() {
    this.eventMap.clear()
  }
}

export default Event
