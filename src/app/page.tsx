'use client'

import SideBar from "@/components/SideBar";
import axios from "axios";
import { useEffect, useState } from "react";


const location: string = '41.385128%2C2.176872'
const token: string = 'fsq38jf5s6BtxsM5GasJ/3pdhr7HlOSL2O6cjpiwegCvd90='



export default function Home() {

  const [data, setData] = useState<Record<string, any>[]>([])
  const [sideBarData, setSideBarData] = useState<Record<string, any>>()
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false)

  const getLocationData = async (location:string, token:string) => {
    axios.get(
      `https://api.foursquare.com/v3/places/search?ll=${location}`, 
      {
        headers: {
          "Accept": "application/json",
          "Authorization": token

        },
      }
    ).then((res) => {
      setData(res.data.results)
    })
  }

  const handleOptionCLick = (index:number) => {
    setSideBarData(data[index])
  }


  useEffect(() => {
    getLocationData(location, token)
  }, [])

  useEffect(() => {
    console.log(sideBarData)
    sideBarData && console.log(sideBarData)
    sideBarData && setSideBarOpen(true)
  }, [sideBarData])

  useEffect(() => {
    console.log(sideBarOpen)
  }, [sideBarOpen])

  return (
    <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw'}}>
      <ul>
        {data.map((item, i) => (
          <li key={item.name} onClick={() => handleOptionCLick(i)}>
            {item.name}
          </li>
        ))}
      </ul>
      {sideBarData &&
        <SideBar name={sideBarData.name} address={sideBarData.location.formatted_address} id={sideBarData.fsq_id} open={sideBarOpen}/>
      }
    </div>
  );
}
