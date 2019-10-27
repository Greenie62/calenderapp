var enterBtn=document.querySelector(".enter-event-btn");
var eventsBtn=document.querySelector(".get-events-btn");


enterBtn.addEventListener("click",()=>{
    var event={
        day:document.querySelector("#day").value,
        name:document.querySelector("input[name='name']").value,
        start:document.querySelector("input[name='start']").value,
        end:document.querySelector("input[name='end']").value,
        am:document.querySelector("input[name='am']").checked,
        pm:document.querySelector("input[name='pm']").checked    
    }

    console.log(event)
    if(event.am === true && event.pm === true){
        console.log("invalid time schema")
        document.querySelector("#error").innerHTML="Invalid time entry!"

        setTimeout(()=>{
            document.querySelector("#error").innerHTML=""
        },2000)
    }
    else{
         sendEvent(event)
    }
})


function sendEvent(event){
    fetch('/sendevent',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(event)
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
    })
}


eventsBtn.onclick=getevents;


function getevents(){
       document.querySelector("#Monday").innerHTML=""
       document.querySelector("#Tuesday").innerHTML=""
       document.querySelector("#Wednesday").innerHTML=""
       document.querySelector("#Thursday").innerHTML=""
       document.querySelector("#Friday").innerHTML=""
    fetch('/getevents')
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        var sorted=sortEvents(res)
        sorted.forEach(createElement)

    })
}

function createElement(event){
    var time=event.start;
    var eventdiv=document.createElement("div");
    eventdiv.className='event-div';
    eventdiv.setAttribute("data-day",event.day)
    if(event.am_time === false){
         time+=parseInt(event.start)+12
    }
    eventdiv.setAttribute("data-time",time)
    var h3day=document.createElement('h3');
    h3day.appendChild(document.createTextNode("Activity: " + event.name))
    var h3start=document.createElement('h3');
    var h3end=document.createElement('h3');
    if(event.am_time === true || event.am_time === "true"){
    h3start.appendChild(document.createTextNode("Start: " + event.start + ":00AM"))
  
    h3end.appendChild(document.createTextNode("End: " + event.end + ":00AM"))
    }
    else{
        h3start.appendChild(document.createTextNode("Start: " + event.start + ":00PM"))
  
        h3end.appendChild(document.createTextNode("End: " + event.end + ":00PM"))
    }

    var deleteBtn=document.createElement("button");
    deleteBtn.className="delete-btn";
    deleteBtn.setAttribute("id",event._id)
    deleteBtn.appendChild(document.createTextNode('Remove Event'))
    eventdiv.appendChild(h3day)
    eventdiv.appendChild(h3start)
    eventdiv.appendChild(h3end)
    eventdiv.appendChild(deleteBtn)
    

    console.log(eventdiv)
    appendToDOM(eventdiv)

    document.querySelectorAll(".delete-btn").forEach(btn=>{
        btn.onclick=(e)=>deleteEvent(e)
    })
  

}


function appendToDOM(event){
    console.log('appendToDOM fired')
 
    switch(event.attributes.getNamedItem("data-day").value){

        case "Monday":
        console.log("Monday case fired")
       
        document.querySelector("#Monday").appendChild(event)
        break;

        case "Tuesday":
        console.log("Tuesday case fired")
        document.querySelector("#Tuesday").appendChild(event)
        break;

        case "Wednesday":
        console.log("Wednesday case fired")
        document.querySelector("#Wednesday").appendChild(event)
        break;

        case "Thursday":
        console.log("Thursday case fired")
        document.querySelector("#Thursday").appendChild(event)
        break;

        case "Friday":
        console.log("Friday case fired")
        document.querySelector("#Friday").appendChild(event)
        break;
    }
}

// var events=[
//     {name:"lunch",data_time:12},
//     {name:"starbucks",data_time:8},
//     {name:"morning piss",data_time:6},
//     {name:"read phone in bed",data_time:7},
//     {name:"visited by ghosts",data_time:3},
//     {name:"toss n turn",data_time:2},
//     {name:"smoke weed",data_time:11},
//     {name:"gym",data_time:10},
// ]

function sortEvents(events){

    //seperates data-times, sorts them, re-assembles n returns 
    // a sorted events array
    var sorted=[];
    var data_times=[]
    //pull out data_time value
    events.forEach(event=>{
        data_times.push(event.data_time)
    })
   // sort
    var sorted=bubbleSort(data_times)
    console.log(sorted)

    //re-assemble
    var sortedevents=[];
    sorted.forEach(time=>{
        for(var i=0;i<events.length;i++){
            if(events[i].data_time === time && sortedevents.indexOf(events[i]) === -1){
                sortedevents.push(events[i])
            }
        }
    })
    console.log(sortedevents)
    return sortedevents;
}


function bubbleSort(x){
    var isSorted=false;
    while(!isSorted){
        isSorted=true;
        for(var i=0;i<x.length;i++){
            if(x[i] > x[i+1]){
                isSorted=false;
                var temp=x[i+1]
                x[i+1]=x[i]
                x[i]=temp
            }
        }
    }
    return x;
}


// getStartTimes(events)


function deleteEvent(e){
    console.log(e.target.id)

    fetch('/removeevent',{
        method:"DELETE",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify({id:e.target.id})
    })

}


var loadeventsbtn=document.querySelector(".load-events-btn");


loadeventsbtn.onclick=function(){
    fetch('/loadevents')
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
    })
}