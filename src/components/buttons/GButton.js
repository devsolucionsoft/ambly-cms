import React from 'react'
import styles from './GButton.module.scss'
import { motion } from 'framer-motion'

const GButton = ({ text, onClick, type }) => {
    return (

        <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className={styles.btnContainer}>
                <button type={type} className={styles.gButton} onClick={onClick}>{text}  </button>

            </div>
        </motion.div>


    )
}

export default GButton