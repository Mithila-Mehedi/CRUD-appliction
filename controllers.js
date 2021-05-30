const Contact = require('./Contact')

exports.getAllContact = (req,res) => {
    Contact.find()
            .then(contacts => {
                // console.log(res.body);
               res.render('index',{contacts, error:{}})
            })
            .catch(e => {
                res.json({message:"ERROR OCCURED"})
            })

}

exports.getSingleContact = (req,res) => {
    let {id} = req.params
    Contact.findById(id)
    .then(contact => {
        res.json(contact)
    })
    .catch(e => {
        res.json({message:"ERROR OCCURED"})
    })

    
}

exports.createContact = (req,res) => {
    let {name, email, phone} = req.body


    let error = {}

    if(!name){
        error.name ="Please provide a name"
    }

    if(!email){
        error.email ="Please provide a email"
    }

    if(!phone){
        error.phone ="Please provide a phone"
    }

    let isError = Object.keys(error).length>0

    // console.log(error, isError);
    // return
    if(isError){
        Contact.find()
               .then(contacts => {
                  return res.render('index',{contacts,error})
               })
               .catch(e => {
                return res.json({message:"ERROR OCCURED"})
            })
    
    }


    let contact = new Contact({
        name,
        email,
        phone
    })

   
    // console.log(req.body);
    // return
    // console.log(contact);
    // res.json({message:something})
    contact.save()
            .then(c => {
                // res.json({message:"Successfullyy saved"})
                Contact.find()
                       .then(contacts => {
                           return res.render('index', {contacts,error:{}})
                       })
            })
            .catch(e => {
                return res.json({message:"ERROR OCCURED"})
            })
    
}

exports.updateContact = (req,res) => {
    let {name, email, phone} = req.body
    let {id} = req.params

    Contact.findOneAndUpdate({
        _id: id
    },{
        $set: {
            name,
            email,
            phone
        }
    },{new : true})
    .then(contact => {
        res.json(contact)
    })
    .catch(e => {
        res.json({message:"ERROR OCCURED"})
    })
    
}

exports.deleteContact = (req,res) => {
    let { id } = req.params
    Contact.findOneAndDelete({ _id : id })
    .then( c => {
        // res.json(contact)
        Contact.find()
                .then(contacts => {
                 return res.render('index', {contacts,error:{}})
                       })
    })
    .catch(e => {
        res.json({message:"ERROR OCCURED"})
    })
    
    
}

