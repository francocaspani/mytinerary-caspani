import "../stylesheets/itinerary.css"


export default function NonItinerary({ city }) {
    return (
        <>
            <div className="staggered-list-content">
                <div className="listItem listItemContent noItineraries">
                    <img className="avatar" src='https://thumbs.dreamstime.com/b/emoci%C3%B3n-masculina-avatar-griter%C3%ADo-triste-del-icono-del-perfil-de-la-cara-del-retrato-de-la-historieta-del-hombre-94159248.jpg' alt="" />
                    <div className="noItinerariesCard">
                        <h1 className="noItinerariesTitle">No itineraries yet</h1>
                        <p>We hope you find something fun to do in {city}</p>
                    </div>

                </div>
            </div>
        </>
    )
}
