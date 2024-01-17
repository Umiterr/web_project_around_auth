import React, { useEffect, useState } from "react";
import "../App.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";

export function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    try {
      api.getUserInfo().then((userInfo) => {
        setCurrentUser(userInfo);
      });

      api.getInitialCards().then((cards) => {
        setCards(cards);
      });
    } catch (error) {
      console.error("Error fetching current user data:", error);
    }
  }, []);

  const [user, setUser] = useState(null); // name, about, avatar
  const [cards, setCards] = useState([]);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isPopupConfirmOpen, setIsPopupConfirmOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const closeImagePopup = () => {
    setIsImagePopupOpen(false);
  };

  const closePopupConfirm = () => {
    setIsPopupConfirmOpen(false);
  };

  const onAddCard = () => {
    setIsAddPlacePopupOpen(true);
  };

  const onEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const onEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const deleteSelectedCard = async () => {
    const cardId = selectedCard._id;
    setCards(cards.filter((card) => card._id !== cardId));
    await api.deleteCard(cardId);
  };

  const handleUpdateUser = async (name, about) => {
    const newUser = await api.setUserInfo({ name, about });
    setUser(newUser);
    setCurrentUser(newUser);
    setIsEditProfilePopupOpen(false);
  };

  const handleUpdateAvatar = async (e) => {
    const profileImageUrl = e;
    const newUser = await api.setUserImage(profileImageUrl);
    setUser(newUser);
    setCurrentUser(newUser);
    setIsEditAvatarPopupOpen(false);
  };

  return (
    <div className="page__content">
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <Main
          user={user}
          cards={cards}
          isImagePopupOpen={isImagePopupOpen}
          isPopupConfirmOpen={isPopupConfirmOpen}
          selectedCard={selectedCard}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          closeImagePopup={closeImagePopup}
          closePopupConfirm={closePopupConfirm}
          onAddCard={onAddCard}
          onEditAvatarClick={onEditAvatarClick}
          onEditProfileClick={onEditProfileClick}
          deleteSelectedCard={deleteSelectedCard}
          handleUpdateUser={handleUpdateUser}
          handleUpdateAvatar={handleUpdateAvatar}
          setUser={setUser}
          setCards={setCards}
          setSelectedCard={setSelectedCard}
          setIsImagePopupOpen={setIsImagePopupOpen}
          setIsPopupConfirmOpen={setIsPopupConfirmOpen}
          setIsAddPlacePopupOpen={setIsAddPlacePopupOpen}
          setIsEditProfilePopupOpen={setIsEditProfilePopupOpen}
          setIsEditAvatarPopupOpen={setIsEditAvatarPopupOpen}
        />
      </CurrentUserContext.Provider>

      <Footer />
    </div>
  );
}
