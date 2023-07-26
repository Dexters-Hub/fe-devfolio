import React from 'react'
import styles from './styles.module.css'

const ElementScreen = () => {
  return (
    <main className={styles.bodyContainer}>
      
      {/* Main Card Body */}
        <div className={styles.cardBody}>

          {/* Card Elements - 30 Hours of ...*/}
            <div className={styles.firstElement}>

                <p className={styles.tagline}>30</p>
                <div className={styles.mainContent}>
                  <p>HOURS</p>
                  <p className={styles.secondContent}>OF <span>...</span></p>
                </div>

            </div>

          {/* Card Elements - Card Footer */}
            <div className={styles.secondElement}>
                <p>DESIGNING / BUILDING / CODING / HACKING</p>
                <p className={styles.second_footer_text}>NETWORKING / FRIENDS / MENTORS / COMPETITIONS</p>
                <p className={styles.third_footer_text}> COFEE / TEA / GREEN TEA / FOOD / SNACKS / SWAGS / T-SHIRTS</p>
                <p className={styles.fourth_footer_text}> SUPER FAST INTERNET / TALKS / DID WE MENTION GREEN TEA? / PRIZES / BRAND NEW APIs</p>
                
                <div className={styles.last_footer}>
                  <p className={styles.fifth_footer_text}>AND / A / WHOLE / LOT / MORE</p>
                  <span></span>
                </div>
            </div>
            
        </div>
      </main>
  )
}

export default ElementScreen