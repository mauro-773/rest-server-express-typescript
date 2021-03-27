import { Request, Response, NextFunction } from 'express';
import FindService from '../services/find.service';

class FindController {
   private findService = new FindService();

   public find = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { collection, term } = req.params;

         const result = await this.findService.findByCollection(
            collection,
            term
         );

         res.json({ ok: true, result });
      } catch (error) {
         console.log(error);
         next(error);
      }
   };
}

export default FindController;
