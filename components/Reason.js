import React from 'react'
import styles from '@/styles/Reason.module.css'


const Reason = ({number ,reasonTitle, reasonDesc}) => {
  return (
    <div className={styles.reasonWrapper}>
        <div className={styles.reasonNumber}>
            {`0${number+1}`}
        </div>
        <div className={styles.reasonTextWrapper}>
            <h3 className={styles.reasonTitle}>{reasonTitle}</h3>
            <p className={styles.reasonDesc}>{reasonDesc}</p>
        </div>
    </div>
  )
}

export default Reason;