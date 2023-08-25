export const CheckOut = ({ cartItems }) => {
  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>No has agregado productos a tu carrito.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.img} alt={item.name} />
              <div className="item-details">
                <p>{item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
          <button>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};
