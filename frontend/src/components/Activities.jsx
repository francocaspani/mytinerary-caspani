import { useState } from 'react';
import '../stylesheets/activities.css';


function Activities({data}) {

    const [activeId, setActiveId] = useState(0);
    const onClick = (id) => setActiveId(id);
    const activities = data.activities
    return (
        <div className="container-activities">
            {activities.map((card,index) => (
                <div
                    key={index}
                    className={`panel ${activeId === index ? 'active' : ''}`}
                    onClick={() => onClick(index)}
                    style={{ backgroundImage: `url(${card.img})` }}>
                    <h3>{card.name}</h3>
                    <p>{card.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Activities;