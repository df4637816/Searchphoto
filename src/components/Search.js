import React from 'react'

const Search = ({search,setSearchParams,q,onlyComputerItem,setInput,setCurrentSearch}) => {
    
   const inputtextHandler = (e)=>{
       setSearchParams(prev =>{
          prev.set("q",e.target.value);
          return prev
       },{replace:true})
      setInput(e.target.value)
      
   }
   const inputCheckbox =(e)=>{
      setSearchParams(prev =>{
         prev.set("onlyComputerItem",e.target.checked)
         return prev
      },{replace:true})
       if(e.target.checked){
         setCurrentSearch(document.querySelector('input[type="text"]').textContent)
       }
   }
   
  return (
    <div className='search'>
         
        <input onChange={inputtextHandler} placeholder='search' type="text" id='q' value={q}  />
        <button onClick={search}>Search</button>
       <div className="onlyComputerItem">
         <label htmlFor="onlyComputerItem" >Only Computer Items</label>
         <input type="checkbox" onChange={inputCheckbox} id="onlyComputerItem" checked={onlyComputerItem} />
       </div>
    </div>
  )
}

export default Search