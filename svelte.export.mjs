import { spawn } from 'child_process'
import { rootpath } from './svelte.config.mjs'

const basepath = rootpath ? ` --basepath ${rootpath}` : ''
// const cmd = spawn('sapper', ['export', `${basepath}`, '--legacy'], { stdio: 'inherit' })
console.log('TODO: spawn options')

// cmd.stdout.on('data', (data) => {
//   console.log(data.toString())
// })
//
// cmd.stderr.on('data', (data) => {
//   console.log(data.toString())
// })
//
// cmd.on('exit', (code) => {
//   console.log(`child process exited with code ${code.toString()}`)
// })
