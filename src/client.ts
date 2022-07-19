import * as sapper from '@sapper/app'
import { rootpath } from './client.config'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(`${rootpath}/service-worker.js`)
}

sapper.start({
  target: document.querySelector('#wrapper')
})
