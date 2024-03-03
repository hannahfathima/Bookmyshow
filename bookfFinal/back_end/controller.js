import movie_schema from "./models/movies.model.js";
import user_schema from "./models/user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken"
const {sign}=pkg;






export async function AddMovie(req, res) {
  try {
    const { ...Movie } = req.body;
    res.status(201).send(movie_schema.create({ ...Movie }));
  } catch (error) {
    res.status(404).send(error);
  }
}

export async function getMovie(req, res) {
  let Movie = await movie_schema.find();
  res.status(200).send(Movie);
}

export async function getDetails(req, res) {
  const { id } = req.params;
  let Movie = await movie_schema.findOne({ _id: id });
  res.status(200).send(Movie);
}



export function deleteMovie(req, res) {
  const { id } = req.params;
  const data = movie_schema.deleteOne({ _id: id });
  data
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
}





export async function editDetails(req, res) {
  const { id } = req.params;
  console.log(id);
  const { ...movie } = req.body;
  await movie_schema.updateOne({ _id: id }, { $set: { ...movie } });

  res.status(201).send("updated")
}






  ////// add user ///
export function addUser(req,res)
{
    
   try {
    const {user,password}=req.body;
    console.log(user,password);
    if(!(user&&password))
    return res.status(404).send("fields are empty")

    bcrypt.hash(password,10)
    .then((hashedPwd)=>{
        user_schema.create({user,password:hashedPwd});
    })
    .then(()=>{
        res.status(201).send("sucessfully registered")
    })
  .catch((error)=>{
    res.status(500).send(error)
   })
    
   } catch (error) {
    console.log(error);
    
   }
    
}



    //////// home //////
    export async function home(req,res){
      try {
        console.log(req.user);
        const username=req.user.user
        console.log(username);
        res.status(200).send({msg:`Hai ${username}`})
        
      } catch (error) {
        res.status(404).send(error)
        
      }
          
    
    
    
     }






  /////// login ////


export async function login(req, res) {
  try {
   console.log(req.body);
   const { user, password } = req.body;
   const usr = await user_schema.findOne({ user })
   console.log(usr);
   if (usr === null) return res.status(404).send("username or password doesnot exist");
   const success =await bcrypt.compare(password, usr.password)
   console.log(success);
   if (success !== true) return res.status(404).send("username or password doesnot exist");
   const token = await sign({ user }, process.env.JWT_KEY, { expiresIn: "24h" })
   console.log(token);
   res.status(200).send({ msg: "successfullly login", token })
   res.end();
   
  } catch (error) {
   console.log(error);
   
  }
 }
