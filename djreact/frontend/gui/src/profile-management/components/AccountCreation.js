import React, { Component } from 'react';
import Axios from 'axios';


class AccountCreation extends Component {

constructor (props)
{
    super(props);
    this.state = {
        email: '',
        name: '',
        username: '',
        password: '',
        passwordCheck: '',
        passwordStrength: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.createAccount = this.createAccount.bind(this);
}

    handleInputChange(event) 
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
        [name]: value
        });
        
    }

  verifyPassword(){
    const pass = this.state.password;
    //console.log(pass)
    
   
    //Make sure that it cannot have spaces or certain chars
    if(pass.includes(' ') || pass.includes('/')
    || pass.includes('\\') || pass.includes('<')
    || pass.includes('>')
    )
    {
        console.log("Password cannot have spaces,"
        + " parentheses, arrows or slashes. Only these" 
        + " special characters: ! @ # $ % ^ & * - _ + =")
        return false
    }    

     //Include a minimum length of 8 characters, at least one uppercase, lowercase, and special character.
    //These are the four preconditions
    
    var prec = 4 //this would be a state variable
    if(pass.length >= 8)
    {
        prec--
        console.log('Password greater than 8')
    }
    else
    {
        console.log('Password not greater than 8 characters')
    }

    if(pass.includes('!') || pass.includes('@') 
    || pass.includes('#') || pass.includes('$') 
    || pass.includes('%') || pass.includes('^')
    || pass.includes('&') || pass.includes('*')
    || pass.includes('-') || pass.includes('_')
    || pass.includes('+') || pass.includes('=')
    || pass.includes('?'))
    {
        prec--
        console.log('Password includes special character.')
    }
    else
    {
        console.log('Password needs at least one special character')
    }

    var i = 0, upper = false, lower = false;
    while(i < pass.length)
    {
        
        if(pass.charAt(i) === pass.charAt(i).toUpperCase() && upper === false)
        {
            upper = true;
            prec--;
        }
        
        if(pass.charAt(i) === pass.charAt(i).toLowerCase() && lower === false)
        {
            lower = true;
            prec--;
        }
        i++
    }

    if(!lower || !upper)
    {
        console.log('Password needs upper and lowercase letters.')
    }
    
    if(pass !== this.state.passwordCheck)
    {
        console.log('Passwords are not the same!')
        return false
    }

    //PRINT PASSWORD STRENGTH HERE
    
    if(prec === 0)
    {
      this.setState({ passwordStrength: 'Very Strong'})
      return true
    }
    else if(prec === 1)
    {
        this.setState({passwordStrength: 'Strong'})
        return false
    }
    else if(prec === 2)
    {
        this.setState({passwordStrength: 'OK'})
        return false
    }
    else if(prec === 3)
    {
        this.setState({passwordStrength: 'Weak'})
        return false
    }

    return false
  }

    printPasswordStrength(event)
    {

    }

    createRelatedTables(user)
    {
        //Initialize a profile
        Axios.post("http://127.0.0.1:8000/api/profiles/create_profile/", 
        {
            username: user
        },
        {headers: {"Content-Type": "application/json"}})
        .then(res => {  
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
        
        //Initialize an empty cart
        Axios.post("http://127.0.0.1:8000/api/carts/create_cart/", 
        {
            username: user
        },
        {headers: {"Content-Type": "application/json"}})
        .then(res => {  
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })

        //Initialize an empty wishlist
        Axios.post("http://127.0.0.1:8000/api/wishlists/create_wishlist/",
        {
            username: user
        },
        {headers: {"Content-Type": "application/json"}})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
  
    //Used in onClick
    createAccount(e)
    {
        console.log('Password verified: ' + this.verifyPassword())
        if(this.verifyPassword() === true)
        {
            //Creates the user
            Axios.post("http://127.0.0.1:8000/api/users/add_user/", 
            {
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                email: this.state.email,
                home_address: '',
            },
            {headers: {"Content-Type": "application/json"}})
            .then(res => {  
                console.log(res)
                this.createRelatedTables(this.state.username);
            })
            .catch(error => {
                console.error(error)
            })
            

        }
        else
        {
            e.preventDefault();
            alert('Incorrect input');
        }
    }




render() 
{
    return(
        <form>
            <font color="red">
                <strong></strong>
            </font>
            <br/>
            <label style={{margin: '15px 0'}}>
                E-mail &nbsp;
                <input 
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                     />
            </label>
            <br/>
            <label style={{margin: '15px 0'}}>
                Name &nbsp;
                <input 
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                     />
            </label>
            <br/>
            <label style={{margin: '15px 0'}}>
                Username &nbsp;
                <input 
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleInputChange} />
            </label>
            <br/>
            <label style={{margin: '15px 0'}}>
                Password &nbsp;
                <input 
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.handleInputChange} />
                
            </label>
            <br/>
            <label style={{margin: '15px 0'}}>
                Re-enter Password &nbsp;
                <input 
                name="passwordCheck"
                type="text"
                value={this.state.passwordCheck}
                onChange={this.handleInputChange} /> 
            </label>
            <br/>
            <button 
            type="button"
            onClick={e => {this.createAccount(e)}}>Create</button>
        </form>  
    )
  }
    

}

export default AccountCreation;