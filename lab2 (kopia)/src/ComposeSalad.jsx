import { useState } from 'react';
import Select from './Select';
import Salad from './lab1.mjs';

function ComposeSalad({ addSaladToCart, inventory }) {
  const foundationList = Object.keys(inventory)
    .toSorted((a, b) => a.localeCompare(b, 'sv'), { sensitivity: 'case' })
    .filter((name) => inventory[name].foundation);
  const proteinList = Object.keys(inventory)
    .toSorted((a, b) => a.localeCompare(b, 'sv'), { sensitivity: 'case' })
    .filter((name) => inventory[name].protein);
  const extrasList = Object.keys(inventory)
    .toSorted((a, b) => a.localeCompare(b, 'sv'), { sensitivity: 'case' })
    .filter((name) => inventory[name].extra);
  const dressingList = Object.keys(inventory)
    .toSorted((a, b) => a.localeCompare(b, 'sv'), { sensitivity: 'case' })
    .filter((name) => inventory[name].dressing);

  const [extras, setExtra] = useState({});
  const [foundation, setFoundation] = useState(foundationList[0]);
  const [protein, setProtein] = useState(proteinList[0]);
  const [dressing, setDressing] = useState(dressingList[0]);

  const handleFoundation = (event) => setFoundation(event.target.value);
  const handleProtein = (event) => setProtein(event.target.value);
  const handleDressing = (event) => setDressing(event.target.value);
  const handleExtra = (event) => {
    const { name, checked } = event.target;
    setExtra({
      ...extras,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCeasarSalad = (event) => {
    setFoundation('Sallad');
    setProtein('Kycklingfilé');
    setDressing('Ceasardressing');
    setExtra({
      Parmesan: true,
      Krutonger: true,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const composedSalad = new Salad()
      .add(foundation, inventory[foundation])
      .add(protein, inventory[protein])
      .add(dressing, inventory[dressing]);

    Object.keys(extras).forEach((extra) => {
      if (extras[extra]) {
        composedSalad.add(extra, inventory[extra]);
      }
    });
    addSaladToCart(composedSalad);
    setFoundation(foundationList[0]);
    setProtein(proteinList[0]);
    setDressing(dressingList[0]);
    setExtra({});
  };

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <fieldset className="col-md-12">
          <button
            onClick={handleCeasarSalad}
            className="btn btn-primary col-2 mb-4"
          >
            Ceasarsallad!
          </button>
        </fieldset>
        <form onSubmit={handleSubmit}>
          <fieldset className="col-md-12">
            <div>
              <Select
                label="Välj bas"
                value={foundation}
                onChange={handleFoundation}
                options={foundationList}
              ></Select>
            </div>
          </fieldset>
          <fieldset className="col-md-12 mt-4">
            <div>
              <Select
                label="Välj protein"
                value={protein}
                onChange={handleProtein}
                options={proteinList}
              ></Select>
            </div>
          </fieldset>
          <fieldset className="col-md-12 mt-4">
            <div>
              <Select
                label="Välj dressing"
                value={dressing}
                onChange={handleDressing}
                options={dressingList}
              ></Select>
            </div>
          </fieldset>
          <fieldset className="col-md-12 mt-4">
            <p className="form-label">Välj extra tillbehör</p>
            <div className="row">
              {extrasList.map((name) => (
                <div className="col-md-4" key={name}>
                  <label key={name} className="form-check-label">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name={name}
                      checked={!!extras[name]}
                      onChange={handleExtra}
                    />
                    {name}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          <button type="submit" className="mt-4 col-2 btn btn-secondary">
            Lägg till i beställning
          </button>
        </form>
      </div>
    </div>
  );
}

{
  /*
~~Reflection question 1~~
Vi kan inte garantera renderingen eller uppdateringarna ifall värdena kan ändras.

~~Reflection question 2~~
Ja, du behöver inte använda effects utan kan göra operationen under rendering men du kan också cachea resultatet med useMemo()

~~Reflection question 3~~
Vi behöver state när vi klickar submit för att veta vad som ska skickas mot servern när en order läggs.
Ifall vi flyttar state till en Select-component så blir state isolerat och svårhanterat.
Det är bra att skapa ett Select-component för läsligheten av kod och för att följa SOLIDD-principer.

~~Reflection question 4~~
När State-ändras så kallar React på render.

~~Reflection question 5~~
Nej inte av sig själv. Vi kallar det genom t.ex. setFoundation(event.target.value);

~~Reflection question 6~~
Det är undefined, använd hooks istället.

~~Refletion question 7~~
Den kopierar inte prototypkedjan, de delar samma basprototyp men kedjan kopieras inte över.


*/
}

export default ComposeSalad;
