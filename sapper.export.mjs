import { spawn } from 'child_process'
import { rootpath } from './svelte.config.mjs'

const basepath = rootpath ? `--basepath ${rootpath}` : ''
const args = ['--legacy']
if (basepath) {
  args.push(basepath)
}

spawn('npx sapper export', args, {
  shell: true,
  stdio: 'inherit'
})

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
