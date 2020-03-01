import React from 'react';
import './Home.css';

const Home = () => {

    const data = new Date();
    const hours = data.getHours();
    let timeOfDay;

    if(hours > 5 && hours < 12){
        timeOfDay = "Добро утро";
    }else if(hours > 12 && hours < 17){
        timeOfDay = "Добър ден";
    }else{
        timeOfDay = "Добър вечер";
    }

    return(
        <main className="landingMain">
            <div className="image">
                <h3>{ timeOfDay }, добре дошли <br />в заявялника за праткаджии</h3>
                <p>От тук ще можете да създавате списък със заявки за деня или за цялата седмица,
                    както и да ги отпечатвате или архивирате.Вие ще можете в реално време да ги коригирате
                    или изтривате според вашите нужди.
                </p>
            </div>

        </main>
    )
}
export default Home;