const router=require('express').Router();
const path=require('path')
const db=require('../models')
const events=require('../events.json')


router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"))
})


router.get('/getevents',(req,res)=>{
    db.Events.find()
    .then(dbevents=>{
        res.json(dbevents)
    })
})

router.get('/loadevents',(req,res)=>{
    events.forEach(e=>{
        var data_time=parseInt(e.start)
        if(e.pm === true){
            e.am_time=false;
            delete e.pm
            delete e.am
            data_time+=12
            e.data_time=data_time
            console.log(e)
            db.Events.create(e)
            .then(dbevent=>{
                console.log(dbevent.name + " was entered in db.")
            })
        }

        else{
            e.am_time=true;
            delete e.pm
            delete e.am
            e.data_time=data_time;
            console.log(e)
            db.Events.create(e)
            .then(dbevent=>{
                console.log(dbevent.name + " was entered in db.")
            })
        }
        })
        res.json({msg:"events loaded"})
    
})

router.post('/sendevent',(req,res)=>{
    console.log(req.body)
    var data_time=parseInt(req.body.start)
    if(req.body.pm === true){
        req.body.am_time=false;
        delete req.body.pm
        delete req.body.am
        data_time+=12
        req.body.data_time=data_time
        console.log(req.body)
        db.Events.create(req.body)
        .then(dbevent=>{
            console.log(dbevent.name + " was entered in db.")
        })
        res.json({msg:"Event was sent to the back"})

    }
    else{
        req.body.am_time=true;
        delete req.body.pm
        delete req.body.am
        req.body.data_time=data_time;
        console.log(req.body)
        db.Events.create(req.body)
        .then(dbevent=>{
            console.log(dbevent.name + " was entered in db.")
        })
        res.json({msg:"Event was sent to the back"})
    }
  
})


router.delete('/removeevent',(req,res)=>{
    console.log(req.body)
    db.Events.findOneAndDelete({_id:req.body.id})
    .then(dbevents=>{
        console.log(dbevents.name + " was removed.")
    })
    res.end()
})

// router.get('/fix',(req,res)=>{
//     db.Events.findOneAndUpdate({name:"starbucks"},{$set:{day:"Monday"}})
//     .then(dbevents=>{
//         db.Events.findOneAndUpdate({name:"climbing gym"},{$set:{day:"Monday"}})
//         .then(dbmeh=>{
//             console.log(dbmeh.name + ' and ' + dbevents.name + " was updated.")
//         })
//         db.Events.findOneAndUpdate({name:"lunch"},{$set:{day:"Monday"}})
//         .then(dbmehh=>{
//             console.log(dbmeh.name + ' and ' + dbevents.name + " was updated.")
//         })
//     })
 
// })


module.exports=router;