import { useState } from "react";
import "./App.css";

const menuItems = [
  {
    id: 1,
    name: "Cappuccino",
    price: 120,
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Latte",
    price: 140,
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Espresso",
    price: 100,
    category: "Coffee",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Cold Coffee",
    price: 160,
    category: "Beverages",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Masala Tea",
    price: 80,
    category: "Tea",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Chocolate Cake",
    price: 180,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Brownie",
    price: 150,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Veg Sandwich",
    price: 130,
    category: "Snacks",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
  },
];

function App() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});

  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [orderedItems, setOrderedItems] = useState([]);
  const [orderedTotal, setOrderedTotal] = useState(0);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    table: "",
  });

  const categories = [
    "All",
    "Coffee",
    "Tea",
    "Beverages",
    "Snacks",
    "Desserts",
  ];

  // SEARCH + CATEGORY FILTER
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      category === "All" || item.category === category;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // ADD TO CART
  const addToCart = (item) => {
    setCart((currentCart) => ({
      ...currentCart,
      [item.id]: (currentCart[item.id] || 0) + 1,
    }));
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (item) => {
    setCart((currentCart) => {
      const newCart = { ...currentCart };

      if (newCart[item.id] > 1) {
        newCart[item.id]--;
      } else {
        delete newCart[item.id];
      }

      return newCart;
    });
  };

  // TOTAL ITEMS
  const totalItems = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  // TOTAL PRICE
  const total = menuItems.reduce(
    (sum, item) => sum + item.price * (cart[item.id] || 0),
    0
  );

  // OPEN CHECKOUT
  const openCheckout = () => {
    setShowCheckout(true);

    setTimeout(() => {
      document.getElementById("checkout")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  // CUSTOMER DETAILS
  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  // CONFIRM ORDER + SAVE TO MONGODB
  const confirmOrder = async (e) => {
    e.preventDefault();

    if (!customer.name || !customer.phone || !customer.table) {
      alert("Please fill in all the details.");
      return;
    }

    const itemsOrdered = menuItems
      .filter((item) => cart[item.id])
      .map((item) => ({
        name: item.name,
        quantity: cart[item.id],
        price: item.price,
      }));

    const orderData = {
      customerName: customer.name,
      phone: customer.phone,
      tableNumber: Number(customer.table),
      items: itemsOrdered,
      total: total,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      console.log("Order saved successfully:", data);

      setOrderedItems(
        menuItems
          .filter((item) => cart[item.id])
          .map((item) => ({
            ...item,
            quantity: cart[item.id],
          }))
      );

      setOrderedTotal(total);

      setShowCheckout(false);
      setOrderPlaced(true);
      setCart({});

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  // START NEW ORDER
  const newOrder = () => {
    setOrderPlaced(false);
    setShowCheckout(false);

    setCustomer({
      name: "",
      phone: "",
      table: "",
    });

    setOrderedItems([]);
    setOrderedTotal(0);

    setSearch("");
    setCategory("All");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">

      {/* ================= HEADER ================= */}

      <header className="header">
        <div>
          <h1>☕ The Coffee Corner</h1>

          <p>
            Fresh coffee, delicious food & sweet moments
          </p>
        </div>

        <div className="cart">
          🛒 Cart: {totalItems}
        </div>
      </header>

      {/* ================= HERO ================= */}

      {!orderPlaced && (
        <section className="hero">
          <div className="hero-content">

            <h2>
              Welcome to The Coffee Corner
            </h2>

            <p>
              Enjoy freshly brewed coffee, delicious snacks
              and delightful desserts.
            </p>

            <button
              className="hero-button"
              onClick={() =>
                document
                  .getElementById("menu")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore Menu
            </button>

          </div>
        </section>
      )}

      {/* ================= MENU ================= */}

      {!orderPlaced && (
        <section
          className="menu-section"
          id="menu"
        >

          <h2>
            Our Menu
          </h2>

          <p className="menu-description">
            Choose your favourite food and drinks
          </p>

          {/* SEARCH */}

          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search for coffee, tea, cake..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {/* CATEGORIES */}

          <div className="categories">

            {categories.map((item) => (

              <button
                key={item}
                className={
                  category === item
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>

            ))}

          </div>

          {/* MENU CARDS */}

          <div className="menu-grid">

            {filteredItems.length > 0 ? (

              filteredItems.map((item) => {

                const quantity =
                  cart[item.id] || 0;

                return (

                  <div
                    className="menu-card"
                    key={item.id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="food-image"
                    />

                    <div className="card-content">

                      <h3>
                        {item.name}
                      </h3>

                      <p className="category">
                        {item.category}
                      </p>

                      <div className="card-bottom">

                        <strong>
                          ₹{item.price}
                        </strong>

                        {quantity === 0 ? (

                          <button
                            onClick={() =>
                              addToCart(item)
                            }
                          >
                            Add to Cart
                          </button>

                        ) : (

                          <div className="menu-quantity">

                            <button
                              onClick={() =>
                                decreaseQuantity(item)
                              }
                            >
                              −
                            </button>

                            <span>
                              {quantity}
                            </span>

                            <button
                              onClick={() =>
                                addToCart(item)
                              }
                            >
                              +
                            </button>

                          </div>

                        )}

                      </div>

                    </div>

                  </div>

                );

              })

            ) : (

              <div className="no-results">

                <h3>
                  No items found 😕
                </h3>

                <p>
                  Try searching for coffee, tea,
                  cake or snacks.
                </p>

              </div>

            )}

          </div>

        </section>
      )}

      {/* ================= CART ================= */}

      {totalItems > 0 &&
        !orderPlaced &&
        !showCheckout && (

        <section className="cart-section">

          <h2>
            Your Cart 🛒
          </h2>

          {menuItems
            .filter((item) => cart[item.id])
            .map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <div>

                  <span>
                    {item.name}
                  </span>

                  <small>
                    {cart[item.id]} × ₹{item.price}
                  </small>

                </div>

                <strong>
                  ₹{cart[item.id] * item.price}
                </strong>

              </div>

            ))}

          <div className="total">

            <span>
              Total
            </span>

            <strong>
              ₹{total}
            </strong>

          </div>

          <button
            className="order-button"
            onClick={openCheckout}
          >
            Place Order
          </button>

        </section>

      )}

      {/* ================= CHECKOUT ================= */}

      {showCheckout && !orderPlaced && (

        <section
          className="checkout-section"
          id="checkout"
        >

          <h2>
            Checkout 🧾
          </h2>

          <p className="checkout-description">
            Please enter your details to place your order.
          </p>

          <form onSubmit={confirmOrder}>

            <label>
              Customer Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={customer.name}
              onChange={handleCustomerChange}
            />

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={customer.phone}
              onChange={handleCustomerChange}
            />

            <label>
              Table Number
            </label>

            <input
              type="text"
              name="table"
              placeholder="Enter table number"
              value={customer.table}
              onChange={handleCustomerChange}
            />

            <div className="checkout-total">

              <span>
                Order Total
              </span>

              <strong>
                ₹{total}
              </strong>

            </div>

            <button
              type="submit"
              className="confirm-button"
            >
              Confirm Order
            </button>

          </form>

        </section>

      )}

      {/* ================= ORDER SUCCESS ================= */}

      {orderPlaced && (

        <section className="success-section">

          <div className="success-icon">
            ✓
          </div>

          <h2>
            Order Placed Successfully!
          </h2>

          <p>
            Thank you,{" "}
            <strong>
              {customer.name}
            </strong>
            !
          </p>

          <p>
            Your order has been received by
            The Coffee Corner.
          </p>

          <div className="order-details">

            <h3>
              Order Summary
            </h3>

            {orderedItems.map((item) => (

              <div
                className="order-summary-item"
                key={item.id}
              >

                <span>
                  {item.name}
                </span>

                <span>
                  {item.quantity} × ₹{item.price}
                </span>

                <strong>
                  ₹{item.quantity * item.price}
                </strong>

              </div>

            ))}

            <div className="order-summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{orderedTotal}
              </strong>

            </div>

            <p>
              <strong>
                Table Number:
              </strong>{" "}
              {customer.table}
            </p>

            <p>
              <strong>
                Phone:
              </strong>{" "}
              {customer.phone}
            </p>

          </div>

          <button
            className="new-order-button"
            onClick={newOrder}
          >
            Start New Order
          </button>

        </section>

      )}

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <h3>
          ☕ The Coffee Corner
        </h3>

        <p>
          Fresh Coffee • Delicious Food • Happy Moments
        </p>

        <p>
          © 2026 The Coffee Corner.
          All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;