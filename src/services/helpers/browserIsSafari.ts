export default ():boolean =>
  navigator.userAgent.toLowerCase().includes('safari') && !navigator.userAgent.toLocaleLowerCase().includes('chrome');