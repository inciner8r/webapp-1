const Loader = () => {
    return (
      <div className="flex-col justify-center items-center">
      <div className="top-0 right-0 z-50 flex justify-center items-center p-10">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-200"></div>
      </div>
      <div className="text-green-200 text-center text-xl font-bold">Loading on-chain reviews…</div>
      </div>
    )
  }
  
  export default Loader