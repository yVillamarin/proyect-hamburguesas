import { useState } from 'react'
import { burgers, combos, drinks, extras, hotdogs, salchipapas } from './data'
import Header from './components/Header'
import Tabs from './components/Tabs'
import ProductCard from './components/ProductCard'
import SimpleCard from './components/SimpleCard'
import Cart from './components/Cart'
import { motion } from 'framer-motion'

export default function App() {
  const [cart, setCart] = useState([])
  const [activeTab, setActiveTab] = useState('hamburguesas')
  const [isCartMinimized, setIsCartMinimized] = useState(false)

  const add = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const remove = (id) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id)
      if (item && item.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
      }
      return prev.filter(i => i.id !== id)
    })
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((a, b) => a + (b.price * b.quantity), 0)
  const totalItems = cart.reduce((a, b) => a + b.quantity, 0)

  const tabs = [
    { id: 'hamburguesas', label: 'Hamburguesas', items: burgers },
    { id: 'combos', label: 'Combos', items: combos },
    { id: 'perros', label: 'Perros Calientes', items: hotdogs },
    { id: 'salchipapas', label: 'Salchipapas', items: salchipapas },
    { id: 'bebidas', label: 'Bebidas', items: drinks },
    { id: 'adicionales', label: 'Adicionales', items: extras }
  ]

  const activeItems = tabs.find(t => t.id === activeTab)?.items || []

  return (
    <div>
      <Header />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className='section'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          key={activeTab}
          className='grid'
        >
          {activeItems.map(item => (
            item.image 
              ? <ProductCard key={item.id} item={item} add={add} />
              : <SimpleCard key={item.id} item={item} add={add} />
          ))}
        </motion.div>
      </section>
      <Cart 
        cart={cart} 
        add={add} 
        remove={remove} 
        clearCart={clearCart} 
        total={total} 
        totalItems={totalItems}
        isMinimized={isCartMinimized}
        onToggleMinimize={() => setIsCartMinimized(!isCartMinimized)}
      />
    </div>
  )
}
