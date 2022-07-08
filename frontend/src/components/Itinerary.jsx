import React, { useEffect } from "react";
import { useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Swal from 'sweetalert2'
import "../stylesheets/itinerary.css"
import Activities from "./Activities";
import itinerariesActions from "../redux/actions/itinerariesActions";
import Comments from "./Comments";
import { toast } from 'react-toastify';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  background: '#000000',
  color: '#ffff',
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


const createCardFlipId = index => `listItem-${index}`;

const shouldFlip = index => (prev, current) =>
  index === prev || index === current;

const ListItem = ({ index, onClick, data, user }) => {
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
                <div className="infoExtra"><div>{price.length > 0 ? price.map(e => {
                  return (<img key={e} className="dollar" src={process.env.PUBLIC_URL + `/assets/img/dollar.svg`} alt="" />
                  )
                }) : <p>For free</p>}</div> <p className="likes">{data.time}Hs<AccessTimeFilledIcon /></p></div>
              </Flipped>
              <Flipped
                flipId={`description-${data._id}-3`}
                stagger="card-content"
                shouldFlip={shouldFlip(index)}
                delayUntil={createCardFlipId(index)}
              >
                <div className="infoExtra2">
                  <div className="hashtags">{data.hashtags.map(e => {
                    return (<p key={e}>#{e}</p>
                    )
                  })}</div> <div className="likes">{data.likes.length}{data.likes.includes(user?.id)? <FavoriteIcon  />: <FavoriteBorderIcon/>}</div> </div>
              </Flipped>
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  );
};

const ExpandedListItem = ({ index, onClick, data, setReload, user }) => {
  const price = [...Array(data.price).keys()];
  const dispatch = useDispatch()
  const handleLike = async () =>{
    if (user){
      const token = localStorage.getItem('token')
      const res = await dispatch(itinerariesActions.handleLikes(data._id,token))
      console.log(res)
      if(res.data.success){
        setReload()
        toast.success(res.data.message, {
          theme: "dark",
          position: "bottom-left",
          autoClose: 4000,
      })
      } else {
        toast.error(res.data.message, {
          theme: "dark",
          position: "bottom-left",
          autoClose: 4000,
      })
      }
    } else {
      Toast.fire({
        icon: 'error',
        title: 'You have to be logged in order to like this'
    })
    }
  }
  

  return (
    <>
      <Flipped
        flipId={createCardFlipId(index)}
        stagger="card"
        onStart={el => {
          setTimeout(() => {
            el.classList.add("animated-in");
          }, 400);
        }}
      >
        <div className="expandedListItem">
          <Flipped
            inverseFlipId={createCardFlipId(index)}
          >
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
                  <div className="infoExtra">{price.length > 0 ? price.map(e => {
                    return (<img key={e} className="dollar" src={process.env.PUBLIC_URL + `/assets/img/dollar.svg`} alt="" />
                    )
                  }) : <p>For free</p>} <p className="likes">{data.time}Hs<AccessTimeFilledIcon /></p></div>
                </Flipped>
                <Flipped
                  flipId={`description-${data._id}-3`}
                  stagger="card-content"
                  delayUntil={createCardFlipId(index)}
                >
                  <div className="infoExtra2">
                    <div className="hashtags">{data.hashtags.map(e => {
                      return (<p key={e}>#{e}</p>
                      )
                    })}</div> <div className="likes">{data.likes.length}{data.likes.includes(user?.id)? <FavoriteIcon onClick={handleLike} />: <FavoriteBorderIcon onClick={handleLike}/>}</div> </div>
                </Flipped>
              </div>
              <div className="additional-content">
                <div>
                  <Activities data={data} />
                </div>
                <div>
                  <Comments itinerary={data} setReload ={setReload}/>
                </div>
                <div>
                  <ArrowDropUpIcon sx={{ color: 'black', fontSize: '5rem', cursor: 'pointer' }} onClick={() => onClick(index)} />
                </div>
              </div>
            </div>
          </Flipped>

        </div>
      </Flipped>



    </>

  );
};

function Itinerary({idCity}) {
  const [focused, setFocused] = useState(null)
  const [reload, setReload] = useState(false)
  const [itineraries, setItineraries] = useState([])
  const dispatch = useDispatch()

  const user = useSelector(store => store.usersReducer.userData)
  useEffect(()=>{
    dispatch(itinerariesActions.getItinerariesByCity(idCity))
    .then(res => setItineraries(res.data.response.itineraries))
    // eslint-disable-next-line
  },[reload])

  const onClickReload = () =>
    setReload(!reload);

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
        {itineraries.map((itinerary, index) => {
          return (
            <li key={itinerary._id}>
              {index === focused ? (
                <ExpandedListItem
                  index={focused}
                  onClick={onClick}
                  data={itinerary}
                  setReload = {onClickReload}
                  user = {user}
                />
              ) : (
                <ListItem index={index} key={itinerary._id} onClick={onClickOpen} setReload = {onClickReload} data={itinerary} user = {user}/>
              )}
            </li>
          );
        })}
      </ul>
    </Flipper>
  );
}


export default Itinerary

