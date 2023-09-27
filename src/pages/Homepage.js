import React,{useState,useEffect} from 'react';
import Search from '../components/Search';
import Picture from '../components/picture';
import {useSearchParams} from 'react-router-dom'

const Homepage = () => {
    const [input,setInput] = useState("");
    let [page,setPage] = useState(1);
    let [currentSearch,setCurrentSearch] = useState("");
    let [data,setData] = useState([]);
    const [searchParams,setSearchParams] = useSearchParams({q:"",
            onlyComputerItem:false});
    const q = searchParams.get("q");
    const onlyComputerItem = searchParams.get("onlyComputerItem") === "true" ;
    const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=12&locale='zh-TW'&locale='en-US'`;
    const auth = "Q9ZGqjt3kRUPQnGmtnBEmDJvdE9ecpauwvJr2cQXtYSdiGaFDOGYOSJF";
    const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
    const search = async (url)=>{
        setPage(2)
        setCurrentSearch(input)
        const  dataFetch = await fetch(url,{
            method:'GET',
            headers:{
                Accept:"application/json",
                Authorization:auth,

            }
         });
         let parseData = await dataFetch.json();
         
         setData(parseData.photos);
         
    };
 const morepicture = async()=>{
        
     let newUrl;
     if(input===""){
       newUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
     }else{
        newUrl = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}&locale='zh-TW'&locale='en-US'`;
     }
     setPage(page+1);
     const  dataFetch = await fetch(newUrl,{
        method:'GET',
        headers:{
            Accept:"application/json",
            Authorization:auth,

        }
     });
     let parseData = await dataFetch.json();
     
     setData(data.concat(parseData.photos));
     
 };

useEffect(()=>{
    search(initialURL)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);
useEffect(()=>{
    if(currentSearch===""){
    search(initialURL);
    }else{
        search(searchURL);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[currentSearch])
  
useEffect(()=>{
    
    let onlyUrl = `https://api.pexels.com/v1/search?query=${q}&per_page=12&locale='zh-TW'&locale='en-US`;
   if(q&&onlyComputerItem){
      search(onlyUrl)
   }
   
// eslint-disable-next-line react-hooks/exhaustive-deps
},[q,onlyComputerItem])

  return (
    <div style={{minHeight:'100vh'}}>
        <Search search={()=>{
            setCurrentSearch(input)
            
            }} searchParams={searchParams} setInput={setInput} setSearchParams={setSearchParams} q={q}onlyComputerItem={onlyComputerItem} setCurrentSearch={setCurrentSearch}/>
         <div className="pictures">
           {data && data.map( (d) => {
                  return  <Picture key={d.id} data={d} />
            }) }
        </div> 
        <div className="morepicture">
            <button onClick={morepicture}>Load More</button>
        </div>
    </div>
  )
}

export default Homepage