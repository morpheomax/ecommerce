import { useEffect } from "react";

export const SuccesPurchase = () => {
  useEffect(() => {
    fetch("http://mibackend.com/payment/successPurchase");
  }, []);

  return (
    <>
      <h2>Tu compra ha sido un éxito</h2>
    </>
  );
};
