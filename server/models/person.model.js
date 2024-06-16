const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema({
    pirateName: {
        type: String,
        required: [true,"name is required"],
        minlength: [3, "name should be longer than 3 characters"]
    },
    imgUrl: {
        type: String,
        required: [true, "Image URL is required"]
    },
  
   crewPosition: {
        type: String,
        enum: ['Capitain','FirstMate', 'QuarterMaster','Bootswain','PowderMonkey'],
        validate: {
            validator: function (value) {
                if (value === 'Capitain') {
                    return mongoose.models.Person.countDocuments({ crewPosition: 'Capitain' }).then(count => {
                        return count === 0;
                    });
                }
                return true;
            },
            message: 'There can only be one Capitain'
        }
    
    },

    pegLeg: { 
        type: Boolean, default: false 
      
    },
    eyePatch: { 
        type: Boolean, default: false 
      
    },
      hookHand: { 
        type: Boolean, default: false 
      
    },
    treasures: { 
        type:Number,
        required: [true,"tresuare is required"],
     },
   pirateCatch: {
        type: String,
        required: [true,"pirateCatch is required"],
      
    },
  
}, { timestamps: true });

module.exports = mongoose.model('Person', PersonSchema);
