const { ValidationError, AppError } = require('../utils/errors/index');
const {Booking}=require('../models/index');
const {StatusCodes}=require('http-status-codes');

class BookingRepository{
async create(data)
{
    try {
        const booking =await Booking.create(data);
        return booking;
    } catch (error) {
        if(error.name=='SequelizeValidationError')
        {
            throw new ValidationError(error);
        }
        throw new AppError('Repository Layer Error',
        'Not Able To Create Booking',
        'There Was Some Issue in the booking Try Later',
        StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}


}
module.exports=BookingRepository;