// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const IntlPolyfill = require('intl')
Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

const {parse} = require('url')
const {readFileSync} = require('fs')
const {basename} = require('path')
const express = require('express')
const route = require('path-match')({
  sensitive: false,
  strict: false,
  end: false
})
const accepts = require('accepts')
const glob = require('glob')
const next = require('next')
const compression = require('compression')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

// Get the supported languages by looking for translations in the `lang/` dir.
const languages = glob.sync('./lang/*.json').map((f) => basename(f, '.json'))

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map()
const getLocaleDataScript = (locale) => {
  const lang = locale.split('-')[0]
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`)
    const localeDataScript = readFileSync(localeDataFile, 'utf8')
    localeDataCache.set(lang, localeDataScript)
  }
  return localeDataCache.get(lang)
}

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = (locale) => {
  return require(`./lang/${locale}.json`)
}

const routes = path => route(path);

app.prepare().then(() => {
  const server = express()
  server.use(compression())
  server.use((req, res) => {
    const {pathname, query} = parse(req.url, true)
    if (pathname === '/') {
      const accept = accepts(req)
      const locale = accept.language(dev ? ['zh-TW'] : languages)
      req.locale = locale
      req.localeDataScript = getLocaleDataScript(locale)
      req.messages = getMessages(locale)
      req.initialState = { user: 'Tony' }
      app.render(req, res, '/index', query)
    } else if (routes('/ping')(pathname)) {
      res.send('pong')
    } else {
      handle(req, res)
    }
  })
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
