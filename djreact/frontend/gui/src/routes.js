import React from 'react' ;
import { Route } from 'react-router-dom' ;

import HomePage from './HomePageView'
import BookList from './book-browsing-and-sorting/containers/BookListView' ;
import BookDetail from './book-details/containers/BookDetailView' ;
import EditProfileView from './profile-management/containers/EditProfileView';
import ProfileView from './profile-management/containers/ProfileView';
import Profile from './profile-management/components/Profile';
const BaseRouter = (props) => {
    var handleUser = (user) =>
    {
        props.data(user);
    }
    return(
    
    <div>
        <Route exact path='/' component = {BookList} />
        <Route exact path='/bookID' component = {BookDetail} />
        <Route exact path='/home' 
        render = {(props) => <HomePage {...props} user={handleUser}/>}/>
        <Route exact path='/profile/:username' component = {ProfileView} />
        <Route exact path='/:username/editprofile' component={EditProfileView} />
    
    </div>
)} ;

export default BaseRouter ;
