const Spinner = () => {
  return (
      <div className={'flex h-3/4 z-10 w-full items-center justify-center absolute'}>
      <div className={'relative h-20 w-20 flex rounded-md items-center justify-center bg-zinc-600 absolute'}>
          <div className={'h-12 w-12 bg-zinc-600 rounded-full absolute z-20 animate-spin'}>

          </div>
          <div className={'h-14 w-14 bg-gradient-to-tr from-cyan-400 via-fuchsia-400  rounded-full to-amber-400 z-10 animate-spin'}>

          </div>
      </div>
      </div>
  )
}

export default Spinner