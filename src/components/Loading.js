import React from 'react'
import {FormattedMessage} from 'react-intl'

export default () => (
  <div>
      <h3><FormattedMessage id='loading' defaultMessage='Loading...' /></h3>
    <style jsx>{`
      div {
        align-items: center;
        display: flex;
        height: 50vh;
        justify-content: center;
      }
    `}</style>
  </div>
)
