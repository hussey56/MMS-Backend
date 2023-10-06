const Reservation = require('../Model/Reservation');
const Customer = require('../Model/Customer');
const Admin   =  require('../Model/Admin')


const NewReservation = async (req,res)=>{
try { 
    const {reservator_name,reservator_phone,guests,event,event_type,price,eventid} = req.body
    
    const newOne = new Reservation({
        customer_id:req.customer.id,
        reservator_name,   
        reservator_phone,
        price,
        guests,
        event,
        event_type,
        eventid
       
    }); 
    const save = await newOne.save(); 
    const mission = "Request Has been Sent";
    res.json(mission);
      
} catch (error) {
    return res.status(500).json({error});
}
}
const Reservations = async(req,res)=>{
try {
    const reservation = await Reservation.find({customer_id:req.customer.id}).sort({time:-1});
    const no = await reservation.length;
    res.json({no,reservation});
} catch (error) {
    return res.status(500).json({error,msg:"Server Issue"})
}
}
const FiveReservations = async(req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        const reserves = await Reservation.find().sort({time:-1}).limit(5);
       
res.json({reserves,error:false})
    } catch (errorr) {
        return res.status(500).send({error:true,msg:"internal server error issue has been occured"+errorr})
    }  
}
const AllReservations = async(req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        const reserves = await Reservation.find().sort({time:-1});
        const len =  reserves.length;
res.json({reserves,total:len})
    } catch (error) {
        return res.status(500).send({error,msg:"internal server error issue has been occured"})
    }
}
const CompletdReservations = async(req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        const reserves = await Reservation.find({status:'completed'})
        
res.json({reserves,error:false})
    } catch (errorr) {
        return res.status(500).send({error:true,msg:"internal server error issue has been occured"+errorr})
    }
}

const UpdateCustomerReservation = async(req,res)=>{
    try {
       const {id,status} = req.body
       const reservation = await Reservation.findById(id);
       if(!reservation){
        return res.status(401).json({msg:"Invalid Credentials"})
       } 
       const UpdatedOne = await Reservation.findByIdAndUpdate(id,{status:status},{new:true});
       res.json({id,msg:"Updated Successfully"})
    } catch (error) {
        return res.status(500).send({error})
    }
    }
const UpdateReservation = async(req,res)=>{
try {
    const aid = req.admin.id;
    let admin = await Admin.findById(aid);
    if(!admin){
        return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
    }
   const {id,status} = req.body
   const reservation = await Reservation.findById(id);
   if(!reservation){
    return res.status(401).json({msg:"Invalid Credentials"})
   } 
   const UpdatedOne = await Reservation.findByIdAndUpdate(id,{status:status},{new:true});
   res.json({id,msg:"Updated Successfully"})
} catch (error) {
    return res.status(500).send({error})
}
}
const GetApprovedReservation = async(req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        } 
         // Query using $or operator
  const query = {
    $or: [
      { status: 'approved' },
      { status: 'completed' }
    ]
  };
        const reserves = await Reservation.find(query)
        res.json({data:reserves,error:false})
    } catch (errorr) {
        return res.status(500).send({error:true,msg:errorr})
    }
}
const ApprovedReservations = async(req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        const reserves = await Reservation.find({status: 'approved' }, { _id: 0, event: 1 }).lean();
        const combinedEvents = reserves.reduce((acc, curr) => acc.concat(curr.event), []);
        res.json({events:combinedEvents,error:false});
      
    } catch (errorr) {
        return res.status(500).send({error:true,msg:errorr})
    }
}
const SortedApprovedreservations = async(req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if (!admin) {
          return res.status(400).send({ msg: 'This Admin Credentials are wrong', error: true });
        }
      
        const reserves = await Reservation.find({ status: 'approved' }, { _id: 0, event: 1 }).lean().limit(5);
        const combinedEvents = reserves.reduce((acc, curr) => {
          if (curr.event && curr.event.start) {
            acc.push(curr.event);
          }
          return acc;
        }, []);
      
        // Sort the combinedEvents array based on the "start time" property
        combinedEvents.sort((a, b) => {
          const startTimeA = new Date(a.start);
          const startTimeB = new Date(b.start);
          return startTimeA - startTimeB;
        });
      
        res.json({ events: combinedEvents, error: false });
      } catch (errorr) {
        return res.status(500).send({ error: true, msg: errorr });
      }
      
}
const DeleteReservationByCustomer = async(req,res)=>{
    try {
        let id = await Reservation.findById(req.params.id);
        if(!id){
            return res.status(404).json({msg:"Reservation Item not found",error:true});
        }
        id = await Reservation.findByIdAndDelete(req.params.id);
        res.json({success: "Reservation Item has been Deleted",msg:"Deleted Sucessfully id#"+id,error:false});
    } catch (error) {
        return res.status(500).send({msg:"Internal Server Issue",error:true})
    }
}
const DeleteReservationByAdmin = async(req,res)=>{
    try {
        const aid = req.admin.id
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        let id = await Reservation.findById(req.params.id);
        if(!id){
            return res.status(404).json({msg:"Reservation Item not found",error:true});
        }
        id = await Reservation.findByIdAndDelete(req.params.id);
        res.json({success: "Reservation Item has been Deleted",msg:"Deleted Sucessfully id#"+id,error:false});
    } catch (error) {
        return res.status(500).send({msg:"Internal Server Issue",error:true})
    }
}
const Revenue = async(req,res)=>{
    try {
  const month = req.params.month
  const year = req.params.year
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);
        const totalAmount = await Reservation.aggregate([
            {
              $match: {
                status: 'completed',
                time: { $gte: startDate, $lte: endDate }
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: '$price' }
              }
            }
          ]);
      
          res.json({ totalAmount: totalAmount[0] ? totalAmount[0].total : 0,error:false });
    } catch (errorr) {
        return res.status(500).send({error:true,msg:errorr})
    }
}
module.exports = {CompletdReservations,FiveReservations,Revenue,GetApprovedReservation,DeleteReservationByAdmin,DeleteReservationByCustomer,NewReservation,Reservations,UpdateReservation,AllReservations,UpdateCustomerReservation,ApprovedReservations,SortedApprovedreservations}