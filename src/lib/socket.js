const Error = require('./error')
const axios = require('axios');
const Emitter = {
  setup (target) {
    let listeners = []

    Object.assign(target, {
      on (type, handle) {
        if (typeof handle === 'function') {
          listeners.push([type, handle])
        }
      },
      emit (type, ...params) {
        listeners.forEach(
          ([listenType, handle]) => type === listenType && handle(...params)
        )
      },
      removeAllListeners () {
        listeners = []
      }
    })
  }
}

let wx = {}

/**
 * 基于小程序 WebSocket 接口封装信道
 */
module.exports = class socket {
  constructor(id = '') {
    if (id === '') {
      throw new Error(415)
    }
    this.config = {
      host: 'wss.bmobcloud.com'
    }
    Emitter.setup((this.emitter = {}))
    this.applicationId = id
    this.initialize()
  }
  handshake () {
    function complete (data) {
      if (data instanceof Error) {
        self.connecting = false
        self.onError(data.message)
      } else {
        return data.split(':')[0]
      }
    }

    let url = 'http://' + this.config.host + ':3010/socket.io/1/?t=' + new Date().getTime()
 
    return new Promise((resolve, reject) => {
      // Make a request for a user with a given ID
      axios.get(url, { headers: { 'content-type': 'text/plain' } })
        .then(function (response) {
          // handle success
          return resolve(complete(response.data))

        })
        .catch(function (e) {
          // handle error
          return resolve('request error', e)
        })

    })
  }
  initialize () {
    this.emitter.removeAllListeners()
    this.handshake().then(protocol => {
      try {
        let connectObj = this.connect(
          `wss://${this.config.host}/socket.io/1/websocket/` + protocol,
          {}
        )
        connectObj.then(res => {
          console.log(res, '连接成功...')
        })
      } catch (connectError) {
        console.error({ connectError })
        throw connectError
      }
    })
    this.on('close', () => {
      console.log('连接已中断,5秒后重新连接')
      setTimeout(() => this.initialize(), 5000)
    })

    return new Promise((resolve, reject) => {
      this.on('server_pub', data => {
        switch (data.action) {
          case 'updateTable':
            this.onUpdateTable(data.tableName, data.data)
            break
          case 'updateRow':
            this.onUpdateRow(data.tableName, data.objectId, data.data)
            break
          case 'deleteTable':
            this.onDeleteTable(data.tableName, data.data)
            break
          case 'deleteRow':
            this.onDeleteRow(data.tableName, data.objectId, data.data)
            break
        }
      })

      // 连接上socket.io服务器后触发的事件
      this.on('client_send_data', resp => {
        this.onInitListen()
      })
    })
  }

  onInitListen () { }

  connect (url, header) {
    // 小程序 wx.connectSocket() API header 参数无效，把会话信息附加在 URL 上
    const query = Object.keys(header)
      .map(key => `${key}=${encodeURIComponent(header[key])}`)
      .join('&')
    const seperator = url.indexOf('?') > -1 ? '&' : ''
    url = [url, query].join(seperator)

    return new Promise((resolve, reject) => {
      wx = new WebSocket(url)

      wx.onopen = resolve
      wx.onerror = resolve
      wx.onmessage = (packet => {
        try {
          let filter = function (str) {
            const { name, args } = JSON.parse(str)
            return { name, args }
          }
          let str = packet.data
          let startStr = str.slice(0, 4)
          // 检测心跳
          if (startStr === '2:::') {
            this.emit(false, true)
          }
          str = str.slice(4)

          // 截取后不能为空
          if (str === null || str === '') {
            return
          }
          const { name, args } = filter(str)
          let data = args == null ? '' : JSON.parse(args[0])
          this.emitter.emit(name, data)
        } catch (e) {
          console.log('Handle packet failed: ' + packet.data, e)
        }
      })
      wx.onclose = () => this.emitter.emit('close')

    })
  }

  on (message, handle) {
    this.emitter.on(message, handle)
  }

  emit (message, data) {
    data = data === undefined ? '5:::' : '2:::'
    message = message ? JSON.stringify(message) : ''
    wx.send(data + message)
  }

  emitData (name, data) {
    data = JSON.stringify(data)
    return { name: name, args: [data] }
  }

  updateTable (tablename) {
    let data = {
      appKey: this.applicationId,
      tableName: tablename,
      objectId: '',
      action: 'updateTable'
    }
    data = this.emitData('client_sub', data)
    this.emit(data)
  }

  // 取消订阅更新数据表的数据
  unsubUpdateTable (tablename) {
    let data = {
      appKey: this.applicationId,
      tableName: tablename,
      objectId: '',
      action: 'unsub_updateTable'
    }
    data = this.emitData('client_unsub', data)
    this.emit(data)
  }

  // 订阅行更新的数据
  updateRow (tablename, objectId) {
    let data = {
      appKey: this.applicationId,
      tableName: tablename,
      objectId: objectId,
      action: 'updateRow'
    }
    data = this.emitData('client_sub', data)
    this.emit(data)
  }

  // 取消订阅行更新的数据
  unsubUpdateRow (tablename, objectId) {
    let data = {
      appKey: this.applicationId,
      tableName: tablename,
      objectId: objectId,
      action: 'unsub_updateRow'
    }
    data = this.emitData('client_unsub', data)
    this.emit(data)
  }

  // 订阅表删除的数据
  deleteTable (tablename) {
    let data = {
      appKey: this.applicationId,
      tableName: tablename,
      objectId: '',
      action: 'deleteTable'
    }
    data = this.emitData('client_sub', data)
    this.emit(data)
  }

  // 取消订阅表删除的数据
  unsubDeleteTable (tablename) {
    let data = {
      appKey: this.applicationId,
      tableName: tablename,
      objectId: '',
      action: 'unsub_deleteTable'
    }
    data = this.emitData('client_unsub', data)
    this.emit(data)
  }

  // 订阅更新数据表的数据
  deleteRow (tablename, objectId) {
    let data = {
      appKey: this.applicationId,
      tableName: tablename,
      objectId: objectId,
      action: 'deleteRow'
    }
    data = this.emitData('client_sub', data)
    this.emit(data)
  }

  // 订阅更新数据表的数据
  unsubDeleteRow (tablename, objectId) {
    let data = {
      appKey: this.applicationId,
      tableName: tablename,
      objectId: objectId,
      action: 'unsub_deleteRow'
    }
    data = this.emitData('client_unsub', data)
    this.emit(data)
  }

  // 监听服务器返回的更新数据表的数据，需要用户重写
  onUpdateTable (tablename, data) { }

  // 监听服务器返回的更新数据表的数据，需要用户重写
  onUpdateRow (tablename, objectId, data) { }

  // 监听服务器返回的更新数据表的数据，需要用户重写
  onDeleteTable (tablename, data) { }

  // 监听服务器返回的更新数据表的数据，需要用户重写
  onDeleteRow (tablename, objectId, data) { }
}
