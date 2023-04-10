import EasyWorker from '@vandeurenglenn/easy-worker'

const worker = await new EasyWorker('./node_modules/@laofcoin/shy-log/exports/worker.js')

export const log = (input: string) => worker.postMessage({type: 'put', input})

export const get = (input: string) => worker.postMessage({type: 'get', input})

export const listen = (fn) => worker.onmessage(fn);
