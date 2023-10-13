import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export const PendingPurchase = () => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const params = {};
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    setQueryParams(params);
  }, [location.search]);

  return (
    <>
      <h2>Compra pendiente de aprobación</h2>
      <div>
        <h3>Detalles de la compra:</h3>
        <ul>
          {Object.entries(queryParams).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
