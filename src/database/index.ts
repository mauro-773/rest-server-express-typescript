import mongoose from 'mongoose';

const url: string = process.env.DB_URL_MONGO || 'url de mongo';

export const dbConnection = async () => {
   try {
      await mongoose.connect(url, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false,
      });

      console.log('Mongo is running');
   } catch (error) {
      console.log(error);
      throw new Error('Error en la inicialización de la base de datos');
   }
};
