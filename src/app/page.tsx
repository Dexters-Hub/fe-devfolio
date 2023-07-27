import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.bodyContainer}>

      <div className={styles.navigator}>
        <Link href="/task-1"><div className={styles.cardContainer}>Task 1</div></Link>
        <Link href="/task-2"><div className={styles.cardContainer}>Task 2</div></Link>
      </div>
      
    </main>
  )
}
