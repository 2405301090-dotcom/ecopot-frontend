import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Team from './components/Team'
import Products from './components/Products'
import WhyEcoPot from './components/WhyEcoPot'
import HowItWorks from './components/HowItWorks'
import Impact from './components/Impact'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

export default function App() {
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)

  const cartCount = Object.values(cart).reduce((s, i) => s + i.qty, 0)

  const addToCart = (p) =>
    setCart((c) => ({ ...c, [p.id]: { ...p, qty: (c[p.id]?.qty || 0) + 1 } }))

  const changeQty = (id, d) =>
    setCart((c) => {
      const qty = c[id].qty + d
      if (qty <= 0) { const { [id]: _removed, ...rest } = c; return rest }
      return { ...c, [id]: { ...c[id], qty } }
    })

  const removeItem = (id) =>
    setCart((c) => { const { [id]: _removed, ...rest } = c; return rest })

  // Lock page scroll while cart is open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
  }, [cartOpen])

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <About />
        <Team />
        <Products onAdd={addToCart} cart={cart} />
        <WhyEcoPot />
        <HowItWorks />
        <Impact />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onChange={changeQty}
        onRemove={removeItem}
        onClear={() => setCart({})}
      />
    </>
  )
}
