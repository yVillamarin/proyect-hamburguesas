import { motion } from 'framer-motion'

export default function Cart({ cart, add, remove, clearCart, total, totalItems, isMinimized, onToggleMinimize }) {
  const msg = encodeURIComponent(`Hola quiero pedir:%0A${cart.map(i => `- ${i.name} x${i.quantity}`).join('%0A')}%0ATotal: $${total}`)
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`cart ${isMinimized ? 'cart-minimized' : ''}`}
    >
      <div className='cart-head'>
        <div className='cart-head-left'>
          🛒 {totalItems} productos
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onToggleMinimize}
          className='toggle-cart-btn'
          title={isMinimized ? 'Expandir carrito' : 'Minimizar carrito'}
        >
          {isMinimized ? '▲' : '▼'}
        </motion.button>
      </div>
      {!isMinimized && (
        <>
          {cart.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className='cart-item' 
              key={index}
            >
              <div className='cart-item-info'>
                <span>{item.name}</span>
                <strong>${item.price * item.quantity}</strong>
              </div>
              <div className='cart-item-controls'>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => remove(item.id)} className='cart-control-btn'>
                  −
                </motion.button>
                <span>{item.quantity}</span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => add(item)} className='cart-control-btn'>
                  +
                </motion.button>
              </div>
            </motion.div>
          ))}
          <h3>Total: ${total}</h3>
          <div className='cart-actions'>
            <a 
              className='wa' 
              href={`https://wa.me/573001112233?text=${msg}`} 
              target='_blank'
              rel='noopener noreferrer'
            >
              Pedir por WhatsApp
            </a>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={clearCart} 
              className='clear-btn'
            >
              🗑️
            </motion.button>
          </div>
        </>
      )}
      {isMinimized && (
        <div className='cart-minimized-content'>
          <h3>Total: ${total}</h3>
        </div>
      )}
    </motion.div>
  )
}
