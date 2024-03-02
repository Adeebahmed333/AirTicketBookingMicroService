const {BookingService}=require('../services/index');
const {StatusCodes}=require('http-status-codes');
const {createChannel,publishMessage}=require('../utils/messageQueue');
const {REMINDER_BINDING_KEY}=require('../config/server-config');
const bookingService=new BookingService();
class BookingController{

   constructor()
   {
   }
   async sendMessageToQueue(req,res){
     const channel=await createChannel();
     const data={
     data:{
      subject:'Noti From Queue',
      content:'Some Queue Will Subscribe This',
      recipientEmail:'adeebahmed3337@gmail.com',
      notificationTime:'2024-02-21T00:00:00'
     },
     service:'CREATE_TICKET'
   };
     publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
     return res.status(200).json({
      message:"Successfully published the message"
     });
   }
  async create (req,res) {
      try {
         const response=await bookingService.createBooking(req.body);
         return res.status(StatusCodes.OK).json({
          message:'Successfully Completed Booking',
          success:true,
          err:{},
          data:response
         });
      } catch (error) {
         return res.status(error.statusCode).json({
             message:error.message,
             success:false,
             err:error.explaination,
             data:{}
            });
      }
     }
}
module.exports=BookingController;
