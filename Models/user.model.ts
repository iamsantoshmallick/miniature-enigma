import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    fname: string;
    lname: string;
    email: string;
    password: string;
    phoneNo?: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>
}

const userSchema = new Schema<IUser>(
    {
        fname: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            minlength: [2, 'Name is too short'],
            maxlength: [25, 'Name is too long'],
        },
        lname: {
            type: String,
            required: [true, 'Last Name is required'],
            trim: true,
            minlength: [2, 'Last Name is too short'],
            maxlength: [25, 'Last Name is too Long'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'min length is 8 characters'],
            maxlength: [40, 'max length is 35 characters'],
            select: false,
        },
        phoneNo: {
            type: String,
            trim: true,
            sparse: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (doc, ret) => {
                const { password, ...rest } = ret;
                return rest;
            }
        },
    },
);

//Hashing Password 

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw new Error(`Password hashing failed: ${error}`);
    }
});
// Compare password

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
   return bcrypt.compare(candidatePassword, this.password); 
};

 export const User = mongoose.model<IUser>('User', userSchema);