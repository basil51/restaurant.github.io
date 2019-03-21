if ('serviceWorker' in navigator) {
  window.addEventListener('load', ()=> {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => console.log(`ServiceWorker : Registered => ${reg.scope}` ))
      .catch(err =>console.log(`ServiceWorker : Error => , ${err}`))
    })
  }