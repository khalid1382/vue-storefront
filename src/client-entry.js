import { createApp } from './app'
require('./service-worker-registration') // register the service worker

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    Promise.all(activated.map(c => { // TODO: update me for mixins support
      const components = c.mixins ? Array.from(c.mixins) : []
      components.push(c)
      Promise.all(components.map(SubComponent => {
        if (SubComponent.asyncData) {
          return SubComponent.asyncData({
            store,
            route: to
          })
        }
      })).then(() => {
        next()
      }).catch(next)
    }))
  })
  app.$mount('#app')
})
