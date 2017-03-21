/* global test */

import React from 'react'
import { App } from '../src/containers/index.js'
import zhTW from '../lang/zh-TW.json'
import createComponentWithIntl from './createComponentWithIntl'

test('App should be rendered correctly when locale set to zh-TW', () => {
  const component = createComponentWithIntl(<App />, { locale: 'zh-TW', messages: zhTW })

  let tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
