import axios from "axios";


class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/api/auth",
      withCredentials: true
    })
    this.mailService = axios.create({
      baseURL: "http://localhost:5000/mail",
      withCredentials: true
    })
    this.elementsService = axios.create({
      baseURL: "http://localhost:5000/elements",
      withCredentials: true
    })
  }

  signup = (user) => {
    // axios.post("http://localhost:5000/api/auth/signup", {user}, {withCredentials: true})
    return this.service.post('/signup', user)
    .then((response) => {
      return response.data})
  }

  login = (user) => {
    // axios.post("http://localhost:5000/api/auth/login", {user}, {withCredentials: true})
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
    // axios.post("http://localhost:5000/api/auth/signup", {user}, {withCredentials: true})
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
    console.log("holita")
    return this.elementsService.post('/newReminder',reminder)
    .then(response => { 
      return response.data});
  }

  
}

export default AuthService;