
import axios from "axios";


class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL:`${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true
    })
    this.mailService = axios.create({
      baseURL:`${process.env.REACT_APP_API_URL}/mail`,
      withCredentials: true
    })
    this.elementsService = axios.create({
      baseURL:`${process.env.REACT_APP_API_URL}/elements`,
      withCredentials: true
    })
  }

  signup = (user) => {
    return this.service.post('/signup', user)
    .then((response) => {
      return response.data})
  }

  login = (user) => {
    return this.service.post('/login', user)
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => {return response.data})
  }

  logout = () => {
    return this.service.get('/logout')
    .then(response => response.data);
  }

  editpro = (user) => {
    return this.service.post('/edit', user)
    .then(response => response.data);
  }

  editproimg = (user) => {
    const formData = new FormData();
    Object.keys(user).forEach(key => formData.append(key, user[key]));
    return this.service.post('/editimg', formData)
    .then(response => response.data);
  }

  mail = (mail,token) => {
    return this.mailService.post('/sendMail',{mail:mail,token:token})
    .then(response => { 
      return response.data});
  }

  invitedSignup = (user) => {
    return this.mailService.post('/confirm/:token', {user})
    .then((response) => {
      return response.data})
  }

  newKid = (kid) => {
    return this.elementsService.post('/newKid',{kid})
    .then(response => { 
      return response.data});
  }

  getKid = (kid) => {
    return this.elementsService.post('/getKid',{kid})
    .then(response => { 
      return response.data});
  }

  addAlle = (Alle) => {
    return this.elementsService.post('/addAlle',Alle)
    .then(response => { 
      return response.data});
  }

  addVac = (Vac) => {
    return this.elementsService.post('/addVac',Vac)
    .then(response => { 
      return response.data});
  }

  addInt = (Int) => {
    return this.elementsService.post('/addInt',Int)
    .then(response => { 
      return response.data});
  }
  
  editkidimg = (kid) => {
    const formData = new FormData();
    Object.keys(kid).forEach(key => formData.append(key, kid[key]));
    return this.elementsService.post('/editkidimg', formData)
    .then(response => response.data);
  }

  newTask = (task) => {
    return this.elementsService.post('/newTask',task)
    .then(response => { 
      return response.data});
  }

  newReminder = (reminder) => {
    return this.elementsService.post('/newReminder',reminder)
    .then(response => { 
      return response.data});
  }

  checkTask = (task) => {
    return this.elementsService.post('/checkTask',task)
    .then(response => { 
      return response.data});
  }

  newPhoto = (kid) => {
    const formData = new FormData();
    Object.keys(kid).forEach(key => formData.append(key, kid[key]));
    return this.service.post('/newPhoto', formData)
    .then(response => response.data);
  }

  
}

export default AuthService;