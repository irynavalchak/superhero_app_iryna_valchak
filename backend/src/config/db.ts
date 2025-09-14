import mongoose from "mongoose"

// export const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL as string)
//         console.log('MongoDB connected')
//     } catch (error) {
//         console.error('MongoDB connection error:', error)
//         process.exit(1)
//     }
// }

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log('MongoDB connected');
        console.log('Mongoose readyState:', mongoose.connection.readyState); // 1 = connected
    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}
