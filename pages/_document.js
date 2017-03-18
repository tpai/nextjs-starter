import Document, { Head, Main, NextScript } from 'next/document'
import { renderStatic } from 'glamor/server'
import { style, rehydrate } from 'glamor'

if (typeof window !== 'undefined') {
  rehydrate(window.__NEXT_DATA__.ids)
}

export default class MyDocument extends Document {
  static async getInitialProps ({renderPage, ...restProps}) {
    const {req} = restProps;
    const page = renderPage()
    const styles = renderStatic(() => page.html)
    return {
      ...page,
      ...styles,
      localeDataScript: req.localeDataScript
    }
  }

  constructor (props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids
    }
  }

  render () {
    return (
      <html>
        <Head>
          <title>My page</title>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript
            }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}
