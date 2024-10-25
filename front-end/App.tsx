import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Tools = React.lazy(() => import('./Pages/tools'))
const Proyects = React.lazy(() => import('./Pages/myprojects'))
const Landing = React.lazy(() => import('./Pages/landing'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/tools',
      name: 'Tools',
      component: Tools,
    },
    {
      path: '/myprojects',
      name: 'Proyects',
      component: Proyects,
    },
    {
      path: '/',
      name: 'Landing',
      component: Landing,
    },
  ]

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  return (
    <React.Fragment>
      <React.Suspense fallback={<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>Loading</span>}>
        <React.Fragment>{switchRoutes}</React.Fragment>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
