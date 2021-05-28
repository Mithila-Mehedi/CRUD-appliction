const Contact = require('./Contact')

exports.getAllContact = (req,res) => {
    Contact.find()
            .then(contacts => {
                res.render('index',{contacts})
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
    let contact = new Contact({
        name,
        email,
        phone
    })

    // console.log(contact);
    // res.json({message:something})
    contact.save()
            .then(contact => {
                res.json({message:"Successfullyy saved"})
            })
            .catch(e => {
                res.json({message:"ERROR OCCURED"})
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
    .then(contact => {
        res.json(contact)
    })
    .catch(e => {
        res.json({message:"ERROR OCCURED"})
    })
    
    
}

