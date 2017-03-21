import React, {Component} from 'react'
import pageWithIntl from '../src/components/PageWithIntl'
import Index from '../src/containers/index'

class App extends Component {
  render() {
    const {initialState} = this.props
    return (<Index {...{ initialState }} />)
  }
}

export default pageWithIntl(props => <App {...props} />)
