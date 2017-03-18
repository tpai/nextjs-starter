import React from 'react'
import {FormattedMessage, FormattedNumber} from 'react-intl'
import NoSSR from 'react-no-ssr'
import {css} from 'glamor'
import pageWithIntl from '../src/components/PageWithIntl'
import Loading from '../src/components/Loading'
import World from '../static/world.svg'

export default pageWithIntl(() => (
  <div className={css({ fontSize: '2rem' })}>
      <FormattedMessage id='greeting' defaultMessage='Hello, World!' /><World style={{ fill: 'green'}} />
      <NoSSR onSSR={<Loading />}>
        <section>
          <h2>
            <FormattedMessage id='client_rendering' defaultMessage='This section is <em>only</em> client-side rendered.' />
          </h2>
        </section>
      </NoSSR>
  </div>
))
