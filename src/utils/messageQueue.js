const amqplib=require('amqplib');
const {EXCHANGE_NAME,MESSAGE_BROKER_URL,}=require('../config/server-config');
const createChannel=async()=>{
    try {
        const connection=await amqplib.connect(MESSAGE_BROKER_URL);
        const channel=await connection.createChannel();amqplib
        await channel.assertExchange(EXCHANGE_NAME,'direct',false);
        return channel;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const subscribeMessage=async (channel,service,bindingKey)=>{
      try {
        const applicationQueue=await channel.assertQueue('QUEUE_NAME');
        channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME,bindingKey);
     
        channel.consume(applicationQueue.queue,msg=>{
         console.log("Recieved Data");
         console.log(msg.content.toString());
         channel.ack(msg);
        });
      } catch (error) {
        console.log(error);
        throw error;
      }

}
const publishMessage=async(channel,bindingKey,message)=>{
    try {
        await channel.assertQueue('QUEUE_NAME');
        await channel.publish(EXCHANGE_NAME,bindingKey,Buffer.from(message));
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports={
    createChannel,
    subscribeMessage,
    publishMessage
}