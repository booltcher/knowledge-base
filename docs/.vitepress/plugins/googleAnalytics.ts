declare const dataLayer: any[]
declare const gtag: (...args: any[]) => void
declare global {
  interface Window {
    dataLayer?: typeof dataLayer
    gtag?: typeof gtag
  }
}

function mountGoogleAnalytics(measurementId: string) {
  if (window.dataLayer && window.gtag)
    return

  const gtagScript = document.createElement('script')
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  gtagScript.async = true
  document.head.appendChild(gtagScript)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', measurementId)
}

export const googleAnalytics = ({ id }) => {
  if (process.env.NODE_ENV === 'production' && id && typeof window !== 'undefined')
    mountGoogleAnalytics(id)
}
