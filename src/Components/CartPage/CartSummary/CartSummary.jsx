import { useState } from "react"
import "./CartSummary.css"
import SummaryRow from "./SummaryRow/SummaryRow"
import { TbTag } from "react-icons/tb"
import { FiArrowRight } from "react-icons/fi"

const CartSummary = ({ items }) => {
const [promoCode, setPromoCode] = useState("")
const [discountPercent, setDiscountPercent] = useState(20)

  function calculateSubtotal() {
  let total = 0
  items.forEach(item => {
    total = total + item.price * item.quantity
  })
  return total
}

function calculateDiscount() {
  let discount = calculateSubtotal() * discountPercent / 100
  return discount
}

function calculateDeliveryFee() {
  let deliveryFee = 15
  return deliveryFee
}

function calculateTotal() {
  let total = calculateSubtotal() - calculateDiscount() + calculateDeliveryFee()
  return total
}

function applyPromoCode() {
  const percent = Number(promoCode)
  if (percent > 0) {
    setDiscountPercent(percent)
  } else {
    setDiscountPercent(20)
  }
  setPromoCode("")
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(items))
  console.log(items)
}

function createOrderFromCart() {
  if (!items || items.length === 0) {
    alert("Your cart is empty.")
    return
  }

  const currentUser = JSON.parse(localStorage.getItem("loggedInUser") || "null")

  if (!currentUser || !currentUser.email) {
    alert("Please log in or create an account before checkout.")
    return
  }

  const subtotal = calculateSubtotal()
  const total = calculateTotal()
  const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
  const initials = (currentUser.name || currentUser.email || "C")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const order = {
    id: `#ORD-${Date.now().toString().slice(-6)}`,
    customer: currentUser.name || "Customer",
    email: currentUser.email,
    avatarBg: "#E8F8F0",
    avatarColor: "#01B763",
    avatarText: initials,
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    items: `${items.reduce((sum, item) => sum + Number(item.quantity || 1), 0)} ${items.reduce((sum, item) => sum + Number(item.quantity || 1), 0) === 1 ? "item" : "items"}`,
    total: Number(total.toFixed(2)),
    payment: "Credit Card",
    status: "Processing",
    userId: currentUser.email,
    subtotal: Number(subtotal.toFixed(2)),
  }

  localStorage.setItem("orders", JSON.stringify([order, ...savedOrders]))
  localStorage.setItem("cart", JSON.stringify([]))
  alert(`Order ${order.id} has been placed for ${currentUser.name}.`)
}
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <SummaryRow title="Subtotal" value={`$${calculateSubtotal()}`}/>
      <SummaryRow title={`Discount (-${discountPercent}%)`} value={`-$${calculateDiscount()}`}/>

      <SummaryRow title="Delivery Fee" value={`$${calculateDeliveryFee()}`}/>
      <hr />
      <SummaryRow title="Total" value={`$${calculateTotal()}`}/>


<div className="promo-code">
<div className="promo-input">
<TbTag className="promo-icon" />
  <input 
    type="text"
    placeholder="Add promo code"
    min="0"
    max="50"
    value={promoCode}
    onChange={(e) => setPromoCode(e.target.value)}
  />
</div>
  <button onClick={applyPromoCode}>Apply</button>
</div>

<button className="checkout-btn" onClick={createOrderFromCart}>
  Go to Checkout
  <FiArrowRight className="checkout-arrow" />
</button>
</div>
  )
}

export default CartSummary