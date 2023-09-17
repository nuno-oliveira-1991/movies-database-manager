import { createContext, useContext, useState } from "react"

const LoginContext = createContext();

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a FormStatesContextProvider")
  }
  return context;
};

export const LoginContextProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState(undefined);
  const [allUsers, setAllUsers] = useState(undefined);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [userName, setUserName] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [movieToUpdateId, setMovieToUpdateId] = useState(undefined);
  const [showBackOffice, setShowBackOffice] = useState(false);
  const [backOfficeMode, setBackOfficeMode] = useState(false);
  const [userManagementMode, setUserManagementMode] = useState(false);
  const [movieManagementMode, setMovieManagementMode] = useState(false);
  const [addMovieMode, setAddMovieMode] = useState(false);
  const [updateMovieMode, setUpdateMovieMode] = useState(false);
  const [updateUserMode, setUpdateUserMode] = useState(false);
  const [userToUpdateId, setUserToUpdateId] = useState(undefined)
  const [userSearchResult, setUserSearchResult] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [filteredMovies, setFilteredMovies] = useState(undefined)

  const contextValue = {
    allMovies,
    setAllMovies,
    allUsers,
    setAllUsers,
    movie,
    setMovie,
    movieToUpdateId,
    setMovieToUpdateId,
    isUserLoggedIn,
    setIsUserLoggedIn,
    showLoginForm,
    setShowLoginForm,
    showRegistrationForm,
    setShowRegistrationForm,
    userName,
    setUserName,
    showBackOffice,
    setShowBackOffice,
    backOfficeMode,
    setBackOfficeMode,
    userManagementMode,
    setUserManagementMode,
    movieManagementMode,
    setMovieManagementMode,
    addMovieMode,
    setAddMovieMode,
    updateMovieMode,
    setUpdateMovieMode,
    updateUserMode,
    setUpdateUserMode,
    userToUpdateId,
    setUserToUpdateId,
    userSearchResult,
    setUserSearchResult,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    filteredMovies,
    setFilteredMovies
  }

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  )
}