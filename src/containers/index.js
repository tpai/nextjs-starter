import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import NoSSR from 'react-no-ssr'
import {css} from 'glamor'
import withRedux from 'next-redux-wrapper'
import initStore from '../../src/redux/store'
import * as userActions from '../../src/redux/modules/user'
import Loading from '../../src/components/Loading'
import World from '../../static/world.svg'

export default withRedux(initStore)(connect(
  state => ({user: state.user}),
  dispatch => ({actions: bindActionCreators(userActions, dispatch)})
)
  (props => {
    const {actions} = props
    // actions.setUser()
    return (<App {...props} />)
  })
)

export function App({ user }) {
  return (
    <div className={css({fontSize: '2rem'})}>
      {user} <FormattedMessage id='greeting' defaultMessage='Hello, World!' /><World style={{ fill: 'green'}} />
      <NoSSR onSSR={<Loading />}>
        <section>
          <h2>
            <FormattedMessage id='client_rendering' defaultMessage='This section is <em>only</em> client-side rendered.' />
          </h2>
        </section>
      </NoSSR>
    </div>
  )
}
