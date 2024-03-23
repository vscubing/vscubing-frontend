export function copyToClipboard(text: string) {
  return new Promise<void>((resolve, reject) => {
    if (navigator?.clipboard && navigator?.permissions) {
      const type = 'text/plain'
      const blob = new Blob([text], { type })
      const data = [new ClipboardItem({ [type]: blob })]
      // @ts-expect-error clipboard-write not typed
      void navigator.permissions.query({ name: 'clipboard-write' }).then((permission) => {
        if (permission.state === 'granted' || permission.state === 'prompt') {
          navigator.clipboard.write(data).then(resolve, reject).catch(reject)
        } else {
          reject(new Error('Permission not granted!'))
        }
      })
    } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      const textarea = document.createElement('textarea')
      textarea.textContent = text
      textarea.style.position = 'fixed'
      textarea.style.width = '2em'
      textarea.style.height = '2em'
      textarea.style.padding = '0'
      textarea.style.border = 'none'
      textarea.style.outline = 'none'
      textarea.style.boxShadow = 'none'
      textarea.style.background = 'transparent'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      try {
        document.execCommand('copy')
        document.body.removeChild(textarea)
        resolve()
      } catch (e) {
        document.body.removeChild(textarea)
        reject(e)
      }
    } else {
      reject(new Error('None of copying methods are supported by this browser!'))
    }
  })
}
