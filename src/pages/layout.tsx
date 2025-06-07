


// const loadBootstrapBundle = () => {
//   const script = document.createElement("script")
//   script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
//   script.integrity = "sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
//   script.crossOrigin = "anonymous"
//   script.async = true
//   document.body.appendChild(script)
// }

const RootLayout = ({ children } :any) => {
  // React.useEffect(() => {
  //   loadBootstrapBundle()
  // }, [])

  return (
    <div lang="zh">
      {children}
    </div>
  )
}

export default RootLayout
