/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

//strona do edycji 'x' produktu

const ProductEdit = ({ details, setNewDetails }) => {
  const [values, setValues] = useState({}); //wartosci pol formularza

  const [validation, setValidation] = useState(false); //czy przeszlo walidacje?
  const [loading, setLoading] = useState(false); // czy laduje sie?

  //aktualizacja wartosci pol formularza po zmianie wartości w polu formularza.
  const onChangeHandler = (value, key) => {
    setValues({ ...values, [key]: value });
  };

  //aktuazlizacja produktu po kliknieciu w przycisk, ze sprawdzeniem
  const onClickHandler = () => {
    // Ustawienie na start stanu 'validation' na false
    setValidation(false);

    // Sprawdzenie, czy obiekt 'values' istnieje i ma jakieś klucze
    // oraz czy któraś z wartości w obiekcie 'values' ma długość równą zero
    if (
      !!Object.keys(values)?.length &&
      Object.values(values)
        ?.map((item) => !String(item)?.length)
        .includes(true)
    )
      {
        //jest okej wiec ustawiamy validation na true
        setValidation(true);
      }
      else { //'values nie istnieje lub nie ma kluczy lub któreś z wartości ma długość równą zero'
        setLoading(true);
        setNewDetails(values);
        setLoading(false);
      }
  };

  useEffect(() => {
    //przy kazdej zmianie 'details' ustaw wartosci pol formularza na 'details'
    setValues(details);
  }, [details]);

  return (
    <>
      {!!Object.keys(values).length ? (
        <div className="product">
          <h3>ID produktu: {values?.id}</h3>
          <h3>Nazwa:</h3>
          {!String(values?.title)?.length && validation && (
            <p className="error">Musisz uzupelnic to pole!</p>
          )}
          <input
            disabled={loading}
            className="input"
            type="text"
            placeholder=""
            value={values?.title}
            onChange={(e) => onChangeHandler(e.target.value, "title")}
          />

          <h3>Opis:</h3>
          {!String(values?.description)?.length && validation && (
            <p className="error">Musisz uzupelnic to pole!</p>
          )}
          <textarea
            disabled={loading}
            style={{ resize: "none" }}
            rows="5"
            className="input"
            value={values?.description}
            onChange={(e) =>
              onChangeHandler(e.target.value, "description")
            }
          />

          <h3>Cena:</h3>
          {!String(values?.price)?.length && validation && (
            <p className="error">Musisz uzupelnic to pole!</p>
          )}
          <input
            disabled={loading}
            className="input"
            type="number"
            placeholder=""
            value={values?.price}
            onChange={(e) => onChangeHandler(Number(e.target.value), "price")}
          />

          <button
            disabled={loading}
            onClick={() => onClickHandler()}
            className="button"
          >
            Update!
          </button>
        </div>
      )
          // kiedy nic nie ma
          : (
        <h3>Nie ma takiego albo sie laduje jeszcze</h3>
      )}
    </>
  );
};

export default ProductEdit;
