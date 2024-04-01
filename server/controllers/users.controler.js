const User = require('../models/user.model')

const getUsers = async (req, res) => {
    try {
        const { page,q } = req.query;
        const allUsers = await User.find({}).sort({createdAt :  -1})

        // pagination here
        const pageNumber = parseInt(page) || 1;
        const itemPerPage = 20
        const startIndex = (pageNumber - 1) * itemPerPage
        const endIndex = pageNumber * itemPerPage
        const paginatedPost = allUsers.slice(startIndex, endIndex)

        // search query here
        const search = (data) =>  {
            return data.filter((item) =>  (
                item['firstname'].toLowerCase().includes(q.toLowerCase()) ||
                item['lastname'].toLowerCase().includes(q.toLowerCase())
            ))
        }
      
        res.send({
            users : q ? search(paginatedPost) : paginatedPost,
            totalPages : Math.ceil(allUsers.length / itemPerPage) ,
            currentPage : pageNumber
        })
    } catch (error) {
        console.log('Error in getUsers', error.message)
    }
}

const getSpecificUser = async (req, res) => {
    try {
        const { userId } = req.params
        console.log(userId)
        const user = await User.findById(userId)
        if (!user) return req.status(404).json({ error: "User not found" })
        res.status(200).json(user)
    } catch (error) {
        console.log('Error in getSpecificUser', error.message)
    }
}

const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, gender, avatar, domain, available } = req.body;
        if(!firstname || !lastname || !email || !gender || !domain || !available ) {
            return res.status(400).json({error : 'Incomplete Credentials'})
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${firstname}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${lastname}`;

        const newUser = new User({
            firstname,
            lastname,
            email,
            gender,
            available,
            avatar :  gender === 'male' ? boyProfilePic : girlProfilePic,
            domain
        })

        await newUser.save()

        return res.status(201).json({
            firstname : newUser.firstname,
            lastname : newUser.lastname,
            email : newUser.email,
            gender : newUser.gender,
            available : newUser.available,
            avatar : newUser.avatar,
            domain : newUser.domain
        })
    } catch (error) {
        console.log("Error in createUser", error.message)
    }
}

const updateUser = async (req, res) => {
    try {
      const {userId} = req.params;
      const {firstname,lastname,domain,email,available} = req.body;

      const user  = await User.findById(userId)
      if(!user)  return req.status(400).json({error : 'User not Found'})

      user.firstname = firstname || user.firstname;
      user.lastname = lastname || user.lastname
      user.domain = domain || user.domain
      user.email = email || user.email
      user.available =  available || user.available

      await user.save()

      return res.status(200).json({message : 'User update successful'})
    } catch (error) {
        console.log("Error in updateUser", error.message)
    }
}

const deleteUser = async (req, res) => {
    try {
      const {userId} = req.params
      const user = await User.findById(userId)
      if(!user) return res.status(404).json({error : 'User not found'})
      const deleteUser = await User.findByIdAndDelete(userId)
      return res.status(200).json({message : 'User deleted successfully'})
    } catch (error) {
        console.log("Error in DeleteUser", error.message)
    }
}

module.exports = { getUsers, getSpecificUser, createUser, updateUser, deleteUser }