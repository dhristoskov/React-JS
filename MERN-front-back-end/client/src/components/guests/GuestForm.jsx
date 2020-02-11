import React from 'react';

const RecipesForm = () => {

    return (
        <div className="guest-section">
        <h1>Add Guest</h1>
          <form>
            <input type="text" placeholder="Name" name="name" required />
            <input  type="text" placeholder="Descriptopn" name="descriptopn" required />
            <p className="options-label">Dietary</p>
            <div className="options"><label className="container">Without Restriction
              <input type="radio" name="diet" value="WithoutRestriction" />
                <span className="checkmark"></span>
              </label>
              <label className="container">Vegetarian
              <input type="radio" name="diet" value="Vegetarian" />
                <span className="checkmark"></span>
              </label>
              <label className="container">Vegan
              <input type="radio" name="diet" value="Vegan"/>
                <span className="checkmark"></span>
              </label>
              <label className="container">Allergic
              <input type="radio" name="diet" value="Allergic" />
                <span className="checkmark"></span>
              </label>
            </div>
            <input type="submit" className="btn" />
          </form>
        </div>
      )

}
 export default RecipesForm;