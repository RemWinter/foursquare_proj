import React, { FC, useEffect, useRef }  from 'react'
import styles from './Sidebar.module.css'

interface SideBarProps {
  name: string;
  address: string;
  id: string;
  open: boolean
}

const SideBar:FC<SideBarProps> = ({name, address, id, open}) => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    container.current && open && container.current.classList.add(styles.active)
  }, [open])

  return (
    <div ref={container} className={styles.sideBarContainer}>
      <div>
        <h1>{name}</h1>
        <h1>{address}</h1>
      </div>

      <a target='_blank' href={`https://foursquare.com/venue/${id}`}>Open</a>
    </div>
  )
}

export default SideBar