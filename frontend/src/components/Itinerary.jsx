import React from "react";
import { useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { useSelector } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import "../stylesheets/itinerary.css"


const createCardFlipId = index => `listItem-${index}`;

const shouldFlip = index => (prev, current) =>
  index === prev || index === current;

const ListItem = ({ index, onClick, data }) => {
  const price = [...Array(data.price).keys()];
  return (
    <Flipped
      flipId={createCardFlipId(index)}
      stagger="card"
      shouldInvert={shouldFlip(index)}
    >
      <div className="listItem" onClick={() => onClick(index)}>
        <Flipped inverseFlipId={createCardFlipId(index)}>
          <div className="listItemContent">
            <Flipped
              flipId={`avatar-${index}`}
              stagger="card-content"
              shouldFlip={shouldFlip(index)}
              delayUntil={createCardFlipId(index)}
            >
              <img className="avatar" src={data.nameUserAndAvatar[1]} alt="" />
            </Flipped>
            <div className="description">
                <Flipped
                  flipId={`description-${data._id}`}
                  stagger="card-content"
                  shouldFlip={shouldFlip(index)}
                  delayUntil={createCardFlipId(index)}
                >
                    <h1>{data.nameItinerary}</h1>

                </Flipped>
                <Flipped
                  flipId={`description-${data._id}-1`}
                  stagger="card-content"
                  shouldFlip={shouldFlip(index)}
                  delayUntil={createCardFlipId(index)}
                >
                  <p className="userName">Posted by: {data.nameUserAndAvatar[0]}</p>
                </Flipped>
                <Flipped
                  flipId={`description-${data._id}-2`}
                  stagger="card-content"
                  shouldFlip={shouldFlip(index)}
                  delayUntil={createCardFlipId(index)}
                >
                  <div className="infoExtra"><div>{price.length > 0 ? price.map(e=>{
                    return (<img key={e} className="dollar" src={process.env.PUBLIC_URL+`/assets/img/dollar.svg`} alt="" />
                  )}) : <p>For free</p> }</div> <p className="likes">{data.time}Hs<AccessTimeFilledIcon/></p></div>
                </Flipped>
                <Flipped
                  flipId={`description-${data._id}-3`}
                  stagger="card-content"
                  shouldFlip={shouldFlip(index)}
                  delayUntil={createCardFlipId(index)}
                >
                  <div className="infoExtra2">
                    <div className="hashtags">{data.hashtags.map(e=>{
                    return ( <p key={e}>#{e}</p>
                  )})}</div> <div className="likes">{data.likes}<FavoriteIcon/></div> </div>
                </Flipped>
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  );
};

const ExpandedListItem = ({ index, onClick, data }) => {
  const price = [...Array(data.price).keys()];
  return (
    <Flipped
      flipId={createCardFlipId(index)}
      stagger="card"
      onStart={el => {
        setTimeout(() => {
          el.classList.add("animated-in");
        }, 400);
      }}
    >
      <div className="expandedListItem" onClick={() => onClick(index)}>
        <Flipped inverseFlipId={createCardFlipId(index)}>
          <div className="expandedListItemContent">
            <Flipped
              flipId={`avatar-${index}`}
              stagger="card-content"
              delayUntil={createCardFlipId(index)}
            >
              <img className="avatar avatarExpanded" src={data.nameUserAndAvatar[1]} alt="" />
            </Flipped>
            <div className="description">
                <Flipped
                  flipId={`description-${data._id}`}
                  stagger="card-content"
                  delayUntil={createCardFlipId(index)}
                >
                  <h1>{data.nameItinerary}</h1>
                </Flipped>
                <Flipped
                  flipId={`description-${data._id}-1`}
                  stagger="card-content"
                  delayUntil={createCardFlipId(index)}
                >
                  <p className="userName">Posted by: {data.nameUserAndAvatar[0]}</p>
                </Flipped>
                <Flipped
                  flipId={`description-${data._id}-2`}
                  stagger="card-content"
                  delayUntil={createCardFlipId(index)}
                >
                  <div className="infoExtra">{price.length > 0 ? price.map(e=>{
                    return (<img key={e} className="dollar" src={process.env.PUBLIC_URL+`/assets/img/dollar.svg`} alt="" />
                  )}) : <p>For free</p> } <p className="likes">{data.time}Hs<AccessTimeFilledIcon/></p></div>
                </Flipped>
                <Flipped
                  flipId={`description-${data._id}-3`}
                  stagger="card-content"
                  delayUntil={createCardFlipId(index)}
                >
                  <div className="infoExtra2">
                    <div className="hashtags">{data.hashtags.map(e=>{
                    return ( <p key={e}>#{e}</p>
                  )})}</div> <div className="likes">{data.likes}<FavoriteIcon/></div> </div>
                </Flipped>
            </div>
            <div className="additional-content">
              <div />
              <div />
              <div />
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  );
};

function Itinerary() {
  const [focused, setFocused] = useState(null)
  const itinerariesByCity = useSelector(store => store.itinerariesReducer.itinerariesByCity)
  
  
  const onClick = index =>
    setFocused(null);
  const onClickOpen = index => {
    setFocused(index)
  }
  return (
    <Flipper
      flipKey={focused}
      className="staggered-list-content"
      spring="gentle"
      staggerConfig={{
        card: {
          reverse: focused !== null
        }
      }}
      decisionData={focused}
    >
      <ul className="list">
        {itinerariesByCity.map((itinerary, index) => {
          return (
            <li key={itinerary._id}>
              {index === focused ? (
                <ExpandedListItem
                  index={focused}
                  onClick={onClick}
                  data={itinerary}
                />
              ) : (
                <ListItem index={index} key={itinerary._id} onClick={onClickOpen} data={itinerary} />
              )}
            </li>
          );
        })}
      </ul>
    </Flipper>
  );
}


export default Itinerary

