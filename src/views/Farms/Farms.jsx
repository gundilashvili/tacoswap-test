import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Page from '../../components/Page'
import { StyledSubtitleProto } from '../../components/PageHeader/PageHeader'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'

const Farms = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <StyledSubtitleProto  >
            ⚠️  Please note that current APYs are approximate
          </StyledSubtitleProto>
          <FarmCards />
        </Route>
        <Route path={`${path}/:farmId`}>
          <Farm />
        </Route>
      </Page>
    </Switch>
  )
}

export default Farms
