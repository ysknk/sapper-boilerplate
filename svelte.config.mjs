import dotenv from 'dotenv'

export const rootpath = ''

export const mode = process.env.NODE_ENV
export const dev = mode === 'development'
export const legacy = !!process.env.SAPPER_LEGACY_BUILD

dotenv.config({
  path: `.env.${mode}`
})
