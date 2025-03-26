import mongoose from "mongoose";

const MutiraoSchema = new mongoose.Schema(
  {
    nome: String,
    data: String,
    local: String,
    /*mutiraoStatus: {
            type: String,
            enum: Object.values(MUTIRAO_STATUS),
            default: MUTIRAO_STATUS.PENDING,
        },
        mutiraoType: {
            type: String,
            enum: Object.values(MUTIRAO_TYPE),
            default: MUTIRAO_TYPE.COMMUNITY,
        },
        location: {
            type: String,
            default: 'default location',
        },
    },*/
  },
  { timestamps: true }
);

export default mongoose.model("Mutirao", MutiraoSchema);
