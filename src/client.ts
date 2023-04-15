import EasyWorker from '@vandeurenglenn/easy-worker'

export const worker: EasyWorker = await new EasyWorker('./node_modules/@leofcoin/shy-log/exports/worker.js')

export const log = (input: string) => worker.postMessage({type: 'put', input})

export const get = (input: string) => worker.postMessage({type: 'get', input})

export const listen = (fn: Function) => worker.onmessage(fn);

export default {
  worker,
  log,
  get,
  listen
}