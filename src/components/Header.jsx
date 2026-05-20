import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className='hero'>
      <div className='overlay'></div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className='hero-content'
      >
        <h1>Burger House</h1>
        <p>Las mejores hamburguesas artesanales</p>
      </motion.div>
    </header>
  )
}
