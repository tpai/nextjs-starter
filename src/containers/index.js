import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import NoSSR from 'react-no-ssr'
import {css} from 'glamor'
import withRedux from 'next-redux-wrapper'
import initStore from '../../src/redux/store'
import Loading from '../../src/components/Loading'
import World from '../../static/world.svg'

export default withRedux(initStore)(connect(
  state => ({wtf: state.wtf}),
  dispatch => ({})
)
  (props => {
    const {actions} = props
    // actions.setUser()
    return (<App {...props} />)
  })
)

export function App({ wtf }) {
  return (
    <div className={css(bgStyle)}>
      <div className={css(maskStyle)}>
        <h1>{wtf.YourFuckingIPAddress}</h1>
        <h2><FormattedMessage id='greeting' defaultMessage='Hello, World!' /><World style={{ fill: 'lightGreen'}} /></h2>
        <NoSSR onSSR={<Loading />}>
          <h3>
            <FormattedMessage id='client_rendering' defaultMessage='This section is <em>only</em> client-side rendered.' />
          </h3>
        </NoSSR>
      </div>
    </div>
  )
}

css.global('body', {margin: 0})

const bgStyle = {
  background: `url('http://unsplash.it/1920/1080') top center / cover fixed`
}

const maskStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '100vw',
  minHeight: '100vh',
  color: '#eee',
  background: 'rgba(0, 0, 0, .5)'
}
