import EasyWorker from '@vandeurenglenn/easy-worker'
import {LeofcoinStorage} from '@leofcoin/storage'
const worker: EasyWorker = new EasyWorker()
const logStore = new LeofcoinStorage('log')
await logStore.init()

declare type messageType = 'put' | 'get'

declare type message = {
  type: messageType,
  input: string | number | EpochTimeStamp,
  nativeLog: boolean
}

declare type messageReturn = {
  type: messageType,
  result?: string,
  message?: string,
  error?: Error
}

// const handlePut = async message => {
//   try {
//     await fetch(`http://localhost:8844/log/put`, {
//       method: 'put',
//       body: message
//     })
//   } catch (error) {
//     worker.postMessage({ type: 'logError', message, error })
//   }
// }

// const handleGet = async message => {
//   try {
//     await fetch(`http://localhost:8844/log/get?`, {
//       method: 'put',
//       body: message
//     })
//   } catch (error) {
//     worker.postMessage({ type: 'logError', message, error })
//   }
// }

const handlePut = async (message: string | object | number, nativeLog?) => {
  const time = new Date().getTime()
  worker.postMessage({ type: 'log', time, message })
  await logStore.put(time, message)
  if (nativeLog) console.log(message);
  
}

const handleGet = async (date?: string | number) => {
  if (date === undefined) {
    return logStore.values()
  }
  return logStore.get(String(date))
}

worker.onmessage((message: message) => {
  if (!message.type) message.type = 'put'
  if (message.type === 'put') handlePut(message.input, message.nativeLog)
  else handleGet(message.input)
})

