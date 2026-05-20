import { useState } from 'react'
import { burgers,combos,drinks,extras,hotdogs,salchipapas } from './data'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function App(){
 const [cart,setCart]=useState([])
 const [activeTab,setActiveTab]=useState('hamburguesas')
 
 const add=(item)=>{
  setCart(prev=>{
   const existing=prev.find(i=>i.id===item.id)
   if(existing){
    return prev.map(i=>i.id===item.id?{...i,quantity:i.quantity+1}:i)
   }
   return[...prev,{...item,quantity:1}]
  })
 }
 
 const remove=(id)=>{
  setCart(prev=>{
   const item=prev.find(i=>i.id===id)
   if(item&&item.quantity>1){
    return prev.map(i=>i.id===id?{...i,quantity:i.quantity-1}:i)
   }
   return prev.filter(i=>i.id!==id)
  })
 }
 
 const clearCart=()=>setCart([])
 
 const total=cart.reduce((a,b)=>a+(b.price*b.quantity),0)
 const totalItems=cart.reduce((a,b)=>a+b.quantity,0)
 const msg=encodeURIComponent(`Hola quiero pedir:%0A${cart.map(i=>`- ${i.name} x${i.quantity}`).join('%0A')}%0ATotal: $${total}`)
 
 const tabs=[
  {id:'hamburguesas',label:'Hamburguesas',items:burgers},
  {id:'combos',label:'Combos',items:combos},
  {id:'perros',label:'Perros Calientes',items:hotdogs},
  {id:'salchipapas',label:'Salchipapas',items:salchipapas},
  {id:'bebidas',label:'Bebidas',items:drinks},
  {id:'adicionales',label:'Adicionales',items:extras}
 ]
 
 return (
 <div>
 <header className='hero'>
 <div className='overlay'></div>
 <motion.div 
 initial={{ opacity: 0, y: 50 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1 }}
 className='hero-content'>
 <h1>Burger House</h1>
 <p>Las mejores hamburguesas artesanales</p>
 </motion.div>
 </header>
 <div className='tabs-container'>
 {tabs.map(tab=>(
  <motion.button
   key={tab.id}
   onClick={()=>setActiveTab(tab.id)}
   className={`tab-btn ${activeTab===tab.id?'active':''}`}
   whileHover={{scale:1.05}}
   whileTap={{scale:0.95}}
  >
   {tab.label}
  </motion.button>
 ))}
 </div>
 <section className='section'>
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.3 }}
 key={activeTab}
 className='grid'>
 {tabs.find(t=>t.id===activeTab)?.items.map(i=>(
  i.image?<Card key={i.id} item={i} add={add}/>:<Simple key={i.id} item={i} add={add}/>
 ))}
 </motion.div>
 </section>
 <motion.div 
 initial={{ opacity: 0, x: 100 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.5 }}
 className='cart'>
 <div className='cart-head'><ShoppingCart/> {totalItems} productos</div>
 {cart.map((i,k)=><motion.div 
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.3 }}
 className='cart-item' key={k}>
 <div className='cart-item-info'>
 <span>{i.name}</span>
 <strong>${i.price*i.quantity}</strong>
 </div>
 <div className='cart-item-controls'>
 <motion.button whileTap={{scale:0.9}} onClick={()=>remove(i.id)}><Minus size={14}/></motion.button>
 <span>{i.quantity}</span>
 <motion.button whileTap={{scale:0.9}} onClick={()=>add(i)}><Plus size={14}/></motion.button>
 </div>
 </motion.div>)}
 <h3>Total: ${total}</h3>
 <div className='cart-actions'>
 <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={clearCart} className='clear-btn'><Trash2 size={18}/></motion.button>
 <a className='wa' href={`https://wa.me/573001112233?text=${msg}`} target='_blank'>Pedir por WhatsApp</a>
 </div>
 </motion.div>
 </div>)
}
function Section({title,children}){
 const ref = useRef(null)
 const isInView = useInView(ref, { once: true, margin: "-100px" })
 return (
 <section ref={ref} className='section'>
 <motion.h2 
 initial={{ opacity: 0, x: -50 }}
 animate={isInView ? { opacity: 1, x: 0 } : {}}
 transition={{ duration: 0.6 }}
 >{title}</motion.h2>
 <div className='grid'>{children}</div>
 </section>
 )
}
function Card({item,add}){
 const ref = useRef(null)
 const isInView = useInView(ref, { once: true, margin: "-100px" })
 return (
 <motion.div 
 ref={ref}
 initial={{ opacity: 0, y: 50 }}
 animate={isInView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.5 }}
 whileHover={{ scale: 1.05, y: -10 }}
 className='card'>
 <img src={item.image} alt={item.name}/>
 <div className='content'>
 <h3>{item.name}</h3>
 <p>{item.description}</p>
 <div className='footer'>
 <strong>${item.price}</strong>
 <motion.button 
 whileHover={{ scale: 1.1 }}
 whileTap={{ scale: 0.95 }}
 onClick={()=>add(item)}>Agregar</motion.button>
 </div>
 </div>
 </motion.div>
 )
}
function Simple({item,add}){
 const ref = useRef(null)
 const isInView = useInView(ref, { once: true, margin: "-100px" })
 return (
 <motion.div 
 ref={ref}
 initial={{ opacity: 0, x: -30 }}
 animate={isInView ? { opacity: 1, x: 0 } : {}}
 transition={{ duration: 0.4 }}
 whileHover={{ scale: 1.03, backgroundColor: '#2a2a2a' }}
 className='simple'>
 <div>
 <h3>{item.name}</h3>
 <p>{item.description}</p>
 </div>
 <motion.button 
 whileHover={{ scale: 1.2, rotate: 90 }}
 whileTap={{ scale: 0.9 }}
 onClick={()=>add(item)}>+</motion.button>
 </motion.div>
 )
}
