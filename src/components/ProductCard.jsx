import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export default function ProductCard({ item, add }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileHover={{ scale: 1.05, y: -10 }}
      className='card'
    >
      <img src={item.image} alt={item.name} loading="lazy" />
      <div className='content'>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className='footer'>
          <strong>${item.price}</strong>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => add(item)}
          >
            Agregar
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
